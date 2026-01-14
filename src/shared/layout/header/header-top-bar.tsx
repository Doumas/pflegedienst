"use client";

import { Phone, ArrowRight } from "lucide-react"; // ArrowRight optional für Karriere
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
        // ÄNDERUNG: h-11 statt h-9 für mehr Eleganz
        "w-full bg-[var(--color-primary)] text-white transition-all duration-500 ease-in-out relative z-30 border-b border-white/10",
        (scrolled && !isOpen) ? "h-0 opacity-0 overflow-hidden" : "h-11 opacity-100"
    )}>
        {/* Padding analog zum Rest (px-6 lg:px-12) */}
        <div className="w-full px-6 lg:px-12 h-full flex justify-between items-center">
            
            {/* LINKS: TELEFON */}
            {/* ÄNDERUNG: text-xs (12px) statt 10px, tracking etwas weiter für den Edellook */}
            <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase hover:text-white/80 transition-colors group"
            >
                {/* Icon etwas kleiner als Text für Balance */}
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span className="relative top-[1px]">{siteConfig.contact.phone}</span>
            </a>

            {/* RECHTS: KARRIERE */}
            <Link 
                href="/karriere" 
                className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase hover:text-white/80 transition-colors group"
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