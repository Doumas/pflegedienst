"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Heart, X, Maximize2, ChevronRight, ChevronLeft } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

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
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 relative z-10">
        <div className="container mx-auto">
          
          <FadeIn>
             <div className="relative w-full max-w-6xl mx-auto h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform-gpu bg-slate-900 group">
                
                {/* 1. IMAGE SLIDER LAYER */}
                <div 
                    className="absolute inset-0 cursor-zoom-in"
                    onClick={() => setIsFullscreen(true)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`hero-image-${currentImageIndex}`} // Stable key for TS and Framer
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={IMAGES[currentImageIndex]} 
                                alt="Dalas Pflege Atmosphäre"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* VIGNETTE OVERLAY for text readability */}
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
                </div>

                {/* 2. TEXT CONTENT LAYER (Centered Overlay) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 lg:p-12 pointer-events-none">
                    
                    <FadeIn delay={0.2}>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide uppercase shadow-lg mb-6">
                            <Heart className="w-4 h-4 text-[var(--color-accent)] fill-current" />
                            <span>Über uns</span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-xl">
                          Pflege bedeutet <br/>
                          <span className="relative inline-block">
                              <span className="relative z-10 text-[var(--color-accent)]">Vertrauen.</span>
                              <svg className="absolute w-full h-4 -bottom-2 left-0 text-white opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                              </svg>
                          </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
                          Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
                          Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.
                        </p>
                    </FadeIn>
                </div>

                {/* 3. UI CONTROLS LAYER */}
                <div className="absolute bottom-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={() => setIsFullscreen(true)}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
                    >
                        <Maximize2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {IMAGES.map((_, idx) => (
                        <button 
                            key={`nav-dot-${idx}`}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500 shadow-sm backdrop-blur-sm pointer-events-auto",
                                idx === currentImageIndex ? "bg-[var(--color-accent)] w-8" : "bg-white/50 w-2 hover:bg-white"
                            )} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(idx);
                            }}
                        />
                    ))}
                </div>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
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
                            key={`fullscreen-${currentImageIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full"
                        >
                             <Image
                                src={IMAGES[currentImageIndex]} 
                                alt="Fullscreen View"
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