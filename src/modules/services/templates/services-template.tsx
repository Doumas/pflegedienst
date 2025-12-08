import Link from "next/link";
import { servicesData } from "../data/services"; // Stelle sicher, dass der Pfad stimmt
import { ArrowRight, Check, Sparkles, Activity } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function ServicesTemplate() {
  return (
    <div className="relative min-h-screen bg-white font-sans overflow-hidden">

      {/* --- BACKGROUND FX (Light Mode Version) --- */}
      {/* 1. Statisches Raster (Subtil) */}
      <div className="absolute inset-0 opacity-[0.3]" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* 2. Bewegliche Blobs (Primary & Accent) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/60 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />


      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10">

        {/* --- HEADER --- */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 text-center px-4">
          <div className="container max-w-4xl mx-auto">
            
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-soft text-primary text-xs font-bold tracking-wide uppercase shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Unser Versprechen</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Gut versorgt <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
                in jedem Alter.
                {/* Deko Linie */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Von der medizinischen Behandlungspflege bis zur liebevollen Alltagshilfe. 
              Wir sind da, wo Sie sich am wohlsten fühlen: Zuhause.
            </p>
          </div>
        </section>

        {/* --- GRID BEREICH --- */}
        <section className="pb-32 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {servicesData.map((service, i) => (
              <Link key={i} href={service.href} className="group block h-full animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                
                {/* CARD CONTAINER */}
                <div className="h-full flex flex-col bg-white rounded-[2rem] border border-border-soft/60 p-8 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  
                  {/* Hover Gradient Background (Subtil) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* HEADER: Icon & Title */}
                  <div className="relative z-10 mb-6">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary border border-border-soft text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <service.icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Kleiner Trenner */}
                    <div className="w-12 h-1 bg-secondary rounded-full group-hover:w-20 group-hover:bg-accent transition-all duration-300" />
                  </div>
                  
                  {/* CONTENT */}
                  <p className="relative z-10 text-slate-600 mb-8 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* FEATURES LIST (Kompakt & Modern) */}
                  <div className="relative z-10 space-y-3 bg-slate-50/50 rounded-xl p-4 border border-slate-100 group-hover:bg-white/60 group-hover:border-primary/10 transition-colors">
                    {service.features.slice(0, 3).map((f, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="mt-0.5 min-w-[16px] flex justify-center">
                           <Check className="w-4 h-4 text-accent stroke-[3]" />
                        </div>
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA ARROW (Unten Rechts) */}
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>

                </div>
              </Link>
            ))}

            {/* CTA CARD (Am Ende, falls du eine ungerade Zahl hast oder als Abschluss) */}
            <div className="flex flex-col justify-center items-center text-center p-8 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-secondary/30 hover:border-primary/20 transition-all duration-300">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm text-slate-400">
                  <Activity className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Individuelle Beratung?</h3>
               <p className="text-slate-500 text-sm mb-6 max-w-xs">
                 Nicht sicher, welche Leistung passt? Wir beraten Sie kostenlos vor Ort.
               </p>
               <Link href="/kontakt">
                 <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full">
                   Kontakt aufnehmen
                 </Button>
               </Link>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}