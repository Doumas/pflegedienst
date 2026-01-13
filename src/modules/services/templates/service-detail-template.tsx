import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/shared/data/service-data";
import { FadeIn } from "@/shared/ui/fade-in";
import { Button } from "@/shared/ui/button";

// HIER DIE ÄNDERUNG: Wir erwarten das fertige Objekt, keinen Slug mehr
interface ServiceDetailTemplateProps {
  service: ServiceItem;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  // Wir brauchen hier keine "const foundService = ..." mehr, da 'service' direkt übergeben wird.

  return (
    <main className="min-h-screen bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-[0.7]" // Etwas abdunkeln für Text-Lesbarkeit
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pb-16 lg:pb-24">
          <FadeIn>
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Übersicht
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              {service.title}
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
              {service.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT: Main Content */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.2}>
                <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-8">
                  Unser Leistungsangebot
                </h2>
                <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
                  <p>
                    {/* Hier könnte ein längerer Text aus den Daten stehen, falls vorhanden. 
                        Aktuell nutzen wir die Description als Platzhalter oder du fügst ein 'details'-Feld in deine Daten hinzu. */}
                    Bei {service.title} legen wir höchsten Wert auf Qualität und Menschlichkeit. 
                    Unser erfahrenes Team sorgt dafür, dass Sie oder Ihre Angehörigen bestmöglich versorgt sind.
                    Wir passen unsere Leistungen individuell an Ihre Bedürfnisse an.
                  </p>
                  <p className="mt-6">
                    Wir beraten Sie gerne unverbindlich zu den Möglichkeiten der Finanzierung durch die Pflegekasse 
                    und unterstützen Sie bei der Antragstellung.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-[var(--color-secondary)]/30 rounded-2xl border border-[var(--color-primary-deep)]/5">
                  <h3 className="text-xl font-bold text-[var(--color-primary-deep)] mb-6">
                    Das beinhaltet diese Leistung:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Dummy-Liste, falls du keine spezifischen Unterpunkte in den Daten hast. 
                        Sonst: service.features.map(...) */}
                    {[
                      "Kostenlose Erstberatung",
                      "Individuelle Versorgungsplanung",
                      "Abrechnung mit allen Kassen",
                      "Qualifiziertes Fachpersonal",
                      "24/7 Erreichbarkeit bei Notfällen",
                      "Transparente Kostenaufstellung"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT: Sidebar / CTA */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Box 1: Kontakt */}
              <FadeIn delay={0.4} className="bg-[var(--color-primary-deep)] text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Haben Sie Fragen?</h3>
                    <p className="text-white/70 mb-8 leading-relaxed">
                      Gerne beraten wir Sie persönlich zu diesem Thema. Rufen Sie uns einfach an.
                    </p>
                    <a 
                      href="tel:06912345678" 
                      className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[var(--color-primary-deep)] font-bold rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      069 / 123 456 78
                    </a>
                </div>
                {/* Deko Circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              </FadeIn>

              {/* Box 2: Termin */}
              <FadeIn delay={0.5} className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Termin vereinbaren</h3>
                <p className="text-slate-500 mb-6 text-sm">
                  Buchen Sie direkt online einen Beratungstermin für {service.title}.
                </p>
                <Link href="/kontakt" className="block">
                  <Button variant="default" className="w-full">
                    Jetzt anfragen
                  </Button>
                </Link>
              </FadeIn>

            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
}