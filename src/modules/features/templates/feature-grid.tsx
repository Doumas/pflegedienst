import { ShieldCheck, Heart, Clock, Award, UserCheck, Smile } from "lucide-react";

export function FeatureGrid() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-50 font-sans">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-wider text-sm uppercase block mb-3">Warum Herz & Hand?</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Qualität und Menschlichkeit <br/> schließen sich nicht aus.
          </h2>
          <p className="text-slate-600 text-xl leading-relaxed">
            Wir setzen hohe Standards, damit Sie sich sicher fühlen können. 
            Das garantieren wir mit unserem Namen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: ShieldCheck, 
              title: "Geprüfte Qualität", 
              text: "Wir arbeiten streng nach MDK-Richtlinien. Regelmäßige Fortbildungen sind für unser Team Pflicht, nicht Kür." 
            },
            { 
              icon: Heart, 
              title: "Herz & Verstand", 
              text: "Fachliches Können ist die Basis, aber Empathie ist der Schlüssel. Wir pflegen mit Herzblut." 
            },
            { 
              icon: Clock, 
              title: "24h Erreichbarkeit", 
              text: "Krankheit kennt keinen Feierabend. Im Notfall sind wir rund um die Uhr für unsere Patienten da." 
            }/*,
            {
              icon: UserCheck,
              title: "Feste Bezugspersonen",
              text: "Vertrauen braucht bekannte Gesichter. Wir vermeiden Personalwechsel, wo immer es geht."
            },
            {
              icon: Award,
              title: "Transparente Kosten",
              text: "Keine versteckten Gebühren. Wir erstellen einen klaren Kostenvoranschlag vor dem Start."
            },
            {
              icon: Smile,
              title: "Mehr Lebensfreude",
              text: "Wir helfen nicht nur medizinisch, sondern bringen auch ein Lächeln in Ihren Alltag."
            }*/
          ].map((item, i) => (
            // KARTEN: Slate-50 Hintergrund für Kontrast auf Weiß
            <div 
              key={i} 
              className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-border-soft hover:shadow-xl hover:shadow-text-light/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}