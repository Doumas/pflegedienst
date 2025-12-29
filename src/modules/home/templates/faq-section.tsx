"use client";

import Link from "next/link";
import { HelpCircle, Clock, FileText, ChevronDown, ArrowRight, Scale, Users, Sparkles } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button"; 

const faqData = [
    { question: "Was zahlt die Pflegekasse?", answer: "Ab Pflegegrad 2 haben Sie Anspruch auf Pflegesachleistungen. Wir rechnen direkt mit der Kasse ab.", icon: Scale },
    { question: "Wie schnell können Sie anfangen?", answer: "In Notfällen oft innerhalb von 24 Stunden. Rufen Sie uns am besten direkt an.", icon: Clock },
    { question: "Muss ich mich vertraglich binden?", answer: "Nein. Unsere Pflegeverträge sind flexibel und können jederzeit an Ihren Bedarf angepasst werden.", icon: FileText },
    { question: "Habe ich feste Bezugspersonen?", answer: "Ja, wir arbeiten mit festen, kleinen Teams. Das schafft Vertrauen und persönliche Nähe.", icon: Users }
];

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32 bg-white font-sans relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* HINTERGRUND: CLEAN (Visuelle Pause)                       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />


      {/* ========================================================= */}
      {/* CONTENT                                                   */}
      {/* ========================================================= */}
      <div className="container max-w-4xl px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 lg:mb-20">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
            <span>Wissenswertes</span>
          </div>
          
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Häufige Fragen & <br className="hidden md:block" />
            <span className="relative inline-block px-2">
               <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                 Antworten.
               </span>
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
               </svg>
            </span>
          </h2>
          
          <p className="text-slate-600 text-lg max-w-xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Wir sorgen für Transparenz im Pflege-Dschungel. Hier finden Sie die wichtigsten Antworten vorab.
          </p>
        </div>

        {/* LISTE (Accordion) */}
        <div className="grid gap-5 mb-12">
          {faqData.map((faq, i) => (
            <div 
                key={i} 
                className="group bg-white rounded-[2rem] border border-[var(--color-border-soft)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both transition-all duration-300
                hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5"
                style={{ animationDelay: `${i * 100}ms` }}
            >
              <details className="group/details relative">
                
                {/* Farb-Indikator links (nur sichtbar wenn geöffnet) */}
                <div className="absolute inset-y-0 left-0 w-1.5 bg-transparent group-open/details:bg-[var(--color-accent)] transition-all duration-300" />
                
                <summary className="flex items-center justify-between cursor-pointer list-none p-5 md:p-6 pl-6 md:pl-8">
                  <div className="flex items-center gap-5">
                    
                    {/* ICON BOX - Interaktiv: Wechselt Farbe beim Öffnen */}
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-all duration-300 border border-[var(--color-primary)]/5
                        group-open/details:bg-[var(--color-accent)] group-open/details:text-white group-open/details:border-[var(--color-accent)]
                        group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:scale-110">
                      <faq.icon className="w-6 h-6" />
                    </div>
                    
                    {/* TEXT */}
                    <span className="font-bold text-lg text-slate-900 pr-4 group-hover:text-[var(--color-primary)] transition-colors">
                        {faq.question}
                    </span>
                  </div>

                  {/* CHEVRON - Rotiert beim Öffnen */}
                  <span className="ml-2 text-slate-400 bg-slate-50 p-2 rounded-full shrink-0 transition-all duration-300
                      group-open/details:rotate-180 
                      group-open/details:text-white group-open/details:bg-[var(--color-accent)]
                      group-hover:text-[var(--color-accent)] group-hover:bg-white">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                
                {/* ANTWORT - Slide-In Effekt */}
                <div className="px-6 pb-8 pl-20 md:pl-24 text-slate-600 leading-relaxed font-medium text-base animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="pt-0 border-t border-slate-50 mt-2 pt-4">{faq.answer}</div>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link href="/faq">
            {/* Button Fix: div als Button-Ersatz */}
            <div className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 px-10 text-lg rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 active:scale-95 active:shadow-sm transition-all duration-200 cursor-pointer font-bold"
            )}>
              Alle Fragen ansehen <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}