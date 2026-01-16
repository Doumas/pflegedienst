import type { Metadata } from "next";
import { Inter, Dancing_Script, Playfair_Display } from "next/font/google"; 
import "./globals.css";
import { Header } from "@/shared/layout/header/header";
import { Footer } from "@/shared/layout/footer";
import { GoogleLayoutShift } from "@/shared/utils/google-layout-shift";
import { ActiveSectionProvider } from "@/shared/context/active-section-context";
// NEU: Importiere den Smooth Scroll Provider
import { SmoothScrollProvider } from "@/shared/providers/smooth-scroll-provider";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter', 
  display: 'swap' 
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  variable: '--font-dancing', 
  display: 'swap' 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Dalas UG Pflegedienst",
  description: "Ihr verlässlicher Partner für Pflege in Frankfurt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // WICHTIG: "scroll-smooth" hier entfernt, da Lenis das jetzt übernimmt!
    <html lang="de" className={`${inter.variable} ${dancingScript.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-slate-950 antialiased font-sans flex flex-col">
        
        {/* NEU: Aktiviert das physikalische Smooth-Scrolling global */}
        <SmoothScrollProvider />

        <GoogleLayoutShift />

        <ActiveSectionProvider>
            <Header />
            
            <main className="flex-1">
              {children}
            </main>
            
            <Footer />
        </ActiveSectionProvider>

      </body>
    </html>
  );
}