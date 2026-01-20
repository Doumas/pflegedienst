"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/shared/ui/fade-in";

export function StatsSection() {
  return (
    <section className="relative w-full bg-[var(--color-primary-deep)] text-white py-24 lg:py-32 overflow-hidden">
      
      {/* --- HINTERGRUND DEKO --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* 1. Soft Glow (Türkis) */}
          <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-[var(--color-primary)]/10 blur-[120px] rounded-full mix-blend-screen opacity-60" />

          {/* 2. Soft Glow (Creme) */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[var(--color-secondary)]/5 blur-[100px] rounded-full mix-blend-screen opacity-50" />

          {/* 3. Das "Kreuz" als riesiges Outline-Watermark */}
          <div className="absolute top-1/2 left-0 lg:left-1/4 -translate-y-1/2 -translate-x-1/2 opacity-[0.03]">
             <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 0H60V40H100V60H60V100H40V60H0V40H40V0Z" fill="currentColor"/>
             </svg>
          </div>
      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="container mx-auto h-full border-x border-white/20">
             <div className="absolute top-1/2 w-full h-px bg-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
          
          {/* --- LINKS: DIE RIESIGE ZAHL --- */}
          {/* FIX: pr-20 reduziert auf pr-12 für Laptops, damit mehr Platz bleibt */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:pr-12 xl:pr-20 border-b lg:border-b-0 lg:border-r border-white/10 pb-16 lg:pb-0 h-full">
            <FadeIn>
                <div className="relative">
                    {/* WIEDER GRÜN (Primary) */}
                    {/* FIX: Schriftgröße responsive angepasst (10rem bei lg, 13rem erst bei xl) */}
                    <span className="block text-[7rem] sm:text-[10rem] lg:text-[10rem] xl:text-[13rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-primary)]">
                        24/7
                    </span>
                    <span className="absolute -bottom-6 right-2 text-xs lg:text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                        Erreichbarkeit
                    </span>
                </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="mt-10 max-w-sm text-center lg:text-left">
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                    Pflege kennt keinen Feierabend. Seit unserer Gründung in Frankfurt stehen wir für verlässliche Versorgung – rund um die Uhr, an 365 Tagen im Jahr.
                </p>
            </FadeIn>
          </div>

          {/* --- RECHTS: TEXT INHALT --- */}
          {/* FIX: Padding angepasst (pl-12 bei lg, pl-24 erst bei xl) */}
          <div className="flex flex-col justify-center lg:pl-12 xl:pl-24 h-full pt-4 lg:pt-0">
             <FadeIn delay={0.3}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-12 text-white">
                    Mehr als nur Pflege. <br/>
                    <span className="text-[var(--color-primary)]">Verantwortung.</span>
                </h2>
             </FadeIn>

             {/* FIX DES LAYOUT PROBLEMS:
                 1. md:grid-cols-2 -> Auf Tablets (volle Breite) 2 Spalten.
                 2. lg:grid-cols-1 -> Auf kleinen Desktops (halbe Breite) 1 Spalte (STABILITÄT!).
                 3. xl:grid-cols-2 -> Auf großen Desktops wieder 2 Spalten.
             */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                <FadeIn delay={0.4}>
                    <p className="text-lg text-white/90 leading-relaxed font-medium">
                        Wir wissen, dass die Entscheidung für einen Pflegedienst Vertrauenssache ist. 
                        In Frankfurt verbinden wir deshalb kurze Wege mit höchster fachlicher Kompetenz. 
                        Vom Borsigallee-Standort aus koordinieren wir Einsätze schnell und effizient.
                    </p>
                </FadeIn>

                <FadeIn delay={0.5} className="flex flex-col justify-between">
                    <p className="text-sm text-white/60 leading-relaxed mb-8">
                        Dabei verlieren wir nie den Menschen aus den Augen. Unsere Philosophie basiert auf einem einfachen Grundsatz: 
                        Wir pflegen so, wie wir selbst gepflegt werden möchten. Mit Respekt, Zeit und einem offenen Ohr.
                    </p>
                    
                    {/* Kleiner Footer im Textblock */}
                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                            Qualität aus Frankfurt
                        </span>
                    </div>
                </FadeIn>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}