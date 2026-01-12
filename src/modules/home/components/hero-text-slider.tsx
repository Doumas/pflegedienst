"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/shared/hooks/use-media-query"; 
// Falls du keinen Hook hast, nutze ich eine einfache CSS-Lösung oder Logik unten.
// Ich baue es hier robust ohne Hook, indem ich CSS Grid nutze.

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
  
  // Wir berechnen die 3 sichtbaren Slides für den Desktop
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
              exit={{ opacity: 0, x: -20 }} // Optional: Ausblend-Animation
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              // STYLING:
              // Mobile: Nur der erste (index 0) ist sichtbar -> 'hidden lg:flex' für die anderen
              // Desktop: Alle 3 sind sichtbar
              // Border-Right: Trennlinie zwischen den Items (Hunter Style)
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