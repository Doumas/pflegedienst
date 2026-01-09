"use client";

import Link from "next/link";
import { HelpCircle, Clock, FileText, ChevronDown, ArrowRight, Scale, Users, Sparkles } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; 
import { AnimatedBackground } from "@/shared/ui/animated-background";

const faqData = [
    { question: "Was zahlt die Pflegekasse?", answer: "Ab Pflegegrad 2 haben Sie Anspruch auf Pflegesachleistungen. Wir rechnen direkt mit der Kasse ab.", icon: Scale },
    { question: "Wie schnell können Sie anfangen?", answer: "In Notfällen oft innerhalb von 24 Stunden. Rufen Sie uns am besten direkt an.", icon: Clock },
    { question: "Muss ich mich vertraglich binden?", answer: "Nein. Unsere Pflegeverträge sind flexibel und können jederzeit an Ihren Bedarf angepasst werden.", icon: FileText },
    { question: "Habe ich feste Bezugspersonen?", answer: "Ja, wir arbeiten mit festen, kleinen Teams. Das schafft Vertrauen und persönliche Nähe.", icon: Users }
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
        }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

// --- FAQ ITEM ---
function FaqItem({ faq }: { faq: typeof faqData[0] }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "group bg-white rounded-[2rem] border overflow-hidden transition-all duration-300 transform-gpu relative z-10", 
                isInCenter 
                    ? "border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/5 scale-[1.01]" 
                    : "border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:scale-[1.01]"
            )}
        >
            <details className="group/details relative">
                <summary className="flex items-center justify-between cursor-pointer list-none p-5 md:p-6 pl-6 md:pl-8 select-none">
                    <div className="flex items-center gap-5">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300",
                            "bg-slate-50 text-slate-400 border border-slate-100",
                            (isInCenter) && "bg-[var(--color-secondary)] text-[var(--color-primary)]",
                            "group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-primary)]",
                            "group-open/details:bg-[var(--color-accent)] group-open/details:text-white"
                        )}>
                            <faq.icon className="w-6 h-6" />
                        </div>
                        
                        <span className={cn(
                            "font-bold text-lg transition-colors duration-300",
                            "text-slate-900",
                            (isInCenter) && "text-[var(--color-primary)]",
                            "group-hover:text-[var(--color-primary)]"
                        )}>
                            {faq.question}
                        </span>
                    </div>

                    <span className={cn(
                        "ml-2 p-2 rounded-full shrink-0 transition-all duration-300",
                        "text-slate-300",
                        "group-open/details:rotate-180 group-open/details:text-[var(--color-accent)]"
                    )}>
                        <ChevronDown className="w-5 h-5" />
                    </span>
                </summary>
                
                <div className="px-6 pb-8 pl-24 text-slate-600 leading-relaxed font-medium text-base text-left">
                    <div className="pt-4 border-t border-slate-50">{faq.answer}</div>
                </div>
            </details>
        </div>
    );
}

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#fffbf7] font-sans relative overflow-hidden">
      
      {/* 1. SEKTIONS-HINTERGRUND */}
      <div className="absolute inset-0 pointer-events-none -z-10 isolate">
        <AnimatedBackground 
            icon={HelpCircle} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={1} 
            className="opacity-40" 
        />
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container max-w-4xl px-4 md:px-6 relative z-10 mx-auto">
        
        {/* HEADER - Zentrierung fixiert */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          
          <FadeIn delay={0.1} className="flex justify-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <HelpCircle className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </motion.div>
                <span>Wissenswertes</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex justify-center w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.1]">
                Häufige Fragen & <br/>
                <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">Antworten.</span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex justify-center w-full">
            {/* mx-auto sorgt dafür, dass der Paragraph innerhalb des zentrierten Flex-Containers wirklich in der Mitte bleibt */}
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium text-pretty leading-relaxed">
                Wir sorgen für Transparenz im Pflege-Dschungel. Hier finden Sie die wichtigsten Antworten vorab.
            </p>
          </FadeIn>
        </div>

        {/* LISTE */}
        <div className="grid gap-5 mb-12">
          {faqData.map((faq, i) => (
            <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="up">
                <FaqItem faq={faq} />
            </FadeIn>
          ))}
        </div>

        {/* ACTIONS */}
        <FadeIn delay={0.8} className="flex justify-center mt-12 w-full">
          <Link href="/faq">
            <div className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-16 px-10 text-lg rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 active:scale-95 transition-all font-black bg-[var(--color-primary)]"
            )}>
              Alle Fragen ansehen <ArrowRight className="ml-3 w-5 h-5" />
            </div>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}