"use client";

import { SERVICES } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GeneralCareSection() {
  return (
    <section className="w-full">
        <FadeIn delay={0.2}>
            <div>
                <ContentSlider 
                    title={<span>Alle <span className="text-[var(--color-primary)]">Leistungen</span></span>} 
                    items={SERVICES} 
                    id="services"
                    sectionBgColor="bg-white" 
                    titleColor="text-[var(--color-text-main)]"
                    inactiveCardBgColor="bg-slate-50"
                    cardHeight="h-[350px]"
                    // FIX: Zusammenziehen der Sektionen
                    paddingY="pt-12 pb-24"
                />

                {/* Link auch auf Weiß */}
                <div className="w-full bg-white flex justify-center pb-24 -mt-12">
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