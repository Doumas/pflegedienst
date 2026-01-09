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
                "text-[10px] font-bold uppercase tracking-[0.2em] mb-2 transition-colors",
                isInCenter ? "text-[var(--color-accent)]" : "text-white/40"
            )}>Schritt {index + 1}</div>
            <div className="font-bold text-xl mb-2 text-white tracking-tight">{step.title}</div>
            <p className="text-sm text-white/60 leading-relaxed max-w-[280px] lg:max-w-none font-medium">{step.desc}</p>
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
                "group block bg-[var(--color-primary)] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-xl transition-all duration-500 relative overflow-hidden transform-gpu",
                isInCenter 
                    ? "shadow-[var(--color-primary)]/40 scale-[1.01] -translate-y-1" 
                    : "shadow-[var(--color-primary)]/20 hover:-translate-y-1 hover:shadow-2xl"
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative z-10">
                <div className={cn(
                    "w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg shrink-0 transition-all duration-500",
                    isInCenter 
                        ? "text-[var(--color-accent)] scale-110 rotate-3" 
                        : "text-[var(--color-primary)] group-hover:text-[var(--color-accent)] group-hover:rotate-3"
                )}>
                    <CalendarCheck className="w-10 h-10" />
                </div>
                
                <div className="flex-1">
                    <h3 className="font-black text-white text-2xl md:text-4xl mb-2 tracking-tight">
                        <span className="font-script text-[1.2em] mr-3 text-[var(--color-accent)] font-bold">Persönliche</span>
                        Beratung?
                    </h3>
                    <p className="text-white/80 text-lg font-medium">Vereinbaren Sie jetzt einen unverbindlichen Termin.</p>
                </div>

                <div className={cn(
                    "h-14 px-8 rounded-2xl bg-white text-[var(--color-primary)] font-bold flex items-center justify-center gap-3 shadow-xl transition-all duration-300",
                    isInCenter ? "scale-105" : "group-hover:scale-105"
                )}>
                    Jetzt anfragen <ArrowRight className="w-5 h-5" />
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
    <div className="relative min-h-screen bg-[#fffbf7] font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">

        {/* --- HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-4 md:px-6">
          <div className="container mx-auto">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                
                {/* Breadcrumb */}
                <FadeIn delay={0.1}>
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
                        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <Link href="/leistungen" className="hover:text-[var(--color-primary)] transition-colors">Leistungen</Link>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />
                        <span className="text-slate-900">{service.title}</span>
                    </div>
                </FadeIn>
                
                {/* Headline Area */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8">
                    <FadeIn delay={0.2}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[1.8rem] shadow-xl shadow-[var(--color-primary)]/10 text-[var(--color-primary)] border border-white ring-4 ring-[var(--color-secondary)]">
                            <service.icon className="w-10 h-10" />
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3} className="text-center lg:text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                            {service.title}
                        </h1>
                    </FadeIn>
                </div>
                
                <FadeIn delay={0.4}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl text-pretty">
                        {service.description}
                    </p>
                </FadeIn>
            </div>
          </div>
        </section>

        {/* --- CONTENT --- */}
        <div className="container px-4 md:px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            <div className="lg:col-span-8 space-y-20">
              
              {/* Details */}
              <FadeIn delay={0.5}>
                <div className="prose prose-lg prose-slate max-w-none">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">
                        Worum geht es bei dieser <span className="text-[var(--color-primary)]">Leistung?</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {service.details || "Wir bieten Ihnen eine umfassende und professionelle Versorgung in diesem Bereich. Unser Ziel ist es, Ihre Selbstständigkeit zu fördern und Ihnen Sicherheit im Alltag zu geben."}
                    </p>
                </div>
              </FadeIn>
              
              {/* Feature Grid */}
              <FadeIn delay={0.6}>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Konkrete Inhalte:</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-lg transition-all duration-300 group">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center shrink-0 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-slate-700 font-bold leading-snug">{feature}</span>
                        </div>
                    ))}
                    </div>
                </div>
              </FadeIn>

              {/* ABLAUF BOX */}
              <FadeIn delay={0.7}>
                <div className="bg-[var(--color-footer-bg)] text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-black mb-16 text-white leading-tight">
                            Ihr Weg zur <br/>
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">Versorgung.</span>
                                <svg className="absolute w-[110%] h-3 -bottom-1 -left-2 text-white/20 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h3>
                        
                        <div className="grid sm:grid-cols-3 gap-12 relative">
                            {steps.map((step, i) => (
                                <StepCard key={i} step={step} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.8}>
                  <CtaBox />
              </FadeIn>

            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              <FadeIn delay={0.6} direction="left">
                <div className="bg-white p-3 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
                    <div className="bg-[var(--color-secondary)] p-5 rounded-[1.8rem] mb-3 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">Leistungen</span>
                    </div>
                    <nav className="space-y-1">
                    {servicesData.map((s) => (
                        <Link 
                            key={s.slug} 
                            href={s.href}
                            className={cn(
                                "flex items-center justify-between px-5 py-4 rounded-2xl transition-all group font-bold text-sm",
                                s.slug === slug 
                                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]"
                            )}
                        >
                            <span>{s.title}</span>
                            <ArrowRight className={cn("w-4 h-4 transition-all", s.slug === slug ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
                        </Link>
                    ))}
                    </nav>
                </div>
              </FadeIn>

              <FadeIn delay={0.7} direction="left">
                <div className="bg-gradient-to-br from-white to-[var(--color-secondary)]/30 p-10 rounded-[2.5rem] border border-white text-center shadow-lg">
                    <h4 className="font-black text-slate-900 text-2xl mb-4 tracking-tight">Fragen?</h4>
                    <p className="text-slate-600 mb-8 font-medium leading-relaxed">Wir beraten Sie gerne zur Beantragung und den Kosten.</p>
                    <Link href="/kontakt">
                        <Button variant="outline" className="w-full h-14 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-2xl hover:bg-[var(--color-primary)] hover:text-white transition-all">
                            Nachricht senden
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