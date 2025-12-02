import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum | Pflegedienst Herz & Hand",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white py-20 lg:py-32 font-sans">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Impressum</h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>{siteConfig.name}</strong><br />
              Musterstraße 49<br />
              80331 München
            </p>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Kontakt</h2>
            <p>
              Telefon: {siteConfig.contact.phone}<br />
              E-Mail: {siteConfig.contact.email}
            </p>
          </section>

          {/* Vertretung */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Vertreten durch</h2>
            <p>
              Geschäftsführer: Max Mustermann<br />
              Pflegedienstleitung: Erika Musterfrau
            </p>
          </section>

          {/* Registereintrag (falls GmbH) */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht München<br />
              Registernummer: HRB 12345
            </p>
          </section>

          {/* Umsatzsteuer & IK-Nummer (Wichtig für Pflege!) */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Identifikationsnummern</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              DE 123 456 789
            </p>
            <p className="mt-4">
              Institutionskennzeichen (IK-Nummer):<br />
              123456789
            </p>
          </section>

          {/* Aufsichtsbehörde (Wichtig für Pflege!) */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Zuständige Aufsichtsbehörde</h2>
            <p>
              Gesundheitsamt München<br />
              Musterweg 1, 80000 München
            </p>
          </section>

          {/* Streitbeilegung */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}