"use client";

import React from 'react';
import { cn } from "@/shared/utils/cn";
import { Home, Heart } from "lucide-react";

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
  // Farben definieren
  const primaryClass = variant === "default" ? "text-[var(--color-primary)]" : "text-white";
  const accentClass = "text-[var(--color-accent)]"; // Das Orange für das Herz
  const textClass = variant === "default" ? "text-[var(--color-primary-deep)]" : "text-white";
  const subTextClass = variant === "default" ? "text-slate-500" : "text-slate-300";

  return (
    <div 
      className={cn("flex items-center gap-3 select-none whitespace-nowrap group", className)} 
      {...props}
    >
      <style jsx>{`
        /* Herz-Pop Animation */
        @keyframes heart-pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-heart {
          animation: heart-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards; /* 0.5s Verzögerung */
          opacity: 0; /* Start unsichtbar */
        }
      `}</style>

      {/* 1. DAS ICON: Kombiniert aus Lucide Home + Herz */}
      <div className={cn(
          "relative w-10 h-10 shrink-0 transition-transform duration-500",
          scrolled ? "scale-90" : "scale-100"
      )}>
        
        {/* Das Haus (Basis) */}
        <Home 
            className={cn("w-full h-full stroke-[1.5]", primaryClass)} 
        />
        
        {/* Das Herz (Badge) mit Pop-Animation */}
        <div className={cn(
            "absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100",
            // Animation läuft beim Laden ab
            "animate-heart"
        )}>
            <Heart 
                className={cn("w-3.5 h-3.5 fill-current", accentClass)} 
            />
        </div>
      </div>

      {/* 2. DER TEXT (Dein bevorzugtes Layout) */}
      <div className={cn(
        "flex flex-col justify-center leading-none ml-[2px] transition-all duration-500",
        // Text rückt beim Scrollen minimal näher
        scrolled ? "-translate-x-1" : "translate-x-0"
      )}>
        
        {/* HAUPTZEILE */}
        <span className={cn("font-bold text-[1.8em] leading-[.95] transition-colors duration-300 font-sans", textClass)}>
          DALAS <span className="text-[0.6em] font-bold opacity-60 ml-0.5 align-top mt-1 inline-block">UG</span>
        </span>
        
        {/* UNTERZEILE */}
        <span className={cn(
          "font-semibold uppercase tracking-[0.2em] text-[0.58em] mt-1 ml-0.5 transition-opacity duration-300 font-sans", 
          subTextClass,
          scrolled ? "opacity-80" : "opacity-100"
        )}>
          Ambulanter Pflegedienst
        </span>
        
      </div>

    </div>
  );
}