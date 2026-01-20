"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MapPin, 
  Briefcase, 
  X, 
  Loader2 
} from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA ---
const JOBS = [
  {
    id: "fachkraft",
    title: "Pflegefachkraft (m/w/d)",
    location: "Frankfurt am Main",
    type: "Vollzeit / Teilzeit",
    salary: "Ab 4.200€",
    description: "Du übernimmst die professionelle Versorgung unserer Patienten in ihrer häuslichen Umgebung. Wir bieten dir einen Firmenwagen (auch privat) und Touren ohne Hetze.",
    tags: ["Firmenwagen", "Startbonus", "Unbefristet"],
  },
  {
    id: "hilfskraft",
    title: "Pflegehilfskraft (m/w/d)",
    location: "Frankfurt & Umgebung",
    type: "Vollzeit / Teilzeit",
    salary: "Attraktive Vergütung",
    description: "Unterstütze unser Team bei der Grundpflege. Auch als Quereinsteiger bist du willkommen – wir arbeiten dich gründlich ein.",
    tags: ["Keine Ausbildung nötig", "Flexible Zeiten", "Fortbildungen"],
  },
  {
    id: "hauswirtschaft",
    title: "Hauswirtschaftskraft (m/w/d)",
    location: "Frankfurt Ost",
    type: "Minijob / Teilzeit",
    salary: "Tariflich",
    description: "Du sorgst für Wohlfühlatmosphäre bei unseren Klienten zuhause. Einkaufen, Reinigen und kleine Botengänge gehören dazu.",
    tags: ["Mo-Fr", "Familienfreundlich", "Feste Touren"],
  },
  {
    id: "pd-leitung",
    title: "Pflegedienstleitung (m/w/d)",
    location: "Zentrale Frankfurt",
    type: "Vollzeit",
    salary: "Verhandlungssache",
    description: "Führe unser Team mit Herz und Verstand. Du steuerst die Prozesse, sicherst die Qualität und bist Ansprechpartner für Ärzte und Kassen.",
    tags: ["Führungsposition", "Eigener PKW", "Boni"],
  }
];

