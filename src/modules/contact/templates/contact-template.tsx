"use client";

import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/shared/ui/button";

export function ContactTemplate() {
  // HIER DEINE ECHTE ID EINTRAGEN:
  const [state, handleSubmit] = useForm("mqavzykn");

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* --- 1. HEADER (Rosa & Konsistent) --- */}
      <section className="bg-secondary py-24 border-b border-text-light">
        <div className="container text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-2 mb-6 opacity-70">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Kontakt</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Wir sind <span className="text-primary">für Sie da.</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Haben Sie Fragen zur Pflegeversicherung oder benötigen Sie akut Hilfe? 
            Rufen Sie uns an oder schreiben Sie uns.
          </p>
        </div>
      </section>

      {/* --- 2. INHALT --- */}
      <div className="container py-16 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LINKS: Infos & Notruf */}
          <div className="space-y-8">
            
            {/* Weiße Karte: Kontaktdaten */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 space-y-8">
              <h3 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-50">Kontaktdaten</h3>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Telefon</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-xl text-slate-600 hover:text-primary transition-colors block mt-1">
                    {siteConfig.contact.phone}
                  </a>
                  <p className="text-sm text-slate-400 mt-1">Mo-Fr 08:00 - 16:00 Uhr</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">E-Mail</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-lg text-slate-600 hover:text-primary transition-colors block mt-1">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Büro</p>
                  <p className="text-lg text-slate-600 mt-1">{siteConfig.contact.address}</p>
                  <a href="#" className="inline-flex items-center text-sm text-primary mt-2 hover:underline">
                    Route planen <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rote Box: Notruf */}
            <div className="bg-primary p-8 rounded-2xl shadow-lg text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-bold">24h Notruf</h3>
              </div>
              <p className="opacity-90 mb-6 leading-relaxed relative z-10 text-secondary">
                Für unsere Patienten sind wir in pflegerischen Notfällen rund um die Uhr erreichbar.
              </p>
              <div className="text-3xl font-bold tracking-wide relative z-10 border-b-2 border-white/20 pb-2 inline-block">
                089 / 123 456 99
              </div>
              <p className="text-xs opacity-75 mt-4 relative z-10">Nur für Bestandspatienten</p>
            </div>

          </div>

          {/* RECHTS: Formular (ECHT & FUNKTIONAL) */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100 h-full">
            
            {state.succeeded ? (
              <div className="text-center py-20 animate-in zoom-in duration-300 h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nachricht gesendet!</h3>
                <p className="text-slate-600 mb-8 max-w-xs mx-auto">
                  Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
                </p>
                {/* Reload Button um Formular zurückzusetzen */}
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()} 
                  className="border-slate-200 text-slate-600"
                >
                  Neue Nachricht schreiben
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Schreiben Sie uns</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="vorname" className="text-sm font-bold text-slate-700">Vorname</label>
                      <input id="vorname" name="vorname" type="text" required className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Max" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="nachname" className="text-sm font-bold text-slate-700">Nachname</label>
                      <input id="nachname" name="nachname" type="text" required className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Mustermann" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-700">E-Mail Adresse</label>
                    <input id="email" name="email" type="email" required className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="ihre@email.de" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-slate-700">Telefon</label>
                    <input id="phone" name="phone" type="tel" className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Für Rückrufe" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Ihre Nachricht</label>
                    <textarea id="message" name="message" rows={4} required className="w-full p-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Wie können wir Ihnen helfen?" />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs" />
                  </div>

                  <Button type="submit" disabled={state.submitting} className="w-full h-14 text-lg bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md mt-4 font-bold">
                    {state.submitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Wird gesendet...</>
                    ) : (
                      "Nachricht absenden"
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-slate-400 mt-4">
                    Mit dem Absenden akzeptieren Sie unsere Datenschutzbestimmungen.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}