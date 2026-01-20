"use client";

import { SERVICES } from "@/shared/data/service-data";
import { FadeIn } from "@/shared/ui/fade-in";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ServicesTemplate() {

  // --- REUSABLE IMAGE COMPONENT (Doppelbild + Raster) ---
  const ImageComposition = () => (
    <div className="relative w-full h-[400px] lg:h-[550px] mt-12 lg:mt-0 block">
        
        {/* NEU: Cross-Dots Pattern (Wie auf der Kontaktseite) */}
        <div className="absolute inset-0 -z-10 opacity-30">
             <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
        </div>

        {/* Deko Kreuze */}
        <div className="absolute top-0 right-0 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        <div className="absolute bottom-10 right-10 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        
        {/* BILD 1: Hinten (Groß) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 right-0 w-[75%] h-[70%] z-10 bg-slate-100 shadow-lg shadow-[var(--color-primary)]/5"
        >
            <div className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80')" }} />
            <div className="absolute inset-0 bg-[var(--color-primary-deep)]/5 mix-blend-multiply" />
        </motion.div>

        {/* BILD 2: Vorne (Overlay) */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-12 left-0 w-[45%] h-[35%] bg-white p-3 shadow-2xl shadow-slate-200/50 z-20"
        >
            <div className="w-full h-full relative overflow-hidden bg-slate-200 border border-slate-100">
                <div className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80')" }} />
                
                {/* Kleines Label */}
                <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Care</span>
                </div>
            </div>
        </motion.div>
    </div>
  );

  return (
    <div className="w-full bg-white text-[var(--color-text-main)] min-h-screen pt-32 lg:pt-48 pb-0 overflow-hidden relative">
      
      {/* Hintergrund Deko (Minimal) */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/2 left-6 text-[var(--color-primary)] opacity-20 text-2xl select-none">+</div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
             
             {/* LINKS: Text */}
             <FadeIn>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Unser Angebot</span>
                 </div>
                 <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-8">
                    Pflege, die <br/>
                    <span className="text-[var(--color-primary)]">ankommt.</span>
                 </h1>
                 <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-body border-l-4 border-[var(--color-primary)] pl-6">
                    Wir bieten das volle Spektrum der häuslichen Versorgung. 
                    Transparent, professionell und immer mit dem Menschen im Mittelpunkt.
                 </p>
             </FadeIn>

             {/* RECHTS: Bild Komposition */}
             <div className="block w-full">
                <ImageComposition />
             </div>
         </div>
      </section>

      {/* --- LISTE DER LEISTUNGEN --- */}
      {/* FIX: Border-Color angepasst auf Contact-Style (primary-deep/10) und Cross-Dots hinzugefügt */}
      <section className="w-full bg-slate-50 border-t border-[var(--color-primary-deep)]/10 py-32 relative z-10 overflow-hidden">
         
         {/* Background Pattern für die Liste (Dezent) */}
         <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
            <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col">
                {SERVICES.map((service, index) => (
                    <FadeIn key={service.id} delay={index * 0.1}>
                        <Link href={`/leistungen/${service.slug}`} className="group block relative">
                            {/* Border Top: Konsistente Farbe */}
                            <div className="w-full h-[1px] bg-[var(--color-primary-deep)]/10 group-hover:bg-[var(--color-primary)] transition-colors duration-500" />
                            
                            <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                
                                {/* 01. Number */}
                                <div className="lg:col-span-2">
                                    <span className="text-sm font-bold text-[var(--color-primary)] opacity-60 group-hover:opacity-100 transition-opacity font-heading">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* 02. Title & Short Desc */}
                                <div className="lg:col-span-5">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary-deep)] mb-4 font-heading group-hover:text-[var(--color-primary)] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed pr-8 line-clamp-3">
                                        {service.description}
                                    </p>
                                </div>

                                {/* 03. Image Preview (Liste Hover) */}
                                <div className="lg:col-span-4 hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <div className="h-40 w-64 bg-white shadow-xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 border-4 border-white">
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${service.image})` }}
                                        />
                                        <Plus className="absolute top-2 right-2 text-white w-4 h-4" />
                                    </div>
                                </div>

                                {/* 04. Arrow */}
                                <div className="lg:col-span-1 flex justify-end">
                                    <div className="w-12 h-12 rounded-full bg-white border border-[var(--color-primary-deep)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-300 shadow-sm">
                                        <ArrowRight className="w-5 h-5 text-[var(--color-primary-deep)] group-hover:text-white transition-colors" />
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </FadeIn>
                ))}
                {/* Border Bottom last item */}
                <div className="w-full h-[1px] bg-[var(--color-primary-deep)]/10" />
            </div>
         </div>
      </section>

    </div>
  );
}