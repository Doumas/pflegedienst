"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Clock, Activity, Coffee, Syringe, ArrowRight, CheckCircle2, Sparkles, Home } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background"; // <--- BEST PRACTICE IMPORT
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- HELPER HOOK (Bleibt lokal, da spezifisch für Intersection Logic) ---
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
    <section className="relative py-24 lg:py-32 bg-[var(--color-footer-bg)] overflow-hidden font-sans text-white border-t border-white/5">
      
      {/* 1. SEKTIONS-HINTERGRUND (Best Practice Component) */}
      {/* Wir nutzen hier 'Home' als Icon für das Haus-Thema im Hintergrund */}
      <AnimatedBackground icon={Home} variant="section" color="text-white" />

      {/* 2. FX Layer (Blobs & Pattern) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none transform-gpu z-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none transform-gpu z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none transform-gpu z-0" />

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-24 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            
            {/* BADGE */}
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-sm justify-center lg:justify-start">
                    {/* Kleines animiertes Icon im Badge (SVG direkt hier für Feinkontrolle der Animation) */}
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Mehr als nur Pflege. <br/>
                <span className="font-script text-[var(--color-accent)] relative inline-block px-1 mt-1 font-normal">
                    Lebensqualität.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
                </h2>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.3} className="max-w-md mx-auto lg:mx-0">
            <p className="text-white/70 text-lg leading-relaxed font-medium">
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
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border p-10 lg:p-12 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full transform-gpu",
                        card1Active ? "bg-white/[0.06] border-[var(--color-accent)]/30 scale-[1.01]" : "border-white/10 hover:bg-white/[0.06] hover:border-[var(--color-accent)]/30 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    
                    {/* BEST PRACTICE: Wiederverwendbare Background Icons */}
                    <AnimatedBackground icon={Heart} variant="card" count={4} color="text-white" />

                    <div className="relative z-10 w-full">
                        <div className="w-full flex justify-center lg:justify-start mb-8">
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center text-white border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500",
                                card1Active ? "bg-[var(--color-accent)] scale-110 border-transparent" : "group-hover:bg-[var(--color-accent)] group-hover:scale-110 group-hover:border-transparent"
                            )}>
                                <Heart className="w-8 h-8 fill-current" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Herz & Verstand</h3>
                        <p className="text-lg text-white/80 max-w-xl leading-relaxed font-medium">
                            Fachliches Können ist unsere Basis, aber Empathie ist unser Schlüssel. 
                            Wir pflegen nicht nach der Stoppuhr, sondern richten uns nach dem Menschen. 
                        </p>
                    </div>
                    
                    <div className={cn(
                        "mt-8 flex items-center gap-2 font-bold opacity-80 transition-all w-full justify-center lg:justify-start",
                        card1Active ? "text-[var(--color-accent)] translate-x-2 opacity-100" : "text-white group-hover:text-[var(--color-accent)] group-hover:translate-x-2 group-hover:opacity-100"
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
                        "group relative overflow-hidden rounded-[2.5rem] bg-[var(--color-primary)] border border-white/10 p-10 lg:p-12 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    
                    {/* Background Icons: Clock (Weiss) */}
                    <AnimatedBackground icon={Clock} variant="card" count={3} color="text-white" />

                    <div className="w-full relative z-10">
                        <div className="w-full flex justify-center lg:justify-start mb-8">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-primary)] bg-white shadow-xl transition-transform group-hover:scale-110">
                                <Clock className="w-8 h-8" />
                            </div>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">24h Erreichbarkeit</h4>
                        <p className="text-white/90 leading-relaxed font-medium text-base">
                            Krankheit kennt keinen Feierabend. Im Notfall sind wir rund um die Uhr da.
                        </p>
                    </div>
                    <div className="mt-8 w-full flex justify-center lg:justify-start relative z-10">
                        <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider bg-white/10 px-5 py-3 rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-colors">
                            Kontakt aufnehmen <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 3: Grundpflege */}
          <FadeIn delay={0.6} className="h-full">
            <div ref={card3Ref} className="h-full">
                <Link href="/leistungen/ambulante-pflege" className={cn(
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 transition-all duration-300 cursor-pointer flex flex-col h-full",
                        card3Active ? "bg-white/[0.06] border-white/20 scale-[1.01]" : "hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    
                    <AnimatedBackground icon={Activity} variant="card" count={3} color="text-white" />

                    <div className="w-full flex justify-center lg:justify-start mb-6 z-10 relative">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/5 group-hover:scale-110 transition-transform shadow-lg">
                            <Activity className="w-7 h-7" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 z-10 relative">Grundpflege</h4>
                    <p className="text-white/70 leading-relaxed mb-6 font-medium text-base z-10 relative">
                        Körperpflege, Ernährung & Mobilität. Würdevoller Umgang im Alltag.
                    </p>
                    <ul className="space-y-3 mt-auto border-t border-white/5 pt-6 w-full z-10 relative">
                        {['Waschen & Duschen', 'An- & Auskleiden', 'Nahrungsaufnahme'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/80 font-medium justify-center lg:justify-start">
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
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 transition-all duration-300 cursor-pointer flex flex-col h-full",
                        card4Active ? "bg-white/[0.06] border-white/20 scale-[1.01]" : "hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}>
                    
                    <AnimatedBackground icon={Syringe} variant="card" count={3} color="text-white" />

                    <div className="w-full flex justify-center lg:justify-start mb-6 z-10 relative">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/5 group-hover:scale-110 transition-transform shadow-lg">
                            <Syringe className="w-7 h-7" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 z-10 relative">Medizinische Pflege</h4>
                    <p className="text-white/70 leading-relaxed mb-6 font-medium text-base z-10 relative">
                        Professionelle Umsetzung ärztlicher Verordnungen direkt bei Ihnen zuhause.
                    </p>
                    <ul className="space-y-3 mt-auto border-t border-white/5 pt-6 w-full z-10 relative">
                        {['Medikamentengabe', 'Wundversorgung', 'Injektionen'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/80 font-medium justify-center lg:justify-start">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" /> {item}
                        </li>
                        ))}
                    </ul>
                </Link>
            </div>
          </FadeIn>

           {/* CARD 5: Stack */}
           <div className="lg:col-span-1 flex flex-col gap-6 h-full">
              
              {/* Alltagshilfe */}
              <FadeIn delay={0.8} className="flex-1">
                <Link href="/leistungen/betreuung" className="block h-full relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all group cursor-pointer hover:scale-[1.02]">
                    <AnimatedBackground icon={Coffee} variant="card" count={2} color="text-white" />
                    <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-5 h-full justify-center relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                            <Coffee className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1">Alltagshilfe</h4>
                            <p className="text-sm text-white/60 font-medium">Einkäufe, Haushalt & Betreuung.</p>
                        </div>
                    </div>
                </Link>
              </FadeIn>

              {/* CTA CARD */}
              <FadeIn delay={0.9} className="flex-1">
                <div ref={card5Ref} className="h-full">
                    <Link href="/leistungen" className="block h-full group relative rounded-[2.5rem] bg-white/5 hover:bg-white/10 p-8 flex flex-col justify-center transition-all duration-300 border border-white/10 hover:scale-[1.02] overflow-hidden">
                        <AnimatedBackground icon={Sparkles} variant="card" count={2} color="text-white" />
                        
                        {/* SHIMMER FX */}
                        <div className={cn(
                            "absolute top-0 bottom-0 left-[-100%] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none transition-transform duration-[1.5s] ease-in-out",
                            card5Active ? "translate-x-[200%]" : "group-hover:translate-x-[200%]"
                        )} />
                        
                        <div className="relative z-10 w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                            <div className="w-full flex justify-center lg:justify-start mb-2">
                                <div className={cn(
                                    "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                                    card5Active ? "bg-white text-[var(--color-accent)]" : "group-hover:bg-white group-hover:text-[var(--color-accent)]"
                                )}>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-white">Alle Leistungen</h4>
                            <div className="text-white/50 text-sm font-bold group-hover:text-white/80">Zur Übersicht</div>
                        </div>
                    </Link>
                </div>
              </FadeIn>

           </div>
        </div>

        {/* FOOTER QUOTE */}
        <FadeIn delay={1.0}>
            <div className="mt-24 md:mt-32 text-center max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-12 h-12 text-white mx-auto mb-6 opacity-30" />
                <blockquote className="text-2xl md:text-3xl font-serif text-white/90 leading-normal">
                    "Pflege ist für uns nicht nur ein Beruf, sondern eine <span className="font-script text-[var(--color-accent)] text-4xl px-2 not-italic decoration-0">Berufung.</span>"
                </blockquote>
            </div>
        </FadeIn>

      </div>
    </section>
  );
}