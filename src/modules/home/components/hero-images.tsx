"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Marker = ({ className }: { className?: string }) => (
  <div className={`crosshair-marker ${className}`} />
);

export function HeroImages() {
  return (
    <div className="relative w-full h-full min-h-[450px] lg:min-h-[600px]">
      {/* 1. HAUPTBILD (Groß, Rechts) */}
      <div className="absolute top-0 right-0 w-[85%] h-[85%] bg-slate-200 overflow-hidden">
          <Image 
            src="/images/home/hero-bg.jpg" // Ein festes, starkes Hauptbild
            alt="Pflegekraft im Gespräch" 
            fill 
            className="object-cover" 
            priority 
          />
          {/* Marker direkt auf dem Bildrand */}
          <Marker className="top-0 left-0 text-white mix-blend-difference" />
          <Marker className="top-0 right-0 text-white mix-blend-difference" />
          <Marker className="bottom-0 right-0 text-white mix-blend-difference" />
      </div>

      {/* 2. SEKUNDÄRBILD (Klein, Links Unten, Überlappend) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 left-0 w-[45%] aspect-square z-10 shadow-2xl"
      >
          <div className="relative w-full h-full bg-slate-100">
              <Image 
                src="/images/home/hero-person.png" // Ein festes Detailbild
                alt="Detailansicht" 
                fill 
                className="object-cover object-top" 
              />
          </div>
          {/* Marker */}
          <Marker className="top-0 left-0 text-[var(--color-primary)]" />
          <Marker className="top-0 right-0 text-[var(--color-primary)]" />
          <Marker className="bottom-0 left-0 text-[var(--color-primary)]" />
          <Marker className="bottom-0 right-0 text-[var(--color-primary)]" />
      </motion.div>
    </div>
  );
}