"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { 
  Heart, Award, MapPin, Users, Clock, Quote, ArrowRight, Car,
  CheckCircle2, UserX, UserCheck, Stethoscope, X, Printer, Download, Phone, FileText, HelpCircle, Syringe, Bath 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { DalasLogo } from "@/shared/ui/dalas-logo"; 
import { FadeIn } from "@/shared/ui/fade-in";

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.1 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-30% 0px -30% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

export function AboutTemplate() {
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  
  const { ref: cardRef, isInCenter: cardActive } = useInCenter();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    {/* HAUPTSEITE */}
    <div className="hide-on-print relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* HINTERGRUND FX */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[80px] lg:blur-[100px] md:animate-pulse pointer-events-none transform-gpu will-change-transform" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[60px] lg:blur-[80px] pointer-events-none transform-gpu" />


      {/* INHALT */}
      <div className="relative z-10">

        {/* 1. HEADER: Mobile Center / Desktop Left */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-4">
          <div className="container max-w-4xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8">
                <Heart className="w-3 h-3 text-[var(--color-accent)] fill-current" />
                <span>Über uns</span>
                </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance">
                Pflege bedeutet <br/>
                <span className="relative inline-block ml-0 lg:ml-3"> {/* ml-0 auf mobile, damit es nicht komisch einrückt */}
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                    Vertrauen.
                    </span>
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span>
                </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-medium">
                Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
                Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.
                </p>
            </FadeIn>
          </div>
        </section>

       {/* 2. DAS KONZEPT */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="container px-4 md:px-6 relative z-10">
          
          {/* HEADER: Mobile Center / Desktop Left */}
          <div className="max-w-3xl mb-16 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
           <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        Das Prinzip <span className="text-[var(--color-primary)]">Bezugspflege.</span>
                </h2>
           </FadeIn>
           <FadeIn delay={0.2} direction="right">
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    In vielen Pflegediensten gleicht der Alltag einem Bahnhof: Jeden Tag ein anderes Gesicht. 
                    Wir haben für Sie eine <strong>5-seitige Broschüre</strong> zusammengestellt, die unser Konzept und erste Hilfestellungen erklärt.
                </p>
           </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
             
             {/* Die "Andere" Seite */}
             <FadeIn delay={0.1} direction="right" className="h-full">
                <div className={cn(
                    "bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 transition-all duration-500 flex flex-col justify-center h-full",
                    cardActive ? "opacity-60 scale-95" : "opacity-80 hover:opacity-100"
                )}>
                    <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                        <UserX className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Klassische Pflege</h3>
                    </div>
                    <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Ständig wechselndes Personal
                    </li>
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Anonyme Abwicklung
                    </li>
                    <li className="flex gap-3 text-slate-500 font-medium">
                        <span className="text-red-400 font-bold">✕</span> Hektik und Zeitdruck
                    </li>
                    </ul>
                </div>
             </FadeIn>

             {/* UNSERE SEITE - MIT AUTO-HOVER EFFEKT */}
             <FadeIn delay={0.3} direction="left" className="h-full">
                <div 
                    ref={cardRef}
                    onClick={() => setIsFlyerOpen(true)}
                    className={cn(
                        "group cursor-pointer bg-[var(--color-secondary)] rounded-[2.5rem] p-8 md:p-10 border relative overflow-hidden transition-all duration-500 transform-gpu h-full",
                        cardActive 
                            ? "scale-[1.03] shadow-2xl shadow-[var(--color-primary)]/20 border-[var(--color-primary)]/30" 
                            : "scale-100 shadow-xl shadow-[var(--color-primary)]/5 border-[var(--color-border-soft)] hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--color-primary)]/10"
                    )}
                >
                    <div className={cn(
                        "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-accent)]/50 to-[var(--color-accent)]/10 rounded-bl-[100px] transition-transform duration-700",
                        cardActive ? "scale-125" : "scale-100 group-hover:scale-110"
                    )} />
                    
                    <div className={cn(
                        "absolute top-6 right-6 transition-all duration-500 text-[var(--color-accent)] font-bold text-xs uppercase tracking-wide flex items-center gap-1",
                        cardActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    )}>
                        Broschüre öffnen <FileText className="w-3 h-3" />
                    </div>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={cn(
                        "w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30 transition-transform duration-500",
                        cardActive ? "scale-110 rotate-6" : "group-hover:scale-110 group-hover:rotate-6"
                    )}>
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <h3 className={cn(
                        "text-2xl font-black text-slate-900 transition-colors duration-300",
                        (cardActive) && "text-[var(--color-primary)]"
                    )}>Herz & Hand Prinzip</h3>
                    </div>
                    <ul className="space-y-4 relative z-10">
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Feste, kleine Teams (max. 3 Personen)</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Persönliche Beziehung & Vertrauen</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                        <span className="font-bold text-slate-800">Realistische Zeitplanung für Gespräche</span>
                    </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-[var(--color-primary)]/10 relative z-10">
                    <p className="text-sm font-bold text-[var(--color-primary)] flex items-center gap-2">
                        <Download className="w-4 h-4" /> Klicken Sie hier für die Info-Broschüre (PDF)
                    </p>
                    </div>
                </div>
             </FadeIn>

          </div>
        </div>
      </section>

        {/* 3. TEAM GRID */}
        <section className="py-24 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            
            {/* HEADER: Mobile Center / Desktop Left */}
            <div className="mb-16 flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        Gesichter des Vertrauens
                    </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <p className="text-slate-600 text-lg">Unser Team ist unser Stolz.</p>
                </FadeIn>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto lg:mx-0">
              {/* Anna */}
              <FadeIn delay={0.1} className="h-full">
                <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center hover:-translate-y-1 h-full">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users className="w-12 h-12" /></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Anna Müller</h3>
                    <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Pflegedienstleitung</p>
                </div>
              </FadeIn>
              {/* Thomas */}
              <FadeIn delay={0.2} className="h-full">
                <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--color-primary)]/10 text-center relative md:-top-6 z-10 h-full">
                    <div className="absolute top-4 right-4 text-[var(--color-accent)]"><Award className="w-6 h-6" /></div>
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users className="w-12 h-12" /></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Thomas Weber</h3>
                    <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Stellv. PDL</p>
                </div>
              </FadeIn>
               {/* Sarah */}
               <FadeIn delay={0.3} className="h-full">
                <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center hover:-translate-y-1 h-full">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users className="w-12 h-12" /></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Sarah Klein</h3>
                    <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Verwaltung</p>
                </div>
               </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. QUALITÄT & WERTE */}
        <section className="py-24 lg:py-32 bg-[var(--color-footer-bg)] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               
               <FadeIn direction="right">
                <div className="relative group">
                    <div className="absolute inset-0 border-2 border-[var(--color-accent)]/20 rounded-[2.5rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-black/20">
                        <Image src="/images/team/team.jpg" alt="Qualität" fill className="object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-footer-bg)] via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <Quote className="w-8 h-8 text-[var(--color-accent)] mb-2 opacity-80" />
                            <div className="text-xl font-bold text-white mb-1">Geprüfte Qualität</div>
                            <p className="text-white/70 text-sm">Unser Team besteht zu 100% aus festangestellten Fachkräften.</p>
                        </div>
                    </div>
                </div>
               </FadeIn>

               {/* RECHTS: TEXT - Mobile Center / Desktop Left */}
               <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <FadeIn delay={0.2} direction="left">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
                            <Award className="w-3 h-3" /> MDK Note 1.0
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-black mb-6 tracking-tight text-balance leading-[1.1]">
                            Kein Zufall, sondern Standard.
                        </h2>
                        <div className="prose prose-invert text-white/80 leading-relaxed text-lg">
                            <p>
                            Einmal jährlich prüft der Medizinische Dienst (MDK) unangemeldet. 
                            Die Bestnote ist für uns Ansporn, jeden Tag unser Bestes zu geben. Wir legen Wert auf:
                            </p>
                        </div>
                    </div>
                  </FadeIn>

                  <div className="grid gap-4 w-full">
                     {[
                        { title: "Medizinische Genauigkeit", desc: "Korrekte Wundversorgung & Medikamentengabe.", icon: Stethoscope },
                        { title: "Verlässliche Organisation", desc: "Erreichbarkeit & transparente Abrechnung.", icon: Clock },
                        { title: "Menschliche Wärme", desc: "Wie wohl fühlen sich die Menschen bei uns?", icon: Heart },
                     ].map((fact, i) => (
                        <FadeIn key={i} delay={0.3 + (i * 0.1)} direction="left">
                            {/* Items bleiben linksbündig für Lesbarkeit (UX Standard) */}
                            <div className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group text-left">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform"><fact.icon className="w-6 h-6" /></div>
                            <div>
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">{fact.title}</div>
                                <div className="text-base text-white/60">{fact.desc}</div>
                            </div>
                            </div>
                        </FadeIn>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. CTA / VERFÜGBARKEIT */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)', 
                 backgroundSize: '40px 40px' 
               }}>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* CONTENT: Mobile Center / Desktop Left */}
          <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <FadeIn>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] text-[var(--color-primary)] mb-8 shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                <MapPin className="w-8 h-8" />
                </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                Unterwegs in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Frankfurt & Umgebung</span>
                </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
                <p className="text-xl text-slate-600 max-w-2xl mb-16 leading-relaxed">
                Unser Team ist mobil und flexibel. Wir kommen dorthin, wo Sie uns brauchen – direkt zu Ihnen nach Hause.
                </p>
            </FadeIn>
            
            {/* ORTE - ZENTRIERT BLEIBEN (da Wolke) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 max-w-5xl mb-20 w-full">
              {["Frankfurt Zentrum", "Sachsenhausen", "Bornheim", "Nordend", "Westend", "Bockenheim", "Gallus", "Niederrad", "Höchst", "Griesheim", "Rödelheim", "Hausen"].map((ort, i) => (
                <FadeIn key={i} delay={0.3 + (i * 0.05)} className="w-auto">
                    <div className="group relative">
                    <div className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl text-slate-600 font-bold border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:shadow-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/30 group-hover:-translate-y-1 transition-all duration-300 cursor-default">
                        <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        {ort}
                    </div>
                    </div>
                </FadeIn>
              ))}
              <FadeIn delay={0.8} className="w-auto">
                <div className="px-6 py-3.5 text-slate-400 font-medium italic flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> ... und in Ihrer Nähe.
                </div>
              </FadeIn>
            </div>

            {/* CHECKER BOX */}
            <FadeIn delay={0.4} direction="up" className="w-full">
                <div className="relative max-w-4xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] rounded-[2.5rem] opacity-20 blur-lg group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="text-left relative z-10 flex items-start gap-6 w-full">
                        <div className="hidden md:flex w-16 h-16 bg-slate-50 rounded-2xl items-center justify-center text-[var(--color-primary)] shrink-0 border border-slate-100">
                            <Car className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Liegt Ihre Adresse im Gebiet?</h3>
                            <p className="text-slate-600 font-medium text-lg">Wir prüfen das gerne unverbindlich und planen Ihre Route.</p>
                        </div>
                    </div>
                    
                    <Link href="/kontakt" className="relative z-10 w-full md:w-auto shrink-0">
                        <Button size="lg" className="w-full md:w-auto px-10 h-16 text-lg">
                        Jetzt prüfen <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
                </div>
            </FadeIn>

          </div>
        </section>

      </div>
    </div>

    {/* FLYER OVERLAY (Bleibt zentriert, da Modal) */}
    {isFlyerOpen && (
      <div id="print-overlay">
         <div className="fixed inset-0 no-print cursor-pointer" onClick={() => setIsFlyerOpen(false)} />
         <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 no-print pointer-events-none">
            <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl w-full max-w-[210mm] pointer-events-auto">
               <div className="text-white font-bold px-3">Broschüre (5 Seiten)</div>
               <div className="flex gap-3">
                 <Button onClick={handlePrint} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold rounded-xl gap-2 shadow-lg">
                    <Printer className="w-4 h-4" /> PDF / Drucken
                 </Button>
                 <button onClick={() => setIsFlyerOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                    <X className="w-6 h-6" />
                 </button>
               </div>
            </div>
         </div>
         <div id="flyer-content-container">
            {/* ... Flyer Content ... (Unverändert, da Druck-Layout) */}
            {/* Seite 1 */}
            <div className="flyer-page bg-[var(--color-secondary)]">
               <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-16 md:p-24">
                   <div className="absolute top-0 right-0 w-[80mm] h-[80mm] bg-white/20 rounded-bl-[100%] pointer-events-none" />
                   <div className="absolute bottom-0 left-0 w-[80mm] h-[80mm] bg-[var(--color-primary)]/10 rounded-tr-[100%] pointer-events-none" />
                   
                   <DalasLogo className="w-64 h-auto mb-10 relative z-10" variant="default" />
                   
                   <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[var(--color-primary)] text-sm font-bold tracking-wide uppercase shadow-sm mb-8 relative z-10">
                       <Heart className="w-4 h-4 fill-current" /> Ambulanter Intensivpflegedienst
                   </div>

                   <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight relative z-10">
                      Ihr Wegweiser für <br/>
                      <span className="text-[var(--color-primary)]">gute Pflege.</span>
                   </h1>
                   
                   <p className="text-xl text-slate-600 max-w-lg mx-auto mb-12 relative z-10">
                      Informationen, Checklisten und unser Konzept für Sie zusammengefasst.
                   </p>

                   <div className="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-12 z-10">
                      <Image src="/images/team/team.jpg" alt="Das DALAS Team" fill className="object-cover" />
                   </div>

                   <div className="mt-auto bg-white p-6 rounded-2xl shadow-xl border border-[var(--color-primary)]/10 w-full max-w-md relative z-10">
                      <p className="font-bold text-slate-900 text-lg mb-1">Dalas UG</p>
                      <p className="text-slate-600 flex items-center justify-center gap-2"><MapPin className="w-4 h-4 text-[var(--color-accent)]"/> Borsigallee 37, 60388 Frankfurt</p>
                      <p className="text-[var(--color-primary)] font-bold mt-2">www.pflegedienst-dalas.com</p>
                   </div>
               </div>
            </div>
            
            {/* Seite 2 */}
             <div className="flyer-page bg-white">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b pb-4">Unser Pflege-Konzept</h2>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                       Pflege ist Vertrauenssache. Damit Sie wissen, worauf Sie sich einlassen, haben wir unser Prinzip "Herz & Hand" dem üblichen Marktstandard gegenübergestellt.
                    </p>

                    <div className="grid gap-8 mb-12">
                       <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                          <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><X className="w-5 h-5 text-red-400"/> Markt-Standard</h3>
                          <ul className="space-y-4">
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Häufiger Wechsel der Pflegekräfte</li>
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Zeitdruck & Hektik bei der Versorgung</li>
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Anonyme Abwicklung</li>
                          </ul>
                       </div>

                       <div className="bg-[var(--color-secondary)]/30 p-8 rounded-2xl border border-[var(--color-primary)]/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/10 rounded-bl-full" />
                          <h3 className="font-bold text-[var(--color-primary)] uppercase tracking-widest text-sm mb-4 flex items-center gap-2 relative z-10"><CheckCircle2 className="w-5 h-5"/> Bei DALAS</h3>
                          <ul className="space-y-4 relative z-10">
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> Maximal 3 Bezugspersonen</li>
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> Zeit für Gespräche & Zuwendung</li>
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> 24h Erreichbarkeit im Notfall</li>
                          </ul>
                       </div>
                    </div>

                    <div className="mt-auto p-8 bg-[var(--color-primary)] text-white rounded-2xl italic text-center text-xl shadow-lg relative overflow-hidden">
                       <Quote className="absolute top-4 left-4 w-12 h-12 text-[var(--color-accent)] opacity-30" />
                       "Wir pflegen so, wie wir selbst gepflegt werden möchten."
                    </div>
                </div>
            </div>
            
            {/* Seite 3 */}
            <div className="flyer-page bg-slate-50">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">Die ersten Schritte</h2>
                    <p className="text-lg text-slate-600 mb-10">Wenn plötzlich Pflege nötig wird, ist die Unsicherheit oft groß. Hier ist ein einfacher Fahrplan für Sie.</p>

                    <div className="space-y-8 flex-1">
                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">1</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Antrag stellen</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Stellen Sie einen formlosen Antrag auf Pflegeleistungen bei Ihrer Pflegekasse (befindet sich bei der Krankenkasse). Ein einfacher Anruf genügt oft für den Anfang, um die Frist zu wahren.</p>
                          </div>
                       </div>

                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">2</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Pflegedienst kontaktieren</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Rufen Sie uns an (<strong>06109 715 99 16</strong>). Wir vereinbaren einen unverbindlichen Erstbesuch bei Ihnen zu Hause, um den individuellen Bedarf einzuschätzen. Wir helfen Ihnen auch gerne beim Ausfüllen der Formulare.</p>
                          </div>
                       </div>

                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">3</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Begutachtung (MDK)</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Der Medizinische Dienst kündigt sich an, um den Pflegegrad festzustellen. <br/><strong>Unser Tipp:</strong> Wir können bei diesem wichtigen Termin dabei sein, um Sie zu unterstützen und fachliche Fragen zu klären.</p>
                          </div>
                       </div>
                       
                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">4</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Start der Versorgung</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Sobald der Pflegegrad feststeht und alles geklärt ist, kommt unser festes Team zu den vereinbarten Zeiten zu Ihnen. Ein transparenter Pflegevertrag regelt alle Details.</p>
                          </div>
                       </div>
                    </div>
                </div>
            </div>

            {/* Seite 4 */}
            <div className="flyer-page bg-white">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Unsere Leistungen</h2>
                    <p className="text-lg text-slate-600 mb-10">Wir bieten eine umfassende Versorgung, abgestimmt auf Ihre Bedürfnisse. Hier ein Überblick unserer Leistungen.</p>
                    
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { title: "Grundpflege", icon: Bath, items: ["Körperpflege (Waschen, Duschen)", "An- und Auskleiden", "Nahrungsaufnahme", "Mobilisation"] },
                         { title: "Behandlungspflege (SGB V)", icon: Syringe, items: ["Medikamentengabe", "Wundversorgung", "Injektionen (Insulin)", "Blutzuckermessung"] },
                         { title: "Betreuung & Hauswirtschaft", icon: Heart, items: ["Unterstützung im Haushalt", "Begleitung zu Terminen", "Spaziergänge", "Entlastung Angehöriger"] },
                         { title: "Beratung", icon: HelpCircle, items: ["Beratungseinsätze § 37.3", "Hilfe bei Anträgen", "Schulung von Angehörigen", "Kostenklärung"] }
                       ].map((service, i) => (
                         <div key={i} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                                 <service.icon className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
                               <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                 {service.items.map((item, idx) => (
                                   <li key={idx} className="text-slate-600 text-xs flex items-start gap-2">
                                     <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 mt-1.5"/> {item}
                                   </li>
                                 ))}
                               </ul>
                            </div>
                         </div>
                       ))}
                    </div>
                </div>
            </div>

            {/* Seite 5 */}
            <div className="flyer-page bg-[var(--color-primary)] text-white">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col justify-center items-center text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay z-0" />
                    
                    <div className="relative z-10 w-full max-w-2xl px-4">
                        <h2 className="text-4xl font-black mb-6">Wir sind für Sie da.</h2>
                        <p className="text-lg opacity-90 mb-12">
                           Zögern Sie nicht, uns anzurufen. Ein Gespräch bringt oft sofort Klarheit.
                        </p>

                        <div className="bg-white text-slate-900 rounded-[2rem] p-10 shadow-2xl text-left relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] rounded-bl-[100px] -z-0" />
                           
                           <div className="relative z-10">
                             <DalasLogo className="w-40 h-auto mb-8 text-[var(--color-primary)]" variant="default" />
                             
                             <div className="space-y-6">
                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><MapPin className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Anschrift</div>
                                      <div className="text-slate-600">Borsigallee 37, 60388 Frankfurt</div>
                                   </div>
                                </div>

                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><Phone className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Telefon</div>
                                      <div className="text-2xl font-black text-[var(--color-primary)]">06109 715 99 16</div>
                                      <div className="text-slate-500">Mobil: 0179 323 67 45</div>
                                   </div>
                                </div>

                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><FileText className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Online</div>
                                      <div className="text-slate-600 break-all">dalas.pflegedienst@gmail.com</div>
                                      <div className="text-slate-600">www.pflegedienst-dalas.com</div>
                                   </div>
                                </div>
                             </div>
                           </div>
                        </div>

                        <div className="mt-12 opacity-60 text-xs">
                           © 2025 Ambulanter Intensivpflegedienst Dalas UG<br/>
                           Alle Kassen & Privat
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </div>
    )}
    </>
  );
}