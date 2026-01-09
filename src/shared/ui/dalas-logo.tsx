"use client";

import React from 'react';
import { cn } from "@/shared/utils/cn";

interface DalasLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  scrolled?: boolean;
  variant?: "default" | "light"; 
}

export const DalasLogo: React.FC<DalasLogoProps> = ({ 
  className,
  scrolled = false, 
  variant = "default",
  ...props 
}) => {
  // Farben (Exakt aus deinem Snippet)
  const tealColor = variant === "default" ? "#009B77" : "#ffffff"; 
  const orangeColor = "#F27405";
  
  // Textfarben
  const dalasColor = variant === "default" ? "text-[#009B77]" : "text-white"; 
  const ugColor = variant === "default" ? "text-slate-900" : "text-white/90";
  const subTextColor = variant === "default" ? "text-slate-500" : "text-slate-300";

  // Dein Herz-Pfad
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <div 
      // Layout: Horizontal (Icon links, Text rechts) für den Header
      className={cn("flex items-center gap-3 select-none", className)} 
      {...props}
    >
      {/* 1. DAS ICON (Zwei Herzen aus deiner Version) */}
      <div className={cn(
          "shrink-0 h-11 w-11 flex items-center justify-center relative transition-transform duration-300",
          scrolled ? "scale-90" : "scale-100"
      )}>
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
            {/* Herz 1: Türkis (Hintergrund) */}
            <g transform="translate(-2, -1) scale(0.95) rotate(-10 12 12)">
              <path
                d={heartPath}
                stroke={tealColor}
                fill="none"
                className={cn("transition-all duration-700", scrolled ? "opacity-80" : "opacity-100")}
              />
            </g>

            {/* Herz 2: Orange (Vordergrund) */}
            <g transform="translate(4, 4) scale(0.85) rotate(10 12 12)">
               <path
                d={heartPath}
                stroke={orangeColor}
                // Füllt sich beim Scrollen
                fill={scrolled ? orangeColor : "none"} 
                className="transition-all duration-500 delay-100"
              />
            </g>
        </svg>
      </div>

      {/* 2. DER TEXT (Rechts daneben) */}
      <div className="flex flex-col justify-center leading-none">
        
        {/* Titel Zeile */}
        <div className="flex items-baseline gap-2">
            {/* Dalas in Script-Schrift */}
            <span 
              className={cn("text-[2rem] leading-none", dalasColor)}
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              Dalas
            </span>

            {/* UG in Sans-Serif */}
            <span className={cn("text-sm font-sans font-bold opacity-90 uppercase tracking-widest translate-y-[-2px]", ugColor)}>
              UG
            </span>
        </div>

        {/* Slogan Zeile */}
        <span className={cn(
            "font-sans font-bold uppercase tracking-[0.15em] text-[0.6rem] mt-0.5", 
            subTextColor
        )}>
            Ambulanter Pflegedienst
        </span>

      </div>
    </div>
  );
}