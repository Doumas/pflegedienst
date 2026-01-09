"use client"; 

import { motion } from "framer-motion"; 
import { Ambulance } from "lucide-react"; 
import { FadeIn } from "@/shared/ui/fade-in";

// WICHTIG: Die Pfade gehen einen Schritt zurück (../), da Hero.tsx in /templates ist
import { HeroBackground } from "../components/hero-background";
import { HeroSlider } from "../components/hero-slider";
import { HeroWidget } from "../components/hero-widget";

export function Hero() {
  return (
    <section id="hero-section" className="relative w-full overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 text-center px-4 flex items-center lg:min-h-[90vh] bg-[#fffbf7]">
      
      {/* 1. HINTERGRUND */}
      <HeroBackground />
      
      {/* 2. CONTENT GRID */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center lg:items-start">
          
          {/* LINKER BEREICH: TEXT & BADGE */}
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
               
               {/* Badge */}
               <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[var(--color-primary)]/20 text-[var(--color-primary-deep)] text-xs font-bold shadow-sm tracking-wide uppercase group hover:border-[var(--color-primary)]/40 transition-colors cursor-default">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <Ambulance className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-accent)]" />
                        </motion.div>
                        Borsigallee 37, 60388 Frankfurt
                    </div>
                </FadeIn>

                {/* Headline */}
                <FadeIn delay={0.2}>
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-slate-900 mb-4 tracking-tight text-balance leading-[1.05] drop-shadow-sm">
                        Gut versorgt. <br/>
                        <span className="relative inline-block px-1 mt-2 lg:mt-3">
                            {/* ÄNDERUNG: Jetzt Script-Font und Orange (Accent), passend zu Bild 2 */}
                            <span className="relative z-10 font-script font-bold text-[var(--color-accent)] tracking-normal text-[1.1em]">
                                Zuhause leben.
                            </span>
                            {/* Orange Unterstreichung */}
                            <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                </FadeIn>

                {/* Subtext */}
                <FadeIn delay={0.3}>
                    <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium text-pretty">
                    Ihr verlässlicher Partner in Frankfurt. Wir verbinden <span className="font-bold text-[var(--color-primary)]">fachliche Kompetenz</span> mit echter 
                    {/* Auch hier Script & Orange für Konsistenz */}
                    <span className="font-script text-2xl text-[var(--color-accent)] px-1.5 font-bold">Zuwendung</span> 
                    – damit Sie sich sicher fühlen.
                    </p>
                </FadeIn>
          </div>

          {/* RECHTER BEREICH: SLIDER */}
          <HeroSlider />

          {/* UNTERER BEREICH: WIDGET (Order 3, damit es unter dem Text bleibt mobil) */}
          <HeroWidget />

        </div>
      </div>
    </section>
  );
}