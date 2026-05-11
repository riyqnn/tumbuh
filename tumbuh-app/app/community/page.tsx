"use client";

import { useState } from "react";
import { Sprout, MapPin, Upload, Network, ShieldCheck, Database } from "lucide-react";
import { useWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../../lib/tumbuh_rwa.json";
import type { TumbuhRwa } from "../../lib/tumbuh_rwa";

export default function CommunityHub() {
  const { connected, publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [activeTab, setActiveTab] = useState<"register" | "mint">("register");
  
  // Form State
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [isLocating, setIsLocating] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterPlot = async () => {
    if (!wallet || !plotName || !location.lat || !location.lng) {
      alert("Please fill all fields and connect wallet.");
      return;
    }
    setIsRegistering(true);
    try {
      const provider = new AnchorProvider(connection, wallet, {});
      // @ts-ignore - IDL type mismatch workaround
      const program = new Program<TumbuhRwa>(idl, provider);

      const [plotPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("plot"), wallet.publicKey.toBuffer(), Buffer.from(plotName)],
        program.programId
      );

      const tx = await program.methods
        .registerPlot(plotName, location.lat, location.lng, wallet.publicKey)
        .accounts({
          authority: wallet.publicKey,
          plot: plotPda,
          systemProgram: SystemProgram.programId,
        } as any)
        .rpc();
        
      alert(`Success! Plot registered. TX: ${tx}`);
      setPlotName("");
      setLocation({ lat: "", lng: "" });
    } catch (error: any) {
      console.error(error);
      alert("Error registering plot: " + error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please check your browser permissions.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  return (
    <main className="flex-1 bg-[#F9F8F6] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[120px] mix-blend-multiply opacity-50 -z-10 -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-emerald-800 font-medium text-sm mb-6 border border-emerald-100 shadow-sm">
            <Network className="w-4 h-4 text-emerald-600" />
            Ecosystem Core
          </div>
          <h1 className="text-5xl md:text-6xl font-outfit font-black text-[#1A2F24] tracking-tight mb-6">
            Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A2F24] to-emerald-600">Operations</span>
          </h1>
          <p className="text-xl text-stone-500 font-inter leading-relaxed">
            The utilitarian hub for local communities and verifiers. Register physical plots of land and cryptographically mint newly planted trees directly to the network.
          </p>
        </div>

        {/* Wallet Disconnected Warning */}
        {!connected && (
          <div className="mb-10 max-w-4xl mx-auto p-6 bg-white/60 backdrop-blur-md border border-amber-200 rounded-[2rem] shadow-lg shadow-amber-900/5 flex items-center gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-400"></div>
            <div className="bg-amber-100 p-4 rounded-2xl text-amber-600 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1A2F24] font-outfit mb-1">Authentication Required</h3>
              <p className="text-stone-500 font-inter">Please connect your Solana wallet using the navigation bar to interact with the protocol state.</p>
            </div>
          </div>
        )}

        {/* Main Interface Layout */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center gap-4 text-left p-6 rounded-[2rem] font-bold font-outfit transition-all duration-300 border ${
                activeTab === "register"
                  ? "bg-[#1A2F24] text-white border-[#1A2F24] shadow-xl shadow-emerald-900/20 translate-x-2"
                  : "bg-white text-stone-500 border-stone-200 hover:border-emerald-200 hover:shadow-md"
              }`}
            >
              <div className={`p-3 rounded-xl ${activeTab === "register" ? "bg-white/10" : "bg-stone-50"}`}>
                <MapPin className={`w-6 h-6 ${activeTab === "register" ? "text-emerald-400" : "text-stone-400"}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg">Register Plot</span>
                <span className={`text-xs font-inter font-normal ${activeTab === "register" ? "text-emerald-200" : "text-stone-400"}`}>Initialize physical land</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("mint")}
              className={`flex items-center gap-4 text-left p-6 rounded-[2rem] font-bold font-outfit transition-all duration-300 border ${
                activeTab === "mint"
                  ? "bg-[#1A2F24] text-white border-[#1A2F24] shadow-xl shadow-emerald-900/20 translate-x-2"
                  : "bg-white text-stone-500 border-stone-200 hover:border-emerald-200 hover:shadow-md"
              }`}
            >
              <div className={`p-3 rounded-xl ${activeTab === "mint" ? "bg-white/10" : "bg-stone-50"}`}>
                <Sprout className={`w-6 h-6 ${activeTab === "mint" ? "text-emerald-400" : "text-stone-400"}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg">Mint Asset</span>
                <span className={`text-xs font-inter font-normal ${activeTab === "mint" ? "text-emerald-200" : "text-stone-400"}`}>Generate verified cNFT</span>
              </div>
            </button>

            {/* Helper Info Card */}
            <div className="mt-4 p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 flex flex-col gap-4">
               <Database className="w-8 h-8 text-emerald-600" />
               <p className="text-sm text-stone-600 font-inter">All actions are recorded permanently on the Solana ledger. Ensure data accuracy before executing transactions.</p>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-stone-200 p-8 md:p-12 shadow-xl shadow-stone-200/50 relative overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-50 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

              {activeTab === "register" ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-2 border-b border-stone-100 pb-6">
                    <h2 className="text-3xl font-outfit font-black text-[#1A2F24]">Plot Initialization</h2>
                    <p className="text-stone-500 font-inter">Register a new physical plot area onto the protocol.</p>
                  </div>
                  
                  <div className="space-y-6 font-inter">
                    <div>
                      <label className="block text-sm font-bold text-[#1A2F24] mb-2">Plot Designation</label>
                      <input 
                        type="text" 
                        value={plotName}
                        onChange={(e) => setPlotName(e.target.value)}
                        placeholder="e.g. Genesis Plot 01" 
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-stone-400" 
                      />
                    </div>
                    
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold text-[#1A2F24]">Plot Coordinates</label>
                        <button
                          type="button"
                          onClick={handleGetLocation}
                          disabled={isLocating}
                          className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5"
                        >
                          <MapPin className="w-3 h-3" />
                          {isLocating ? "Locating..." : "Auto-Locate"}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 mb-1">Latitude</label>
                          <input
                            type="text"
                            value={location.lat}
                            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                            placeholder="-6.200000"
                            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl outline-none font-mono text-stone-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-500 mb-1">Longitude</label>
                          <input
                            type="text"
                            value={location.lng}
                            onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                            placeholder="106.816666"
                            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl outline-none font-mono text-stone-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleRegisterPlot}
                      disabled={!connected || isRegistering || !plotName || !location.lat} 
                      className="w-full mt-8 bg-[#1A2F24] hover:bg-emerald-900 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-bold text-lg py-5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-900/30 active:scale-[0.98]"
                    >
                      {isRegistering ? "Executing Transaction..." : "Execute Registration"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-2 border-b border-stone-100 pb-6">
                    <h2 className="text-3xl font-outfit font-black text-[#1A2F24]">Asset Minting</h2>
                    <p className="text-stone-500 font-inter">Generate a cryptographic proof of a newly planted tree.</p>
                  </div>

                  <div className="space-y-6 font-inter">
                    <div>
                      <label className="block text-sm font-bold text-[#1A2F24] mb-2">Target Plot</label>
                      <select defaultValue="" className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Select registered plot area</option>
                        <option value="genesis">Genesis Plot 01</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#1A2F24] mb-2">Species Identifier</label>
                      <input type="text" placeholder="e.g. Mahogany (Swietenia macrophylla)" className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-stone-400" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#1A2F24] mb-2">Visual Evidence</label>
                      <div className="border-2 border-dashed border-stone-200 bg-stone-50/50 rounded-2xl p-10 flex flex-col items-center justify-center text-stone-500 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 cursor-pointer transition-all group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                           <Upload className="w-6 h-6 text-[#1A2F24]" />
                        </div>
                        <span className="font-medium text-[#1A2F24]">Click to upload capture</span>
                        <span className="text-xs mt-2 opacity-70">SHA-256 hash will be generated automatically</span>
                      </div>
                    </div>

                    <button disabled={!connected} className="w-full mt-8 bg-emerald-500 hover:bg-emerald-400 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-[#1A2F24] font-bold text-lg py-5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98]">
                      Generate Compressed NFT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
