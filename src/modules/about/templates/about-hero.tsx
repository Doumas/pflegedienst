"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Sparkles, Maximize2 } from "lucide-react"; 
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

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24 px-4 relative z-10 overflow-hidden bg-[#fffbf7]">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none -z-10 isolate">
             <AnimatedBackground 
                icon={Sparkles} 
                variant="section" 
                color="text-[var(--color-primary)]" 
                count={12}
             />
             <div className="absolute inset-0 opacity-[0.3]" 
                  style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto flex flex-col items-center relative z-10">
          
          {/* 1. BADGE */}
          <FadeIn delay={0.1} className="w-full flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary-deep)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 lg:mb-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-center text-[var(--color-accent)]"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </motion.div>
              <span>Unsere Philosophie</span>
            </div>
          </FadeIn>

          {/* 2. HEADLINE (Zentriert & Design angepasst) */}
          <FadeIn delay={0.2} className="w-full">
            <h1 className="text-center text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-12 tracking-tight leading-[1.05] drop-shadow-sm max-w-5xl mx-auto text-balance">
              Menschlichkeit ist unser <br/>
              <span className="relative inline-block px-2 mt-2 lg:mt-4">
                  {/* UPDATE: Jetzt Orange & Script Font (wie im Hero) */}
                  <span className="relative z-10 text-[var(--color-accent)] font-script font-bold tracking-normal text-[1.1em]">
                      höchstes Gut.
                  </span>
                  {/* Welle in Orange */}
                  <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
              </span>
            </h1>
          </FadeIn>

          {/* 3. KARTEN-STAPEL */}
          <FadeIn delay={0.3} className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] lg:h-[650px]">
             {/* Dekorative Schatten-Karten */}
             <div className="absolute inset-0 bg-[var(--color-accent-soft)] rounded-[3.5rem] rotate-2 scale-[1.02] border-4 border-white shadow-xl -z-10 opacity-80" />
             <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-[3.5rem] -rotate-2 scale-[1.01] border-4 border-white shadow-lg -z-20 opacity-60" />

             {/* Hauptkarte */}
             <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[6px] border-white transform-gpu bg-slate-100 group z-10">
                <div className="absolute inset-0 cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`hero-img-${currentImageIndex}`}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className="absolute inset-0"
                        >
                            <Image 
                                src={IMAGES[currentImageIndex]} 
                                alt="Dalas Pflege Impression" 
                                fill 
                                className="object-cover" 
                                priority 
                            />
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Overlay für Textlesbarkeit */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                </div>

                {/* Text auf dem Bild */}
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 lg:p-16 pointer-events-none z-20 pb-20">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-xl">
                        &quot;Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
                        Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.&quot;
                    </p>
                </div>

                <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }} className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-transform active:scale-95 pointer-events-auto cursor-pointer">
                        <Maximize2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30 pointer-events-auto">
                    {IMAGES.map((_, idx) => (
                        <button 
                            key={idx}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500 shadow-sm",
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
      
      {/* Fullscreen Modal Logic hier einfügen falls separat benötigt, oder global lösen */}
    </>
  );
}