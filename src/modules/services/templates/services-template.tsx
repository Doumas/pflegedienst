"use client";

import Link from "next/link";
import { servicesData } from "@/modules/services/data/services"; 
import { ArrowRight, Check, Activity } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in"; 
import { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/utils/cn";

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- SUB-KOMPONENTE: SERVICE CARD ---
function ServiceCard({ service }: { service: any }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <Link 
            ref={ref}
            href={service.href} 
            className="group block h-full"
        >
            <div className={cn(
                "h-full flex flex-col bg-white rounded-[2.5rem] border p-8 shadow-lg shadow-slate-200/50 transition-all duration-500 relative overflow-hidden transform-gpu",
                // Hover: Teal Border & Shadow für Kompetenz
                isInCenter 
                    ? "border-[var(--color-primary)]/30 shadow-xl -translate-y-1" 
                    : "border-[var(--color-border-soft)] hover:shadow-xl hover:border-[var(--color-primary)]/30 hover:-translate-y-1"
            )}>
                
                {/* Gradient: Subtil Teal im Hintergrund */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent transition-opacity duration-700 pointer-events-none",
                    isInCenter ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />

                <div className="relative z-10 mb-6">
                    {/* ICON: Teal Background, White Icon */}
                    <div className={cn(
                        "mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-500",
                        isInCenter 
                            ? "bg-[var(--color-primary)] text-white border-transparent scale-105" 
                            : "bg-[var(--color-secondary)] border-[var(--color-border-soft)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-transparent group-hover:scale-105"
                    )}>
                        <service.icon className="h-8 w-8 transition-transform duration-500" />
                    </div>

                    <h3 className={cn(
                        "text-2xl font-bold mb-2 transition-colors duration-300",
                        isInCenter ? "text-[var(--color-primary)]" : "text-slate-900 group-hover:text-[var(--color-primary)]"
                    )}>
                        {service.title}
                    </h3>
                    
                    {/* Ladebalken: Orange Accent als "Lebenslinie" */}
                    <div className={cn(
                        "h-1 rounded-full transition-all duration-700 ease-out",
                        isInCenter ? "w-16 bg-[var(--color-accent)]" : "w-8 bg-[var(--color-secondary)] group-hover:w-16 group-hover:bg-[var(--color-accent)]"
                    )} />
                </div>
                
                <p className="relative z-10 text-slate-600 mb-8 leading-relaxed flex-grow font-medium">
                    {service.description}
                </p>

                <div className={cn(
                    "relative z-10 space-y-3 rounded-2xl p-5 border transition-colors duration-500",
                    isInCenter ? "bg-white/60 border-[var(--color-primary)]/10" : "bg-slate-50/50 border-slate-100 group-hover:bg-white/60 group-hover:border-[var(--color-primary)]/10"
                )}>
                    {service.features.slice(0, 3).map((f: string, j: number) => (
                        <div key={j} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <div className="mt-0.5 min-w-[16px] flex justify-center">
                                {/* Checkmark auch in Orange für Konsistenz */}
                                <Check className="w-4 h-4 text-[var(--color-accent)] stroke-[3]" />
                            </div>
                            <span className="leading-tight">{f}</span>
                        </div>
                    ))}
                </div>

                {/* CTA ARROW: Teal */}
                <div className={cn(
                    "absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all duration-500 shadow-sm",
                    isInCenter 
                        ? "opacity-100 scale-100 text-[var(--color-primary)] border-[var(--color-primary)]/20" 
                        : "text-slate-400 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/20"
                )}>
                    <ArrowRight className="w-5 h-5" />
                </div>

            </div>
        </Link>
    );
}

export function ServicesTemplate() {
  return (
    <div className="relative min-h-screen bg-white font-sans overflow-hidden">

      {/* HINTERGRUND FX (Warm Tone) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] animate-pulse pointer-events-none transform-gpu" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none transform-gpu" />


      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10">

        {/* --- HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-4">
          <div className="container mx-auto">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                
                {/* Badge mit Custom Icon */}
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8">
                        {/* Haus/Herz Icon */}
                        <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
                            <path d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z" className="text-[var(--color-accent)] stroke-[var(--color-accent)]" />
                        </svg>
                        <span>Unser Versprechen</span>
                    </div>
                </FadeIn>
                
               {/* Headline mit Script Font & Orange Underline */}
               <FadeIn delay={0.2}>
                   <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                    Gut versorgt <br/>
                    <span className="font-script text-[var(--color-primary)] text-[1.1em] relative inline-block px-1 mt-1 font-normal">
                        in jedem Alter.
                        {/* Orange Smile Swoosh */}
                        <svg className="absolute w-[110%] h-3 -bottom-2 -left-1 text-[var(--color-accent)] -z-10 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                    </h1>
               </FadeIn>
                
                <FadeIn delay={0.3}>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                    Von der medizinischen Behandlungspflege bis zur liebevollen Alltagshilfe. 
                    Wir sind da, wo Sie sich am wohlsten fühlen: <span className="text-[var(--color-accent)] font-script text-2xl px-1">Zuhause.</span>
                    </p>
                </FadeIn>
            </div>
          </div>
        </section>

        {/* --- GRID BEREICH --- */}
        <section className="pb-32 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {servicesData.map((service, i) => (
              <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up" className="h-full">
                  <ServiceCard service={service} />
              </FadeIn>
            ))}

            {/* CTA CARD (Sonderstatus) */}
            <FadeIn delay={0.8} className="h-full">
                <div className="h-full flex flex-col justify-center items-center text-center p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-[var(--color-secondary)]/30 hover:border-[var(--color-primary)]/20 transition-all duration-300 group cursor-pointer transform-gpu">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm text-slate-400 group-hover:text-[var(--color-primary)] transition-colors">
                        <Activity className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Individuelle Beratung?</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-xs font-medium">
                        Nicht sicher, welche Leistung passt? Wir beraten Sie kostenlos vor Ort.
                    </p>
                    <Link href="/kontakt">
                        <Button variant="outline" className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-2xl h-12 px-8 font-bold transition-all">
                        Kontakt aufnehmen
                        </Button>
                    </Link>
                </div>
            </FadeIn>

          </div>
        </section>

      </div>
    </div>
  );
}