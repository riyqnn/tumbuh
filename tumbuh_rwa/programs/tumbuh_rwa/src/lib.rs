use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    instruction::{AccountMeta, Instruction},
    program::invoke,
};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use borsh::BorshSerialize;

declare_id!("AQRyReBw88GL84HUWYpU8CbCvtaSpELnKacCog9zJrop");

// ─── Constants ────────────────────────────────────────────────────────────────
const COMMUNITY_BPS: u64 = 8_000;
const ESCROW_BPS: u64 = 1_500;
const TREASURY_BPS: u64 = 500;
const BPS_DENOM: u64 = 10_000;

/// Tree adoption price: 10 USDC (6 decimals)
pub const ADOPTION_PRICE: u64 = 10_000_000;

/// Metaplex Bubblegum program ID (mainnet and devnet)
pub const BUBBLEGUM_PROGRAM_ID: Pubkey =
    pubkey!("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");

// ─── Bubblegum MintV1 instruction serialization ───────────────────────────────
/// Minimal borsh-serialised structs matching Bubblegum's IDL types.
/// We only implement what's needed for `mint_v1`.
#[derive(BorshSerialize)]
pub struct BubblegumCreator {
    pub address: Pubkey,
    pub verified: bool,
    pub share: u8,
}

#[derive(BorshSerialize)]
pub struct BubblegumCollection {
    pub verified: bool,
    pub key: Pubkey,
}

#[derive(BorshSerialize)]
pub struct BubblegumUses {
    pub use_method: u8, // 0 = Burn, 1 = Multiple, 2 = Single
    pub remaining: u64,
    pub total: u64,
}

#[derive(BorshSerialize)]
pub struct BubblegumMetadataArgs {
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub primary_sale_happened: bool,
    pub is_mutable: bool,
    pub edition_nonce: Option<u8>,
    pub token_standard: Option<u8>, // 0 = NonFungible
    pub collection: Option<BubblegumCollection>,
    pub uses: Option<BubblegumUses>,
    pub token_program_version: u8, // 0 = Original
    pub creators: Vec<BubblegumCreator>,
}

/// Builds the serialised instruction data for Bubblegum `mint_v1`.
/// Bubblegum uses Anchor 8-byte discriminator + borsh args.
fn build_mint_v1_ix_data(metadata: &BubblegumMetadataArgs) -> Result<Vec<u8>> {
    // Anchor discriminator = sha256("global:mint_v1")[..8]
    // Pre-computed: 0x51, 0x75, 0x6e, 0xa5, 0xb8, 0x47, 0xf2, 0x57
    let discriminator: [u8; 8] = [0x51, 0x75, 0x6e, 0xa5, 0xb8, 0x47, 0xf2, 0x57];
    let mut data = discriminator.to_vec();
    metadata.serialize(&mut data).map_err(|_| TumbuhError::SerializationError)?;
    Ok(data)
}

// ─── Program ──────────────────────────────────────────────────────────────────
#[program]
pub mod tumbuh_rwa {
    use super::*;

    // ── 1. register_plot ──────────────────────────────────────────────────────
    /// Creates a Plot PDA representing a real-world planting location.
    pub fn register_plot(
        ctx: Context<RegisterPlot>,
        plot_name: String,
        gps_lat: String,
        gps_lng: String,
        verifier_pubkey: Pubkey,
    ) -> Result<()> {
        require!(plot_name.len() <= 64, TumbuhError::StringTooLong);
        require!(gps_lat.len() <= 16, TumbuhError::StringTooLong);
        require!(gps_lng.len() <= 16, TumbuhError::StringTooLong);

        let plot = &mut ctx.accounts.plot;
        plot.authority = ctx.accounts.authority.key();
        plot.plot_name = plot_name;
        plot.gps_lat = gps_lat;
        plot.gps_lng = gps_lng;
        plot.verifier_pubkey = verifier_pubkey;
        plot.tree_count = 0;
        plot.bump = ctx.bumps.plot;

        emit!(PlotRegistered {
            plot: plot.key(),
            authority: ctx.accounts.authority.key(),
            plot_name: plot.plot_name.clone(),
        });
        Ok(())
    }

