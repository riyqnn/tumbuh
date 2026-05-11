import * as anchor from "@anchor-lang/core";
import { Program } from "@anchor-lang/core";
import { TumbuhRwa } from "../target/types/tumbuh_rwa";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  ValidDepthSizePair,
  createAllocTreeIx,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from "@solana/spl-account-compression";
import {
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
  createCreateTreeInstruction,
} from "@metaplex-foundation/mpl-bubblegum";
import { expect } from "chai";
import * as crypto from "crypto";

describe("tumbuh_rwa", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TumbuhRwa as Program<TumbuhRwa>;

  const plotAuthority = Keypair.generate();
  const verifier = Keypair.generate();
  const sponsor = Keypair.generate();

  let plotPda: PublicKey;
  let plotBump: number;
  const plotName = "Genesis Plot";

  let usdcMint: PublicKey;
  let sponsorUsdcAta: PublicKey;
  const communityWallet = Keypair.generate().publicKey;
  const treasuryWallet = Keypair.generate().publicKey;

  // Tree variables
  const merkleTree = Keypair.generate();
  let treeConfig: PublicKey;

  before(async () => {
    // Airdrop SOL
    const airdropSig1 = await provider.connection.requestAirdrop(
      plotAuthority.publicKey,
      10 * anchor.web3.LAMPORTS_PER_SOL
    );
    const airdropSig2 = await provider.connection.requestAirdrop(
      verifier.publicKey,
      10 * anchor.web3.LAMPORTS_PER_SOL
    );
    const airdropSig3 = await provider.connection.requestAirdrop(
      sponsor.publicKey,
      10 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSig1);
    await provider.connection.confirmTransaction(airdropSig2);
    await provider.connection.confirmTransaction(airdropSig3);

    // Create Plot PDA
    [plotPda, plotBump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("plot"),
        plotAuthority.publicKey.toBuffer(),
        Buffer.from(plotName),
      ],
      program.programId
    );

    // Setup USDC token
    usdcMint = await createMint(
      provider.connection,
      sponsor,
      sponsor.publicKey,
      null,
      6
    );

    sponsorUsdcAta = await createAssociatedTokenAccount(
      provider.connection,
      sponsor,
      usdcMint,
      sponsor.publicKey
    );

    await mintTo(
      provider.connection,
      sponsor,
      usdcMint,
      sponsorUsdcAta,
      sponsor,
      100_000_000 // 100 USDC
    );
  });

  it("Registers a plot", async () => {
    await program.methods
      .registerPlot(plotName, "-6.200000", "106.816666", verifier.publicKey)
      .accounts({
        authority: plotAuthority.publicKey,
      })
      .signers([plotAuthority])
      .rpc();

    const plotData = await program.account.plot.fetch(plotPda);
    expect(plotData.plotName).to.equal(plotName);
    expect(plotData.treeCount).to.equal(0);
    expect(plotData.verifierPubkey.toBase58()).to.equal(
      verifier.publicKey.toBase58()
    );
  });

  it("Sets up Bubblegum Tree", async () => {
    [treeConfig] = PublicKey.findProgramAddressSync(
      [merkleTree.publicKey.toBuffer()],
      BUBBLEGUM_PROGRAM_ID
    );

    const maxDepthSizePair: ValidDepthSizePair = {
      maxDepth: 14,
      maxBufferSize: 64,
    };

    const allocTreeIx = await createAllocTreeIx(
      provider.connection,
      merkleTree.publicKey,
      plotAuthority.publicKey,
      maxDepthSizePair,
      14
    );

    const createTreeIx = createCreateTreeInstruction(
      {
        treeAuthority: treeConfig,
        merkleTree: merkleTree.publicKey,
        payer: plotAuthority.publicKey,
        treeCreator: plotAuthority.publicKey,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      },
      {
        maxBufferSize: maxDepthSizePair.maxBufferSize,
        maxDepth: maxDepthSizePair.maxDepth,
        public: true,
      }
    );

    const tx = new Transaction().add(allocTreeIx).add(createTreeIx);
    await provider.sendAndConfirm(tx, [plotAuthority, merkleTree]);
  });

  it("Mints a tree cNFT", async () => {
    const photoHash = Array.from(crypto.randomBytes(32));

    await program.methods
      .mintTree("Mahogany", photoHash, "https://arweave.net/metadata_uri")
      .accounts({
        authority: plotAuthority.publicKey,
        verifier: verifier.publicKey,
        plot: plotPda,
        treeConfig: treeConfig,
        leafOwner: plotAuthority.publicKey,
        merkleTree: merkleTree.publicKey,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        bubblegumProgram: BUBBLEGUM_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([plotAuthority, verifier])
      .rpc();

    const plotData = await program.account.plot.fetch(plotPda);
    expect(plotData.treeCount).to.equal(1);
  });

  it("Adopts a tree", async () => {
    const leafId = new anchor.BN(0);

    const [escrowPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), plotPda.toBuffer(), sponsor.publicKey.toBuffer()],
      program.programId
    );

    const communityUsdcAta = await getAssociatedTokenAddress(
      usdcMint,
      communityWallet,
      true
    );

    const escrowUsdcAta = await getAssociatedTokenAddress(
      usdcMint,
      escrowPda,
      true
    );

    const treasuryUsdcAta = await getAssociatedTokenAddress(
      usdcMint,
      treasuryWallet,
      true
    );

    await program.methods
      .adoptTree(leafId)
      .accounts({
        sponsor: sponsor.publicKey,
        plot: plotPda,
        usdcMint: usdcMint,
        sponsorUsdcAta: sponsorUsdcAta,
        communityWallet: communityWallet,
        communityUsdcAta: communityUsdcAta,
        escrow: escrowPda,
        escrowUsdcAta: escrowUsdcAta,
        treasuryWallet: treasuryWallet,
        treasuryUsdcAta: treasuryUsdcAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([sponsor])
      .rpc();

    const communityBalance = await provider.connection.getTokenAccountBalance(
      communityUsdcAta
    );
    const escrowBalance = await provider.connection.getTokenAccountBalance(
      escrowUsdcAta
    );
    const treasuryBalance = await provider.connection.getTokenAccountBalance(
      treasuryUsdcAta
    );

    // 10 USDC adoption
    expect(communityBalance.value.uiAmount).to.equal(8); // 80%
    expect(escrowBalance.value.uiAmount).to.equal(1.5); // 15%
    expect(treasuryBalance.value.uiAmount).to.equal(0.5); // 5%

    const escrowData = await program.account.escrowAccount.fetch(escrowPda);
    expect(escrowData.sponsor.toBase58()).to.equal(
      sponsor.publicKey.toBase58()
    );
    expect(escrowData.amountHeld.toNumber()).to.equal(1_500_000);
  });
});
