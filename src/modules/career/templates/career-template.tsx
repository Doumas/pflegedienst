"use client"; 

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { 
  Briefcase, CheckCircle2, Clock, Euro, Car, Coffee, Heart, 
  Sparkles, Quote, X, Send, MessageCircle, Star, ArrowRight, User, Check, Activity, Loader2, ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";

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

function JobCard({ job, onSelect }: { job: typeof jobs[0], onSelect: (job: typeof jobs[0]) => void }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            onClick={() => onSelect(job)}
            className={cn(
                "group cursor-pointer bg-white rounded-[2.5rem] p-4 lg:pr-10 border transition-all duration-500 flex flex-col lg:flex-row items-center gap-6 relative overflow-hidden transform-gpu",
                isInCenter 
                    ? "border-[var(--color-primary)]/30 shadow-2xl shadow-[var(--color-primary)]/10 scale-[1.01]" 
                    : "border-slate-100 hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:scale-[1.01]"
            )}
        >
            <div className={cn(
                "w-full lg:w-32 h-32 rounded-[2rem] flex flex-col items-center justify-center text-center shrink-0 transition-all duration-500",
                isInCenter 
                    ? "bg-[var(--color-primary)] text-white scale-105 shadow-lg shadow-[var(--color-primary)]/20" 
                    : "bg-[var(--color-secondary)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white"
            )}>
                <Briefcase className="w-8 h-8 mb-1" />
                <span className="text-[9px] font-black uppercase tracking-widest">Offene Stelle</span>
            </div>

            <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{job.title}</h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {job.type}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100 flex items-center gap-2">
                        <Euro className="w-3.5 h-3.5 text-[var(--color-accent)]" /> {job.salary}
                    </span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                            <Check className="w-4 h-4 text-[var(--color-primary)] stroke-[3]" /> {tag}
                        </span>
                    ))}
                </div>
            </div>

            <Button className="rounded-2xl h-14 px-8 font-black bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xl shadow-[var(--color-primary)]/20 group-hover:-translate-y-0.5 transition-all">
                Express bewerben
            </Button>
        </div>
    );
}

function BenefitCard({ benefit }: { benefit: any }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "group p-10 rounded-[2.5rem] bg-white border transition-all duration-500 relative overflow-hidden transform-gpu h-full flex flex-col items-center lg:items-start text-center lg:text-left",
                isInCenter 
                    ? "border-[var(--color-primary)]/20 shadow-2xl shadow-[var(--color-primary)]/5 -translate-y-1.5" 
                    : "border-slate-100 hover:border-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-1.5"
            )}
        >
            <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
                isInCenter 
                    ? "scale-110 rotate-3 bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20" 
                    : "bg-[var(--color-secondary)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:rotate-3"
            )}>
                <benefit.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{benefit.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm text-pretty">{benefit.text}</p>
        </div>
    );
}

