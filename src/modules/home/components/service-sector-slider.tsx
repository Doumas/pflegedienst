"use client";

import { SECTORS, SERVICES } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServiceSectorSlider() {
  return (
    <section className="w-full">
        
        {/* SLIDER 1: FACHBEREICHE (WEISS) */}
        <FadeIn>
            <ContentSlider 
                title={<span>Unsere <span className="text-[var(--color-primary)]">Fachbereiche</span></span>} 
                items={SECTORS} 
                id="sectors"
                bgColor="bg-white"
            />
        </FadeIn>

        {/* SLIDER 2: LEISTUNGEN (JETZT CREME) */}
        <FadeIn delay={0.2}>
            {/* Wrapper Div */}
            <div>
                <ContentSlider 
                    // Titeltext angepasst für hellen Hintergrund (Dunkel + Primary Highlight)
                    title={<span>Alle <span className="text-[var(--color-primary)]">Leistungen</span></span>} 
                    items={SERVICES} 
                    id="services"
                    // Hintergrund auf Creme geändert
                    bgColor="bg-[var(--color-secondary)]" 
                    // Textfarbe auf Dunkel geändert
                    textColor="text-[var(--color-text-main)]"
                />

                {/* LINK ZUR ÜBERSICHT */}
                {/* Hintergrund muss ebenfalls Creme sein */}
                <div className="w-full bg-[var(--color-secondary)] flex justify-center pb-24 -mt-1">
                    <Link 
                        href="/leistungen" 
                        // Button Styling angepasst: Primary Text & Border statt Weiß
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-primary)]/20 rounded-full text-[var(--color-primary)] text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                    >
                        Gesamtes Angebot ansehen
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </FadeIn>
        
    </section>
  );
}