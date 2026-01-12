"use client";

import { motion, AnimatePresence } from "framer-motion";

// FEHLERBEHEBUNG: Der Import zu 'use-media-query' wurde entfernt, 
// da wir das responsive Verhalten direkt über CSS (Tailwind) lösen.

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
  
  // Wir berechnen die 3 theoretisch sichtbaren Slides für den Desktop
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      // Modulo sorgt dafür, dass es am Ende (10) wieder bei 1 anfängt
      const index = (current + i) % slides.length;
      visible.push(slides[index]);
    }
    return visible;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="h-full flex items-center">
      {/* Container für die Grid-Ansicht */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 h-full">
        
        <AnimatePresence mode="popLayout">
          {visibleSlides.map((slide, index) => (
            <motion.div
              key={`${slide.id}-${index}`} // Unique Key für saubere Animation
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} 
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              // STYLING LOGIK:
              // Index 0 (Aktuell): Immer sichtbar ("flex")
              // Index 1 & 2 (Vorschau): Nur auf Desktop sichtbar ("hidden lg:flex")
              className={`
                flex-col justify-center px-6 lg:px-10 h-full border-r border-[var(--color-primary-deep)]/10
                ${index === 0 ? "flex" : "hidden lg:flex"} 
              `}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-[var(--color-primary-deep)]/60">
                  {slide.id < 10 ? `0${slide.id}` : slide.id}
                </span>
                {/* Kleine Linie neben der Zahl */}
                <span className="h-px w-6 bg-[var(--color-primary)]" />
              </div>
              
              <h4 className="text-lg font-bold text-[var(--color-primary-deep)] mb-2 leading-tight">
                {slide.label}
              </h4>
              
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                {slide.description}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}