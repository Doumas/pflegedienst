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
  // 1. FARB-LOGIK (Jetzt synchron mit CSS-Variablen & Bild 2)
  
  // Hauptfarbe (Haus): Zurück zu Türkis (Primary), wie im Referenz-Bild
  // Wir nutzen var(--color-primary) statt Hex-Codes
  const mainColor = variant === "default" ? "var(--color-primary)" : "#ffffff"; 
  
  // Akzentfarbe (Herz): Orange (Accent), passend zur "Zuhause leben" Unterstreichung
  const accentColor = "var(--color-accent)";
  
  // 2. TEXT-FARBEN
  // Dalas Text: Ich lasse es auf Slate-900 (Schwarz), das wirkt am edelsten.
  // Falls du es Türkis willst wie im Bild, ändere es zu: "text-[var(--color-primary)]"
  const dalasColor = variant === "default" ? "text-slate-900" : "text-white"; 
  
  const ugColor = variant === "default" ? "text-slate-900" : "text-white/90";
  const subTextColor = variant === "default" ? "text-slate-500" : "text-slate-300";

  return (
    <div 
      className={cn("flex items-center gap-3 select-none group", className)} 
      {...props}
    >
       <style jsx>{`
        @keyframes heart-pop-logo {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-heart-badge {
          animation: heart-pop-logo 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
          opacity: 0;
        }
      `}</style>

      {/* 1. DAS ICON */}
      <div className={cn(
          "relative w-11 h-11 shrink-0 transition-transform duration-500",
          scrolled ? "scale-90" : "scale-100"
      )}>
        {/* Haus: Jetzt Primary (Türkis) */}
        <Home 
            className="w-full h-full stroke-[1.5]"
            style={{ stroke: mainColor }}
        />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100 animate-heart-badge">
            {/* Herz: Jetzt Accent (Orange) */}
            <Heart 
                className="w-3.5 h-3.5 fill-current" 
                style={{ color: accentColor }}
            />
        </div>
      </div>

      {/* 2. DER TEXT */}
      <div className="flex flex-col justify-center leading-none">
        
        {/* Titel Zeile */}
        <div className="flex items-baseline gap-2">
            
            {/* Dalas in Script-Schrift (Schwarz) */}
            <span 
              className={cn("text-[2rem] leading-none font-script font-bold", dalasColor)}
            >
              Dalas
            </span>

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