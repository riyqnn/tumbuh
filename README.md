# 🌱 Tumbuh Core Protocol

**Stop Greenwashing. Start Proving Impact.**

Every tree matters, but promises don't capture carbon. Tumbuh turns physical tree planting into verifiable, GPS-locked, and photo-hashed digital assets. Built for the Earth, secured on Solana.

[![Solana](https://img.shields.io/badge/Built%20on-Solana-9945FF?style=flat-square)](https://solana.com)
[![Status](https://img.shields.io/badge/Status-Beta%20V2-success?style=flat-square)](.)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📖 The Context: The Indonesia Problem

Indonesia holds **20% of the world's mangrove forests**. Naturally, it's ground zero for global ESG (Environmental, Social, and Governance) investments. But there's a massive disconnect between boardroom promises and ground reality.

### **The "Ghost Forest" Crisis:**

**The Middleman Drain**
```
Corporate ESG Budget → Government → NGO → Contractor → Farmer
↓↓↓↓↓
Loses 70% in intermediaries. Farmer planting the tree sees 30% or less.
```

**Double-Counting**
A single hectare of rehabilitated peatland is reported to multiple corporate sponsors due to lack of a shared, immutable ledger.

**The 5-Year Void**
- Companies plant trees → Issue PR report → Move on
- Without GPS tracking, **50% of trees die within a year**
- Carbon credits remain on balance sheets as "proof"
- No ground verification, no accountability

### **The Tumbuh Solution:**

```
🌱 Farmer plants tree 
   ↓
📸 Captures photo + GPS coordinates
   ↓
🔐 Hash computed (SHA-256, tamper-evident)
   ↓
⛓️  cNFT minted on Solana (immutable proof)
   ↓
💰 Sponsor pays $10 USDC
   ↓
🎯 80% flows INSTANTLY to farmer's wallet
   ↓
✅ Immutable proof. Zero middlemen. Zero fraud.
```

---

## 💼 Protocol Economics

Tumbuh is a **Trust Engine for corporate sustainability**. We bypass bureaucracy and connect corporate capital directly to community action.

| Metric | Value | Impact |
|--------|-------|--------|
| **Cost per Tree** | $10 USDC | Accessible for retail, highly scalable for B2B |
| **Community Cut** | 80% ($8.00) | Creates massive economic incentive for locals to plant & protect |
| **Platform Escrow** | 15% ($1.50) | Funds future growth, verifier incentives, platform maintenance |
| **Treasury** | 5% ($0.50) | Sustains core protocol development |

**Revenue at Scale:**
```
1,000 trees    → $8,000 community daily revenue
100,000 trees  → $800,000 daily
1M trees       → $8M daily
```

---

## 🚀 Quick Start (Developers)

```bash
# Setup
git clone <repo-url> && cd tumbuh
pnpm install && cargo build

# Run locally
pnpm dev              # Frontend → localhost:3000
anchor test           # Smart contract tests

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

**Program ID (Devnet):** `AQRyReBw88GL84HUWYpU8CbCvtaSpELnKacCog9zJrop`

---

## 🏆 Core Features (Sales Pitch + Dev Specs)

---

## � Core Features (Sales Pitch + Dev Specs)

### **1. Plot Registration** 📍
Communities register planting sites. Immutable GPS + verifier stored on-chain.

**Sales:** "Your planting location is now on the permanent ledger—can't be moved, can't be faked."

**Dev:**
```rust
register_plot(
  plot_name: String,
  gps_lat: String,
  gps_lng: String,
  verifier_pubkey: Pubkey
) → Creates Plot PDA
```

---

### **2. Tree Minting (Proof-of-Planting)** 🌳
Photo + GPS recorded = compressed NFT minted. Full verification trail on-chain.

**Sales:** "Every tree gets its own permanent digital certificate. Photo evidence, GPS lock, blockchain proof."

**Dev:**
```rust
mint_tree(
  species_name: String,
  photo_hash: [u8; 32],        // SHA-256 tamper-evident
  metadata_uri: String
) → Calls Bubblegum::mint_v1 via CPI
```

**Tech Details:**
- 2-of-2 oracle (verifier co-signs = no solo fraud)
- Compressed NFT via Metaplex Bubblegum (scale to millions)
- Photo hash on-chain (any photo modification = detectable)

---

### **3. Tree Adoption (Revenue Split)** 💚
Sponsors pay $10 USDC → splits instantly:
- **80% → Community** (planting operations)
- **15% → Escrow** (growth fund)
- **5% → Treasury** (dev fund)

**Sales:** "Communities earn as they grow. Transparent. Instant. Direct."

**Dev:**
```rust
adopt_tree(leaf_id: u64) → SPL token transfer with basis point splits
```

---

## ⚙️ Architecture

**Frontend:** Next.js 14 + React + Tailwind CSS + Phantom Wallet  
**Smart Contract:** Rust/Anchor + SPL Token + Metaplex Bubblegum  
**Blockchain:** Solana (devnet → mainnet)  
**Storage:** Metadata URIs via IPFS/Arweave  

```
User → Next.js UI → Anchor IDL → Solana Program → cNFT + SPL Transfer
```

---

## 📂 Key Files

```
programs/tumbuh_rwa/src/
├── lib.rs              # Core: register_plot, mint_tree, adopt_tree
├── instructions.rs     # CPI to Bubblegum + token transfers
├── state.rs            # Plot & TreeRecord account structs
├── error.rs            # Custom error codes
└── constants.rs        # Pricing, revenue splits, program IDs

tumbuh-app/
├── app/page.tsx        # Hero/landing
├── app/map/            # Interactive tree map
├── app/dashboard/      # User adoption history
└── components/         # Map, Wallet, Ticker
```

---

## 📊 Revenue Economics

```
$10 tree adoption → $8 community + $1.50 escrow + $0.50 treasury

Scale example:
1,000 trees  = $8,000 community revenue per day
100,000 trees = $800,000 per day
1M trees = $8M per day
```

---

## 🛠️ Developer Guide

### **Prerequisites**
```
Node.js 18+
Rust 1.70+
Solana CLI (latest)
Anchor CLI: npm install -g @project-serum/anchor-cli
```

### **Build & Deploy**

```bash
# Build program
anchor build

# Test locally
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet

# IDL generated → target/idl/tumbuh_rwa.json
```

### **Frontend Development**

```bash
cd tumbuh-app
pnpm install
pnpm dev              # Run at localhost:3000
```

**Auto-generated types from IDL:**
```typescript
// From tumbuh-app/lib/tumbuh_rwa.ts
import { IDL } from "./tumbuh_rwa";
// Use for type-safe instruction calls
```

---

## 🔐 Security Highlights

✅ **2-of-2 Oracle Signing** – Verifier + Authority both required (no solo fraud)  
✅ **Photo Hash Verification** – SHA-256 immutable on-chain (tamper detection)  
✅ **GPS Lock** – Coordinates recorded at mint-time, permanent  
✅ **Compressed NFTs** – Metaplex industry standard (millions at scale)  



## 💡 API Reference

### `register_plot`
```rust
pub fn register_plot(
  ctx: Context<RegisterPlot>,
  plot_name: String,
  gps_lat: String,
  gps_lng: String,
  verifier_pubkey: Pubkey
) → Result<()>
```

Emits: `PlotRegistered`

### `mint_tree`
```rust
pub fn mint_tree(
  ctx: Context<MintTree>,
  species_name: String,
  photo_hash: [u8; 32],
  metadata_uri: String
) → Result<()>
```

Requires: Verifier signature  
Emits: `TreeMinted`

### `adopt_tree`
```rust
pub fn adopt_tree(
  ctx: Context<AdoptTree>,
  leaf_id: u64
) → Result<()>
```

Payment: $10 USDC (80/15/5 split)  
Emits: `TreeAdopted`

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Devnet Program** | `AQRyReBw88GL84HUWYpU8CbCvtaSpELnKacCog9zJrop` |
| **Solana Docs** | https://docs.solana.com |
| **Anchor Docs** | https://book.anchor-lang.com |
| **Metaplex Bubblegum** | https://developers.metaplex.com |

---

## 📝 License

MIT – See LICENSE file

