/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // 1. STATISCHER EXPORT MODUS
  // Du musst 'output: 'export'' UNKOMMENTIEREN, damit Next.js den 'out'-Ordner generiert.
  // Das ist essentiell für das Deployment auf Vercel/Netlify.
  output: 'export', 
  
  // 2. BILDER OPTIMIERUNG
  // 'unoptimized: true' ist korrekt, da der statische Export kein On-Demand-Image-Optimierung bietet.
  images: { unoptimized: true },
  
  // 3. FEHLERQUELLEN ENTFERNEN
  // Die 'experimental'-Sektion muss entfernt oder bereinigt werden, da sie die Warnungen/Fehler verursacht:
  // - 'reactCompiler' ist veraltet und verursacht die Warnung: "Unrecognized key(s) in object: 'reactCompiler' at 'experimental'"
  experimental: {
    // Entferne alle Einträge hier, um die Warnungen loszuwerden.
    // Entferne die 'experimental'-Sektion komplett, wenn sie leer ist.
  },
  
  // 4. TRAILING SLASH (Empfohlen für statische Exporte)
  // Hilft bei der korrekten Pfadauflösung auf statischen Hosts.
  trailingSlash: false, 

};

export default nextConfig;