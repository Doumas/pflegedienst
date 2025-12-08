"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowRight, SmilePlus, CheckCircle2, MessageCircle, Euro, Car, Clock, Heart } from "lucide-react";

export function CareerTeaser() {
  return (
    // HINTERGRUND: Verlauf (Mint zu Weiß) + Lichteffekte für Tiefe
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[var(--color-secondary)] to-white font-sans overflow-hidden relative">
      
      {/* DEKO 1: Großes "TEAM" im Hintergrund */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-[var(--color-primary)] opacity-[0.03] select-none pointer-events-none z-0 tracking-tighter">
        TEAM
      </div>
      
      {/* DEKO 2: Licht-Blob oben rechts */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LINKS: PITCH + BENEFITS --- */}
          <div className="space-y-8 order-2 lg:order-1">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm">
              <SmilePlus className="w-4 h-4 text-[var(--color-accent)]" />
              Karriere bei uns
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] text-balance">
              Kein Applaus. <br/>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                Sondern Respekt.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Wir wissen, was du leistest. Deshalb bieten wir dir Bedingungen, die du verdienst:
            </p>

            {/* --- WIEDER EINGEFÜGT: DIE 4 KERN-BENEFITS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              {[
                { icon: Euro, text: "Top Gehalt + Zuschläge" },
                { icon: Clock, text: "Wunsch-Dienstplan" },
                { icon: Car, text: "Eigener Firmenwagen" },
                { icon: Heart, text: "Echtes Team-Gefühl" },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-transparent hover:border-[var(--color-primary)]/20 hover:bg-white transition-colors shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 border border-[var(--color-primary)]/10">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm leading-tight">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons & Hinweis */}
            <div className="pt-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
               <Link href="/karriere">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all">
                  Zu den offenen Stellen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
               </Link>
               
               <p className="text-xs text-slate-500 font-medium leading-tight max-w-[200px]">
                 <strong className="text-[var(--color-primary)]">Tipp:</strong> Bewerbung in unter 60 Sek. ohne Lebenslauf möglich.
               </p>
            </div>
          </div>

          {/* --- RECHTS: VISUAL (Chat Style) --- */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-primary)]/20 rounded-full blur-[100px]" />

             <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-white/60 backdrop-blur-md lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                
                {/* Header Karte */}
                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[var(--color-primary)]/20">
                    H&H
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full w-fit mb-1">
                        Wir stellen ein
                    </div>
                    <div className="font-black text-slate-900 text-lg">Dein neues Team</div>
                  </div>
                </div>

                {/* Chat Visualisierung */}
                <div className="space-y-4 mb-8">
                  <div className="bg-[var(--color-secondary)] rounded-2xl rounded-tl-none p-4 border border-[var(--color-border-soft)] relative">
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                      "Hey! 👋 Suchst du einen Job, bei dem der Mensch wieder im Mittelpunkt steht?"
                    </p>
                  </div>
                  
                  <div className="bg-[var(--color-primary)]/10 rounded-2xl rounded-tr-none p-4 border border-[var(--color-primary)]/10 ml-8">
                    <p className="text-[var(--color-primary-deep)] text-sm font-bold">
                      "Ja, genau das suche ich! Wo kann ich mich melden?"
                    </p>
                  </div>
                </div>

                {/* CTA Button in der Karte */}
                <Link href="/karriere" className="block w-full group">
                  <div className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-4 rounded-xl font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 group-hover:scale-[1.02]">
                     <MessageCircle className="w-5 h-5" />
                     Jetzt Express bewerben
                  </div>
                </Link>
                
                <div className="text-center mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 
                  Dauert nur 1 Minute
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}