    // ── 2. mint_tree ──────────────────────────────────────────────────────────
    /// Mints a cNFT via Bubblegum (manual CPI) and records the photo hash on
    /// the plot PDA for tamper-evident proof-of-planting.
    pub fn mint_tree(
        ctx: Context<MintTree>,
        species_name: String,
        photo_hash: [u8; 32],
        metadata_uri: String,
    ) -> Result<()> {
        require!(species_name.len() <= 64, TumbuhError::StringTooLong);
        require!(metadata_uri.len() <= 200, TumbuhError::StringTooLong);

        // 2-of-2 oracle: verifier must co-sign
        require!(
            ctx.accounts.verifier.key() == ctx.accounts.plot.verifier_pubkey,
            TumbuhError::InvalidVerifier
        );

        let plot = &mut ctx.accounts.plot;
        plot.tree_count = plot
            .tree_count
            .checked_add(1)
            .ok_or(TumbuhError::Overflow)?;
        let tree_index = plot.tree_count;

        let metadata = BubblegumMetadataArgs {
            name: format!("Tumbuh #{}", tree_index),
            symbol: "TMBH".to_string(),
            uri: metadata_uri.clone(),
            seller_fee_basis_points: 0,
            primary_sale_happened: false,
            is_mutable: true,
            edition_nonce: None,
            token_standard: Some(0), // NonFungible
            collection: None,
            uses: None,
            token_program_version: 0, // Original
            creators: vec![BubblegumCreator {
                address: ctx.accounts.authority.key(),
                verified: false,
                share: 100,
            }],
        };

        let ix_data = build_mint_v1_ix_data(&metadata)?;

        let ix = Instruction {
            program_id: BUBBLEGUM_PROGRAM_ID,
            accounts: vec![
                AccountMeta::new(ctx.accounts.tree_config.key(), false),
                AccountMeta::new_readonly(ctx.accounts.leaf_owner.key(), false),
                AccountMeta::new_readonly(ctx.accounts.leaf_owner.key(), false), // leaf_delegate
                AccountMeta::new(ctx.accounts.merkle_tree.key(), false),
                AccountMeta::new(ctx.accounts.authority.key(), true), // payer
                AccountMeta::new_readonly(ctx.accounts.authority.key(), true), // tree_delegate
                AccountMeta::new_readonly(ctx.accounts.log_wrapper.key(), false),
                AccountMeta::new_readonly(ctx.accounts.compression_program.key(), false),
                AccountMeta::new_readonly(anchor_lang::solana_program::system_program::ID, false),
            ],
            data: ix_data,
        };

        invoke(
            &ix,
            &[
                ctx.accounts.tree_config.to_account_info(),
                ctx.accounts.leaf_owner.to_account_info(),
                ctx.accounts.merkle_tree.to_account_info(),
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.log_wrapper.to_account_info(),
                ctx.accounts.compression_program.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
                ctx.accounts.bubblegum_program.to_account_info(),
            ],
        )?;

        emit!(TreeMinted {
            plot: ctx.accounts.plot.key(),
            minter: ctx.accounts.authority.key(),
            tree_index,
            species_name,
            photo_hash,
        });
        Ok(())
    }

    // ── 3. adopt_tree ─────────────────────────────────────────────────────────
    /// Sponsor pays 10 USDC; funds split 80/15/5 community/escrow/treasury.
    pub fn adopt_tree(ctx: Context<AdoptTree>, leaf_id: u64) -> Result<()> {
        let amount = ADOPTION_PRICE;

        let community_amount = amount
            .checked_mul(COMMUNITY_BPS)
            .and_then(|v| v.checked_div(BPS_DENOM))
            .ok_or(TumbuhError::Overflow)?;
        let escrow_amount = amount
            .checked_mul(ESCROW_BPS)
            .and_then(|v| v.checked_div(BPS_DENOM))
            .ok_or(TumbuhError::Overflow)?;
        let treasury_amount = amount
            .checked_mul(TREASURY_BPS)
            .and_then(|v| v.checked_div(BPS_DENOM))
            .ok_or(TumbuhError::Overflow)?;

        // 80% → community wallet
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sponsor_usdc_ata.to_account_info(),
                    to: ctx.accounts.community_usdc_ata.to_account_info(),
                    authority: ctx.accounts.sponsor.to_account_info(),
                },
            ),
            community_amount,
        )?;

        // 15% → escrow PDA token account
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sponsor_usdc_ata.to_account_info(),
                    to: ctx.accounts.escrow_usdc_ata.to_account_info(),
                    authority: ctx.accounts.sponsor.to_account_info(),
                },
            ),
            escrow_amount,
        )?;

        // 5% → treasury
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sponsor_usdc_ata.to_account_info(),
                    to: ctx.accounts.treasury_usdc_ata.to_account_info(),
                    authority: ctx.accounts.sponsor.to_account_info(),
                },
            ),
            treasury_amount,
        )?;

        // Record adoption state for audit
        let escrow = &mut ctx.accounts.escrow;
        escrow.plot = ctx.accounts.plot.key();
        escrow.leaf_id = leaf_id;
        escrow.sponsor = ctx.accounts.sponsor.key();
        escrow.amount_held = escrow
            .amount_held
            .checked_add(escrow_amount)
            .ok_or(TumbuhError::Overflow)?;
        escrow.bump = ctx.bumps.escrow;

        emit!(TreeAdopted {
            plot: ctx.accounts.plot.key(),
            sponsor: ctx.accounts.sponsor.key(),
            leaf_id,
            community_amount,
            escrow_amount,
            treasury_amount,
        });
        Ok(())
    }
}

