import Link from "next/link";
import { servicesData } from "../data/services";
import { ArrowRight, Check, HeartHandshake } from "lucide-react";

export function ServicesTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* --- HEADER: Der schöne Style ist zurück --- */}
      <section className="bg-secondary py-24 border-b border-border-soft">
        <div className="container text-center max-w-3xl">
          
          {/* Das Detail, das gefehlt hat: Icon + Uppercase Text */}
          <div className="inline-flex items-center gap-2 mb-6 opacity-70">
            <HeartHandshake className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Unser Angebot</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Gut versorgt <span className="text-primary">in jedem Alter.</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Unser Leistungsspektrum deckt alle Bereiche der häuslichen Pflege ab. 
            Von der medizinischen Versorgung bis zur Unterstützung im Haushalt – wir sind für Sie da.
          </p>
        </div>
      </section>

      {/* --- GRID BEREICH --- */}
      <section className="py-20 container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {servicesData.map((service, i) => (
            <Link key={i} href={service.href} className="group block h-full">
              <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>

                {/* Titel */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Features Preview */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  {service.features.slice(0, 2).map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-500">
                      <Check className="w-4 h-4 text-primary/60" /> {f}
                    </div>
                  ))}
                  <div className="text-xs text-primary font-medium pt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Details ansehen <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  );
}