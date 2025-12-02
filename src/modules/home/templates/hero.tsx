import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowRight, HeartHandshake } from "lucide-react";

export function Hero() {
  return (
    // FIX: 
    // 1. pt-24 (Mobile) / pt-32 (Desktop): Deutlich weniger Abstand oben -> Text rutscht hoch.
    // 2. pb-48: Platz unten für den Übergang.
    // 3. min-h-[700px]: Solide Höhe, aber nicht riesig.
    <section className="relative w-full min-h-[700px] flex flex-col justify-start pt-24 lg:pt-32 pb-48 overflow-hidden font-sans text-white">
      
      {/* --- HINTERGRUND --- */}
      <div className="absolute inset-0 -z-30">
        <Image 
          src="/images/home/hero-bg.jpg" 
          alt="Pflegekraft hält Hand"
          fill
          className="object-cover object-center animate-ken-burns"
          priority
          quality={95}
        />
      </div>

      {/* --- FILTER --- */}
      <div className="absolute inset-0 -z-20 bg-black/50" />
      
      {/* --- INHALT --- */}
      <div className="container relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-sm">
          <HeartHandshake className="w-4 h-4 text-secondary" />
          <span>Ihr Pflegedienst mit Herz</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-xl">
          Selbstbestimmt leben <br/>
          <span className="text-secondary">in den eigenen vier Wänden.</span>
        </h1>
        
        {/* Text */}
        <p className="text-lg md:text-xl text-slate-100 max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-md">
          Wir unterstützen Sie und Ihre Angehörigen liebevoll und professionell im Alltag. 
          Ambulante Pflege, die sich nach Ihren Bedürfnissen richtet.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-12">
          <Link href="/leistungen">
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-xl bg-primary hover:bg-primary-hover text-white border-0 hover:scale-105 transition-transform">
              Unsere Leistungen
            </Button>
          </Link>
          
          <Link href="/kontakt">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all">
              Kostenlose Beratung <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm font-semibold text-slate-100 opacity-90">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/10">✓ Alle Kassen</span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/10">✓ 24h Notruf</span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/10">✓ Erstgespräch kostenlos</span>
        </div>

      </div>

      {/* --- WELLE --- */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20 translate-y-[1px]">
        <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-secondary"></path>
        </svg>
      </div>

    </section>
  );
}