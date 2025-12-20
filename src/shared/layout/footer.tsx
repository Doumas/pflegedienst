"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Heart, Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, ShieldCheck, Star, Briefcase } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { DalasLogo } from "@/shared/ui/dalas-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname(); 

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return cn(
      "group flex items-center gap-2 transition-colors duration-300",
      isActive ? "text-[var(--color-accent)] font-bold pl-2" : "text-white/70 hover:text-white hover:pl-2"
    );
  };

  return (
    <footer className={cn(
        "bg-[var(--color-footer-bg)] text-white/80 border-t border-white/5 font-sans relative overflow-hidden",
        "pb-24 lg:pb-0" 
    )}>
      
      {/* Background FX */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* MAIN CONTENT */}
      <div className="container relative z-10 px-4 md:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* 1. BRAND */}
          <div className="space-y-6">
            <Link href="/" className="block w-fit opacity-90 hover:opacity-100 transition-opacity">
              <div className="brightness-0 invert"> 
                  {/* ANPASSUNG: Compact Variante (ohne Subtext) und größer (220px) */}
                  <DalasLogo variant="compact" width={220} />
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-xs text-white/60">
              Ihr verlässlicher Partner für häusliche Pflege in Frankfurt. 
              Wir sorgen dafür, dass Sie selbstbestimmt und sicher zuhause leben können.
            </p>
            
            {/* Socials */}
            <div className="flex gap-3 pt-2">
               {[Facebook, Instagram].map((Icon, i) => (
                 <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 border border-white/5 text-white/70 hover:-translate-y-1">
                   <Icon className="w-4 h-4" />
                 </a>
               ))}
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Startseite", href: "/" },
                { label: "Über uns", href: "/ueber-uns" },
                { label: "Leistungen", href: "/leistungen" },
                { label: "Kontakt", href: "/kontakt" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={getLinkClass(link.href)}>
                    <ArrowRight className={cn("w-3 h-3 transition-all duration-300", pathname === link.href ? "text-[var(--color-accent)] opacity-100" : "opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:text-[var(--color-accent)]")} />
                    {link.label}
                  </Link>
                </li>
              ))}
              
              <li className="pt-2">
                 <Link href="/karriere" className="group flex items-center gap-2 text-[var(--color-accent)] font-bold hover:text-white transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/30 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors border border-[var(--color-primary)]/50">
                       <Briefcase className="w-3 h-3" />
                    </div>
                    Karriere
                    <span className="text-[9px] bg-[var(--color-accent)] text-[var(--color-primary-deep)] px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1 font-black">Jobs</span>
                 </Link>
              </li>
            </ul>
          </div>

          {/* 3. KONTAKT */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">Kontakt</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 border border-white/5 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-all">
                   <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed text-white/80">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 border border-white/5 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-all">
                   <Phone className="w-4 h-4" />
                </div>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors font-medium text-white/80">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 border border-white/5 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-all">
                   <Mail className="w-4 h-4" />
                </div>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors text-white/80">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 4. TRUST */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">Qualität</h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 group hover:border-[var(--color-accent)]/30 transition-colors relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <ShieldCheck className="w-16 h-16 text-[var(--color-accent)]" />
              </div>
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-14 h-14 bg-[var(--color-primary)] rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-lg shadow-black/30 border border-white/10">
                  <span className="text-xl leading-none">1.0</span>
                  <span className="text-[9px] uppercase opacity-80 mt-0.5">Note</span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">MDK Qualitätsprüfung</div>
                  <div className="text-xs text-[var(--color-accent)] mt-1 flex items-center gap-1 font-medium">
                     <Star className="w-3 h-3 fill-current" /> Sehr gut
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-3 relative z-10">
                Zugelassener Vertragspartner aller Kranken- und Pflegekassen.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="container px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40">
          <p>© {currentYear} {siteConfig.name}. Mit <Heart className="w-3 h-3 inline text-[var(--color-accent)] mx-0.5 fill-current" /> für Ihre Pflege.</p>
          <div className="flex gap-6 md:gap-8">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
          </div>
        </div>
      </div>
      
    </footer>
  );
}