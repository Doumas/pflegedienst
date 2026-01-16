"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider() {
  useEffect(() => {
    // Initialisierung von Lenis
    const lenis = new Lenis({
      duration: 1.5, // Wie lange das Nachlaufen dauert (höher = weicher/schwerer)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Die Physik-Kurve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Animation Frame Loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // Diese Komponente rendert nichts, sie führt nur Logik aus
}