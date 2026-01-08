"use client";

import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";

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
  count = 10,
  color = "text-[var(--color-primary)]"
}: AnimatedBackgroundProps) {

  // --- VARIANTE 1: SEKTIONS-HINTERGRUND (Dynamisch, Verteilt & Animiert) ---
  if (variant === "section") {
    const items = Array.from({ length: count });

    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none z-0", className)}>
        {items.map((_, i) => {
           // Determinische Werte für Position und Größe
           const top = (i * 19) % 90 + 5;  
           const left = (i * 29) % 90 + 5; 
           
           const initialRotate = (i * 45) % 360; 
           const size = 60 + (i * 13) % 100; 
           
           // ANIMATIONS-LOGIK:
           // Unterschiedliche Dauer für jedes Element (zwischen 4s und 8s)
           const duration = 4 + (i % 5);
           // Bewegung nach oben oder unten?
           const yOffset = i % 2 === 0 ? -20 : 20;

           return (
             <motion.div
                key={i}
                className={cn("absolute opacity-[0.4]", color)} 
                style={{ 
                    top: `${top}%`, 
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                // 1. Startzustand (unsichtbar)
                initial={{ opacity: 0, scale: 0.5, y: 0, rotate: initialRotate }}
                
                // 2. Wenn sichtbar (Einblenden)
                whileInView={{ 
                    opacity: 0.6, 
                    scale: 1, 
                }}
                
                // 3. Dauerhafte Bewegung (Loop)
                animate={{
                    y: [0, yOffset, 0], // Schwebt hoch/runter
                    rotate: [initialRotate, initialRotate + 10, initialRotate], // Leichte Rotation
                }}
                
                // 4. Übergänge konfigurieren
                transition={{
                    // Einblenden (passiert nur einmal)
                    opacity: { duration: 1.5, ease: "easeOut" },
                    scale: { duration: 1.5, ease: "easeOut" },
                    
                    // Schwebe-Loop (endlos)
                    y: {
                        duration: duration,
                        repeat: Infinity,
                        repeatType: "reverse", // Hin und zurück
                        ease: "easeInOut",
                    },
                    // Rotations-Loop (endlos, etwas langsamer als Bewegung)
                    rotate: {
                        duration: duration + 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }
                }}
                viewport={{ once: true }}
             >
                <Icon strokeWidth={1.5} className="w-full h-full opacity-50" />
             </motion.div>
           );
        })}
      </div>
    );
  }

  // --- VARIANTE 2: KARTEN-HINTERGRUND ---
  // Auch hier machen wir eine ganz subtile Bewegung rein
  const cardPositions = [
      "top-[-10%] right-[-10%] w-32 h-32 rotate-12 opacity-[0.06]",
      "bottom-[-10%] left-[-5%] w-40 h-40 -rotate-12 opacity-[0.05]",
      "top-[40%] left-[15%] w-20 h-20 rotate-45 opacity-[0.04]",
      "bottom-[20%] right-[10%] w-24 h-24 -rotate-6 opacity-[0.05]",
      "top-[10%] left-[40%] w-16 h-16 rotate-90 opacity-[0.04]"
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
        {cardPositions.slice(0, count).map((pos, i) => (
            <motion.div 
                key={i} 
                className={cn("absolute", color, pos)}
                // Ganz subtiles Atmen für Karten-Hintergründe
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                    duration: 5 + i, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut" 
                }}
            >
                <Icon strokeWidth={1.5} className="w-full h-full" />
            </motion.div>
        ))}
    </div>
  );
}