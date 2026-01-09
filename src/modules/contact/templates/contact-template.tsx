"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, 
  MessageSquare, Loader2, Sparkles, Navigation, HelpCircle, 
  Calendar, FileText, Heart, X, AlertTriangle, ChevronLeft, ChevronRight, Activity
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";
import { CareConfigurator } from "@/modules/home/templates/care-configurator";
import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";

type ModalType = "none" | "appointment" | "invoice";

export function ContactTemplate() {
  const [state, handleSubmit] = useForm("mqavzykn");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [subject, setSubject] = useState("Sonstiges");
  const [messageText, setMessageText] = useState("Guten Tag,\n\nich habe eine allgemeine Frage zu...");
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [invoiceNr, setInvoiceNr] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;

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

  const isHoliday = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateString = `${day}.${month}`;
    const year = date.getFullYear();
    const fixedHolidays = ["01.01", "01.05", "03.10", "24.12", "25.12", "26.12", "31.12"];
    const moving2026 = ["03.04", "06.04", "14.05", "25.05", "04.06"];
    if (fixedHolidays.includes(dateString)) return true;
    if (year === 2026 && moving2026.includes(dateString)) return true;
    return false;
  };

  const getMinSelectableDate = () => {
    let count = 0;
    let d = new Date();
    while (count < 3) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6 && !isHoliday(d)) count++;
    }
    d.setHours(0,0,0,0);
    return d;
  };

  const minDate = getMinSelectableDate();
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    if (date >= minDate && dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(date)) {
      setSelectedDate(date);
      applyAppointmentText("planned", date);
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) setCurrentMonth(prev);
  };

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
    setTimeout(() => { document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
  };

  const applyInvoiceText = (type: "invoice" | "supplies") => {
    const text = type === "invoice"
      ? `Guten Tag,\n\nich habe eine Frage zur Rechnung${invoiceNr ? ` Nr. ${invoiceNr}` : ""}.\n\nEs geht um:`
      : "Guten Tag,\n\nich habe eine Frage zur Abrechnung von Pflegehilfsmitteln (z.B. Pauschale).\n\nDetails:";
    setMessageText(text);
    setActiveModal("none");
    setTimeout(() => { document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
  };

  const topics = [
    { id: "Pflegeberatung", label: "Pflegeberatung", icon: Heart },
    { id: "Terminanfrage", label: "Termin vereinbaren", icon: Calendar },
    { id: "Verwaltung", label: "Rechnung / Büro", icon: FileText },
    { id: "Sonstiges", label: "Allgemeine Frage", icon: HelpCircle },
  ];

  return (
    <div className="relative min-h-screen bg-[#fffbf7] font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden text-slate-900">
      
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
      
        {/* HEADER: ZENTRIERT AUF MOBILE / LINKS AUF DESKTOP */}
        <section className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-4">
          <div className="container mx-auto">
             <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <MessageSquare className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        </motion.div>
                        <span>Kontakt & Beratung</span>
                    </div>
                </FadeIn>
               <FadeIn delay={0.2}>
                   <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.05]">
                    Wir sind <br/>
                    <span className="relative inline-block px-2 mt-2">
                        <span className="relative z-10 font-script text-[var(--color-accent)] font-bold tracking-normal">
                            für Sie da.
                        </span>
                        <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                    </h1>
               </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium text-pretty">
                    Ob Pflegegrad, Erstgespräch oder einfach nur eine Frage: Wir nehmen uns persönlich Zeit für Ihr Anliegen.
                    </p>
                </FadeIn>
             </div>
          </div>
        </section>

        {/* GRID AREA */}
        <div className="container pb-24 px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LINKS: Kontakt Infos */}
            <div className="lg:col-span-5 space-y-6">
              
              <FadeIn delay={0.4} direction="right">
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-300 group transform-gpu">
                    <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Anrufen</p>
                        <p className="text-xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">{siteConfig.contact.phone}</p>
                    </div>
                </a>
              </FadeIn>
              
              <FadeIn delay={0.5} direction="right">
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-300 group transform-gpu">
                    <div className="w-14 h-14 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <p className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">E-Mail</p>
                        <p className="text-lg font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors truncate">{siteConfig.contact.email}</p>
                    </div>
                </a>
              </FadeIn>

              {/* Maps Card */}
              <FadeIn delay={0.7} direction="right">
                <div className="rounded-[2.5rem] bg-white border border-slate-100 p-4 shadow-xl transform-gpu group">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block h-48 w-full rounded-[2rem] bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg text-slate-900 font-bold transition-transform group-hover:scale-105 border border-slate-100">
                                <MapPin className="w-4 h-4 text-[var(--color-accent)]" /> Karte öffnen
                            </div>
                        </div>
                    </a>
                    <div className="p-6 text-left">
                        <h4 className="font-black text-slate-900 text-xl mb-2">{siteConfig.contact.address}</h4>
                        <p className="text-sm text-slate-500 mb-6 flex items-center gap-2 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]"/> Kostenlose Parkplätze vor Ort.
                        </p>
                        <Button asChild className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-xl h-14 font-black transition-all shadow-sm">
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                Route planen <Navigation className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                    </div>
                </div>
              </FadeIn>
              
              {/* Notruf Patient */}
              <FadeIn delay={0.8} direction="right">
                <div className="p-8 rounded-[2.5rem] bg-[var(--color-footer-bg)] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-2xl" />
                    <div className="flex items-center gap-6 relative z-10 text-left">
                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center animate-pulse border border-white/20">
                            <Clock className="w-7 h-7 text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-widest mb-1">24h Rufbereitschaft</p>
                            <p className="text-2xl font-black tracking-tight">089 / 123 456 99</p>
                        </div>
                    </div>
                </div>
              </FadeIn>

            </div>

            {/* RECHTS: Das Formular */}
            <div id="anfrage-formular" className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative scroll-mt-32 transform-gpu">
              <Sparkles className="absolute top-12 right-12 w-6 h-6 text-[var(--color-accent)]/20 animate-pulse" />

              {state.succeeded ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight text-center">Nachricht gesendet!</h3>
                  <p className="text-slate-500 mb-8 font-medium text-center">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                  <Button variant="outline" onClick={() => window.location.reload()} className="rounded-2xl h-14 px-10 font-bold border-2 border-[var(--color-primary)] text-[var(--color-primary)]">Zurück</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 text-left">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Nachricht senden</h3>
                    <p className="text-slate-500 font-medium">Was können wir für Sie tun?</p>
                  </div>

                  {/* TOPICS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {topics.map((topic) => (
                        <button
                            key={topic.id}
                            type="button"
                            onClick={() => handleTopicClick(topic.id)}
                            className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300",
                                subject === topic.id 
                                    ? "bg-[var(--color-primary)] border-transparent text-white shadow-xl shadow-[var(--color-primary)]/20" 
                                    : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-[var(--color-primary)]/20"
                            )}
                        >
                            <topic.icon className={cn("w-5 h-5", subject === topic.id ? "text-white" : "text-[var(--color-primary)]")} />
                            <span className="font-bold text-sm">{topic.label}</span>
                        </button>
                     ))}
                  </div>
                  <input type="hidden" name="_subject" value={`Neue Anfrage: ${subject}`} />

                  {/* INPUTS */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Vorname</label>
                        <input name="vorname" type="text" required className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none transition-all font-black text-slate-900" placeholder="Max" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Nachname</label>
                        <input name="nachname" type="text" required className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none transition-all font-black text-slate-900" placeholder="Mustermann" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">E-Mail Adresse</label>
                        <input name="email" type="email" required className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none transition-all font-black text-slate-900" placeholder="ihre@email.de" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Telefonnummer</label>
                        <input name="phone" type="tel" className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none transition-all font-black text-slate-900" placeholder="Für Rückrufe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Ihre Nachricht</label>
                    <textarea 
                        name="message" 
                        rows={6} 
                        required 
                        className="w-full p-6 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 focus:border-[var(--color-primary)] outline-none transition-all resize-none font-black text-slate-900 leading-relaxed" 
                        value={messageText} 
                        onChange={(e) => setMessageText(e.target.value)} 
                    />
                  </div>

                  <Button type="submit" disabled={state.submitting} className="w-full h-16 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 font-black transition-all hover:-translate-y-1">
                      {state.submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <span className="flex items-center gap-3">Anfrage jetzt absenden <ArrowRight className="w-5 h-5" /></span>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 relative">
            <button onClick={() => setActiveModal("none")} className="absolute top-6 right-6 p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
                <X className="w-5 h-5" />
            </button>

            {/* APPOINTMENT MODAL */}
            {activeModal === "appointment" && (
              <div className="space-y-8">
                <div className="text-left">
                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Wann passt es?</h3>
                    <p className="text-slate-500 font-medium">Wir melden uns zur Bestätigung.</p>
                </div>
                
                <button onClick={() => applyAppointmentText("urgent")} className="w-full p-5 rounded-2xl border-2 border-red-50 bg-red-50/30 hover:bg-red-50 transition-all text-left flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500"><AlertTriangle className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <span className="block font-black text-red-900">Akuter Bedarf</span>
                    <span className="text-xs text-red-700/70 font-bold uppercase tracking-wider">Schnellstmöglich</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                   <div className="flex items-center justify-between mb-6">
                      <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                      <span className="font-black text-slate-900">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                      <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
                   </div>
                   <div className="grid grid-cols-7 gap-2">
                      {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => <span key={d} className="text-[10px] font-black text-slate-300 uppercase text-center mb-2">{d}</span>)}
                      {Array.from({ length: getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                      {Array.from({ length: getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => {
                         const day = i + 1;
                         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                         date.setHours(0,0,0,0);
                         const disabled = date.getDay() === 0 || date.getDay() === 6 || date < minDate || isHoliday(date);
                         return (
                            <button 
                               key={day} 
                               disabled={disabled}
                               onClick={() => handleDateClick(day)}
                               className={cn(
                                   "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                   disabled ? "text-slate-200" : "bg-white text-slate-900 hover:bg-[var(--color-accent)] hover:text-white shadow-sm",
                                   selectedDate?.getTime() === date.getTime() && "bg-[var(--color-primary)] text-white"
                               )}
                            >
                               {day}
                            </button>
                         )
                      })}
                   </div>
                </div>
              </div>
            )}

            {/* INVOICE MODAL */}
            {activeModal === "invoice" && (
              <div className="space-y-8 text-left">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Büro & Verwaltung</h3>
                    <p className="text-slate-500 font-medium">Fragen zu Kosten und Abrechnung.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Rechnungsnummer</label>
                    <input 
                      type="text" 
                      value={invoiceNr}
                      onChange={(e) => setInvoiceNr(e.target.value)}
                      className="w-full h-14 px-5 rounded-xl border border-slate-100 bg-slate-50 focus:border-[var(--color-accent)] outline-none font-black text-slate-900"
                      placeholder="z.B. RE-2024-..." 
                    />
                  </div>
                  
                  <div className="grid gap-3 pt-4">
                    <button onClick={() => applyInvoiceText("invoice")} className="w-full h-14 rounded-xl bg-[var(--color-primary)] text-white font-black hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 cursor-pointer">
                      Anliegen zur Rechnung
                    </button>
                    <button onClick={() => applyInvoiceText("supplies")} className="w-full h-14 rounded-xl border-2 border-slate-100 text-slate-700 font-black hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all cursor-pointer">
                      Hilfsmittel Abrechnung
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <CareConfigurator minimal={true} />
    </div>
  );
}