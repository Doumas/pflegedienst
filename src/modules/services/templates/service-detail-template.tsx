import { notFound } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { CheckCircle, Phone, ChevronRight, Home, ArrowRight, Calendar, MessageCircle, FileHeart, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-white font-sans pb-20 selection:bg-primary/20">
      
      {/* --- HEADER: Clean & Editorial --- */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary border-b border-border-soft overflow-hidden">
        
        {/* Background FX: Subtile Linien in Border-Soft */}
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Weicher Glow oben rechts */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-80 pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <Link href="/leistungen" className="hover:text-primary transition-colors">Leistungen</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-primary">{service.title}</span>
            </div>
            
            {/* Icon Box: Weiß mit Primary Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 text-primary mb-8 border border-white ring-1 ring-border-soft animate-in zoom-in-50 duration-500 delay-100">
              <service.icon className="w-10 h-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {service.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT LAYOUT --- */}
      <div className="container px-4 md:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LINK: Hauptinhalt (8 Spalten) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1. Detail Beschreibung */}
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">Worum geht es bei dieser Leistung?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.details || "Wir bieten Ihnen eine umfassende und professionelle Versorgung in diesem Bereich. Unser Ziel ist es, Ihre Selbstständigkeit zu fördern und Ihnen Sicherheit im Alltag zu geben."}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-4">
                Unsere Pflegekräfte sind speziell geschult, um auf Ihre individuellen Bedürfnisse einzugehen. Dabei steht nicht nur die fachliche Kompetenz im Vordergrund, sondern auch das menschliche Miteinander.
              </p>
            </div>
            
            {/* 2. Feature Grid */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Das ist konkret enthalten:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-transparent hover:border-border-soft hover:bg-secondary/60 transition-colors duration-300 group">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-white border border-border-soft flex items-center justify-center shrink-0 shadow-sm text-primary group-hover:scale-110 transition-transform">
                       <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. PROZESS: JETZT IN DEINEM BRANDING (Kein Schwarz mehr!) */}
            {/* Nutzt 'bg-footer-bg' (Dunkles Teal) für den "Dark Mode" Look, aber passend zur Marke */}
            <div className="bg-footer-bg text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-primary-deep/20">
               
               {/* Deko: Accent Glow im Hintergrund */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
               
               <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-accent text-xs font-bold uppercase tracking-wide mb-6">
                    <Sparkles className="w-3 h-3" />
                    Der Ablauf
                  </div>
                  <h3 className="text-2xl font-bold mb-10 text-white">Ihr Weg zur Versorgung</h3>
                  
                  <div className="grid sm:grid-cols-3 gap-8 md:gap-4 relative">
                    
                    {/* Step 1 */}
                    <div className="relative group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-accent group-hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-text-light/50 mb-1">Schritt 1</div>
                      <div className="font-bold text-lg mb-2 text-white">Erstgespräch</div>
                      <p className="text-sm text-text-light/70 leading-relaxed">Wir lernen uns kennen und besprechen Ihren konkreten Bedarf.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-accent group-hover:bg-white/10 transition-colors">
                        <FileHeart className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-text-light/50 mb-1">Schritt 2</div>
                      <div className="font-bold text-lg mb-2 text-white">Pflegeplanung</div>
                      <p className="text-sm text-text-light/70 leading-relaxed">Wir erstellen den Plan und klären die Kostenübernahme.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                      {/* Highlight Style für den Start */}
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30 text-white group-hover:scale-110 transition-transform">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Schritt 3</div>
                      <div className="font-bold text-lg mb-2 text-white">Pflegestart</div>
                      <p className="text-sm text-text-light/70 leading-relaxed">Unsere festen Bezugspersonen kommen zu Ihnen.</p>
                    </div>

                  </div>
               </div>
            </div>

            {/* 4. CTA Box (Primary Design) */}
            <div className="bg-primary p-8 rounded-[2rem] border border-white/10 shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden group">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-primary shrink-0 relative z-10">
                <Phone className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-white text-2xl mb-1">Persönliche Beratung?</h3>
                <p className="text-primary-foreground/90">Rufen Sie uns an oder schreiben Sie uns. Wir sind für Sie da.</p>
              </div>
              <Link href="/kontakt" className="md:ml-auto relative z-10 w-full md:w-auto">
                <Button className="w-full md:w-auto bg-white text-primary hover:bg-secondary hover:text-primary-deep rounded-xl px-8 h-12 font-bold shadow-sm transition-all border border-transparent hover:border-border-soft">
                  Termin vereinbaren
                </Button>
              </Link>
            </div>

          </div>

          {/* RECHTS: Sidebar - STICKY */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            
            {/* Widget 1: Navigation */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
              <div className="bg-secondary/50 p-4 rounded-xl mb-2 flex items-center gap-2 border border-border-soft/50">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wide text-primary">Leistungsübersicht</span>
              </div>
              <nav className="flex flex-col gap-1 p-1">
                {servicesData.map((s) => (
                  <Link 
                    key={s.href} 
                    href={s.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                      s.href === service.href 
                        ? "bg-primary text-white font-bold shadow-md shadow-primary/20" 
                        : "text-slate-600 hover:bg-secondary hover:text-primary"
                    }`}
                  >
                    <span className="text-sm">{s.title}</span>
                    {s.href === service.href ? (
                       <ArrowRight className="w-4 h-4" />
                    ) : (
                       <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Widget 2: Quick Contact */}
            <div className="bg-gradient-to-br from-secondary to-white p-6 rounded-2xl border border-border-soft">
               <h4 className="font-bold text-slate-900 mb-4">Haben Sie Fragen?</h4>
               <p className="text-sm text-slate-600 mb-6">Wir helfen Ihnen gerne weiter bei der Beantragung und Planung.</p>
               <a href="/kontakt" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                 <MessageCircle className="w-4 h-4" /> Nachricht senden
               </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}