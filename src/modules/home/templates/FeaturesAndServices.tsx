"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Clock, Activity, Coffee, Syringe, ArrowRight, CheckCircle2, Sparkles, Home } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background"; 
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.2 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, { rootMargin: "-25% 0px -25% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

export function FeaturesAndServices() {
  
  const { ref: card1Ref, isInCenter: card1Active } = useInCenter();
  const { ref: card2Ref, isInCenter: card2Active } = useInCenter();
  const { ref: card3Ref, isInCenter: card3Active } = useInCenter();
  const { ref: card4Ref, isInCenter: card4Active } = useInCenter();
  const { ref: card5Ref, isInCenter: card5Active } = useInCenter();

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--color-footer-bg)] overflow-hidden font-sans text-white border-t border-white/10">
      
      {/* 1. SEKTIONS-HINTERGRUND (Häuser Icons) */}
      <AnimatedBackground 
            icon={Home} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={12} 
            className="opacity-20" 
      />

      {/* 2. FX Layer (Glows & Pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 lg:mb-24 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            
            {/* BADGE mit animiertem SVG-Icon */}
            <FadeIn delay={0.1} className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] text-[10px] font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-sm">
                    <motion.svg 
                        viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="w-3.5 h-3.5 overflow-visible"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.path d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" className="text-white" variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring" } } }} />
                        <motion.path d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z" className="text-[var(--color-accent)] stroke-[var(--color-accent)]" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { delay: 0.3, duration: 0.8, ease: "easeInOut" } } }} />
                    </motion.svg>
                    Unsere Expertise
                </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-balance">
                Mehr als nur Pflege. <br/>
                <span className="relative inline-block px-2 mt-2 lg:mt-4">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">Lebensqualität.</span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
                </h2>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.3} className="max-w-md mx-auto lg:mx-0">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium text-pretty">
                Wir verbinden medizinische Professionalität mit menschlicher Wärme. 
                Hier ist ein Überblick, wie wir Sie im Alltag unterstützen.
            </p>
          </FadeIn>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          
          {/* CARD 1: Herz & Verstand */}
          <FadeIn delay={0.4} className="lg:col-span-2 h-full">
            <div ref={card1Ref} className="h-full">
                <Link href="/ueber-uns" className={cn(
                        "group relative overflow-hidden rounded-[3rem] bg-white/[0.03] border p-10 lg:p-14 transition-all duration-700 cursor-pointer flex flex-col justify-between h-full transform-gpu",
                        card1Active ? "bg-white/[0.08] border-[var(--color-primary)]/40 scale-[1.01]" : "border-white/10 hover:border-[var(--color-primary)]/30 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    
                    <AnimatedBackground icon={Heart} variant="card" count={3} color="text-white" className="opacity-10" />

                    <div className="relative z-10 w-full">
                        <div className="w-full flex justify-center lg:justify-start mb-10">
                            <motion.div 
                                animate={card1Active ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                                transition={{ duration: 3, repeat: Infinity }}
                                className={cn(
                                    "w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-white border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-500",
                                    card1Active ? "bg-[var(--color-primary)] scale-110" : "group-hover:bg-[var(--color-primary)] group-hover:scale-110"
                                )}
                            >
                                <Heart className="w-10 h-10 fill-current" />
                            </motion.div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Herz & Verstand</h3>
                        <p className="text-xl text-white/90 max-w-xl leading-relaxed font-medium">
                            Fachliches Können ist unsere Basis, aber Empathie ist unser Schlüssel. 
                            Wir pflegen nicht nach der Stoppuhr, sondern richten uns nach dem Menschen. 
                        </p>
                    </div>
                    
                    <div className={cn(
                        "mt-10 flex items-center gap-3 font-black text-sm uppercase tracking-widest transition-all",
                        card1Active ? "text-[var(--color-accent)] translate-x-2 opacity-100" : "text-white/60 group-hover:text-[var(--color-accent)] group-hover:translate-x-2"
                    )}>
                        Mehr erfahren <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 2: 24h Notfall */}
          <FadeIn delay={0.5} className="lg:col-span-1 h-full">
            <div ref={card2Ref} className="h-full">
                <Link href="/kontakt" className={cn(
                        "group relative overflow-hidden rounded-[3rem] bg-[var(--color-primary)] border border-white/10 p-10 lg:p-14 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full hover:shadow-2xl",
                        "items-center text-center lg:items-start lg:text-left",
                        card2Active && "shadow-[var(--color-primary)]/40 scale-[1.02]"
                    )}>
                    
                    <AnimatedBackground icon={Clock} variant="card" count={2} color="text-white" className="opacity-20" />

                    <div className="w-full relative z-10">
                        <div className="w-full flex justify-center lg:justify-start mb-10">
                            <motion.div 
                                animate={card2Active ? { rotate: 360 } : {}}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-20 h-20 rounded-3xl flex items-center justify-center text-[var(--color-primary)] bg-white shadow-2xl transition-transform group-hover:scale-110"
                            >
                                <Clock className="w-10 h-10" />
                            </motion.div>
                        </div>
                        <h4 className="text-3xl font-black text-white mb-4 tracking-tight">24h Erreichbarkeit</h4>
                        <p className="text-white/95 leading-relaxed font-bold text-lg">
                            Krankheit kennt keinen Feierabend. Im Notfall sind wir rund um die Uhr da.
                        </p>
                    </div>
                    <div className="mt-10 w-full flex justify-center lg:justify-start relative z-10">
                        <span className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] bg-white text-[var(--color-primary)] px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 3: Grundpflege */}
          <FadeIn delay={0.6} className="h-full">
            <div ref={card3Ref} className="h-full">
                <Link href="/leistungen/ambulante-pflege" className={cn(
                        "group relative overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/10 p-10 transition-all duration-500 cursor-pointer flex flex-col h-full",
                        card3Active ? "bg-white/[0.08] border-white/30 scale-[1.01]" : "hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    <div className="w-full flex justify-center lg:justify-start mb-8 z-10 relative">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-xl">
                            <Activity className="w-8 h-8" />
                        </div>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-4 z-10 relative">Grundpflege</h4>
                    <p className="text-white/80 leading-relaxed mb-8 font-medium text-lg z-10 relative">
                        Körperpflege, Ernährung & Mobilität. Würdevoller Umgang im Alltag.
                    </p>
                    <ul className="space-y-4 mt-auto border-t border-white/10 pt-8 w-full z-10 relative text-left">
                        {['Waschen & Duschen', 'An- & Auskleiden', 'Nahrungsaufnahme'].map(item => (
                        <li key={item} className="flex items-center gap-4 text-sm text-white/90 font-bold justify-center lg:justify-start">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" /> {item}
                        </li>
                        ))}
                    </ul>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 4: Medizinische Pflege */}
          <FadeIn delay={0.7} className="h-full">
            <div ref={card4Ref} className="h-full">
                <Link href="/leistungen/ambulante-pflege" className={cn(
                        "group relative overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/10 p-10 transition-all duration-500 cursor-pointer flex flex-col h-full",
                        card4Active ? "bg-white/[0.08] border-white/30 scale-[1.01]" : "hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    <div className="w-full flex justify-center lg:justify-start mb-8 z-10 relative">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-xl">
                            <Syringe className="w-8 h-8" />
                        </div>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-4 z-10 relative">Medizinische Pflege</h4>
                    <p className="text-white/80 leading-relaxed mb-8 font-medium text-lg z-10 relative">
                        Professionelle Umsetzung ärztlicher Verordnungen direkt bei Ihnen zuhause.
                    </p>
                    <ul className="space-y-4 mt-auto border-t border-white/10 pt-8 w-full z-10 relative text-left">
                        {['Medikamentengabe', 'Wundversorgung', 'Injektionen'].map(item => (
                        <li key={item} className="flex items-center gap-4 text-sm text-white/90 font-bold justify-center lg:justify-start">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" /> {item}
                        </li>
                        ))}
                    </ul>
                </Link>
            </div>
          </FadeIn>

           {/* CARD 5: Stack (Alltagshilfe & CTA) */}
           <div className="lg:col-span-1 flex flex-col gap-6 h-full">
              
              <FadeIn delay={0.8} className="flex-1">
                <Link href="/leistungen/betreuung" className="block h-full relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.08] transition-all group cursor-pointer hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row items-center gap-6 h-full justify-center relative z-10 text-center lg:text-left">
                        <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/10 group-hover:bg-[var(--color-primary)] transition-all"
                        >
                            <Coffee className="w-8 h-8" />
                        </motion.div>
                        <div>
                            <h4 className="text-xl font-black text-white mb-1">Alltagshilfe</h4>
                            <p className="text-sm text-white/70 font-bold">Einkäufe, Haushalt & Betreuung.</p>
                        </div>
                    </div>
                </Link>
              </FadeIn>

              <FadeIn delay={0.9} className="flex-1">
                <div ref={card5Ref} className="h-full">
                    <Link href="/leistungen" className="block h-full group relative rounded-[2.5rem] bg-white/5 hover:bg-white/10 p-8 flex flex-col justify-center transition-all duration-500 border border-white/10 hover:scale-[1.02] overflow-hidden">
                        
                        {/* Shimmer Animation */}
                        <motion.div 
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                        />
                        
                        <div className="relative z-10 w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-[var(--color-primary)]">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-black text-white tracking-tight">Alle Leistungen</h4>
                            <div className="text-[var(--color-accent)] text-[10px] font-black uppercase tracking-[0.2em]">Zur Übersicht</div>
                        </div>
                    </Link>
                </div>
              </FadeIn>

           </div>
        </div>

        {/* FOOTER QUOTE */}
        <FadeIn delay={1.0}>
            <div className="mt-32 text-center max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-10 opacity-40" />
                <blockquote className="text-2xl md:text-4xl font-serif text-white/90 leading-tight italic">
                    "Pflege ist für uns nicht nur ein Beruf, sondern eine <span className="font-script text-[var(--color-accent)] text-5xl md:text-6xl px-3 not-italic block sm:inline mt-4 sm:mt-0">Berufung.</span>"
                </blockquote>
            </div>
        </FadeIn>

      </div>
    </section>
  );
}