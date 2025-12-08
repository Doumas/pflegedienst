import type { Metadata } from "next";
import { FileText, Scale, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AGB | Pflegedienst Herz & Hand",
};

export default function AgbPage() {
  return (
    // Layout: Identischer Abstand wie Datenschutz & Impressum für Konsistenz
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-48 pb-20 font-sans">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-200 pb-12 mb-12">
         <div className="container max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wide mb-6">
               <Scale className="w-3 h-3" /> Vertragsbedingungen
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
               Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
               Hier finden Sie die rechtlichen Rahmenbedingungen für unsere Zusammenarbeit. 
               Fairness und Transparenz stehen für uns an erster Stelle.
            </p>
         </div>
      </div>

      <div className="container max-w-4xl px-6 grid lg:grid-cols-[1fr_250px] gap-12 lg:gap-20">
        
        {/* --- MAIN CONTENT --- */}
        <div className="space-y-16 text-slate-600 leading-relaxed">
          
          {/* §1 Geltungsbereich */}
          <section id="geltung" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">1. Geltungsbereich</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               <p>
                 Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über pflegerische Leistungen, Betreuungsleistungen und hauswirtschaftliche Versorgung, die zwischen dem <strong>{siteConfig.name}</strong> (nachfolgend „Pflegedienst“) und dem Leistungsempfänger (nachfolgend „Klient“) geschlossen werden.
               </p>
               <p>
                 Abweichende Bedingungen des Klienten werden nicht anerkannt, es sei denn, der Pflegedienst stimmt ihrer Geltung ausdrücklich schriftlich zu.
               </p>
            </div>
          </section>

          {/* §2 Leistungen */}
          <section id="leistungen" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">2. Art und Umfang der Leistungen</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               <p>
                 Art, Inhalt und Umfang der zu erbringenden Leistungen richten sich nach dem zwischen dem Pflegedienst und dem Klienten geschlossenen <strong>Pflegevertrag</strong> sowie den individuellen Maßnahmenplänen.
               </p>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 mt-4">
                  <h4 className="font-bold text-slate-900 mb-2">Unsere Leistungsbereiche:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Grundpflege (SGB XI)</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Behandlungspflege (SGB V)</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Hauswirtschaftliche Versorgung</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Betreuungsleistungen</li>
                  </ul>
               </div>
            </div>
          </section>

          {/* §3 Mitwirkung */}
          <section id="mitwirkung" className="scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Mitwirkungspflichten</h2>
            <p>
              Der Klient oder dessen Angehörige verpflichten sich, alle für die Leistungserbringung notwendigen Informationen (z.B. ärztliche Verordnungen, Medikamentenpläne, Schlüssel) rechtzeitig zur Verfügung zu stellen. 
              Änderungen im Gesundheitszustand oder der häuslichen Situation sind dem Pflegedienst umgehend mitzuteilen.
            </p>
          </section>

          {/* §4 Termine */}
          <section id="termine" className="scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Termine & Absagen</h2>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
               <p className="text-amber-900 font-medium">
                 Vereinbarte Pflegeeinsätze müssen spätestens <strong>24 Stunden vorher</strong> abgesagt werden.
               </p>
            </div>
            <p className="mt-4">
              Bei nicht rechtzeitiger Absage behält sich der Pflegedienst vor, die geplanten Leistungen privat in Rechnung zu stellen, sofern die Pflegekraft den Einsatzort bereits aufgesucht hat oder der Einsatz nicht mehr anderweitig verplant werden konnte.
            </p>
          </section>

          {/* §5 Haftung */}
          <section id="haftung" className="scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Haftung</h2>
            <p>
              Der Pflegedienst haftet für Schäden, die durch vorsätzliches oder grob fahrlässiges Handeln seiner Mitarbeiter entstehen. Für leichte Fahrlässigkeit haftet der Pflegedienst nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="bg-slate-200/50 p-6 rounded-2xl text-xs text-slate-500 mt-12 flex gap-4 items-start">
            <AlertCircle className="w-5 h-5 shrink-0 text-slate-400" />
            <div>
               <strong>Wichtiger rechtlicher Hinweis:</strong><br/>
               Dies ist ein Mustertext für Demonstrationszwecke. Allgemeine Geschäftsbedingungen für Pflegedienste unterliegen strengen gesetzlichen Anforderungen (z.B. WBVG, SGB). Bitte übernehmen Sie diesen Text nicht ungeprüft und lassen Sie Ihre AGB zwingend von einem spezialisierten Rechtsanwalt erstellen oder prüfen.
            </div>
          </div>

        </div>

        {/* --- SIDEBAR (Sticky Navigation) --- */}
        <div className="hidden lg:block relative">
           <div className="sticky top-40">
              <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                 Inhalt <ArrowRight className="w-3 h-3 text-slate-300" />
              </h3>
              <nav className="space-y-1 border-l-2 border-slate-100 pl-4">
                 <a href="#geltung" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">1. Geltungsbereich</a>
                 <a href="#leistungen" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">2. Leistungen</a>
                 <a href="#mitwirkung" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">3. Mitwirkung</a>
                 <a href="#termine" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">4. Termine & Absagen</a>
                 <a href="#haftung" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">5. Haftung</a>
              </nav>
              
              {/* Kontakt Box Mini */}
              <div className="mt-10 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Fragen?</p>
                 <p className="text-sm font-bold text-slate-900 mb-2">Wir helfen gerne weiter.</p>
                 <a href="/kontakt" className="text-xs font-bold text-primary hover:underline">Kontakt aufnehmen →</a>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}