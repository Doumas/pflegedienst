"use client";

import { notFound } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { 
  CheckCircle, 
  ChevronRight, 
  Home, 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  FileHeart, 
  CalendarCheck 
} from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/modules/services/data/services"; 
import { FadeIn } from "@/shared/ui/fade-in"; 
import { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/utils/cn";

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- SUB-KOMPONENTEN ---

function StepCard({ step, index }: { step: any, index: number }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref} 
            className={cn(
                "relative group transition-all duration-500 transform-gpu flex flex-col items-center lg:items-start text-center lg:text-left",
                isInCenter ? "scale-105" : "scale-100"
            )}
        >
            <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-300 shadow-lg",
                isInCenter 
                    ? "bg-white text-[var(--color-primary)] border-white scale-110" 
                    : "bg-white/10 text-white border-white/10 group-hover:bg-white group-hover:text-[var(--color-primary)] group-hover:scale-105"
            )}>
                <step.icon className="w-7 h-7" />
            </div>
            <div className={cn(
                "text-xs font-bold uppercase tracking-wider mb-2 transition-colors",
                isInCenter ? "text-[var(--color-accent)]" : "text-white/50"
            )}>Schritt {index + 1}</div>
            <div className="font-bold text-xl mb-2 text-white">{step.title}</div>
            <p className="text-sm text-white/70 leading-relaxed max-w-[280px] lg:max-w-none">{step.desc}</p>
        </div>
    );
}

