"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { 
  Heart, MapPin, X, Printer, Phone, FileText, CheckCircle2, Quote, 
  Bath, Syringe, HelpCircle 
} from "lucide-react";
import { DalasLogo } from "@/shared/ui/dalas-logo"; 

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FlyerModal({ isOpen, onClose }: FlyerModalProps) {
  
  // Scroll-Lock für den Hintergrund (nur für Screen relevant)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    // HAUPT-WRAPPER
    // Screen: Ein fixiertes Overlay mit Blur.
    // Print: Ein absoluter Container, der alles andere überlagert.
    <div 
      id="print-overlay" 
      className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto print:absolute print:inset-0 print:bg-white print:overflow-visible print:h-auto print:block"
    >
         
         {/* HEADER / UI (Verschwindet im Druck durch 'print:hidden') */}
         <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 print:hidden pointer-events-none">
            <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl w-full max-w-[210mm] pointer-events-auto">
               <div className="text-white font-bold px-3">Broschüre (5 Seiten)</div>
               <div className="flex gap-3">
                 <Button onClick={handlePrint} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold rounded-xl gap-2 shadow-lg cursor-pointer">
                    <Printer className="w-4 h-4" /> PDF / Drucken
                 </Button>
                 <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer">
                    <X className="w-6 h-6" />
                 </button>
               </div>
            </div>
         </div>
         
         {/* Schließen per Klick auf Hintergrund (Screen only) */}
         <div className="fixed inset-0 cursor-pointer print:hidden" onClick={onClose} />

         {/* CONTENT CONTAINER */}
         {/* Screen: Flex Column mit Abstand. */}
         {/* Print: Block ohne Abstand (Seiten folgen direkt aufeinander). */}
         <div 
            id="flyer-content-container" 
            className="relative pointer-events-none flex flex-col items-center gap-16 pt-24 pb-20 min-h-screen print:block print:h-auto print:min-h-0 print:pt-0 print:pb-0 print:gap-0"
         >
            
            {/* ================= SEITE 1 ================= */}
            <div className="flyer-page pointer-events-auto bg-[var(--color-secondary)] w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative print:shadow-none print:break-after-page print:mb-0">
               <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-16 md:p-24">
                   <div className="absolute top-0 right-0 w-[80mm] h-[80mm] bg-white/20 rounded-bl-[100%] pointer-events-none" />
                   <div className="absolute bottom-0 left-0 w-[80mm] h-[80mm] bg-[var(--color-primary)]/10 rounded-tr-[100%] pointer-events-none" />
                   
                   <div className="mb-10 relative z-10 scale-150">
                        <DalasLogo />
                   </div>
                   
                   <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[var(--color-primary)] text-sm font-bold tracking-wide uppercase shadow-sm mb-8 relative z-10">
                       <Heart className="w-4 h-4 fill-current" /> Ambulanter Intensivpflegedienst
                   </div>

                   <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight relative z-10">
                      Ihr Wegweiser für <br/>
                      <span className="text-[var(--color-primary)]">gute Pflege.</span>
                   </h1>
                   
                   <p className="text-xl text-slate-600 max-w-lg mx-auto mb-12 relative z-10">
                      Informationen, Checklisten und unser Konzept für Sie zusammengefasst.
                   </p>

                   <div className="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-12 z-10">
                      <Image src="/images/team/team.jpg" alt="Das DALAS Team" fill className="object-cover" />
                   </div>

                   <div className="mt-auto bg-white p-6 rounded-2xl shadow-xl border border-[var(--color-primary)]/10 w-full max-w-md relative z-10 print:shadow-none">
                      <p className="font-bold text-slate-900 text-lg mb-1">Dalas UG</p>
                      <p className="text-slate-600 flex items-center justify-center gap-2"><MapPin className="w-4 h-4 text-[var(--color-accent)]"/> Borsigallee 37, 60388 Frankfurt</p>
                      <p className="text-[var(--color-primary)] font-bold mt-2">www.pflegedienst-dalas.com</p>
                   </div>
               </div>
            </div>

             {/* ================= SEITE 2 ================= */}
             <div className="flyer-page pointer-events-auto bg-white w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative print:shadow-none print:break-after-page print:mb-0">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b pb-4">Unser Pflege-Konzept</h2>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                       Pflege ist Vertrauenssache. Damit Sie wissen, worauf Sie sich einlassen, haben wir unser Prinzip "Herz & Hand" dem üblichen Marktstandard gegenübergestellt.
                    </p>

                    <div className="grid gap-8 mb-12">
                       <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                          <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><X className="w-5 h-5 text-red-400"/> Markt-Standard</h3>
                          <ul className="space-y-4">
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Häufiger Wechsel der Pflegekräfte</li>
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Zeitdruck & Hektik bei der Versorgung</li>
                             <li className="flex gap-3 text-slate-600"><X className="text-red-400 shrink-0 mt-1" /> Anonyme Abwicklung</li>
                          </ul>
                       </div>

                       <div className="bg-[var(--color-secondary)]/30 p-8 rounded-2xl border border-[var(--color-primary)]/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/10 rounded-bl-full" />
                          <h3 className="font-bold text-[var(--color-primary)] uppercase tracking-widest text-sm mb-4 flex items-center gap-2 relative z-10"><CheckCircle2 className="w-5 h-5"/> Bei DALAS</h3>
                          <ul className="space-y-4 relative z-10">
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> Maximal 3 Bezugspersonen</li>
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> Zeit für Gespräche & Zuwendung</li>
                             <li className="flex gap-3 font-bold text-slate-800"><CheckCircle2 className="text-[var(--color-primary)] shrink-0 mt-1" /> 24h Erreichbarkeit im Notfall</li>
                          </ul>
                       </div>
                    </div>

                    <div className="mt-auto p-8 bg-[var(--color-primary)] text-white rounded-2xl italic text-center text-xl shadow-lg relative overflow-hidden print:shadow-none">
                       <Quote className="absolute top-4 left-4 w-12 h-12 text-[var(--color-accent)] opacity-30" />
                       "Wir pflegen so, wie wir selbst gepflegt werden möchten."
                    </div>
                </div>
            </div>
            
            {/* ================= SEITE 3 ================= */}
            <div className="flyer-page pointer-events-auto bg-slate-50 w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative print:shadow-none print:break-after-page print:mb-0">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">Die ersten Schritte</h2>
                    <p className="text-lg text-slate-600 mb-10">Wenn plötzlich Pflege nötig wird, ist die Unsicherheit oft groß. Hier ist ein einfacher Fahrplan für Sie.</p>

                    <div className="space-y-8 flex-1">
                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">1</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Antrag stellen</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Stellen Sie einen formlosen Antrag auf Pflegeleistungen bei Ihrer Pflegekasse (befindet sich bei der Krankenkasse). Ein einfacher Anruf genügt oft für den Anfang, um die Frist zu wahren.</p>
                          </div>
                       </div>

                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">2</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Pflegedienst kontaktieren</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Rufen Sie uns an (<strong>06109 715 99 16</strong>). Wir vereinbaren einen unverbindlichen Erstbesuch bei Ihnen zu Hause, um den individuellen Bedarf einzuschätzen. Wir helfen Ihnen auch gerne beim Ausfüllen der Formulare.</p>
                          </div>
                       </div>

                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">3</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Begutachtung (MDK)</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Der Medizinische Dienst prüft den Pflegegrad. Wir sind beim Termin gerne dabei.</p>
                          </div>
                       </div>
                       
                       <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-[var(--color-primary)] shadow-sm shrink-0 border border-[var(--color-primary)]/10">4</div>
                          <div>
                             <h3 className="font-bold text-xl text-slate-900 mb-2">Start der Versorgung</h3>
                             <p className="text-slate-700 leading-relaxed text-sm">Unser festes Team kommt zu den vereinbarten Zeiten zu Ihnen. Ein transparenter Pflegevertrag regelt alle Details.</p>
                          </div>
                       </div>
                    </div>
                </div>
            </div>

            {/* ================= SEITE 4 ================= */}
            <div className="flyer-page pointer-events-auto bg-white w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative print:shadow-none print:break-after-page print:mb-0">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Unsere Leistungen</h2>
                    <p className="text-lg text-slate-600 mb-10">Wir bieten eine umfassende Versorgung, abgestimmt auf Ihre Bedürfnisse. Hier ein Überblick.</p>
                    
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { title: "Grundpflege", icon: Bath, items: ["Körperpflege", "An- und Auskleiden", "Nahrungsaufnahme", "Mobilisation"] },
                         { title: "Behandlungspflege", icon: Syringe, items: ["Medikamentengabe", "Wundversorgung", "Injektionen", "Blutzucker"] },
                         { title: "Betreuung", icon: Heart, items: ["Haushaltshilfe", "Begleitung zu Terminen", "Spaziergänge", "Entlastung"] },
                         { title: "Beratung", icon: HelpCircle, items: ["Beratungseinsätze § 37.3", "Hilfe bei Anträgen", "Schulungen", "Kostenklärung"] }
                       ].map((service, i) => (
                         <div key={i} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                                 <service.icon className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
                               <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                 {service.items.map((item, idx) => (
                                   <li key={idx} className="text-slate-600 text-xs flex items-start gap-2">
                                     <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 mt-1.5"/> {item}
                                   </li>
                                 ))}
                               </ul>
                            </div>
                         </div>
                       ))}
                    </div>
                </div>
            </div>

            {/* ================= SEITE 5 ================= */}
            <div className="flyer-page pointer-events-auto bg-[var(--color-primary)] text-white w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative print:shadow-none print:break-after-auto print:mb-0">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col justify-center items-center text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay z-0" />
                    
                    <div className="relative z-10 w-full max-w-2xl px-4">
                        <h2 className="text-4xl font-black mb-6">Wir sind für Sie da.</h2>
                        <p className="text-lg opacity-90 mb-12">
                           Zögern Sie nicht, uns anzurufen. Ein Gespräch bringt oft sofort Klarheit.
                        </p>

                        <div className="bg-white text-slate-900 rounded-[2rem] p-10 shadow-2xl text-left relative overflow-hidden print:shadow-none">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] rounded-bl-[100px] -z-0" />
                           
                           <div className="relative z-10">
                             <DalasLogo className="w-40 h-auto mb-8 text-[var(--color-primary)]" />
                             
                             <div className="space-y-6">
                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><MapPin className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Anschrift</div>
                                      <div className="text-slate-600">Borsigallee 37, 60388 Frankfurt</div>
                                   </div>
                                </div>

                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><Phone className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Telefon</div>
                                      <div className="text-2xl font-black text-[var(--color-primary)]">06109 715 99 16</div>
                                      <div className="text-slate-500">Mobil: 0179 323 67 45</div>
                                   </div>
                                </div>

                                <div className="flex gap-4">
                                   <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] shrink-0"><FileText className="w-5 h-5" /></div>
                                   <div>
                                      <div className="font-bold">Online</div>
                                      <div className="text-slate-600 break-all">dalas.pflegedienst@gmail.com</div>
                                      <div className="text-slate-600">www.pflegedienst-dalas.com</div>
                                   </div>
                                </div>
                             </div>
                           </div>
                        </div>

                        <div className="mt-12 opacity-60 text-xs">
                           © 2025 Ambulanter Intensivpflegedienst Dalas UG<br/>
                           Alle Kassen & Privat
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </div>
  );
}