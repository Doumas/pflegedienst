import { notFound } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { CheckCircle, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import { servicesData } from "../data/services";

type ServiceType = {
  title: string;
  description: string;
  icon: any;
  features: string[];
  details?: string;
  href: string;
};

export function ServiceDetailTemplate({ service }: { service: ServiceType }) {
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* --- HEADER: Hell & Sauber (Kein Bild, kein Schwarz) --- */}
      <section className="bg-secondary py-20 border-b border-slate-100">
        <div className="container text-center max-w-4xl">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm text-primary mb-6 border border-slate-100">
            <service.icon className="w-8 h-8" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {service.title}
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* --- HAUPTBEREICH --- */}
      <div className="container py-16 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LINKS: Der Inhalt */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Beschreibung */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Über diese Leistung</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.details || service.description}
              </p>
            </div>
            
            <div className="h-px bg-slate-100 w-full" />

            {/* Features Grid */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Das ist enthalten:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-secondary p-8 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-primary shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Persönliche Beratung?</h3>
                <p className="text-slate-600">Wir erstellen Ihnen gerne ein individuelles Angebot.</p>
              </div>
              <Link href="/kontakt" className="sm:ml-auto">
                <Button className="bg-primary hover:bg-primary-hover text-white shadow-md rounded-full px-8 h-12">
                  Termin vereinbaren
                </Button>
              </Link>
            </div>

          </div>

          {/* RECHTS: Sidebar Navigation */}
          <div className="space-y-8">
            
            {/* Menü */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
              <div className="bg-primary text-white p-4 rounded-xl mb-2 text-center font-bold">
                Weitere Leistungen
              </div>
              <nav className="flex flex-col">
                {servicesData.map((s) => (
                  <Link 
                    key={s.href} 
                    href={s.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all mb-1 ${
                      s.href === service.href 
                        ? "bg-secondary text-primary font-bold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-sm">{s.title}</span>
                    {s.href !== service.href && <ChevronRight className="w-4 h-4 opacity-30" />}
                  </Link>
                ))}
              </nav>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}