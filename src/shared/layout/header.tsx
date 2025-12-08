"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDown, X, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Home, ShieldCheck, LayoutGrid, Sparkles, Briefcase, Navigation, Sun, Moon, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import { GoogleTranslator } from "@/shared/utils/google-translator";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [greeting, setGreeting] = useState("Willkommen");
  const pathname = usePathname();
  const router = useRouter();

  const googleMapsUrl = `http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}`;

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
      {/* ========================================================= */}
      {/* HEADER CONTAINER (Desktop)                                */}
      {/* ========================================================= */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans",
          scrolled 
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-2 shadow-sm" 
            : "bg-white border-b border-transparent py-4"
        )}
      >
        
        {/* TOP BAR (Desktop Only) */}
        <div className={cn(
          "hidden lg:block container mx-auto px-6 transition-all duration-500 ease-in-out overflow-hidden",
          scrolled ? "max-h-0 opacity-0 mb-0" : "max-h-12 opacity-100 mb-2"
        )}>
           <div className="flex justify-between items-center text-xs font-medium text-slate-500 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-6">
                 <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors group">
                    <Phone className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    <span className="font-bold tracking-wide">{siteConfig.contact.phone}</span>
                 </a>
                 <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors group">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    <span>{siteConfig.contact.email}</span>
                 </a>
              </div>
              <div className="flex items-center gap-5 relative z-50">
                 <Link href="/karriere" className="flex items-center gap-2 text-[var(--color-primary)] hover:underline decoration-[var(--color-accent)] underline-offset-4 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="font-bold">Jobs & Karriere</span>
                 </Link>
                 <div className="w-px h-3 bg-slate-200" />
                 <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" /> {siteConfig.contact.address}
                 </div>
                 <div className="scale-90 origin-right ml-2 relative z-[60]">
                    <GoogleTranslator elementId="google_translate_desktop" buttonClassName="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] h-6 px-2 rounded hover:border-[var(--color-primary)]/30 transition-colors" />
                 </div>
              </div>
           </div>
        </div>

        {/* MAIN NAVIGATION ROW */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group relative z-50" onClick={closeMenu}>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                    className={cn("text-[var(--color-primary)] transition-all duration-300 drop-shadow-sm", scrolled ? "w-8 h-8" : "w-10 h-10")}
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" className="group-hover:fill-[var(--color-primary)]/10 transition-colors" />
                    <path d="M12 5.33v.01M12 17.5l-1.45-1.32C5.4 11.65 2 8.58 2 4.8 2 1.73 4.41 -0.68 7.5 1.95 9.08 3.32 10.67 5.15 12 6.4c1.33-1.25 2.92-3.08 4.5-4.45C19.59 -0.68 22 1.73 22 4.8c0 3.78-3.4 6.85-8.55 11.38L12 17.5Z" transform="translate(0, 4) scale(0.7)" fill="currentColor" stroke="none" />
                  </svg>
                  <Sparkles className="absolute -top-1 -right-1 w-2.5 h-2.5 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <div className="flex flex-col justify-center">
                   <span className={cn("font-bold tracking-tight text-slate-900 leading-none transition-all", scrolled ? "text-xl" : "text-2xl")}>
                     {siteConfig.name}
                   </span>
                   {/* Auf Mobile ausgeblendet */}
                   <span className={cn("text-[9px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold hidden lg:block transition-all origin-left", scrolled ? "opacity-0 h-0 scale-0" : "opacity-100 h-auto scale-100 pt-0.5")}>
                     Ambulanter Pflegedienst
                   </span>
                </div>
            </Link>

            {/* DESKTOP NAV ITEMS */}
            <div className="hidden lg:flex items-center gap-6">
                <nav className="flex items-center gap-1">
                  {siteConfig.nav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <div key={item.label} className="relative group">
                        <Link href={item.href || "#"} className={cn("flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-full transition-all duration-300", active ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5" : "text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50")}>
                            {item.label} 
                            {item.items && <ChevronDown className="h-3 w-3 opacity-50 group-hover:rotate-180 transition-transform" />}
                        </Link>
                        
                        {/* Dropdown Desktop */}
                        {item.items && (
                             <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                               <div className="w-56 rounded-2xl bg-white shadow-xl border border-slate-100 p-2 ring-1 ring-slate-100 overflow-hidden">
                                 {item.items.map((subItem) => (
                                   <Link key={subItem.href} href={subItem.href} className={cn("block px-4 py-2.5 text-sm rounded-xl transition-colors font-bold flex items-center justify-between group/link", isActive(subItem.href) ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]" : "text-slate-600 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]")}>
                                     {subItem.label}
                                   </Link>
                                 ))}
                               </div>
                             </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
                <div className="ml-2">
                  <Link href="/kontakt">
                    <Button className="h-11 px-6 text-sm font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-lg shadow-[var(--color-primary)]/20 rounded-xl hover:-translate-y-0.5 transition-all">
                        Beratung anfordern
                    </Button>
                  </Link>
                </div>
            </div>

            {/* MOBILE: Nur Translator hier oben, Rest ist unten */}
            <div className="lg:hidden">
               <GoogleTranslator elementId="google_translate_mobile_header" buttonClassName="bg-slate-50 border border-slate-200 text-slate-500 text-[10px] h-7 px-2 rounded-lg" />
            </div>

          </div>
        </div>
      </header>


      {/* ========================================================= */}
      {/* MOBILE FULLSCREEN MENU (Das Schöne mit der Karte!)        */}
      {/* ========================================================= */}
      {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-slate-50/95 backdrop-blur-xl pt-safe pb-32 px-4 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            
            {/* Header: Greeting & Close */}
            <div className="flex justify-between items-center mb-6 pt-4 sticky top-0 bg-transparent z-10">
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                     {greeting === "Guten Abend" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />} {greeting}
                  </span>
                  <span className="font-black text-2xl text-slate-900 tracking-tight">Menü</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-3 bg-white shadow-md border border-slate-100 rounded-full text-slate-500 hover:text-slate-900 active:scale-95 transition-all">
                 <X className="w-6 h-6" />
               </button>
            </div>
            
            <div className="space-y-6 pb-24">
               
               {/* 1. THE MAP WIDGET (Wieder da!) */}
               <div className="relative w-full h-40 rounded-[1.5rem] bg-slate-200 overflow-hidden shadow-sm border border-slate-200 group">
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px), radial-gradient(#94a3b8 2px, transparent 2px)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <div className="relative">
                        <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full animate-ping opacity-75"></div>
                        <MapPin className="w-8 h-8 text-[var(--color-primary)] relative z-10 fill-white" />
                     </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                     <div className="text-white">
                        <div className="text-[10px] font-bold uppercase opacity-80">Standort</div>
                        <div className="text-sm font-bold leading-tight max-w-[150px]">{siteConfig.contact.address}</div>
                     </div>
                     <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition-all">
                        <Navigation className="w-3 h-3" /> Route
                     </a>
                  </div>
               </div>

               {/* 2. Quick Actions Row */}
               <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${siteConfig.contact.phone}`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-98 transition-transform">
                     <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]"><Phone className="w-5 h-5" /></div>
                     <span className="text-sm font-bold text-slate-900">Anrufen</span>
                  </a>
                  <a href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-98 transition-transform">
                     <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><MessageCircle className="w-5 h-5" /></div>
                     <span className="text-sm font-bold text-slate-900">WhatsApp</span>
                  </a>
               </div>

                {/* 3. Configurator Banner */}
               <div onClick={handleOpenConfigurator} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 shadow-sm active:scale-98 transition-transform cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm"><HelpCircle className="w-5 h-5" /></div>
                  <div>
                     <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">Pflege-Wegweiser</div>
                     <div className="text-sm font-bold text-slate-900">Was steht mir zu?</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-[var(--color-primary)]" />
               </div>

               {/* 4. Navigation List */}
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
               
               {/* 5. Karriere Link */}
               <Link href="/karriere" onClick={closeMenu} className="flex items-center justify-between p-1 pr-4 bg-[var(--color-primary)] text-white rounded-2xl shadow-lg shadow-[var(--color-primary)]/20 active:scale-98 transition-transform">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white"><Briefcase className="w-5 h-5" /></div>
                     <span className="font-bold text-sm">Jobs & Karriere</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-70" />
               </Link>

            </div>
          </div>
      )}


      {/* ========================================================= */}
      {/* MOBILE STICKY BOTTOM NAV (Final: Text grün, Icon normal)  */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 pb-[env(safe-area-inset-bottom)] pointer-events-none">
        
        {/* Der "Dock" Hintergrund */}
        <div className="pointer-events-auto absolute bottom-0 left-0 w-full h-[70px] bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"></div>

        <div className="relative pointer-events-auto grid grid-cols-5 h-[70px] items-end pb-1.5 px-2">
            
            {/* 1. START */}
            <Link href="/" className={cn("flex flex-col items-center justify-end pb-2 gap-1 h-full transition-all active:scale-90", pathname === "/" ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600")}>
              <Home className={cn("w-6 h-6 transition-transform", pathname === "/" && "fill-current -translate-y-0.5")} />
              <span className="text-[10px] font-bold">Start</span>
            </Link>
            
            {/* 2. PFLEGE */}
            <Link href="/leistungen" className={cn("flex flex-col items-center justify-end pb-2 gap-1 h-full transition-all active:scale-90", pathname?.startsWith("/leistungen") ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600")}>
              <ShieldCheck className={cn("w-6 h-6 transition-transform", pathname?.startsWith("/leistungen") && "fill-current -translate-y-0.5")} />
              <span className="text-[10px] font-bold">Pflege</span>
            </Link>
            
            {/* 3. CENTER BUTTON ("Anruf" - Pulsierend) */}
            <div className="relative h-full flex justify-center items-end">
               <a href={`tel:${siteConfig.contact.phone}`} className="relative group -top-5 active:scale-95 transition-transform duration-200">
                  {/* Outer Glow (Pulsierend) */}
                  <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-md animate-pulse"></div>
                  
                  {/* The Button */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-full flex items-center justify-center text-white shadow-xl shadow-[var(--color-primary)]/30 border-4 border-white relative z-10">
                     <Phone className="w-6 h-6 fill-current" />
                  </div>

                  {/* Label (Jetzt wieder sichtbar) */}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--color-primary)] bg-white/90 px-2 py-0.5 rounded-md shadow-sm border border-slate-100 whitespace-nowrap">
                     Anruf
                  </span>
               </a>
            </div>
            
            {/* 4. KONTAKT */}
            <Link href="/kontakt" className={cn("flex flex-col items-center justify-end pb-2 gap-1 h-full transition-all active:scale-90", pathname === "/kontakt" ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600")}>
               <Mail className={cn("w-6 h-6 transition-transform", pathname === "/kontakt" && "fill-current -translate-y-0.5")} />
              <span className="text-[10px] font-bold">Kontakt</span>
            </Link>
            
            {/* 5. MENU */}
            <button onClick={() => setIsOpen(!isOpen)} className={cn("flex flex-col items-center justify-end pb-2 gap-1 h-full transition-all active:scale-90", isOpen ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600")}>
               {isOpen ? <X className="w-6 h-6" /> : <LayoutGrid className="w-6 h-6" />}
              <span className="text-[10px] font-bold">Menü</span>
            </button>
        </div>
      </div>
    </>
  );
}