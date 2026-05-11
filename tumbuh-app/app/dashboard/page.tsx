"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Leaf, BarChart3, Receipt, Download, Sprout, ArrowUpRight, TreePine, Globe2 } from "lucide-react";
import Link from "next/link";

// Mock Data for MVP
const MOCK_METRICS = {
  treesSponsored: 42,
  usdcContributed: 420,
  co2OffsetKgs: 1050, // Assuming 25kg per tree per year
};

const MOCK_CNFTS = [
  {
    id: "tx-1",
    species: "Avicennia marina (Mangrove)",
    date: "2026-05-01",
    plot: "Jakarta Bay Restoration Plot",
    co2Est: "25kg/yr",
  },
  {
    id: "tx-2",
    species: "Swietenia macrophylla (Mahogany)",
    date: "2026-04-15",
    plot: "Bogor Community Forest",
    co2Est: "30kg/yr",
  },
  {
    id: "tx-3",
    species: "Avicennia marina (Mangrove)",
    date: "2026-03-22",
    plot: "Jakarta Bay Restoration Plot",
    co2Est: "25kg/yr",
  }
];

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return (
      <main className="flex-1 bg-[#F9F8F6] min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-[2rem] border border-stone-200 shadow-xl">
          <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-stone-400" />
          </div>
          <h2 className="text-2xl font-outfit font-black text-[#1A2F24] mb-3">Authentication Required</h2>
          <p className="text-stone-500 font-inter mb-8">
            Please connect your enterprise wallet to view your corporate ESG impact reports and cryptographic asset history.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#F9F8F6] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-medium text-sm mb-4 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Corporate Account Connected
            </div>
            <h1 className="text-4xl md:text-5xl font-outfit font-black text-[#1A2F24] tracking-tight">
              ESG Compliance <span className="text-emerald-600">Report</span>
            </h1>
            <p className="mt-3 text-stone-500 font-inter text-lg">
              {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-white border border-stone-200 px-6 py-3 rounded-xl font-bold text-[#1A2F24] hover:bg-stone-50 transition-colors shadow-sm">
            <Download className="w-5 h-5" />
            Export CSV Report
          </button>
        </div>

        {/* Top Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sprout className="w-24 h-24 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">Total Assets Sponsored</p>
            <div className="text-6xl font-outfit font-black text-[#1A2F24] mb-2">{MOCK_METRICS.treesSponsored}</div>
            <div className="text-emerald-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +12 this quarter
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Receipt className="w-24 h-24 text-teal-600" />
            </div>
            <p className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">Total Capital Deployed</p>
            <div className="text-6xl font-outfit font-black text-[#1A2F24] mb-2">
              <span className="text-3xl text-stone-300 mr-1">$</span>
              {MOCK_METRICS.usdcContributed}
            </div>
            <div className="text-stone-500 font-medium">Verified USDC on-chain</div>
          </div>

          <div className="bg-[#1A2F24] p-8 rounded-[2rem] border border-emerald-900 shadow-xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[40px]"></div>
            <p className="text-sm font-bold text-emerald-400/80 uppercase tracking-widest mb-4">Est. Annual CO₂ Offset</p>
            <div className="text-6xl font-outfit font-black text-white mb-2">
              {MOCK_METRICS.co2OffsetKgs} <span className="text-2xl text-emerald-300">kg</span>
            </div>
            <div className="text-emerald-400 font-medium">Based on selected species maturity</div>
          </div>
        </div>

        {/* Gamified Eco-Milestones */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-[#1A2F24] font-outfit">Corporate Milestones</h3>
            <div className="h-px bg-stone-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Unlocked Badge */}
            <div className="bg-white p-6 rounded-[2rem] border border-emerald-200 shadow-lg shadow-emerald-900/5 flex items-center gap-4 group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12"></div>
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2F24] font-outfit">The First Seed</h4>
                <p className="text-xs text-stone-500 mt-1">Initiated corporate ESG journey.</p>
              </div>
            </div>

            {/* Unlocked Badge */}
            <div className="bg-white p-6 rounded-[2rem] border border-emerald-200 shadow-lg shadow-emerald-900/5 flex items-center gap-4 group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2F24] to-emerald-800 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-700 -skew-x-12"></div>
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2F24] font-outfit">Carbon Slayer</h4>
                <p className="text-xs text-stone-500 mt-1">Surpassed 1,000kg CO₂ offset.</p>
              </div>
            </div>

            {/* Locked Badge */}
            <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-200 flex items-center gap-4 opacity-70 grayscale">
              <div className="w-16 h-16 rounded-2xl bg-stone-200 flex items-center justify-center">
                <Globe2 className="w-8 h-8 text-stone-400" />
              </div>
              <div>
                <h4 className="font-bold text-stone-600 font-outfit">Forest Guardian</h4>
                <p className="text-xs text-stone-500 mt-1">Sponsor 100+ verifiable trees.</p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-stone-400 h-full w-[42%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Virtual Plot */}
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden mb-12 flex flex-col md:flex-row">
          <div className="p-10 md:w-1/3 bg-[#1A2F24] text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px]"></div>
            <h3 className="text-3xl font-black font-outfit mb-4">Virtual Plot</h3>
            <p className="text-emerald-100/80 font-inter mb-8">
              A real-time cryptographic visualization of your enterprise's physical impact. Watch your barren land turn into a lush forest as you mint new assets.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <div className="w-3 h-3 rounded-sm bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                Mature (42)
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-stone-400">
                <div className="w-3 h-3 rounded-sm bg-stone-800"></div>
                Empty
              </div>
            </div>
          </div>
          
          <div className="p-8 md:w-2/3 bg-stone-50 flex items-center justify-center min-h-[400px]">
            {/* Simulated Isometric Grid */}
            <div className="grid grid-cols-10 gap-1.5 transform rotate-[-15deg] skew-x-12 scale-110 p-8">
              {Array.from({ length: 100 }).map((_, i) => {
                const isSponsored = i < 42; // We have 42 trees based on MOCK_METRICS
                return (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-md transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-110 ${
                      isSponsored 
                        ? "bg-emerald-500 shadow-[4px_4px_0px_#064e3b] hover:shadow-[8px_8px_0px_#064e3b]" 
                        : "bg-stone-200 shadow-[4px_4px_0px_#d6d3d1] hover:bg-emerald-100"
                    }`}
                  >
                    {isSponsored && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-emerald-900 opacity-50" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <div>
              <h3 className="text-xl font-bold text-[#1A2F24] font-outfit">Cryptographic Asset History</h3>
              <p className="text-sm text-stone-500 mt-1">Verified cNFTs minted to your enterprise wallet.</p>
            </div>
            <Link href="/explore" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-sm uppercase tracking-wide">
              Sponsor More Assets &rarr;
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-sm uppercase tracking-wider text-stone-400">
                  <th className="p-6 font-bold">Asset ID (cNFT)</th>
                  <th className="p-6 font-bold">Species</th>
                  <th className="p-6 font-bold">Location Plot</th>
                  <th className="p-6 font-bold">Evolution State</th>
                  <th className="p-6 font-bold text-right">Est. Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {MOCK_CNFTS.map((nft, idx) => (
                  <tr key={nft.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="p-6 font-mono text-sm text-[#1A2F24] font-medium">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-500" />
                        {nft.id}
                      </div>
                    </td>
                    <td className="p-6 font-medium text-[#1A2F24]">{nft.species}</td>
                    <td className="p-6 text-stone-500 text-sm">{nft.plot}</td>
                    <td className="p-6 text-sm">
                      {idx === 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 shadow-sm">
                          <Sprout className="w-3 h-3" /> Seedling
                        </span>
                      ) : idx === 1 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 shadow-sm">
                          <Leaf className="w-3 h-3" /> Sapling
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 font-bold text-xs border border-green-200 shadow-sm">
                          <TreePine className="w-3 h-3" /> Mature Tree
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-emerald-600 font-bold text-right bg-emerald-50/30 group-hover:bg-emerald-100/50 transition-colors">
                      {nft.co2Est}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-stone-50 border-t border-stone-100 text-center text-sm text-stone-500">
            Viewing 3 of 42 records. <span className="text-emerald-600 cursor-pointer font-medium hover:underline">Load more</span>
          </div>
        </div>

      </div>
    </main>
  );
}
