"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

interface HeaderMainProps {
  scrolled: boolean;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  closeMenu: () => void;
}

export function HeaderMain({ scrolled, isOpen, setIsOpen, closeMenu }: HeaderMainProps) {
  const pathname = usePathname();

  const isActive = (href: string | undefined) => {
    if (!href || !pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navTextColor = (isOpen) 
      ? "text-[var(--color-primary-deep)]" 
      : (scrolled ? "text-white" : "text-[var(--color-primary-deep)]");
      
  const navHoverColor = (isOpen) 
      ? "hover:text-[var(--color-primary)]" 
      : (scrolled ? "hover:text-white/80" : "hover:text-[var(--color-primary)]");

  return (
    // ÄNDERUNG: 'container mx-auto' entfernt. 'w-full px-6 lg:px-12' für volle Breite.
    <div className="w-full px-6 lg:px-12 relative z-20">
      <div className="flex items-center justify-between h-20 lg:h-24 transition-all duration-300">
        
        {/* LOGO */}
        <Link href="/" className="relative z-[60] block shrink-0" onClick={closeMenu}>
            <div className="w-[130px] md:w-[160px] transition-all duration-300"> 
                <DalasLogo 
                  variant="default"
                  scrolled={scrolled} 
                  className="origin-left"
                />
            </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {siteConfig.nav.map((item) => (
                  <div key={item.label} className="relative group">
                    <Link 
                        href={item.href || "#"} 
                        className={cn(
                            "flex items-center gap-1 text-[13px] py-2 transition-all duration-300 font-bold tracking-tight uppercase", 
                            isActive(item.href) 
                                ? (scrolled ? "text-white underline underline-offset-4 decoration-2" : "text-[var(--color-primary)]") 
                                : cn(navTextColor, navHoverColor)
                        )}
                    >
                        {item.label}
                        {item.items && <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-all" />}
                    </Link>

                    {/* Dropdown */}
                    {item.items && (
                         <div className="absolute top-full right-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                           <div className="w-64 bg-white border border-[var(--color-primary-deep)]/10 p-0 shadow-2xl">
                             {item.items.map((subItem) => (
                               <Link key={subItem.href} href={subItem.href} className="block px-6 py-4 text-[13px] font-bold text-[var(--color-primary-deep)] border-b border-slate-100 last:border-0 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors uppercase">
                                 {subItem.label} 
                               </Link>
                             ))}
                           </div>
                         </div>
                    )}
                  </div>
              ))}
            </nav>
            
            {/* CTA BUTTON */}
            <Link href="/kontakt">
                <button 
                    className={cn(
                        "px-8 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors rounded-none shadow-sm",
                        scrolled 
                            ? "bg-white text-[var(--color-primary)] hover:bg-slate-100" 
                            : "bg-[var(--color-primary-deep)] text-white hover:bg-[var(--color-primary)]"
                    )}
                >
                    Beratung
                </button>
            </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden relative z-[60]">
           <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={cn(
                  "flex items-center gap-3 px-4 py-2.5 transition-all duration-300 rounded-none shadow-sm border",
                  isOpen 
                    ? "bg-transparent border-transparent text-[var(--color-primary-deep)]"
                    : scrolled 
                        ? "bg-transparent border-white/30 text-white hover:bg-white/10"
                        : "bg-white border-[var(--color-primary-deep)]/10 text-[var(--color-primary-deep)]"
              )}
           >
              <span className="text-[11px] font-bold uppercase tracking-widest">
                  {isOpen ? "Schließen" : "Menü"}
              </span>
              
              {isOpen ? (
                 <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                 <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
           </button>
        </div>
      </div>
    </div>
  );
}