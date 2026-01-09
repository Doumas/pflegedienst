"use client"; 

import { motion } from "framer-motion"; 
import { MapPin } from "lucide-react"; 
import { FadeIn } from "@/shared/ui/fade-in";

// Pfade für Hero-Komponenten
import { HeroBackground } from "../components/hero-background";
import { HeroSlider } from "../components/hero-slider";
import { HeroWidget } from "../components/hero-widget";

export function Hero() {
  return (
    // REDUZIERT: pt-32 -> pt-24 (Mobile) und lg:pt-48 -> lg:pt-36 (Desktop)
    // ENTFERNT: lg:min-h-[95vh] (optional, falls es immer noch zu viel Luft ist, min-h-0 nehmen)
    <section id="hero-section" className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-[#fffbf7]">
      
      <HeroBackground />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LINKER BEREICH: TEXT & BRANDING */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
               
                {/* Standorts-Badge: mb-8 -> mb-6 reduziert */}
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

                {/* Main Headline: space-y durch margin-bottom am Element ersetzt für präzisere Kontrolle */}
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

                {/* Description: mb-8 statt mb-10 */}
                <FadeIn delay={0.3}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium text-pretty mb-8">
                        Ihr verlässlicher Partner in Frankfurt. Wir verbinden <span className="text-[var(--color-primary)] font-bold">fachliche Expertise</span> mit echter 
                        <span className="relative inline-block ml-2">
                             <span className="font-script text-3xl md:text-4xl text-[var(--color-accent)] font-bold">Zuwendung</span>
                        </span> 
                        <br className="hidden md:block" />– damit Sie sich jeden Tag sicher fühlen.
                    </p>
                </FadeIn>

                <FadeIn delay={0.4} className="w-full lg:w-auto">
                    <HeroWidget />
                </FadeIn>
          </div>

          {/* RECHTER BEREICH: SLIDER */}
          <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
             <HeroSlider />
          </div>

        </div>
      </div>
    </section>
  );
}