import { Inter, Dancing_Script } from "next/font/google"; 
import "./globals.css";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
import { GoogleLayoutShift } from "@/shared/utils/google-layout-shift";
// 1. NEU: Provider importieren
import { ActiveSectionProvider } from "@/shared/context/active-section-context";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${dancingScript.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-slate-950 antialiased font-sans flex flex-col">
        
        <GoogleLayoutShift />

        {/* 2. NEU: Der Provider muss Header, Main und Footer umschließen */}
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