"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, 
  MessageSquare, Loader2, Sparkles, Navigation, HelpCircle, 
  Calendar, FileText, Heart, X, AlertTriangle, ChevronLeft, ChevronRight
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/shared/ui/button";

// WICHTIG: Importiere den Configurator aus deinem Home-Modul
import { CareConfigurator } from "@/modules/home/templates/care-configurator";

type ModalType = "none" | "appointment" | "invoice";

export function ContactTemplate() {
  const [state, handleSubmit] = useForm("mqavzykn");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // DEFAULT: Sonstiges
  const [subject, setSubject] = useState("Sonstiges");
  const [messageText, setMessageText] = useState("");
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [invoiceNr, setInvoiceNr] = useState("");

  // Kalender States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- AUTOMATIK: TEXT ERSTELLEN DURCH URL PARAMETER ---
  useEffect(() => {
    const who = searchParams.get("who");
    const level = searchParams.get("level");
    const type = searchParams.get("type");
    const freq = searchParams.get("freq");

    if (who || level || type) {
      let text = "Guten Tag,\n\nich habe Ihren Pflege-Check genutzt und interessiere mich für eine Beratung.\n\n";
      
      if (who) text += `📌 Für wen: ${who === "mich" ? "Mich selbst" : "Einen Angehörigen"}\n`;
      if (level) text += `📌 Pflegegrad: ${level}\n`;
      if (type) text += `📌 Benötigte Leistung: ${type}\n`;
      if (freq) text += `📌 Gewünschte Häufigkeit: ${freq}\n`;
      
      text += "\nBitte melden Sie sich bei mir, um die Details zu besprechen.";
      
      setMessageText(text);
      setSubject("Pflegeberatung");
      
      setTimeout(() => {
        document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [searchParams]);

  const googleMapsUrl = `http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}`;

  const handleTopicClick = (id: string) => {
    setSubject(id);
    
    if (id === "Pflegeberatung") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("openConfigurator", "true");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (id === "Terminanfrage") {
      setActiveModal("appointment");
    } else if (id === "Verwaltung") {
      setActiveModal("invoice");
      setInvoiceNr(""); 
    } else {
      setMessageText("Guten Tag,\n\nich habe eine allgemeine Frage zu...");
    }
  };

  // --- INTELLIGENTE KALENDER LOGIK ---
  
  // 1. Feiertags-Checker (inkl. 24.12 & 31.12)
  const isHoliday = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateString = `${day}.${month}`;
    const year = date.getFullYear();

    // Feste Feiertage + Heiligabend/Silvester
    const fixedHolidays = [
      "01.01", // Neujahr
      "01.05", // Tag der Arbeit
      "03.10", // Tag der Deutschen Einheit
      "24.12", // Heiligabend (Betriebsferien)
      "25.12", // 1. Weihnachtstag
      "26.12", // 2. Weihnachtstag
      "31.12"  // Silvester (Betriebsferien)
    ];

    // Bewegliche Feiertage (Manuell für 2025/26 für Performance)
    // Karfreitag, Ostermontag, Himmelfahrt, Pfingstmontag, Fronleichnam
    const moving2025 = ["18.04", "21.04", "29.05", "09.06", "19.06"];
    const moving2026 = ["03.04", "06.04", "14.05", "25.05", "04.06"];

    if (fixedHolidays.includes(dateString)) return true;
    if (year === 2025 && moving2025.includes(dateString)) return true;
    if (year === 2026 && moving2026.includes(dateString)) return true;

    return false;
  };

  // 2. Startdatum berechnen (Heute + 3 Werktage)
  const getMinSelectableDate = () => {
    let count = 0;
    let d = new Date();
    // Solange wir noch keine 3 gültigen Werktage addiert haben...
    while (count < 3) {
      d.setDate(d.getDate() + 1);
      // Wenn kein Wochenende UND kein Feiertag -> Zähler hoch
      if (d.getDay() !== 0 && d.getDay() !== 6 && !isHoliday(d)) {
        count++;
      }
    }
    d.setHours(0,0,0,0);
    return d;
  };

  const minDate = getMinSelectableDate();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Mo=0, So=6
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    
    // Validierung: Nicht Vergangenheit, Kein Wochenende, Kein Feiertag
    if (date >= minDate && dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(date)) {
      setSelectedDate(date);
      applyAppointmentText("planned", date);
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    // Zurückblättern nur erlauben, wenn wir nicht in der Vergangenheit landen
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
         setCurrentMonth(prev);
    }
  };

  // --- TEXT GENERATOREN ---
  const applyAppointmentText = (type: "urgent" | "planned", date?: Date) => {
    let text = "";
    if (type === "urgent") {
      text = "DRINGEND: Ich benötige so schnell wie möglich Unterstützung (ggf. noch heute).\nBitte rufen Sie mich umgehend zurück.\n\nGrund:";
    } else if (date) {
      const dateStr = date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      text = `Guten Tag,\n\nich möchte gerne einen Termin vereinbaren.\n\nWunschtermin: ${dateStr}\n\nBevorzugte Uhrzeit:`;
    }
    setMessageText(text);
    setActiveModal("none");
    setTimeout(() => {
        document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const applyInvoiceText = (type: "invoice" | "supplies") => {
    const text = type === "invoice"
      ? `Guten Tag,\n\nich habe eine Frage zur Rechnung${invoiceNr ? ` Nr. ${invoiceNr}` : ""}.\n\nEs geht um:`
      : "Guten Tag,\n\nich habe eine Frage zur Abrechnung von Pflegehilfsmitteln (z.B. Pauschale).\n\nDetails:";
    setMessageText(text);
    setActiveModal("none");
    setTimeout(() => {
        document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const topics = [
    { id: "Pflegeberatung", label: "Pflegeberatung", icon: Heart },
    { id: "Terminanfrage", label: "Termin vereinbaren", icon: Calendar },
    { id: "Verwaltung", label: "Rechnung / Büro", icon: FileText },
    { id: "Sonstiges", label: "Allgemeine Frage", icon: HelpCircle },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
      
        {/* HEADER */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 text-center px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <MessageSquare className="w-3 h-3 text-[var(--color-accent)]" />
              <span>Kontakt & Hilfe</span>
            </div>
           <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Wir sind <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] relative inline-block">
                für Sie da.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Ob Pflegegrad, Erstgespräch oder einfach nur eine Frage: <br className="hidden md:block"/>
              Wir nehmen uns Zeit für Ihr Anliegen.
            </p>
          </div>
        </section>

        {/* GRID AREA */}
        <div className="container pb-24 px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LINKS: Kontakt Infos */}
            <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              
              {/* Phone */}
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-[var(--color-border-soft)] hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all group cursor-pointer relative overflow-hidden">
                 <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[var(--color-secondary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900 mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">Rufen Sie uns an</p>
                    <p className="text-lg text-slate-600 font-medium transition-colors">{siteConfig.contact.phone}</p>
                 </div>
              </a>
              
              {/* Mail */}
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-[var(--color-border-soft)] hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all group cursor-pointer relative overflow-hidden">
                 <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div className="overflow-hidden">
                    <p className="font-bold text-slate-900 mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">Schreiben Sie uns</p>
                    <p className="text-lg text-slate-600 font-medium transition-colors truncate">{siteConfig.contact.email}</p>
                 </div>
              </a>

              {/* WhatsApp Card */}
              <a href="#" className="flex items-center gap-5 p-6 rounded-[2rem] bg-green-50/50 border border-green-100 hover:border-green-300 hover:bg-green-50 hover:shadow-lg hover:shadow-green-100 transition-all group cursor-pointer relative overflow-hidden">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-bold text-green-900 mb-0.5 group-hover:text-green-700 transition-colors">WhatsApp Chat</p>
                    <p className="text-sm text-green-700">Antwort in wenigen Minuten</p>
                 </div>
                 <ArrowRight className="ml-auto w-5 h-5 text-green-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </a>

              {/* Maps */}
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-border-soft)] p-3 overflow-hidden group relative shadow-lg">
                 <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block h-48 w-full rounded-[2rem] bg-slate-100 relative overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer">
                     <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px', opacity: 0.6 }}></div>
                     <div className="absolute inset-0 flex items-center justify-center z-10">
                         <div className="bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm text-slate-700 font-bold text-sm group-hover:scale-105 transition-transform border border-slate-100 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/20">
                            <MapPin className="w-4 h-4 text-[var(--color-primary)] group-hover:text-[var(--color-accent)]" /> Karte öffnen
                         </div>
                     </div>
                 </a>
                 <div className="p-5">
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{siteConfig.contact.address}</h4>
                    <p className="text-sm text-slate-500 mb-5 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]"/> Kostenlose Parkplätze im Hof.</p>
                    <Button asChild variant="outline" className="w-full justify-between bg-white hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] border-slate-200 text-slate-700 cursor-pointer rounded-xl h-12 transition-all group/btn">
                       <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                          Route planen <Navigation className="w-4 h-4 text-[var(--color-primary)] group-hover/btn:text-white" />
                       </a>
                    </Button>
                 </div>
              </div>
              
              {/* Notruf Mini */}
              <div className="p-6 rounded-[2rem] bg-[var(--color-footer-bg)] text-white flex items-center gap-5 shadow-xl shadow-black/5 relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full blur-xl"></div>
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse shrink-0 border border-white/10">
                    <Clock className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">24h Notruf für Patienten</div>
                    <div className="text-xl font-bold tracking-wide">089 / 123 456 99</div>
                 </div>
              </div>

            </div>

            {/* RECHTS: Das Formular */}
            <div id="anfrage-formular" className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-[var(--color-border-soft)] relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 scroll-mt-32">
              <Sparkles className="absolute top-10 right-10 w-6 h-6 text-[var(--color-accent)] animate-pulse" />

              {state.succeeded ? (
                <div className="text-center py-20 h-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"><CheckCircle2 className="w-12 h-12" /></div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Nachricht gesendet!</h3>
                  <Button variant="outline" onClick={() => window.location.reload()} className="rounded-2xl h-12 px-8 cursor-pointer">Zurück</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                     <h3 className="text-3xl font-bold text-slate-900 mb-2">Schreiben Sie uns</h3>
                     <p className="text-slate-500">Worum geht es bei Ihrer Anfrage?</p>
                  </div>

                  {/* TOPIC BUTTONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {topics.map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => handleTopicClick(topic.id)}
                          className={`group relative flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer
                            ${subject === topic.id 
                               ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)] text-[var(--color-primary)] shadow-md scale-[1.02]' 
                               : 'bg-white border-slate-100 text-slate-600 hover:border-[var(--color-primary)]/30 hover:bg-slate-50'}`}
                        >
                           <topic.icon className={`w-5 h-5 transition-colors duration-300 ${subject === topic.id ? 'text-[var(--color-accent)]' : 'text-slate-400 group-hover:text-[var(--color-accent)]'}`} />
                           <span className="font-bold text-sm">{topic.label}</span>
                           {subject === topic.id && <CheckCircle2 className="absolute right-4 w-5 h-5 text-[var(--color-primary)]" />}
                        </button>
                     ))}
                  </div>
                  <input type="hidden" name="_subject" value={`Neue Anfrage: ${subject}`} />

                  {/* INPUTS */}
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Vorname</label>
                        <input name="vorname" type="text" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all font-medium text-slate-900" placeholder="Max" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nachname</label>
                        <input name="nachname" type="text" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all font-medium text-slate-900" placeholder="Mustermann" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">E-Mail</label>
                        <input name="email" type="email" required className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all font-medium text-slate-900" placeholder="ihre@email.de" />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Telefon</label>
                        <input name="phone" type="tel" className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all font-medium text-slate-900" placeholder="Für Rückrufe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Ihre Nachricht</label>
                      <textarea 
                        name="message" 
                        rows={6} 
                        required 
                        className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all resize-none font-medium text-slate-900 placeholder:text-slate-400 leading-relaxed" 
                        value={messageText} 
                        onChange={(e) => setMessageText(e.target.value)} 
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={state.submitting} className="cursor-pointer w-full h-16 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 font-bold transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/30">
                      {state.submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <span className="flex items-center gap-2">Anfrage absenden <ArrowRight className="w-5 h-5" /></span>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODALS (POPUPS)                                           */}
      {/* ========================================================= */}
      
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <button onClick={() => setActiveModal("none")} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>

            {/* --- MODAL: APPOINTMENT (DATE PICKER) --- */}
            {activeModal === "appointment" && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-[var(--color-primary)] mb-2">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Wann passt es Ihnen?</h3>
                
                {/* 1. NOTFALL OPTION */}
                <button onClick={() => applyAppointmentText("urgent")} className="w-full p-4 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 text-left flex items-center gap-3 group transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500"><AlertTriangle className="w-5 h-5" /></div>
                  <div>
                    <span className="block font-bold text-red-900">Notfall / Heute</span>
                    <span className="text-xs text-red-700/70">Schnellstmöglich</span>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-red-300 group-hover:text-red-500" />
                </button>

                <div className="relative flex py-2 items-center">
                   <div className="flex-grow border-t border-slate-100"></div>
                   <span className="flex-shrink-0 mx-4 text-slate-300 text-xs font-bold uppercase">Oder Wunschtermin</span>
                   <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* 2. MINI KALENDER */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                   <div className="flex items-center justify-between mb-4">
                      <button onClick={prevMonth} className="p-1 hover:bg-white rounded-full cursor-pointer"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                      <span className="font-bold text-slate-700">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                      <button onClick={nextMonth} className="p-1 hover:bg-white rounded-full cursor-pointer"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
                   </div>
                   <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => <span key={d} className="text-xs font-bold text-slate-300 uppercase">{d}</span>)}
                   </div>
                   <div className="grid grid-cols-7 gap-1">
                      {/* Leere Zellen */}
                      {Array.from({ length: getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                      
                      {/* Tage */}
                      {Array.from({ length: getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => {
                         const day = i + 1;
                         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                         date.setHours(0,0,0,0); // Wichtig für Vergleich

                         const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                         // Check auf Feiertage & Wochenende & Mindestdatum
                         const isTooEarly = date < minDate;
                         const isHolidayDate = isHoliday(date);
                         
                         const disabled = isWeekend || isTooEarly || isHolidayDate;

                         return (
                            <button 
                               key={day} 
                               disabled={disabled}
                               onClick={() => handleDateClick(day)}
                               className={`
                                  h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                  ${disabled 
                                     ? 'text-slate-300 cursor-not-allowed bg-transparent' 
                                     : 'text-slate-700 hover:bg-[var(--color-primary)] hover:text-white cursor-pointer bg-white border border-slate-100 shadow-sm'}
                                  ${selectedDate?.getTime() === date.getTime() ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]' : ''}
                               `}
                               title={isHolidayDate ? "Feiertag / Betriebsruhe" : ""}
                            >
                               {day}
                            </button>
                         )
                      })}
                   </div>
                </div>
              </div>
            )}

            {/* --- MODAL: INVOICE --- */}
            {activeModal === "invoice" && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-[var(--color-primary)] mb-2">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Verwaltung & Rechnung</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Rechnungsnummer (Optional)</label>
                    <input 
                      type="text" 
                      value={invoiceNr}
                      onChange={(e) => setInvoiceNr(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                      placeholder="z.B. RE-2024-..." 
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <button onClick={() => applyInvoiceText("invoice")} className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold shadow-md shadow-[var(--color-primary)]/20 cursor-pointer">
                      Frage zur Rechnung stellen
                    </button>
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-slate-100"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-300 text-xs font-bold uppercase">Oder</span>
                      <div className="flex-grow border-t border-slate-100"></div>
                    </div>
                    <button onClick={() => applyInvoiceText("supplies")} className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] font-bold bg-white cursor-pointer">
                      Pflegehilfsmittel / Anschaffung
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* DER UNSICHTBARE HELFER:
         CareConfigurator ist hier eingebunden, aber im "minimal" Modus (kein Teaser).
         Er lauscht auf den URL Parameter ?openConfigurator=true und öffnet dann das Modal.
      */}
      <CareConfigurator minimal={true} />
    </div>
  );
}