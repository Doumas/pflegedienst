"use client";

import Link from "next/link"; 
import { useState, useEffect, useRef } from "react";
import { Phone, Users, FileSignature, HeartHandshake, Sparkles, Download, FileText } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";

const steps = [
  { 
      id: "01", 
      title: "Erstkontakt & Status", 
      description: "Wo befindet sich der Patient? Liegt eine Vollmacht oder Betreuung vor? Wir klären die rechtliche Basis.", 
      icon: Phone 
  },
  { 
      id: "02", 
      title: "Persönliche Beratung", 
      description: "Ob zuhause oder im Krankenhaus: Wir kommen vorbei, prüfen die Umgebung und beraten zur Machbarkeit.", 
      icon: Users 
  },
  { 
      id: "03", 
      title: "Bürokratie-Hilfe", 
      description: "Pflegegrad, Kostenübernahme, Formulare? Keine Sorge, wir füllen die Anträge gemeinsam mit Ihnen aus.", 
      icon: FileSignature 
  },
  { 
      id: "04", 
      title: "Versorgungsstart", 
      description: "Sobald die Genehmigung steht (oder per Eilantrag), beginnt unser Team mit der Pflege.", 
      icon: HeartHandshake 
  }
];

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

// --- STEP CARD ---
function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative flex flex-col group cursor-default transition-all duration-500 transform-gpu px-2",
                // ALIGNMENT: Mobile Center / Desktop Left
                "items-center text-center lg:items-start lg:text-left",
                // Mobile Focus Scale
                isInCenter ? "scale-105 z-10" : "scale-100 z-0" 
            )}
        >
            {/* Icon Bubble */}
            <div className="relative mb-6">
                <div className={cn(
                    "relative w-20 h-20 rounded-[1.5rem] bg-white border flex items-center justify-center shadow-lg shadow-slate-100 transition-all duration-500",
                    isInCenter 
                        ? "border-[var(--color-primary)]/30 -translate-y-1 shadow-xl" 
                        : "border-slate-100 group-hover:-translate-y-1 group-hover:border-[var(--color-primary)]/20 group-hover:shadow-xl"
                )}>
                    <step.icon className={cn(
                        "w-8 h-8 transition-colors duration-500",
                        isInCenter ? "text-[var(--color-primary)]" : "text-slate-400 group-hover:text-[var(--color-primary)]"
                    )} />
                    
                    {/* Number Badge - HIER JETZT ORANGE WENN ACTIVE */}
                    <div className={cn(
                        "absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm transition-colors duration-500",
                        isInCenter 
                            ? "bg-[var(--color-accent)] text-white" // ORANGE (Accent)
                            : "bg-slate-100 text-slate-400 group-hover:bg-[var(--color-accent)] group-hover:text-white"
                    )}>
                        {step.id}
                    </div>
                </div>
            </div>
            
            <h3 className={cn(
                "text-xl font-bold mb-3 text-slate-900 transition-colors duration-300 group-hover:text-[var(--color-primary)]",
                isInCenter && "text-[var(--color-primary)]"
            )}>
                {step.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
                {step.description}
            </p>
        </div>
    );
}

export function ProcessSteps() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-sans border-t border-slate-100">
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER: Mobile Center / Desktop Left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-20 lg:mb-24">
           <FadeIn delay={0.1}>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold tracking-wide uppercase mb-6">
                  <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                  Der Ablauf
               </div>
           </FadeIn>
           
           <FadeIn delay={0.2}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                 In 4 einfachen Schritten <br/> 
                 <span className="relative inline-block px-1">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                       zur besten Versorgung.
                    </span>
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                 </span>
               </h2>
           </FadeIn>
           
           <FadeIn delay={0.3}>
               <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
                 Wir nehmen Sie an die Hand und führen Sie sicher durch den Bürokratie-Dschungel – von der Vollmacht bis zum Pflegegrad.
               </p>
           </FadeIn>
        </div>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Verbindungslinie (Nur Desktop) */}
          <FadeIn delay={0.4} className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px -z-10">
             <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </FadeIn>
          
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up" className="h-full">
                <StepCard step={step} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* DOWNLOAD CARD - Alignment angepasst */}
        <FadeIn delay={0.8} direction="up" className="max-w-4xl mx-auto lg:mx-0">
            <Link 
                href="/documents/dalas-broschuere.pdf" 
                target="_blank" 
                download
                className="block relative bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden transform-gpu"
            >
                {/* Inhalt der Karte: Mobile Center / Desktop Left */}
                <div className="flex flex-col md:flex-row items-center p-8 gap-8 text-center md:text-left">
                    
                    {/* Icon */}
                    <div className="shrink-0 w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-9 h-9" />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Möchten Sie alles in Ruhe nachlesen?</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Laden Sie sich unsere Unternehmensvorstellung als PDF herunter. Ideal für die Familie.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <div className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }), 
                            "h-14 px-8 border-slate-200 bg-white text-slate-600 rounded-full font-bold group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all"
                        )}>
                            <Download className="w-5 h-5 mr-2" />
                            PDF Download
                        </div>
                    </div>
                </div>
            </Link>
        </FadeIn>

      </div>
    </section>
  );
}