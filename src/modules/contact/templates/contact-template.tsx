"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, 
  MessageSquare, Loader2, Sparkles, Navigation, HelpCircle, 
  Calendar, FileText, Heart 
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/shared/ui/button";

export function ContactTemplate() {
  const [state, handleSubmit] = useForm("mqavzykn");
  const searchParams = useSearchParams();
  
  const [subject, setSubject] = useState("Pflegeberatung");
  const [messageText, setMessageText] = useState("");

  // --- AUTOMATISCHER TEXT & SCROLL-EFFEKT ---
  useEffect(() => {
    const who = searchParams.get("who");
    const level = searchParams.get("level");

    if (who || level) {
      // 1. Text generieren (wie vorher)
      let text = "Guten Tag,\n\nich habe Ihren Pflege-Wegweiser genutzt und interessiere mich für eine Beratung.\n\n";
      
      if (who === "mich") {
        text += "Situation: Ich suche Unterstützung für mich selbst.\n";
      } else if (who === "angehoerige") {
        text += "Situation: Ich suche Unterstützung für einen Angehörigen.\n";
      }

      if (level?.includes("Ja")) {
        text += "Pflegegrad: Ist bereits vorhanden.\nIch wüsste gerne, welche Leistungen ich abrufen kann.";
      } else if (level?.includes("Nein")) {
        text += "Pflegegrad: Noch nicht vorhanden.\nIch benötige bitte Hilfe bei der Beantragung / Erstbegutachtung.";
      } else if (level?.includes("beantragt")) {
        text += "Pflegegrad: Ist bereits beantragt, aber noch nicht genehmigt.\n";
      }

      text += "\n\nBitte melden Sie sich bei mir für das weitere Vorgehen.";
      
      setMessageText(text);
      setSubject("Pflegeberatung");

      // 2. NEU: Smooth Scroll zum Formular
      // Wir nutzen einen kleinen Timeout, um sicherzugehen, dass die Seite fertig geladen ist
      setTimeout(() => {
        const formElement = document.getElementById("anfrage-formular");
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" // Zentriert das Formular im Blickfeld
          });
        }
      }, 300); // 300ms Verzögerung für weicheren Ablauf nach Seitenwechsel
    }
  }, [searchParams]);


  const googleMapsUrl = `http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}`;

  const topics = [
    { id: "Pflegeberatung", label: "Pflegeberatung", icon: Heart },
    { id: "Terminanfrage", label: "Termin vereinbaren", icon: Calendar },
    { id: "Verwaltung", label: "Rechnung / Büro", icon: FileText },
    { id: "Sonstiges", label: "Allgemeine Frage", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white font-sans pb-20 selection:bg-primary/20">
      
      {/* --- 1. HEADER --- */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary border-b border-border-soft overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none" />
        
        <div className="container relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-soft text-primary text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <MessageSquare className="w-3 h-3 text-accent" />
            <span>Kontakt & Hilfe</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Wir sind <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              für Sie da.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Ob Pflegegrad, Erstgespräch oder einfach nur eine Frage: <br className="hidden md:block"/>
            Wir nehmen uns Zeit für Ihr Anliegen.
          </p>
        </div>
      </section>

      {/* --- 2. INHALT --- */}
      <div className="container py-16 lg:py-24 px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LINKS: Kontakt-Infos */}
          <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
            
            <div className="lg:hidden mb-6">
               <h3 className="text-2xl font-bold text-slate-900">Kontaktwege</h3>
            </div>

            {/* 1. Telefon Card */}
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-white border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
               </div>
               <div>
                  <p className="font-bold text-slate-900 mb-0.5">Rufen Sie uns an</p>
                  <p className="text-lg text-slate-600 group-hover:text-primary font-medium transition-colors">{siteConfig.contact.phone}</p>
               </div>
            </a>

            {/* 2. E-Mail Card */}
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-white border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer relative overflow-hidden">
               <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
               </div>
               <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 mb-0.5">Schreiben Sie uns</p>
                  <p className="text-lg text-slate-600 group-hover:text-primary font-medium transition-colors truncate">{siteConfig.contact.email}</p>
               </div>
            </a>

            {/* 3. WhatsApp Card */}
            <div className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-green-50 border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all group cursor-pointer relative overflow-hidden">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
               </div>
               <div>
                  <p className="font-bold text-green-900 mb-0.5">WhatsApp Chat</p>
                  <p className="text-sm text-green-700">Antwort in wenigen Minuten</p>
               </div>
               <ArrowRight className="ml-auto w-5 h-5 text-green-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </div>

            {/* 4. Standort Visual */}
            <div className="rounded-[2rem] bg-slate-100 border border-slate-200 p-2 overflow-hidden group relative">
               <a 
                 href={googleMapsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block h-48 w-full rounded-[1.5rem] bg-slate-200 relative overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                 title="Karte bei Google Maps öffnen"
               >
                   <div className="absolute inset-0 flex items-center justify-center z-10">
                       <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-sm text-slate-700 font-bold text-sm group-hover:scale-105 transition-transform">
                          <MapPin className="w-4 h-4 text-primary" /> Karte öffnen
                       </div>
                   </div>
                   <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
               </a>
               
               <div className="p-4">
                  <h4 className="font-bold text-slate-900">{siteConfig.contact.address}</h4>
                  <p className="text-sm text-slate-500 mb-4">Kostenlose Parkplätze im Hof.</p>
                  
                  <Button asChild variant="outline" className="w-full justify-between bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
                     <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Route planen <Navigation className="w-4 h-4 text-primary" />
                     </a>
                  </Button>
               </div>
            </div>

            {/* 5. Notruf Mini */}
            <div className="p-6 rounded-3xl bg-footer-bg text-white flex items-center gap-4 shadow-xl shadow-primary/10">
               <div className="p-3 bg-white/10 rounded-full animate-pulse">
                  <Clock className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">24h Notruf für Patienten</div>
                  <div className="text-xl font-bold">089 / 123 456 99</div>
               </div>
            </div>

          </div>

          {/* RECHTS: Das Formular */}
          {/* NEU: ID hinzugefügt, damit das Scrolling funktioniert */}
          <div id="anfrage-formular" className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 scroll-mt-32">
            
            <Sparkles className="absolute top-8 right-8 w-6 h-6 text-secondary animate-pulse" />

            {state.succeeded ? (
              <div className="text-center py-20 animate-in zoom-in duration-500 h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Nachricht gesendet!</h3>
                <p className="text-slate-600 mb-10 max-w-xs mx-auto text-lg leading-relaxed">
                  Vielen Dank. Wir haben Ihre Anfrage erhalten und melden uns in Kürze.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()} 
                  className="border-slate-200 text-slate-600 hover:border-primary hover:text-primary rounded-xl h-12 px-8"
                >
                  Zurück zum Formular
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div>
                   <h3 className="text-3xl font-bold text-slate-900 mb-2">Schreiben Sie uns</h3>
                   <p className="text-slate-500">Worum geht es bei Ihrer Anfrage?</p>
                </div>

                {/* 1. THEMEN WAHL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {topics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSubject(topic.id)}
                        className={`
                          relative flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                          ${subject === topic.id 
                             ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                             : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:bg-slate-50'}
                        `}
                      >
                         <topic.icon className={`w-5 h-5 ${subject === topic.id ? 'text-white' : 'text-slate-400'}`} />
                         <span className="font-bold text-sm">{topic.label}</span>
                         {subject === topic.id && <CheckCircle2 className="absolute right-4 w-5 h-5 text-white/50" />}
                      </button>
                   ))}
                </div>
                <input type="hidden" name="_subject" value={`Neue Anfrage: ${subject}`} />

                {/* 2. INPUTS */}
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="vorname" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Vorname</label>
                      <input id="vorname" name="vorname" type="text" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-900" placeholder="Max" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="nachname" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nachname</label>
                      <input id="nachname" name="nachname" type="text" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-900" placeholder="Mustermann" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-Mail</label>
                      <input id="email" name="email" type="email" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-900" placeholder="ihre@email.de" />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Telefon</label>
                      <input id="phone" name="phone" type="tel" className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-900" placeholder="Für Rückrufe" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ihre Nachricht</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6} // Etwas größer für den Template Text
                      required 
                      className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal leading-relaxed" 
                      placeholder={subject === "Pflegeberatung" ? "Schildern Sie uns kurz die aktuelle Situation..." : "Wie können wir Ihnen helfen?"}
                      value={messageText} // Hier wird der Text automatisch eingefügt
                      onChange={(e) => setMessageText(e.target.value)} // Damit man ihn noch bearbeiten kann
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                  </div>
                </div>

                <Button type="submit" disabled={state.submitting} className="w-full h-14 text-lg bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-xl shadow-primary/20 font-bold transition-all hover:-translate-y-1">
                    {state.submitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Wird gesendet...</>
                    ) : (
                      <span className="flex items-center gap-2">Anfrage absenden <ArrowRight className="w-5 h-5" /></span>
                    )}
                </Button>
                
                <p className="text-xs text-center text-slate-400 mt-4">
                  Mit dem Absenden erklären Sie sich mit unserer <a href="/datenschutz" className="underline hover:text-slate-600">Datenschutzerklärung</a> einverstanden.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}