"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/shared/ui/fade-in";
import { ArrowRight, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

// --- KONFIGURATION ---

const SUBJECTS = [
  { id: "care", label: "Pflegeberatung / Erstgespräch" },
  { id: "general", label: "Allgemeine Anfrage" },
  { id: "job", label: "Karriere & Bewerbung" },
  { id: "partners", label: "Kooperation / Ärzte" },
];

const MESSAGE_TEMPLATES: Record<string, string> = {
  care: "Guten Tag,\n\nich interessiere mich für eine Pflegeberatung für mich / einen Angehörigen. Es geht um folgende Situation:\n\n[Bitte kurz beschreiben]\n\nAm besten erreichen Sie mich telefonisch unter...",
  general: "Guten Tag,\n\nich habe eine Frage zu Ihren Leistungen:\n\n",
  job: "Sehr geehrte Damen und Herren,\n\nich interessiere mich für eine Stelle als [Position]. Anbei sende ich Ihnen meine Daten...",
  partners: "Guten Tag,\n\nwir sind eine Arztpraxis / Klinik und möchten bezüglich einer Kooperation Kontakt aufnehmen.",
};

export function ContactTemplate() {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].id);
  const [message, setMessage] = useState(MESSAGE_TEMPLATES[SUBJECTS[0].id]);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    setMessage(prev => {
        return MESSAGE_TEMPLATES[selectedSubject] || "";
    });
  }, [selectedSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    // FIX: Konsistentes Padding wie auf About/Services (pt-32 für Mobile, pt-48 für Desktop)
    <div className="w-full bg-white text-[var(--color-text-main)] min-h-screen pt-40 lg:pt-48 pb-24 overflow-hidden relative">
      
      {/* =====================================================================
          1. HEADER SECTION
      ===================================================================== */}
      {/* FIX: Margin-Bottom vereinheitlicht auf mb-32 */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        {/* FIX: items-start, damit der Text oben bündig bleibt und nicht rutscht */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
            
            {/* LINKS: Headline & Intro */}
            <FadeIn>
                {/* Deko Kreuz */}
                <div className="flex items-center gap-3 mb-6 max-w-4xl">
                    <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Kontakt mit DALAS</span>
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-6 lg:mb-8">
                    Willkommen <br />
                    bei <span className="text-[var(--color-primary)]">Dalas.</span>
                </h1>
                
                <div className="space-y-6 max-w-lg">
                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed font-body">
                        Wir sind da, wenn es darauf ankommt. Mit Herz, Verstand und einem offenen Ohr für Ihre Anliegen.
                    </p>
                    
                    <div className="h-[1px] w-12 bg-[var(--color-primary)]/30" />
                    
                    <div className="flex flex-col gap-1 font-heading font-semibold text-base md:text-lg">
                        <a href="mailto:info@dalas-pflege.de" className="hover:text-[var(--color-primary)] transition-colors w-max decoration-[var(--color-primary)]/30 underline underline-offset-4">
                            info@dalas-pflege.de
                        </a>
                        <a href="tel:06912345678" className="hover:text-[var(--color-primary)] transition-colors w-max">
                            069 123 456 78
                        </a>
                    </div>
                </div>
            </FadeIn>

            {/* RECHTS: Overlapping Images + DOT PATTERN */}
            <div className="relative h-[300px] md:h-[500px] w-full mt-4 lg:mt-0 order-2">
                
                {/* BACKGROUND DOT PATTERN */}
                <div className="absolute inset-0 -z-10 opacity-30">
                     <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
                </div>

                {/* Deko Kreuze */}
                <div className="absolute top-0 right-0 lg:right-10 text-[var(--color-primary)] opacity-60 font-mono text-xl">+</div>
                <div className="absolute bottom-0 left-0 lg:left-10 text-[var(--color-primary)] opacity-60 font-mono text-xl">+</div>
                
                {/* Bild 1 (Hinten) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute top-0 right-0 w-[85%] h-[85%] lg:w-3/4 lg:h-4/5 overflow-hidden rounded-sm shadow-lg shadow-[var(--color-primary)]/5 z-10"
                >
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-[var(--color-primary-deep)]/10 mix-blend-multiply" />
                </motion.div>

                {/* Bild 2 (Vorne - Fokus) */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute bottom-4 left-0 w-[60%] h-[60%] lg:bottom-0 lg:w-3/5 lg:h-3/5 p-2 lg:p-3 bg-white shadow-2xl shadow-slate-200/50 rounded-sm z-20"
                >
                     <div className="w-full h-full relative overflow-hidden rounded-sm bg-slate-100">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-gradient-to-t from-black/70 to-transparent">
                            <span className="text-white text-[10px] lg:text-xs font-bold uppercase tracking-widest font-heading">
                                Team Frankfurt
                            </span>
                        </div>
                     </div>
                </motion.div>
            </div>
        </div>
      </section>


      {/* =====================================================================
          2. LOCATION SECTION
      ===================================================================== */}
      <section className="border-t border-[var(--color-primary-deep)]/10 bg-slate-50/50">
        <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                
                <FadeIn>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-primary-deep)]">
                        Dalas <br />
                        <span className="text-[var(--color-primary)]">Frankfurt</span>
                    </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="flex flex-col gap-8">
                        <div className="font-body text-base md:text-lg text-slate-600 leading-relaxed">
                            <strong className="block text-[var(--color-primary-deep)] font-heading text-lg lg:text-xl mb-2">Dalas Pflegedienst</strong>
                            Borsigallee 37<br />
                            60388 Frankfurt am Main<br />
                            Deutschland
                        </div>

                        {/* MAP PLACEHOLDER */}
                        <div className="relative w-full h-[220px] lg:h-[300px] bg-slate-200 overflow-hidden rounded-sm group">
                             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                             
                             <div className="absolute top-4 left-4 bg-white p-3 lg:p-4 shadow-sm max-w-[200px]">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-1">Hauptsitz</span>
                                <span className="text-xs md:text-sm text-slate-600 font-medium block">Frankfurt am Main</span>
                             </div>

                             <a 
                                href="https://maps.google.com" 
                                target="_blank"
                                className="absolute bottom-4 right-4 h-10 w-10 lg:h-12 lg:w-12 bg-[var(--color-primary-deep)] text-white flex items-center justify-center rounded-full hover:bg-[var(--color-primary)] transition-colors shadow-lg z-10"
                             >
                                <ArrowRight className="w-5 h-5 -rotate-45" />
                             </a>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </div>
      </section>


      {/* =====================================================================
          3. FORM SECTION
      ===================================================================== */}
      <section className="bg-white border-t border-[var(--color-primary-deep)]/10">
         <div className="container mx-auto px-6 py-16 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                
                {/* LINKS: Intro */}
                <FadeIn>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-primary-deep)] max-w-sm leading-[1.05]">
                        Schreiben <br/> Sie uns.
                    </h2>
                    <p className="mt-6 lg:mt-8 text-base md:text-lg text-slate-500 max-w-md leading-relaxed font-body">
                        Wählen Sie Ihr Anliegen, damit wir Ihnen sofort die passenden Informationen bereitstellen können.
                    </p>
                </FadeIn>

                {/* RECHTS: Formular */}
                <FadeIn delay={0.2}>
                    <form onSubmit={handleSubmit} className="space-y-10">
                        
                        {/* Reihe 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                    Vorname*
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 transition-all placeholder:text-transparent text-lg font-medium text-[var(--color-primary-deep)]"
                                />
                            </div>
                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                    Nachname*
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 transition-all placeholder:text-transparent text-lg font-medium text-[var(--color-primary-deep)]"
                                />
                            </div>
                        </div>

                        {/* Reihe 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                             <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                    E-Mail*
                                </label>
                                <input 
                                    required
                                    type="email" 
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 transition-all placeholder:text-transparent text-lg font-medium text-[var(--color-primary-deep)]"
                                />
                            </div>
                            
                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                    Betreff
                                </label>
                                <select 
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 transition-all text-[var(--color-text-main)] text-lg font-medium cursor-pointer appearance-none"
                                >
                                    {SUBJECTS.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.label}</option>
                                    ))}
                                </select>
                                <div className="absolute right-0 top-8 pointer-events-none text-slate-400">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
                                </div>
                            </div>
                        </div>

                        {/* Message: Automatisch befüllt */}
                        <div className="group relative">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-[var(--color-primary)] transition-colors">
                                Nachricht
                            </label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={6}
                                className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-[var(--color-primary)] focus:ring-0 px-0 py-2 transition-all resize-none text-lg font-medium text-[var(--color-primary-deep)] leading-relaxed"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button 
                                type="submit"
                                disabled={formStatus !== 'idle'}
                                className="px-12 py-5 bg-[var(--color-primary-deep)] text-white rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] transition-all duration-300 shadow-xl shadow-[var(--color-primary-deep)]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {formStatus === 'idle' && "Absenden"}
                                {formStatus === 'submitting' && "Sende..."}
                                {formStatus === 'success' && (
                                    <>
                                        Gesendet <Check className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </FadeIn>

            </div>
         </div>
      </section>

    </div>
  );
}