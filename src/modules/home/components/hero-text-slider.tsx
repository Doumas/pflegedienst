"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  id: number;
  label: string;
  description: string;
}

interface HeroTextSliderProps {
  slides: SlideData[];
  current: number;
}

export function HeroTextSlider({ slides, current }: HeroTextSliderProps) {
  
  // Berechnet die 3 sichtbaren Slides
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (current + i) % slides.length;
      visible.push(slides[index]);
    }
    return visible;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="h-full flex items-center w-full">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 h-full">
        
        <AnimatePresence mode="popLayout">
          {visibleSlides.map((slide, index) => {
            
            // LOGIK: Das erste Element (Index 0) ist das aktive "Fokus"-Element
            const isActive = index === 0;

            return (
              <motion.div
                key={`${slide.id}-${index}`} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} 
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`
                  relative flex flex-col justify-center 
                  px-8 lg:px-10 
                  h-full 
                  border-r border-[var(--color-primary-deep)]/10 
                  transition-colors duration-500
                  
                  /* HIER DIE ÄNDERUNG: pt-8 für Mobile Abstand, lg:pt-0 für Desktop */
                  pt-8 lg:pt-0

                  ${index === 0 ? "flex" : "hidden lg:flex"} 
                `}
              >
                
                {/* --- AUTOMATIC PROGRESS BAR --- */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--color-primary-deep)]/10">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-[var(--color-primary)]"
                    />
                  </div>
                )}

                <div className="flex items-baseline gap-3 mb-4">
                  <span className={`text-xs font-bold transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-primary-deep)]/40"}`}>
                    {slide.id < 10 ? `0${slide.id}` : slide.id}
                  </span>
                  {/* Linie färbt sich ein, wenn aktiv */}
                  <span className={`h-px w-8 transition-colors ${isActive ? "bg-[var(--color-primary)]" : "bg-[var(--color-primary-deep)]/20"}`} />
                </div>
                
                <h4 className="text-xl font-bold text-[var(--color-primary-deep)] mb-3 leading-tight tracking-tight">
                  {slide.label}
                </h4>
                
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {slide.description}
                </p>

              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>
    </div>
  );
}