"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; 
import { ArrowRight, User, Heart, CheckCircle2, HelpCircle, ArrowLeft, Loader2, X, Sparkles, ClipboardCheck, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";

export function CareConfigurator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<{ forWhom?: string; careLevel?: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("openConfigurator") === "true") setIsOpen(true);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleNext = (key: string, value: string) => {
    const newSelection = { ...selection, [key]: value };
    setSelection(newSelection);
    setTimeout(() => {
      if (step < 3) setStep(step + 1);
      else {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 1500);
      }
    }, 200);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    router.replace("/", { scroll: false });
    setTimeout(() => { setStep(1); setSelection({}); }, 300);
  };

  return (
    <>
      {/* ============================================== */}
      {/* COMBINED SECTION: CONFIGURATOR + TRUST         */}
      {/* ============================================== */}
      
      {/* -mt-16 lg:-mt-24: Zieht die Sektion hoch über den Hero.
         z-30: Liegt über dem Hero Background.
      */}
      <section className="relative z-30 -mt-16 lg:-mt-24 px-4 md:px-6 pb-20 pointer-events-none">
        <div className="container mx-auto max-w-5xl">
            
            {/* DIE HAUPTKARTE */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 pointer-events-auto overflow-hidden ring-1 ring-slate-100/50">
                
                {/* 1. OBERER TEIL: TEASER ACTION */}
                <div 
                    onClick={() => setIsOpen(true)}
                    className="relative cursor-pointer group bg-gradient-to-br from-white via-white to-secondary/30 p-8 md:p-12 hover:bg-white transition-all duration-500"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-all duration-500 pointer-events-none translate-x-1/2 -translate-y-1/2" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                        {/* Icon */}
                        <div className="shrink-0 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                            <ClipboardCheck className="w-10 h-10 text-primary" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-primary-deep text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                                30-Sekunden Check
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                                Was steht Ihnen zu? <br className="hidden lg:block" />
                                <span className="text-primary">Prüfen Sie Ihren Anspruch.</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Kostenlos, anonym und in wenigen Klicks zum Ergebnis.</p>
                        </div>

                        {/* Button */}
                        <div className="shrink-0">
                            <div className="h-14 px-8 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 group-hover:bg-primary-hover group-hover:shadow-primary/40 group-hover:-translate-y-1 transition-all duration-300">
                                Check starten
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. UNTERER TEIL: TRUST BAR (Integriert als Footer) */}
                <div className="bg-slate-50 border-t border-slate-100 p-6 md:px-12 md:py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start justify-center">
                        
                        {/* Trust Item 1 */}
                        <div className="flex items-center gap-3 group/item">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm font-black text-xs relative overflow-hidden group-hover/item:border-primary/30 transition-colors">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                1.0
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">MDK Note</span>
                                <span className="text-sm font-bold text-slate-700">Exzellente Qualität</span>
                            </div>
                        </div>

                        {/* Trust Item 2 */}
                        <div className="flex items-center gap-3 group/item">
                             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover/item:border-primary/30 transition-colors">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Abrechnung</span>
                                <span className="text-sm font-bold text-slate-700">Alle Pflegekassen</span>
                            </div>
                        </div>

                        {/* Trust Item 3 */}
                        <div className="flex items-center gap-3 group/item">
                             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover/item:border-primary/30 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Mitgliedschaft</span>
                                <span className="text-sm font-bold text-slate-700">Im Pflegeverband</span>
                            </div>
                        </div>

                        {/* Trust Item 4 */}
                        <div className="flex items-center gap-3 group/item">
                             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover/item:border-primary/30 transition-colors">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Erfahrung</span>
                                <span className="text-sm font-bold text-slate-700">Seit über 10 Jahren</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* MODAL (Das Popup - Funktionalität bleibt)      */}
      {/* ============================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-primary-deep/40 backdrop-blur-sm" onClick={resetAndClose} />
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-white sticky top-0 z-20">
                 <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Pflege-Check</div>
                    {!isCalculating && step <= 3 && (
                        <div className="flex gap-2">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500 ease-out", s <= step ? "w-8 bg-primary" : "w-2 bg-slate-100")} />
                            ))}
                        </div>
                    )}
                 </div>
                 <button onClick={resetAndClose} className="p-2 bg-secondary hover:bg-red-50 rounded-full transition-colors group">
                    <X className="w-6 h-6 text-primary/60 group-hover:text-red-500 transition-colors" />
                 </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar relative">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Für wen suchen Sie Unterstützung?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => handleNext("forWhom", "mich")} className="group p-8 rounded-[2rem] border border-slate-100 bg-secondary/30 hover:border-primary/30 hover:bg-secondary hover:shadow-lg transition-all text-center flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary shadow-sm group-hover:scale-110 transition-all"><User className="w-8 h-8" /></div>
                                <span className="font-bold text-slate-900 text-lg">Für mich selbst</span>
                            </button>
                            <button onClick={() => handleNext("forWhom", "angehoerige")} className="group p-8 rounded-[2rem] border border-slate-100 bg-secondary/30 hover:border-primary/30 hover:bg-secondary hover:shadow-lg transition-all text-center flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary shadow-sm group-hover:scale-110 transition-all"><Heart className="w-8 h-8" /></div>
                                <span className="font-bold text-slate-900 text-lg">Für Angehörige</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Besteht bereits ein Pflegegrad?</h3>
                        <div className="grid gap-3 max-w-md mx-auto">
                            {[{ label: "Ja, Pflegegrad ist vorhanden", icon: CheckCircle2 }, { label: "Nein, noch nicht", icon: HelpCircle }, { label: "Ist bereits beantragt", icon: Loader2 }].map((opt) => (
                                <button key={opt.label} onClick={() => handleNext("careLevel", opt.label)} className="w-full p-5 rounded-2xl border border-slate-100 bg-white hover:border-primary hover:bg-secondary/30 hover:shadow-md transition-all text-left font-bold text-slate-700 hover:text-primary flex justify-between items-center group">
                                    <span className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white"><opt.icon className="w-4 h-4" /></div>{opt.label}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isCalculating && (
                    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in">
                        <div className="relative mb-6"><div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-primary animate-spin" /><Heart className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse fill-current" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Analyse läuft...</h3>
                    </div>
                )}

                {!isCalculating && step === 3 && (
                    <div className="text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8" /></div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Gute Nachrichten!</h3>
                        <p className="text-slate-600 mb-8 max-w-md mx-auto">Wir können Sie unterstützen.</p>
                        <Link href={{ pathname: '/kontakt', query: { who: selection.forWhom, level: selection.careLevel } }}>
                            <Button size="lg" className="w-full h-14 px-10 text-lg bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Jetzt Beratung anfordern</Button>
                        </Link>
                    </div>
                )}
              </div>
              
              {step === 2 && !isCalculating && (
                  <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                    <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-primary flex items-center gap-2 text-sm font-bold pl-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
                  </div>
              )}
           </div>
        </div>
      )}
    </>
  );
}