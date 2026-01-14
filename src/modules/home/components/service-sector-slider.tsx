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
                // Design Konfiguration
                sectionBgColor="bg-white"
                inactiveCardBgColor="bg-slate-50" // Graue Kästen für Kontrast
                cardHeight="h-[350px]"
            />
        </FadeIn>

        {/* SLIDER 2: LEISTUNGEN (JETZT AUCH WEISS) */}
        <FadeIn delay={0.2}>
            <div>
                <ContentSlider 
                    title={<span>Unser <span className="text-[var(--color-primary)]">Service</span></span>} 
                    items={SERVICES} 
                    id="services"
                    // HIER WAR DER FEHLER: Jetzt bg-white statt secondary
                    sectionBgColor="bg-white" 
                    titleColor="text-[var(--color-text-main)]"
                    // Da Hintergrund Weiß ist, nutzen wir hier auch graue Kästen für die Inaktiven
                    inactiveCardBgColor="bg-slate-50"
                    cardHeight="h-[350px]"
                />

                {/* LINK ZUR ÜBERSICHT (FIX: Hintergrund Weiß) */}
                <div className="w-full bg-white flex justify-center pb-24 -mt-1">
                    <Link 
                        href="/leistungen" 
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