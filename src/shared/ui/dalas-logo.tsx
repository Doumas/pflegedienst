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
  // Farben (Exakt aus deinem Snippet übernommen)
  const tealColor = variant === "default" ? "#009B77" : "#ffffff"; 
  const orangeColor = "#F27405";
  
  // Textfarben
  const dalasColor = variant === "default" ? "text-[#009B77]" : "text-white"; 
  const ugColor = variant === "default" ? "text-slate-900" : "text-white/90";
  const subTextColor = variant === "default" ? "text-slate-500" : "text-slate-300";

  return (
    <div 
      // Layout: Horizontal (Icon links, Text rechts)
      className={cn("flex items-center gap-3 select-none group", className)} 
      {...props}
    >
       <style jsx>{`
        /* Herz-Pop Animation */
        @keyframes heart-pop-logo {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-heart-badge {
          animation: heart-pop-logo 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
          opacity: 0; /* Start unsichtbar */
        }
      `}</style>

      {/* 1. DAS ICON: Haus mit Herz-Badge */}
      <div className={cn(
          "relative w-11 h-11 shrink-0 transition-transform duration-500",
          scrolled ? "scale-90" : "scale-100"
      )}>
        
        {/* Basis: Das Haus */}
        <Home 
            className="w-full h-full stroke-[1.5]"
            style={{ stroke: tealColor }}
        />
        
        {/* Badge: Das Herz (unten rechts) */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100 animate-heart-badge">
            <Heart 
                className="w-3.5 h-3.5 fill-current" 
                style={{ color: orangeColor }}
            />
        </div>
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
            "font-sans font-bold uppercase tracking-[0.15em] text-[0.6rem] mt-0.5 transition-opacity duration-300", 
            subTextColor,
            scrolled ? "opacity-90" : "opacity-100"
        )}>
            Ambulanter Pflegedienst
        </span>

      </div>
    </div>
  );
}