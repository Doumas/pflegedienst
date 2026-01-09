"use client";

import Link from "next/link";
import { MapPin, Car, ArrowRight } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { Button } from "@/shared/ui/button";
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { cn } from "@/shared/utils/cn";

export function AboutLocation() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden font-sans">
      
      {/* 1. HINTERGRUND (MapPin Icons) */}
      <div className="absolute inset-0 pointer-events-none -z-10 isolate">
        <AnimatedBackground icon={MapPin} variant="section" color="text-[var(--color-primary)]" />
        {/* Textur Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)', 
                backgroundSize: '40px 40px' 
            }} 
        />
      </div>

      {/* UPDATE: 'items-center' und 'text-center' für ALLE Breakpoints (kein lg:text-left mehr) */}
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* HEADER ICON */}
        <FadeIn>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2.5rem] text-[var(--color-primary)] mb-10 shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                <MapPin className="w-9 h-9" />
            </div>
        </FadeIn>
        
        {/* HEADLINE */}
        <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] max-w-4xl mx-auto">
                Unterwegs in <br className="hidden md:block" />
                <span className="relative inline-block px-2 mt-2">
                    {/* Script Font + Orange (Accent) */}
                    <span className="relative z-10 font-script font-bold text-[var(--color-accent)] tracking-normal text-[1.1em]">
                        Frankfurt & Umgebung.
                    </span>
                    {/* Orange Swoosh */}
                    <svg className="absolute w-[110%] h-3 lg:h-4 -bottom-1 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed font-medium text-pretty">
                Unser Team ist mobil und flexibel. Wir kommen dorthin, wo Sie uns brauchen – direkt zu Ihnen nach Hause.
            </p>
        </FadeIn>
        
        {/* ORTS-CLOUDS (Jetzt immer zentriert 'justify-center') */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto mb-20 w-full">
          {["Frankfurt Zentrum", "Sachsenhausen", "Bornheim", "Nordend", "Westend", "Bockenheim", "Gallus", "Niederrad", "Höchst", "Griesheim", "Rödelheim", "Hausen"].map((ort, i) => (
            <FadeIn key={i} delay={0.3 + (i * 0.05)} className="w-auto">
                <div className="group relative">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl text-slate-600 font-bold border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 hover:-translate-y-1 transition-all duration-300 cursor-default">
                        {/* Ping Dot in Orange */}
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]"></span>
                        </span>
                        {ort}
                    </div>
                </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.8} className="w-auto">
            <div className="px-5 py-3 text-slate-400 font-medium italic flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> ... und in Ihrer Nähe.
            </div>
          </FadeIn>
        </div>

        {/* CHECKER BOX (Call to Action) - Zentriert */}
        <FadeIn delay={0.4} direction="up" className="w-full flex justify-center">
            <div className="relative max-w-4xl w-full group">
                {/* Glow Effekt */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] rounded-[3rem] opacity-20 blur-xl group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden text-left">
                    
                    {/* Innerer animierter Hintergrund */}
                    <div className="absolute inset-0 opacity-[0.3] pointer-events-none">
                        <AnimatedBackground icon={Car} variant="card" count={3} color="text-slate-200" />
                    </div>

                    <div className="relative z-10 flex items-start gap-8 w-full">
                        <div className="hidden md:flex w-20 h-20 bg-slate-50 rounded-[1.5rem] items-center justify-center text-[var(--color-primary)] shrink-0 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <Car className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3">Liegt Ihre Adresse im Gebiet?</h3>
                            <p className="text-slate-600 font-medium text-lg leading-relaxed">
                                Wir prüfen das gerne unverbindlich für Sie und planen Ihre Route.
                            </p>
                        </div>
                    </div>
                    
                    <Link href="/kontakt" className="relative z-10 w-full md:w-auto shrink-0">
                        <Button size="lg" className="w-full md:w-auto px-10 h-16 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:-translate-y-1 transition-all rounded-2xl font-bold">
                            Jetzt prüfen <ArrowRight className="ml-3 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </FadeIn>

      </div>
    </section>
  );
}