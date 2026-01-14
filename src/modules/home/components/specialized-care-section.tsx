"use client";

import { SECTORS } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";

export function SpecializedCareSection() {
  return (
    <section className="w-full">
        <FadeIn>
            <ContentSlider 
                title={<span>Unsere <span className="text-[var(--color-primary)]">Fachbereiche</span></span>} 
                items={SECTORS} 
                id="sectors"
                sectionBgColor="bg-white"
                inactiveCardBgColor="bg-slate-50"
                cardHeight="h-[350px]"
                // FIX: Zusammenziehen der Sektionen
                paddingY="pt-24 pb-0" 
                borderBottom={false}
            />
        </FadeIn>
    </section>
  );
}