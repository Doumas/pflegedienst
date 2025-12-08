"use client";

import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { Heart, Award, MapPin, Users, Clock, Star, Quote, Sparkles, ArrowRight, CheckCircle2, UserX, UserCheck, ShieldCheck, Stethoscope, Phone, FileHeart } from "lucide-react";
import Link from "next/link";

// Named Export (Passt zu deinem Import { AboutTemplate })
export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20">
      
      {/* ========================================================= */}
      {/* 1. HEADER: Emotional & Hochwertig (Aurora + Noise)        */}
      {/* ========================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[var(--color-secondary)] border-b border-[var(--color-border-soft)] overflow-hidden">
        
        {/* A. Technisches Gitter */}
        <div className="absolute inset-0 opacity-[0.5] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* B. Noise Textur */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('/noise.png')]"></div>
        {/* C. Aurora Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none" />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Heart className="w-3 h-3 text-[var(--color-accent)] fill-current" />
            <span>Über uns</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Pflege bedeutet <br/>
            <span className="relative inline-block ml-3 text-[var(--color-primary)]">
              Vertrauen.
              {/* Die Welle */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Wir möchten Ihnen nicht nur helfen, sondern Ihnen die Sorge nehmen. 
            Lernen Sie hier die Menschen kennen, denen Sie Ihre Liebsten anvertrauen.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. DAS KONZEPT: Bezugspflege (Vergleichs-Grid)            */}
      {/* ========================================================= */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="container px-4 md:px-6 relative z-10">
          
          <div className="max-w-3xl mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Das Prinzip <span className="text-[var(--color-primary)]">Bezugspflege.</span>
             </h2>
             <p className="text-lg text-slate-600 leading-relaxed font-medium">
                In vielen Pflegediensten gleicht der Alltag einem Bahnhof: Jeden Tag ein anderes Gesicht. 
                Das verunsichert Patienten und führt zu Informationsverlusten. Wir machen das anders.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
             
             {/* Die "Andere" Seite (Grau) */}
             <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                      <UserX className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-700">Klassische Pflege</h3>
                </div>
                <ul className="space-y-4">
                   <li className="flex gap-3 text-slate-500 font-medium">
                      <span className="text-red-400 font-bold">✕</span> Ständig wechselndes Personal
                   </li>
                   <li className="flex gap-3 text-slate-500 font-medium">
                      <span className="text-red-400 font-bold">✕</span> Anonyme Abwicklung
                   </li>
                   <li className="flex gap-3 text-slate-500 font-medium">
                      <span className="text-red-400 font-bold">✕</span> Hektik und Zeitdruck
                   </li>
                </ul>
             </div>

             {/* Unsere Seite (Teal / Highlight) */}
             <div className="bg-[var(--color-secondary)] rounded-[2.5rem] p-8 md:p-10 border border-[var(--color-border-soft)] shadow-xl shadow-[var(--color-primary)]/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-bl-[80px]" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                   <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30">
                      <UserCheck className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900">Herz & Hand Prinzip</h3>
                </div>
                <ul className="space-y-4 relative z-10">
                   <li className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                      <span className="font-bold text-slate-800">Feste, kleine Teams (max. 3 Personen)</span>
                   </li>
                   <li className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                      <span className="font-bold text-slate-800">Persönliche Beziehung & Vertrauen</span>
                   </li>
                   <li className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" /> 
                      <span className="font-bold text-slate-800">Realistische Zeitplanung für Gespräche</span>
                   </li>
                </ul>
             </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. GESICHTER DES VERTRAUENS (Team Grid)                   */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Gesichter des Vertrauens</h2>
            <p className="text-slate-600 text-lg">
              Hinter professioneller Pflege steht immer ein starkes Team. 
              Wir setzen auf qualifizierte Fachkräfte, die ihren Beruf lieben.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* CARD 1: PDL */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary)]/5 transition-all duration-300 border border-slate-100 text-center hover:-translate-y-1">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                {/* Placeholder Image */}
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Users className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Anna Müller</h3>
              <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Pflegedienstleitung</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                "Qualität bedeutet für mich, dass wir uns jeden Tag fragen: Ist das gut genug für meine eigene Familie?"
              </p>
            </div>

            {/* CARD 2: Stellv. (Hervorgehoben) */}
            <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-[var(--color-primary)]/10 transition-all duration-300 border border-[var(--color-primary)]/10 text-center relative md:-top-6 z-10">
               <div className="absolute top-4 right-4 text-[var(--color-accent)]">
                  <Award className="w-6 h-6" />
               </div>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Users className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Thomas Weber</h3>
              <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Stellv. PDL & Wundexperte</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                "Moderne Wundversorgung und Empathie schließen sich nicht aus – sie gehören zusammen."
              </p>
            </div>

             {/* CARD 3: Verwaltung */}
             <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary)]/5 transition-all duration-300 border border-slate-100 text-center hover:-translate-y-1">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--color-secondary)] group-hover:border-[var(--color-primary)] transition-colors">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Users className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Sarah Klein</h3>
              <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wide mb-4">Verwaltung & Beratung</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                "Ich kümmere mich um den Papierkram mit der Kasse, damit Sie den Kopf für Wichtigeres frei haben."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. QUALITÄT & WERTE (Dark Mode - Feature Cards)           */}
      {/* ========================================================= */}
      <section className="py-24 lg:py-32 bg-[var(--color-footer-bg)] text-white relative overflow-hidden">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             
             {/* Linke Seite: Bild (Mit gedrehten Rahmen - Startseiten Look) */}
             <div className="relative group">
                <div className="absolute inset-0 border-2 border-[var(--color-accent)]/20 rounded-[2.5rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-black/20">
                   <Image 
                     src="/images/team/team.jpg" 
                     alt="Unser Führungsteam" 
                     fill 
                     className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-footer-bg)] via-transparent to-transparent opacity-90" />
                   <div className="absolute bottom-8 left-8 right-8">
                      <div className="text-xl font-bold text-white mb-1">Geprüfte Qualität</div>
                      <p className="text-white/70 text-sm">Unser Team besteht zu 100% aus festangestellten Fachkräften.</p>
                   </div>
                </div>
             </div>

             {/* Rechte Seite: Fakten & MDK */}
             <div className="space-y-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[var(--color-accent)] text-xs font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
                      <Award className="w-3 h-3" />
                      MDK Note 1.0
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Kein Zufall, sondern Standard.</h2>
                   <div className="prose prose-invert text-white/80 leading-relaxed text-lg">
                      <p>
                         Einmal jährlich prüft der Medizinische Dienst (MDK) unangemeldet. 
                         Die Bestnote ist für uns Ansporn, jeden Tag unser Bestes zu geben. Wir legen Wert auf:
                      </p>
                   </div>
                </div>

                <div className="grid gap-4">
                   {[
                      { title: "Medizinische Genauigkeit", desc: "Korrekte Wundversorgung & Medikamentengabe.", icon: Stethoscope },
                      { title: "Verlässliche Organisation", desc: "Erreichbarkeit & transparente Abrechnung.", icon: Clock },
                      { title: "Menschliche Wärme", desc: "Wie wohl fühlen sich die Menschen bei uns?", icon: Heart },
                   ].map((fact, i) => (
                      <div key={i} className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                         <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform">
                            <fact.icon className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="font-bold text-white text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">{fact.title}</div>
                            <div className="text-base text-white/60">{fact.desc}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CTA / VERFÜGBARKEIT (Große Abschluss-Karte)            */}
      {/* ========================================================= */}
       {/* --- 4. EINZUGSGEBIET (Clean Grid) --- */}
      <section className="py-24 bg-white relative">
        <div className="container text-center px-4 md:px-6">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-secondary)] rounded-full text-[var(--color-primary)] mb-6 border border-[var(--color-primary)]/10 animate-in zoom-in duration-500">
             <MapPin className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">In München für Sie unterwegs</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Wir versorgen Patienten im gesamten Stadtgebiet und angrenzendem Umland.
          </p>
          {/* Stylized Map List */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
            {["München Zentrum", "Schwabing", "Bogenhausen", "Haidhausen", "Sendling", "Giesing", "Au", "Lehel", "Nymphenburg", "Neuhausen", "Glockenbach", "Thalkirchen"].map((ort, i) => (
              <div key={i} className="group relative">
                <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-full text-slate-600 font-bold border border-slate-100 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all cursor-default shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:-translate-y-1">
                  <MapPin className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-accent)] transition-colors" />
                  {ort}
                </div>
              </div>
            ))}
            <div className="px-6 py-3 text-slate-400 font-medium italic">
              ... und in Ihrer Nähe.
            </div>
          </div>
          
          {/* CTA Box (Glassy Mint) */}
          <div className="bg-[var(--color-secondary)] rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto border border-[var(--color-border-soft)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
             {/* Deko Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />
             
             <div className="text-left relative z-10">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Liegt Ihre Adresse im Gebiet?</h3>
                <p className="text-slate-600 font-medium">Wir prüfen das gerne unverbindlich für Sie.</p>
             </div>
             
             <Link href="/kontakt" className="relative z-10">
              <Button size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl px-10 h-14 shadow-xl shadow-[var(--color-primary)]/20 hover:-translate-y-1 transition-all font-bold text-lg">
                Jetzt prüfen <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}