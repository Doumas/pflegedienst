import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { Heart, Award, MapPin, Users, Clock, Star, Check } from "lucide-react";
import Link from "next/link";

export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* --- HEADER: Der schöne Style ist zurück --- */}
      <section className="bg-secondary py-24 border-b border-border-soft">
        <div className="container text-center max-w-4xl">
          
          {/* Das Detail: Stern + Leitbild */}
          <div className="inline-flex items-center gap-2 mb-6 opacity-70">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Unser Leitbild</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            "Wir pflegen nicht nur Körper, <br/> sondern auch die <span className="text-primary">Seele.</span>"
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pflege bedeutet für uns mehr als nur medizinische Versorgung. Es bedeutet Zuhören, 
            Dasein und ein Stück Lebensqualität zurückgeben. Jeden Tag.
          </p>
        </div>
      </section>

      {/* --- GESCHICHTE --- */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Unsere Geschichte</h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Gegründet wurde der Pflegedienst Herz & Hand mit einer klaren Vision: 
                  Eine Pflege zu bieten, die wir uns auch für unsere eigenen Eltern wünschen würden.
                </p>
                <p>
                  Was als kleines 3-Mann-Team begann, ist heute eine feste Institution in der Region. 
                  Wir haben gesehen, dass im hektischen Pflegealltag oft das Menschliche auf der Strecke bleibt. 
                  Genau das wollten wir ändern.
                </p>
              </div>
              
              <div className="pt-4 grid grid-cols-2 gap-8 border-t border-slate-100 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-slate-500 font-medium">Jahre Erfahrung</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-slate-500 font-medium">MDK Note "Sehr gut"</div>
                </div>
              </div>
            </div>

            {/* Bild */}
            <div className="flex-1 w-full">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
                 <Image 
                  src="/images/team/team.jpg" 
                  alt="Das Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- WERTE --- */}
      <section className="py-24 bg-secondary border-y border-border-soft">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Wofür wir stehen</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Zeit statt Hektik", text: "Wir takten unsere Touren so, dass Zeit für ein Gespräch bleibt." },
              { icon: Users, title: "Feste Bezugspersonen", text: "Vertrauen entsteht durch Bekanntheit. Wir vermeiden Wechsel." },
              { icon: Award, title: "Qualität", text: "Wir arbeiten streng nach Expertenstandards." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-4 border border-slate-100">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EINZUGSGEBIET --- */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Unser Einzugsgebiet</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Wir sind mobil in der ganzen Region unterwegs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {["München Zentrum", "Schwabing", "Bogenhausen", "Haidhausen", "Sendling", "Giesing", "Au", "Lehel"].map((ort, i) => (
              <div key={i} className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-full text-primary font-medium border border-border-soft hover:bg-primary hover:text-white transition-colors cursor-default">
                <MapPin className="w-4 h-4" />
                {ort}
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Link href="/kontakt">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 h-12 shadow-lg">
                Jetzt anfragen
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}