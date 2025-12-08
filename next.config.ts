// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WICHTIG: Erzeugt den reinen HTML/CSS/JS Output in einem 'out'-Ordner
  output: 'export', 
  
  // Da der Export statisch ist, muss der nachfolgende Slash
  // in URLs weggelassen werden, da sonst Navigationsfehler auftreten können.
  trailingSlash: false, 
  
  // Wenn du mit dem Image-Komponente von Next.js arbeitest, 
  // musst du eventuell den unoptimized-Loader aktivieren:
  // images: { unoptimized: true },
  
  reactStrictMode: true,
};

export default nextConfig;