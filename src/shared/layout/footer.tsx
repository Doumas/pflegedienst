"use client";

import Link from "next/link";
import { 
  ArrowUp, 
  Linkedin, 
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
    <footer className="bg-[var(--color-primary-deep)] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* --- TOP ROW: LOGO & BACK TO TOP --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <FadeIn>
            <Link href="/" className="block mb-6 md:mb-0">
               {/* Logo in Weiß für dunklen Hintergrund */}
               <DalasLogo variant="light" className="w-48 md:w-60" />
            </Link>
            <p className="text-white/50 text-sm max-w-xs mt-4 leading-relaxed">
              Ihr verlässlicher Partner für Pflege in Frankfurt. 
              Menschlich, kompetent und immer in Ihrer Nähe.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Button im Swiss Style (eckig, fein) */}
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-6 py-4 border border-white/10 hover:bg-white hover:text-[var(--color-primary-deep)] transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em]"
            >
              Nach oben
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 border-t border-white/10 pt-16">
          
          {/* SPALTE 1: NAVIGATION (3 Cols) */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.2}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8">Menu</h3>
              <ul className="space-y-3">
                {siteConfig.nav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href || "#"} className="text-lg text-white hover:text-[var(--color-primary)] transition-colors inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* SPALTE 2: LEISTUNGEN (3 Cols) */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.3}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8">Leistungen</h3>
              <ul className="space-y-3">
                {['Verhinderungspflege', 'Behandlungspflege', 'Körperpflege', 'Betreuung', 'Beratung §37.3'].map((item) => (
                  <li key={item}>
                    <Link href="/leistungen" className="text-lg text-white/80 hover:text-white transition-colors inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* SPALTE 3: KONTAKT (4 Cols) */}
          <div className="lg:col-span-4">
            <FadeIn delay={0.4}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8">Kontakt</h3>
              <div className="space-y-6">
                
                {/* Anschrift */}
                <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/5 rounded-none border border-white/5 group-hover:border-[var(--color-primary)]/50 transition-colors">
                        <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                        <p className="text-white font-medium">{siteConfig.contact.address}</p>
                        <p className="text-white/60">60388 Frankfurt am Main</p>
                    </div>
                </div>

                {/* Telefon */}
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/5 rounded-none border border-white/5 group-hover:border-[var(--color-primary)]/50 transition-colors">
                        <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                            {siteConfig.contact.phone}
                        </p>
                        <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                            Mo-Fr 08:00 - 16:00 Uhr
                        </p>
                    </div>
                </a>

                {/* Mail */}
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/5 rounded-none border border-white/5 group-hover:border-[var(--color-primary)]/50 transition-colors">
                        <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                        <p className="text-white font-medium group-hover:text-[var(--color-primary)] transition-colors">
                            {siteConfig.contact.email}
                        </p>
                        <p className="text-white/60 text-sm">
                            Wir antworten binnen 24h
                        </p>
                    </div>
                </a>

              </div>
            </FadeIn>
          </div>

          {/* SPALTE 4: SOCIALS (2 Cols) */}
          <div className="lg:col-span-2 flex lg:justify-end items-start">
             <FadeIn delay={0.5}>
                {/* Nur LinkedIn & Mail als Icons, da Instagram nicht existiert */}
                <div className="flex gap-2">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all duration-300 text-white/60">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="w-12 h-12 flex items-center justify-center border border-white/10 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all duration-300 text-white/60">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
             </FadeIn>
          </div>

        </div>

        {/* --- BOTTOM ROW: LEGAL --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 font-medium uppercase tracking-wider">
          <FadeIn delay={0.6}>
            <p>&copy; {new Date().getFullYear()} Dalas UG. Frankfurt am Main.</p>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
            </div>
          </FadeIn>
        </div>

      </div>
    </footer>
  );
}