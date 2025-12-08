// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // 1. STATISCHER EXPORT MODUS
  // Generiert den reinen HTML/CSS/JS Output in einem 'out'-Ordner.
  output: 'export', 
  
  // 2. PFAD-KORREKTUR
  // Wichtig für statische HTML-Dateien zur Vermeidung von Navigationsfehlern (e.g., /about/ statt /about).
  trailingSlash: false, 
  
  // 3. BILDER OPTIMIERUNG
  // Deaktiviert die Image-Optimierung, da diese einen Node.js-Server benötigt, den statische Exporte nicht haben.
  images: { unoptimized: true },
  
  // 4. REACT MODUS
  reactStrictMode: true,
  
  // HINWEIS: Die 'experimental'-Sektion wurde entfernt, um die Warnungen bezüglich 'reactCompiler' zu beheben.
};

export default nextConfig;