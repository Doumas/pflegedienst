"use client";

import { SERVICES } from "@/shared/data/service-data";
import { ContentSlider } from "@/shared/ui/content-slider";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SpecializedCareSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeIn>
             <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-primary-deep)] mb-4">
                Spezialisierte <br/>
                <span className="text-[var(--color-primary)]">Pflegebereiche</span>
             </h2>
             <p className="text-slate-500 text-lg max-w-xl">
                Wir bieten ein breites Spektrum an pflegerischen Leistungen, 
                maßgeschneidert auf Ihre individuellen Bedürfnisse.
             </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
             <Link href="/leistungen" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-deep)] transition-colors">
                Alle Leistungen ansehen <ArrowRight className="w-4 h-4" />
             </Link>
          </FadeIn>
        </div>
      </div>

      {/* FIX: id und title hinzugefügt, um den TypeScript-Fehler zu beheben */}
      <ContentSlider 
        id="services-slider"
        title="Unsere Leistungen" 
        items={SERVICES} 
      />
      
    </section>
  );
}