"use client";

import Link from "next/link"; 
import { useState, useEffect, useRef } from "react";
import { Phone, Users, FileSignature, HeartHandshake, Download, FileText, Compass } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background"; 
import { motion } from "framer-motion"; 

const steps = [
  { 
      id: "01", 
      title: "Erstkontakt & Status", 
      description: "Wo befindet sich der Patient? Liegt eine Vollmacht vor? Wir klären die rechtliche Basis.", 
      icon: Phone 
  },
  { 
      id: "02", 
      title: "Persönliche Beratung", 
      description: "Ob zuhause oder Klinik: Wir kommen vorbei und beraten zur individuellen Machbarkeit.", 
      icon: Users 
  },
  { 
      id: "03", 
      title: "Bürokratie-Hilfe", 
      description: "Pflegegrad oder Kostenübernahme? Wir füllen die Anträge gemeinsam mit Ihnen aus.", 
      icon: FileSignature 
  },
  { 
      id: "04", 
      title: "Versorgungsstart", 
      description: "Sobald die Genehmigung steht (oder per Eilantrag), beginnt unser Team mit der Pflege.", 
      icon: HeartHandshake 
  }
];

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

function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative flex flex-col group cursor-default transition-all duration-500 transform-gpu px-2",
                "items-center text-center", 
                isInCenter ? "scale-105 z-10" : "scale-100 z-0" 
            )}
        >
            <div className="relative mb-6">
                <div className={cn(
                    "relative w-20 h-20 rounded-[1.8rem] bg-white border flex items-center justify-center shadow-lg transition-all duration-500",
                    isInCenter 
                        ? "border-[var(--color-primary)]/30 -translate-y-1 shadow-xl shadow-[var(--color-primary)]/10" 
                        : "border-slate-100 group-hover:-translate-y-1 group-hover:border-[var(--color-primary)]/20"
                )}>
                    <step.icon className={cn(
                        "w-8 h-8 transition-colors duration-500",
                        isInCenter ? "text-[var(--color-primary)]" : "text-slate-400 group-hover:text-[var(--color-primary)]"
                    )} />
                    
                    <div className={cn(
                        "absolute -top-2 -right-2 w-8 h-8 rounded-full text-xs font-black flex items-center justify-center border-4 border-white shadow-sm transition-all duration-500",
                        isInCenter 
                            ? "bg-[var(--color-accent)] text-white scale-110" 
                            : "bg-slate-100 text-slate-400 group-hover:bg-[var(--color-accent)] group-hover:text-white"
                    )}>
                        {step.id}
                    </div>
                </div>
            </div>
            
            <h3 className={cn(
                "text-xl font-black mb-3 text-slate-900 transition-colors duration-300",
                isInCenter ? "text-[var(--color-primary)]" : "group-hover:text-[var(--color-primary)]"
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
      
      {/* 1. SEKTIONS-HINTERGRUND (ANIMIERT) */}
      <AnimatedBackground 
            icon={Compass} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={6} 
            className="opacity-60" 
      />

      <div className="absolute inset-0 opacity-[0.2] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        
        {/* HEADER: ZENTRIERT */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
           
           {/* Badge im einheitlichen Brand-Standard */}
           <FadeIn delay={0.1} className="flex justify-center w-full mb-10">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                      <Compass className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  </motion.div>
                  Der Ablauf
               </div>
           </FadeIn>
           
           <FadeIn delay={0.2} className="flex justify-center w-full">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance">
                 In 4 einfachen Schritten <br/> 
                 <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">zur besten Versorgung.</span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                 </span>
               </h2>
           </FadeIn>
           
           <FadeIn delay={0.3} className="flex justify-center w-full">
               <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium text-pretty leading-relaxed">
                 Wir nehmen Sie an die Hand und führen Sie sicher durch den Bürokratie-Dschungel – menschlich und kompetent.
               </p>
           </FadeIn>
        </div>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />
          
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up">
                <StepCard step={step} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* DOWNLOAD CARD: ZENTRIERT & POLISHED */}
        <FadeIn delay={0.8} direction="up" className="max-w-4xl mx-auto">
            <Link 
                href="/documents/dalas-broschuere.pdf" 
                target="_blank" 
                className="block relative bg-white rounded-[3rem] border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-2xl transition-all duration-500 group overflow-hidden transform-gpu"
            >
                <div className="flex flex-col md:flex-row items-center p-10 md:p-12 gap-10 text-center md:text-left relative z-10">
                    <div className="shrink-0 w-24 h-24 bg-[var(--color-secondary)] rounded-3xl flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <FileText className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Möchten Sie alles in Ruhe nachlesen?</h4>
                        <p className="text-slate-600 font-bold leading-relaxed">
                            Laden Sie sich unsere Unternehmensvorstellung als PDF herunter. Ideal für das Gespräch in der Familie.
                        </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                        <div className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }), 
                            "h-16 px-10 border-slate-200 bg-white text-slate-600 rounded-2xl font-black shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all w-full flex items-center justify-center gap-3"
                        )}>
                            <Download className="w-5 h-5" />
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