"use client";
import { useRef, useState, useEffect } from "react";
import { UserX, UserCheck, FileText, CheckCircle2, Download, ArrowRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";

// Lokaler Helper Hook
function useInCenter(options = { threshold: 0.1 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => setIsInCenter(entry.isIntersecting), { rootMargin: "-20% 0px -20% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

export function AboutConcept({ onOpenFlyer }: { onOpenFlyer: () => void }) {
  const { ref: cardRef, isInCenter: cardActive } = useInCenter();

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Dekorativer Hintergrund-Blob (Dezent) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          
          {/* 1. HEADLINE AREA (Zentriert & Styled wie Hero) */}
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-16 lg:mb-20">
           <FadeIn direction="up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        Das Prinzip <br className="hidden md:block" />
                        <span className="relative inline-block px-2 mt-2">
                            {/* UPDATE: Script Font + Orange (Accent) */}
                            <span className="relative z-10 font-script font-bold text-[var(--color-accent)] tracking-normal text-[1.1em]">
                                Bezugspflege.
                            </span>
                            {/* Orange Swoosh */}
                            <svg className="absolute w-[110%] h-3 lg:h-4 -bottom-1 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                </h2>
           </FadeIn>
           <FadeIn delay={0.2} direction="up">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl text-pretty">
                    In vielen Pflegediensten gleicht der Alltag einem Bahnhof: Jeden Tag ein anderes Gesicht. 
                    Wir setzen auf <strong>Vertrauen und Beständigkeit</strong>.
                </p>
           </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-stretch">
             
             {/* LINKS: Die "Andere" Seite (Kalt / Grau) */}
             <FadeIn delay={0.1} direction="right" className="h-full">
                <div className={cn(
                    "bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 transition-all duration-500 flex flex-col justify-center h-full relative overflow-hidden group/bad",
                    "hover:shadow-lg hover:border-slate-200"
                )}>
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="flex items-center gap-5 mb-8 relative z-10">
                        <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover/bad:scale-110 transition-transform duration-300">
                            <UserX className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Oft üblich</div>
                            <h3 className="text-xl font-bold text-slate-700">Klassische Rotation</h3>
                        </div>
                    </div>

                    <ul className="space-y-5 relative z-10">
                        <li className="flex gap-4 text-slate-500 font-medium items-center">
                            <span className="w-6 h-6 rounded-full bg-red-50 text-red-400 font-bold flex items-center justify-center shrink-0 border border-red-100">✕</span> 
                            Ständig wechselndes Personal
                        </li>
                        <li className="flex gap-4 text-slate-500 font-medium items-center">
                            <span className="w-6 h-6 rounded-full bg-red-50 text-red-400 font-bold flex items-center justify-center shrink-0 border border-red-100">✕</span> 
                            Anonyme Abwicklung
                        </li>
                        <li className="flex gap-4 text-slate-500 font-medium items-center">
                            <span className="w-6 h-6 rounded-full bg-red-50 text-red-400 font-bold flex items-center justify-center shrink-0 border border-red-100">✕</span> 
                            Hektik und Zeitdruck
                        </li>
                    </ul>
                </div>
             </FadeIn>

             {/* RECHTS: UNSERE SEITE (Warm / Teal & Orange) */}
             <FadeIn delay={0.3} direction="left" className="h-full">
                <div 
                    ref={cardRef}
                    onClick={onOpenFlyer}
                    className={cn(
                        "group cursor-pointer bg-[var(--color-secondary)] rounded-[2.5rem] p-8 md:p-12 border relative overflow-hidden transition-all duration-500 transform-gpu h-full",
                        cardActive 
                            ? "scale-[1.02] shadow-2xl shadow-[var(--color-primary)]/15 border-[var(--color-primary)]/30" 
                            : "scale-100 shadow-xl shadow-[var(--color-primary)]/5 border-[var(--color-border-soft)] hover:scale-[1.01] hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30"
                    )}
                >
                    {/* Orange Gradient Corner */}
                    <div className={cn(
                        "absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent rounded-bl-[150px] transition-transform duration-700 pointer-events-none",
                        cardActive ? "scale-110" : "scale-100 group-hover:scale-110"
                    )} />
                    
                    {/* Flyer Badge (Oben Rechts) */}
                    <div className={cn(
                        "absolute top-8 right-8 transition-all duration-500 text-[var(--color-accent)] font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-accent)]/20 shadow-sm",
                        cardActive ? "opacity-100 translate-y-0" : "opacity-80 group-hover:opacity-100 group-hover:-translate-y-1"
                    )}>
                        <FileText className="w-3.5 h-3.5" /> Broschüre öffnen
                    </div>

                    <div className="flex items-center gap-5 mb-8 relative z-10">
                        <div className={cn(
                            "w-14 h-14 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30 transition-transform duration-500",
                            cardActive ? "scale-110 rotate-3" : "group-hover:scale-110 group-hover:rotate-3"
                        )}>
                            <UserCheck className="w-7 h-7" />
                        </div>
                        <div>
                             <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">Unser Standard</div>
                             <h3 className="text-2xl font-black text-slate-900">Herz & Hand Prinzip</h3>
                        </div>
                    </div>

                    <ul className="space-y-5 relative z-10">
                        <li className="flex gap-4 items-start group/li">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 text-[var(--color-primary)]">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-800 text-lg group-hover/li:text-[var(--color-primary)] transition-colors">
                                Feste, kleine Teams <span className="text-slate-400 font-medium text-sm block sm:inline">(max. 3 Personen)</span>
                            </span>
                        </li>
                        <li className="flex gap-4 items-start group/li">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 text-[var(--color-primary)]">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-800 text-lg group-hover/li:text-[var(--color-primary)] transition-colors">
                                Persönliche Beziehung
                            </span>
                        </li>
                        <li className="flex gap-4 items-start group/li">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 text-[var(--color-primary)]">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-800 text-lg group-hover/li:text-[var(--color-primary)] transition-colors">
                                Zeit für Gespräche
                            </span>
                        </li>
                    </ul>

                    {/* Footer Button Text */}
                    <div className="mt-8 pt-6 border-t border-[var(--color-primary)]/10 relative z-10 flex items-center justify-between group-hover:translate-x-1 transition-transform">
                        <p className="text-sm font-bold text-[var(--color-accent)] flex items-center gap-2">
                            <Download className="w-4 h-4" /> 
                            <span>Info-Broschüre ansehen (PDF)</span>
                        </p>
                        <ArrowRight className="w-4 h-4 text-[var(--color-accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
             </FadeIn>

          </div>
        </div>
      </section>
  );
}