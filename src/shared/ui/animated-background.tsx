"use client";

import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedBackgroundProps {
  icon: any; 
  className?: string;
  variant?: "section" | "card"; 
  count?: number; 
  color?: string; 
}

export function AnimatedBackground({ 
  icon: Icon, 
  className, 
  variant = "section", 
  count = 3,
  color = "text-[var(--color-primary)]"
}: AnimatedBackgroundProps) {

  // --- VARIANTE 1: SEKTIONS-HINTERGRUND (5 Große Icons) ---
  if (variant === "section") {
    const sectionPositions = [
        { className: "w-[500px] h-[500px] -top-20 -left-20", delay: 0 },
        { className: "w-[450px] h-[450px] top-1/4 -right-24 rotate-12", delay: 0.5 },
        { className: "w-[600px] h-[600px] -bottom-32 -left-20 opacity-[0.8]", delay: 1.0 }, 
        { className: "w-[300px] h-[300px] top-10 left-1/2 opacity-[0.6]", delay: 1.5 },
        { className: "w-[500px] h-[500px] bottom-10 -right-10 -rotate-6", delay: 2.0 }
    ];

    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
        {sectionPositions.map((pos, i) => (
           <motion.div
              key={i}
              // UPDATE: Basis-Opazität auf 0.1 (10%) erhöht für bessere Sichtbarkeit
              className={cn("absolute opacity-[0.1]", color, pos.className)} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.1, scale: 1 }} // Ziel-Opazität ebenfalls erhöht
              transition={{ duration: 2, delay: pos.delay, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
           >
              {/* UPDATE: StrokeWidth auf 1.5 erhöht */}
              <Icon strokeWidth={1.5} className="w-full h-full" />
           </motion.div>
        ))}
      </div>
    );
  }

  // --- VARIANTE 2: KARTEN-HINTERGRUND (Kleine Icons) ---
  const cardPositions = [
      "top-[-10%] right-[-10%] w-32 h-32 rotate-12 opacity-[0.06]", // Etwas stärker
      "bottom-[-10%] left-[-5%] w-40 h-40 -rotate-12 opacity-[0.05]",
      "top-[40%] left-[15%] w-20 h-20 rotate-45 opacity-[0.04]",
      "bottom-[20%] right-[10%] w-24 h-24 -rotate-6 opacity-[0.05]",
      "top-[10%] left-[40%] w-16 h-16 rotate-90 opacity-[0.04]"
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
        {cardPositions.slice(0, count).map((pos, i) => (
            <div key={i} className={cn("absolute transition-transform duration-1000", color, pos)}>
                <Icon strokeWidth={1.5} className="w-full h-full" />
            </div>
        ))}
    </div>
  );
}