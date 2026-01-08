"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Sparkles, X, Maximize2, ChevronRight, ChevronLeft } from "lucide-react"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { AnimatedBackground } from "@/shared/ui/animated-background";

const IMAGES = [
  "/images/home/hero-bg.jpg",
  "/images/home/hero-bg2.jpg",
  "/images/home/hero-bg3.jpg",
  "/images/home/hero-bg4.jpg"
];

export function AboutHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24 px-4 relative z-10 overflow-hidden bg-[#fffbf7]">
        
        {/* FIX 1: Hintergrund Icons isolieren. 
          Wir nutzen ein div mit "isolate", um sicherzustellen, dass dieser 
          AnimatedBackground keine Context-Werte von außerhalb (wie Herzen) annimmt.
        */}
        <div className="absolute inset-0 pointer-events-none -z-10 isolate">
             <AnimatedBackground 
                icon={Sparkles} 
                variant="section" 
                color="text-[var(--color-primary)]" 
                count={12}
             />
             {/* Zusätzliches Dot-Pattern für Tiefe */}
             <div className="absolute inset-0 opacity-[0.2]" 
                  style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto flex flex-col items-center relative z-10">
          
          {/* 1. DAS BADGE */}
          <FadeIn delay={0.1} className="w-full flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 lg:mb-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-center text-orange-500"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </motion.div>
              <span>Unsere Philosophie</span>
            </div>
          </FadeIn>

          {/* FIX 2: H1 Design-Schema 
            Text-Farbe: slate-900 (fast Schwarz)
            Highlight: Brand-Teal (color-primary) + Script-Font + Welle
          */}
          <FadeIn delay={0.2}>
            <h1 className="text-center text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-12 tracking-tight leading-[1.05] drop-shadow-sm max-w-5xl text-balance">
              Menschlichkeit ist unser <br/>
              <span className="relative inline-block mt-2 lg:mt-4">
                  <span className="relative z-10 text-[var(--color-primary)] italic font-script tracking-normal px-2">
                      höchstes Gut.
                  </span>
                  {/* Die orangefarbene Welle aus dem Home-Design */}
                  <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
              </span>
            </h1>
          </FadeIn>

          {/* 2. DER KARTEN-STAPEL CONTAINER */}
          <FadeIn delay={0.3} className="relative w-full max-w-6xl mx-auto h-[500px] lg:h-[700px]">
             {/* Dekorative Schatten-Karten (Stapel-Effekt) */}
             <div className="absolute inset-0 bg-orange-50/50 rounded-[3.5rem] rotate-2 scale-[1.02] border-4 border-white shadow-xl -z-10 opacity-60" />
             <div className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-[3.5rem] -rotate-2 scale-[1.01] border-4 border-white shadow-lg -z-20 opacity-40" />

             <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white transform-gpu bg-slate-100 group">
                <div className="absolute inset-0 cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`hero-img-${currentImageIndex}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className="absolute inset-0"
                        >
                            <Image src={IMAGES[currentImageIndex]} alt="Impression" fill className="object-cover" priority />
                        </motion.div>
                    </AnimatePresence>
                    {/* Dalas Brand Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 lg:p-16 pointer-events-none z-10">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-xl font-medium">
                        Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
                        Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.
                    </p>
                </div>

                <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-2xl shadow-lg transition-transform active:scale-95 pointer-events-auto">
                        <Maximize2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-none">
                    {IMAGES.map((_, idx) => (
                        <button 
                            key={idx}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500 shadow-sm pointer-events-auto",
                                idx === currentImageIndex ? "bg-[var(--color-accent)] w-12" : "bg-white/50 w-2 hover:bg-white"
                            )} 
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        />
                    ))}
                </div>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* FULLSCREEN MODAL (unverändert funktional) */}
      {/* ... */}
    </>
  );
}