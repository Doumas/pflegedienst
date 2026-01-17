"use client";

import { useState } from "react";
import { SERVICES } from "@/shared/data/service-data";
import { FadeIn } from "@/shared/ui/fade-in";
import { ArrowRight, Check, Phone, Plus, Calculator } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceSectorSlider } from "@/modules/home/components/service-sector-slider"; 

// --- DATEN KONFIGURATOR ---
const TOOLS = [
  {
    id: 1,
    icon: Calculator,
    label: "Digitaler Assistent",
    title: "Der Pflege-Konfigurator",
    text: "Sie sind unsicher, welcher Pflegegrad Ihnen zusteht oder welche Leistungen die Kasse übernimmt? Nutzen Sie unseren kostenlosen Assistenten.",
    action: "Jetzt konfigurieren",
    href: "/#pflege-check"
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

interface ServiceDetailTemplateProps {
  slug: string;
}

export function ServiceDetailTemplate({ slug }: ServiceDetailTemplateProps) {
  const service = SERVICES.find((s) => s.slug === slug);
  const [currentTool, setCurrentTool] = useState(0);

  if (!service) {
    notFound();
  }

  const bgImage = service.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80";

  // Navigation Logic
  const nextTool = () => setCurrentTool((prev) => (prev + 1) % TOOLS.length);
  const prevTool = () => setCurrentTool((prev) => (prev - 1 + TOOLS.length) % TOOLS.length);

  // --- IMAGE COMPONENT ---
  const ImageComposition = ({ mobile = false }) => (
    <div className={`relative w-full ${mobile ? 'h-[400px] mb-12 mt-10 block' : 'h-[600px] lg:h-[700px] mt-12 lg:mt-0 block'}`}>
        
        {/* Dot Pattern */}
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none scale-90">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* Deko Kreuze */}
        <div className="absolute top-0 left-0 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        <div className="absolute top-0 right-0 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        <div className="absolute bottom-10 right-0 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        
        {/* BILD 1: Hinten */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-4 right-4 w-[85%] h-[80%] z-10 bg-slate-100 shadow-lg"
        >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
            <div className="absolute inset-0 bg-[var(--color-primary-deep)]/5 mix-blend-multiply" />
        </motion.div>

        {/* BILD 2: Vorne (Overlay) */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-12 left-4 w-[50%] h-[40%] bg-white p-2 shadow-2xl shadow-slate-200/50 z-20"
        >
            <div className="w-full h-full relative overflow-hidden bg-slate-200 border border-slate-100">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80')" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Plus className="w-3 h-3 text-[var(--color-primary)]" /> Frankfurt
                    </span>
                </div>
            </div>
        </motion.div>
    </div>
  );

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-32 lg:pt-48 pb-0 overflow-hidden relative">
      
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-24 items-start">
            
            {/* LEFT: Content */}
            <FadeIn>
                <Link href="/leistungen" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-8 hover:text-[var(--color-primary-deep)] transition-colors">
                    ← Zurück zur Übersicht
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-8 hyphens-auto">
                    {service.title}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-[var(--color-primary)] pl-6">
                    {service.description}
                </p>

                {/* Mobile Bilder */}
                <div className="block lg:hidden w-full">
                    <ImageComposition mobile={true} />
                </div>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-12 font-medium">
                    {service.details}
                </p>

                {/* Features */}
                <div className="mb-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Leistungsumfang</h3>
                    <div className="space-y-4 border-t border-slate-100 pt-4">
                        {service.features && service.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-100 group">
                                <Check className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" />
                                <span className="text-lg font-bold text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/kontakt" className="px-8 py-4 bg-[var(--color-primary-deep)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] transition-all flex items-center justify-center gap-3 shadow-xl">
                        Beratung anfordern <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:06912345678" className="px-8 py-4 border border-slate-200 text-[var(--color-primary-deep)] font-bold uppercase tracking-widest text-xs hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center gap-3 bg-white">
                        <Phone className="w-4 h-4" /> 069 / 123 456 78
                    </a>
                </div>
            </FadeIn>

            {/* RIGHT: Desktop Images */}
            <div className="hidden lg:block">
                <ImageComposition mobile={false} />
            </div>

        </div>
      </section>


      {/* --- SLIDER SEKTION (Konfigurator) --- */}
      {/* FIX: pt-24 pb-0 (unten kein Padding mehr, damit der Abstand zum nächsten Bereich klein ist) */}
      <section className="pt-24 pb-0 border-t border-[var(--color-primary-deep)]/5 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            
            <div className="bg-[var(--color-secondary)]/50 relative flex flex-col justify-between min-h-[500px]">
                
                {/* DEKO HINTERGRUND */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute -top-12 -right-12 text-[var(--color-primary)] opacity-10">
                        {(() => {
                             const Icon = TOOLS[currentTool].icon;
                             return <Icon className="w-64 h-64 rotate-12" strokeWidth={1} />;
                        })()}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTool}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative"
                        >
                            {/* Icon */}
                            <div className="mb-8 inline-block">
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

                {/* Navigation Buttons */}
                <div className="flex border-t border-[var(--color-primary-deep)]/10 bg-white relative z-20">
                    <button 
                        onClick={prevTool}
                        className="flex-1 py-6 flex items-center justify-center border-r border-[var(--color-primary-deep)]/10 hover:bg-[var(--color-secondary)] transition-colors group cursor-pointer"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors" />
                    </button>
                    <button 
                        onClick={nextTool}
                        className="flex-1 py-6 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors group cursor-pointer"
                    >
                        <ArrowRight className="w-5 h-5 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors" />
                    </button>
                </div>

            </div>
        </div>
      </section>

      {/* --- WEITERE LEISTUNGEN --- */}
      {/* FIX: pt-16 (moderat oben) pb-24 (viel unten) -> Harmonischer Abstand */}
      <section className="bg-white pt-16 pb-24">
          <ServiceSectorSlider />
      </section>
      
    </div>
  );
}