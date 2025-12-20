import React from 'react';
import { cn } from "@/shared/utils/cn";

interface DalasLogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  scrolled?: boolean; 
}

export const DalasLogo: React.FC<DalasLogoProps> = ({ 
  width, 
  height = "auto", 
  className,
  scrolled = false, 
  ...props 
}) => {
  const tealColor = "var(--color-primary, #005852)"; 
  const orangeColor = "var(--color-accent, #E8833A)";

  return (
    <>
      <style jsx>{`
        @keyframes dot-entry {
          from {
            opacity: 0;
            /* ÄNDERUNG: Positiver Wert (20px) lässt den Punkt von RECHTS einfliegen */
            transform: translateX(20px) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-dot-entry {
          /* Sanftes Easing für hochwertigen Look */
          animation: dot-entry 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-box: fill-box;
          transform-origin: center;
        }

        .icon-group {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
          transform-origin: 15px 26px; /* Drehpunkt exakt in der Mitte des Icons */
        }

        .icon-group.is-scrolled {
          /* Drehung nach unten (Bodenlage) beim Scrollen */
          transform: rotate(-90deg) scale(0.9);
        }
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 210 52" 
        width={width}
        height={height}
        fill="none"
        className={className}
        {...props}
      >
        <g transform="translate(12, 2)">
          
          {/* ICON GRUPPE (Bogen + Punkt) */}
          <g className={cn("icon-group", scrolled && "is-scrolled")}>
              <path 
                 d="M 15 10 A 18 18 0 0 0 15 42" 
                 stroke={tealColor} 
                 strokeWidth="6" 
                 strokeLinecap="round" 
              />
              <circle 
                  cx="15" 
                  cy="26" 
                  r="5.5" 
                  fill={orangeColor} 
                  className="animate-dot-entry" 
              />
          </g>

          {/* TEXT (Statisch) */}
          <text
            x="48" 
            y="40" 
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontWeight="800" 
            fontSize="40" 
            fill={tealColor}
            style={{ letterSpacing: '0.5px' }} 
          >
            DALAS
          </text>
        </g>
      </svg>
    </>
  );
};