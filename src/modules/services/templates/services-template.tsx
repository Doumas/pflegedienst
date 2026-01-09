"use client";

import Link from "next/link";
import { servicesData } from "@/modules/services/data/services"; 
import { ArrowRight, Check, Activity } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in"; 
import { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion"; // Für die Badge-Animation

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.1 }) {
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
                isInCenter 
                    ? "border-[var(--color-primary)]/30 shadow-xl -translate-y-1.5" 
                    : "border-slate-100 hover:shadow-xl hover:border-[var(--color-primary)]/30 hover:-translate-y-1.5"
            )}>
                
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-transparent transition-opacity duration-700 pointer-events-none",
                    isInCenter ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />

                <div className="relative z-10 mb-6">
                    <div className={cn(
                        "mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500",
                        isInCenter 
                            ? "bg-[var(--color-primary)] text-white border-transparent shadow-lg shadow-[var(--color-primary)]/20 scale-105" 
                            : "bg-white border-slate-100 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-transparent group-hover:scale-105"
                    )}>
                        <service.icon className="h-8 w-8" />
                    </div>

                    <h3 className={cn(
                        "text-2xl font-black mb-3 transition-colors duration-300 tracking-tight",
                        isInCenter ? "text-slate-900" : "text-slate-800 group-hover:text-slate-900"
                    )}>
                        {service.title}
                    </h3>
                    
                    <div className={cn(
                        "h-1 rounded-full transition-all duration-700 ease-out",
                        isInCenter ? "w-20 bg-[var(--color-accent)]" : "w-8 bg-slate-100 group-hover:w-20 group-hover:bg-[var(--color-accent)]"
                    )} />
                </div>
                
                <p className="relative z-10 text-slate-600 mb-8 leading-relaxed flex-grow font-medium text-pretty">
                    {service.description}
                </p>

                <div className={cn(
                    "relative z-10 space-y-3 rounded-2xl p-5 border transition-all duration-500",
                    isInCenter ? "bg-white border-[var(--color-primary)]/10 shadow-sm" : "bg-slate-50/50 border-transparent group-hover:bg-white group-hover:border-[var(--color-primary)]/10 group-hover:shadow-sm"
                )}>
                    {service.features.slice(0, 3).map((f: string, j: number) => (
                        <div key={j} className="flex items-start gap-3 text-sm text-slate-600 font-bold">
                            <div className="mt-0.5 flex-shrink-0">
                                <Check className="w-4 h-4 text-[var(--color-primary)] stroke-[3]" />
                            </div>
                            <span className="leading-tight">{f}</span>
                        </div>
                    ))}
                </div>

                <div className={cn(
                    "mt-8 flex items-center gap-2 text-sm font-bold transition-all duration-300",
                    isInCenter ? "text-[var(--color-primary)] translate-x-1" : "text-slate-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-1"
                )}>
                    Details ansehen <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
}

export function ServicesTemplate() {
  return (
    <div className="relative min-h-screen bg-[#fffbf7] font-sans overflow-hidden">

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-accent-soft)]/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[var(--color-secondary)]/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">

        {/* --- HEADER (Jetzt komplett zentriert) --- */}
        <section className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-4">
          <div className="container mx-auto">
            
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                
                {/* Badge mit Animation */}
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Activity className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        </motion.div>
                        <span>Unser Leistungsspektrum</span>
                    </div>
                </FadeIn>
                
               <FadeIn delay={0.2}>
                   <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.05]">
                    Gut versorgt <br/>
                    <span className="relative inline-block px-2 mt-2">
                        <span className="relative z-10 font-script text-[var(--color-accent)] font-bold tracking-normal">
                            in jedem Alter.
                        </span>
                        <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                    </h1>
               </FadeIn>
                
                <FadeIn delay={0.3}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium text-pretty">
                    Vom medizinischen Fachdienst bis zur herzlichen Unterstützung im Alltag. Wir ermöglichen Ihnen ein <span className="text-[var(--color-primary)] font-bold">würdevolles Leben</span> in Ihren eigenen vier Wänden.
                    </p>
                </FadeIn>
            </div>
          </div>
        </section>

        {/* --- GRID --- */}
        <section className="pb-32 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {servicesData.map((service, i) => (
              <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up" className="h-full">
                  <ServiceCard service={service} />
              </FadeIn>
            ))}

            {/* CALL TO ACTION CARD */}
            <FadeIn delay={0.8} className="h-full">
                <div className="h-full flex flex-col justify-center items-center text-center p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all duration-500 group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-soft)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-20 h-20 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center mb-6 shadow-sm text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500 relative z-10">
                        <Activity className="w-10 h-10" />
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Individuelle Beratung?</h3>
                        <p className="text-slate-600 text-sm mb-8 max-w-xs font-bold leading-relaxed">
                            Nicht sicher, welche Leistung für Sie oder Ihre Angehörigen am besten passt?
                        </p>
                        <Link href="/kontakt">
                            <Button size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl px-10 font-bold shadow-xl shadow-[var(--color-primary)]/20">
                                Jetzt anfragen
                            </Button>
                        </Link>
                    </div>
                </div>
            </FadeIn>

          </div>
        </section>

      </div>
    </div>
  );
}