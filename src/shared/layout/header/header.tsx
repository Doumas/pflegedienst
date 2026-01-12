"use client";

import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import { HeaderTopBar } from "./header-top-bar";
import { HeaderMain } from "./header-main";
import { HeaderMobileMenu } from "./header-mobile-menu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
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
          "fixed top-0 left-0 right-0 z-[999] transition-colors duration-500 ease-in-out font-sans",
          
          // 1. ZUSTAND: Mobile Menü ist OFFEN -> Hintergrund Creme (passend zum Menü)
          isOpen 
            ? "bg-[var(--color-secondary)] border-b border-[var(--color-border-soft)]"
            
            // 2. ZUSTAND: Gescrollt -> Hintergrund GRÜN (Primary) & Weißer Rand unten
            : scrolled 
                ? "bg-[var(--color-primary)] border-b border-white/10 shadow-md"
                
                // 3. ZUSTAND: Ganz oben -> Transparent
                : "bg-transparent border-b border-[var(--color-primary-deep)]/5"
        )}
      >
        <HeaderTopBar scrolled={scrolled} isOpen={isOpen} />
        
        <HeaderMain 
            scrolled={scrolled} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            closeMenu={closeMenu} 
        />
      </header>
      
      <HeaderMobileMenu 
        isOpen={isOpen} 
        closeMenu={closeMenu} 
      />
    </>
  );
}