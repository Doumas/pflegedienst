"use client";

import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button"; 
import { ArrowRight, CheckCircle2, MessageCircle, Euro, Car, Clock, Heart, Briefcase } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; 
import { AnimatedBackground } from "@/shared/ui/animated-background";

function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
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

function ChatCard() {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative w-full max-w-lg bg-white rounded-[3rem] p-8 sm:p-10 border border-slate-100 transition-all duration-500 transform-gpu shadow-2xl",
                isInCenter ? "scale-[1.02] shadow-[var(--color-primary)]/10" : "hover:scale-[1.01]"
            )}
        >
            <div className="flex items-center gap-5 mb-8 border-b border-slate-50 pb-6 text-left">
                <div className={cn(
                    "w-16 h-16 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center shadow-lg transition-transform duration-500",
                    isInCenter ? "scale-110 rotate-3" : "group-hover:rotate-3"
                )}>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Heart className="w-8 h-8 text-white fill-white/20" />
                    </motion.div>
                </div>
                <div>
                    <div className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest bg-[var(--color-secondary)] px-3 py-1 rounded-full w-fit mb-1.5">
                        Wir stellen ein
                    </div>
                    <div className="font-black text-slate-900 text-xl tracking-tight text-left">Dein neues Team</div>
                </div>
            </div>

            <div className="space-y-6 mb-10 text-left">
                <div className="bg-[var(--color-secondary)]/50 rounded-2xl rounded-tl-none p-6 border border-[var(--color-primary)]/5">
                    <p className="text-slate-700 text-base font-bold leading-relaxed">
                        &quot;Hey! 👋 Suchst du einen Job, bei dem der Mensch wieder im Mittelpunkt steht?&quot;
                    </p>
                </div>
                <div className="bg-[var(--color-primary)]/5 rounded-2xl rounded-tr-none p-6 border border-[var(--color-primary)]/10 ml-8 text-right">
                    <p className="text-[var(--color-primary)] text-base font-black leading-relaxed">
                        &quot;Ja, genau das suche ich! Wo kann ich mich melden?&quot;
                    </p>
                </div>
            </div>

            <Link href="/karriere" className="block w-full">
                <div className={cn(
                    "w-full bg-[var(--color-primary)] text-white py-5 rounded-2xl font-black text-lg text-center shadow-xl shadow-[var(--color-primary)]/20 transition-all active:scale-95 flex items-center justify-center gap-3",
                    "hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5"
                )}>
                    <MessageCircle className="w-6 h-6" />
                    Jetzt Express bewerben
                </div>
            </Link>
            
            <div className="text-center mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> In 60 Sekunden fertig
            </div>
        </div>
    );
}

export function CareerTeaser() {
  return (
    /* HINTERGRUNDFARBE WIEDER HERGESTELLT: var(--color-secondary) Verlauf */
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[var(--color-secondary)] to-white font-sans overflow-hidden relative border-t border-white">
      
      <AnimatedBackground 
            icon={Briefcase} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={6} 
            className="opacity-20" 
      />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LINKS: CONTENT - Zentriert fixiert */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
            
            <FadeIn delay={0.1} className="flex justify-center w-full lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm">
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Briefcase className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    </motion.div>
                    Karriere bei uns
                </div>
            </FadeIn>
            
           <FadeIn delay={0.2} className="flex justify-center w-full lg:justify-start">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight text-balance leading-[1.1]">
                Kein Applaus. <br/>
                <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">Sondern Respekt.</span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
                </h2>
           </FadeIn>
            
            <FadeIn delay={0.3} className="flex justify-center w-full lg:justify-start">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-lg font-medium text-pretty">
                Wir wissen, was du jeden Tag leistest. Deshalb bieten wir dir Bedingungen, die du wirklich verdienst.
                </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                { icon: Euro, text: "Überdurchschnittliches Gehalt" },
                { icon: Clock, text: "Wunsch-Dienstplan" },
                { icon: Car, text: "Eigener Firmenwagen" },
                { icon: Heart, text: "Echtes Familien-Gefühl" },
              ].map((benefit, i) => (
                <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up">
                    <div className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-[var(--color-primary)]/20 hover:shadow-xl transition-all duration-300 transform-gpu">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white">
                            <benefit.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm leading-tight text-left">{benefit.text}</span>
                    </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.8} className="pt-4 w-full flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link href="/karriere" className="w-full sm:w-auto">
                    <div className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-full h-16 px-10 text-lg rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 transition-all font-black bg-[var(--color-primary)]"
                    )}>
                        Offene Stellen ansehen <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                </Link>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center lg:text-left leading-relaxed">
                    Tipp: Bewerbung <br className="hidden lg:block"/> ohne Lebenslauf
                </p>
            </FadeIn>
          </div>

          {/* RECHTS: CHAT VISUAL */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
             <FadeIn delay={0.5} direction="left" className="relative w-full flex justify-center lg:justify-end">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-accent-soft)] rounded-full blur-[100px] opacity-40" />
                 <ChatCard />
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}