function CtaBox() {
    const { ref, isInCenter } = useInCenter();

    return (
        <Link 
            ref={ref as any}
            href="/kontakt"
            className={cn(
                "group block bg-[var(--color-primary)] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-xl transition-all duration-500 relative overflow-hidden transform-gpu",
                isInCenter 
                    ? "shadow-[var(--color-primary)]/40 scale-[1.02] -translate-y-1" 
                    : "shadow-[var(--color-primary)]/20 hover:-translate-y-1 hover:shadow-2xl"
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative z-10">
                <div className={cn(
                    "w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0 transition-colors duration-300",
                    isInCenter 
                        ? "text-[var(--color-accent)] scale-110" 
                        : "text-[var(--color-primary)] group-hover:text-[var(--color-accent)]"
                )}>
                    <CalendarCheck className="w-9 h-9" />
                </div>
                
                <div className="flex-1">
                    {/* Script Font für persönliche Ansprache */}
                    <h3 className="font-black text-white text-2xl md:text-3xl mb-2">
                        <span className="font-script text-[1.2em] mr-2 text-[var(--color-accent)] font-normal">Persönliche</span>
                        Beratung?
                    </h3>
                    <p className="text-white/90 text-lg">Rufen Sie uns an oder schreiben Sie uns.</p>
                </div>

                <div className={cn(
                    "w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300",
                    isInCenter 
                        ? "bg-white text-[var(--color-primary)] border-white scale-105" 
                        : "bg-white/10 border-white/20 text-white group-hover:bg-white group-hover:text-[var(--color-primary)]"
                )}>
                    <ArrowRight className={cn("w-6 h-6 transition-transform", isInCenter ? "translate-x-1" : "group-hover:translate-x-1")} />
                </div>
            </div>
        </Link>
    );
}

// --- HAUPTKOMPONENTE ---

export function ServiceDetailTemplate({ slug }: { slug: string }) {
  
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) notFound();

  const steps = [
      { title: "Erstgespräch", desc: "Wir lernen uns kennen und besprechen Ihren konkreten Bedarf.", icon: MessageCircle },
      { title: "Pflegeplanung", desc: "Wir erstellen den Plan und klären die Kostenübernahme.", icon: FileHeart },
      { title: "Pflegestart", desc: "Unsere festen Bezugspersonen kommen zu Ihnen.", icon: Calendar }
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* Background FX (Warm Tone) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none transform-gpu" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />


      <div className="relative z-10">

        {/* --- HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 md:px-6">
          <div className="container mx-auto">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                
                {/* Breadcrumb */}
                <FadeIn delay={0.1}>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
                        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                        <Link href="/leistungen" className="hover:text-[var(--color-accent)] transition-colors">Leistungen</Link>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                        <span className="text-[var(--color-primary)]">{service.title}</span>
                    </div>
                </FadeIn>
                
                {/* Icon Box mit Teal Background */}
                <FadeIn delay={0.2}>
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--color-primary)]/5 rounded-[2rem] shadow-2xl shadow-[var(--color-primary)]/10 text-[var(--color-primary)] mb-8 border border-[var(--color-primary)]/10 ring-1 ring-white">
                        <service.icon className="w-10 h-10" />
                    </div>
                </FadeIn>
                
                {/* Headline */}
                <FadeIn delay={0.3}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        {service.title}
                    </h1>
                </FadeIn>
                
                {/* Description */}
                <FadeIn delay={0.4}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                        {service.description}
                    </p>
                </FadeIn>
            </div>
          </div>
        </section>

        {/* --- CONTENT LAYOUT --- */}
        <div className="container px-4 md:px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LINKS: Hauptinhalt */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Haupttext */}
              <FadeIn delay={0.5}>
                <div className="prose prose-lg prose-slate max-w-none text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                        Worum geht es bei dieser <span className="text-[var(--color-primary)]">Leistung?</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {service.details || "Wir bieten Ihnen eine umfassende und professionelle Versorgung in diesem Bereich. Unser Ziel ist es, Ihre Selbstständigkeit zu fördern und Ihnen Sicherheit im Alltag zu geben."}
                    </p>
                </div>
              </FadeIn>
              
              {/* Feature Grid */}
              <FadeIn delay={0.6}>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8 text-left">Das ist konkret enthalten:</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-left">
                    {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-secondary)]/30 border border-transparent hover:border-[var(--color-primary)]/20 hover:bg-[var(--color-secondary)]/60 transition-colors duration-300 group transform-gpu">
                            {/* Checkmark in Teal */}
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-white border border-[var(--color-border-soft)] flex items-center justify-center shrink-0 shadow-sm text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-slate-700 font-medium leading-snug">{feature}</span>
                        </div>
                    ))}
                    </div>
                </div>
              </FadeIn>

              {/* ABLAUF BOX */}
              <FadeIn delay={0.7}>
                <div className="bg-[var(--color-footer-bg)] text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-[var(--color-primary)]/20 transform-gpu">
                    
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/20 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Custom Badge Icon */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wide mb-8">
                            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
                                <path d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z" className="text-[var(--color-accent)] stroke-[var(--color-accent)]" />
                            </svg>
                            Der Ablauf
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-black mb-12 text-white">
                            Ihr Weg zur <br/>
                            {/* Script Font für Emotion */}
                            <span className="font-script text-[var(--color-accent)] text-[1.1em] font-normal relative inline-block px-1 mt-1">
                                Versorgung.
                                <svg className="absolute w-full h-2 -bottom-0 left-0 text-white opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h3>
                        
                        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 relative w-full">
                            {steps.map((step, i) => (
                                <StepCard key={i} step={step} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
              </FadeIn>

              {/* CTA BOX */}
              <FadeIn delay={0.8}>
                  <CtaBox />
              </FadeIn>

            </div>

            {/* RECHTS: Sidebar */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              
              {/* Widget 1: Navigation */}
              <FadeIn delay={0.6} direction="left">
                <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-[var(--color-border-soft)] overflow-hidden transform-gpu">
                    <div className="bg-[var(--color-secondary)]/50 p-5 rounded-3xl mb-2 flex items-center gap-3 border border-[var(--color-border-soft)]/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">Leistungsübersicht</span>
                    </div>
                    <nav className="flex flex-col gap-1 p-1">
                    {servicesData.map((s) => (
                        <Link 
                        key={s.slug} 
                        href={s.href}
                        className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all group ${
                            s.slug === slug 
                            ? "bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20" 
                            : "text-slate-600 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
                        }`}
                        >
                        <span className="text-sm">{s.title}</span>
                        {s.slug === slug ? (
                            <ArrowRight className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        )}
                        </Link>
                    ))}
                    </nav>
                </div>
              </FadeIn>

              {/* Widget 2: Quick Contact */}
              <FadeIn delay={0.7} direction="left">
                {/* Weicher Farbverlauf für Freundlichkeit */}
                <div className="bg-gradient-to-br from-[var(--color-secondary)] via-white to-white p-8 rounded-[2.5rem] border border-[var(--color-border-soft)] text-center transform-gpu">
                    <h4 className="font-bold text-slate-900 text-xl mb-4">Haben Sie Fragen?</h4>
                    <p className="text-slate-600 mb-8 leading-relaxed">Wir helfen Ihnen gerne weiter bei der Beantragung und Planung.</p>
                    <Link href="/kontakt">
                    <Button className="w-full h-12 bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white rounded-xl transition-all flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" /> Nachricht senden
                    </Button>
                    </Link>
                </div>
              </FadeIn>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}