"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { 
  HelpCircle, Phone, MessageCircle, ChevronDown, Wallet, 
  Clock, HeartHandshake, MapPin, ShieldCheck, Activity, FileText, 
  ArrowRight, Download, X, Printer, AlertCircle, FileCheck 
} from "lucide-react";
import Link from "next/link";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { FadeIn } from "@/shared/ui/fade-in";
import { cn } from "@/shared/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Wie schnell können Sie mit der Pflege beginnen?",
    answer: "In dringenden Fällen (z.B. plötzliche Entlassung aus dem Krankenhaus) können wir oft innerhalb von 24 Stunden die Versorgung aufnehmen. Bei geplanter Übernahme benötigen wir in der Regel 2-3 Tage für die Pflegeplanung und Klärung der Kostenübernahme.",
    icon: Clock
  },
  {
    question: "Kommen immer die gleichen Pflegekräfte?",
    answer: "Wir arbeiten mit einem festen Bezugspflege-System. Das bedeutet: Sie haben ein kleines, festes Team von 2-3 Pflegekräften, die sich abwechseln. So müssen Sie sich nicht ständig an neue Gesichter gewöhnen und wir können eine vertraute Beziehung aufbauen.",
    icon: HeartHandshake
  },
  {
    question: "In welchen Stadtteilen sind Sie aktiv?",
    answer: "Wir sind im gesamten Stadtgebiet Frankfurts sowie im direkten Umland tätig. Rufen Sie uns einfach an, um zu klären, ob Ihre Adresse in unser Tourengebiet fällt.",
    icon: MapPin
  },
  {
    question: "Arbeiten Sie mit meiner Krankenkasse zusammen?",
    answer: "Ja, uneingeschränkt. Als zugelassener Pflegedienst haben wir Versorgungsverträge mit allen gesetzlichen und privaten Kranken- und Pflegekassen. Wir rechnen die genehmigten Leistungen direkt mit Ihrer Kasse ab.",
    icon: ShieldCheck
  },
  {
    question: "Was kostet das Erstgespräch?",
    answer: "Nichts. Unser erstes Beratungsgespräch findet idealerweise bei Ihnen zu Hause statt, ist für Sie vollkommen kostenlos und unverbindlich. Wir lernen uns kennen und erstellen einen Kostenvoranschlag.",
    icon: Wallet
  },
  {
    question: "Was passiert, wenn das Pflegegeld nicht reicht?",
    answer: "Sollten die Kosten die Sätze der Pflegeversicherung übersteigen, klären wir vorab mit Ihnen, ob eine Kostenübernahme durch das Sozialamt (Hilfe zur Pflege) möglich ist oder welche Eigenanteile auf Sie zukommen. Wir beraten Sie transparent.",
    icon: Wallet
  },
  {
    question: "Übernehmen Sie auch die hauswirtschaftliche Versorgung?",
    answer: "Ja. Wir unterstützen Sie beim Einkaufen, Reinigen der Wohnung, Wäschewaschen oder der Zubereitung von Mahlzeiten. Diese Leistungen können oft über den Entlastungsbetrag (§ 45b SGB XI) abgerechnet werden.",
    icon: Activity
  },
  {
    question: "Helfen Sie bei der Medikamentengabe?",
    answer: "Selbstverständlich. Im Rahmen der Behandlungspflege (SGB V) richten und verabreichen wir Medikamente, legen Kompressionsstrümpfe an, wechseln Verbände oder messen Blutzucker – immer nach ärztlicher Verordnung.",
    icon: Activity
  },
  {
    question: "Was passiert im Notfall?",
    answer: "Für unsere Patienten haben wir eine 24-Stunden-Rufbereitschaft eingerichtet. Sie erhalten eine Notfallnummer, unter der Sie uns rund um die Uhr – auch an Wochenenden und Feiertagen – erreichen.",
    icon: Phone
  },
  {
    question: "Wie beantrage ich einen Pflegegrad?",
    answer: "Das übernehmen wir gerne für Sie. Wir unterstützen Sie bei der Antragstellung, bereiten die notwendigen Unterlagen vor und sind auf Wunsch auch bei der Begutachtung durch den MDK (Medizinischer Dienst) vor Ort dabei.",
    icon: Activity
  }
];

