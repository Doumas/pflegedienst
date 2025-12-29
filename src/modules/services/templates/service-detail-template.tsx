"use client";

import { notFound } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { 
  CheckCircle, 
  ChevronRight, 
  Home, 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  FileHeart, 
  Sparkles, 
  CalendarCheck // NEU: Statt Phone, passend zu "Termin"
} from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/modules/services/data/services"; 

export function ServiceDetailTemplate({ slug }: { slug: string }) {
  
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
      
      {/* ========================================================= */}
      {/* HINTERGRUND FX                                            */}
      {/* ========================================================= */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />


      <div className="relative z-10">

        {/* --- HEADER --- */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumb: Hover -> Orange (Interaktion) */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Link href="/" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <Link href="/leistungen" className="hover:text-[var(--color-accent)] transition-colors">Leistungen</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-[var(--color-primary)]">{service.title}</span>
            </div>
            
            {/* Icon Box: Info -> Blau */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 text-[var(--color-primary)] mb-8 border border-white ring-1 ring-[var(--color-border-soft)] animate-in zoom-in-50 duration-500 delay-100">
              <service.icon className="w-10 h-10" />
            </div>
            
           <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {service.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {service.description}
            </p>
          </div>
        </section>

        {/* --- CONTENT LAYOUT --- */}
        <div className="container px-4 md:px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LINKS: Hauptinhalt */}
            <div className="lg:col-span-8 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              
              <div className="prose prose-lg prose-slate max-w-none">
                          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
Worum geht es bei dieser Leistung?</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {service.details || "Wir bieten Ihnen eine umfassende und professionelle Versorgung in diesem Bereich. Unser Ziel ist es, Ihre Selbstständigkeit zu fördern und Ihnen Sicherheit im Alltag zu geben."}
                </p>
              </div>
              
              {/* Feature Grid: Info -> Blau + Rotation */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Das ist konkret enthalten:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-secondary)]/30 border border-transparent hover:border-[var(--color-primary)]/20 hover:bg-[var(--color-secondary)]/60 transition-colors duration-300 group">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-white border border-[var(--color-border-soft)] flex items-center justify-center shrink-0 shadow-sm text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                         <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ABLAUF: Info -> Konsistent Blau/Weiß */}
              <div className="bg-[var(--color-footer-bg)] text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-[var(--color-primary)]/20">
                 
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/20 rounded-full blur-[80px] pointer-events-none" />
                 
                 <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wide mb-8">
                      <Sparkles className="w-3 h-3" />
                      Der Ablauf
                    </div>
                    <h3 className="text-3xl font-black mb-12 text-white">Ihr Weg zur Versorgung</h3>
                    
                    <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 relative">
                      
                      {/* Step 1 */}
                      <div className="relative group">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 border border-white/10 text-[var(--color-primary)] group-hover:scale-105 transition-transform duration-300 shadow-lg">
                          <MessageCircle className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Schritt 1</div>
                        <div className="font-bold text-xl mb-2 text-white">Erstgespräch</div>
                        <p className="text-sm text-white/70 leading-relaxed">Wir lernen uns kennen und besprechen Ihren konkreten Bedarf.</p>
                      </div>

                      {/* Step 2 */}
                      <div className="relative group">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 border border-white/10 text-[var(--color-primary)] group-hover:scale-105 transition-transform duration-300 shadow-lg">
                          <FileHeart className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Schritt 2</div>
                        <div className="font-bold text-xl mb-2 text-white">Pflegeplanung</div>
                        <p className="text-sm text-white/70 leading-relaxed">Wir erstellen den Plan und klären die Kostenübernahme.</p>
                      </div>

                      {/* Step 3 */}
                      <div className="relative group">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 border border-white/10 text-[var(--color-primary)] group-hover:scale-105 transition-transform duration-300 shadow-lg">
                          <Calendar className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">Schritt 3</div>
                        <div className="font-bold text-xl mb-2 text-white">Pflegestart</div>
                        <p className="text-sm text-white/70 leading-relaxed">Unsere festen Bezugspersonen kommen zu Ihnen.</p>
                      </div>

                    </div>
                 </div>
              </div>

              {/* CTA BOX: Ganzer Block Klickbar -> Icon wird Orange */}
              <Link 
                href="/kontakt"
                className="group block bg-[var(--color-primary)] p-10 rounded-[2.5rem] border border-white/10 shadow-xl shadow-[var(--color-primary)]/20 relative overflow-hidden transition-transform hover:-translate-y-1"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative z-10">
                    
                    {/* ICON: CalendarCheck (Termin) statt Telefon */}
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-[var(--color-primary)] shrink-0 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                        <CalendarCheck className="w-9 h-9" />
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-black text-white text-3xl mb-2">Persönliche Beratung?</h3>
                        <p className="text-white/90 text-lg">Rufen Sie uns an oder schreiben Sie uns. Wir sind für Sie da.</p>
                    </div>

                    {/* Pfeil statt Button (Klarer Link-Charakter) */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-[var(--color-primary)] transition-all duration-300">
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>

                </div>
              </Link>

            </div>

            {/* RECHTS: Sidebar */}
            <div className="lg:col-span-4 space-y-8 sticky top-32 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
              
              {/* Widget 1: Navigation -> Hover: Orange */}
              <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-[var(--color-border-soft)] overflow-hidden">
                <div className="bg-[var(--color-secondary)]/50 p-5 rounded-3xl mb-2 flex items-center gap-3 border border-[var(--color-border-soft)]/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">Leistungsübersicht</span>
                </div>
                <nav className="flex flex-col gap-1 p-1">
                  {servicesData.map((s) => (
                    <Link 
                      key={s.slug} 
                      href={s.href}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all group ${
                        s.slug === slug 
                          ? "bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20" 
                          : "text-slate-600 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
                      }`}
                    >
                      <span className="text-sm">{s.title}</span>
                      {s.slug === slug ? (
                         <ArrowRight className="w-4 h-4" />
                      ) : (
                         <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Widget 2: Quick Contact -> Button Hover: Orange */}
              <div className="bg-gradient-to-br from-[var(--color-secondary)] to-white p-8 rounded-[2.5rem] border border-[var(--color-border-soft)] text-center">
                 <h4 className="font-bold text-slate-900 text-xl mb-4">Haben Sie Fragen?</h4>
                 <p className="text-slate-600 mb-8 leading-relaxed">Wir helfen Ihnen gerne weiter bei der Beantragung und Planung.</p>
                 <Link href="/kontakt">
                   {/* HIER GEÄNDERT: hover:bg-[var(--color-accent)] */}
                   <Button className="w-full h-12 bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white rounded-xl transition-all flex items-center justify-center gap-2">
                     <MessageCircle className="w-4 h-4" /> Nachricht senden
                   </Button>
                 </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}