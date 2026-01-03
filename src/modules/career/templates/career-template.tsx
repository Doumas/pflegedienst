"use client"; 

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { 
  Briefcase, CheckCircle2, Clock, Euro, Car, Coffee, Heart, 
  Sparkles, Quote, X, Send, MessageCircle, Star, ArrowRight, User, Check 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in"; // <--- NEU
import { motion, AnimatePresence } from "framer-motion";

// DUMMY JOBS
const jobs = [
  {
    id: "fachkraft",
    title: "Pflegefachkraft (m/w/d)",
    type: "Vollzeit / Teilzeit",
    salary: "Ab 4.200€ + Zuschläge",
    tags: ["Firmenwagen", "Unbefristet", "Startbonus"],
  },
  {
    id: "hilfskraft",
    title: "Pflegehilfskraft (m/w/d)",
    type: "Vollzeit / Teilzeit",
    salary: "Attraktive Vergütung",
    tags: ["Keine Ausbildung nötig", "Flexible Zeiten"],
  },
  {
    id: "hauswirtschaft",
    title: "Hauswirtschaftskraft (m/w/d)",
    type: "Teilzeit / Minijob",
    salary: "Stundenlohn nach Tarif",
    tags: ["Mo-Fr", "Familienfreundlich"],
  }
];

// --- HELPER HOOK (Für Mobile Auto-Focus) ---
function useInCenter(options = { threshold: 0.5 }) {
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

// --- SUB-KOMPONENTE: JOB CARD (Für Mobile Focus) ---
function JobCard({ job, onSelect }: { job: typeof jobs[0], onSelect: (job: typeof jobs[0]) => void }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            onClick={() => onSelect(job)}
            className={cn(
                "group cursor-pointer bg-white rounded-[2.5rem] p-3 pr-8 border transition-all duration-500 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transform-gpu",
                // Mobile Focus Logik
                isInCenter 
                    ? "border-[var(--color-accent)]/50 shadow-2xl shadow-[var(--color-accent)]/15 scale-[1.02]" 
                    : "border-[var(--color-border-soft)] hover:border-[var(--color-accent)]/50 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 hover:scale-[1.01]"
            )}
        >
            
            {/* Icon Box: Reagiert auf Focus */}
            <div className={cn(
                "self-stretch md:self-auto w-full md:w-36 h-36 rounded-[2rem] flex flex-col items-center justify-center text-center p-4 shrink-0 transition-all duration-300",
                isInCenter 
                    ? "bg-[var(--color-accent)] text-white scale-105" 
                    : "bg-[var(--color-secondary)] group-hover:bg-[var(--color-accent)] group-hover:text-white"
            )}>
                <Briefcase className="w-8 h-8 mb-2" />
                <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wide transition-colors",
                    isInCenter ? "text-white opacity-100" : "opacity-80 group-hover:text-white"
                )}>Wir suchen</span>
            </div>

            {/* Job Info */}
            <div className="flex-1 py-4 px-4 md:px-0 text-center md:text-left w-full">
                <h3 className={cn(
                    "text-2xl font-bold mb-3 transition-colors",
                    isInCenter ? "text-[var(--color-accent)]" : "text-slate-900 group-hover:text-[var(--color-accent)]"
                )}>{job.title}</h3>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm font-bold text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" /> {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm font-bold text-slate-600">
                        <Euro className="w-4 h-4 text-slate-400" /> {job.salary}
                    </span>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {job.tags.map(tag => (
                        <span key={tag} className="text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="pb-6 md:pb-0">
                <Button 
                    className={cn(
                        "rounded-2xl h-14 px-8 font-bold shadow-lg transition-all pointer-events-none",
                        isInCenter 
                            ? "bg-[var(--color-accent)] text-white shadow-[var(--color-accent)]/30 scale-105" 
                            : "bg-[var(--color-primary)] text-white shadow-[var(--color-primary)]/20 group-hover:bg-[var(--color-accent)] group-hover:shadow-[var(--color-accent)]/30 group-hover:scale-105"
                    )}
                >
                    Express bewerben
                </Button>
            </div>
        </div>
    );
}

// --- SUB-KOMPONENTE: BENEFIT CARD (Für Mobile Focus) ---
function BenefitCard({ benefit }: { benefit: any }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "group p-8 rounded-[2rem] bg-white border transition-all duration-500 relative overflow-hidden transform-gpu h-full",
                isInCenter 
                    ? "border-[var(--color-primary)]/40 shadow-xl shadow-[var(--color-primary)]/10 -translate-y-1" 
                    : "border-[var(--color-border-soft)] hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/5 hover:-translate-y-1"
            )}
        >
            {/* Zartes Blau im Hintergrund */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent transition-opacity duration-500",
                isInCenter ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )} />
            
            <div className="relative z-10">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500",
                    isInCenter 
                        ? "scale-110 rotate-6 bg-[var(--color-primary)] text-white border-transparent" 
                        : "bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-primary)]/5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[var(--color-primary)] group-hover:text-white"
                )}>
                    <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className={cn(
                    "text-xl font-bold mb-3 transition-colors",
                    isInCenter ? "text-[var(--color-primary)]" : "text-slate-900 group-hover:text-[var(--color-primary)]"
                )}>{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{benefit.text}</p>
            </div>
        </div>
    );
}

