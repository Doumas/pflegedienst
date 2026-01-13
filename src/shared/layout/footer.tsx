"use client";

import Link from "next/link";
import { 
  ArrowUp, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { FadeIn } from "@/shared/ui/fade-in";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* --- TOP ROW: LOGO & BACK TO TOP --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <FadeIn>
            <Link href="/" className="block">
               {/* Nutze die weiße Version des Logos */}
               <DalasLogo variant="light" className="w-48 md:w-64" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold uppercase tracking-widest"
            >
              Back to top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        {/* --- SOCIALS ROW --- */}
        <div className="mb-20">
          <FadeIn delay={0.2}>
            <h4 className="text-lg font-medium text-white mb-4">Contact us</h4>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="p-2 bg-white/10 rounded-lg hover:bg-white hover:text-black transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* --- MAIN GRID (Spalten wie bei Hunter) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* SPALTE 1: NAVIGATION */}
          <FadeIn delay={0.3}>
            <h3 className="text-2xl text-white/40 mb-6 font-medium">Navigation</h3>
            <ul className="space-y-4">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href || "#"} className="text-lg font-medium text-white hover:text-[var(--color-primary)] transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* SPALTE 2: LEISTUNGEN */}
          <FadeIn delay={0.4}>
            <h3 className="text-2xl text-white/40 mb-6 font-medium">Leistungen</h3>
            <ul className="space-y-4">
              {['Ambulante Pflege', 'Intensivpflege', 'Palliativpflege', 'Betreuung', 'Beratung'].map((item) => (
                <li key={item}>
                  <Link href="/leistungen" className="text-lg font-medium text-white hover:text-[var(--color-primary)] transition-colors block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* SPALTE 3: ANSCHRIFT */}
          <FadeIn delay={0.5}>
            <h3 className="text-2xl text-white/40 mb-6 font-medium">Frankfurt</h3>
            <address className="not-italic space-y-2">
              <p className="text-lg font-medium text-white">{siteConfig.contact.address}</p>
              <p className="text-lg font-medium text-white">60388 Frankfurt am Main</p>
              <p className="text-lg font-medium text-[var(--color-primary)] pt-2">Deutschland</p>
            </address>
          </FadeIn>

          {/* SPALTE 4: KONTAKT DATEN */}
          <FadeIn delay={0.6}>
            <h3 className="text-2xl text-white/40 mb-6 font-medium">Kontakt</h3>
            <div className="space-y-4">
              <a href={`tel:${siteConfig.contact.phone}`} className="block text-lg font-medium text-[var(--color-primary)] hover:text-white transition-colors">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="block text-lg font-medium text-[var(--color-primary)] hover:text-white transition-colors">
                {siteConfig.contact.email}
              </a>
              <p className="text-white/50 text-sm pt-4 leading-relaxed">
                24h Notruf für unsere Patienten verfügbar.
              </p>
            </div>
          </FadeIn>

        </div>

        {/* --- BOTTOM ROW: LEGAL --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-white/40 font-medium">
          <FadeIn delay={0.7}>
            <p>&copy; {new Date().getFullYear()} Dalas UG. Alle Rechte vorbehalten.</p>
          </FadeIn>
          
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </FadeIn>
        </div>

      </div>
    </footer>
  );
}