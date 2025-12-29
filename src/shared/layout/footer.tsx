"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight, HeartHandshake, ArrowUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";
import { siteConfig } from "@/config/site";
import { DalasLogo } from "@/shared/ui/dalas-logo";

export function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 1. FIX: 'overflow-hidden' hier ENTFERNT, damit die blaue Box oben rausraken kann ("schweben")
    <footer className="relative bg-[var(--color-footer-bg)] text-white font-sans border-t border-white/10 mt-32">
      
      {/* Hintergrund-Raster (Hier ist overflow-hidden okay, damit das Muster nicht rausläuft) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ========================================================= */}
      {/* PRE-FOOTER CTA (Der schwebende Kasten)                    */}
      {/* ========================================================= */}
      <div className="relative z-50 container px-4 md:px-6">
        {/* Negative Margin (-mt-24) zieht die Box nach oben */}
        <div className="-mt-24 bg-[var(--color-primary)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden group border border-white/10">
            
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wide mb-4 border border-white/10">
                    <HeartHandshake className="w-4 h-4 text-[var(--color-accent)]" />
                    Wir sind für Sie da
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                    Noch Fragen offen?
                </h2>
                <p className="text-white/90 text-lg font-medium max-w-lg leading-relaxed">
                    Lassen Sie uns persönlich sprechen. Kostenlos und unverbindlich.
                </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* 2. FIX: ANRUF BUTTON 
                   - bg-white (Hintergrund Weiß)
                   - text-cyan-900 (Schrift Dunkel-Petrol) -> Damit man es liest!
                */}
                <a href={`tel:${siteConfig.contact.phone}`} className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-14 px-8 bg-white text-cyan-950 hover:bg-slate-100 font-bold text-lg rounded-full shadow-lg hover:-translate-y-1 transition-transform w-full sm:w-auto justify-center border-none"
                )}>
                    <Phone className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                    {siteConfig.contact.phone}
                </a>
                
                {/* 3. FIX: NACHRICHT BUTTON
                   - bg-transparent (Kein weißer Block)
                   - border-2 border-white (Weißer Rand)
                   - text-white (Weiße Schrift)
                */}
                <Link href="/kontakt" className="w-full sm:w-auto">
                    <div className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "bg-transparent h-14 px-8 text-white border-2 border-white/30 font-bold text-lg rounded-full hover:bg-white hover:text-cyan-950 hover:border-white w-full flex justify-center cursor-pointer transition-all"
                    )}>
                        Nachricht schreiben
                    </div>
                </Link>
            </div>
        </div>
      </div>


      {/* ========================================================= */}
      {/* MAIN FOOTER CONTENT                                       */}
      {/* ========================================================= */}
      <div className="container px-4 md:px-6 relative z-10 pb-12 pt-16 md:pt-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* SPALTE 1: BRANDING */}
            <div className="space-y-6">
               <Link href="/" className="inline-block mb-6">
    {/* w-72 (288px) oder w-80 (320px) für gute Sichtbarkeit im Footer */}
    <DalasLogo variant="light" className="w-64 md:w-80" />
</Link>
                <p className="text-white/60 leading-relaxed text-sm font-medium pr-4">
                    Ihr verlässlicher Partner für ambulante Intensivpflege in Frankfurt und Umgebung. 
                    Menschlich, kompetent und immer an Ihrer Seite.
                </p>
                <div className="flex gap-4">
                    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white hover:-translate-y-1 transition-all duration-300">
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            {/* SPALTE 2: MENÜ */}
            <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    Menü <div className="h-px w-8 bg-[var(--color-accent)]" />
                </h4>
                <ul className="space-y-3">
                    {siteConfig.nav.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href || "#"} className="group flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] transition-colors text-sm font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-accent)] transition-colors" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* SPALTE 3: LEISTUNGEN */}
            <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    Leistungen <div className="h-px w-8 bg-[var(--color-accent)]" />
                </h4>
                <ul className="space-y-3">
                    {['Grundpflege', 'Behandlungspflege', 'Verhinderungspflege', 'Betreuungsleistungen', 'Beratungseinsatz §37.3'].map((item) => (
                        <li key={item}>
                            <Link href="/leistungen" className="group flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] transition-colors text-sm font-medium">
                                <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--color-accent)]" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* SPALTE 4: KONTAKT */}
            <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    Kontakt <div className="h-px w-8 bg-[var(--color-accent)]" />
                </h4>
                <ul className="space-y-5">
                    <li className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-sm text-white/70 font-medium">
                            <span className="block text-white font-bold mb-0.5">Hauptstandort</span>
                            {siteConfig.contact.address} <br/>
                            60311 Frankfurt am Main
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-sm text-white/70 font-medium">
                            <span className="block text-white font-bold mb-0.5">24h Notruf</span>
                            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">{siteConfig.contact.phone}</a>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-sm text-white/70 font-medium">
                            <span className="block text-white font-bold mb-0.5">E-Mail</span>
                            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">{siteConfig.contact.email}</a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40">
            <div className="flex flex-wrap justify-center gap-6">
                <span>&copy; {new Date().getFullYear()} Dalas GmbH. Alle Rechte vorbehalten.</span>
            </div>
            <div className="flex gap-6">
                <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
            </div>
            <button onClick={scrollToTop} className="p-3 bg-white/5 hover:bg-[var(--color-accent)] text-white rounded-xl transition-colors group">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>

      </div>
    </footer>
  );
}