export function CareerTemplate() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* HINTERGRUND FX - GPU Optimiert */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] md:animate-pulse pointer-events-none transform-gpu will-change-transform" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none transform-gpu" />


      <div className="relative z-10">
      
        {/* --- 1. HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 text-center px-4">
          <div className="container max-w-4xl mx-auto">
            
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8">
                <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                <span>Komm ins Team</span>
                </div>
            </FadeIn>
            
           <FadeIn delay={0.2}>
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                Arbeit, die <br/>
                <span className="relative inline-block ml-3">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                    wertgeschätzt wird.
                    </span>
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span>
                </h1>
           </FadeIn>
            
            <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                Keine leeren Versprechen. Wir bieten dir Zeit für Patienten, ein faires Gehalt 
                und ein Team, das wirklich zusammenhält.
                </p>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="#stellen">
                 <Button size="lg" className="h-14 px-8 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all font-bold">
                   Zu den offenen Stellen
                 </Button>
               </Link>
               <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-green-200 text-green-700 bg-green-50 hover:bg-green-100 rounded-2xl font-bold flex gap-2 border-2">
                   <MessageCircle className="w-5 h-5" /> WhatsApp Chat
               </Button>
            </FadeIn>
          </div>
        </section>

        {/* --- 2. BENEFITS --- */}
        <section className="py-24 container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <FadeIn delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                    Deine Vorteile bei uns
                </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Wir fordern viel, aber wir geben auch viel zurück. Transparenz ist uns wichtig.</p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { icon: Euro, title: "Top Bezahlung", text: "Überdurchschnittliches Gehalt nach Tarif, plus steuerfreie Zuschläge." },
               { icon: Car, title: "Eigener Firmenwagen", text: "Für Fachkräfte inkl. Privatnutzung (1%-Regelung). Neuwagen-Flotte." },
               { icon: Clock, title: "Wunsch-Dienstplan", text: 'Elternfreundliche Schichten ("Mutti-Touren") und verlässliche Freizeit.' },
               { icon: Coffee, title: "Zeit für Pflege", text: "Wir planen realistische Touren ohne Rennerei. Der Mensch steht im Mittelpunkt." },
               { icon: Heart, title: "Gesundheits-Bonus", text: "Zusätzliche Krankenversicherung und Budget für Massagen oder Fitness." },
               { icon: Briefcase, title: "Sicherer Job", text: "Unbefristeter Arbeitsvertrag in einer krisensicheren Branche." }
             ].map((benefit, i) => (
                <FadeIn key={i} delay={0.3 + (i * 0.1)} direction="up" className="h-full">
                    <BenefitCard benefit={benefit} />
                </FadeIn>
             ))}
          </div>
        </section>

        {/* --- 3. TESTIMONIAL (DUNKEL) --- */}
        <section className="py-24 lg:py-32 bg-[var(--color-footer-bg)] text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[150px] pointer-events-none transform-gpu" />
           <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[150px] pointer-events-none transform-gpu" />
           <div className="absolute inset-0 opacity-[0.05] transform-gpu" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
           
           <div className="container relative z-10 px-4 md:px-6">
              <FadeIn direction="up">
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 shadow-2xl">
                    <div className="relative shrink-0">
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl relative bg-slate-800 flex items-center justify-center">
                        <User className="w-24 h-24 text-white/20" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-lg border-4 border-[var(--color-footer-bg)]">
                        <Quote className="w-6 h-6 fill-current" />
                        </div>
                    </div>
                    <div className="text-center md:text-left text-white">
                        <div className="flex gap-1 justify-center md:justify-start text-[var(--color-accent)] mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 opacity-90">
                        "Endlich habe ich wieder Zeit für meine Patienten. Hier bin ich nicht nur eine Nummer, sondern werde als Mensch gesehen."
                        </blockquote>
                        <div className="font-bold text-xl mb-1">Sabine M.</div>
                        <div className="text-[var(--color-accent)] font-bold text-sm uppercase tracking-wide">Pflegefachkraft, seit 4 Jahren dabei</div>
                    </div>
                </div>
              </FadeIn>
           </div>
        </section>

        {/* --- 4. JOB LISTING --- */}
        <section id="stellen" className="py-24 bg-white border-t border-[var(--color-border-soft)] relative">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                    Aktuelle Stellenangebote
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-slate-600 text-lg">Bewirb dich in unter 60 Sekunden – ohne Lebenslauf.</p>
              </FadeIn>
            </div>

            <div className="space-y-6">
              {jobs.map((job, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.1)} direction="left">
                    <JobCard job={job} onSelect={setSelectedJob} />
                </FadeIn>
              ))}
            </div>

            {/* Initiativ Box */}
            <FadeIn delay={0.6} className="mt-16 text-center">
               <div className="inline-block bg-white border border-[var(--color-border-soft)] p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 hover:border-[var(--color-accent)]/30 transition-colors">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2 text-xl">
                     <Sparkles className="w-5 h-5 text-[var(--color-accent)]" /> Initiativbewerbung?
                  </h4>
                  <p className="text-slate-600 text-base mb-6">
                     Kein passender Job dabei? Wir finden eine Lösung für dich.
                  </p>
                  <button onClick={() => setSelectedJob({title: "Initiativbewerbung", id: "initiativ"} as any)} className="text-[var(--color-primary)] font-bold hover:text-[var(--color-accent)] cursor-pointer flex items-center justify-center gap-2 mx-auto bg-[var(--color-secondary)] px-6 py-3 rounded-xl transition-colors">
                     Jetzt in 1 Minute bewerben <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </FadeIn>
          </div>
        </section>

      </div>

      {/* --- EXPRESS BEWERBUNG MODAL --- */}
      <AnimatePresence>
        {selectedJob && (
            <QuickApplyModal 
            jobTitle={selectedJob.title} 
            onClose={() => setSelectedJob(null)} 
            />
        )}
      </AnimatePresence>

    </div>
  );
}

