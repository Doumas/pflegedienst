import type { Metadata } from "next";
import { ShieldCheck, Lock, Server, Mail, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutz | Pflegedienst Herz & Hand",
};

export default function PrivacyPage() {
  return (
    // FIX: "pt-32 lg:pt-48" sorgt dafür, dass der Text unter dem Header beginnt
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-48 pb-20 font-sans">
      
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200 pb-12 mb-12">
         <div className="container max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wide mb-6">
               <ShieldCheck className="w-3 h-3" /> Rechtliches
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
               Datenschutzerklärung
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
               Transparenz ist uns wichtig. Hier erfahren Sie, wie wir Ihre Daten schützen und verarbeiten. Stand: 2025.
            </p>
         </div>
      </div>

      <div className="container max-w-4xl px-6 grid lg:grid-cols-[1fr_250px] gap-12 lg:gap-20">
        
        {/* MAIN CONTENT */}
        <div className="space-y-16 text-slate-600 leading-relaxed">
          
          {/* Sektion 1 */}
          <section id="ueberblick" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">1. Datenschutz auf einen Blick</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               <h3 className="text-lg font-bold text-slate-800">Allgemeine Hinweise</h3>
               <p>
                 Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. 
                 Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
               </p>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">
                  <h4 className="font-bold text-slate-900 mb-2">Kurz & Knapp:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                     <li>Wir nutzen SSL-Verschlüsselung für Ihre Sicherheit.</li>
                     <li>Daten aus dem Kontaktformular nutzen wir nur zur Beantwortung Ihrer Anfrage.</li>
                     <li>Wir verkaufen Ihre Daten niemals an Dritte.</li>
                  </ul>
               </div>
            </div>
          </section>

          {/* Sektion 2 */}
          <section id="hosting" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Server className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">2. Hosting & Technik</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
               <h3 className="text-lg font-bold text-slate-800 mt-4">Vercel Inc.</h3>
               <p>
                 Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA. 
                 Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen zur Gewährleistung der Betriebssicherheit.
               </p>
            </div>
          </section>

          {/* Sektion 3 */}
          <section id="erfassung" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Mail className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">3. Datenerfassung auf dieser Website</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               
               <h3 className="text-lg font-bold text-slate-800">Kontaktformular</h3>
               <p>
                 Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
               </p>
               
               <h3 className="text-lg font-bold text-slate-800 mt-6">Verwendung von Formspree</h3>
               <p>
                 Wir nutzen für unser Kontaktformular den Dienst <strong>Formspree</strong> (Formspree, Inc., USA). 
                 Wenn Sie das Kontaktformular absenden, werden die eingegebenen Daten an Formspree übermittelt, dort verarbeitet und an uns per E-Mail weitergeleitet.
                 <br/>
                 Weitere Informationen finden Sie in der 
                 <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="nofollow" className="text-primary hover:underline ml-1 font-medium">
                   Datenschutzerklärung von Formspree
                 </a>.
               </p>
            </div>
          </section>

          {/* Sektion 4 */}
          <section id="pflicht" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Scale className="w-6 h-6" /></div>
               <h2 className="text-2xl font-bold text-slate-900">4. Pflichtinformationen</h2>
            </div>
            <div className="prose prose-slate max-w-none">
               <h3 className="text-lg font-bold text-slate-800">Verantwortliche Stelle</h3>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 mt-4">
                  <p className="font-medium text-slate-900 mb-1">Pflegedienst Herz & Hand</p>
                  <p className="mb-4">Musterstraße 49<br />80331 München</p>
                  <p className="text-sm">
                     <span className="text-slate-400 uppercase font-bold tracking-wider text-xs block mb-1">Kontakt</span>
                     E-Mail: <a href="mailto:info@herz-hand-pflege.de" className="text-primary hover:underline">info@herz-hand-pflege.de</a>
                  </p>
               </div>
            </div>
          </section>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-800 mt-12 flex gap-3">
            <div className="shrink-0 pt-0.5">⚠️</div>
            <div>
               Hinweis: Dies ist ein Mustertext. Bitte lassen Sie Ihre Datenschutzerklärung vor Veröffentlichung von einem Anwalt oder Ihrem Datenschutzbeauftragten prüfen, insbesondere im Hinblick auf Drittanbieter-Dienste wie Formspree oder Google Maps Links.
            </div>
          </div>

        </div>

        {/* SIDEBAR (Desktop Sticky) */}
        <div className="hidden lg:block relative">
           <div className="sticky top-32">
              <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Inhalt</h3>
              <nav className="space-y-1 border-l-2 border-slate-100 pl-4">
                 <a href="#ueberblick" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">1. Überblick</a>
                 <a href="#hosting" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">2. Hosting</a>
                 <a href="#erfassung" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">3. Datenerfassung</a>
                 <a href="#pflicht" className="block py-2 text-sm text-slate-500 hover:text-primary hover:font-medium transition-colors">4. Pflichtinfos</a>
              </nav>
           </div>
        </div>

      </div>
    </div>
  );
}