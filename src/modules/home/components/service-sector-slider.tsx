"use client";

import { SERVICES } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";

export function ServiceSectorSlider() {
  return (
    <section className="w-full bg-white">
        
        {/* NUR DER SLIDER (Leistungen) */}
        {/* Die "Ganzheitliche Pflege" Sektion wurde hier entfernt */}
        
        <FadeIn>
            <ContentSlider 
                title={<span>Unsere <span className="text-[var(--color-primary)]">Leistung</span></span>} 
                items={SERVICES} 
                id="services"
                sectionBgColor="bg-white" 
                titleColor="text-[var(--color-text-main)]"
                inactiveCardBgColor="bg-slate-50"
                cardHeight="h-[350px]"
                borderBottom={false} 
                paddingY="py-24 lg:py-32" // Ordentlicher Abstand nach oben/unten
            />
        </FadeIn>
        
    </section>
  );
}