"use client"; 

import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { ArrowRight, HeartHandshake, Sparkles, Award, History, Lock, Quote } from "lucide-react"; 
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/shared/utils/cn";

// --- 1. NEUE DATENSTRUKTUR: NUR NOCH BILDER ---
const STORY_SLIDES = [
    { 
        id: 1, 
        // Stelle sicher, dass dieses Bild existiert:
        src: "/images/team/team.jpg", 
        title: "Zeit für das Wesentliche.", 
        sub: "Keine Hektik, sondern echte Zuwendung."
    },
    { 
        id: 2, 
        // ÄNDERN: Hier dein zweites Bild eintragen
        src: "/images/team/team-2.jpg", 
        title: "Pflege ist Vertrauenssache.", 
        sub: "Wir behandeln Sie wie unsere eigene Familie."
    },
    { 
        id: 3, 
        // ÄNDERN: Hier dein drittes Bild eintragen
        src: "/images/team/team-3.jpg", 
        title: "Qualität, die man spürt.", 
        sub: "Offiziell geprüft und top bewertet (MDK 1.0)."
    }
];

const SLIDE_INTERVAL = 5000; // Etwas schnellerer Wechsel bei Bildern (5s)

// --- COUNTER ---
function Counter({ end, duration = 2000 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      }, { threshold: 0.5 });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}</span>;
}

export function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ueber-uns" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[var(--color-secondary)] font-sans overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
           {/* --- LINKS: BILD SLIDER (Jetzt nur noch Images) --- */}
           <div className="w-full relative group/image">
            
            {/* Dekorativer Hintergrund-Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-[var(--color-primary)]/5 rounded-[3rem] -z-10 -rotate-3 transition-transform duration-1000 group-hover/image:rotate-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-white/50 rounded-[3rem] -z-10 rotate-2 transition-transform duration-1000 group-hover/image:rotate-0" />

            {/* Haupt-Rahmen */}
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-[6px] border-white bg-white z-10">
              
              {STORY_SLIDES.map((slide, index) => (
                  <div 
                     key={slide.id} 
                     className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-slate-200", // Fallback Farbe bg-slate-200 falls Bild lädt
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                     )}
                  >
                      {/* DAS BILD */}
                      <Image 
                          src={slide.src} 
                          alt={slide.title} 
                          fill 
                          className="object-cover transition-transform duration-[8000ms] ease-out scale-105" // Sanfter Zoom-Effekt (Ken Burns)
                          priority={index === 0} // Das erste Bild sofort laden
                      />
                      
                      {/* Gradient Overlay (Damit Text lesbar ist) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/90 via-transparent to-transparent opacity-80" />

                      {/* Text Overlay (Unten im Bild) */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2">
                          <Quote className="w-8 h-8 text-[var(--color-accent)] mb-2 opacity-80" />
                          <div className="text-2xl font-bold mb-1 leading-tight">{slide.title}</div>
                          <div className="text-white/90 text-sm font-medium">{slide.sub}</div>
                      </div>
                  </div>
              ))}
            </div>

            {/* Badge: Erfahrung */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white p-4 pr-6 rounded-2xl shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 z-20 flex items-center gap-4 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="w-14 h-14 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center shadow-md">
                    <Award className="w-7 h-7" />
                </div>
                <div>
                    <div className="text-3xl font-black text-slate-900 leading-none flex items-baseline">
                        <Counter end={10} /><span className="text-[var(--color-accent)] ml-0.5">+</span>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Jahre Erfahrung</div>
                </div>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {STORY_SLIDES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={cn("h-1.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm ring-1 ring-white/20", idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white")}
                    />
                ))}
            </div>

          </div>


          {/* --- RECHTS: TEXT CONTENT --- */}
          <div className="space-y-8">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold shadow-sm tracking-wide uppercase">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              Unsere Philosophie
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Pflege ist für uns <br/>
              <span className="relative inline-block text-[var(--color-primary)]">
                Familiensache.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Wir pflegen so, wie wir selbst gepflegt werden möchten: Mit Zeit, Respekt und einem offenen Ohr. 
              Bei uns sind Sie keine Nummer in einer Akte, sondern ein Mensch mit Geschichte.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-4 pt-2">
               {[
                  { title: "Vertrauen", text: "Feste Bezugspersonen, keine ständigen Wechsel.", icon: HeartHandshake },
                  { title: "Zeit & Ruhe", text: "Keine Stoppuhr-Pflege, sondern menschliche Nähe.", icon: History },
                  { title: "Sicherheit", text: "24h Erreichbarkeit im Notfall für unsere Patienten.", icon: Lock }
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-5 p-5 rounded-2xl bg-white border border-[var(--color-border-soft)] shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all duration-300 transform hover:-translate-x-1">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 text-lg group-hover:text-[var(--color-primary)] transition-colors">{item.title}</div>
                        <div className="text-slate-600 text-sm">{item.text}</div>
                    </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link href="/ueber-uns">
                <Button size="lg" variant="default" className="h-14 px-8 text-base font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 hover:-translate-y-1 transition-all">
                  Mehr über uns erfahren
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}