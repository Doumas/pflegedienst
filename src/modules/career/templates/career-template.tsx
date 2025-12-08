"use client"; 

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { 
  Briefcase, CheckCircle2, Clock, Euro, Car, Coffee, Heart, 
  Sparkles, Quote, X, Send, MessageCircle, Star, ArrowRight, User 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

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

export function CareerTemplate() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans pb-20 relative selection:bg-[var(--color-border-soft)]">
      
      {/* --- 1. HEADER --- */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[var(--color-secondary)] border-b border-[var(--color-border-soft)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
            <span>Komm ins Team</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Arbeit, die <br/>
            <span className="relative inline-block text-[var(--color-primary)]">
              wertgeschätzt wird.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Keine leeren Versprechen. Wir bieten dir Zeit für Patienten, ein faires Gehalt 
            und ein Team, das wirklich zusammenhält.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <Link href="#stellen">
               <Button size="lg" className="h-14 px-8 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all font-bold">
                 Zu den offenen Stellen
               </Button>
             </Link>
             <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-2xl font-bold flex gap-2">
                 <MessageCircle className="w-5 h-5" /> WhatsApp Chat
             </Button>
          </div>
        </div>
      </section>

      {/* --- 2. BENEFITS --- */}
      <section className="py-24 container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Deine Vorteile bei uns</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Wir fordern viel, aber wir geben auch viel zurück. Transparenz ist uns wichtig.</p>
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
             <div key={i} className="group p-8 rounded-[2rem] bg-white border border-[var(--color-border-soft)] hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/5 hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform duration-300 border border-[var(--color-primary)]/5">
                 <benefit.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{benefit.title}</h3>
               <p className="text-slate-600 leading-relaxed text-sm font-medium">{benefit.text}</p>
             </div>
           ))}
        </div>
      </section>

      {/* --- 3. TESTIMONIAL (Dark Theme Contrast) --- */}
      <section className="py-24 bg-[var(--color-footer-bg)] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="container relative z-10 px-4 md:px-6">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 shadow-2xl">
               <div className="relative shrink-0">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl relative bg-slate-200">
                     {/* Placeholder Image or User Icon */}
                     <User className="w-24 h-24 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg border-4 border-[var(--color-footer-bg)]">
                     <Quote className="w-6 h-6 fill-current" />
                  </div>
               </div>
               <div className="text-center md:text-left text-white">
                  <div className="flex gap-1 justify-center md:justify-start text-[var(--color-accent)] mb-6">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-serif leading-normal mb-6 opacity-90">
                    "Endlich habe ich wieder Zeit für meine Patienten. Hier bin ich nicht nur eine Nummer, sondern werde als Mensch gesehen."
                  </blockquote>
                  <div className="font-bold text-lg">Sabine M.</div>
                  <div className="text-[var(--color-accent)] font-medium text-sm uppercase tracking-wide">Pflegefachkraft, seit 4 Jahren dabei</div>
               </div>
            </div>
         </div>
      </section>

      {/* --- 4. JOB LISTING --- */}
      <section id="stellen" className="py-24 bg-white border-t border-[var(--color-border-soft)]">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Aktuelle Stellenangebote</h2>
            <p className="text-slate-600 text-lg">Bewirb dich in unter 60 Sekunden – ohne Lebenslauf.</p>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <div key={i} className="group bg-white rounded-[2rem] p-2 pr-8 border border-[var(--color-border-soft)] hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
                
                {/* Icon Box */}
                <div className="bg-[var(--color-secondary)] self-stretch md:self-auto w-full md:w-32 h-32 rounded-[1.5rem] flex flex-col items-center justify-center text-center p-4 shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                   <Briefcase className="w-8 h-8 mb-2" />
                   <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">Wir suchen</span>
                </div>

                {/* Job Info */}
                <div className="flex-1 py-4 px-4 md:px-0 text-center md:text-left w-full">
                   <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{job.title}</h3>
                   <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600">
                        <Clock className="w-3 h-3" /> {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600">
                        <Euro className="w-3 h-3" /> {job.salary}
                      </span>
                   </div>
                   <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                           <CheckCircle2 className="w-3 h-3 text-[var(--color-primary)]" /> {tag}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Button */}
                <div className="pb-6 md:pb-0">
                   <Button 
                     onClick={() => setSelectedJob(job)}
                     className="rounded-xl h-12 px-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20 transition-all group-hover:scale-105"
                   >
                     Express bewerben
                   </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <div className="inline-block bg-white border border-[var(--color-border-soft)] p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
                   <Sparkles className="w-4 h-4 text-[var(--color-accent)]" /> Initiativbewerbung?
                </h4>
                <p className="text-slate-600 text-sm mb-4">
                   Kein passender Job dabei? Wir finden eine Lösung.
                </p>
                <button onClick={() => setSelectedJob({title: "Initiativbewerbung", id: "initiativ"} as any)} className="text-[var(--color-primary)] font-bold hover:underline cursor-pointer">
                   Jetzt in 1 Minute bewerben →
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* --- EXPRESS BEWERBUNG MODAL --- */}
      {selectedJob && (
        <QuickApplyModal 
          jobTitle={selectedJob.title} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

    </div>
  );
}