export function CareerTemplate() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <div className="relative min-h-screen bg-[#fffbf7] font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-accent-soft)]/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
      
        {/* --- HEADER (Korrektur: Jetzt vollständig zentriert) --- */}
        <section className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-4">
          <div className="container mx-auto flex flex-col items-center text-center max-w-5xl">
            
            <FadeIn delay={0.1}>
                {/* Badge mit thematischem Icon und Animation */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Briefcase className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    </motion.div>
                    <span>Komm ins Team</span>
                </div>
            </FadeIn>
            
           <FadeIn delay={0.2}>
               <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.05]">
                Arbeit, die <br/>
                <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold tracking-normal">
                        wertgeschätzt wird.
                    </span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
                </h1>
           </FadeIn>
            
            <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium text-pretty">
                    Keine leeren Versprechen. Wir bieten dir Zeit für Patienten, ein faires Gehalt 
                    und ein Team, das wirklich füreinander da ist.
                </p>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <Link href="#stellen" className="w-full sm:w-auto">
                 <Button size="lg" className="w-full h-16 px-10 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 font-black transition-all">
                   Offene Stellen ansehen
                 </Button>
               </Link>
               <Button variant="outline" size="lg" className="w-full h-16 px-10 text-lg border-2 border-green-200 text-green-700 bg-white hover:bg-green-50 rounded-2xl font-black flex gap-3 justify-center transition-all">
                   <MessageCircle className="w-6 h-6" /> WhatsApp Chat
               </Button>
            </FadeIn>
          </div>
        </section>

        {/* --- BENEFITS --- */}
        <section className="py-24 container px-4 md:px-6 relative">
          <div className="mb-20 flex flex-col items-center text-center max-w-2xl mx-auto">
            <FadeIn>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                    Deine Vorteile
                </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
                <p className="text-slate-600 text-lg font-bold text-balance">Wir fordern Qualität, aber wir geben auch viel zurück. Ehrenwort.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Euro, title: "Top Bezahlung", text: "Überdurchschnittliches Gehalt nach Tarif, plus steuerfreie Zuschläge und Boni." },
               { icon: Car, title: "Firmenwagen", text: "Für Fachkräfte inkl. Privatnutzung (1%-Regelung). Moderne Fahrzeugflotte." },
               { icon: Clock, title: "Wunsch-Dienstplan", text: 'Elternfreundliche Schichten ("Mutti-Touren") und verlässliche freie Wochenenden.' },
               { icon: Coffee, title: "Zeit für Pflege", text: "Wir planen realistische Touren ohne Zeitdruck. Qualität vor Schnelligkeit." },
               { icon: Heart, title: "Team-Spirit", text: "Regelmäßige Events, Supervision und ein offenes Ohr für deine Ideen." },
               { icon: Briefcase, title: "Sicherer Job", text: "Unbefristeter Arbeitsvertrag in einem wachsenden Familienunternehmen." }
             ].map((benefit, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.1)} direction="up" className="h-full">
                    <BenefitCard benefit={benefit} />
                </FadeIn>
             ))}
          </div>
        </section>

        {/* --- TESTIMONIAL --- */}
        <section className="py-24 lg:py-32 bg-[var(--color-footer-bg)] text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] pointer-events-none" />
           <div className="container relative z-10 px-4 md:px-6">
              <FadeIn direction="up">
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-20 backdrop-blur-md max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden text-center lg:text-left">
                    <div className="relative shrink-0">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] border-4 border-white/10 overflow-hidden shadow-2xl relative bg-slate-800 flex items-center justify-center rotate-3">
                            <User className="w-24 h-24 text-white/10" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[var(--color-accent)] text-white p-6 rounded-full shadow-2xl">
                            <Quote className="w-8 h-8 fill-current" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-1 justify-center lg:justify-start text-[var(--color-accent)] mb-8">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white/90 italic">
                            &quot;Hier werde ich als Mensch gesehen, nicht nur als Arbeitskraft. Die Zeit für meine Patienten gibt mir die Freude am Beruf zurück.&quot;
                        </blockquote>
                        <div>
                            <div className="font-black text-2xl mb-1">Sabine M.</div>
                            <div className="text-[var(--color-accent)] font-black text-[10px] uppercase tracking-[0.2em]">Pflegefachkraft, seit 4 Jahren dabei</div>
                        </div>
                    </div>
                </div>
              </FadeIn>
           </div>
        </section>

        {/* --- JOB LISTING --- */}
        <section id="stellen" className="py-24 bg-white relative">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto relative z-10">
            <div className="mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                    Offene Stellen
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-slate-600 text-lg font-bold text-balance">Bewirb dich in unter 60 Sekunden – wir brauchen keinen Lebenslauf.</p>
              </FadeIn>
            </div>

            <div className="space-y-6">
              {jobs.map((job, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.1)} direction="left">
                    <JobCard job={job} onSelect={setSelectedJob} />
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.6} className="mt-20">
               <div className="bg-[var(--color-secondary)] border border-[var(--color-primary)]/10 p-12 rounded-[3rem] text-center shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-soft)] rounded-full blur-3xl opacity-40" />
                  <div className="relative z-10">
                      <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center justify-center gap-3">
                         <Sparkles className="w-6 h-6 text-[var(--color-accent)]" /> Initiativbewerbung?
                      </h4>
                      <p className="text-slate-600 font-bold mb-8">
                         Nichts Passendes gefunden? Erzähl uns einfach, was du suchst.
                      </p>
                      <button 
                        onClick={() => setSelectedJob({title: "Initiativbewerbung", id: "initiativ"} as any)} 
                        className="bg-[var(--color-primary)] text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-3 mx-auto"
                      >
                         Kurzbewerbung starten <ArrowRight className="w-5 h-5" />
                      </button>
                  </div>
               </div>
            </FadeIn>
          </div>
        </section>

      </div>

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

function QuickApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
       setIsSubmitting(false);
       setStep(2);
    }, 1200);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative"
      >
        <div className="bg-[var(--color-secondary)] p-10 flex justify-between items-start border-b border-slate-100 text-left">
          <div>
            <div className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--color-accent)]" /> Express Bewerbung
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight pr-6">{jobTitle}</h3>
          </div>
          <button onClick={onClose} className="p-3 bg-white rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-10 text-left">
          <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                >
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Vollständiger Name</label>
                        <input required type="text" placeholder="Max Mustermann" className="w-full h-16 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none font-bold text-slate-900 transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Telefonnummer für Rückruf</label>
                        <input required type="tel" placeholder="017x / xxxxxxxx" className="w-full h-16 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none font-bold text-slate-900 transition-all" />
                    </div>
                    
                    {jobTitle.includes("Fachkraft") && (
                        <label className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[var(--color-primary)]/30 cursor-pointer transition-all">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer w-6 h-6 border-2 border-slate-200 rounded-lg checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-all appearance-none" />
                                <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" />
                            </div>
                            <span className="text-sm font-black text-slate-700">Ich bin examinierte Fachkraft</span>
                        </label>
                    )}
                </div>

                <div className="pt-4">
                    <Button disabled={isSubmitting} type="submit" className="w-full h-18 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-black rounded-2xl shadow-2xl shadow-[var(--color-primary)]/30 flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Bewerbung absenden <Send className="w-5 h-5" /></>}
                    </Button>
                </div>
                
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Kein Anschreiben · Kein Lebenslauf · In 30 Sek. fertig
                </p>
                </motion.form>
            )}

            {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 flex flex-col items-center"
                >
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-green-100 rotate-6">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight text-center">Eingegangen!</h3>
                <p className="text-slate-500 mb-12 font-bold leading-relaxed text-center">
                    Wir haben deine Nachricht erhalten und rufen dich zeitnah zurück. Schön, dass du dich gemeldet hast!
                </p>
                <Button onClick={onClose} className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-black hover:bg-black transition-all">
                    Alles klar!
                </Button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step === 1 && (
           <div className="px-10 pb-10 pt-0 text-center">
             <div className="relative mb-8">
               <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
               <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-300">Oder direkt</span></div>
             </div>
             <button className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl border-2 border-green-100 bg-green-50/30 text-green-700 font-black hover:bg-green-50 transition-all cursor-pointer">
                <MessageCircle className="w-6 h-6" /> Per WhatsApp bewerben
             </button>
           </div>
        )}
      </motion.div>
    </motion.div>
  );
}