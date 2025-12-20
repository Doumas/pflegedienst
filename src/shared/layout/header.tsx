"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDown, X, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Navigation, Sun, Moon, MessageCircle, HelpCircle, Menu, Briefcase, Star, CheckCircle2, ShieldCheck, Globe, Ambulance, HeartHandshake } from "lucide-react";
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
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans",
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/50" 
            : "bg-white"
        )}
      >
        
        {/* 1. DESKTOP TOP BAR */}
        <div className={cn(
          "hidden lg:block container mx-auto px-6 transition-all duration-300 ease-in-out border-b border-slate-100",
          scrolled 
            ? "max-h-0 opacity-0 py-0 overflow-hidden border-none" 
            : "max-h-12 opacity-100 py-2 overflow-visible"
        )}>
           <div className="flex justify-between items-center text-xs font-medium text-slate-500">
              <div className="flex items-center gap-6">
                 <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors group">
                    <div className="p-1 bg-[var(--color-primary)]/10 rounded-full group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                        <Phone className="w-3 h-3 text-[var(--color-primary)] group-hover:text-white" />
                    </div>
                    <span className="font-bold tracking-wide text-slate-700 group-hover:text-[var(--color-primary)] transition-colors">{siteConfig.contact.phone}</span>
                 </a>
                 <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors group">
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
                    <span>{siteConfig.contact.email}</span>
                 </a>
              </div>
              <div className="flex items-center gap-6 relative z-50">
                 <Link href="/karriere" className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-all group">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                    </span>
                    <span className="font-bold group-hover:underline decoration-[var(--color-accent)] underline-offset-4">Jobs & Karriere</span>
                 </Link>
                 <div className="w-px h-3 bg-slate-200" />
                 <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <MapPin className="w-3 h-3" /> {siteConfig.contact.address}
                 </div>
                 <div className="scale-90 origin-right ml-2 relative z-[100] opacity-90 hover:opacity-100 transition-opacity">
                    <GoogleTranslator elementId="google_translate_desktop" />
                 </div>
              </div>
           </div>
        </div>

        {/* 2. MAIN NAVIGATION ROW */}
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            

           {/* LOGO */}
            <Link href="/" className="relative z-50 block shrink-0" onClick={closeMenu}>
                
                {/* A. MOBILE LOGO */}
                <DalasLogo 
                  // NEU: Hier übergeben wir den Scroll-Status
                  scrolled={scrolled}
                  className={cn(
                    "lg:hidden transition-all duration-300 h-auto",
                    scrolled ? "w-44" : "w-48"
                  )}
                />

                {/* B. DESKTOP LOGO */}
                <DalasLogo 
                  // NEU: Hier auch
                  scrolled={scrolled}
                  className={cn(
                    "hidden lg:block transition-all duration-300 ease-in-out h-auto",
                    scrolled ? "w-48" : "w-60" 
                  )}
                />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8">
                <nav className="flex items-center gap-2">
                  {siteConfig.nav.map((item) => (
                      <div key={item.label} className="relative group">
                        <Link href={item.href || "#"} className={cn("flex items-center gap-1 text-[15px] px-3 py-2 rounded-lg transition-all duration-300", isActive(item.href) ? "text-[var(--color-primary)] font-extrabold" : "font-medium text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50")}>
                            {item.label}
                            {isActive(item.href) && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)] block" />}
                            {item.items && <ChevronDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />}
                        </Link>
                        {item.items && (
                             <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                               <div className="w-64 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-2 ring-1 ring-slate-100 overflow-hidden">
                                 {item.items.map((subItem) => (
                                   <Link key={subItem.href} href={subItem.href} className={cn("block px-4 py-3 text-[14px] rounded-xl transition-all font-bold flex items-center justify-between group/link", isActive(subItem.href) ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]" : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]")}>
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
                    <Button className="h-12 px-8 text-[15px] font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5 transition-all duration-300">
                        Beratung anfordern
                    </Button>
                  </Link>
                </div>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex items-center gap-2.5 lg:hidden">
               <Link 
                  href="/kontakt"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  aria-label="Nachricht schreiben"
               >
                  <Mail className="w-5 h-5 stroke-[1.5]" />
               </Link>

               <a 
                  href={`tel:${siteConfig.contact.phone}`} 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  aria-label="Anrufen"
               >
                  <Phone className="w-5 h-5 stroke-[1.5]" />
               </a>

               <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-white border border-transparent shadow-md active:scale-95 transition-all hover:bg-[var(--color-primary-hover)]"
                  aria-label="Menü öffnen"
               >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
               </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE IDENTITY BAR - CLEAN LOOK */}
        <div className={cn(
            // ANPASSUNG: 'border-t border-slate-100' entfernt -> Keine Linie mehr
            // ANPASSUNG: 'bg-white/95' statt 'bg-slate-50/90' -> Weißer Hintergrund
            "lg:hidden w-full flex items-center justify-between text-xs font-bold text-slate-600 transition-all duration-300 gap-4",
            "bg-white/95 backdrop-blur-sm py-3 px-4 shadow-sm", // shadow-sm statt inner für leichte Tiefe
            scrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        )}>
             <Link href="/ueber-uns" className="flex items-center gap-2 group active:scale-95 transition-transform flex-1 min-w-0">
                <Ambulance className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                <span className="tracking-tight text-[var(--color-primary-deep)] uppercase text-[10px] font-black truncate">
                    Ambulanter Pflegedienst 
                </span>
             </Link>
             
             <div className="w-px h-3 bg-slate-200 shrink-0" />

             <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 group active:scale-95 transition-transform flex-1 min-w-0 justify-end">
                <Mail className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                <span className="tracking-tight truncate">{siteConfig.contact.email}</span>
             </a>
        </div>

      </header>
      
      {/* PLATZHALTER */}
      <div className={cn("w-full bg-transparent pointer-events-none transition-all", scrolled ? "h-[75px] lg:h-[130px]" : "h-[125px] lg:h-[130px]")} aria-hidden="true" />

      {/* MOBILE MENU */}
      {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[40] bg-slate-50/95 backdrop-blur-xl pt-36 px-4 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-6 pb-24">
               
               <div className="flex flex-col border-b border-slate-200 pb-4">
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                     {greeting === "Guten Abend" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />} {greeting}
                  </span>
                  <span className="font-black text-3xl text-slate-900 tracking-tight">Menü</span>
               </div>
               
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                   <div className="flex-shrink-0 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3 h-3 text-[var(--color-accent)] fill-[var(--color-accent)]" /> Top MDK-Note
                   </div>
                   <div className="flex-shrink-0 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-[var(--color-primary)]" /> Alle Kassen
                   </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <Link href="/kontakt" onClick={closeMenu} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-98 transition-transform">
                     <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]"><Mail className="w-5 h-5" /></div>
                     <span className="text-sm font-bold text-slate-900">Kontakt</span>
                  </Link>
                  <a href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-98 transition-transform">
                     <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-[var(--color-primary)]"><MessageCircle className="w-5 h-5" /></div>
                     <span className="text-sm font-bold text-slate-900">WhatsApp</span>
                  </a>
               </div>

               <div onClick={handleOpenConfigurator} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 shadow-sm active:scale-98 transition-transform cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm"><HelpCircle className="w-5 h-5" /></div>
                  <div>
                     <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">Pflege-Wegweiser</div>
                     <div className="text-sm font-bold text-slate-900">Was steht mir zu?</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-[var(--color-primary)]" />
               </div>

               <nav className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2">
                 {siteConfig.nav.map((item) => (
                   <div key={item.label} className="border-b border-slate-50 last:border-0">
                      {item.items ? (
                        <details className="group">
                           <summary className="flex justify-between items-center p-4 text-base font-bold text-slate-800 cursor-pointer list-none select-none hover:bg-slate-50 rounded-xl transition-colors">
                              {item.label} <ChevronDown className="w-5 h-5 text-slate-300 group-open:rotate-180 transition-transform"/>
                           </summary>
                           <div className="px-4 pb-3 space-y-1 animate-in slide-in-from-top-1 duration-200">
                              {item.href && (
                                <Link href={item.href} onClick={closeMenu} className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm py-3 px-3 bg-[var(--color-primary)]/5 rounded-xl">
                                   <ArrowUpRight className="w-4 h-4" /> Zur Übersicht
                                </Link>
                              )}
                              {item.items.map(sub => (
                                 <Link key={sub.href} href={sub.href} onClick={closeMenu} className="block text-slate-600 py-3 px-3 rounded-xl hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">
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
               
               <Link href="/karriere" onClick={closeMenu} className="flex items-center justify-between p-1 pr-4 bg-[var(--color-primary)] text-white rounded-2xl shadow-lg shadow-[var(--color-primary)]/20 active:scale-98 transition-transform">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white"><Briefcase className="w-5 h-5" /></div>
                     <span className="font-bold text-sm">Jobs & Karriere</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-70" />
               </Link>

               <div className="flex justify-center pt-4">
                  <GoogleTranslator elementId="google_translate_mobile_menu" buttonClassName="bg-white border border-slate-200 text-slate-500 text-xs h-8 px-4 rounded-full shadow-sm" />
               </div>

            </div>
          </div>
      )}
    </>
  );
}