// --- SUB-KOMPONENTE: ULTRA-SCHNELLES MODAL MIT ANIMATION ---
function QuickApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation API Call
    setTimeout(() => {
       setIsSubmitting(false);
       setStep(2);
    }, 1000);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    >
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        
        {/* Header */}
        <div className="bg-[var(--color-secondary)] p-8 flex justify-between items-start border-b border-[var(--color-border-soft)]">
          <div>
            <div className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Dauert unter 30 Sek.
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight pr-4">{jobTitle}</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - AnimatePresence für Step-Wechsel */}
        <div className="p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                >
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Dein Name</label>
                        <input required type="text" placeholder="Max Mustermann" className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all font-medium text-slate-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Deine Telefonnummer</label>
                        <input required type="tel" placeholder="017x / xxxxxxxx" className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all font-medium text-slate-900" />
                    </div>
                    
                    {jobTitle.includes("Fachkraft") && (
                        <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[var(--color-primary)]/30 cursor-pointer transition-all">
                            <div className="relative flex items-center">
                            <input type="checkbox" className="peer w-6 h-6 border-2 border-slate-300 rounded-lg checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-all appearance-none" />
                            <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Ich bin examinierte Fachkraft</span>
                        </label>
                    )}
                </div>

                <div className="pt-2">
                    <Button disabled={isSubmitting} type="submit" className="w-full h-16 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
                        {isSubmitting ? <span className="animate-pulse">Sende Daten...</span> : <>Kostenlos absenden <Send className="w-4 h-4" /></>}
                    </Button>
                </div>
                
                <p className="text-center text-xs text-slate-400 font-medium">
                    Das war's schon! Kein Lebenslauf & kein Anschreiben nötig.
                </p>
                </motion.form>
            )}

            {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center"
                >
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm border border-green-100">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Vielen Dank!</h3>
                <p className="text-slate-600 mb-10 max-w-xs mx-auto leading-relaxed text-lg">
                    Wir haben deine Nummer erhalten und melden uns schnellstmöglich bei dir.
                </p>
                <Button onClick={onClose} variant="outline" className="h-14 px-8 rounded-2xl border-2 font-bold hover:bg-slate-50 text-slate-600">
                    Fenster schließen
                </Button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Note */}
        {step === 1 && (
           <div className="px-8 pb-8 pt-0 text-center">
             <div className="relative mb-6">
               <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
               <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider"><span className="bg-white px-3 text-slate-400">Alternativ</span></div>
             </div>
             <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-green-200 bg-green-50 text-green-700 font-bold hover:bg-green-100 transition-colors">
                <MessageCircle className="w-5 h-5" /> Per WhatsApp bewerben
             </button>
           </div>
        )}

      </motion.div>
    </motion.div>
  );
}