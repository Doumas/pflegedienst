"use client";

import { AnimatedBackground } from "@/shared/ui/animated-background";
import { MapPin } from "lucide-react";

export function HeroBackground() {
  return (
    <>
      {/* 1. Basis-Tint (Helles Blau) */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 pointer-events-none z-0" />

      {/* 2. Statisches Hintergrundbild mit Blend-Mode */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?q=80&w=2048&auto=format&fit=crop')] bg-cover bg-center opacity-[0.06] mix-blend-multiply grayscale-[20%]" />
          
          {/* Gradient: Von Transparent zu deinem hellen Blau (statt Weiß) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-secondary)]/10 to-[var(--color-secondary)]" />
      </div>

      {/* 3. Animierte Icons (MapPins) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <AnimatedBackground 
            icon={MapPin} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={6} 
            className="opacity-40" 
         />
      </div>

      {/* 4. Raster Overlay (Passend zur Border-Farbe) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    </>
  );
}