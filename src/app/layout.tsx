import { Inter, Dancing_Script, Playfair_Display } from "next/font/google"; 
import "./globals.css";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
import { GoogleLayoutShift } from "@/shared/utils/google-layout-shift";
import { ActiveSectionProvider } from "@/shared/context/active-section-context";

// 1. Standard-Schrift (Lesetexte, UI, "Gut versorgt")
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter', 
  display: 'swap' 
});

// 2. Logo-Schrift (Marke "Dalas")
const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  variable: '--font-dancing', 
  display: 'swap' 
});

// 3. NEU: Akzent-Schrift (Für "Zuhause leben", Zitate & emotionale Headlines)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Wir injizieren alle drei Variablen in den HTML-Tag
    <html lang="de" className={`${inter.variable} ${dancingScript.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-slate-950 antialiased font-sans flex flex-col">
        
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