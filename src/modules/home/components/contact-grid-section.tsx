"use client";

import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";

// 1. OBERER TEIL: GRID (Worum geht es?)
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

// 2. UNTERER TEIL: LISTE (Harte Fakten)
const CONTACT_DETAILS = [
  {
    label: "Zentrale Frankfurt",
    value: "Borsigallee 37, 60388 Frankfurt am Main",
    sub: "Besuche nach Terminvereinbarung",
    href: "https://maps.google.com",
    icon: MapPin
  },
  {
    label: "Telefon & Notruf",
    value: "089 / 123 456 78",
    sub: "Montag - Freitag, 08:00 - 17:00 Uhr",
    href: "tel:08912345678",
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
    <section className="w-full bg-white text-[var(--color-primary-deep)]">
      
      {/* --- TEIL 1: DAS GRID (Intent) --- */}
      <div className="container mx-auto px-6 pt-24 lg:pt-32 pb-12">
        <FadeIn>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-16">
              Kontakt <br />
              <span className="text-[var(--color-primary)]">aufnehmen</span>
            </h2>
        </FadeIn>

        {/* Hunter Style Grid: Border Top & Bottom, Divide X */}
        <div className="border-t border-[var(--color-primary-deep)]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary-deep)]/10 border-b border-[var(--color-primary-deep)]/10">
            {CONTACT_INTENTS.map((item, index) => (
              <Link key={item.id} href={item.href} className="group relative flex flex-col justify-between h-[320px] p-8 hover:bg-[var(--color-secondary)] transition-colors duration-500">
                
                {/* Number */}
                <span className="text-sm font-bold text-[var(--color-primary-deep)]/40 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.id}
                </span>

                {/* Content Bottom */}
                <div className="mt-auto">
                  <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100">
                    {item.description}
                  </p>
                  
                  {/* Arrow & Action Line */}
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--color-primary-deep)]/10 group-hover:border-[var(--color-primary)]/30 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                        {item.action}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors" />
                  </div>
                </div>
                
                {/* Active Bar Bottom (Hunter Style Highlight) */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- TEIL 2: DIE LISTE (Details) - Angelehnt an "Find your place in our world" --- */}
      <div className="container mx-auto px-6 pb-24 lg:pb-32">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-16">
            
            {/* Linker Titel */}
            <div className="lg:w-1/3">
                <FadeIn delay={0.2}>
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                        Wir sind für Sie da.<br/>
                        <span className="text-slate-400">Vor Ort & Digital.</span>
                    </h3>
                    
                    <Link href="/kontakt" className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors group">
                        Alle Kontaktwege
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </FadeIn>
            </div>

            {/* Rechte Liste */}
            <div className="lg:w-2/3">
                <div className="flex flex-col divide-y divide-[var(--color-primary-deep)]/10">
                    {CONTACT_DETAILS.map((detail, idx) => (
                        <FadeIn key={idx} delay={0.3 + (idx * 0.1)} className="group py-8 first:pt-0">
                            <a href={detail.href} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start hover:opacity-70 transition-opacity">
                                <div>
                                    <h4 className="text-lg font-bold flex items-center gap-3">
                                        <detail.icon className="w-5 h-5 text-[var(--color-primary)]" />
                                        {detail.label}
                                    </h4>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-medium text-[var(--color-primary-deep)]">
                                            {detail.value}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">
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

    </section>
  );
}