"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 
import { 
  ArrowRight, User, Heart, CheckCircle2, HelpCircle, ArrowLeft, Loader2, X, 
  ClipboardCheck, ShieldCheck, Stethoscope, Coffee, Activity, CalendarDays, Clock
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
// import { AnimatedBackground } from "@/shared/ui/animated-background"; // Falls benötigt, sonst auskommentiert lassen

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.1 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- CUSTOM ICON FÜR BADGE (CLIPBOARD CHECK) ---
const CheckIcon = (props: any) => (
    <motion.svg 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}
        initial="hidden" whileInView="visible" viewport={{ once: true }}
    >
        <motion.path d="M9 11l3 3L22 4" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.5, delay: 0.2 } } }} />
        <motion.path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.8 } } }} />
    </motion.svg>
);


export function CareConfigurator({ minimal = false }: { minimal?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); 
  
  const [selection, setSelection] = useState<{ 
    forWhom?: string; 
    careLevel?: string;
    serviceType?: string; 
    frequency?: string;   
  }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  
  const { ref: teaserRef, isInCenter: isTeaserActive } = useInCenter();

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
    setDirection(1); 
    
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
    if (step > 1) {
        setDirection(-1); 
        setStep(step - 1);
    }
  };

  const resetAndClose = () => {
    setIsOpen(false);
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("openConfigurator");
    const nextUrl = `${pathname}?${nextSearchParams.toString()}`;
    router.replace(nextUrl, { scroll: false });
    
    setTimeout(() => { setStep(1); setSelection({}); setDirection(0); }, 300);
  };

  const handleFinish = () => {
    setIsOpen(false);
    const params = new URLSearchParams();
    if (selection.forWhom) params.set("who", selection.forWhom);
    if (selection.careLevel) params.set("level", selection.careLevel);
    if (selection.serviceType) params.set("type", selection.serviceType);
    if (selection.frequency) params.set("freq", selection.frequency);
    
    router.push(`/kontakt?${params.toString()}`);
    setTimeout(() => { setStep(1); setSelection({}); setDirection(0); }, 300);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <>
      {/* 1. TEASER SECTION */}
      {!minimal && (
        <section id="pflege-wegweiser" className="relative z-30 mt-0 lg:-mt-20 px-4 md:px-6 pb-20 pointer-events-none">
            <div className="container mx-auto max-w-7xl">
                {/* TEASER KARTE */}
                <div 
                    ref={teaserRef}
                    className={cn(
                        "bg-white rounded-[2.5rem] border border-slate-100 pointer-events-auto overflow-hidden ring-1 ring-slate-100/50 transform-gpu transition-all duration-500 relative", 
                        isTeaserActive 
                            ? "scale-[1.01] shadow-2xl shadow-[var(--color-primary)]/10 border-[var(--color-primary)]/20" 
                            : "scale-100 shadow-2xl shadow-slate-200/50 hover:scale-[1.005] hover:shadow-[var(--color-primary)]/10"
                    )}
                >
                    
                    <div onClick={() => setIsOpen(true)} className="relative cursor-pointer group bg-gradient-to-br from-white via-[var(--color-secondary)]/30 to-[var(--color-secondary)] p-6 md:p-12 hover:bg-white transition-all duration-500 overflow-hidden">
                        
                        {/* Glow Effekt */}
                        <div className={cn(
                            "absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2 transition-all duration-700 z-0",
                            isTeaserActive ? "bg-[var(--color-primary)]/15 scale-125" : "group-hover:bg-[var(--color-primary)]/10"
                        )} />
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                            
                            {/* Icon Box */}
                            <div className={cn(
                                "shrink-0 w-24 h-24 bg-white rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm transition-all duration-500",
                                isTeaserActive 
                                    ? "scale-105 shadow-md border-[var(--color-primary)]/20" 
                                    : "group-hover:scale-105 group-hover:shadow-md group-hover:border-[var(--color-primary)]/20"
                            )}>
                                {/* Primary Icon in Teal */}
                                <ClipboardCheck className="w-10 h-10 text-[var(--color-primary)]" />
                            </div>
                            
                            {/* Text Area */}
                            <div className="flex-1 text-center md:text-left space-y-3">
                                
                                {/* BADGE mit ANIMIERTEM ICON (Check) */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/20 text-[var(--color-primary-deep)] shadow-sm">
                                    <CheckIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Profi-Check</span>
                                </div>
                                
                                {/* HEADLINE - MIXED TYPOGRAPHY (Hier angepasst!) */}
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight text-balance leading-[1.1]">
                                    Was steht Ihnen zu? <br className="hidden lg:block" />
                                    
                                    {/* ÄNDERUNG: font-script + Accent Color (Orange) - Passend zum Hero "Zuhause leben" */}
                                    <span className="font-script font-bold text-[var(--color-accent)] text-[1.2em] relative inline-block px-1 mt-1">
                                        Anspruch prüfen.
                                        {/* Orange Smile Swoosh */}
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </h2>
                                
                                <p className="text-lg font-medium text-slate-500">Kostenlos, anonym und in wenigen Klicks zum Ergebnis.</p>
                            </div>
                            
                            {/* Button */}
                            <div className="shrink-0 w-full md:w-auto">
                                <div className={cn(
                                    "h-14 px-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[var(--color-primary)]/20 transition-all duration-300 w-full md:w-auto",
                                    isTeaserActive 
                                        ? "bg-[var(--color-primary-hover)] shadow-[var(--color-primary)]/40 -translate-y-1" 
                                        : "group-hover:bg-[var(--color-primary-hover)] group-hover:shadow-[var(--color-primary)]/40 group-hover:-translate-y-1"
                                )}>
                                    Check starten <ArrowRight className={cn("w-5 h-5 transition-transform", isTeaserActive ? "translate-x-1" : "group-hover:translate-x-1")} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="bg-slate-50/80 border-t border-slate-100 p-6 md:px-12 md:py-8 backdrop-blur-sm relative z-10">
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
                                {/* Herz Icon in Orange (Accent) */}
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-accent)] shadow-sm group-hover/item:border-[var(--color-accent)] transition-colors"><Heart className="w-5 h-5 fill-current" /></div>
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
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        >
           {/* Backdrop */}
           <div className="absolute inset-0 bg-[var(--color-primary-deep)]/40 backdrop-blur-sm" onClick={resetAndClose} />
           
           <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
           >
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-white sticky top-0 z-20">
                 <div>
                    <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Pflege-Check</div>
                    {!isCalculating && step <= 4 && (
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((s) => (
                                <motion.div 
                                    key={s} 
                                    initial={false}
                                    animate={{ 
                                        width: s <= step ? 32 : 8,
                                        backgroundColor: s <= step ? "var(--color-primary)" : "#F1F5F9"
                                    }}
                                    className="h-1.5 rounded-full" 
                                />
                            ))}
                        </div>
                    )}
                 </div>
                 <button onClick={resetAndClose} className="p-2 bg-slate-50 hover:bg-red-50 rounded-full transition-colors group cursor-pointer">
                    <X className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                 </button>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar relative min-h-[400px] overflow-x-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    
                    {/* STEP 1 */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="space-y-8"
                        >
                            <h3 className="text-2xl font-extrabold text-slate-900 text-center">Für wen suchen Sie Unterstützung?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button onClick={() => handleNext("forWhom", "mich")} className="group p-8 rounded-[2rem] border border-slate-100 bg-[var(--color-secondary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-lg transition-all text-center flex flex-col items-center gap-4 cursor-pointer">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-all"><User className="w-8 h-8" /></div>
                                    <span className="font-bold text-slate-900 text-lg">Für mich selbst</span>
                                </button>
                                <button onClick={() => handleNext("forWhom", "angehoerige")} className="group p-8 rounded-[2rem] border border-slate-100 bg-[var(--color-secondary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-lg transition-all text-center flex flex-col items-center gap-4 cursor-pointer">
                                    {/* Herz Icon in Orange (Accent) */}
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[var(--color-accent)] shadow-sm group-hover:scale-110 transition-all"><Heart className="w-8 h-8" /></div>
                                    <span className="font-bold text-slate-900 text-lg">Für Angehörige</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="space-y-8"
                        >
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
                        </motion.div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="space-y-8"
                        >
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
                        </motion.div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="space-y-8"
                        >
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
                        </motion.div>
                    )}

                    {/* LOADING */}
                    {isCalculating && (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-[var(--color-primary)] animate-spin" />
                                {/* Herz in Orange (Accent) */}
                                <Heart className="absolute inset-0 m-auto w-8 h-8 text-[var(--color-accent)] animate-pulse fill-current" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Auswertung läuft...</h3>
                            <p className="text-slate-500">Wir prüfen die besten Optionen für Sie.</p>
                        </motion.div>
                    )}

                    {/* STEP 5: ERGEBNIS */}
                    {!isCalculating && step === 5 && (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="text-center flex flex-col items-center justify-center h-full py-8"
                        >
                            <div className="w-20 h-20 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-slate-50">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            
                            {/* ÄNDERUNG: Ergebnis Headline angepasst an Script-Font und Orange */}
                            <h3 className="text-4xl font-script font-bold text-[var(--color-accent)] mb-2">Analyse abgeschlossen!</h3>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Wir haben eine Lösung für Sie.</h4>
                            
                            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed font-medium">
                                Basierend auf Ihren Angaben haben wir erste Möglichkeiten ermittelt. <br/>
                                <strong className="text-slate-900">Fordern Sie jetzt Ihr unverbindliches Ergebnis an.</strong>
                            </p>
                            
                            <Button 
                                onClick={handleFinish}
                                size="lg" 
                                className="w-full max-w-sm h-14 px-10 text-lg text-white font-bold rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                            >
                                Ergebnis anfordern
                            </Button>
                            <p className="text-xs text-slate-400 mt-4 font-medium">100% Kostenlos & Unverbindlich.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>
              
              {/* Footer */}
              {step > 1 && !isCalculating && step < 5 && (
                  <div className="p-4 border-t border-slate-50 bg-slate-50/50 backdrop-blur-sm">
                    <button onClick={handleBack} className="text-slate-400 hover:text-[var(--color-primary)] flex items-center gap-2 text-sm font-bold pl-2 transition-colors cursor-pointer w-fit">
                        <ArrowLeft className="w-4 h-4" /> Schritt zurück
                    </button>
                  </div>
              )}
           </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}