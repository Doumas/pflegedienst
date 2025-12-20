import Link from "next/link";
import { ShieldCheck, Heart, Clock, Activity, Coffee, Syringe, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function FeaturesAndServices() {
  return (
    <section className="relative py-24 lg:py-32 bg-[var(--color-footer-bg)] overflow-hidden font-sans text-white">
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] opacity-30" />

      <div className="container relative z-10 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3 h-3" />
              Unsere Expertise
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Mehr als nur Pflege. <br/>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-accent)]">
                Lebensqualität.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="max-w-md text-white/70 text-lg leading-relaxed font-medium">
            <p>
              Wir verbinden medizinische Professionalität mit menschlicher Wärme. 
              Hier ist ein Überblick, wie wir Sie im Alltag unterstützen.
            </p>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* CARD 1: Herz & Verstand (Groß) */}
          <Link href="/ueber-uns" className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 p-8 md:p-12 hover:border-[var(--color-accent)]/50 transition-all duration-500 cursor-pointer">
             <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-6 pointer-events-none">
                <Heart className="w-64 h-64 text-[var(--color-accent)]" />
             </div>
             
             <div className="relative z-10 h-full flex flex-col justify-between">
               {/* Icon Container: Orange Akzent */}
               <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[var(--color-accent)] mb-6 border border-white/5 backdrop-blur-md shadow-lg group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
                 <Heart className="w-8 h-8 fill-current" />
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    Herz & Verstand 
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-accent)]" />
                 </h3>
                 <p className="text-white/80 text-lg max-w-lg leading-relaxed">
                   Fachliches Können ist unsere Basis, aber Empathie ist unser Schlüssel. 
                   Wir pflegen nicht nach der Stoppuhr, sondern richten uns nach dem Menschen. 
                 </p>
               </div>
             </div>
          </Link>

          {/* CARD 2: Grundpflege (Jetzt mit Orange Icon) */}
          <Link href="/leistungen/ambulante-pflege" className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/5 p-8 hover:bg-white/10 hover:border-[var(--color-accent)]/40 transition-all duration-300 cursor-pointer flex flex-col">
             {/* Icon jetzt Orange statt Weiß, wird Weiß bei Hover */}
             <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:bg-[var(--color-accent)] group-hover:text-white">
               <Activity className="w-7 h-7" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Grundpflege</h4>
             <p className="text-sm text-white/60 leading-relaxed mb-6">
               Körperpflege, Ernährung & Mobilität. Würdevoller Umgang im Alltag.
             </p>
             <ul className="space-y-2 mt-auto">
                {['Waschen & Duschen', 'An- & Auskleiden', 'Nahrungsaufnahme'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[var(--color-accent)]" /> {item}
                  </li>
                ))}
             </ul>
          </Link>

          {/* CARD 3: Medizinische Pflege (Jetzt mit Orange Icon) */}
          <Link href="/leistungen/ambulante-pflege" className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/5 p-8 hover:bg-white/10 hover:border-[var(--color-accent)]/40 transition-all duration-300 cursor-pointer flex flex-col">
             <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:bg-[var(--color-accent)] group-hover:text-white">
               <Syringe className="w-7 h-7" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Medizinische Pflege</h4>
             <p className="text-sm text-white/60 leading-relaxed mb-6">
               Professionelle Umsetzung ärztlicher Verordnungen direkt bei Ihnen zuhause.
             </p>
             <ul className="space-y-2 mt-auto">
                {['Medikamentengabe', 'Wundversorgung', 'Injektionen'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[var(--color-accent)]" /> {item}
                  </li>
                ))}
             </ul>
          </Link>

          {/* CARD 4: 24h Notfall (Jetzt mit Orange Icon) */}
          <Link href="/kontakt" className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary)]/80 to-[var(--color-primary)]/40 border border-white/10 p-8 hover:scale-[1.02] hover:border-[var(--color-accent)]/50 transition-all duration-300 cursor-pointer shadow-lg shadow-[var(--color-primary)]/20">
             <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full blur-2xl group-hover:bg-[var(--color-accent)]/30 transition-colors" />
             
             {/* Icon Orange (auf dunklem BG) */}
             <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform border border-white/20 group-hover:bg-[var(--color-accent)] group-hover:text-white">
               <Clock className="w-7 h-7" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2">24h Erreichbarkeit</h4>
             <p className="text-sm text-white/80 leading-relaxed">
               Krankheit kennt keinen Feierabend. Im Notfall sind wir rund um die Uhr da.
             </p>
             <div className="mt-4 flex items-center gap-2 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                Kontakt aufnehmen <ArrowRight className="w-3 h-3" />
             </div>
          </Link>

           {/* CARD 5: Alltag (Jetzt mit Orange Icon) & CTA */}
           <div className="md:col-span-1 relative flex flex-col gap-6">
              
              <Link href="/leistungen/betreuung" className="flex-1 rounded-[2.5rem] bg-white/5 border border-white/5 p-8 hover:bg-white/10 hover:border-[var(--color-accent)]/40 transition-all group cursor-pointer">
                {/* Icon Orange */}
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">Alltagshilfe</h4>
                <p className="text-xs text-white/60">Einkäufe, Haushalt & Betreuung.</p>
              </Link>

              {/* CTA CARD (Glass) */}
              <Link href="/leistungen" className="group relative flex-1 rounded-[2.5rem] bg-white/5 hover:bg-[var(--color-primary)] p-8 flex flex-col justify-center items-start transition-all duration-300 shadow-xl shadow-black/20 border border-white/10 hover:-translate-y-1 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]" />
                 
                 <h4 className="text-2xl font-black text-white mb-2">Alle Leistungen</h4>
                 <div className="flex items-center gap-2 text-white/70 font-bold group-hover:text-white group-hover:translate-x-1 transition-all">
                    Zur Übersicht <ArrowRight className="w-5 h-5" />
                 </div>
              </Link>

           </div>
        </div>

        <div className="mt-20 md:mt-32 text-center max-w-4xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-8 opacity-80" />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/90 leading-normal">
            "Pflege ist für uns nicht nur ein Beruf, sondern eine <span className="text-white font-semibold italic decoration-[var(--color-accent)] decoration-2 underline-offset-4 underline">Berufung</span>."
          </blockquote>
        </div>

      </div>
    </section>
  );
}