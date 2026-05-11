"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Sprout } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F6]/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <Link href="/">
              <span className="text-2xl font-black font-outfit tracking-tight text-[#1A2F24]">
                TUMBUH
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-10 items-center">
            <Link
              href="/explore"
              className="text-[#1A2F24] hover:text-emerald-600 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              Explore
            </Link>
            <Link
              href="/map"
              className="text-[#1A2F24] hover:text-emerald-600 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              Map
            </Link>
            <Link
              href="/community"
              className="text-[#1A2F24] hover:text-emerald-600 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              Ecosystem
            </Link>
            <Link
              href="/dashboard"
              className="text-[#1A2F24] hover:text-emerald-600 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              Dashboard
            </Link>
            {mounted ? (
              <WalletMultiButton className="!bg-[#1A2F24] hover:!bg-emerald-800 transition-all !rounded-xl !h-12 !px-8 !font-bold shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5" />
            ) : (
              <div className="w-[150px] h-12 bg-stone-200 animate-pulse rounded-xl" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
