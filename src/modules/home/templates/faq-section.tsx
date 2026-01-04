"use client";

import Link from "next/link";
import { HelpCircle, Clock, FileText, ChevronDown, ArrowRight, Scale, Users, Sparkles } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { useState, useEffect, useRef } from "react";

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
                "group bg-white rounded-[2rem] border overflow-hidden transition-all duration-300 transform-gpu",
                isInCenter 
                    ? "border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/5 scale-[1.01]" 
                    : "border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:scale-[1.01]"
            )}
        >
            <details className="group/details relative">
                <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-open/details:opacity-100" />
                
                <summary className="flex items-center justify-between cursor-pointer list-none p-5 md:p-6 pl-6 md:pl-8 select-none">
                    <div className="flex items-center gap-5">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 border",
                            "bg-slate-50 text-slate-400 border-slate-100",
                            (isInCenter) && "bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-primary)]/10",
                            "group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/10",
                            "group-open/details:bg-[var(--color-accent)] group-open/details:text-white group-open/details:border-[var(--color-accent)] group-open/details:scale-110"
                        )}>
                            <faq.icon className="w-6 h-6" />
                        </div>
                        
                        <span className={cn(
                            "font-bold text-lg pr-4 transition-colors duration-300",
                            "text-slate-900",
                            (isInCenter) && "text-[var(--color-primary)]",
                            "group-hover:text-[var(--color-primary)]",
                            "group-open/details:text-[var(--color-primary)]"
                        )}>
                            {faq.question}
                        </span>
                    </div>

                    <span className={cn(
                        "ml-2 p-2 rounded-full shrink-0 transition-all duration-300",
                        "text-slate-300",
                        (isInCenter) && "text-[var(--color-primary)] bg-[var(--color-secondary)]",
                        "group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-secondary)]",
                        "group-open/details:rotate-180 group-open/details:text-[var(--color-accent)] group-open/details:bg-white"
                    )}>
                        <ChevronDown className="w-5 h-5" />
                    </span>
                </summary>
                
                <div className="px-6 pb-8 pl-20 md:pl-24 text-slate-600 leading-relaxed font-medium text-base animate-in fade-in slide-in-from-top-2 duration-300 origin-top">
                    <div className="pt-4 border-t border-slate-50">{faq.answer}</div>
                </div>
            </details>
        </div>
    );
}

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32 bg-white font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container max-w-4xl px-4 md:px-6 relative z-10">
        
        {/* HEADER: KORRIGIERT -> Mobile Center / Desktop Left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-16 lg:mb-20">
          
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-6">
                <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                <span>Wissenswertes</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                Häufige Fragen & <br className="hidden md:block" />
                <span className="relative inline-block px-1">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                    Antworten.
                </span>
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
                </span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-slate-600 text-lg max-w-xl font-medium">
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

        {/* BUTTON: KORRIGIERT -> Mobile Center / Desktop Left */}
        <FadeIn delay={0.8} className="flex justify-center lg:justify-start mt-12">
          <Link href="/faq">
            <div className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 px-10 text-base rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 active:scale-95 active:shadow-sm transition-all duration-200 cursor-pointer font-bold"
            )}>
              Alle Fragen ansehen <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}