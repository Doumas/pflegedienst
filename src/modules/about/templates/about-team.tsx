"use client";

import { Users, Award, Quote } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { cn } from "@/shared/utils/cn";
import { AnimatedBackground } from "@/shared/ui/animated-background";

export function AboutTeam() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden font-sans">
      
      {/* 1. Sektions-Hintergrund (Lebendig aber dezent) */}
      <AnimatedBackground icon={Users} variant="section" color="text-[var(--color-primary)]" />
      
      {/* 2. Textur Overlay */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-20 flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <FadeIn>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                    Gesichter des <span className="text-[var(--color-primary)]">Vertrauens.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
                <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl">
                   Hinter professioneller Pflege steht immer ein starkes Team. 
                   Wir setzen auf qualifizierte Fachkräfte, die ihren Beruf lieben.
                </p>
            </FadeIn>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto lg:mx-0 items-start">
          
          {/* 1. ANNA (Links) */}
          <FadeIn delay={0.1} className="h-full">
            <div className="group bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 transition-all duration-500 border border-slate-100 hover:border-[var(--color-primary)]/20 text-center hover:-translate-y-2 h-full">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-[5px] border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors duration-500 shadow-inner">
                   <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <Users className="w-12 h-12" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">Anna Müller</h3>
                <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-6">Pflegedienstleitung</p>
                
                <div className="relative">
                   <Quote className="w-6 h-6 text-[var(--color-accent)] opacity-20 absolute -top-2 -left-2" />
                   <p className="text-slate-500 text-sm leading-relaxed italic relative z-10 px-2">
                     "Qualität bedeutet für mich, dass wir uns jeden Tag fragen: Ist das gut genug für meine eigene Familie?"
                   </p>
                </div>
            </div>
          </FadeIn>

          {/* 2. THOMAS (Mitte - Hervorgehoben/Versetzt) */}
          <FadeIn delay={0.2} className="h-full md:-mt-12">
            <div className="group relative bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-[var(--color-primary)]/10 hover:shadow-[var(--color-primary)]/20 transition-all duration-500 border border-[var(--color-primary)]/10 text-center z-10 hover:-translate-y-2 h-full">
                {/* Badge */}
                <div className="absolute top-6 right-6 text-[var(--color-accent)] bg-[var(--color-accent)]/10 p-2 rounded-full rotate-12 group-hover:rotate-0 transition-transform">
                    <Award className="w-6 h-6" />
                </div>

                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden mb-6 border-[5px] border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors duration-500 shadow-inner">
                   <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <Users className="w-14 h-14" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">Thomas Weber</h3>
                <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-6">Stellv. PDL & Wundexperte</p>
                
                <div className="relative">
                   <Quote className="w-6 h-6 text-[var(--color-accent)] opacity-20 absolute -top-2 -left-2" />
                   <p className="text-slate-500 text-sm leading-relaxed italic relative z-10 px-2">
                     "Moderne Wundversorgung und menschliche Zuwendung schließen sich nicht aus – sie gehören zusammen."
                   </p>
                </div>
            </div>
          </FadeIn>

           {/* 3. SARAH (Rechts) */}
           <FadeIn delay={0.3} className="h-full">
            <div className="group bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 transition-all duration-500 border border-slate-100 hover:border-[var(--color-primary)]/20 text-center hover:-translate-y-2 h-full">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-[5px] border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors duration-500 shadow-inner">
                   <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <Users className="w-12 h-12" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">Sarah Klein</h3>
                <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-6">Verwaltung</p>
                
                <div className="relative">
                   <Quote className="w-6 h-6 text-[var(--color-accent)] opacity-20 absolute -top-2 -left-2" />
                   <p className="text-slate-500 text-sm leading-relaxed italic relative z-10 px-2">
                     "Ich kümmere mich um den Papierkram mit der Kasse, damit Sie den Kopf für Wichtigeres frei haben."
                   </p>
                </div>
            </div>
           </FadeIn>

        </div>
      </div>
    </section>
  );
}