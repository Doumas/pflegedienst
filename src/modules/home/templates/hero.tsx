"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as LinkArrow } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";

// Importiere die Komponenten
import { HeroImages } from "../components/hero-images";
import { HeroTextSlider } from "../components/hero-text-slider";

// --- 10 PASSENDE SLIDES FÜR DALAS PFLEGEDIENST ---
const TEXT_SLIDES = [
  { 
    id: 1, 
    label: "Persönliche Nähe",
    description: "Wir nehmen uns Zeit für echte Begegnungen und hören zu."
  },
  { 
    id: 2, 
    label: "Fachkompetenz",
    description: "Stetige Fortbildung für medizinische Versorgung auf höchstem Niveau."
  },
  { 
    id: 3, 
    label: "24/7 Erreichbarkeit",
    description: "Sicherheit rund um die Uhr. Wir sind immer für Sie da."
  },
  { 
    id: 4, 
    label: "Pflegeberatung",
    description: "Wir helfen bei Anträgen und klären Pflegegrad-Fragen kostenlos."
  },
  { 
    id: 5, 
    label: "Grundpflege",
    description: "Unterstützung bei der Körperpflege, Ernährung und Mobilität."
  },
  { 
    id: 6, 
    label: "Behandlungspflege",
    description: "Medikamentengabe, Wundversorgung und Injektionen nach Plan."
  },
  { 
    id: 7, 
    label: "Hauswirtschaft",
    description: "Unterstützung im Haushalt, beim Einkauf und Kochen."
  },
  { 
    id: 8, 
    label: "Verhinderungspflege",
    description: "Wir springen ein, wenn pflegende Angehörige eine Auszeit brauchen."
  },
  { 
    id: 9, 
    label: "Palliativpflege",
    description: "Würdevolle Begleitung in der letzten Lebensphase."
  },
  { 
    id: 10, 
    label: "Betreuungsleistung",
    description: "Spaziergänge, Gespräche und Begleitung im Alltag."
  }
];

const Marker = ({ className }: { className?: string }) => (
  <div className={`crosshair-marker ${className}`} aria-hidden="true" />
);

export function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-Play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % TEXT_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % TEXT_SLIDES.length);
  // Modulo-Logik für Rückwärts-Navigation korrigiert
  const prev = () => setCurrent((p) => (p - 1 + TEXT_SLIDES.length) % TEXT_SLIDES.length);

  return (
    <section className="relative w-full pt-32 lg:pt-40 bg-[var(--color-secondary)] overflow-hidden flex flex-col justify-between min-h-screen">
      
      {/* 1. HAUPTBEREICH (Oben) */}
      <div className="container mx-auto px-6 relative flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-start">
          
          {/* LINKS: Content */}
          <div className="flex flex-col relative z-20 pt-8 lg:pt-12">
            <Marker className="-left-4 top-0" />
            
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-semibold leading-[1.0] tracking-tight text-[var(--color-text-main)] mb-8">
                Wir stellen den Menschen in das <br />
                <span className="text-[var(--color-primary)]">Zentrum</span> der Pflege.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mb-10">
                Pflege neu gedacht: Weg von der Bürokratie, hin zur echten Begegnung. 
                Wir verbinden professionelle Versorgung in Frankfurt mit menschlicher Nähe.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link 
                href="/pflegekraft-finden" 
                className="group inline-flex items-center gap-2 text-lg font-bold text-[var(--color-text-main)] hover:text-[var(--color-primary)] transition-colors"
              >
                 <span>Unsere Leistungen entdecken</span>
                 <LinkArrow className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </FadeIn>
          </div>

          {/* RECHTS: Bilder (Statisch) */}
          <div className="relative w-full h-full hidden lg:block">
             <Marker className="-top-4 -left-4" />
             <HeroImages />
          </div>
          
          {/* Mobile Fallback Image */}
          <div className="lg:hidden w-full h-[350px] relative mt-8">
             <HeroImages />
          </div>
        </div>
      </div>

      {/* 2. TEXT-SLIDER BEREICH (Unten - Multi Column) */}
      <div className="w-full border-t border-[var(--color-primary-deep)]/10 mt-16 lg:mt-0 bg-[var(--color-secondary)] relative z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row h-auto lg:h-48">
            
            {/* DER SLIDER (Nimmt den meisten Platz ein) */}
            <div className="flex-1 py-8 lg:py-0 border-r border-[var(--color-primary-deep)]/10 lg:border-none overflow-hidden">
                <HeroTextSlider slides={TEXT_SLIDES} current={current} />
            </div>

            {/* CONTROLS (Rechts angedockt) */}
            <div className="flex lg:flex-col border-t lg:border-t-0 lg:border-l border-[var(--color-primary-deep)]/10 h-16 lg:h-auto w-full lg:w-24 shrink-0">
                <button 
                    onClick={prev} 
                    className="flex-1 flex items-center justify-center hover:bg-white hover:text-[var(--color-primary)] transition-colors border-r lg:border-r-0 lg:border-b border-[var(--color-primary-deep)]/10 group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button 
                    onClick={next} 
                    className="flex-1 flex items-center justify-center hover:bg-white hover:text-[var(--color-primary)] transition-colors group"
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