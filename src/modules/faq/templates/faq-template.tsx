"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { 
  HelpCircle, Phone, MessageCircle, ChevronDown, Sparkles, Wallet, 
  Clock, HeartHandshake, MapPin, ShieldCheck, Activity, FileText, 
  ArrowRight, Download, X, Printer, AlertCircle, FileCheck 
} from "lucide-react";
import Link from "next/link";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { FadeIn } from "@/shared/ui/fade-in";
import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen bg-[#fffbf7] font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden text-slate-900">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="hide-on-print absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-accent-soft)]/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[var(--color-secondary)]/50 rounded-full blur-[100px]" />
      </div>

      <div className="hide-on-print relative z-10">
      
        {/* --- HEADER (Korrektur: Jetzt vollständig zentriert) --- */}
        <section className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-4">
          <div className="container max-w-4xl mx-auto flex flex-col items-center text-center">
            
            <FadeIn delay={0.1}>
                {/* Badge mit Animation */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                    <motion.div
                        animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <HelpCircle className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    </motion.div>
                    <span>Wissenswertes</span>
                </div>
            </FadeIn>

           <FadeIn delay={0.2}>
               <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.05]">
                Häufige Fragen & <br/>
                <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold tracking-normal">
                        Antworten.
                    </span>
                    {/* Orange Welle */}
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
                </h1>
           </FadeIn>
            
            <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium text-pretty">
                Transparenz ist für uns der erste Schritt zur Vertrauensbasis. Hier finden Sie alle wichtigen Informationen zu unseren Leistungen.
                </p>
            </FadeIn>
          </div>
        </section>

        {/* --- GRID BEREICH --- */}
        <div className="container pb-24 px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* FAQ LISTE */}
            <div className="lg:col-span-8 space-y-4">
              {faqData.map((item, i) => (
                <FadeIn key={i} delay={0.4 + (i * 0.05)} direction="up">
                    <div className="group bg-white rounded-[2rem] border border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-xl transition-all duration-300 overflow-hidden transform-gpu">
                    <details className="group/details">
                        <summary className="flex items-center gap-5 p-6 cursor-pointer list-none select-none">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-all duration-300 group-open/details:bg-[var(--color-accent)] group-open/details:text-white">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                {item.question}
                                </h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-open/details:rotate-180 transition-all duration-300 shrink-0">
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </summary>
                        <div className="px-6 pb-8 pt-0 pl-24 text-left">
                            <div className="text-slate-600 leading-relaxed border-l-2 border-[var(--color-accent)]/30 pl-6 py-2 text-lg font-medium text-pretty">
                                {item.answer}
                            </div>
                        </div>
                    </details>
                    </div>
                </FadeIn>
              ))}
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              
              {/* Kontakt Box */}
              <FadeIn delay={0.6} direction="left">
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-soft)] rounded-full blur-3xl -mr-10 -mt-10 opacity-40" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[var(--color-primary)]">
                            <MessageCircle className="w-8 h-8" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Persönliche Beratung?</h3>
                        <p className="text-slate-600 text-sm mb-8 leading-relaxed font-bold">
                            Wir beraten Sie gerne unverbindlich zu Ihrer individuellen Situation.
                        </p>
                        
                        <div className="space-y-4 w-full">
                            <a href={`tel:061097159916`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-[var(--color-primary)]/20 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[var(--color-primary)] transition-colors shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Rückruf</div>
                                    <div className="font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">06109 715 99 16</div>
                                </div>
                            </a>
                            <Link href="/kontakt" className="block w-full">
                                <Button size="lg" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--color-primary)]/20">
                                    Nachricht senden
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
              </FadeIn>

              {/* DOWNLOAD BOX */}
              <FadeIn delay={0.7} direction="left">
                <div 
                    onClick={() => setIsChecklistOpen(true)}
                    className="group cursor-pointer bg-[var(--color-footer-bg)] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--color-accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/20 transition-colors" />
                    
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-8 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                                <FileText className="w-3 h-3" /> Kostenlos
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-slate-900 transition-all">
                                <Download className="w-6 h-6" />
                            </div>
                        </div>
                        <h4 className="font-black text-2xl leading-tight mb-4 text-left">Pflegegrad <br/>beantragen</h4>
                        <p className="text-sm text-white/60 mb-8 leading-relaxed font-medium text-left">
                            Schritt-für-Schritt Anleitung zur Vorbereitung auf den MDK-Besuch als PDF.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[var(--color-accent)] transition-colors border-t border-white/10 pt-6">
                            Ansehen & drucken <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </div>

      {/* CHECKLISTEN MODAL (DRUCKBAR) */}
      {isChecklistOpen && (
        <div id="print-overlay" className="z-[9999] fixed inset-0">
           <div className="fixed inset-0 no-print bg-slate-900/90 backdrop-blur-md cursor-pointer" onClick={() => setIsChecklistOpen(false)} />

           <div className="fixed top-0 left-0 w-full z-[100] flex justify-center p-6 no-print pointer-events-none">
              <div className="flex justify-between items-center bg-white p-4 rounded-[1.5rem] shadow-2xl w-full max-w-[210mm] pointer-events-auto border border-slate-100">
                 <div className="text-slate-900 font-bold px-4 flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-[var(--color-primary)]" /> MDK Checkliste
                 </div>
                 <div className="flex gap-4">
                   <Button onClick={handlePrint} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold rounded-xl h-11 px-6 shadow-xl shadow-[var(--color-primary)]/20 transition-all">
                      <Printer className="w-4 h-4 mr-2" /> PDF / Drucken
                   </Button>
                   <button onClick={() => setIsChecklistOpen(false)} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                      <X className="w-6 h-6" />
                   </button>
                 </div>
              </div>
           </div>

           <div id="flyer-content-container" className="z-[100] relative pointer-events-none flex justify-center pt-28 pb-20">
              <div className="flyer-page bg-white text-slate-900 pointer-events-auto shadow-2xl overflow-hidden relative border border-slate-200">
                 <div className="absolute inset-0 p-16 flex flex-col h-full text-left">
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)] rounded-bl-full opacity-30 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary)]" />

                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div>
                          <DalasLogo className="w-40 h-auto text-[var(--color-primary)] mb-6" />
                          <h1 className="text-4xl font-black text-slate-900 leading-[1.1]">
                              Vorbereitung auf <br/>
                              <span className="text-[var(--color-primary)] text-3xl font-bold">den MDK-Besuch</span>
                          </h1>
                        </div>
                        <div className="bg-[var(--color-secondary)] px-6 py-2 rounded-xl border border-[var(--color-primary)]/10">
                            <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">Pflegecheck</p>
                        </div>
                    </div>

                    <div className="mb-10 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex gap-4 items-start shrink-0">
                        <AlertCircle className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed font-bold">
                            Nutzen Sie diese Checkliste zur optimalen Vorbereitung auf den Besuch des Medizinischen Dienstes.
                        </p>
                    </div>

                    <div className="space-y-10 flex-1">
                        <div>
                          <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
                              <FileCheck className="w-6 h-6 text-[var(--color-primary)]" /> 1. Dokumente & Berichte
                          </h3>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                              {["Medikamentenplan", "Entlassungsberichte", "Arztbriefe", "Hilfsmittel", "Therapien", "Diagnosen"].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded border-2 border-[var(--color-primary)] bg-white shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-800 font-bold">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
                              <Clock className="w-6 h-6 text-[var(--color-primary)]" /> 2. Pflegeaufwand (Zeit)
                          </h3>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                              {["Körperpflege", "Mobilität", "Ernährung", "Alltagsbegleitung"].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded border-2 border-[var(--color-primary)] bg-white shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-800 font-bold">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="bg-[var(--color-secondary)]/30 p-8 rounded-[2rem] border border-[var(--color-primary)]/10">
                          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                              <MessageCircle className="w-5 h-5 text-[var(--color-accent)]" /> Wichtig beim Gespräch
                          </h3>
                          <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-5 h-5 rounded border-2 border-[var(--color-accent)] bg-white shrink-0 mt-1" />
                                <div>
                                    <span className="text-sm text-slate-900 font-black block">Realistische Darstellung</span>
                                    <span className="text-xs text-slate-600 font-medium italic">Schildern Sie Defizite so, wie sie an den schlechtesten Tagen auftreten.</span>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="font-black text-slate-900 text-base">Haben Sie Fragen?</p>
                          <p className="text-sm text-slate-500 font-bold">Wir unterstützen Sie kostenlos.</p>
                        </div>
                        <DalasLogo className="w-24 h-auto text-slate-900 opacity-20" />
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}