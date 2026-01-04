"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Clock, Activity, Coffee, Syringe, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { useRef, useEffect, useState } from "react";

// --- HELPER HOOK ---
// Erkennt, ob ein Element in der Mitte des Bildschirms ist (für Mobile)
function useInCenter(options = { threshold: 0.2 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, { 
            // Trigger-Zone: Genau die Mitte des Bildschirms
            rootMargin: "-25% 0px -25% 0px", 
            threshold: 0 
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

export function FeaturesAndServices() {
  
  // Hooks für jede Karte einzeln, damit sie nacheinander reagieren
  const { ref: card1Ref, isInCenter: card1Active } = useInCenter();
  const { ref: card2Ref, isInCenter: card2Active } = useInCenter();
  const { ref: card3Ref, isInCenter: card3Active } = useInCenter();
  const { ref: card4Ref, isInCenter: card4Active } = useInCenter();
  const { ref: card5Ref, isInCenter: card5Active } = useInCenter(); // NEU: Für "Alle Leistungen"

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--color-footer-bg)] overflow-hidden font-sans text-white border-t border-white/5">
      
      {/* FX */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none transform-gpu" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-24 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-sm justify-center lg:justify-start">
                    <Sparkles className="w-3 h-3" /> Unsere Expertise
                </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Mehr als nur Pflege. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-accent)]">
                    Lebensqualität.
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
          
          {/* CARD 1: Herz & Verstand (ORANGE AUTOMATISCH) */}
          <FadeIn delay={0.4} className="lg:col-span-2 h-full">
            <div ref={card1Ref} className="h-full">
                <Link 
                    href="/ueber-uns" 
                    className={cn(
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border p-10 lg:p-12 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full transform-gpu",
                        // Wenn im Fokus (Mobile) ODER Hover (Desktop) -> Hellerer Hintergrund & Rahmen
                        card1Active 
                            ? "bg-white/[0.06] border-[var(--color-accent)]/30 scale-[1.01]" 
                            : "border-white/10 hover:bg-white/[0.06] hover:border-[var(--color-accent)]/30 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}
                >
                    {/* Background Icon */}
                    <div className={cn(
                        "absolute top-0 right-0 p-12 opacity-[0.03] transition-all duration-700 transform pointer-events-none",
                        card1Active ? "scale-110 rotate-6 opacity-[0.06]" : "group-hover:opacity-10 group-hover:scale-110 group-hover:rotate-6"
                    )}>
                        <Heart className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10 w-full">
                        <div className="w-full flex justify-center lg:justify-start mb-8">
                            {/* ICON: WIRD ORANGE WENN ACTIVE */}
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center text-white border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500",
                                card1Active 
                                    ? "bg-[var(--color-accent)] scale-110 border-transparent" 
                                    : "group-hover:bg-[var(--color-accent)] group-hover:scale-110 group-hover:border-transparent"
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
                        // PFEIL: WIRD ORANGE WENN ACTIVE
                        card1Active 
                            ? "text-[var(--color-accent)] translate-x-2 opacity-100" 
                            : "text-white group-hover:text-[var(--color-accent)] group-hover:translate-x-2 group-hover:opacity-100"
                    )}>
                        Mehr erfahren <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 2: 24h Notfall */}
          <FadeIn delay={0.5} className="lg:col-span-1 h-full">
            <div ref={card2Ref} className="h-full">
                <Link 
                    href="/kontakt" 
                    className={cn(
                        "group relative overflow-hidden rounded-[2.5rem] bg-[var(--color-primary)] border border-white/10 p-10 lg:p-12 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}
                >
                    <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors pointer-events-none" />

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
                <Link 
                    href="/leistungen/ambulante-pflege" 
                    className={cn(
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 transition-all duration-300 cursor-pointer flex flex-col h-full",
                        card3Active ? "bg-white/[0.06] border-white/20 scale-[1.01]" : "hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}
                >
                    <div className="w-full flex justify-center lg:justify-start mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/5 group-hover:scale-110 transition-transform shadow-lg">
                            <Activity className="w-7 h-7" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Grundpflege</h4>
                    <p className="text-white/70 leading-relaxed mb-6 font-medium text-base">
                        Körperpflege, Ernährung & Mobilität. Würdevoller Umgang im Alltag.
                    </p>
                    <ul className="space-y-3 mt-auto border-t border-white/5 pt-6 w-full">
                        {['Waschen & Duschen', 'An- & Auskleiden', 'Nahrungsaufnahme'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/80 font-medium justify-center lg:justify-start">
                            <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" /> {item}
                        </li>
                        ))}
                    </ul>
                </Link>
            </div>
          </FadeIn>

          {/* CARD 4: Medizinische Pflege */}
          <FadeIn delay={0.7} className="h-full">
            <div ref={card4Ref} className="h-full">
                <Link 
                    href="/leistungen/ambulante-pflege" 
                    className={cn(
                        "group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 transition-all duration-300 cursor-pointer flex flex-col h-full",
                        card4Active ? "bg-white/[0.06] border-white/20 scale-[1.01]" : "hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.01]",
                        "items-center text-center lg:items-start lg:text-left"
                    )}
                >
                    <div className="w-full flex justify-center lg:justify-start mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/5 group-hover:scale-110 transition-transform shadow-lg">
                            <Syringe className="w-7 h-7" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Medizinische Pflege</h4>
                    <p className="text-white/70 leading-relaxed mb-6 font-medium text-base">
                        Professionelle Umsetzung ärztlicher Verordnungen direkt bei Ihnen zuhause.
                    </p>
                    <ul className="space-y-3 mt-auto border-t border-white/5 pt-6 w-full">
                        {['Medikamentengabe', 'Wundversorgung', 'Injektionen'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/80 font-medium justify-center lg:justify-start">
                            <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" /> {item}
                        </li>
                        ))}
                    </ul>
                </Link>
            </div>
          </FadeIn>

           {/* CARD 5: Stack (Alltag & CTA) */}
           <div className="lg:col-span-1 flex flex-col gap-6 h-full">
              
              <FadeIn delay={0.8} className="flex-1">
                <Link href="/leistungen/betreuung" className="block h-full rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all group cursor-pointer hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-5 h-full justify-center">
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

              {/* CTA CARD - ALLE LEISTUNGEN (Mit AUTOMATISCHEM Shimmer & Orange Pfeil) */}
              <FadeIn delay={0.9} className="flex-1">
                {/* Ref für den Scroll-Trigger hinzufügen */}
                <div ref={card5Ref} className="h-full">
                    <Link 
                        href="/leistungen" 
                        className="block h-full group relative rounded-[2.5rem] bg-white/5 hover:bg-white/10 p-8 flex flex-col justify-center transition-all duration-300 border border-white/10 hover:scale-[1.02] overflow-hidden"
                    >
                        {/* SHIMMER EFFEKT: 
                            Wird ausgelöst, wenn card5Active = true (durch Scrollen) 
                            ODER beim Hovern (Desktop)
                        */}
                        <div className={cn(
                            "absolute top-0 bottom-0 left-[-100%] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none transition-transform duration-[1.5s] ease-in-out",
                            card5Active ? "translate-x-[200%]" : "group-hover:translate-x-[200%]"
                        )} />
                        
                        <div className="relative z-10 w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                            <div className="w-full flex justify-center lg:justify-start mb-2">
                                {/* PFEIL WIRD ORANGE WENN ACTIVE */}
                                <div className={cn(
                                    "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                                    card5Active 
                                        ? "bg-white text-[var(--color-accent)]" 
                                        : "group-hover:bg-white group-hover:text-[var(--color-accent)]"
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
                    "Pflege ist für uns nicht nur ein Beruf, sondern eine <span className="text-white font-semibold italic underline decoration-white/30 underline-offset-4">Berufung</span>."
                </blockquote>
            </div>
        </FadeIn>

      </div>
    </section>
  );
}