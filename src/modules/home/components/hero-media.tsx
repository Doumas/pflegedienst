"use client";

import { motion } from "framer-motion";

const Marker = ({ className }: { className?: string }) => (
  <div className={`crosshair-marker ${className}`} aria-hidden="true" />
);

export function HeroMedia() {
  return (
    <div className="relative w-full h-full min-h-[450px] lg:min-h-full">
      
      {/* --- 1. GROSSES VIDEO (Rechts im Grid) --- */}
      <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden bg-slate-200">
         <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/Fürsorgliche_Pflege_für_Senioren.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-[var(--color-primary-deep)]/10 mix-blend-multiply pointer-events-none" />
          
          <Marker className="top-6 left-6 text-white mix-blend-difference opacity-70" />
          <Marker className="top-6 right-6 text-white mix-blend-difference opacity-70" />
      </div>

      {/* --- 2. KLEINES VIDEO (Der Overlap) --- */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="
            absolute z-20 shadow-2xl overflow-hidden
            border-[8px] lg:border-[12px] border-[var(--color-secondary)]
            
            /* MOBILE: Unten links, ganz normal */
            bottom-4 left-4 w-[45%] aspect-square
            
            /* DESKTOP (Hunter Style): Ragt nach links raus! */
            /* -left-[15%] schiebt es nach links in die Textspalte */
            lg:bottom-12 lg:-left-[15%] lg:w-[55%]
        "
      >
          <div className="relative w-full h-full bg-slate-100">
             <video
                className="w-full h-full object-cover scale-110"
                autoPlay
                muted
                loop
                playsInline
             >
                <source src="/videos/Patient_im_Rollstuhl_im_Park.mp4" type="video/mp4" />
             </video>
          </div>
          
          <Marker className="top-0 left-0 text-[var(--color-primary)]" />
          <Marker className="bottom-0 right-0 text-[var(--color-primary)]" />
      </motion.div>
    </div>
  );
}