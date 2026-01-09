"use client"; 

import { motion } from "framer-motion"; 
import { MapPin, Heart, ShieldCheck, Star } from "lucide-react"; 
import { FadeIn } from "@/shared/ui/fade-in";

// Pfade für Hero-Komponenten
import { HeroBackground } from "../components/hero-background";
import { HeroSlider } from "../components/hero-slider";
import { HeroWidget } from "../components/hero-widget";

export function Hero() {
  return (
    <section id="hero-section" className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-32 flex flex-col bg-[#fffbf7]">
      
      {/* 1. HINTERGRUND */}
      <HeroBackground />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* 2. TEXT BEREICH (LINKS) */}
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-6">
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        </motion.div>
                        <span>Borsigallee 37, 60388 Frankfurt</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tight text-balance leading-[1.05] mb-6">
                        Gut versorgt. <br/>
                        <span className="relative inline-block px-2 mt-2 lg:mt-3">
                            <span className="relative z-10 font-script font-bold text-[var(--color-accent)] tracking-normal text-[1.15em]">
                                Zuhause leben.
                            </span>
                            <svg className="absolute w-[115%] h-3 lg:h-6 -bottom-2 -left-[7.5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium text-pretty mb-10">
                        Ihr verlässlicher Partner in Frankfurt. Wir verbinden <span className="text-[var(--color-primary)] font-bold">fachliche Expertise</span> mit echter 
                        <span className="relative inline-block ml-2">
                             <span className="font-script text-3xl md:text-4xl text-[var(--color-accent)] font-bold">Zuwendung</span>
                        </span> 
                        <br className="hidden md:block" />– damit Sie sich jeden Tag sicher fühlen.
                    </p>
                </FadeIn>
          </div>

          {/* 3. SLIDER (RECHTS) */}
          <div className="order-2 w-full flex justify-center lg:justify-end mb-12 lg:mb-0">
             <HeroSlider />
          </div>

          {/* 4. UNTERNEHMENS-PITCH (ZWISCHEN SLIDER & WIDGET) */}
          <div className="order-3 lg:col-span-2 w-full pt-8 lg:pt-16">
            <FadeIn delay={0.4} direction="up">
                <div className="relative p-8 lg:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                    {/* Subtiler Glow Effekt */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-secondary)] rounded-full blur-[100px] opacity-20 -mr-40 -mt-40 pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center relative z-10">
                        <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-secondary)]/50 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-[0.2em]">
                                <Star className="w-3 h-3 fill-current text-[var(--color-accent)]" />
                                Über Dalas Pflege
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                                Mehr als nur Pflege – <br className="hidden sm:block"/>
                                <span className="text-[var(--color-primary)]">Ein Stück Lebensqualität.</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium text-pretty">
                                Wir unterstützen Senioren und Familien in Frankfurt dabei, die vertraute Umgebung des eigenen Zuhauses zu erhalten. Unser Team vereint <span className="text-slate-900 font-black">medizinische Behandlungspflege</span> mit <span className="text-[var(--color-accent)] font-extrabold">liebevoller Alltagsbegleitung</span> – mit Herz und Fachverstand.
                            </p>
                        </div>

                        {/* Quick-Benefits */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: ShieldCheck, title: "Qualität", desc: "Zugelassen bei allen Kassen" },
                                { icon: Heart, title: "Persönlich", desc: "Feste Bezugspflegekräfte" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-[#fffbf7] border border-slate-100 shadow-sm transition-all hover:border-[var(--color-primary)]/20 hover:shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[var(--color-accent)] shadow-sm shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-slate-400 uppercase text-[9px] tracking-widest leading-none mb-1.5">{item.title}</h4>
                                        <p className="font-bold text-slate-800 text-sm leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>
          </div>

          {/* 5. WIDGET (PLZ-CHECK) - ABSCHLUSS */}
          <div className="order-4 lg:col-span-2 w-full pt-12 lg:pt-16">
            <FadeIn delay={0.5} className="w-full flex justify-center">
                <HeroWidget />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}