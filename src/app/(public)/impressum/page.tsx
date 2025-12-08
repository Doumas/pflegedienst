import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Building2, Phone, User, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum | Pflegedienst Herz & Hand",
};

export default function ImpressumPage() {
  return (
    // FIX: Erhöhter Padding-Top für Fixed Header
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-48 pb-20 font-sans">
      
      <div className="container max-w-3xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Impressum</h1>
           <p className="text-slate-500">Angaben gemäß § 5 TMG</p>
        </div>
        
        <div className="grid gap-6">
          
          {/* Karte 1: Betreiber & Kontakt */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0"><Building2 className="w-6 h-6" /></div>
               <div className="space-y-4 w-full">
                  <h2 className="text-xl font-bold text-slate-900">Seitenbetreiber</h2>
                  <div>
                     <p className="font-bold text-lg mb-1">{siteConfig.name}</p>
                     <p className="text-slate-600">Musterstraße 49<br />80331 München</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                     <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Telefon</span>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-slate-900 hover:text-primary transition-colors font-medium">{siteConfig.contact.phone}</a>
                     </div>
                     <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">E-Mail</span>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-900 hover:text-primary transition-colors font-medium break-all">{siteConfig.contact.email}</a>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Karte 2: Vertretung & Register */}
          <div className="grid md:grid-cols-2 gap-6">
             <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-slate-900">
                   <User className="w-5 h-5 text-slate-400" />
                   <h3 className="font-bold text-lg">Vertreten durch</h3>
                </div>
                <div className="text-slate-600 space-y-1">
                   <p>Geschäftsführer: Max Mustermann</p>
                   <p>PDL: Erika Musterfrau</p>
                </div>
             </section>

             <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-slate-900">
                   <FileText className="w-5 h-5 text-slate-400" />
                   <h3 className="font-bold text-lg">Registereintrag</h3>
                </div>
                <div className="text-slate-600 space-y-1">
                   <p>Amtsgericht München</p>
                   <p>HRB 12345</p>
                </div>
             </section>
          </div>

          {/* Karte 3: Pflege-Spezifika (Wichtig!) */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
               <Scale className="w-6 h-6 text-slate-400" /> Aufsicht & Identifikation
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 text-sm">
               <div>
                  <h4 className="font-bold text-slate-900 mb-2">Umsatzsteuer-ID</h4>
                  <p className="text-slate-600">DE 123 456 789</p>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 mb-2">Institutionskennzeichen (IK)</h4>
                  <p className="text-slate-600">123456789</p>
               </div>
               <div className="sm:col-span-2 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Zuständige Aufsichtsbehörde</h4>
                  <p className="text-slate-600">
                     Gesundheitsamt München<br />
                     Musterweg 1, 80000 München
                  </p>
               </div>
            </div>
          </section>

          {/* Streitbeilegung */}
          <section className="text-center text-xs text-slate-400 mt-8 max-w-xl mx-auto leading-relaxed">
            <p className="mb-2">
              Plattform der EU-Kommission zur Online-Streitbeilegung: <a href="https://ec.europa.eu/consumers/odr" target="_blank" className="underline hover:text-slate-600">https://ec.europa.eu/consumers/odr</a>
            </p>
            <p>
              Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}