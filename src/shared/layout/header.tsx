"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDown, X, Phone, Mail, ArrowRight, Menu, Briefcase, Compass, LayoutGrid } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import { GoogleTranslator } from "@/shared/utils/google-translator";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { motion, AnimatePresence } from "framer-motion"; 
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { useActiveSection } from "@/shared/context/active-section-context";

// --- LOGO ICON FÜR DEN HINTERGRUND-EFFEKT ---
const LogoIcon = (props: any) => (
    <svg viewBox="0 0 150 130" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
         <path d="M50 90 C 10 65 -10 35 5 18 C 15 5 35 5 48 20 C 50 22 50 22 52 20 C 65 5 85 5 95 18 C 110 35 90 65 50 90 Z" />
         <g transform="translate(55, 42) scale(0.85)">
            <path d="M50 90 C 10 65 -10 35 5 18 C 15 5 35 5 48 20 C 50 22 50 22 52 20 C 65 5 85 5 95 18 C 110 35 90 65 50 90 Z" />
         </g>
    </svg>
);

// --- HEADER HINTERGRUND ANIMATION ---
function HeaderBackgroundAnimation({ show }: { show: boolean }) {
    let context = null;
    try { context = useActiveSection(); } catch (e) { /* Ignore */ }
    
    const ActiveIcon = context?.activeIcon || LogoIcon;

    if (!show) return null;

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
                    <ActiveIcon strokeWidth={2} className="w-[600px] h-[600px]" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md" />
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
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 font-sans",
          (scrolled || isOpen) 
            ? "shadow-sm border-b border-slate-100/50 py-2" 
            : "bg-transparent border-b border-transparent py-4"
        )}
      >
        
        <HeaderBackgroundAnimation show={scrolled || isOpen} />

        {/* 1. TOP BAR */}
        <div className={cn(
            "bg-[var(--color-primary)] text-white transition-all duration-500 ease-in-out overflow-hidden relative z-20",
            "mx-4 md:mx-6 lg:mx-8 rounded-b-2xl", 
            (scrolled && !isOpen) ? "max-h-0 py-0 opacity-0 mb-0" : "max-h-12 py-1.5 opacity-100 mb-2 shadow-lg shadow-[var(--color-primary)]/20"
        )}>
            <div className="px-4 flex justify-between items-center h-full text-xs font-medium">
                <div className="flex items-center gap-6">
                    <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center gap-2 hover:text-white transition-colors">
                        <div className="w-5 h-5 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Phone className="w-3 h-3 fill-current" /> 
                        </div>
                        <span className="font-bold tracking-wide">{siteConfig.contact.phone}</span>
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="hidden md:flex items-center gap-2 opacity-80 hover:opacity-100 transition-all">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{siteConfig.contact.email}</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/karriere" className="hidden lg:flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 hover:bg-white hover:text-[var(--color-primary)] transition-all group uppercase tracking-wider text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                        Wir stellen ein
                    </Link>
                </div>
            </div>
        </div>

        {/* 2. MAIN HEADER */}
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="flex items-center justify-between">
            
            <Link href="/" className="relative z-[60] block shrink-0" onClick={closeMenu}>
                <DalasLogo 
                  variant="default"
                  className={cn(
                    "transition-all duration-500 ease-out origin-left",
                    (scrolled || isOpen) ? "scale-90" : "scale-100"
                  )}
                />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                <nav className="flex items-center gap-1">
                  {siteConfig.nav.map((item) => (
                      <div key={item.label} className="relative group">
                        <Link 
                            href={item.href || "#"} 
                            className={cn(
                                "flex items-center gap-1 text-[15px] px-3 py-2 rounded-full transition-all duration-300 font-bold", 
                                isActive(item.href) 
                                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5" 
                                    : "text-slate-600 hover:text-[var(--color-accent)] hover:bg-white/50"
                            )}
                        >
                            {item.label}
                            {item.items && <ChevronDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all" />}
                        </Link>

                        {item.items && (
                             <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                               <div className="w-64 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-2 ring-1 ring-black/5 overflow-hidden">
                                 {/* Übersichtspunkt im Desktop Dropdown */}
                                 <Link 
                                    href={item.href || "#"} 
                                    className="block px-4 py-3 text-[14px] rounded-xl transition-all font-black flex items-center justify-between group/link bg-slate-50 text-[var(--color-primary)] mb-1"
                                 >
                                     Übersicht: {item.label}
                                     <LayoutGrid className="w-3.5 h-3.5" />
                                 </Link>
                                 <div className="h-px bg-slate-100 my-1 mx-2" />
                                 
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
                <div className="ml-2 pl-6 border-l border-slate-200 h-8 flex items-center">
                  <Link href="/kontakt">
                    <Button size="lg" className="font-bold text-[14px] px-6 h-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-full shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        Beratung anfordern
                    </Button>
                  </Link>
                </div>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="lg:hidden relative z-[60]">
               <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-sm",
                      isOpen 
                        ? "bg-slate-100 text-slate-600" 
                        : "bg-white text-[var(--color-primary)] border border-slate-100" 
                  )}
               >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
               </button>
            </div>
          </div>
        </div>

      </header>
      
      <div className={cn(
          "w-full bg-transparent pointer-events-none transition-all duration-300", 
          scrolled ? "h-[90px]" : "h-[120px]" 
      )} aria-hidden="true" />

      {/* 3. MOBILE MENU OVERLAY */}
      <AnimatePresence>
      {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed inset-0 z-[40] bg-[#fffbf7] pt-[140px] px-4 pb-10 overflow-y-auto"
          >
            <AnimatedBackground icon={Compass} variant="section" color="text-[var(--color-primary)]" />
            <div className="relative z-10 flex flex-col min-h-full">
               
               <div className="flex flex-col items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-script font-bold text-[var(--color-accent)] text-5xl flex items-center gap-3 mb-2"
                  >
                     {greeting}
                  </motion.div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Willkommen bei Dalas</p>
               </div>
               
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

               <nav className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-6">
                 {siteConfig.nav.map((item) => (
                   <div key={item.label} className="border-b border-slate-50 last:border-0">
                      {item.items ? (
                        <details className="group">
                           <summary className="flex justify-between items-center p-4 text-[16px] font-bold text-slate-800 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors">
                              {item.label}
                              <ChevronDown className="w-5 h-5 text-slate-300 transition-transform group-open:rotate-180 group-open:text-[var(--color-primary)]"/>
                           </summary>
                           <div className="px-3 pb-3 space-y-1 bg-slate-50/50">
                              {/* Übersichtspunkt im Mobile Dropdown */}
                              <Link 
                                href={item.href || "#"} 
                                onClick={closeMenu} 
                                className="block text-[var(--color-primary)] py-3 px-4 rounded-xl bg-white shadow-sm transition-all text-[14px] font-black flex items-center justify-between"
                              >
                                 Alle {item.label} im Überblick
                                 <LayoutGrid className="w-3.5 h-3.5" />
                              </Link>
                              
                              {item.items.map(sub => (
                                 <Link key={sub.href} href={sub.href} onClick={closeMenu} className="block text-slate-600 py-3 px-4 rounded-xl hover:bg-white hover:shadow-sm transition-all text-[14px] font-medium flex items-center gap-2">
                                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent)] opacity-50" /> {sub.label}
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