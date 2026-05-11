"use client";

import { Leaf } from "lucide-react";

export default function LiveTicker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1A2F24] text-white text-xs font-mono py-2 overflow-hidden border-b border-emerald-900/50 shadow-sm">
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex items-center gap-8">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Tokopedia just adopted 50 trees in Jakarta Plot
        </span>
        <span className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-3 h-3" />
          Live Offset: 4,500 kg CO₂ absorbed globally
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          New Verification Node registered in Sumatra
        </span>
        <span className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-3 h-3" />
          Network State: 1,402 Trees Verified
        </span>
        
        {/* Duplicated for seamless loop */}
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Tokopedia just adopted 50 trees in Jakarta Plot
        </span>
        <span className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-3 h-3" />
          Live Offset: 4,500 kg CO₂ absorbed globally
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          New Verification Node registered in Sumatra
        </span>
        <span className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-3 h-3" />
          Network State: 1,402 Trees Verified
        </span>
      </div>
    </div>
  );
}
