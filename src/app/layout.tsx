import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
// NEU: Das Shift-Skript importieren
import { GoogleLayoutShift } from "@/shared/utils/google-layout-shift";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-950 antialiased font-sans flex flex-col">
        
        {/* NEU: Das Skript muss hier oben stehen, um den Header zu steuern */}
        <GoogleLayoutShift />

        <Header />
        
        {/* main flex-1 sorgt dafür, dass der Footer immer unten klebt */}
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}