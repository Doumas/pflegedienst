"use client";

import { SECTORS, SERVICES } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";

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

        {/* SLIDER 2: LEISTUNGEN (GRÜN) */}
        <FadeIn delay={0.2}>
            <ContentSlider 
                // Titeltext muss weiß sein, da Hintergrund grün ist
                title={<span>Alle <span className="text-white/80">Leistungen</span></span>} 
                items={SERVICES} 
                id="services"
                bgColor="bg-[var(--color-primary)]" 
                textColor="text-white"
            />
        </FadeIn>
        
    </section>
  );
}