"use client";

import dynamic from "next/dynamic";
import { Globe2 } from "lucide-react";

// Dynamically import the map component with SSR disabled
// Leaflet uses the window object which causes errors during server-side rendering
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-[2rem] border border-stone-200 shadow-sm bg-stone-50 animate-pulse flex flex-col items-center justify-center text-stone-400">
      <Globe2 className="w-12 h-12 mb-4 opacity-50 animate-[spin_4s_linear_infinite]" />
      <span className="font-outfit font-bold tracking-widest uppercase">Initializing Oracle Nodes...</span>
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="flex-1 bg-[#F9F8F6] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-emerald-800 font-medium text-sm mb-6 border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Live Geolocation Data
            </div>
            <h1 className="text-5xl md:text-6xl font-outfit font-black text-[#1A2F24] tracking-tight mb-6">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Impact Map</span>
            </h1>
            <p className="text-stone-500 font-inter text-lg md:text-xl leading-relaxed">
              Verifiable proof-of-location for every tree planted. Our decentralized oracle network ensures real-world coordination matches on-chain records with cryptographic precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="font-medium text-[#1A2F24]">Sponsored Assets</span>
            </div>
            <div className="w-px bg-stone-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              <span className="font-medium text-[#1A2F24]">Available Plots</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background glow for the map container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-emerald-400/20 rounded-[4rem] blur-[100px] -z-10 pointer-events-none"></div>
        <MapComponent />
      </div>
    </main>
  );
}
