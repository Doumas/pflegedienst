import React from 'react';
import { cn } from "@/shared/utils/cn";

interface DalasLogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  scrolled?: boolean;
  variant?: "default" | "light"; 
}

export const DalasLogo: React.FC<DalasLogoProps> = ({ 
  width, 
  height = "auto", 
  className,
  scrolled = false, 
  variant = "default",
  ...props 
}) => {
  const tealColor = variant === "default" ? "var(--color-primary, #005852)" : "#ffffff"; 
  const orangeColor = "var(--color-accent, #E8833A)";
  const textColor = variant === "default" ? "var(--color-primary-deep, #0f172a)" : "#ffffff";
  const subTextColor = variant === "default" ? "#475569" : "#cbd5e1"; 

  return (
    <>
      <style jsx>{`
        /* Animation für das Haus beim Laden */
        @keyframes house-entry {
          0% { opacity: 0; transform: translateX(15px) scale(0.6); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-house-entry {
          animation: house-entry 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
          transform-box: fill-box;
        }

        /* 1. BOGEN ANIMATION (Drehung) */
        .arch-path {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: 16px 26px; /* Exaktes Zentrum der Rotation */
        }
        .arch-path.is-rotated {
          /* Dreht sich um 90 Grad gegen den Uhrzeigersinn -> wird zum "Dach" */
          transform: rotate(-90deg); 
        }

        /* 2. HAUS ANIMATION (Bleibt stehen, kleiner Zoom) */
        .house-path {
          transition: transform 0.5s ease;
          transform-origin: 16px 26px;
        }
        .house-path.is-adjusted {
          transform: scale(0.9);
        }

        /* 3. TEXT ANIMATIONEN */
        .text-main {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .text-main.is-centered {
          transform: translateY(7px); /* Rutscht in die Mitte */
        }

        .text-sub {
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform-origin: center;
        }
        .text-sub.is-hidden {
          opacity: 0;
          transform: translateY(-5px);
          pointer-events: none;
        }
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 60" 
        width={width}
        height={height}
        fill="none"
        className={className}
        aria-label="DALAS Logo"
        {...props}
      >
        <g transform="translate(5, 5)">
          
          {/* ICON GRUPPE (Elemente getrennt für individuelle Rotation) */}
          <g>
              {/* Der Bogen: Bekommt die Klasse .arch-path für die Drehung */}
              <path 
                d="M 16 8 A 18 18 0 0 0 16 44" 
                stroke={tealColor} 
                strokeWidth="5" 
                strokeLinecap="round" 
                className={cn("arch-path", scrolled && "is-rotated")}
              />
              
              {/* Das Haus: Bleibt aufrecht, bekommt nur leichte Skalierung */}
              <path 
                d="M16 19 L23 25 V33 H9 V25 L16 19 Z" 
                fill={orangeColor} 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
                className={cn("animate-house-entry house-path", scrolled && "is-adjusted")}
              />
          </g>

          {/* TEXT GRUPPE */}
          <g transform="translate(42, 0)">
            <text 
              x="0" 
              y="32" 
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
              fontWeight="900" 
              fontSize="34" 
              fill={textColor} 
              style={{ letterSpacing: '-0.5px' }}
              className={cn("text-main", scrolled && "is-centered")}
            >
              DALAS
            </text>

            <text 
              x="2" 
              y="46" 
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
              fontWeight="700" 
              fontSize="9.5" 
              fill={subTextColor} 
              style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
              className={cn("text-sub", scrolled && "is-hidden")}
            >
              Ambulanter Intensivpflegedienst
            </text>
          </g>
        </g>
      </svg>
    </>
  );
}