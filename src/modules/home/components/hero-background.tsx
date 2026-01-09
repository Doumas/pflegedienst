"use client";

import { AnimatedBackground } from "@/shared/ui/animated-background";
import { MapPin } from "lucide-react";

export function HeroBackground() {
  return (
    <>
      {/* Statisches Hintergrundbild */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?q=80&w=2048&auto=format&fit=crop')] bg-cover bg-center opacity-[0.08] mix-blend-multiply grayscale-[20%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
      </div>

      {/* Animierte Ambulanz Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <AnimatedBackground 
            icon={MapPin} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={6} 
            className="opacity-80" 
         />
      </div>

      {/* Raster Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    </>
  );
}