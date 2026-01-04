"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDown, X, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Sun, Moon, MessageCircle, HelpCircle, Menu, Briefcase } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import { GoogleTranslator } from "@/shared/utils/google-translator";
import { DalasLogo } from "@/shared/ui/dalas-logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [greeting, setGreeting] = useState("Willkommen");
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string | undefined) => {
    if (!href || !pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 40); };
    window.addEventListener("scroll", handleScroll);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Guten Morgen");
    else if (hour < 18) setGreeting("Guten Tag");
    else setGreeting("Guten Abend");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleOpenConfigurator = () => {
      setIsOpen(false); 
      const timestamp = Date.now();
      router.push(`/?openConfigurator=true&trigger=${timestamp}#pflege-wegweiser`);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 font-sans shadow-sm",
          (scrolled || isOpen) ? "bg-white/95 backdrop-blur-md" : "bg-white"
        )}
      >
        
        {/* ========================================================= */}
        {/* 1. TOP BAR (BLAU)                                         */}
        {/* ========================================================= */}
        <div className={cn(
            "bg-[var(--color-primary)] text-white transition-all duration-500 ease-in-out overflow-hidden relative z-50",
            scrolled ? "max-h-0 py-0 opacity-0" : "max-h-12 py-2.5 opacity-100"
        )}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-xs font-bold tracking-wide">
                
                {/* Links: Kontakt */}
                <div className="flex items-center gap-6">
                    <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Phone className="w-3.5 h-3.5" /> 
                        <span>{siteConfig.contact.phone}</span>
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Mail className="w-4 h-4" />
                        <span>{siteConfig.contact.email}</span>
                    </a>
                </div>

                {/* Rechts: Zusatzinfos */}
                <div className="flex items-center gap-4">
                     <a href={`mailto:${siteConfig.contact.email}`} className="sm:hidden flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">{siteConfig.contact.email}</span>
                    </a>

                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="/karriere" className="flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            Wir stellen ein
                        </Link>
                        <div className="w-px h-3 bg-white/30" />
                        <div className="flex items-center gap-1.5 opacity-80">
                            <MapPin className="w-3 h-3" /> Frankfurt & Umgebung
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN HEADER (LOGO & NAV)                               */}
        {/* ========================================================= */}
        <div className={cn(
            "container mx-auto px-4 md:px-6 transition-all duration-300",
            scrolled ? "py-2" : "py-4 lg:py-6"
        )}>
          <div className="flex items-center justify-between">
            
            {/* LOGO: LINKS & GROSS (Wie gewünscht) */}
            <Link href="/" className="relative z-50 block shrink-0" onClick={closeMenu}>
                <DalasLogo 
                  scrolled={scrolled}
                  className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-auto origin-left",
                    scrolled ? "w-40 lg:w-64" : "w-48 lg:w-80"
                  )}
                />
            </Link>

            {/* DESKTOP NAV (RECHTS) */}
            <div className="hidden lg:flex items-center gap-8">
                <nav className="flex items-center gap-1">
                  {siteConfig.nav.map((item) => (
                      <div key={item.label} className="relative group">
                        <Link href={item.href || "#"} className={cn("flex items-center gap-1 text-[16px] px-4 py-2 rounded-full transition-all duration-300 font-bold", isActive(item.href) ? "text-[var(--color-primary)] bg-[var(--color-secondary)]" : "text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50")}>
                            {item.label}
                            {item.items && <ChevronDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />}
                        </Link>
                        {item.items && (
                             <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                               <div className="w-64 rounded-3xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 ring-1 ring-slate-100 overflow-hidden">
                                 {item.items.map((subItem) => (
                                   <Link key={subItem.href} href={subItem.href} className={cn("block px-4 py-3 text-[14px] rounded-2xl transition-all font-bold flex items-center justify-between group/link", isActive(subItem.href) ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]" : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]")}>
                                     {subItem.label} <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--color-accent)]" />
                                   </Link>
                                 ))}
                               </div>
                             </div>
                        )}
                      </div>
                  ))}
                </nav>
                <div className="ml-2 pl-4 border-l border-slate-100">
                  <Link href="/kontakt">
                    <Button size="lg" className="font-bold text-[15px] px-8 h-12 shadow-lg hover:shadow-xl hover:shadow-[var(--color-primary)]/20 hover:-translate-y-0.5 transition-all">
                        Beratung anfordern
                    </Button>
                  </Link>
                </div>
            </div>

            {/* MOBILE HAMBURGER (RECHTS) */}
            <div className="lg:hidden">
               <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-primary)] text-white border border-transparent shadow-md active:scale-95 transition-all hover:bg-[var(--color-primary-hover)] relative z-[60]"
                  aria-label="Menü öffnen"
               >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>

      </header>
      
      {/* PLATZHALTER */}
      <div className={cn(
          "w-full bg-transparent pointer-events-none transition-all duration-300", 
          scrolled ? "h-[75px]" : "h-[110px] lg:h-[140px]" 
      )} aria-hidden="true" />

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[40] bg-slate-50/95 backdrop-blur-xl pt-50 px-4 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-6 pb-24">
               
               {/* KORREKTUR: HEADER ZENTRIERT (Mobile Center Rule) */}
               <div className="flex flex-col items-center border-b border-slate-200 pb-6 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-0 fill-mode-both">
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                     {greeting === "Guten Abend" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />} {greeting}
                  </span>
                  <span className="font-black text-4xl text-slate-900 tracking-tight">Menü</span>
               </div>
               
               {/* Quick Actions (Bleiben Grid/Zentriert) */}
               <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-100 fill-mode-both">
                  <Link href="/kontakt" onClick={closeMenu} className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-95 transition-all">
                     <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                        <Mail className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold text-slate-900">Nachricht</span>
                  </Link>
                  <a href={`tel:${siteConfig.contact.phone}`} className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-95 transition-all">
                     <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                        <Phone className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold text-slate-900">Anrufen</span>
                  </a>
               </div>

               {/* Pflege Wegweiser */}
               <div onClick={handleOpenConfigurator} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 shadow-sm active:scale-98 transition-transform cursor-pointer animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300 fill-mode-both">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm"><HelpCircle className="w-5 h-5" /></div>
                  <div>
                     <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">Pflege-Wegweiser</div>
                     <div className="text-sm font-bold text-slate-900">Was steht mir zu?</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-[var(--color-primary)]" />
               </div>

               {/* NAV LINKS (Bleiben LINKSBÜNDIG für Lesbarkeit) */}
               <nav className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-500 fill-mode-both">
                 {siteConfig.nav.map((item) => (
                   <div key={item.label} className="border-b border-slate-50 last:border-0">
                      {item.items ? (
                        <details className="group">
                           <summary className="flex justify-between items-center p-4 text-base font-bold text-slate-800 cursor-pointer list-none select-none hover:bg-slate-50 rounded-xl transition-colors">
                              {item.label} <ChevronDown className="w-5 h-5 text-slate-300 group-open:rotate-180 transition-transform"/>
                           </summary>
                           <div className="px-4 pb-3 space-y-1">
                              {item.href && (
                                <Link href={item.href} onClick={closeMenu} className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm py-3 px-3 bg-[var(--color-primary)]/5 rounded-xl">
                                   <ArrowUpRight className="w-4 h-4" /> Zur Übersicht
                                </Link>
                              )}
                              {item.items.map(sub => (
                                 <Link key={sub.href} href={sub.href} onClick={closeMenu} className="block text-slate-600 py-3 px-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
                                    {sub.label}
                                 </Link>
                              ))}
                           </div>
                        </details>
                      ) : (
                        <Link href={item.href || "#"} onClick={closeMenu} className="block p-4 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl transition-colors">{item.label}</Link>
                      )}
                   </div>
                 ))}
               </nav>
               
               {/* Karriere Button */}
               <Link href="/karriere" onClick={closeMenu} className="flex items-center justify-between p-1 pr-4 bg-[var(--color-primary)] text-white rounded-2xl shadow-lg active:scale-98 transition-transform animate-in slide-in-from-bottom-4 fade-in duration-500 delay-700 fill-mode-both">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white"><Briefcase className="w-5 h-5" /></div>
                     <span className="font-bold text-sm">Jobs & Karriere</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-70" />
               </Link>

               <div className="flex justify-center pt-4 animate-in fade-in duration-700 delay-1000 fill-mode-both">
                  <GoogleTranslator elementId="google_translate_mobile_menu" buttonClassName="bg-white border border-slate-200 text-slate-500 text-xs h-8 px-4 rounded-full shadow-sm" />
               </div>

            </div>
          </div>
      )}
    </>
  );
}