export function FAQTemplate() {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden text-slate-900">
      
      {/* HUNTER STYLE DEKO ELEMENTS (Kreuze statt Blobs) */}
      <div className="hide-on-print absolute inset-0 pointer-events-none -z-10">
         <div className="absolute top-24 right-12 text-[var(--color-primary)] opacity-30 text-2xl select-none">+</div>
         <div className="absolute top-1/3 left-6 text-[var(--color-primary)] opacity-30 text-2xl select-none">+</div>
         <div className="absolute bottom-24 right-1/4 text-[var(--color-primary)] opacity-30 text-2xl select-none">+</div>
      </div>

      <div className="hide-on-print relative z-10">
      
        {/* --- HEADER (Linksbündig & Clean) --- */}
        <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 border-b border-slate-100">
          <div className="container mx-auto">
            <FadeIn delay={0.1}>
                {/* Kleine Label-Zeile */}
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                    Wissenswertes & Hilfe
                </span>

                <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl font-black text-[var(--color-primary-deep)] mb-8 tracking-tight leading-[0.9]">
                    Häufige <br/> Fragen.
                </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl border-l-4 border-[var(--color-primary)] pl-6 mt-8">
                    Transparenz schafft Vertrauen. Hier finden Sie klare Antworten auf die wichtigsten Fragen rund um Pflege und Kosten.
                </p>
            </FadeIn>
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <div className="container px-6 mx-auto pt-16">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* FAQ LISTE (Clean Accordion Style) */}
            <div className="lg:col-span-8">
              <div className="divide-y divide-slate-100 border-t border-slate-100">
              {faqData.map((item, i) => (
                <FadeIn key={i} delay={0.1 + (i * 0.05)}>
                    <div className="group py-6">
                        <details className="group/details">
                            <summary className="flex items-start gap-6 cursor-pointer list-none select-none group-hover:bg-slate-50/50 transition-colors p-4 -mx-4 rounded-sm">
                                <div className="mt-1 text-[var(--color-primary)] opacity-50 group-open/details:opacity-100 transition-opacity">
                                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 pr-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                        {item.question}
                                    </h3>
                                </div>
                                <div className="mt-1 text-[var(--color-primary)] transition-transform duration-300 group-open/details:rotate-180">
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            </summary>
                            <div className="pl-0 md:pl-16 pr-4 pt-4 pb-2">
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    {item.answer}
                                </p>
                            </div>
                        </details>
                    </div>
                </FadeIn>
              ))}
              </div>
            </div>

            {/* SIDEBAR (Rechts - Kantig & Clean) */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              
              {/* Kontakt Box (Eckig, grau) */}
              <FadeIn delay={0.4} direction="left">
                <div className="bg-slate-50 border border-slate-200 p-8 relative">
                    {/* Deko Kreuz */}
                    <div className="absolute top-4 right-4 text-[var(--color-primary)] opacity-20 text-xl">+</div>

                    <div className="mb-6">
                        <MessageCircle className="w-8 h-8 text-[var(--color-primary)] mb-4" strokeWidth={1.5} />
                        <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-2">Noch Fragen?</h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            Jede Pflegesituation ist einzigartig. Wir beraten Sie gerne persönlich.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <a href="tel:06912345678" className="flex items-center gap-4 py-3 border-b border-slate-200 hover:border-[var(--color-primary)] group transition-colors">
                            <Phone className="w-5 h-5 text-slate-400 group-hover:text-[var(--color-primary)]" />
                            <span className="font-bold text-[var(--color-primary-deep)]">069 / 123 456 78</span>
                        </a>
                        <Link href="/kontakt" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-deep)] transition-colors pt-2">
                            Nachricht schreiben <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
              </FadeIn>

              {/* DOWNLOAD BOX (Akzentfarbe, Eckig) */}
              <FadeIn delay={0.5} direction="left">
                <div 
                    onClick={() => setIsChecklistOpen(true)}
                    className="group cursor-pointer bg-[var(--color-primary-deep)] text-white p-8 relative hover:bg-[var(--color-primary)] transition-colors duration-300"
                >
                    <div className="absolute top-4 right-4 opacity-20">
                        <Download className="w-6 h-6" />
                    </div>

                    <div className="mb-8 pt-2">
                        <span className="inline-block px-2 py-1 bg-white/10 text-[10px] font-bold uppercase tracking-widest mb-4">
                            Kostenlos
                        </span>
                        <h4 className="font-heading text-2xl font-bold leading-tight mb-2">
                            MDK Checkliste
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Schritt-für-Schritt PDF zur Vorbereitung auf den MDK-Besuch.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-4 group-hover:border-white/30">
                        Downloaden <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </div>

      {/* CHECKLISTEN MODAL (Funktion bleibt, Design geschärft) */}
      <AnimatePresence>
      {isChecklistOpen && (
        <div id="print-overlay" className="z-[9999] fixed inset-0 flex justify-center overflow-y-auto">
           {/* Backdrop */}
           <div className="fixed inset-0 no-print bg-white/90 backdrop-blur-sm cursor-pointer" onClick={() => setIsChecklistOpen(false)} />

           {/* Toolbar */}
           <div className="fixed top-0 left-0 w-full z-[100] flex justify-center p-6 no-print pointer-events-none">
              <div className="flex justify-between items-center bg-[var(--color-primary-deep)] text-white p-4 w-full max-w-[210mm] pointer-events-auto shadow-2xl">
                 <div className="font-bold px-4 flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-[var(--color-primary)]" /> MDK Checkliste
                 </div>
                 <div className="flex gap-4">
                   <Button onClick={handlePrint} className="bg-white text-[var(--color-primary-deep)] hover:bg-slate-100 font-bold rounded-none h-10 px-6 uppercase text-xs tracking-widest">
                      <Printer className="w-4 h-4 mr-2" /> Drucken
                   </Button>
                   <button onClick={() => setIsChecklistOpen(false)} className="p-2 hover:bg-white/10 text-white rounded-none transition-all">
                      <X className="w-6 h-6" />
                   </button>
                 </div>
              </div>
           </div>

           {/* DRUCKBARES BLATT (Design angepasst) */}
           <div id="flyer-content-container" className="z-[10] relative pointer-events-none flex justify-center pt-32 pb-20 w-full">
              <div className="flyer-page bg-white text-slate-900 pointer-events-auto shadow-2xl overflow-hidden relative border border-slate-200 w-[210mm] min-h-[297mm] mx-auto">
                 <div className="absolute inset-0 p-16 flex flex-col h-full text-left">
                    
                    {/* Header Print */}
                    <div className="flex justify-between items-start mb-16 border-b border-slate-900 pb-8">
                        <div>
                          <div className="mb-4 text-[var(--color-primary)] font-black text-xl tracking-tighter uppercase">Dalas Pflege</div>
                          <h1 className="text-4xl font-black text-slate-900 leading-[1.0] font-heading uppercase">
                              MDK <br/> Checkliste
                          </h1>
                        </div>
                        <div className="border border-slate-900 px-4 py-2">
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Vorbereitung</p>
                        </div>
                    </div>

                    <div className="mb-12 bg-slate-50 p-8 border-l-4 border-[var(--color-primary)]">
                        <p className="text-sm text-slate-700 leading-relaxed font-bold font-body">
                            Nutzen Sie diese Checkliste, um alle Unterlagen für den Besuch des Medizinischen Dienstes (MDK) griffbereit zu haben.
                        </p>
                    </div>

                    <div className="space-y-12 flex-1">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">
                              1. Dokumente
                          </h3>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                              {["Medikamentenplan", "Entlassungsberichte", "Arztbriefe", "Hilfsmittel-Liste", "Therapie-Berichte", "Pflegedokumentation"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-4 h-4 border border-slate-900 bg-white shrink-0" />
                                    <span className="text-sm text-slate-900 font-medium">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">
                              2. Pflegealltag
                          </h3>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                              {["Körperpflege-Ablauf", "Mobilitätseinschränkung", "Ernährungssituation", "Nächtliche Versorgung"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-4 h-4 border border-slate-900 bg-white shrink-0" />
                                    <span className="text-sm text-slate-900 font-medium">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-900 flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-sm uppercase">Noch Fragen?</p>
                          <p className="text-sm text-slate-500">069 / 123 456 78</p>
                        </div>
                        <div className="text-right text-xs text-slate-400 uppercase tracking-widest">
                            Dalas Pflegedienst Frankfurt
                        </div>
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}
      </AnimatePresence>

    </div>
  );
}