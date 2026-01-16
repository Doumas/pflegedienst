"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as LinkArrow } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";

// Deine existierenden Komponenten
import { HeroVideos } from "../components/hero-videos"; 
import { HeroTextSlider } from "../components/hero-text-slider";

// --- ORGANIC BLOB ---
const OrganicBlob = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-8.3C81.5,3.8,70.2,13.7,60.8,22.5C51.4,31.3,43.9,39,35.2,45.8C26.5,52.6,16.6,58.5,5.6,60.3C-5.4,62.1,-17.5,59.8,-28.3,53.8C-39.1,47.8,-48.6,38.1,-56.3,27.1C-64,16.1,-69.9,3.8,-70.5,-9.1C-71.1,-22,-66.4,-35.5,-56.9,-44.7C-47.4,-53.9,-33.1,-58.8,-19.5,-66.4C-5.9,-74,7,-84.3,19.3,-84.3C31.6,-84.3,43.3,-74,55,-63.5Z" transform="translate(100 100)" />
  </svg>
);

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
    <section className="relative w-full pt-32 lg:pt-40 bg-white overflow-hidden flex flex-col justify-between min-h-screen">
      
      <div className="container mx-auto px-6 relative z-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-start">
          
          {/* LINKS: Content */}
          <div className="flex flex-col relative z-20 pt-8 lg:pt-12">
            
            {/* Background Blob (Creme) */}
            <div className="absolute -top-20 -left-20 w-[140%] h-[140%] z-[-1] opacity-60 pointer-events-none">
                 <OrganicBlob className="w-full h-full text-[var(--color-secondary)]" />
            </div>

            <Marker className="-left-4 top-0" />
            
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.0] tracking-tight text-[var(--color-text-main)] mb-8 relative">
                Sicherheit und Geborgenheit <span className="text-[var(--color-primary)]">Zuhause</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
                      <p className="text-slate-600  leading-relaxed mb-8 max-w-sm">
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

          {/* RECHTS: Video Component (Desktop) */}
          <div className="relative w-full h-full hidden lg:block text-[var(--color-primary-deep)]">
             
             {/* HIER IST DER FIX: Das Raster ist jetzt ein eigener Layer im Hintergrund */}
             {/* Es hat opacity-15, aber der Inhalt darüber (Videos) bleibt bei 100% */}
             <div className="absolute inset-0 bg-pattern-cross-dots opacity-15 pointer-events-none" />

             <Marker className="-top-4 -left-4" />
             
             {/* Wrapper z-10 damit Videos über dem Raster liegen */}
             <div className="relative z-10 h-full">
                <HeroVideos />
             </div>
          </div>
          
          {/* Mobile Fallback */}
          <div className="lg:hidden w-full h-[350px] relative mt-8 text-[var(--color-primary-deep)]">
             
             {/* HIER EBENFALLS FIX: Separater Layer für das Raster */}
             <div className="absolute inset-0 bg-pattern-cross-dots opacity-15 pointer-events-none" />

             {/* Wrapper z-10 */}
             <div className="relative z-10 h-full">
                <HeroVideos />
             </div>
          </div>
        </div>
      </div>

      {/* 2. TEXT-SLIDER BEREICH */}
      <div className="w-full border-t border-[var(--color-primary-deep)]/10 mt-16 lg:mt-0 bg-white relative z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row h-auto lg:h-48">
            <div className="flex-1 py-8 lg:py-0 border-r border-[var(--color-primary-deep)]/10 lg:border-none overflow-hidden">
                <HeroTextSlider slides={TEXT_SLIDES} current={current} />
            </div>
            <div className="flex lg:flex-col border-t lg:border-t-0 lg:border-l border-[var(--color-primary-deep)]/10 h-16 lg:h-auto w-full lg:w-24 shrink-0">
                
                {/* BUTTONS */}
                <button 
                  onClick={prev} 
                  className="flex-1 flex items-center justify-center bg-white hover:bg-white hover:text-[var(--color-primary)] transition-colors border-r lg:border-r-0 lg:border-b border-[var(--color-primary-deep)]/10 group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                
                <button 
                  onClick={next} 
                  className="flex-1 flex items-center justify-center bg-white hover:bg-white hover:text-[var(--color-primary)] transition-colors group"
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