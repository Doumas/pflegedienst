"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useInView } from "framer-motion";
import { useActiveSection } from "@/shared/context/active-section-context";
import { LucideIcon } from "lucide-react";

interface SectionTrackerProps {
  children: ReactNode;
  icon: LucideIcon; // Welches Icon soll der Header zeigen?
  id?: string;      // Für Anker-Links (z.B. #ueber-uns)
  className?: string;
}

export function SectionTracker({ children, icon, id, className }: SectionTrackerProps) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveIcon } = useActiveSection();
  
  // Erkennt, wenn die Sektion die Bildschirmmitte berührt
  const isInView = useInView(ref, { 
    margin: "-45% 0px -45% 0px", // Fokusbereich: Die Mitte des Screens
    amount: "some" 
  });

  useEffect(() => {
    if (isInView) {
        // Kleiner Timeout für Performance
        const timeoutId = setTimeout(() => {
            setActiveIcon(icon);
        }, 50);
        return () => clearTimeout(timeoutId);
    }
  }, [isInView, icon, setActiveIcon]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}