import Link from "next/link";
import { ArrowRight, MoveRight, ChevronRight, CheckCircle2, Code2, Activity, Zap, Users2, ShieldCheck, Globe2, Link as LinkIcon, Database, TerminalSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center bg-[#F9F8F6] overflow-hidden selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 1. HERO SECTION (Dynamic Hook) */}
      <section className="w-full relative pt-32 pb-24 md:pt-48 md:pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-screen">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-[30rem] h-[30rem] bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob z-0"></div>
        <div className="absolute top-40 right-10 w-[30rem] h-[30rem] bg-amber-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-20 left-1/2 w-[30rem] h-[30rem] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 z-0"></div>

        <div className="flex-1 text-center lg:text-left z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-[#1A2F24] font-medium text-sm mb-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Tumbuh Network V2 is Live
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[5.5rem] font-outfit font-black text-[#1A2F24] leading-[1.05] tracking-tight mb-8">
            FLOWING INTELLIGENCE, <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1A2F24] via-emerald-700 to-teal-600">
              SECURE DATA.
              {/* SVG underline */}
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-emerald-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 5 100 15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl font-inter leading-relaxed mx-auto lg:mx-0">
            Unify your digital landscape with a decentralized, breathable architecture. Real-world validation meets high-throughput cryptography.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 lg:justify-start justify-center">
            <Link 
              href="/explore" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl bg-[#1A2F24] text-white font-bold text-lg hover:bg-emerald-900 transition-all shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/community" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-[#1A2F24] font-bold text-lg border-2 border-stone-200 hover:border-[#1A2F24] transition-all hover:bg-white group"
            >
              Developer Hub <Code2 className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
            </Link>
          </div>
        </div>

        <div className="flex-1 relative w-full z-10 flex justify-center lg:justify-end perspective-1000">
          {/* Abstract SVG / 3D Asset Representation */}
          <div className="relative w-full max-w-md aspect-square">
            {/* Pulsing ring 1 */}
            <div className="absolute inset-4 border border-emerald-300 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
            {/* Pulsing ring 2 */}
            <div className="absolute inset-10 border border-teal-300 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-50"></div>
            
            {/* Central Node Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full shadow-[0_0_40px_rgba(52,211,153,0.3)] backdrop-blur-xl border border-white/50 flex items-center justify-center relative overflow-hidden group">
                <Globe2 className="w-32 h-32 text-emerald-800 opacity-90 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              </div>
            </div>

            {/* Floating connecting elements */}
            <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 animate-[bounce_4s_infinite]">
              <Database className="w-6 h-6 text-[#1A2F24]" />
            </div>
            <div className="absolute bottom-20 left-4 bg-[#1A2F24] p-4 rounded-2xl shadow-xl border border-emerald-900 animate-[bounce_5s_infinite_reverse]">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="absolute top-1/2 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 animate-[bounce_6s_infinite]">
              <LinkIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE / SOLUTION SECTION (Odoo-Style Modular Cards) */}
      <section className="w-full py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-[#1A2F24] mb-6">
              Sophisticated Modules. <br />Seamless Integration.
            </h2>
            <p className="text-xl text-stone-500 font-inter">
              Deploy modular, cryptographically secure components tailored for enterprise agility. Clean logic, profound impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Immutable Audit Trails", icon: ShieldCheck, desc: "Replace fragile databases with consensus-driven ledgers. Perfect historical accuracy guaranteed by mathematics." },
              { title: "High-Throughput IO", icon: Zap, desc: "Optimized state compression handles millions of parallel requests with sub-second finality." },
              { title: "Dynamic Oracles", icon: Activity, desc: "Inject real-world data securely. Our 2-of-2 multisig oracle networks ensure tampering is computationally impossible." },
              { title: "Frictionless Access", icon: Users2, desc: "Enterprise SSO combined with non-custodial wallet routing. Security without the UX degradation." },
              { title: "Declarative Policies", icon: Code2, desc: "Define compliance and routing rules in plain-English configurations that compile to rigorous smart contracts." },
              { title: "Global Interoperability", icon: Globe2, desc: "Built on open standards. Connect effortlessly to external liquidity, APIs, and legacy infrastructure." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200 transition-all duration-300 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-6 group-hover:bg-[#1A2F24] group-hover:border-[#1A2F24] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[#1A2F24] group-hover:text-emerald-400 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2F24] mb-3 font-outfit">{feature.title}</h3>
                <p className="text-stone-500 font-inter leading-relaxed text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY & ECOSYSTEM SECTION (Modern Network Visual) */}
      <section className="w-full py-32 bg-[#1A2F24] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-black text-white mb-6">
            An Ecosystem in Motion
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-inter">
            Join thousands of nodes, validators, and builders orchestrating the next wave of verifiable environmental assets.
          </p>
        </div>

        {/* Infinite Marquee Logos */}
        <div className="w-full overflow-hidden flex flex-col gap-6 relative z-10 py-10 opacity-70">
          <div className="flex w-[200%] animate-[marquee_20s_linear_infinite] gap-12 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 mix-blend-screen opacity-50 hover:opacity-100">
                <div className="text-2xl font-black text-white flex items-center gap-2"><Globe2/> PARTNER {i}</div>
              </div>
            ))}
            {/* Duplicate for seamless scroll */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={`dup-${i}`} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 mix-blend-screen opacity-50 hover:opacity-100">
                <div className="text-2xl font-black text-white flex items-center gap-2"><Globe2/> PARTNER {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENTO BOX GRID - CODE & INNOVATION */}
      <section className="w-full py-24 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Bento Box 1: Live Network Activity */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold font-outfit text-[#1A2F24] flex items-center gap-2">
                    <Activity className="w-6 h-6 text-emerald-500" /> Live Network Activity
                  </h3>
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                {/* Abstract Visualizer */}
                <div className="flex-1 flex items-end gap-2 px-2 mt-4">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-full bg-emerald-100 rounded-t-sm group-hover:bg-emerald-200 transition-colors"
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        animation: `pulse ${Math.random() * 2 + 1}s infinite alternate`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Box 2: Community Updates */}
            <div className="bg-[#1A2F24] text-white rounded-3xl p-8 border border-emerald-900 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
               <div>
                  <h3 className="text-2xl font-bold font-outfit mb-4 text-emerald-400">Governance</h3>
                  <p className="text-emerald-50 font-inter">Proposal #42 passed. Ecosystem expansion parameters updated successfully.</p>
               </div>
               <div className="mt-8 flex items-center justify-between border-t border-emerald-800 pt-4">
                 <span className="text-sm text-emerald-300">View Proposal</span>
                 <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>

            {/* Bento Box 3: Open Source Snippets */}
            <div className="bg-[#0f172a] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group font-mono text-sm">
              <div className="absolute top-0 left-0 w-full h-10 bg-slate-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="mt-8 text-emerald-400">
                <p className="text-slate-400 mb-2">// Deploy scalable trees</p>
                <p><span className="text-pink-400">await</span> program.methods</p>
                <p className="pl-4">.mintTree("Mahogany", hash)</p>
                <p className="pl-4">.accounts(&#123; plot: plotPda &#125;)</p>
                <p className="pl-4">.rpc();</p>
              </div>
            </div>

            {/* Bento Box 4: Latest Features */}
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 max-w-md">
                <h3 className="text-3xl font-bold font-outfit text-[#1A2F24] mb-2">v2.0 Architecture</h3>
                <p className="text-[#1A2F24]/70 font-inter mb-6">Introducing cNFT state compression for 100x cheaper ecosystem scaling.</p>
                <button className="bg-white text-[#1A2F24] px-6 py-3 rounded-lg font-bold border border-emerald-200 hover:bg-[#1A2F24] hover:text-white transition-colors">
                  Read Documentation
                </button>
              </div>
              <TerminalSquare className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-emerald-200/50 -rotate-12" />
            </div>

          </div>
        </div>
      </section>

      {/* 5. HIGH-IMPACT CALL TO ACTION */}
      <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-6xl mx-auto bg-[#1A2F24] rounded-[3rem] overflow-hidden relative shadow-2xl">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 px-8 py-20 md:py-28 md:px-20 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-outfit font-black text-white leading-tight mb-6">
                Ready to scale <br/>
                <span className="text-emerald-400">your impact?</span>
              </h2>
              <p className="text-emerald-50/80 text-lg mb-8 font-inter">
                Join forward-thinking enterprises utilizing the Tumbuh protocol to achieve verifiable ESG compliance on the edge.
              </p>
              <ul className="space-y-4 mb-10">
                {["Zero-knowledge proofs built-in", "Automated CSR reporting", "Instant liquidity splits"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complex Form Structure */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Request Access</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                  <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                </div>
                <input type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                <select defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                  <option value="" disabled>Select Use Case</option>
                  <option value="enterprise" className="text-[#1A2F24]">Enterprise ESG</option>
                  <option value="ngo" className="text-[#1A2F24]">NGO / Verification Node</option>
                  <option value="developer" className="text-[#1A2F24]">API / Developer</option>
                </select>
                <button type="button" className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#1A2F24] font-bold text-lg py-4 rounded-xl transition-colors shadow-lg hover:shadow-emerald-500/50 mt-4">
                  Initialize Connection
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full bg-[#112119] text-emerald-50/60 py-16 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-outfit text-white tracking-tight">Tumbuh</span>
            </div>
            <p className="max-w-xs font-inter leading-relaxed">
              Verifiable reality on the blockchain. Unifying digital precision with environmental impact.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Protocol</h4>
            <a href="#" className="hover:text-emerald-300 transition-colors">Explorer</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Github</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Ecosystem</h4>
            <a href="#" className="hover:text-emerald-300 transition-colors">Community Hub</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Grants</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Verifiers</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Company</h4>
            <a href="#" className="hover:text-emerald-300 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Blog</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">Careers</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-900/50 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm font-inter">© 2026 Tumbuh Foundation. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-400 transition-colors font-bold text-lg">𝕏</a>
            <a href="#" className="hover:text-emerald-400 transition-colors font-bold text-lg">in</a>
            <a href="#" className="hover:text-emerald-400 transition-colors font-bold text-lg">git</a>
          </div>
        </div>
      </footer>

      {/* Global Marquee CSS Animation Definition */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </main>
  );
}
