"use client";

import Link from "next/link"; 
import { Phone, ClipboardList, HeartHandshake, CalendarCheck, Sparkles, Download, FileText } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";

const steps = [
  { id: "01", title: "Erstgespräch", description: "Ein Anruf genügt. Wir klären erste Fragen sofort und unverbindlich.", icon: Phone },
  { id: "02", title: "Beratung vor Ort", description: "Wir besuchen Sie, lernen uns kennen und ermitteln den exakten Bedarf.", icon: ClipboardList },
  { id: "03", title: "Kostenklärung", description: "Wir erstellen den Plan und übernehmen den Papierkram mit der Kasse.", icon: CalendarCheck },
  { id: "04", title: "Pflegebeginn", description: "Start Ihrer Versorgung. Ab jetzt sind wir fest an Ihrer Seite.", icon: HeartHandshake }
];

export function ProcessSteps() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-sans">
      
      {/* HINTERGRUND FX */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              Der Ablauf
           </div>
           
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
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
           
           <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             Wir nehmen Sie an die Hand und führen Sie sicher durch den Bürokratie-Dschungel.
           </p>
        </div>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Verbindungslinie (Nur Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-100 via-[var(--color-primary)]/20 to-slate-100 -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group cursor-default animate-in fade-in zoom-in-50 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
              
              {/* Icon Bubble */}
              <div className="relative mb-8">
                {/* Glow Effekt */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-full blur-xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-500 scale-75 group-hover:scale-125" />
                
                <div className="relative w-24 h-24 rounded-[2rem] bg-white border border-[var(--color-border-soft)] flex items-center justify-center shadow-xl shadow-slate-200/50 group-hover:-translate-y-2 group-hover:shadow-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[var(--color-accent)] text-white font-black text-sm flex items-center justify-center border-4 border-white shadow-md group-hover:scale-110 transition-transform shadow-[var(--color-accent)]/20">
                    {step.id}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {step.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed px-4 font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* DOWNLOAD CARD (Pfad korrigiert) */}
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
            <Link 
                href="/documents/dalas-broschuere.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                // Das 'download' Attribut funktioniert zuverlässig nur bei Same-Origin Dateien
                // Da es im public Ordner liegt, sollte es klappen.
                download="Dalas_Broschuere.pdf"
                className="block relative bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden"
            >
                <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8">
                    
                    {/* Icon - Jetzt sauber als Flex-Element integriert */}
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
                        {/* Button mit Hover-Effekt */}
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
        </div>

      </div>
    </section>
  );
}