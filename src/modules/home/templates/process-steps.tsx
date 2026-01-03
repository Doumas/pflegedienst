"use client";

import Link from "next/link"; 
import { useState, useEffect, useRef } from "react";
import { Phone, ClipboardList, HeartHandshake, CalendarCheck, Sparkles, Download, FileText } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in"; // <--- NEU: Animation

const steps = [
  { id: "01", title: "Erstgespräch", description: "Ein Anruf genügt. Wir klären erste Fragen sofort und unverbindlich.", icon: Phone },
  { id: "02", title: "Beratung vor Ort", description: "Wir besuchen Sie, lernen uns kennen und ermitteln den exakten Bedarf.", icon: ClipboardList },
  { id: "03", title: "Kostenklärung", description: "Wir erstellen den Plan und übernehmen den Papierkram mit der Kasse.", icon: CalendarCheck },
  { id: "04", title: "Pflegebeginn", description: "Start Ihrer Versorgung. Ab jetzt sind wir fest an Ihrer Seite.", icon: HeartHandshake }
];

// --- HELPER HOOK (Für Mobile Auto-Focus) ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            // Fokusbereich: Ein Streifen in der Bildschirmmitte
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- SUB-KOMPONENTE: EINZELNER SCHRITT (Damit jeder Hook funktionieren kann) ---
function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative flex flex-col items-center text-center group cursor-default transition-all duration-500 transform-gpu",
                // Mobile Auto-Focus Logik:
                isInCenter ? "scale-105 z-10" : "scale-100 z-0" 
            )}
        >
            {/* Icon Bubble */}
            <div className="relative mb-8">
                {/* Glow Effekt - Pulsieren bei Focus */}
                <div className={cn(
                    "absolute inset-0 bg-[var(--color-primary)]/5 rounded-full blur-xl transition-all duration-700",
                    isInCenter ? "scale-125 bg-[var(--color-primary)]/20" : "scale-75 group-hover:scale-125 group-hover:bg-[var(--color-primary)]/20"
                )} />
                
                <div className={cn(
                    "relative w-24 h-24 rounded-[2rem] bg-white border flex items-center justify-center shadow-xl shadow-slate-200/50 transition-all duration-500",
                    // Styling bei Focus vs Normal
                    isInCenter 
                        ? "border-[var(--color-primary)]/40 -translate-y-2 shadow-[var(--color-primary)]/20" 
                        : "border-[var(--color-border-soft)] group-hover:-translate-y-2 group-hover:shadow-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30"
                )}>
                    <step.icon className={cn(
                        "w-10 h-10 transition-transform duration-500",
                        isInCenter ? "text-[var(--color-primary)] scale-110" : "text-[var(--color-primary)] group-hover:scale-110"
                    )} />
                    
                    {/* Step Number Badge */}
                    <div className={cn(
                        "absolute -top-3 -right-3 w-9 h-9 rounded-full text-white font-black text-sm flex items-center justify-center border-4 border-white shadow-md transition-transform duration-500",
                        isInCenter 
                            ? "bg-[var(--color-accent)] scale-125 shadow-[var(--color-accent)]/30" 
                            : "bg-[var(--color-accent)] group-hover:scale-110 shadow-[var(--color-accent)]/20"
                    )}>
                        {step.id}
                    </div>
                </div>
            </div>
            
            <h3 className={cn(
                "text-xl font-bold mb-3 transition-colors duration-300",
                isInCenter ? "text-[var(--color-primary)]" : "text-slate-900 group-hover:text-[var(--color-primary)]"
            )}>
                {step.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed px-4 font-medium">
                {step.description}
            </p>
        </div>
    );
}

export function ProcessSteps() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-sans">
      
      {/* HINTERGRUND FX - GPU Optimiert */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
           <FadeIn delay={0.1}>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                  Der Ablauf
               </div>
           </FadeIn>
           
           <FadeIn delay={0.2}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                 In 4 einfachen Schritten <br/> 
                 <span className="relative inline-block px-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                       zur besten Versorgung.
                    </span>
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                 </span>
               </h2>
           </FadeIn>
           
           <FadeIn delay={0.3}>
               <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                 Wir nehmen Sie an die Hand und führen Sie sicher durch den Bürokratie-Dschungel.
               </p>
           </FadeIn>
        </div>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Verbindungslinie (Nur Desktop) - Animiert */}
          <FadeIn delay={0.4} className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 -z-10">
             <div className="w-full h-full bg-gradient-to-r from-slate-100 via-[var(--color-primary)]/20 to-slate-100" />
          </FadeIn>
          
          {steps.map((step, i) => (
            // Jeder Schritt wird mit Verzögerung eingeblendet
            <FadeIn key={i} delay={0.4 + (i * 0.15)} direction="up" className="h-full">
                <StepCard step={step} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* DOWNLOAD CARD */}
        <FadeIn delay={0.8} direction="up" className="max-w-4xl mx-auto">
            <Link 
                href="/documents/dalas-broschuere.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Dalas_Broschuere.pdf"
                className="block relative bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden transform-gpu"
            >
                <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8">
                    
                    {/* Icon */}
                    <div className="shrink-0 w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[var(--color-primary)] rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300 hidden md:flex">
                        <FileText className="w-10 h-10" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Möchten Sie alles in Ruhe nachlesen?</h4>
                        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                            Laden Sie sich unsere Unternehmensvorstellung als PDF herunter. <br className="hidden lg:inline"/>
                            Ideal zum Ausdrucken für die Familie oder zur Besprechung.
                        </p>
                    </div>

                    <div className="shrink-0">
                        {/* Button */}
                        <div className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }), 
                            "h-14 px-8 border-slate-200 bg-white text-slate-600 rounded-full font-bold", 
                            "group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-white transition-all duration-300"
                        )}>
                            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                            PDF Herunterladen
                        </div>
                    </div>
                </div>
            </Link>
        </FadeIn>

      </div>
    </section>
  );
}