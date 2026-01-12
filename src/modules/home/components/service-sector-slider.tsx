"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Image from "next/image";
import Link from "next/link";

const SECTORS = [
  {
    id: 1,
    title: "Ambulante Pflege",
    description: "Körperpflege, Ernährung und Mobilität im eigenen Zuhause.",
    image: "/images/home/hero-bg.jpg", // Nutze deine vorhandenen Bilder
    href: "/leistungen/grundpflege"
  },
  {
    id: 2,
    title: "Medizinische Versorgung",
    description: "Wundversorgung, Injektionen und Medikamente nach ärztlicher Verordnung.",
    image: "/images/home/hero-bg2.jpg",
    href: "/leistungen/behandlungspflege"
  },
  {
    id: 3,
    title: "Betreuung & Alltag",
    description: "Begleitung zu Terminen, Spaziergänge und Hilfe im Haushalt.",
    image: "/images/home/hero-bg3.jpg",
    href: "/leistungen/betreuung"
  },
  {
    id: 4,
    title: "Beratung & Anträge",
    description: "Unterstützung bei Pflegegrad-Anträgen und MDK-Gutachten.",
    image: "/images/home/hero-bg4.jpg",
    href: "/leistungen/beratung"
  }
];

export function ServiceSectorSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Einfache Logik: Wir schieben das Array durch
  const next = () => setCurrentIndex((prev) => (prev + 1) % SECTORS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + SECTORS.length) % SECTORS.length);

  // Helper um die sichtbaren 3 Karten zu bekommen (für Desktop)
  // Das sorgt für den "Endlos"-Effekt im Array
  const getVisibleSectors = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(SECTORS[(currentIndex + i) % SECTORS.length]);
    }
    return visible;
  };

  const visibleSectors = getVisibleSectors();

  return (
    <section className="w-full bg-[var(--color-secondary)] py-24 lg:py-32 border-b border-[var(--color-primary-deep)]/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* HEADER: Titel & Pfeile (Links-Rechts Layout wie im Bild) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <FadeIn>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--color-text-main)] leading-[1.0]">
                    Unsere <br/>
                    <span className="text-[var(--color-primary)]">Fachbereiche</span>
                </h2>
            </FadeIn>

            <FadeIn delay={0.2} className="flex gap-4">
                <button 
                    onClick={prev} 
                    className="p-4 border border-[var(--color-primary-deep)]/10 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all rounded-full group"
                >
                    <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                </button>
                <button 
                    onClick={next} 
                    className="p-4 border border-[var(--color-primary-deep)]/10 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all rounded-full group"
                >
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
            </FadeIn>
        </div>

        {/* SLIDER GRID (Hunter Style) */}
        <div className="border-t border-[var(--color-primary-deep)]/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-primary-deep)]/10 border-b border-[var(--color-primary-deep)]/10">
                
                <AnimatePresence mode="popLayout">
                    {visibleSectors.map((sector, index) => (
                        <motion.div
                            key={`${sector.id}-${index}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                            // Mobile: Nur der erste sichtbar, Desktop: Alle 3
                            className={`group relative h-[500px] flex flex-col justify-between p-8 hover:bg-white transition-colors duration-500 ${index === 0 ? "flex" : "hidden lg:flex"}`}
                        >
                            {/* TOP: Number & Arrow */}
                            <div className="flex justify-between items-start z-10">
                                <span className="text-xl font-bold text-[var(--color-primary-deep)]/20 group-hover:text-[var(--color-primary)] transition-colors">
                                    0{sector.id}
                                </span>
                                <Link href={sector.href} className="p-2 rounded-full bg-transparent group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                                    <ArrowUpRight className="w-6 h-6" />
                                </Link>
                            </div>

                            {/* MIDDLE: Image (Fills on Hover or Static?) 
                                Im Hunter Design ist oft Text ODER Bild. Wir machen Bild als Hover-Reveal oder fest.
                                Hier: Bild unten fest, Text darüber.
                            */}
                            <div className="absolute inset-0 top-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none">
                                <Image 
                                    src={sector.image} 
                                    alt={sector.title} 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/80 to-transparent" />
                            </div>

                            {/* BOTTOM: Text Content */}
                            <div className="relative z-10 mt-auto group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] group-hover:text-white mb-4 leading-tight">
                                    {sector.title}
                                </h3>
                                <p className="text-slate-500 group-hover:text-white/80 font-medium leading-relaxed max-w-xs">
                                    {sector.description}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </AnimatePresence>

            </div>
        </div>

      </div>
    </section>
  );
}