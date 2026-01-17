"use client";

import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";
import { motion } from "framer-motion";

// 1. OBERER TEIL: GRID (Intent)
const CONTACT_INTENTS = [
  {
    id: "01",
    title: "Pflege anfragen",
    description: "Sie suchen Unterstützung für sich oder Angehörige? Starten Sie hier Ihre Anfrage.",
    href: "/pflegekraft-finden",
    action: "Anfrage starten"
  },
  {
    id: "02",
    title: "Karriere & Jobs",
    description: "Werden Sie Teil unseres Teams. Entdecken Sie offene Stellen in Frankfurt.",
    href: "/karriere",
    action: "Stellen ansehen"
  },
  {
    id: "03",
    title: "Erstberatung",
    description: "Unsicher welcher Pflegegrad? Wir beraten Sie kostenlos und unverbindlich.",
    href: "/kontakt",
    action: "Termin buchen"
  },
  {
    id: "04",
    title: "Für Ärzte & Partner",
    description: "Direkter Kontakt für Kooperationspartner, Krankenhäuser und Arztpraxen.",
    href: "/partner",
    action: "Kooperation"
  }
];

// 2. UNTERER TEIL: LISTE (Fakten)
const CONTACT_DETAILS = [
  {
    label: "Zentrale Frankfurt",
    value: "Borsigallee 37, 60388 Frankfurt am Main",
    sub: "Besuche nach Terminvereinbarung",
    href: "https://maps.google.com/?q=Borsigallee+37,+60388+Frankfurt+am+Main", // Link gefixt
    icon: MapPin
  },
  {
    label: "Telefon & Notruf",
    value: "069 / 123 456 78", 
    sub: "Montag - Freitag, 08:00 - 17:00 Uhr",
    href: "tel:06912345678",
    icon: Phone
  },
  {
    label: "E-Mail Schreiben",
    value: "info@dalas-pflege.de",
    sub: "Wir antworten in der Regel innerhalb von 24h",
    href: "mailto:info@dalas-pflege.de",
    icon: Mail
  }
];

export function ContactGridSection() {
  return (
    <section className="w-full bg-white text-[var(--color-text-main)] border-t border-[var(--color-primary-deep)]/5 overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="container mx-auto px-6 pt-16 lg:pt-24 pb-12 relative z-10">
        <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-main)] mb-12">
              Kontakt <br className="md:hidden"/>
              <span className="text-[var(--color-primary)]">aufnehmen</span>
            </h2>
        </FadeIn>

        {/* --- TEIL 1: DAS GRID --- */}
        <div className="border-t border-[var(--color-primary-deep)]/10 bg-white relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary-deep)]/10 border-b border-[var(--color-primary-deep)]/10">
            {CONTACT_INTENTS.map((item, index) => (
              <Link key={item.id} href={item.href} className="group relative flex flex-col justify-between min-h-[280px] p-8 hover:bg-[var(--color-secondary)] transition-colors duration-500">
                
                {/* Number */}
                <span className="text-lg font-bold text-[var(--color-primary-deep)]/20 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.id}
                </span>

                {/* Content Bottom */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
                    {item.description}
                  </p>
                  
                  {/* Action Line */}
                  <div className="flex items-center gap-2 text-[var(--color-primary)] opacity-60 group-hover:opacity-100 transition-opacity mt-auto">
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {item.action}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                
                {/* ANIMATION LINE */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }} 
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)] origin-left" 
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- TEIL 2: DIE LISTE (Details) --- */}
      {/* BACKGROUND PASTELL GRÜN */}
      <div className="relative w-full bg-[var(--color-primary)]/10 py-24 lg:py-32 border-t border-[var(--color-primary)]/10">
        
        {/* --- HINTERGRUND DEKO (Punkte + Watermark) --- */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {/* Das Raster aus Punkten (aus globals.css) */}
           <div className="absolute inset-0 bg-pattern-cross-dots opacity-30 text-[var(--color-primary)]" />
           
           {/* Watermark Icon (Map Pin oder Logo Fragment) rechts unten */}
           <MapPin className="absolute -bottom-12 -right-12 w-96 h-96 text-[var(--color-primary)] opacity-[0.05] rotate-12" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              
              {/* Linker Titel */}
              <div className="lg:w-1/3 pt-4">
                  <FadeIn delay={0.2}>
                      <h3 className="text-3xl font-semibold tracking-tight leading-tight mb-4 text-[var(--color-primary-deep)]">
                          Wir sind für Sie da.<br/>
                          <span className="text-[var(--color-primary)]">Vor Ort & Digital.</span>
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-sm">
                          Egal ob Sie eine Frage zur Abrechnung haben oder einen Notfall melden müssen – wir helfen sofort.
                      </p>
                      
                      <Link href="/kontakt" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary-deep)] hover:text-[var(--color-primary)] transition-colors group">
                          Alle Kontaktwege ansehen
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                  </FadeIn>
              </div>

              {/* Rechte Liste */}
              <div className="lg:w-2/3">
                  <div className="flex flex-col divide-y divide-[var(--color-primary-deep)]/10">
                      {CONTACT_DETAILS.map((detail, idx) => (
                          <FadeIn key={idx} delay={0.3 + (idx * 0.1)} className="group py-6 lg:py-8 first:pt-0">
                              {/* Hover: Weißer Hintergrund für 'Lift' Effekt */}
                              <a href={detail.href} target="_blank" rel="noreferrer" className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center hover:bg-white hover:shadow-lg hover:shadow-[var(--color-primary)]/5 p-6 -mx-6 rounded-xl transition-all duration-300 border border-transparent hover:border-[var(--color-primary)]/10">
                                  <div>
                                      <h4 className="text-lg font-bold flex items-center gap-4 text-[var(--color-text-main)]">
                                          {/* Icon in Weiß */}
                                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shrink-0 shadow-sm border border-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                                              <detail.icon className="w-5 h-5" />
                                          </div>
                                          {detail.label}
                                      </h4>
                                  </div>
                                  <div className="flex justify-between items-center pl-[64px] md:pl-0">
                                      <div>
                                          <p className="text-lg font-bold text-[var(--color-primary-deep)]">
                                              {detail.value}
                                          </p>
                                          <p className="text-sm text-slate-500 mt-1 font-medium">
                                              {detail.sub}
                                          </p>
                                      </div>
                                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[var(--color-primary)] transition-colors" />
                                  </div>
                              </a>
                          </FadeIn>
                      ))}
                  </div>
              </div>

           </div>
        </div>
      </div>

    </section>
  );
}