"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Calculator, Phone } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";

// --- DATEN: DOWNLOADS (Linke Seite) ---
const RESOURCES = [
  {
    category: "UNTERNEHMEN",
    date: "PDF • 2.4 MB",
    title: "Dalas Pflege Flyer & Leistungen",
    href: "/downloads/dalas-flyer-2025.pdf"
  },
  {
    category: "HILFSMITTEL",
    date: "PDF • 1.1 MB",
    title: "Checkliste: MDK-Begutachtung vorbereiten",
    href: "/downloads/checkliste-mdk.pdf"
  },
  {
    category: "VORLAGEN",
    date: "PDF • 0.8 MB",
    title: "Musterantrag auf Pflegegrad (Blanko)",
    href: "/downloads/antrag-pflegegrad.pdf"
  },
  {
    category: "BEISPIELE",
    date: "PDF • 1.5 MB",
    title: "Fallbeispiel: 24h Versorgung zuhause",
    href: "/downloads/fallbeispiel-versorgung.pdf"
  }
];

// --- DATEN: TOOLS (Rechte Seite - Slider) ---
const TOOLS = [
  {
    id: 1,
    icon: Calculator,
    label: "Digitaler Assistent",
    title: "Der Pflege-Konfigurator",
    text: "Sie sind unsicher, welcher Pflegegrad Ihnen zusteht oder welche Leistungen die Kasse übernimmt? Nutzen Sie unseren kostenlosen Assistenten.",
    action: "Jetzt konfigurieren",
    href: "/#pflege-check" // Anker zum Configurator
  },
  {
    id: 2,
    icon: Phone,
    label: "Persönlicher Draht",
    title: "Rückruf-Service",
    text: "Keine Zeit für Formulare? Hinterlassen Sie Ihre Nummer und wir rufen Sie innerhalb von 60 Minuten zurück (Mo-Fr).",
    action: "Rückruf anfordern",
    href: "/kontakt"
  }
];

export function ResourceDownloadSection() {
  const [currentTool, setCurrentTool] = useState(0);

  const nextTool = () => setCurrentTool((prev) => (prev + 1) % TOOLS.length);
  const prevTool = () => setCurrentTool((prev) => (prev - 1 + TOOLS.length) % TOOLS.length);

  return (
    <section className="w-full bg-white py-24 lg:py-32 overflow-hidden border-t border-[var(--color-primary-deep)]/5">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <FadeIn>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-main)] leading-[1.0]">
                    Wissen & <br/>
                    <span className="text-[var(--color-primary)]">Werkzeuge</span>
                </h2>
            </FadeIn>
            
            <FadeIn delay={0.2} className="flex gap-12 items-center">
                <div className="text-right hidden lg:block">
                    <span className="block text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-1">Downloads</span>
                    <span className="block text-sm font-medium text-slate-500">Hilfreiche Dokumente für Ihren Alltag</span>
                </div>
            </FadeIn>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-[var(--color-primary-deep)]/10">
            
            {/* --- LINKS: DOWNLOAD LISTE (Span 7) --- */}
            <div className="lg:col-span-7 border-r border-[var(--color-primary-deep)]/10">
                <div className="flex flex-col divide-y divide-[var(--color-primary-deep)]/10">
                    {RESOURCES.map((item, index) => (
                        <FadeIn key={index} delay={index * 0.1} className="group relative">
                            <a href={item.href} target="_blank" className="block py-10 pr-8 pl-4 hover:bg-[var(--color-secondary)] transition-colors duration-500">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    
                                    {/* Meta Info */}
                                    <div className="w-40 shrink-0">
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {item.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Action */}
                                    <div className="flex items-center gap-2 text-[var(--color-primary-deep)] opacity-40 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">
                                        <span className="text-xs font-bold uppercase tracking-wider hidden md:block">Download</span>
                                        <Download className="w-5 h-5" />
                                    </div>
                                </div>
                            </a>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* --- RECHTS: TOOL SLIDER (Span 5) --- */}
            {/* Das ist die "Highlight Box" aus dem Screenshot */}
            <div className="lg:col-span-5 bg-[var(--color-secondary)]/30 relative flex flex-col justify-between min-h-[500px]">
                
                {/* Content Area */}
                <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTool}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10"
                        >
                            {/* Icon als großes Wasserzeichen */}
                            <div className="mb-8">
                                {(() => {
                                    const Icon = TOOLS[currentTool].icon;
                                    return <Icon className="w-16 h-16 text-[var(--color-primary)]" strokeWidth={1.5} />;
                                })()}
                            </div>

                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                                {TOOLS[currentTool].label}
                            </span>
                            
                            <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] mb-6 leading-tight">
                                &quot;{TOOLS[currentTool].title}&quot;
                            </h3>
                            
                      <p className="text-slate-600 leading-relaxed mb-8 max-w-sm">
                                {TOOLS[currentTool].text}
                            </p>

                            <Link href={TOOLS[currentTool].href} className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-deep)] transition-colors group">
                                {TOOLS[currentTool].action}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Number */}
                    <div className="absolute top-10 right-10 text-xs font-bold text-slate-300 tracking-widest">
                        0{currentTool + 1} / 0{TOOLS.length}
                    </div>
                </div>

                {/* Navigation Buttons (Unten angedockt) */}
                <div className="flex border-t border-[var(--color-primary-deep)]/10 bg-white">
                    <button 
                        onClick={prevTool}
                        className="flex-1 py-6 flex items-center justify-center border-r border-[var(--color-primary-deep)]/10 hover:bg-[var(--color-secondary)] transition-colors group"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors" />
                    </button>
                    <button 
                        onClick={nextTool}
                        className="flex-1 py-6 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors group"
                    >
                        <ArrowRight className="w-5 h-5 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors" />
                    </button>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
}