// ─── Account Structs ──────────────────────────────────────────────────────────
#[account]
#[derive(Default)]
pub struct Plot {
    pub authority: Pubkey,       // 32
    pub verifier_pubkey: Pubkey, // 32
    pub tree_count: u32,         // 4
    pub bump: u8,                // 1
    pub plot_name: String,       // 4 + 64
    pub gps_lat: String,         // 4 + 16
    pub gps_lng: String,         // 4 + 16
}

impl Plot {
    pub const LEN: usize = 8 + 32 + 32 + 4 + 1 + (4 + 64) + (4 + 16) + (4 + 16);
}

#[account]
#[derive(Default)]
pub struct EscrowAccount {
    pub plot: Pubkey,     // 32
    pub leaf_id: u64,     // 8
    pub sponsor: Pubkey,  // 32
    pub amount_held: u64, // 8
    pub bump: u8,         // 1
}

impl EscrowAccount {
    pub const LEN: usize = 8 + 32 + 8 + 32 + 8 + 1;
}

// ─── Instruction Contexts ─────────────────────────────────────────────────────
#[derive(Accounts)]
#[instruction(plot_name: String, gps_lat: String, gps_lng: String)]
pub struct RegisterPlot<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = Plot::LEN,
        seeds = [b"plot", authority.key().as_ref(), plot_name.as_bytes()],
        bump
    )]
    pub plot: Account<'info, Plot>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintTree<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// The designated verifier must co-sign — our lightweight on-chain oracle.
    pub verifier: Signer<'info>,

    #[account(
        mut,
        seeds = [b"plot", plot.authority.as_ref(), plot.plot_name.as_bytes()],
        bump = plot.bump
    )]
    pub plot: Account<'info, Plot>,

    /// CHECK: Bubblegum tree config account (mutable, validated by Bubblegum)
    #[account(mut)]
    pub tree_config: UncheckedAccount<'info>,

    /// CHECK: Initial cNFT leaf owner
    pub leaf_owner: UncheckedAccount<'info>,

    /// CHECK: Concurrent Merkle Tree account
    #[account(mut)]
    pub merkle_tree: UncheckedAccount<'info>,

    /// CHECK: spl-noop log wrapper
    pub log_wrapper: UncheckedAccount<'info>,

    /// CHECK: spl-account-compression program
    pub compression_program: UncheckedAccount<'info>,

    /// CHECK: Metaplex Bubblegum program
    pub bubblegum_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(leaf_id: u64)]
pub struct AdoptTree<'info> {
    #[account(mut)]
    pub sponsor: Signer<'info>,

    #[account(
        seeds = [b"plot", plot.authority.as_ref(), plot.plot_name.as_bytes()],
        bump = plot.bump
    )]
    pub plot: Account<'info, Plot>,

    pub usdc_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = usdc_mint,
        associated_token::authority = sponsor,
    )]
    pub sponsor_usdc_ata: Account<'info, TokenAccount>,

    /// CHECK: Community wallet — any valid pubkey
    pub community_wallet: UncheckedAccount<'info>,
    #[account(
        init_if_needed,
        payer = sponsor,
        associated_token::mint = usdc_mint,
        associated_token::authority = community_wallet,
    )]
    pub community_usdc_ata: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = sponsor,
        space = EscrowAccount::LEN,
        seeds = [b"escrow", plot.key().as_ref(), sponsor.key().as_ref()],
        bump
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(
        init_if_needed,
        payer = sponsor,
        associated_token::mint = usdc_mint,
        associated_token::authority = escrow,
    )]
    pub escrow_usdc_ata: Account<'info, TokenAccount>,

    /// CHECK: Protocol treasury wallet
    pub treasury_wallet: UncheckedAccount<'info>,
    #[account(
        init_if_needed,
        payer = sponsor,
        associated_token::mint = usdc_mint,
        associated_token::authority = treasury_wallet,
    )]
    pub treasury_usdc_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

// ─── Events ───────────────────────────────────────────────────────────────────
#[event]
pub struct PlotRegistered {
    pub plot: Pubkey,
    pub authority: Pubkey,
    pub plot_name: String,
}

#[event]
pub struct TreeMinted {
    pub plot: Pubkey,
    pub minter: Pubkey,
    pub tree_index: u32,
    pub species_name: String,
    pub photo_hash: [u8; 32],
}

#[event]
pub struct TreeAdopted {
    pub plot: Pubkey,
    pub sponsor: Pubkey,
    pub leaf_id: u64,
    pub community_amount: u64,
    pub escrow_amount: u64,
    pub treasury_amount: u64,
}

// ─── Errors ───────────────────────────────────────────────────────────────────
#[error_code]
pub enum TumbuhError {
    #[msg("String field exceeds maximum allowed length")]
    StringTooLong,
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Signer is not the registered verifier for this plot")]
    InvalidVerifier,
    #[msg("Failed to serialise Bubblegum instruction data")]
    SerializationError,
}
