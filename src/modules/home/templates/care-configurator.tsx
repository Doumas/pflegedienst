"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 
import { 
  ArrowRight, User, Heart, CheckCircle2, HelpCircle, ArrowLeft, Loader2, X, Sparkles, 
  ClipboardCheck, ShieldCheck, Stethoscope, Coffee, Activity, CalendarDays, Clock
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";

export function CareConfigurator({ minimal = false }: { minimal?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<{ 
    forWhom?: string; 
    careLevel?: string;
    serviceType?: string; 
    frequency?: string;   
  }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("openConfigurator") === "true") setIsOpen(true);
    else setIsOpen(false);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleNext = (key: string, value: string) => {
    const newSelection = { ...selection, [key]: value };
    setSelection(newSelection);
    
    setTimeout(() => {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 1500);
        setStep(5);
      }
    }, 250);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("openConfigurator");
    const nextUrl = `${pathname}?${nextSearchParams.toString()}`;
    router.replace(nextUrl, { scroll: false });
    
    setTimeout(() => { setStep(1); setSelection({}); }, 300);
  };

  const handleFinish = () => {
    setIsOpen(false);
    const params = new URLSearchParams();
    if (selection.forWhom) params.set("who", selection.forWhom);
    if (selection.careLevel) params.set("level", selection.careLevel);
    if (selection.serviceType) params.set("type", selection.serviceType);
    if (selection.frequency) params.set("freq", selection.frequency);
    
    router.push(`/kontakt?${params.toString()}`);
    setTimeout(() => { setStep(1); setSelection({}); }, 300);
  };

  return (
    <>
      {/* 1. TEASER SECTION (Sichtbar auf der Startseite) */}
      {!minimal && (
        <section id="pflege-wegweiser" className="relative z-30 mt-0 lg:-mt-24 px-4 md:px-6 pb-20 pointer-events-none">
            <div className="container mx-auto max-w-5xl">
                {/* Pointer-events-auto damit Klickbar trotz Section pointer-none */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 pointer-events-auto overflow-hidden ring-1 ring-slate-100/50 transform transition-all hover:scale-[1.01] hover:shadow-[var(--color-primary)]/10">
                    
                    <div onClick={() => setIsOpen(true)} className="relative cursor-pointer group bg-gradient-to-br from-white via-[var(--color-secondary)]/30 to-[var(--color-secondary)] p-8 md:p-12 hover:bg-white transition-all duration-500">
                        
                        {/* Glow Effekt */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[80px] group-hover:bg-[var(--color-primary)]/10 transition-all duration-500 pointer-events-none translate-x-1/2 -translate-y-1/2" />
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                            {/* Icon Box */}
                            <div className="shrink-0 w-24 h-24 bg-white rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-md group-hover:border-[var(--color-primary)]/20">
                                <ClipboardCheck className="w-10 h-10 text-[var(--color-primary)]" />
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 text-center md:text-left space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)] animate-pulse" />
                                    {/* Standard Klasse statt custom 'text-label' */}
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Profi-Check</span>
                                </div>
                                
                                {/* Standard Klassen statt custom 'text-h2' */}
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight text-balance leading-[1.1]">
                                    Was steht Ihnen zu? <br className="hidden lg:block" />
                                    <span className="text-[var(--color-primary)]">Prüfen Sie Ihren Anspruch.</span>
                                </h2>
                                
                                {/* Standard Klasse statt custom 'text-body-lg' */}
                                <p className="text-lg font-medium text-slate-500">Kostenlos, anonym und in wenigen Klicks zum Ergebnis.</p>
                            </div>
                            
                            {/* Button */}
                            <div className="shrink-0 w-full md:w-auto">
                                <div className="h-14 px-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[var(--color-primary)]/20 group-hover:bg-[var(--color-primary-hover)] group-hover:shadow-[var(--color-primary)]/40 group-hover:-translate-y-1 transition-all duration-300 w-full md:w-auto">
                                    Check starten <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="bg-slate-50/80 border-t border-slate-100 p-6 md:px-12 md:py-8 backdrop-blur-sm">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-center">
                            <div className="flex items-center gap-3 group/item">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)] shadow-sm font-black text-xs group-hover/item:border-[var(--color-primary)] transition-colors">1.0</div>
                                <div className="flex flex-col"><span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">MDK Note</span><span className="text-sm font-bold text-slate-700">Exzellente Qualität</span></div>
                            </div>
                            <div className="flex items-center gap-3 group/item">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover/item:border-[var(--color-primary)] transition-colors"><ShieldCheck className="w-5 h-5" /></div>
                                <div className="flex flex-col"><span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">Abrechnung</span><span className="text-sm font-bold text-slate-700">Alle Pflegekassen</span></div>
                            </div>
                            <div className="flex items-center gap-3 group/item">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover/item:border-[var(--color-primary)] transition-colors"><Heart className="w-5 h-5" /></div>
                                <div className="flex flex-col"><span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">Fokus</span><span className="text-sm font-bold text-slate-700">Bezugspflege</span></div>
                            </div>
                            <div className="flex items-center gap-3 group/item">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover/item:border-[var(--color-primary)] transition-colors"><CheckCircle2 className="w-5 h-5" /></div>
                                <div className="flex flex-col"><span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">Kostenlos</span><span className="text-sm font-bold text-slate-700">Erstberatung</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* 2. MODAL LOGIK */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-[var(--color-primary-deep)]/40 backdrop-blur-sm" onClick={resetAndClose} />
           
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-white sticky top-0 z-20">
                 <div>
                    <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Pflege-Check</div>
                    {!isCalculating && step <= 4 && (
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500 ease-out", s <= step ? "w-8 bg-[var(--color-primary)]" : "w-2 bg-slate-100")} />
                            ))}
                        </div>
                    )}
                 </div>
                 <button onClick={resetAndClose} className="p-2 bg-slate-50 hover:bg-red-50 rounded-full transition-colors group cursor-pointer">
                    <X className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                 </button>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar relative min-h-[400px]">
                
                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                        {/* Standard Klasse statt 'text-h3' */}
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Für wen suchen Sie Unterstützung?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => handleNext("forWhom", "mich")} className="group p-8 rounded-[2rem] border border-slate-100 bg-[var(--color-secondary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-lg transition-all text-center flex flex-col items-center gap-4 cursor-pointer">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-all"><User className="w-8 h-8" /></div>
                                <span className="font-bold text-slate-900 text-lg">Für mich selbst</span>
                            </button>
                            <button onClick={() => handleNext("forWhom", "angehoerige")} className="group p-8 rounded-[2rem] border border-slate-100 bg-[var(--color-secondary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-lg transition-all text-center flex flex-col items-center gap-4 cursor-pointer">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[var(--color-accent)] shadow-sm group-hover:scale-110 transition-all"><Heart className="w-8 h-8" /></div>
                                <span className="font-bold text-slate-900 text-lg">Für Angehörige</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Besteht bereits ein Pflegegrad?</h3>
                        <div className="grid gap-3 max-w-md mx-auto">
                            {[{ label: "Ja, vorhanden", icon: CheckCircle2 }, { label: "Nein, noch nicht", icon: HelpCircle }, { label: "Ist bereits beantragt", icon: Loader2 }].map((opt) => (
                                <button key={opt.label} onClick={() => handleNext("careLevel", opt.label)} className="w-full p-5 rounded-2xl border border-slate-100 bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-md transition-all text-left font-bold text-slate-700 hover:text-[var(--color-primary)] flex justify-between items-center group cursor-pointer">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors"><opt.icon className="w-4 h-4" /></div>
                                        {opt.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[var(--color-accent)]" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Wobei wird Hilfe benötigt?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { id: "Körperpflege", icon: User, text: "Waschen, Duschen & Anziehen" },
                                { id: "Medizinische Pflege", icon: Stethoscope, text: "Medikamente, Spritzen & Wunden" },
                                { id: "Haushalt & Betreuung", icon: Coffee, text: "Haushalt, Einkauf & Gesellschaft" },
                                { id: "Intensivpflege", icon: Activity, text: "Intensivpflege oder 24h Betreuung" }
                            ].map((opt) => (
                                <button key={opt.id} onClick={() => handleNext("serviceType", opt.id)} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-md transition-all flex flex-col items-center text-center gap-3 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors"><opt.icon className="w-6 h-6" /></div>
                                    <span className="font-bold text-slate-700 leading-tight group-hover:text-[var(--color-primary)] transition-colors">{opt.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Wie oft wünschen Sie Unterstützung?</h3>
                        <div className="grid gap-3 max-w-md mx-auto">
                            {[{ label: "Täglich / Mehrmals täglich", icon: Clock }, { label: "Mehrmals pro Woche", icon: CalendarDays }, { label: "Noch unsicher / Beratung nötig", icon: HelpCircle }].map((opt) => (
                                <button key={opt.label} onClick={() => handleNext("frequency", opt.label)} className="w-full p-5 rounded-2xl border border-slate-100 bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-md transition-all text-left font-bold text-slate-700 hover:text-[var(--color-primary)] flex justify-between items-center group cursor-pointer">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors"><opt.icon className="w-4 h-4" /></div>
                                        {opt.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[var(--color-accent)]" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* LOADING */}
                {isCalculating && (
                    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-[var(--color-primary)] animate-spin" />
                            <Heart className="absolute inset-0 m-auto w-8 h-8 text-[var(--color-accent)] animate-pulse fill-current" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Auswertung läuft...</h3>
                        <p className="text-slate-500">Wir prüfen die besten Optionen für Sie.</p>
                    </div>
                )}

                {/* STEP 5: ERGEBNIS */}
                {!isCalculating && step === 5 && (
                    <div className="text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center h-full py-8">
                        <div className="w-20 h-20 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-slate-50">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Analyse abgeschlossen!</h3>
                        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed font-medium">
                            Vielen Dank. Basierend auf Ihren Angaben haben wir erste Möglichkeiten für Sie ermittelt. <br/>
                            <strong className="text-slate-900">Fordern Sie jetzt Ihre unverbindliches Ergebnis an.</strong>
                        </p>
                        
                        <Button 
                            onClick={handleFinish}
                            size="lg" 
                            className="w-full max-w-sm h-14 px-10 text-lg text-white font-bold rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                        >
                            Ergebnis & Beratung anfordern
                        </Button>
                        <p className="text-xs text-slate-400 mt-4 font-medium">100% Kostenlos & Unverbindlich.</p>
                    </div>
                )}
              </div>
              
              {/* Footer */}
              {step > 1 && !isCalculating && step < 5 && (
                  <div className="p-4 border-t border-slate-50 bg-slate-50/50 backdrop-blur-sm">
                    <button onClick={handleBack} className="text-slate-400 hover:text-[var(--color-primary)] flex items-center gap-2 text-sm font-bold pl-2 transition-colors cursor-pointer w-fit">
                        <ArrowLeft className="w-4 h-4" /> Schritt zurück
                    </button>
                  </div>
              )}
           </div>
        </div>
      )}
    </>
  );
}