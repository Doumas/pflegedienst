import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | Pflegedienst Herz & Hand",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20 lg:py-32 font-sans">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold text-slate-800 mt-4 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            <h3 className="font-bold text-slate-800 mt-4 mb-2">Vercel / Externes Hosting</h3>
            <p>
              Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Datenerfassung auf dieser Website</h2>
            
            <h3 className="font-bold text-slate-800 mt-4 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            
            <h3 className="font-bold text-slate-800 mt-4 mb-2">Verwendung von Formspree</h3>
            <p>
              Wir nutzen für unser Kontaktformular den Dienst Formspree (Formspree, Inc., 21750 Hardy Oak Blvd San Antonio, TX 78258, USA). 
              Wenn Sie das Kontaktformular absenden, werden die eingegebenen Daten an Formspree übermittelt, dort verarbeitet und an uns per E-Mail weitergeleitet.
              Weitere Informationen finden Sie in der Datenschutzerklärung von Formspree: 
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="nofollow" className="text-primary hover:underline ml-1">
                https://formspree.io/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="font-bold text-slate-800 mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Pflegedienst Herz & Hand<br />
              Musterstraße 49<br />
              80331 München<br /><br />
              E-Mail: info@herz-hand-pflege.de
            </p>
          </section>

          <div className="bg-secondary p-4 rounded-lg border border-slate-100 mt-8 text-xs text-slate-500">
            Hinweis: Dies ist ein Muster. Bitte lassen Sie Ihre Datenschutzerklärung von einem Anwalt oder Datenschutzbeauftragten prüfen, insbesondere da wir Dienste wie Formspree nutzen.
          </div>

        </div>
      </div>
    </div>
  );
}