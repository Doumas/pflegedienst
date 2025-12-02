import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // FIX: bg-footer-bg (statt slate-950). Das ist ein sehr dunkles, warmes Rot/Braun.
    // border-t-rose-800 sorgt für einen sanften Übergang.
    <footer className="bg-footer-bg text-text-light/80 border-t border-primary-deep font-sans">
      
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* SPALTE 1: Marke */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-primary transition-colors">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Ihr verlässlicher Partner für häusliche Pflege. Wir sorgen dafür, dass Sie 
              selbstbestimmt in Ihren eigenen vier Wänden leben können.
            </p>
          </div>

          {/* SPALTE 2: Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Startseite</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-white transition-colors">Über uns</Link></li>
              <li><Link href="/leistungen" className="hover:text-white transition-colors">Leistungen</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* SPALTE 3: Kontakt */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Kontakt</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary/70 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/70 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* SPALTE 4: Qualität */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Qualität</h3>
            <div className="bg-primary-deep/50 p-4 rounded-lg border border-primary-hover mb-6">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-8 h-8 text-primary/70" />
                <div>
                  <div className="font-bold text-white">MDK Geprüft</div>
                  <div className="text-xs text-secondary">Note: Sehr gut (1.0)</div>
                </div>
              </div>
              <p className="text-xs text-secondary/80">
                Wir sind zugelassener Vertragspartner aller Kranken- und Pflegekassen.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* UNTERE LEISTE */}
      <div className="border-t border-primary-deep bg-footer-bg">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-accent-soft/60">
          <p>© {currentYear} {siteConfig.name}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}