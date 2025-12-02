import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { Check, Users } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  return (
    // HINTERGRUND: Rosa (bg-secondary), damit es im Zebra-Muster der Startseite passt
    <section id="ueber-uns" className="py-24 bg-secondary font-sans">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LINK: Bild-Bereich */}
          <div className="flex-1 order-2 lg:order-1 w-full">
            <div className="relative">
              
              {/* Das Hauptbild */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 transform transition-transform hover:scale-[1.01] duration-500">
                
                {/* KORREKTUR: Hier ist jetzt dein lokales Bild verknüpft */}
                <Image 
                  src="/images/team/team.jpg" 
                  alt="Das Team von Pflegedienst Herz & Hand"
                  fill
                  className="object-cover"
                />
                
              </div>

              {/* Deko-Box unten links */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-3 mb-1">
                  <Users className="w-6 h-6 text-primary" />
                  <div className="text-3xl font-bold text-primary">10+</div>
                </div>
                <div className="text-xs text-slate-600 font-bold uppercase tracking-wide">Jahre Erfahrung</div>
              </div>

              {/* Deko-Punkte oben rechts */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[radial-gradient(var(--color-primary)_2px,transparent_2px)] [background-size:12px_12px] opacity-20 z-0" />
            </div>
          </div>
          
          {/* RECHTS: Text-Bereich */}
          <div className="flex-1 order-1 lg:order-2 space-y-8">
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-border-soft text-primary text-sm font-bold shadow-sm tracking-wide uppercase">
              Unsere Philosophie
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Pflege ist für uns <br/>
              <span className="text-primary">Familiensache.</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Wir pflegen so, wie wir selbst gepflegt werden möchten. Mit Zeit, Respekt und einem offenen Ohr. 
              Bei uns sind Sie keine Nummer, sondern Teil der Familie. Wir nehmen uns die Zeit, die nötig ist – nicht die, die auf der Uhr steht.
            </p>

            {/* Checkliste */}
            <ul className="space-y-4 pt-2">
              {[
                "Feste Bezugspersonen statt ständig wechselndes Personal",
                "Kostenlose Erstberatung direkt bei Ihnen zu Hause",
                "24 Stunden Erreichbarkeit für unsere Patienten"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary stroke-[3]" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-6">
              <Link href="/ueber-uns">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-primary-deep/10 hover:shadow-primary-deep/20 hover:-translate-y-1 transition-all">
                  Mehr über uns erfahren
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}