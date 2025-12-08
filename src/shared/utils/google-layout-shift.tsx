"use client";

import { useEffect } from "react";

export function GoogleLayoutShift() {
  useEffect(() => {
    // Ziel: Den Header finden
    const header = document.querySelector("header");
    
    // Die Funktion, die das Layout repariert
    const adjustLayout = () => {
      if (!header) return;

      // 1. Prüfen: Gibt es den Google Frame?
      const googleFrame = document.querySelector(".goog-te-banner-frame") as HTMLElement;
      const frameHeight = googleFrame ? googleFrame.offsetHeight : 0;

      // 2. Prüfen: Hat Google den Body verschoben? (Das macht Google oft auf Desktop)
      const bodyStyle = window.getComputedStyle(document.body);
      const bodyTop = parseFloat(bodyStyle.top) || 0;

      // Wir nehmen den Wert, der größer als 0 ist
      const shiftAmount = Math.max(frameHeight, bodyTop);

      // 3. Header anpassen
      if (shiftAmount > 0) {
        // Wenn Google da ist -> Header runterdrücken
        header.style.top = `${shiftAmount}px`;
        // Sicherstellen, dass auch der Body Platz macht (verhindert Abschneiden von Inhalt)
        document.body.style.position = "relative";
        document.body.style.top = `${shiftAmount}px`;
      } else {
        // Wenn Google weg ist -> Reset
        header.style.top = "0px";
        document.body.style.top = "0px";
      }
    };

    // A. Observer: Beobachtet Veränderungen am Body-Style (z.B. wenn Google 'top: 40px' setzt)
    const styleObserver = new MutationObserver(adjustLayout);
    styleObserver.observe(document.body, { 
      attributes: true, 
      attributeFilter: ["style", "class"] 
    });

    // B. Observer: Beobachtet, ob Google Elemente in die Seite spritzt (das Iframe)
    const domObserver = new MutationObserver(adjustLayout);
    domObserver.observe(document.body, { childList: true });

    // C. Fallback: Einmal pro Sekunde prüfen (falls Observer verpasst wird)
    const interval = setInterval(adjustLayout, 1000);

    return () => {
      styleObserver.disconnect();
      domObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}