"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Heart, X, Maximize2, ChevronRight, ChevronLeft } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

// Bilder aus deinem existierenden public/images/home Ordner
const IMAGES = [
  "/images/home/hero-bg.jpg",
  "/images/home/hero-bg2.jpg",
  "/images/home/hero-bg3.jpg",
  "/images/home/hero-bg4.jpg"
];

export function AboutHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-Play Slider
  useEffect(() => {
    if (isFullscreen) return; 

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isFullscreen]);

  // Navigation Helper
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-32 px-4 relative z-10">
        <div className="container mx-auto flex flex-col items-center">
          
          {/* --- TEIL 1: TEXT & HEADLINE (ZENTRIERT OBEN DRÜBER) --- */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              
              {/* 1. ICON BADGE */}
              <FadeIn delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8">
                    <Heart className="w-3 h-3 text-[var(--color-accent)] fill-current" />
                    <span>Über uns</span>
                  </div>
              </FadeIn>
              
              {/* 2. HEADLINE */}
              <FadeIn delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance">
                  Pflege bedeutet <br/>
                  <span className="relative inline-block ml-3"> 
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                      Vertrauen.
                      </span>
                      {/* Dekorative Welle */}
                      <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                  </span>
                  </h1>
              </FadeIn>
              
              {/* 3. FLIESSTEXT */}
              <FadeIn delay={0.3}>
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                  Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
                  Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.
                  </p>
              </FadeIn>
          </div>

          {/* --- TEIL 2: BILD SLIDER (ZENTRIERT DARUNTER) --- */}
          <FadeIn delay={0.4} className="relative w-full max-w-[800px] mx-auto"> {/* Max-Width erhöht für bessere Präsenz */}
             <div 
                className="relative group perspective-1000 cursor-zoom-in"
                onClick={() => setIsFullscreen(true)}
             >
                {/* Hintergrund Blob */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-secondary)] to-[var(--color-primary)]/30 rounded-[3rem] -rotate-3 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out will-change-transform" />

                {/* Bild Rahmen */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[var(--color-primary)]/20 border-4 border-white aspect-video transform-gpu group-hover:scale-[1.01] transition-transform duration-700 bg-slate-100">
                  
                  {/* Slider Transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={IMAGES[currentImageIndex]} 
                            alt={`Dalas Pflege Impression ${currentImageIndex + 1}`}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                  </AnimatePresence>

                   {/* Hover Overlay & Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-lg">
                      <Maximize2 className="w-8 h-8" />
                  </div>

                  {/* Indikatoren */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {IMAGES.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm",
                                idx === currentImageIndex ? "bg-white w-8" : "bg-white/40 w-2"
                            )} 
                          />
                      ))}
                  </div>

                </div>
             </div>
          </FadeIn>

        </div>
      </section>

      {/* --- FULLSCREEN LIGHTBOX --- */}
      <AnimatePresence>
        {isFullscreen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                onClick={() => setIsFullscreen(false)}
            >
                <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50">
                    <X className="w-8 h-8" />
                </button>

                <button onClick={prevImage} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 md:p-4 rounded-full transition-all z-50">
                    <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                </button>
                <button onClick={nextImage} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 md:p-4 rounded-full transition-all z-50">
                    <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                </button>

                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full h-full max-w-7xl max-h-[85vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full"
                        >
                             <Image
                                src={IMAGES[currentImageIndex]} 
                                alt="Fullscreen Ansicht"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
                    {currentImageIndex + 1} / {IMAGES.length}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 