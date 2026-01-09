"use client";

import Image from "next/image";
import { Quote, Award, Stethoscope, Clock, Heart } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { cn } from "@/shared/utils/cn";

export function AboutQuality() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-footer-bg)] text-white relative overflow-hidden font-sans">
      
      {/* 1. HINTERGRUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <AnimatedBackground icon={Award} variant="section" color="text-[var(--color-accent)]" />
          {/* Textur Overlay */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           
           {/* LINKS: BILD (Rotated Card Look) */}
           <FadeIn direction="right">
            <div className="relative group perspective-1000">
                {/* Rotierter Rahmen (Accent Color) */}
                <div className="absolute inset-0 border-2 border-[var(--color-accent)]/30 rounded-[2.5rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                
                {/* Bild Container */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/50 bg-black/20 transform-gpu transition-transform duration-700 group-hover:scale-[1.02]">
                    <Image 
                        src="/images/team/team.jpg" 
                        alt="Geprüfte Qualität bei Dalas Pflege" 
                        fill 
                        className="object-cover opacity-90" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-footer-bg)] via-transparent to-transparent opacity-90" />
                    
                    {/* Content im Bild */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <Quote className="w-10 h-10 text-[var(--color-accent)] mb-3 opacity-90" />
                        <div className="text-2xl font-bold text-white mb-1">Geprüfte Qualität</div>
                        <p className="text-white/80 text-sm font-medium">Unser Team besteht zu 100% aus festangestellten Fachkräften.</p>
                    </div>
                </div>
            </div>
           </FadeIn>

           {/* RECHTS: TEXT & FEATURES */}
           <div className="space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <FadeIn delay={0.2} direction="left">
                <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm shadow-sm">
                        <Award className="w-3 h-3" /> MDK Note 1.0
                    </div>

                    {/* HEADLINE: Hero Style */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-black mb-6 tracking-tight text-balance leading-[1.1]">
                        Kein Zufall, <br/>
                        sondern <span className="relative inline-block px-2 mt-1">
                            {/* Script Font + Orange (Accent) */}
                            <span className="relative z-10 font-script font-bold text-[var(--color-accent)] tracking-normal text-[1.1em]">
                                Standard.
                            </span>
                            {/* Orange Swoosh */}
                            <svg className="absolute w-[110%] h-3 lg:h-4 -bottom-1 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <div className="prose prose-invert text-white/80 leading-relaxed text-lg max-w-lg">
                        <p>
                        Einmal jährlich prüft der Medizinische Dienst (MDK) unangemeldet. 
                        Die Bestnote ist für uns Ansporn, jeden Tag unser Bestes zu geben. Wir legen Wert auf:
                        </p>
                    </div>
                </div>
              </FadeIn>

              {/* Feature Liste */}
              <div className="grid gap-4 w-full">
                 {[
                    { title: "Medizinische Genauigkeit", desc: "Korrekte Wundversorgung & Medikamentengabe.", icon: Stethoscope },
                    { title: "Verlässliche Organisation", desc: "Erreichbarkeit & transparente Abrechnung.", icon: Clock },
                    { title: "Menschliche Wärme", desc: "Wie wohl fühlen sich die Menschen bei uns?", icon: Heart },
                 ].map((fact, i) => (
                    <FadeIn key={i} delay={0.3 + (i * 0.1)} direction="left">
                        <div className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[var(--color-accent)]/30 transition-all duration-300 text-left relative overflow-hidden">
                            
                            {/* Icon Box (Jetzt in Primary Teal mit Glow) */}
                            <div className="shrink-0 w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300 border border-white/10 relative z-10">
                                <fact.icon className="w-7 h-7" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">{fact.title}</div>
                                <div className="text-base text-white/60 group-hover:text-white/80 transition-colors font-medium">{fact.desc}</div>
                            </div>
                        </div>
                    </FadeIn>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}