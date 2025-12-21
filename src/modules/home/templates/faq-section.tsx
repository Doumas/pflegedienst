"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { HelpCircle, Clock, FileText, ChevronDown, ArrowRight, Scale, Users } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";

const faqData = [
    { question: "Was zahlt die Pflegekasse?", answer: "Ab Pflegegrad 2 haben Sie Anspruch auf Pflegesachleistungen. Wir rechnen direkt mit der Kasse ab.", icon: Scale },
    { question: "Wie schnell können Sie anfangen?", answer: "In Notfällen oft innerhalb von 24 Stunden.", icon: Clock },
    { question: "Muss ich mich vertraglich binden?", answer: "Nein. Unsere Pflegeverträge sind flexibel und können jederzeit angepasst werden.", icon: FileText },
    { question: "Habe ich feste Bezugspersonen?", answer: "Ja, wir arbeiten mit festen, kleinen Teams. Das schafft Vertrauen.", icon: Users }
];

export function FaqSection() {
  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* BACKGROUND FX (Konsistent zu Über Uns & Leistungen)       */}
      {/* ========================================================= */}
      
      {/* 1. Raster (Subtil) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* 2. Blobs (Lichteffekte) */}
      {/* Oben Mitte - Sekundärfarbe */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-secondary)]/50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      {/* Unten Rechts - Akzent */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" />


      {/* ========================================================= */}
      {/* CONTENT                                                   */}
      {/* ========================================================= */}
      <div className="container max-w-4xl px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-6">
            <HelpCircle className="w-3 h-3" />
            <span>Wissenswertes</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Häufige Fragen & <br className="md:hidden" />
            
            {/* Unterstrich & Gradient für "Antworten" */}
            <span className="relative inline-block px-2">
               <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                 Antworten.
               </span>
               {/* Die Welle (Orange) */}
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
               </svg>
            </span>
          </h2>
          
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Wir sorgen für Transparenz im Pflege-Dschungel.
          </p>
        </div>

        {/* LISTE (Accordion) */}
        <div className="grid gap-4 mb-12">
          {faqData.map((faq, i) => (
            <div key={i} className="group bg-white rounded-[1.5rem] border border-[var(--color-border-soft)] transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/5 overflow-hidden">
              <details className="group/details relative">
                
                {/* Farb-Indikator links (nur sichtbar wenn offen) */}
                <div className="absolute inset-y-0 left-0 w-1.5 bg-transparent group-open/details:bg-[var(--color-primary)] transition-all duration-300" />
                
                <summary className="flex items-center justify-between cursor-pointer list-none p-5 md:p-6 pl-6 md:pl-8">
                  <div className="flex items-center gap-5">
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 group-open/details:bg-[var(--color-primary)] group-open/details:text-white transition-all duration-300 border border-[var(--color-primary)]/5">
                      <faq.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">{faq.question}</span>
                  </div>
                  <span className="ml-4 text-[var(--color-primary)] transition-transform duration-300 group-open/details:rotate-180 bg-slate-50 p-2 rounded-full">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                
                <div className="px-6 pb-6 pl-20 md:pl-24 text-slate-600 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="pt-2">{faq.answer}</div>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-8">
          <Link href="/faq">
            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all">
              Alle Fragen ansehen <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}