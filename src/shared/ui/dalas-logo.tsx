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
  const tealColor = variant === "default" ? "var(--color-primary, #005852)" : "#ffffff"; 
  const orangeColor = "var(--color-accent, #E8833A)";
  const textColor = variant === "default" ? "text-[var(--color-primary-deep)]" : "text-white";
  const subTextColor = variant === "default" ? "text-slate-500" : "text-slate-300";

  return (
    <div 
      // whitespace-nowrap verhindert, dass der Text jemals umbricht
      className={cn("flex items-center gap-3 select-none whitespace-nowrap", className)} 
      {...props}
    >
      <style jsx>{`
        @keyframes house-entry {
          0% { opacity: 0; transform: translateX(10px) scale(0.6); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-house-entry {
          animation: house-entry 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
          transform-box: fill-box;
        }
        .icon-group {
          transition: transform 0.5s ease;
          transform-origin: 16px 26px; 
        }
        .icon-group.is-scrolled {
          transform: scale(0.9);
        }
        .arch-path {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: 16px 26px; 
        }
        .arch-path.is-rotated {
          transform: rotate(-90deg); 
        }
      `}</style>

      {/* 1. DAS ICON */}
      <div className="shrink-0 w-[22%] max-w-[60px] min-w-[40px]">
        <svg
          viewBox="0 0 32 52" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
            <path 
              d="M 16 8 A 18 18 0 0 0 16 44" 
              stroke={tealColor} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              className={cn("arch-path", scrolled && "is-rotated")}
            />
            <path 
              d="M16 19 L23 25 V33 H9 V25 L16 19 Z" 
              fill={orangeColor} 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
              className={cn("animate-house-entry icon-group", scrolled && "is-scrolled")}
            />
        </svg>
      </div>

      {/* 2. DER TEXT */}
      <div className="flex flex-col justify-center leading-none ml-[10px]">
        
        {/* HAUPTZEILE: DALAS UG */}
        {/* font-bold (statt extrabold) für Eleganz */}
        {/* tracking-tight entfernt, damit die Buchstaben atmen */}
        <span className={cn("font-bold text-[1.8em] leading-[.95]", textColor)}>
          DALAS UG
        </span>
        
        {/* UNTERZEILE: Pflegedienst */}
        {/* tracking-[0.2em] (sehr breit) für den modernen Look */}
        <span className={cn("font-semibold uppercase tracking-[0.2em] text-[0.58em] mt-1.5 ml-0.5", subTextColor)}>
          Pflegedienst Frankfurt
        </span>
        
      </div>

    </div>
  );
}