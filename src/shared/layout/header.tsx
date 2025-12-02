"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// NEU: Import für die aktuelle URL
import { usePathname } from "next/navigation"; 
import { siteConfig } from "@/config/site";
import { ChevronDown, Menu, X, Heart, Phone, Mail, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // NEU: Aktuellen Pfad holen
  const pathname = usePathname();

  // NEU: Hilfsfunktion zum Prüfen, ob ein Link aktiv ist
  // Prüft, ob der Pfad exakt übereinstimmt ODER ob er damit beginnt (für Unterseiten wie /leistungen/...)
  const isActive = (href: string | undefined) => {
    if (!href || !pathname) return false;
    if (href === "/") return pathname === "/"; // Startseite nur bei exaktem Match
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col font-sans">
      
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground hidden md:block border-b border-primary/20 relative z-20">
        <div className="container h-11 flex items-center justify-between text-sm font-medium px-4">
          <div className="flex items-center gap-8">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4 fill-current" /> <span>{siteConfig.contact.phone}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" /> <span>{siteConfig.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 opacity-90"><MapPin className="w-4 h-4" /> <span>{siteConfig.contact.address}</span></div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={cn("w-full bg-white border-b border-slate-100 transition-all duration-300 shadow-sm relative z-10", scrolled ? "h-16" : "h-20")}>
        <div className="container h-full flex items-center justify-between px-4">
          
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group" onClick={closeMenu}>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary border border-secondary group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">{siteConfig.name}</span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => {
              // Prüfen ob dieser Hauptpunkt aktiv ist
              const active = isActive(item.href);
              
              return (
              <div key={item.label} className="relative group h-full flex items-center">
                {item.items ? (
                  <>
                    {/* Dropdown Parent Link/Button mit Active-Check */}
                    {item.href ? (
                      <Link 
                        href={item.href} 
                        className={cn(
                          "flex items-center gap-1.5 text-[15px] font-medium transition-colors py-2",
                          active ? "text-primary font-bold" : "text-slate-600 hover:text-primary"
                        )}
                      >
                        {item.label} <ChevronDown className={cn("h-4 w-4 transition-transform group-hover:rotate-180 opacity-50", active && "text-primary opacity-100")} />
                      </Link>
                    ) : (
                      <button className={cn(
                          "flex items-center gap-1.5 text-[15px] font-medium transition-colors py-2",
                          active ? "text-primary font-bold" : "text-slate-600 hover:text-primary"
                        )}>
                        {item.label} <ChevronDown className={cn("h-4 w-4 transition-transform group-hover:rotate-180 opacity-50", active && "text-primary opacity-100")} />
                      </button>
                    )}

                    {/* Dropdown Items */}
                    <div className="absolute left-0 top-full pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-64 overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                        {item.items.map((subItem) => {
                           const subActive = isActive(subItem.href);
                           return (
                          <Link 
                            key={subItem.href} 
                            href={subItem.href} 
                            className={cn(
                              "block rounded-lg px-4 py-3 text-sm transition-colors",
                              subActive ? "bg-secondary text-primary font-medium" : "text-slate-600 hover:bg-secondary hover:text-primary"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        )})}
                      </div>
                    </div>
                  </>
                ) : (
                  // Normaler Link mit Active-Check
                  <Link 
                    href={item.href || "#"} 
                    className={cn(
                      "text-[15px] font-medium transition-colors",
                      active ? "text-primary font-bold" : "text-slate-600 hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )})}
          </nav>

          <div className="hidden md:block">
            <Link href="/kontakt"><Button className="h-10 px-6 text-sm font-semibold shadow-md">Beratung anfordern <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}</button>
        </div>
      </div>

      {/* MOBILE MENU (Auch hier Active-States hinzugefügt) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 flex flex-col gap-4 h-[calc(100vh-100px)] overflow-y-auto z-0">
          
          <div className="mb-4 p-5 bg-secondary rounded-2xl space-y-4 text-sm border border-slate-100">
             <div className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">Kontakt aufnehmen</div>
             <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-slate-800 font-medium"><div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary shadow-sm"><Phone className="w-4 h-4" /></div>{siteConfig.contact.phone}</a>
             <div className="flex items-center gap-3 text-slate-600"><div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary shadow-sm"><MapPin className="w-4 h-4" /></div>{siteConfig.contact.address}</div>
          </div>

          <div className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
               const active = isActive(item.href);
               return (
              <div key={item.label} className="py-3 border-b border-slate-50 last:border-0">
                {item.items ? (
                  <details className="group" open={active}> {/* Automatisch öffnen wenn aktiv */}
                    <summary className={cn(
                        "font-bold text-lg cursor-pointer list-none flex justify-between items-center select-none",
                        active ? "text-primary" : "text-slate-900"
                      )}>
                      {item.label} <ChevronDown className={cn("w-5 h-5 transition-transform group-open:rotate-180", active ? "text-primary" : "text-slate-400")}/>
                    </summary>
                    <div className="pl-4 mt-3 space-y-2 border-l-2 border-secondary">
                      
                      {item.href && (
                        <Link href={item.href} onClick={closeMenu} className={cn("flex items-center gap-2 py-2 font-semibold", active ? "text-primary" : "text-slate-900 hover:text-primary")}>
                          <ArrowUpRight className="w-4 h-4" /> Zur Übersicht
                        </Link>
                      )}

                      {item.items.map(sub => {
                         const subActive = isActive(sub.href);
                         return (
                        <Link key={sub.href} href={sub.href} onClick={closeMenu} className={cn("block py-2", subActive ? "text-primary font-medium" : "text-slate-600 hover:text-primary")}>
                          {sub.label}
                        </Link>
                      )})}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href || "#"} onClick={closeMenu} className={cn("block font-bold text-lg", active ? "text-primary" : "text-slate-900 hover:text-primary")}>
                    {item.label}
                  </Link>
                )}
              </div>
            )})}
          </div>
          <Link href="/kontakt" onClick={closeMenu} className="w-full mt-2"><Button className="w-full h-12 text-base">Kontakt aufnehmen</Button></Link>
        </div>
      )}
    </header>
  );
}