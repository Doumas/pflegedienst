import { Phone, ClipboardList, HeartHandshake, CalendarCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Erstgespräch",
    description: "Rufen Sie uns an. Wir klären erste Fragen sofort und vereinbaren einen unverbindlichen Termin.",
    icon: Phone
  },
  {
    id: "02",
    title: "Beratung vor Ort",
    description: "Wir kommen zu Ihnen nach Hause, lernen uns kennen und ermitteln den genauen Pflegebedarf.",
    icon: ClipboardList
  },
  {
    id: "03",
    title: "Kostenklärung",
    description: "Wir erstellen einen Kostenvoranschlag und klären die Übernahme durch die Pflegekasse für Sie.",
    icon: CalendarCheck
  },
  {
    id: "04",
    title: "Pflegebeginn",
    description: "Ihre feste Bezugspflegekraft beginnt zur Wunschzeit. Wir sind ab jetzt an Ihrer Seite.",
    icon: HeartHandshake
  }
];

export function ProcessSteps() {
  return (
    // HINTERGRUND: Rosa (bg-secondary)
    <section className="py-24 bg-secondary overflow-hidden font-sans">
      <div className="container">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-wider text-sm uppercase block mb-2">Der Ablauf</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            In 4 einfachen Schritten <br/> zur optimalen Versorgung.
          </h2>
          <p className="text-slate-600 text-lg">
            Wir nehmen Sie an die Hand und führen Sie durch den Bürokratie-Dschungel.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Verbindungslinie (Nur Desktop) - Liegt hinter den Kreisen */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-border-soft via-accent-soft to-border-soft -z-10 opacity-50" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center mb-6 shadow-md group-hover:border-primary group-hover:scale-110 transition-all duration-300 z-10">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Nummer (Hintergrund Deko) */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl font-bold text-primary -z-20 select-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 font-serif">
                {step.id}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed px-2">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}