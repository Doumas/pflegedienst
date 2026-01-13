"use client";

import { Phone } from "lucide-react";
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
        "w-full bg-[var(--color-primary)] text-white transition-all duration-500 ease-in-out relative z-30 border-b border-white/10",
        (scrolled && !isOpen) ? "h-0 opacity-0 overflow-hidden" : "h-9 opacity-100"
    )}>
        {/* ÄNDERUNG: 'container mx-auto' entfernt. Stattdessen 'w-full px-6 lg:px-12' */}
        <div className="w-full px-6 lg:px-12 h-full flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
            
            {/* LINKS */}
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="w-3 h-3" />
                <span>{siteConfig.contact.phone}</span>
            </a>

            {/* RECHTS */}
            <Link href="/karriere" className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse mr-1" />
                <span>Karriere</span>
            </Link>
        </div>
    </div>
  );
}