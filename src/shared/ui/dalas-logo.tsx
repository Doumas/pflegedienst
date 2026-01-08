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
  // Farben definieren
  const tealColor = variant === "default" ? "#009B77" : "#ffffff"; 
  const orangeColor = "#F27405";
  
  // Textfarben
  const dalasColor = variant === "default" ? "text-[#009B77]" : "text-white"; 
  const ugColor = variant === "default" ? "text-slate-900" : "text-white/90";
  const subTextColor = variant === "default" ? "text-slate-700" : "text-slate-300";

  // Ein sauberer Herz-Pfad
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <div 
      className={cn("flex flex-col items-center select-none leading-none", className)} 
      {...props}
    >
      {/* OBERE ZEILE: Icon + Dalas + UG */}
      <div className="flex items-center gap-3 mb-1"> 
        
        {/* DAS ICON: Zwei saubere Herzen ohne "Cut-Out" Artefakte */}
        <div className="shrink-0 h-11 w-11 flex items-center justify-center relative">
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
              {/* Wir verzichten hier auf den weißen 'Stroke', damit es nicht verhackt aussieht. 
                  Stattdessen einfach sauberes Layering. */}
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

        {/* TEXT-GRUPPE (Wiederhergestellt) */}
        <div className="flex items-baseline gap-2 translate-y-1">
            
            {/* Dalas in Script-Schrift */}
            <span 
              className={cn("text-[2.6rem] leading-none", dalasColor)}
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 500 }}
            >
              Dalas
            </span>

            {/* UG in Sans-Serif */}
            <span className={cn("text-lg font-sans font-bold opacity-90 uppercase tracking-widest", ugColor)}>
              
            </span>

        </div>

      </div>

      {/* UNTERE ZEILE: SLOGAN */}
      <span className={cn("font-sans font-semibold uppercase tracking-[0.05em] text-[.6rem] text-center w-full pl-10", subTextColor)}>
        Ambulanter Pflegedienst
      </span>

    </div>
  );
}