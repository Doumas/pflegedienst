"use client";
import { useRef, useState, useEffect } from "react";
import { UserX, UserCheck, FileText, CheckCircle2, Download } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";

// Lokaler Helper Hook (kannst du auch global in utils packen)
function useInCenter(options = { threshold: 0.1 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => setIsInCenter(entry.isIntersecting), { rootMargin: "-30% 0px -30% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

export function AboutConcept({ onOpenFlyer }: { onOpenFlyer: () => void }) {
  const { ref: cardRef, isInCenter: cardActive } = useInCenter();

  return (
    <section className="py-24 lg:py-32 bg-white relative">
        <div className="container px-4 md:px-6 relative z-10">
          
          <div className="max-w-3xl mb-16 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
           <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        Das Prinzip <span className="text-[var(--color-primary)]">Bezugspflege.</span>
                </h2>
           </FadeIn>
           <FadeIn delay={0.2} direction="right">
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    In vielen Pflegediensten gleicht der Alltag einem Bahnhof: Jeden Tag ein anderes Gesicht. 
                    Wir haben für Sie eine <strong>5-seitige Broschüre</strong> zusammengestellt, die unser Konzept und erste Hilfestellungen erklärt.
                </p>
           </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
             
             {/* Die "Andere" Seite */}
             <FadeIn delay={0.1} direction="right" className="h-full">
                <div className={cn(
                    "bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 transition-all duration-500 flex flex-col justify-center h-full",
                    cardActive ? "opacity-60 scale-95" : "opacity-80 hover:opacity-100"
                )}>
                    <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                        <UserX className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Klassische Pflege</h3>
                    </div>
                    <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Ständig wechselndes Personal
                    </li>
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Anonyme Abwicklung
                    </li>
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Hektik und Zeitdruck
                    </li>
                    </ul>
                </div>
             </FadeIn>

             {/* UNSERE SEITE */}
             <FadeIn delay={0.3} direction="left" className="h-full">
                <div 
                    ref={cardRef}
                    onClick={onOpenFlyer}
                    className={cn(
                        "group cursor-pointer bg-[var(--color-secondary)] rounded-[2.5rem] p-8 md:p-10 border relative overflow-hidden transition-all duration-500 transform-gpu h-full",
                        cardActive 
                            ? "scale-[1.03] shadow-2xl shadow-[var(--color-primary)]/20 border-[var(--color-primary)]/30" 
                            : "scale-100 shadow-xl shadow-[var(--color-primary)]/5 border-[var(--color-border-soft)] hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--color-primary)]/10"
                    )}
                >
                    <div className={cn(
                        "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-accent)]/50 to-[var(--color-accent)]/10 rounded-bl-[100px] transition-transform duration-700",
                        cardActive ? "scale-125" : "scale-100 group-hover:scale-110"
                    )} />
                    
                    <div className={cn(
                        "absolute top-6 right-6 transition-all duration-500 text-[var(--color-accent)] font-bold text-xs uppercase tracking-wide flex items-center gap-1",
                        cardActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    )}>
                        Broschüre öffnen <FileText className="w-3 h-3" />
                    </div>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={cn(
                        "w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30 transition-transform duration-500",
                        cardActive ? "scale-110 rotate-6" : "group-hover:scale-110 group-hover:rotate-6"
                    )}>
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <h3 className={cn(
                        "text-2xl font-black text-slate-900 transition-colors duration-300",
                        (cardActive) && "text-[var(--color-primary)]"
                    )}>Herz & Hand Prinzip</h3>
                    </div>
                    <ul className="space-y-4 relative z-10">
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Feste, kleine Teams (max. 3 Personen)</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Persönliche Beziehung & Vertrauen</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Realistische Zeitplanung für Gespräche</span>
                    </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-[var(--color-primary)]/10 relative z-10">
                    <p className="text-sm font-bold text-[var(--color-primary)] flex items-center gap-2">
                        <Download className="w-4 h-4" /> Klicken Sie hier für die Info-Broschüre (PDF)
                    </p>
                    </div>
                </div>
             </FadeIn>

          </div>
        </div>
      </section>
  );
}