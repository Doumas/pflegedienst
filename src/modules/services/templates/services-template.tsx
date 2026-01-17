"use client";

import { SERVICES } from "@/shared/data/service-data";
import { FadeIn } from "@/shared/ui/fade-in";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ServicesTemplate() {
  return (
    <div className="w-full bg-white text-[var(--color-text-main)] min-h-screen pt-40 lg:pt-48 pb-24 overflow-hidden relative">
      
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20 fixed">
         <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
      </div>

      {/* --- HERO --- */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
         <FadeIn>
             <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Unser Angebot</span>
             </div>
             <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-8">
                Pflege, die <br/>
                <span className="text-[var(--color-primary)]">ankommt.</span>
             </h1>
             <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-body">
                Wir bieten das volle Spektrum der häuslichen Versorgung. 
                Transparent, professionell und immer mit dem Menschen im Mittelpunkt.
             </p>
         </FadeIn>
      </section>

      {/* --- LISTE DER LEISTUNGEN --- */}
      <section className="container mx-auto px-6 relative z-10">
         <div className="flex flex-col">
            {SERVICES.map((service, index) => (
                <FadeIn key={service.id} delay={index * 0.1}>
                    <Link href={`/leistungen/${service.slug}`} className="group block relative">
                        {/* Border Top */}
                        <div className="w-full h-[1px] bg-[var(--color-primary-deep)]/10 group-hover:bg-[var(--color-primary)] transition-colors duration-500" />
                        
                        <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* 01. Number (Formatierung sichergestellt: 01, 02 etc.) */}
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
                                {/* FIX: Hier stand vorher service.short, jetzt korrekt service.description */}
                                <p className="text-slate-500 font-medium leading-relaxed pr-8 line-clamp-3">
                                    {service.description}
                                </p>
                            </div>

                            {/* 03. Image Preview (Hunter Style Hover) */}
                            <div className="lg:col-span-4 hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="h-40 w-64 bg-slate-100 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />
                                    {/* Deko Kreuz */}
                                    <Plus className="absolute top-2 right-2 text-white w-4 h-4" />
                                </div>
                            </div>

                            {/* 04. Arrow */}
                            <div className="lg:col-span-1 flex justify-end">
                                <div className="w-12 h-12 rounded-full border border-[var(--color-primary-deep)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-300">
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
      </section>

    </div>
  );
}