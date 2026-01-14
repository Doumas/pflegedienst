"use client";

import { Phone, ArrowRight } from "lucide-react"; 
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/shared/utils/cn";

interface HeaderTopBarProps {
  scrolled: boolean;
  isOpen: boolean;
}

export function HeaderTopBar({ scrolled, isOpen }: HeaderTopBarProps) {
  return (
    <div className={cn(
        "w-full transition-all duration-500 ease-in-out relative z-30 border-b",
        
        // --- HIER IST DIE LOGIK FÜR DEN FARBWECHSEL ---
        isOpen 
            ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]/10" // Menü offen: Weißer BG, Blaue Schrift
            : "bg-[var(--color-primary)] text-white border-white/10",               // Normal: Blauer BG, Weiße Schrift

        // Ausblenden beim Scrollen (aber NICHT wenn Menü offen ist)
        (scrolled && !isOpen) ? "h-0 opacity-0 overflow-hidden border-none" : "h-11 opacity-100"
    )}>
        <div className="w-full px-6 lg:px-12 h-full flex justify-between items-center">
            
            {/* LINKS: TELEFON */}
            <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity group"
            >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span className="relative top-[1px]">{siteConfig.contact.phone}</span>
            </a>

            {/* RECHTS: KARRIERE */}
            <Link 
                href="/karriere" 
                className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity group"
            >
                {/* Pulsierender Punkt */}
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                </span>
                
                <span className="relative top-[1px]">Karriere</span>
            </Link>
        </div>
    </div>
  );
}