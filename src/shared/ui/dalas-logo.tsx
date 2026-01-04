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
  height,
  className,
  scrolled = false, 
  variant = "default",
  ...props 
}) => {
  // Farbdefinitionen basierend auf der Variante
  const tealColor = variant === "default" ? "var(--color-primary, #005852)" : "#ffffff"; 
  const orangeColor = "var(--color-accent, #E8833A)";
  const textColor = variant === "default" ? "var(--color-primary-deep, #0f172a)" : "#ffffff";

  return (
    <>
      <style jsx>{`
        /* Icon-Animationen (bleiben erhalten) */
        @keyframes house-entry {
          0% { opacity: 0; transform: translateX(15px) scale(0.6); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-house-entry {
          animation: house-entry 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
          transform-box: fill-box;
        }
        .icon-group {
          transition: transform 0.5s ease;
          transform-origin: 16px 26px; /* Zentrum des Icons */
        }
        .icon-group.is-scrolled {
          transform: scale(0.9); /* Leichtes Verkleinern beim Scrollen */
        }
        .arch-path {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: 16px 26px; 
        }
        .arch-path.is-rotated {
          transform: rotate(-90deg); 
        }
        /* Text-Animationen wurden entfernt, da der Text jetzt statisch ist */
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        // viewBox Breite von 300 auf 230 reduziert, damit es kompakter und größer wirkt
        viewBox="0 0 230 60" 
        width={width}
        height={height}
        fill="none"
        className={className}
        aria-label="DALAS Logo"
        {...props}
      >
        {/* Gesamt-Gruppe etwas nach unten und rechts geschoben für Padding */}
        <g transform="translate(5, 5)">
          
          {/* ICON GRUPPE */}
          <g>
              {/* Der Bogen */}
              <path 
                d="M 16 8 A 18 18 0 0 0 16 44" 
                stroke={tealColor} 
                strokeWidth="5" 
                strokeLinecap="round" 
                className={cn("arch-path", scrolled && "is-rotated")}
              />
              {/* Das Haus */}
              <path 
                d="M16 19 L23 25 V33 H9 V25 L16 19 Z" 
                fill={orangeColor} 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
                className={cn("animate-house-entry icon-group", scrolled && "is-scrolled")}
              />
          </g>

          {/* TEXT GRUPPE - Positioniert neben dem Icon */}
          <g transform="translate(45, 0)">
            <text 
              x="0" 
              // y-Position und dominant-baseline sorgen für perfekte vertikale Zentrierung zum Icon (Mitte ca. bei y=26)
              y="28" 
              dominantBaseline="middle"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
              fontWeight="900" 
              // Schriftgröße erhöht (war 34) für "bisschen größer"
              fontSize="40" 
              fill={textColor} 
              style={{ letterSpacing: '-1px' }}
            >
              DALAS
            </text>
            {/* Untertitel wurde hier entfernt */}
          </g>
        </g>
      </svg>
    </>
  );
}