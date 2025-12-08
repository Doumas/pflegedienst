import { Phone, ClipboardList, HeartHandshake, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  { id: "01", title: "Erstgespräch", description: "Ein Anruf genügt. Wir klären erste Fragen sofort und unverbindlich.", icon: Phone },
  { id: "02", title: "Beratung vor Ort", description: "Wir besuchen Sie, lernen uns kennen und ermitteln den exakten Bedarf.", icon: ClipboardList },
  { id: "03", title: "Kostenklärung", description: "Wir erstellen den Plan und übernehmen den Papierkram mit der Kasse.", icon: CalendarCheck },
  { id: "04", title: "Pflegebeginn", description: "Start Ihrer Versorgung. Ab jetzt sind wir fest an Ihrer Seite.", icon: HeartHandshake }
];

export function ProcessSteps() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden font-sans relative">
      <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)] border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              Der Ablauf
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance">
             In 4 einfachen Schritten <br/> 
             {/* UPDATE: Unterstrich hinzugefügt */}
             <span className="relative inline-block text-[var(--color-primary)]">
                zur besten Versorgung.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
             </span>
           </h2>
           <p className="text-xl text-slate-600 leading-relaxed">
             Wir nehmen Sie an die Hand und führen Sie sicher durch den Bürokratie-Dschungel.
           </p>
        </div>

        {/* ... Rest der Steps Komponente bleibt gleich ... */}
        {/* Ich kürze den Grid-Code hier ab, da er sich nicht geändert hat, um die Antwort übersichtlich zu halten */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-100 via-[var(--color-primary)]/20 to-slate-100 -z-10" />
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-full blur-xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-500 scale-75 group-hover:scale-125" />
                <div className="relative w-24 h-24 rounded-[2rem] bg-white border border-[var(--color-border-soft)] flex items-center justify-center shadow-xl shadow-slate-200/50 group-hover:-translate-y-2 group-hover:shadow-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--color-accent)] text-white font-bold text-sm flex items-center justify-center border-2 border-white shadow-sm">{step.id}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{step.title}</h3>
              <p className="text-base text-slate-600 leading-relaxed px-4">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}