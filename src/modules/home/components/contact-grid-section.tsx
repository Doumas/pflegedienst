"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const MotionLink = motion(Link);

// 1. OBERER TEIL: GRID DATEN
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

// 2. UNTERER TEIL: LISTE DATEN
const CONTACT_DETAILS = [
  {
    label: "Zentrale Frankfurt",
    value: "Borsigallee 37, 60388 Frankfurt am Main",
    sub: "Besuche nach Terminvereinbarung",
    href: "https://maps.google.com/?q=Borsigallee+37,60388+Frankfurt+am+Main",
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
  // State für das aktive Element (0 bis 3)
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Ref prüfen, ob Sektion sichtbar ist
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  // Auto-Cycle Logik: Schaltet nur weiter, wenn im Bild
  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CONTACT_INTENTS.length);
    }, 3000); // Alle 3 Sekunden wechselt der Fokus

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section className="w-full bg-white text-[var(--color-text-main)] border-t border-[var(--color-primary-deep)]/5">
      
      {/* --- HEADER --- */}
      <div className="container mx-auto px-6 pt-16 lg:pt-24 pb-12">
        <FadeIn>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--color-text-main)] mb-12">
              Kontakt <br className="md:hidden"/>
              <span className="text-[var(--color-primary)]">aufnehmen</span>
            </h2>
        </FadeIn>

        {/* --- TEIL 1: DAS GRID (Intent) --- */}
        <div ref={containerRef} className="border-t border-[var(--color-primary-deep)]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary-deep)]/10 border-b border-[var(--color-primary-deep)]/10">
            {CONTACT_INTENTS.map((item, index) => {
              
              // Hier prüfen wir: Ist dieser Index gerade dran?
              const isActive = activeIndex === index;

              return (
                <MotionLink 
                  key={item.id} 
                  href={item.href} 
                  // Wenn man mit der Maus drüber geht, übernehmen wir die Kontrolle sofort
                  onMouseEnter={() => setActiveIndex(index)}
                  
                  // Wir steuern alles über den 'animate' Prop basierend auf 'isActive'
                  animate={isActive ? "active" : "inactive"}
                  initial="inactive"
                  
                  className="group relative flex flex-col justify-between min-h-[280px] p-8 transition-colors duration-500 overflow-hidden"
                  variants={{
                      inactive: { backgroundColor: "#ffffff" },
                      active: { backgroundColor: "var(--color-secondary)" } // Creme Hintergrund wenn aktiv
                  }}
                >
                  
                  {/* Number */}
                  <span className="relative z-10">
                    <motion.span 
                        className="text-lg font-bold block"
                        variants={{
                            inactive: { color: "var(--color-primary-deep)", opacity: 0.2 }, 
                            active: { color: "var(--color-primary)", opacity: 1 }
                        }}
                    >
                      {item.id}
                    </motion.span>
                  </span>

                  {/* Content Bottom */}
                  <div className="mt-8 relative z-10">
                    <motion.h3 
                      className="text-2xl font-bold mb-3 tracking-tight"
                      variants={{
                          inactive: { color: "var(--color-text-main)" },
                          active: { color: "var(--color-primary)" }
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* Action Line */}
                    <motion.div 
                      className="flex items-center gap-2 text-[var(--color-primary)]"
                      variants={{
                          inactive: { opacity: 0.6, x: 0 },
                          active: { opacity: 1, x: 5 }
                      }}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">
                          {item.action}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                  
                  {/* ANIMATION: Linie unten (Nur sichtbar wenn Active) */}
                  <motion.div 
                    variants={{
                      inactive: { scaleX: 0 },
                      active: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] origin-left" 
                  />
                </MotionLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- TEIL 2: DIE LISTE (Details) --- */}
      <div className="container mx-auto px-6 pb-24 lg:pb-32">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pt-12 border-t border-[var(--color-primary-deep)]/5 lg:border-none">
            
            {/* Linker Titel */}
            <div className="lg:w-1/3 pt-4">
                <FadeIn delay={0.2}>
                    <h3 className="text-3xl font-semibold tracking-tight leading-tight mb-4">
                        Wir sind für Sie da.<br/>
                        <span className="text-slate-400">Vor Ort & Digital.</span>
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-sm">
                        Egal ob Sie eine Frage zur Abrechnung haben oder einen Notfall melden müssen – wir helfen sofort.
                    </p>
                    
                    <Link href="/kontakt" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-deep)] transition-colors group">
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
                            <a href={detail.href} target="_blank" rel="noreferrer" className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center hover:bg-[var(--color-secondary)]/50 p-4 -mx-4 rounded-lg transition-colors">
                                <div>
                                    <h4 className="text-lg font-bold flex items-center gap-3 text-[var(--color-text-main)]">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                                            <detail.icon className="w-5 h-5" />
                                        </div>
                                        {detail.label}
                                    </h4>
                                </div>
                                <div className="flex justify-between items-center pl-14 md:pl-0">
                                    <div>
                                        <p className="text-lg font-bold text-[var(--color-primary-deep)]">
                                            {detail.value}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-0.5">
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