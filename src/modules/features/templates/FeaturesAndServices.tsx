"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Clock, Activity, Coffee, Syringe, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function FeaturesAndServices() {
  return (
    <section className="relative py-24 lg:py-32 bg-[var(--color-footer-bg)] overflow-hidden font-sans text-white">
      
      {/* ========================================================= */}
      {/* HINTERGRUND FX (Dark Mode Version)                        */}
      {/* ========================================================= */}
      
      {/* 1. Raster (Weiß auf Dunkel) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 2. Blobs (Konsistente Positionierung: Orange Links unten, Blau Rechts oben) */}
      {/* Oben Rechts: Blau (Primary) - sehr weich */}
      <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[800px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Unten Links: Orange (Accent) - warmer Glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />


      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="w-3 h-3" />
              Unsere Expertise
            </div>
            
            {/* H2 in Weiß für Dark Section */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Mehr als nur Pflege. <br/>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-accent)]">
                Lebensqualität.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="max-w-md text-white/70 text-lg leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <p>
              Wir verbinden medizinische Professionalität mit menschlicher Wärme. 
              Hier ist ein Überblick, wie wir Sie im Alltag unterstützen.
            </p>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          
          {/* CARD 1: Herz & Verstand (Groß - col-span-2) */}
          <Link href="/ueber-uns" className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/10 p-10 md:p-12 hover:bg-white/[0.06] hover:border-[var(--color-accent)]/30 transition-all duration-500 cursor-pointer shadow-2xl shadow-black/10 flex flex-col justify-between min-h-[300px]">
             {/* Background Icon Decoration */}
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-6 pointer-events-none">
                <Heart className="w-64 h-64 text-white" />
             </div>
             
             <div className="relative z-10">
               {/* Icon: Weiß -> Orange bei Hover */}
               <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 border border-white/5 backdrop-blur-md shadow-lg group-hover:bg-[var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                 <Heart className="w-8 h-8 fill-current" />
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    Herz & Verstand 
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-accent)]" />
                 </h3>
                 <p className="text-white/70 text-lg max-w-lg leading-relaxed group-hover:text-white transition-colors font-medium">
                   Fachliches Können ist unsere Basis, aber Empathie ist unser Schlüssel. 
                   Wir pflegen nicht nach der Stoppuhr, sondern richten uns nach dem Menschen. 
                 </p>
               </div>
             </div>
          </Link>

          {/* CARD 2: 24h Notfall (Highlight Card) - Jetzt Oben Rechts für Balance */}
          <Link href="/kontakt" className="md:col-span-1 group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-deep)] border border-white/10 p-8 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 cursor-pointer flex flex-col justify-between">
             <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
             
             <div>
                 <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform border border-white/20 group-hover:bg-white group-hover:text-[var(--color-primary)]">
                   <Clock className="w-7 h-7" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-2">24h Erreichbarkeit</h4>
                 <p className="text-sm text-white/80 leading-relaxed font-medium">
                   Krankheit kennt keinen Feierabend. Im Notfall sind wir rund um die Uhr da.
                 </p>
             </div>
             <div className="mt-8 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider bg-white/10 w-fit px-4 py-2 rounded-full group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors">
                Kontakt aufnehmen <ArrowRight className="w-3 h-3" />
             </div>
          </Link>

          {/* CARD 3: Grundpflege */}
          <Link href="/leistungen/ambulante-pflege" className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.08] hover:border-[var(--color-accent)]/30 transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1">
             <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:bg-[var(--color-accent)]">
               <Activity className="w-7 h-7" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Grundpflege</h4>
             <p className="text-sm text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors font-medium">
               Körperpflege, Ernährung & Mobilität. Würdevoller Umgang im Alltag.
             </p>
             <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                {['Waschen & Duschen', 'An- & Auskleiden', 'Nahrungsaufnahme'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs text-white/70 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" /> {item}
                  </li>
                ))}
             </ul>
          </Link>

          {/* CARD 4: Medizinische Pflege */}
          <Link href="/leistungen/ambulante-pflege" className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.08] hover:border-[var(--color-accent)]/30 transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1">
             <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:bg-[var(--color-accent)]">
               <Syringe className="w-7 h-7" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Medizinische Pflege</h4>
             <p className="text-sm text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors font-medium">
               Professionelle Umsetzung ärztlicher Verordnungen direkt bei Ihnen zuhause.
             </p>
             <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                {['Medikamentengabe', 'Wundversorgung', 'Injektionen'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs text-white/70 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" /> {item}
                  </li>
                ))}
             </ul>
          </Link>

           {/* CARD 5: Stack (Alltag & CTA) */}
           <div className="md:col-span-1 flex flex-col gap-6">
              
              <Link href="/leistungen/betreuung" className="flex-1 rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.08] hover:border-[var(--color-accent)]/30 transition-all group cursor-pointer flex flex-col justify-center hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:bg-[var(--color-accent)] transition-colors border border-white/5">
                        <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">Alltagshilfe</h4>
                        <p className="text-xs text-white/60 font-medium">Einkäufe, Haushalt & Betreuung.</p>
                    </div>
                </div>
              </Link>

              {/* CTA CARD (Glass) */}
              <Link href="/leistungen" className="group relative flex-1 rounded-[2.5rem] bg-white/5 hover:bg-white/10 p-8 flex flex-col justify-center items-start transition-all duration-300 shadow-xl shadow-black/20 border border-white/10 hover:-translate-y-1 overflow-hidden">
                 {/* Shimmer Effect */}
                 <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                 
                 <div className="relative z-10">
                    <h4 className="text-2xl font-black text-white mb-2">Alle Leistungen</h4>
                    <div className="flex items-center gap-2 text-[var(--color-accent)] font-bold group-hover:translate-x-2 transition-transform text-sm">
                        Zur Übersicht <ArrowRight className="w-4 h-4" />
                    </div>
                 </div>
              </Link>

           </div>
        </div>

        {/* FOOTER QUOTE */}
        <div className="mt-24 md:mt-32 text-center max-w-4xl mx-auto opacity-80 hover:opacity-100 transition-opacity">
          <ShieldCheck className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 opacity-80" />
          <blockquote className="text-2xl md:text-3xl font-serif text-white/90 leading-normal">
            "Pflege ist für uns nicht nur ein Beruf, sondern eine <span className="text-white font-semibold italic decoration-[var(--color-accent)] decoration-2 underline-offset-4 underline">Berufung</span>."
          </blockquote>
        </div>

      </div>
    </section>
  );
}