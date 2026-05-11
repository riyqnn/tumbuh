"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { ArrowRight, MapPin, Sprout, Filter, Search, ShieldCheck } from "lucide-react";

// Mock Data for the UI
const MOCK_TREES = [
  {
    id: "1",
    species: "Avicennia marina (Mangrove)",
    plot: "Jakarta Bay Restoration Plot",
    location: "-6.111, 106.822",
    price: 10,
    imageUrl: "https://images.unsplash.com/photo-1621251998592-8822009cb9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    adopted: false
  },
  {
    id: "2",
    species: "Swietenia macrophylla (Mahogany)",
    plot: "Bogor Community Forest",
    location: "-6.594, 106.789",
    price: 10,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    adopted: false
  },
  {
    id: "3",
    species: "Hevea brasiliensis (Rubber)",
    plot: "Sumatra Agroforestry",
    location: "-2.990, 104.756",
    price: 10,
    imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    adopted: true
  }
];

export default function ExplorePage() {
  const { connected } = useWallet();

  return (
    <main className="flex-1 bg-[#F9F8F6] min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-emerald-800 font-medium text-sm mb-6 border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Network Assets
            </div>
            <h1 className="text-5xl md:text-6xl font-outfit font-black text-[#1A2F24] tracking-tight mb-6">
              Sponsor Verifiable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Forests</span>
            </h1>
            <p className="text-stone-500 font-inter text-lg md:text-xl leading-relaxed">
              Explore available plots minted by trusted oracle nodes. Your sponsorship directly yields verifiable ESG proof and funds on-the-ground planting.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm min-w-[250px]">
            <p className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Network State</p>
            <div className="text-4xl font-outfit font-black text-[#1A2F24]">1,402</div>
            <p className="text-emerald-600 font-medium mt-1">Trees Sponsored</p>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="mt-12 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input type="text" placeholder="Search by species, plot, or location..." className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-[#1A2F24] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-50 border border-stone-200 text-[#1A2F24] font-medium rounded-xl hover:bg-stone-100 transition-colors">
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_TREES.map((tree) => (
            <div 
              key={tree.id}
              className={`flex flex-col bg-white rounded-[2rem] border border-stone-200 shadow-sm transition-all duration-500 overflow-hidden group ${
                !tree.adopted ? "hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 hover:border-emerald-200" : "opacity-80"
              }`}
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={tree.imageUrl} 
                  alt={tree.species} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${!tree.adopted ? "group-hover:scale-105" : ""}`}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F24]/80 via-transparent to-transparent"></div>

                {tree.adopted ? (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-[#1A2F24] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" /> Sponsored
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-[#1A2F24] font-black px-4 py-2 rounded-xl shadow-lg border border-white/50">
                    {tree.price} USDC
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col bg-white">
                <h3 className="text-2xl font-bold font-outfit text-[#1A2F24] mb-4">{tree.species}</h3>
                
                <div className="space-y-4 mt-auto mb-8 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3 text-stone-600 text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span className="font-medium truncate">{tree.plot}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600 text-sm">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-mono">{tree.location}</span>
                  </div>
                </div>

                <button 
                  disabled={!connected || tree.adopted}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    tree.adopted 
                      ? "bg-stone-100 text-stone-400 cursor-not-allowed" 
                      : "bg-[#1A2F24] text-white hover:bg-emerald-900 shadow-lg hover:shadow-emerald-900/20"
                  }`}
                >
                  {tree.adopted ? "Already Sponsored" : (
                    <>
                      Initialize Sponsorship <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
