"use client";

import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button"; 
import { ArrowRight, SmilePlus, CheckCircle2, MessageCircle, Euro, Car, Clock, Heart } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in"; // <--- NEU
import { useState, useEffect, useRef } from "react";

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            // Fokusbereich in der Mitte
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- SUB-KOMPONENTE: CHAT KARTE (Für Mobile Focus) ---
function ChatCard() {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative w-full max-w-md bg-white rounded-[2.5rem] p-8 border border-white/60 backdrop-blur-md transition-all duration-500 transform-gpu ring-1 ring-slate-100",
                // Mobile Focus Logik
                isInCenter 
                    ? "rotate-0 scale-[1.02] shadow-2xl shadow-[var(--color-primary)]/20" 
                    : "lg:rotate-2 lg:hover:rotate-0 hover:scale-[1.02] shadow-2xl shadow-slate-200/60"
            )}
        >
            
            {/* Header Karte */}
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                
                {/* AVATAR */}
                <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20 shrink-0 transition-transform duration-500",
                    isInCenter ? "scale-110" : "group-hover:scale-110"
                )}>
                    <span className="text-white font-black text-2xl font-serif">D</span>
                </div>
                
                <div>
                    <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wide bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full w-fit mb-1">
                        Wir stellen ein
                    </div>
                    <div className="font-black text-slate-900 text-lg">Dein neues Team</div>
                </div>
            </div>

            {/* Chat Visualisierung */}
            <div className="space-y-4 mb-8">
                {/* Bubble 1: Team */}
                <div className="bg-[var(--color-secondary)] rounded-2xl rounded-tl-none p-5 border border-[var(--color-border-soft)] relative">
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                        "Hey! 👋 Suchst du einen Job, bei dem der Mensch wieder im Mittelpunkt steht?"
                    </p>
                </div>
                
                {/* Bubble 2: Bewerber */}
                <div className="bg-[var(--color-primary)]/5 rounded-2xl rounded-tr-none p-5 border border-[var(--color-primary)]/10 ml-8 text-right">
                    <p className="text-[var(--color-primary-deep)] text-sm font-bold">
                        "Ja, genau das suche ich! Wo kann ich mich melden?"
                    </p>
                </div>
            </div>

            {/* CTA Button in der Karte */}
            <Link href="/karriere" className="block w-full group">
                <div className={cn(
                    "w-full bg-[var(--color-primary)] text-white py-4 rounded-full font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 active:scale-95",
                    isInCenter ? "bg-[var(--color-primary-hover)] scale-[1.02]" : "hover:bg-[var(--color-primary-hover)] group-hover:scale-[1.02] hover:-translate-y-0.5"
                )}>
                    <MessageCircle className="w-5 h-5" />
                    Jetzt Express bewerben
                </div>
            </Link>
            
            <div className="text-center mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 
                Dauert nur 1 Minute
            </div>

        </div>
    );
}

export function CareerTeaser() {
  return (
    // HINTERGRUND: Hellblau (Secondary) + Verlauf nach Weiß unten
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[var(--color-secondary)] to-white font-sans overflow-hidden relative border-t border-white">
      
      {/* ========================================================= */}
      {/* HINTERGRUND FX - GPU Optimiert                            */}
      {/* ========================================================= */}
      
      {/* 1. DAS GROSSE "TEAM" IM HINTERGRUND */}
      <FadeIn delay={0.1} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-full flex justify-center">
        <div className="text-[18vw] font-black text-[var(--color-primary)] opacity-[0.03] select-none tracking-tighter leading-none whitespace-nowrap transform-gpu">
            TEAM
        </div>
      </FadeIn>

      {/* 2. Blob oben rechts */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none mix-blend-overlay transform-gpu will-change-transform" />


      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LINKS: PITCH + BENEFITS --- */}
          <div className="space-y-8 order-2 lg:order-1">
            
            <FadeIn delay={0.2}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm">
                <SmilePlus className="w-4 h-4 text-[var(--color-accent)]" />
                Karriere bei uns
                </div>
            </FadeIn>
            
           <FadeIn delay={0.3}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                Kein Applaus. <br/>
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                    Sondern Respekt.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span>
                </h2>
           </FadeIn>
            
            <FadeIn delay={0.4}>
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                Wir wissen, was du leistest. Deshalb bieten wir dir Bedingungen, die du verdienst:
                </p>
            </FadeIn>

            {/* --- BENEFITS GRID (Staggered) --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              {[
                { icon: Euro, text: "Top Gehalt + Zuschläge" },
                { icon: Clock, text: "Wunsch-Dienstplan" },
                { icon: Car, text: "Eigener Firmenwagen" },
                { icon: Heart, text: "Echtes Team-Gefühl" },
              ].map((benefit, i) => (
                <FadeIn key={i} delay={0.5 + (i * 0.1)} direction="up">
                    <div className="group flex items-center gap-4 bg-white/80 p-4 rounded-2xl border border-white hover:border-[var(--color-primary)]/20 hover:bg-white hover:shadow-lg transition-all shadow-sm transform-gpu">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 border border-[var(--color-primary)]/5 transition-all duration-300 group-hover:scale-110">
                        <benefit.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm leading-tight">{benefit.text}</span>
                    </div>
                </FadeIn>
              ))}
            </div>

            {/* Buttons & Hinweis */}
            <div className="pt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
               <FadeIn delay={0.9} direction="right">
                   <Link href="/karriere">
                    <div className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-14 px-8 text-lg rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 active:scale-95 transition-all cursor-pointer font-bold"
                    )}>
                    Zu den offenen Stellen
                    <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                   </Link>
               </FadeIn>
               
               <FadeIn delay={1.0} direction="right">
                   <p className="text-xs text-slate-500 font-medium leading-tight max-w-[200px]">
                    <strong className="text-[var(--color-primary)]">Tipp:</strong> Bewerbung in unter 60 Sek. ohne Lebenslauf möglich.
                   </p>
               </FadeIn>
            </div>
          </div>

          {/* --- RECHTS: VISUAL (Chat Style) --- */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 py-2 lg:py-0">
             <FadeIn delay={0.5} direction="left" className="relative w-full flex justify-center lg:justify-end">
                 {/* Glow hinter der Karte */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/60 rounded-full blur-[80px]" />

                 <ChatCard />
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}