// --- SUB-KOMPONENTE: ULTRA-SCHNELLES MODAL ---
function QuickApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation API Call
    setTimeout(() => {
       setIsSubmitting(false);
       setStep(2); // Success Screen sofort nach Step 1
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="bg-[var(--color-secondary)] p-6 md:p-8 flex justify-between items-start border-b border-[var(--color-border-soft)]">
          <div>
            <div className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Dauert unter 30 Sek.
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">{jobTitle}</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 hover:bg-red-50 hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Dein Name</label>
                    <input required type="text" placeholder="Max Mustermann" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">Deine Telefonnummer</label>
                     <input required type="tel" placeholder="017x / xxxxxxxx" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  
                  {/* Optionale Checkbox für Examiniert */}
                  {jobTitle.includes("Fachkraft") && (
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-[var(--color-primary)] rounded border-slate-300 focus:ring-[var(--color-primary)]" />
                        <span className="text-sm font-medium text-slate-600">Ich bin examinierte Fachkraft</span>
                    </label>
                  )}
               </div>

               <div className="pt-2">
                 <Button disabled={isSubmitting} type="submit" className="w-full h-14 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
                    {isSubmitting ? <span className="animate-pulse">Sende Daten...</span> : <>Kostenlos absenden <Send className="w-4 h-4" /></>}
                 </Button>
               </div>
               
               <p className="text-center text-xs text-slate-400 font-medium">
                   Das war's schon! Kein Lebenslauf & kein Anschreiben nötig.
               </p>
            </form>
          )}

          {step === 2 && (
            <div className="text-center py-8 animate-in zoom-in-95 duration-300">
               <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                  <CheckCircle2 className="w-10 h-10" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 mb-2">Vielen Dank!</h3>
               <p className="text-slate-600 mb-8 max-w-xs mx-auto leading-relaxed">
                  Wir rufen dich schnellstmöglich (Mo-Fr) unter deiner Nummer an.
               </p>
               <Button onClick={onClose} variant="outline" className="h-12 px-8 rounded-xl border-2 font-bold hover:bg-slate-50">
                  Fenster schließen
               </Button>
            </div>
          )}

        </div>

        {/* Footer Note */}
        {step === 1 && (
           <div className="px-8 pb-8 pt-0 text-center">
             <div className="relative mb-4">
               <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
               <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider"><span className="bg-white px-2 text-slate-400">Alternativ</span></div>
             </div>
             <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 font-bold hover:bg-green-100 transition-colors">
                <MessageCircle className="w-5 h-5" /> Per WhatsApp bewerben
             </button>
           </div>
        )}

      </div>
    </div>
  );
}