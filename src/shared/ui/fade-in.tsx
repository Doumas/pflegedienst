"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/shared/utils/cn";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const ref = useRef(null);
  
  // margin: "-100px" bedeutet: Animation startet erst, wenn das Element 100px im Bild ist
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction] 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0 
      } : {}}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Ein schöner, sanfter "Ease-Out"
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}