"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDown, X, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Sun, Moon, Sparkles, Menu, Briefcase, Compass, Home } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import { GoogleTranslator } from "@/shared/utils/google-translator";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { motion, AnimatePresence } from "framer-motion"; 
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { useActiveSection } from "@/shared/context/active-section-context";

// --- LOGO ICON (Herz/Haus) ---
const LogoIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
        <path d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z" />
    </svg>
);

// --- HEADER HINTERGRUND ANIMATION ---
function HeaderBackgroundAnimation({ show }: { show: boolean }) {
    let context = null;
    try { context = useActiveSection(); } catch (e) { /* Ignore */ }
    
    const ActiveIcon = context?.activeIcon || LogoIcon;

    if (!show) return null;

    // FIX: Wir casten ActiveIcon zu 'any', um den Zugriff auf displayName/name 
    // für TypeScript zu erlauben, ohne dass der Build fehlschlägt.
    const iconKey = typeof ActiveIcon === 'function' 
        ? ((ActiveIcon as any).displayName || (ActiveIcon as any).name || "custom-icon") 
        : "header-bg";

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={iconKey}
                    className="absolute inset-0 flex items-center justify-center text-[var(--color-primary)]"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ 
                        opacity: 0.03, 
                        scale: 1.4, 
                        rotate: 0,
                        transition: { duration: 1.2, ease: "easeOut" } 
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                    <ActiveIcon strokeWidth={1} className="w-[600px] h-[600px]" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
        </div>
    );
}

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
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Guten Morgen");
    else if (hour >= 12 && hour < 18) setGreeting("Guten Tag");
    else setGreeting("Guten Abend");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll Lock, aber Header bleibt bedienbar
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 font-sans",
          (scrolled || isOpen) ? "shadow-sm bg-white" : "" 
        )}
      >
        
        <HeaderBackgroundAnimation show={scrolled || isOpen} />

        {/* ========================================================= */}
        {/* 1. TOP BAR (TEAL)                                         */}
        {/* ========================================================= */}
        <div className={cn(
            "bg-[var(--color-primary)] text-white transition-all duration-500 ease-in-out overflow-hidden relative z-20",
            // Bleibt sichtbar wenn Menü offen (isOpen) ODER nicht gescrollt
            (scrolled && !isOpen) ? "max-h-0 py-0 opacity-0" : "max-h-16 py-2.5 opacity-100"
        )}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
                <div className="flex items-center gap-6 lg:gap-10">
                    <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center gap-3 hover:text-white transition-colors">
                        <div className="w-9 h-9 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                            <motion.div animate={{ rotate: [0, -15, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                                <Phone className="w-4 h-4 fill-current" /> 
                            </motion.div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider opacity-90 mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">24h Pflege-Notruf</span>
                            <span className="text-[15px] font-black tracking-wide">{siteConfig.contact.phone}</span>
                        </div>
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="hidden md:flex items-center gap-2 group opacity-70 hover:opacity-100 hover:text-white transition-all">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs font-bold">{siteConfig.contact.email}</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/karriere" className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-all group">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                            </span>
                            <span>Wir stellen ein</span>
                        </Link>
                        <div className="flex items-center gap-1.5 opacity-70 text-xs font-bold">
                            <MapPin className="w-3.5 h-3.5" /> Frankfurt & Umland
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN HEADER (NAVBAR)                                   */}
        {/* ========================================================= */}
        <div className={cn(
            "container mx-auto px-4 md:px-6 transition-all duration-300 relative z-20",
            (scrolled || isOpen) ? "py-2" : "py-4 lg:py-5"
        )}>
          <div className="flex items-center justify-between">
            
            <Link href="/" className="relative z-[60] block shrink-0" onClick={closeMenu}>
                <DalasLogo 
                  scrolled={scrolled || isOpen}
                  className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-auto origin-left",
                    (scrolled || isOpen) ? "w-36 lg:w-56" : "w-44 lg:w-72" 
                  )}
                />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8">
                {/* ... (Desktop Nav Code bleibt gleich) ... */}
                <nav className="flex items-center gap-1">
                  {siteConfig.nav.map((item) => (
                      <div key={item.label} className="relative group">
                        <Link href={item.href || "#"} className={cn("flex items-center gap-1 text-[16px] px-4 py-2 rounded-full transition-all duration-300 font-bold", isActive(item.href) ? "text-[var(--color-primary)] bg-[var(--color-secondary)]" : "text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50")}>
                            {item.label}
                            {item.items && <ChevronDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />}
                        </Link>
                        {item.items && (
                             <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                               <div className="w-64 rounded-[1.5rem] bg-white shadow-xl border border-slate-100 p-2 ring-1 ring-black/5 overflow-hidden">
                                 {item.items.map((subItem) => (
                                   <Link key={subItem.href} href={subItem.href} className={cn("block px-4 py-3 text-[14px] rounded-xl transition-all font-bold flex items-center justify-between group/link", isActive(subItem.href) ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]" : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]")}>
                                     {subItem.label} 
                                     <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--color-accent)]" />
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
                    <Button size="lg" className="font-bold text-[14px] px-6 h-11 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-full shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        Beratung anfordern
                    </Button>
                  </Link>
                </div>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            {/* Z-Index 60, damit er ÜBER dem Overlay liegt und bedienbar bleibt */}
            <div className="lg:hidden relative z-[60]">
               <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className={cn(
                      "flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 shadow-md",
                      isOpen 
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/50" 
                        : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] border border-transparent" 
                  )}
                  aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
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
          scrolled ? "h-[70px]" : "h-[120px] lg:h-[135px]" 
      )} aria-hidden="true" />

      {/* ========================================================= */}
      {/* 3. MOBILE MENU OVERLAY                                    */}
      {/* ========================================================= */}
      <AnimatePresence>
      {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            // HIER IST DER FIX: pt-[160px] sorgt dafür, dass der Inhalt erst unter dem Header beginnt
            // z-40 liegt unter dem Header (z-999), damit der Header bedienbar bleibt
            className="lg:hidden fixed inset-0 z-[40] bg-[#fffbf7] pt-[160px] px-4 pb-10 overflow-y-auto"
          >
            
            <AnimatedBackground icon={Compass} variant="section" color="text-[var(--color-primary)]" />

            <div className="relative z-10 flex flex-col min-h-full">
               
               {/* 1. Greeting Area */}
               <div className="flex flex-col items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-script text-[var(--color-accent)] text-4xl flex items-center gap-3 mb-2"
                  >
                     {greeting}
                     {greeting === "Guten Abend" 
                        ? <Moon className="w-6 h-6 text-slate-400 fill-slate-400/20" /> 
                        : <Sun className="w-6 h-6 text-amber-400 fill-amber-400/20" />
                     } 
                  </motion.div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Willkommen bei Dalas</p>
               </div>
               
               {/* 2. Quick Actions */}
               <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link href="/kontakt" onClick={closeMenu} className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-95 transition-all">
                     <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                        <Mail className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-slate-900">Nachricht</span>
                  </Link>
                  <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-95 transition-all">
                     <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                        <Phone className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-slate-900">Anrufen</span>
                  </a>
               </div>

               {/* 3. Pflege Wegweiser */}
               <div onClick={handleOpenConfigurator} className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--color-primary)]/20 shadow-md active:scale-98 transition-transform cursor-pointer mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent opacity-50" />
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-sm relative z-10 shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="relative z-10 flex-1">
                     <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-0.5">Schnell-Check</div>
                     <div className="text-lg font-black text-slate-900 leading-tight">Pflege-Wegweiser</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--color-accent)] relative z-10 group-hover:translate-x-1 transition-transform" />
               </div>

               {/* 4. Navigation Links */}
               <nav className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-6">
                 {siteConfig.nav.map((item) => (
                   <div key={item.label} className="border-b border-slate-50 last:border-0">
                      {item.items ? (
                        <details className="group">
                           <summary className="flex justify-between items-center p-4 text-[16px] font-bold text-slate-800 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors">
                              {item.label} <ChevronDown className="w-5 h-5 text-slate-300 group-open:rotate-180 transition-transform group-open:text-[var(--color-primary)]"/>
                           </summary>
                           <div className="px-3 pb-3 space-y-1 bg-slate-50/50">
                              {item.href && (
                                <Link href={item.href} onClick={closeMenu} className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-xs py-3 px-4 bg-white rounded-xl border border-slate-100 shadow-sm mb-2">
                                   <ArrowUpRight className="w-3.5 h-3.5" /> Zur Hauptseite "{item.label}"
                                </Link>
                              )}
                              {item.items.map(sub => (
                                 <Link key={sub.href} href={sub.href} onClick={closeMenu} className="block text-slate-600 py-3 px-4 rounded-xl hover:bg-white hover:shadow-sm transition-all text-[14px] font-medium">
                                    {sub.label}
                                 </Link>
                              ))}
                           </div>
                        </details>
                      ) : (
                        <Link href={item.href || "#"} onClick={closeMenu} className="block p-4 text-[16px] font-bold text-slate-800 hover:bg-slate-50 transition-colors">{item.label}</Link>
                      )}
                   </div>
                 ))}
               </nav>
               
               {/* 5. Footer Actions */}
               <div className="mt-auto space-y-4">
                   <Link href="/karriere" onClick={closeMenu} className="flex items-center justify-between p-2 pr-4 bg-[var(--color-primary)] text-white rounded-2xl shadow-lg active:scale-98 transition-transform">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white"><Briefcase className="w-6 h-6" /></div>
                         <div className="flex flex-col leading-none">
                            <span className="font-bold text-base">Karriere</span>
                            <span className="text-[11px] text-white/80 uppercase font-bold mt-1">Wir stellen ein!</span>
                         </div>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-80" />
                   </Link>

                   <div className="flex justify-center pt-2">
                      <GoogleTranslator elementId="google_translate_mobile_menu" buttonClassName="bg-white border border-slate-200 text-slate-500 text-[11px] h-9 px-5 rounded-full shadow-sm font-bold uppercase tracking-wide hover:bg-slate-50" />
                   </div>
               </div>

            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}