export function CareerTemplate() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  return (
    // Hintergrund komplett Weiß, keine Muster
    <div className="w-full bg-white text-[var(--color-text-main)] min-h-screen pt-40 lg:pt-48 pb-24 overflow-hidden relative">
      
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 mb-24 lg:mb-32 relative z-10">
        <div className="max-w-4xl">
            <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Karriere bei DALAS</span>
                </div>
                
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-6 lg:mb-8">
                    Arbeit, die <br/>
                    <span className="text-[var(--color-primary)]">Wertschätzung</span> verdient.
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed font-body max-w-2xl">
                    Wir suchen Menschen, keine Maschinen. Bei uns zählt der Mensch – egal ob Patient oder Mitarbeiter. Entdecke deine Möglichkeiten in einem Team, das zusammenhält.
                </p>
            </FadeIn>
        </div>
      </section>

      {/* --- JOB LIST (CLEAN STYLE) --- */}
      <section className="container mx-auto px-6 relative z-10">
        
        {/* List Header */}
        <FadeIn delay={0.2} className="mb-12 border-b border-[var(--color-primary-deep)]/10 pb-4 flex justify-between items-end">
             <h2 className="text-2xl font-bold text-[var(--color-primary-deep)]">Offene Positionen</h2>
             <span className="text-sm font-bold text-slate-400 hidden md:block">Frankfurt am Main</span>
        </FadeIn>

        {/* The List */}
        <div className="flex flex-col">
            {JOBS.map((job, index) => (
                <FadeIn key={job.id} delay={0.1 * index} className="group">
                    <div 
                        onClick={() => setSelectedJob(job)}
                        className="relative  lg:py-14 border-[var(--color-primary-deep)]/10 cursor-pointer transition-all duration-500 hover:bg-slate-50/50"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            
                            {/* COL 1: Title & Arrow */}
                            <div className="lg:col-span-6 pr-8">
                                <div className="flex justify-between items-start w-full">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                                        {job.title}
                                    </h3>
                                    {/* Mobile Arrow */}
                                    <ArrowRight className="w-6 h-6 text-[var(--color-primary)] lg:hidden transform group-hover:translate-x-1 transition-transform" />
                                </div>
                                
                                {/* Meta Info Mobile only */}
                                <div className="flex flex-wrap gap-4 mt-4 lg:hidden text-sm font-medium text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                                </div>
                            </div>

                            {/* COL 2: Details & Description */}
                            <div className="lg:col-span-5">
                                {/* Meta Info Desktop */}
                                <div className="hidden lg:flex gap-8 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                    <span>{job.location}</span>
                                    <span className="text-[var(--color-primary)]">{job.type}</span>
                                    <span>{job.salary}</span>
                                </div>
                                
                                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                                    {job.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* COL 3: Desktop Arrow (Big) */}
                            <div className="hidden lg:flex lg:col-span-1 justify-end items-center h-full">
                                <div className="w-12 h-12 rounded-full border border-[var(--color-primary-deep)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 text-[var(--color-primary-deep)] group-hover:text-white transition-colors" />
                                </div>
                            </div>

                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
        
        {/* Initiativbewerbung Footer */}
        <FadeIn delay={0.5} className="mt-16 pt-12 border-t border-[var(--color-primary-deep)]/10">
            <div className="bg-[var(--color-secondary)] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm">
                <div>
                    <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-2">Nicht das Richtige dabei?</h3>
                    <p className="text-slate-600 font-medium">Wir freuen uns immer über Initiative. Erzähl uns, was du kannst.</p>
                </div>
                <button 
                    onClick={() => setSelectedJob({ title: "Initiativbewerbung", id: "initiativ" } as any)}
                    className="px-8 py-4 bg-[var(--color-primary-deep)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] transition-all duration-300 whitespace-nowrap"
                >
                    Initiativ bewerben
                </button>
            </div>
        </FadeIn>

      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedJob && (
            <ApplicationModal 
                job={selectedJob} 
                onClose={() => setSelectedJob(null)} 
            />
        )}
      </AnimatePresence>

    </div>
  );
}

// --- MODAL COMPONENT ---

function ApplicationModal({ job, onClose }: { job: any; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
       setIsSubmitting(false);
       setIsSuccess(true);
    }, 1500);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-primary-deep)]/90 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white w-full max-w-lg shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
          <div>
            <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-2 block">
               Express Bewerbung
            </span>
            <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] leading-tight">
                {job.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
            {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                Name*
                            </label>
                            <input required type="text" className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 text-lg font-medium text-[var(--color-primary-deep)] placeholder:text-transparent transition-all" />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                Telefon*
                            </label>
                            <input required type="tel" className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 text-lg font-medium text-[var(--color-primary-deep)] placeholder:text-transparent transition-all" />
                        </div>
                        
                        {/* Fachkraft Checkbox */}
                        {job.title.includes("Fachkraft") && (
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="relative w-5 h-5 border border-slate-300 flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors">
                                    <input type="checkbox" className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer" />
                                    <Check className="w-3 h-3 text-[var(--color-primary)] opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Ich habe ein Examen (3-jährig)</span>
                            </label>
                        )}
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[var(--color-primary-deep)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Jetzt absenden"}
                        </button>
                        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-4">
                            Kein Lebenslauf nötig
                        </p>
                    </div>
                </form>
            ) : (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-4">Vielen Dank!</h3>
                    <p className="text-slate-500 mb-8">
                        Wir haben deine Daten erhalten und melden uns in Kürze telefonisch bei dir.
                    </p>
                    <button onClick={onClose} className="px-8 py-3 border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                        Fenster schließen
                    </button>
                </div>
            )}
        </div>
        
      </motion.div>
    </motion.div>
  );
}