"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { 
  HelpCircle, Phone, MessageCircle, ChevronDown, Sparkles, Wallet, 
  Clock, ShieldCheck, HeartHandshake, MapPin, Activity, FileText, 
  ArrowRight, Download, X, Printer, CheckSquare, AlertCircle, FileCheck 
} from "lucide-react";
import Link from "next/link";
import { DalasLogo } from "@/shared/ui/dalas-logo";

const faqData = [
  // ... (Die FAQ Daten bleiben unverändert, um Platz zu sparen) ...
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
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* 1. Statisches Raster */}
      <div className="hide-on-print absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* 2. Bewegliche Blobs (Verstecken beim Drucken) */}
      <div className="hide-on-print absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="hide-on-print absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
      <div className="hide-on-print absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />


      {/* ========================================================= */}
      {/* INHALT (WEBSEITE)                                         */}
      {/* ========================================================= */}
      <div className="hide-on-print relative z-10">
      
        {/* --- 1. HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 text-center px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              <span>Wissenswertes</span>
            </div>

           <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Häufige Fragen & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] relative inline-block">
                 Antworten.
                 <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                 </svg>
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Hier finden Sie detaillierte Informationen zu unseren Leistungen, Kosten und dem Ablauf. 
              Transparenz ist für uns der erste Schritt zur Vertrauensbasis.
            </p>
          </div>
        </section>

        {/* --- 2. GRID BEREICH --- */}
        <div className="container pb-24 px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LINKS: Die FAQ Liste */}
            <div className="lg:col-span-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              {faqData.map((item, i) => (
                <div key={i} className="group bg-white rounded-[1.5rem] border border-[var(--color-border-soft)] hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all duration-300 overflow-hidden">
                  <details className="group/details">
                    <summary className="flex items-start md:items-center gap-4 p-6 cursor-pointer list-none select-none">
                      <div className="mt-1 md:mt-0 w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0 border border-transparent transition-colors duration-300 group-hover:text-[var(--color-accent)] group-open/details:bg-[var(--color-accent)] group-open/details:text-white group-open/details:group-hover:text-white">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                          {item.question}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-open/details:bg-[var(--color-accent)] group-open/details:text-white group-open/details:group-hover:text-white group-open/details:rotate-180 transition-all duration-300 shrink-0">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0 pl-[5rem]">
                      <div className="text-slate-600 leading-relaxed border-l-2 border-[var(--color-secondary)] group-open/details:border-[var(--color-accent)] pl-4 py-1 text-pretty font-medium transition-colors">
                        {item.answer}
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {/* RECHTS: Sidebar */}
            <div className="lg:col-span-4 space-y-8 sticky top-32 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
              
              {/* Kontakt Box */}
              <div className="bg-white border border-[var(--color-border-soft)] p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-50" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-border-soft)] shadow-sm text-[var(--color-primary)]">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Frage nicht gefunden?</h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Jede Pflegesituation ist einzigartig. Lassen Sie uns persönlich darüber sprechen.
                  </p>
                  <div className="space-y-4">
                    <a href={`tel:061097159916`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[var(--color-secondary)] border border-transparent hover:border-[var(--color-border-soft)] transition-all group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[var(--color-primary)] transition-colors">
                         <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Rufen Sie uns an</div>
                        <div className="font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">06109 715 99 16</div>
                      </div>
                    </a>
                    <Link href="/kontakt" className="block w-full">
                      <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white h-12 text-base font-bold shadow-lg shadow-[var(--color-primary)]/20 rounded-2xl hover:-translate-y-0.5 transition-all">
                        Nachricht schreiben
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* DOWNLOAD BOX - CLICKABLE */}
              <div 
                onClick={() => setIsChecklistOpen(true)}
                className="block bg-[var(--color-footer-bg)] text-white rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1"
              >
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-accent)]/20 transition-colors" />
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl" />
                 
                 <div className="relative z-10">
                   <div className="flex items-start justify-between mb-6">
                     <div>
                       <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wide text-[var(--color-accent)] mb-3 backdrop-blur-sm">
                         <FileText className="w-3 h-3" /> Kostenlos
                       </div>
                       <h4 className="font-bold text-xl leading-tight mb-2">Checkliste: <br/>Pflegegrad beantragen</h4>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-slate-900 transition-all backdrop-blur-sm">
                        <Download className="w-5 h-5" />
                     </div>
                   </div>
                   <p className="text-sm text-white/70 mb-6 leading-relaxed">
                     Schritt-für-Schritt Anleitung zur Vorbereitung auf den MDK-Besuch als PDF.
                   </p>
                   <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[var(--color-accent)] transition-colors border-t border-white/10 pt-4">
                      Jetzt ansehen & drucken <ArrowRight className="w-4 h-4" />
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>

     {/* ... (Rest der Datei bleibt gleich) ... */}

      {/* ========================================================= */}
      {/* CHECKLISTEN MODAL (DRUCKBAR - OPTIMIERT)                  */}
      {/* ========================================================= */}
      {isChecklistOpen && (
        <div id="print-overlay">
           
           <div className="fixed inset-0 no-print cursor-pointer bg-slate-900/80 backdrop-blur-sm z-[99]" onClick={() => setIsChecklistOpen(false)} />

           {/* CONTROLS */}
           <div className="fixed top-0 left-0 w-full z-[100] flex justify-center p-4 no-print pointer-events-none">
              <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl w-full max-w-[210mm] pointer-events-auto">
                 <div className="text-white font-bold px-3">Checkliste MDK (1 Seite)</div>
                 <div className="flex gap-3">
                   <Button onClick={handlePrint} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold rounded-xl gap-2 shadow-lg">
                      <Printer className="w-4 h-4" /> PDF / Drucken
                   </Button>
                   <button onClick={() => setIsChecklistOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                      <X className="w-6 h-6" />
                   </button>
                 </div>
              </div>
           </div>

           {/* CONTAINER */}
           <div id="flyer-content-container" className="z-[100] relative pointer-events-none flex justify-center pt-24 pb-20">
              
              {/* === DAS BLATT PAPIER === */}
              <div className="flyer-page bg-white text-slate-900 pointer-events-auto relative overflow-hidden">
                 
                 {/* Padding Wrapper - Etwas kompakter für sicheren Druck */}
                 <div className="absolute inset-0 p-10 md:p-12 flex flex-col h-full justify-between">
                    
                    {/* Deko oben */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-secondary)] rounded-bl-full opacity-50 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary)] pointer-events-none" />

                    {/* HEADER */}
                    <div className="flex justify-between items-start mb-8 relative z-10 shrink-0">
                        <div>
                          <DalasLogo className="w-32 h-auto text-[var(--color-primary)] mb-4" />
                          <h1 className="text-3xl font-black text-slate-900 leading-none">
                              Checkliste:<br/>
                              <span className="text-[var(--color-primary)] text-2xl">Vorbereitung auf den MDK</span>
                          </h1>
                        </div>
                        <div className="text-right pt-2">
                          <div className="bg-[var(--color-secondary)] px-4 py-1.5 rounded-lg inline-block border border-[var(--color-border-soft)]">
                              <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">Pflegegrad</p>
                          </div>
                        </div>
                    </div>

                    {/* INTRO */}
                    <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-2 shrink-0 print-break-inside-avoid">
                        <div className="flex gap-3 items-start">
                          <AlertCircle className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">
                              Der MDK-Besuch entscheidet über Ihre Leistungen. Nutzen Sie diese Liste, um nichts zu vergessen.
                          </p>
                        </div>
                    </div>

                    {/* CHECKLISTE GRID */}
                    <div className="space-y-8 flex-1">
                        
                        {/* 1. Dokumente */}
                        <div className="print-break-inside-avoid">
                          <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                              <FileCheck className="w-5 h-5 text-[var(--color-primary)]" /> 1. Dokumente bereitlegen
                          </h3>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                              {["Aktueller Medikamentenplan", "Arztberichte & Entlassungsberichte", "Liste der behandelnden Ärzte", "Bescheide (Versorgungsamt)", "Nachweise über Therapien", "Pflegedokumentation"].map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white shrink-0" />
                                    <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* 2. Pflegetagebuch */}
                        <div className="print-break-inside-avoid">
                          <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                              <Clock className="w-5 h-5 text-[var(--color-primary)]" /> 2. Pflegetagebuch führen
                          </h3>
                          <p className="text-xs text-slate-500 mb-3 italic pl-1">Tipp: Notieren Sie 3-5 Tage lang jeden Handgriff. Oft unterschätzt man den eigenen Aufwand.</p>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                              {["Körperpflege (Waschen, Duschen)", "Ernährung (Zubereitung, Essen)", "Mobilität (Treppen, Bett)", "Begleitung zu Ärzten"].map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white shrink-0" />
                                    <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* 3. Das Gespräch */}
                        <div className="print-break-inside-avoid">
                          <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                              <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" /> 3. Während des Gesprächs
                          </h3>
                          <div className="space-y-3">
                              <div className="flex items-start gap-3 bg-[var(--color-secondary)]/30 p-3 rounded-xl border border-[var(--color-primary)]/5">
                                <div className="w-5 h-5 rounded border-2 border-slate-400 bg-white shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-sm text-slate-900 font-bold block mb-0.5">Nicht beschönigen!</span>
                                    <span className="text-xs text-slate-600">Schildern Sie den <u>schlechtesten</u> Tag, nicht den besten.</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 pl-2">
                                <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white shrink-0" />
                                <span className="text-sm text-slate-700 font-medium">Pflegeperson (Angehörige) anwesend?</span>
                              </div>
                          </div>
                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center shrink-0">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Wir unterstützen Sie dabei.</p>
                          <p className="text-xs text-slate-600">Tel: 06109 715 99 16</p>
                        </div>
                        <div className="text-right opacity-50">
                          <DalasLogo className="w-20 h-auto text-slate-900" />
                        </div>
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}