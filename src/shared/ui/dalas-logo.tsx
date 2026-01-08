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
  // Farben
  const tealColor = variant === "default" ? "#009B77" : "#ffffff"; 
  const orangeColor = "#F27405";
  
  // Textfarben Logik:
  // Dalas = Teal (im Default)
  const dalasColor = variant === "default" ? "text-[#009B77]" : "text-white"; 
  // UG = Schwarz (im Default), Weiß (im Light Mode)
  const ugColor = variant === "default" ? "text-slate-900" : "text-white/90";
  // Slogan = Grau
  const subTextColor = variant === "default" ? "text-slate-500" : "text-slate-300";

  return (
    <div 
      className={cn("flex flex-col items-center select-none leading-none", className)} 
      {...props}
    >
      {/* OBERE ZEILE: Icon + Dalas + UG */}
      <div className="flex items-center gap-3 mb-1"> 
        
        {/* 1. DAS ICON */}
        <div className="shrink-0 h-10 w-10 flex items-center justify-center pb-1">
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="overflow-visible"
          >
              <path
                d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z"
                stroke={tealColor}
                className={cn("transition-all duration-700", scrolled ? "opacity-100" : "opacity-90")}
              />
              <path
                d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z"
                stroke={orangeColor}
                fill={scrolled ? orangeColor : "none"}
                className="transition-all duration-500 delay-100"
                transform="translate(0, 1.5)"
              />
          </svg>
        </div>

        {/* 2. TEXT-GRUPPE */}
        <div className="flex items-baseline gap-2">
            
            {/* A. Dalas (Teal, Schreibschrift) */}
            <span 
              className={cn("text-[2.8rem] leading-none", dalasColor)}
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              Dalas
            </span>

            {/* B. UG (Schwarz, Sans Serif) */}
            <span className={cn("text-lg font-sans font-bold opacity-90 uppercase tracking-widest translate-y-[-2px]", ugColor)}>
              UG
            </span>

        </div>

      </div>

      {/* UNTERE ZEILE: SLOGAN */}
      <span className={cn("font-sans font-semibold uppercase tracking-[0.01em] text-[.6rem] text-center w-full mt-0", subTextColor)}>
        Ambulanter Pflegedienst
      </span>

    </div>
  );
}