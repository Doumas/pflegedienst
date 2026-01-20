"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as LinkArrow } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";

import { HeroVideos } from "../components/hero-videos"; 
import { HeroTextSlider } from "../components/hero-text-slider";

const TEXT_SLIDES = [
  { id: 1, label: "Persönliche Nähe", description: "Wir nehmen uns Zeit für echte Begegnungen und hören zu." },
  { id: 2, label: "Fachkompetenz", description: "Stetige Fortbildung für medizinische Versorgung auf höchstem Niveau." },
  { id: 3, label: "24/7 Erreichbarkeit", description: "Sicherheit rund um die Uhr. Wir sind immer für Sie da." },
  { id: 4, label: "Pflegeberatung", description: "Wir helfen bei Anträgen und klären Pflegegrad-Fragen kostenlos." },
  { id: 5, label: "Grundpflege", description: "Unterstützung bei der Körperpflege, Ernährung und Mobilität." },
  { id: 6, label: "Behandlungspflege", description: "Medikamentengabe, Wundversorgung und Injektionen nach Plan." },
  { id: 7, label: "Hauswirtschaft", description: "Unterstützung im Haushalt, beim Einkauf und Kochen." },
  { id: 8, label: "Verhinderungspflege", description: "Wir springen ein, wenn pflegende Angehörige eine Auszeit brauchen." },
  { id: 9, label: "Palliativpflege", description: "Würdevolle Begleitung in der letzten Lebensphase." },
  { id: 10, label: "Betreuungsleistung", description: "Spaziergänge, Gespräche und Begleitung im Alltag." }
];

const Marker = ({ className }: { className?: string }) => (
  <div className={`crosshair-marker ${className}`} aria-hidden="true" />
); 

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % TEXT_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % TEXT_SLIDES.length);
  const prev = () => setCurrent((p) => (p - 1 + TEXT_SLIDES.length) % TEXT_SLIDES.length);

  return (
    <section className="relative w-full pt-40 lg:pt-48 bg-white overflow-hidden flex flex-col justify-between min-h-screen">
      
      <div className="container mx-auto px-6 relative z-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-center">
          
          {/* --- LINKS: Content --- */}
          <div className="flex flex-col relative z-20">
            <FadeIn>
                <div className="flex items-center gap-3 mb-6 max-w-4xl">
                    <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Willkommen bei DALAS</span>
                </div>            
                
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-6 lg:mb-8">
                    Sicherheit und Geborgenheit <span className="text-[var(--color-primary)]">Zuhause</span>
                </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed font-body max-w-lg mb-8">
                    Ob anspruchsvolle Intensivpflege oder Unterstützung im Alltag: Wir sind Ihr verlässlicher Partner in Frankfurt. Medizinisch höchst kompetent, menschlich immer nah.
                </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link 
                href="/pflegekraft-finden" 
                className="group inline-flex items-center gap-2 text-lg font-bold text-[var(--color-text-main)] hover:text-[var(--color-primary)] transition-colors"
              >
                 <span>Kostenloses Erstgespräch vereinbaren</span>
                 <LinkArrow className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </FadeIn>
          </div>

          {/* --- RECHTS: Video Component (Desktop) --- */}
          <div className="relative w-full hidden lg:block text-[var(--color-primary-deep)] mt-4 lg:mt-0">
             
             {/* FIX: Muster jetzt "left-0", damit es hinter dem linksbündigen Video liegt */}
             <div className="absolute top-0 left-0 w-full max-w-[650px] h-[90%] -z-10">
                 <div className="w-full h-full bg-pattern-cross-dots text-slate-300 opacity-40 scale-90" />
             </div>

             {/* Marker bleibt so auch schön in der Nähe */}
             <Marker className="-top-4 -left-4" />
             
             {/* Das Plus schieben wir etwas weiter nach links, damit es nicht "abhaut" (war -right-8) */}
             <div className="absolute top-1/2 right-12 text-[var(--color-primary)] opacity-30 text-2xl select-none">+</div>
             
             <div className="relative z-10 h-full">
                <HeroVideos />
             </div>
          </div>
          
          {/* --- MOBILE FALLBACK --- */}
          <div className="lg:hidden w-full relative mt-16 text-[var(--color-primary-deep)]">
             <div className="absolute inset-0 -z-10 max-w-[550px] mx-auto left-0 right-0">
                 <div className="w-full h-full bg-pattern-cross-dots text-slate-300 opacity-30" />
             </div>
             
             <div className="relative z-10">
                <HeroVideos />
             </div>
          </div>
        </div>
      </div>

      {/* 2. TEXT-SLIDER BEREICH (Footer) */}
      <div className="w-full border-t border-[var(--color-primary-deep)]/10 mt-32 lg:mt-24 bg-white relative z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row h-auto lg:h-48">
            <div className="flex-1 py-8 lg:py-0 border-r border-[var(--color-primary-deep)]/10 lg:border-none overflow-hidden flex items-center">
                <HeroTextSlider slides={TEXT_SLIDES} current={current} />
            </div>
            <div className="flex lg:flex-col border-t lg:border-t-0 lg:border-l border-[var(--color-primary-deep)]/10 h-16 lg:h-auto w-full lg:w-24 shrink-0">
                <button 
                  onClick={prev} 
                  className="flex-1 flex items-center justify-center bg-white hover:bg-slate-50 text-[var(--color-primary-deep)] hover:text-[var(--color-primary)] transition-colors border-r lg:border-r-0 lg:border-b border-[var(--color-primary-deep)]/10 group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button 
                  onClick={next} 
                  className="flex-1 flex items-center justify-center bg-white hover:bg-slate-50 text-[var(--color-primary-deep)] hover:text-[var(--color-primary)] transition-colors group"
                >
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}