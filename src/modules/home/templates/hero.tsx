"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { WhatsappFloatingButton } from "@/shared/ui/whatsapp-floating-button"; 

// --- SLIDES DATEN ---
const STORY_SLIDES = [
  { id: 1, src: "/images/home/hero-bg.jpg", title: "Fürsorge.", sub: "Jeden Tag aufs Neue." },
  { id: 2, src: "/images/home/hero-bg2.jpg", title: "Sicherheit.", sub: "Rund um die Uhr für Sie da." },
  { id: 3, src: "/images/home/hero-bg3.jpg", title: "Vertrauen.", sub: "Ein Team, das sich kümmert." }
];

const SLIDE_INTERVAL = 5000;

function UserIcon({className}: {className?: string}) {
   return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
}
function StarIcon({className}: {className?: string}) {
  return <svg viewBox="0 0 24 24" className={className}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length); 
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    // pb-32 lg:pb-48 sorgt für genug Platz unten, damit der Configurator überlappen kann
    <section className="relative w-full overflow-hidden pt-32 pb-32 lg:pt-40 lg:pb-48 flex items-center min-h-[85vh]">
      
      {/* Background Layer */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-0 -z-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-60 translate-x-[-20%] translate-y-[-20%]" />
      <div className="absolute bottom-0 right-0 -z-20 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] opacity-50 translate-x-[20%] translate-y-[20%]" />
      <div className="absolute inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- TEXT CONTENT --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1">
            
            {/* Badge */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ihr Pflegedienst in München
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Pflege mit <br />
              <span className="relative whitespace-nowrap text-primary">
                <span className="relative z-10">Herz & Verstand.</span>
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/40 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Selbstbestimmt leben in den eigenen vier Wänden. 
              Wir verbinden <span className="font-semibold text-slate-800">menschliche Wärme</span> mit modernster medizinischer Versorgung.
            </p>

            {/* Buttons */}
            <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center lg:justify-start">
                  <Link href="/kontakt" className="w-full sm:w-auto">
                    <Button size="lg" className="group relative w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-2xl bg-primary text-white border-0 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                      <span className="relative z-10 flex items-center">
                        Beratung anfordern <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/leistungen" className="w-full sm:w-auto">
                    <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-2xl text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                      <PlayCircle className="mr-2 w-5 h-5" /> Unsere Leistungen
                    </Button>
                  </Link>
                </div>

                {/* Social Proof Mini */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-slate-100">
                            <UserIcon className="w-6 h-6 text-slate-300 translate-y-1" />
                         </div>
                      ))}
                   </div>
                   <div className="text-sm">
                      <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                        {[1,2,3,4,5].map(s => <StarIcon key={s} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="font-medium text-slate-600">
                        Vertrauen von <span className="font-bold text-slate-900">500+ Familien</span>.
                      </span>
                   </div>
                </div>
            </div>
          </div>

          {/* --- VISUAL STACK --- */}
          <div className="relative order-2 flex justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-300 mt-10 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/20 rounded-full animate-[spin_40s_linear_infinite_reverse] border-dashed" />

            <div className="relative z-10 w-[320px] sm:w-[380px] aspect-[4/5] group perspective-1000">
               <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] transform rotate-6 translate-x-4 transition-transform duration-500 group-hover:rotate-12 group-hover:translate-x-6 border border-primary/10" />
               <div className="absolute inset-0 bg-white rounded-[2.5rem] transform -rotate-3 -translate-x-2 transition-transform duration-500 group-hover:-rotate-6 group-hover:-translate-x-4 border border-slate-100 shadow-xl z-10" />
               
               <div className="absolute inset-0 rounded-[2.5rem] shadow-2xl shadow-slate-300/50 bg-white p-2 rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 ease-out z-20 overflow-hidden ring-1 ring-slate-100">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-200">
                     {STORY_SLIDES.map((slide, index) => {
                       const isActive = index === currentSlide;
                       return (
                         <div key={slide.id} className={cn("absolute inset-0 transition-opacity duration-[1500ms]", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}>
                            <Image src={slide.src} alt={slide.title} fill className={cn("object-cover transition-transform duration-[8000ms]", isActive ? "scale-110" : "scale-100")} priority={index === 0} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2">
                               <p className="text-2xl font-bold mb-1">{slide.title}</p>
                               <p className="text-sm opacity-90 text-slate-100">{slide.sub}</p>
                            </div>
                         </div>
                       );
                     })}
                  </div>
               </div>
            </div>
            <WhatsappFloatingButton />
          </div>
        </div>
      </div>
    </section>
  );
}