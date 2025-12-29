"use client"; 

import Image from "next/image";
import { buttonVariants } from "@/shared/ui/button"; 
import { ArrowRight, HeartHandshake, Sparkles, Award, History, Lock, Quote } from "lucide-react"; 
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/shared/utils/cn";

// --- DATEN ---
const STORY_SLIDES = [
    { 
        id: 1, 
        src: "/images/team/team.jpg", 
        title: "Zeit für das Wesentliche.", 
        sub: "Keine Hektik, sondern echte Zuwendung."
    },
    { 
        id: 2, 
        src: "/images/team/team-2.jpg", 
        title: "Pflege ist Vertrauenssache.", 
        sub: "Wir behandeln Sie wie unsere eigene Familie."
    },
    { 
        id: 3, 
        src: "/images/team/team-3.jpg", 
        title: "Qualität, die man spürt.", 
        sub: "Offiziell geprüft und top bewertet (MDK 1.0)."
    }
];

const SLIDE_INTERVAL = 5000;

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
    <section id="ueber-uns" className="relative py-24 lg:py-32 bg-[var(--color-secondary)] font-sans overflow-hidden">
      
      {/* ========================================================= */}
      {/* HINTERGRUND FX                                            */}
      {/* ========================================================= */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none" />


      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
           {/* --- LINKS: BILD SLIDER (Mit Animationen) --- */}
           <div className="w-full max-w-md mx-auto lg:mx-0 relative group/image animate-in fade-in slide-in-from-left-8 duration-1000">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[108%] border-2 border-[var(--color-accent)]/20 rounded-[2.5rem] -z-10 -rotate-3 transition-transform duration-1000 group-hover/image:rotate-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[108%] border-2 border-white/60 rounded-[2.5rem] -z-10 rotate-2 transition-transform duration-1000 group-hover/image:rotate-0" />

            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white bg-white z-10">
              {STORY_SLIDES.map((slide, index) => (
                  <div 
                     key={slide.id} 
                     className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-slate-200", 
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                     )}
                  >
                      <Image 
                          src={slide.src} 
                          alt={slide.title} 
                          fill 
                          className="object-cover transition-transform duration-[8000ms] ease-out scale-105" 
                          priority={index === 0} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/90 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white translate-y-1">
                          <Quote className="w-6 h-6 text-[var(--color-accent)] mb-2 opacity-90" />
                          <div className="text-xl lg:text-2xl font-bold mb-1 leading-tight">{slide.title}</div>
                          <div className="text-white/90 text-sm font-medium">{slide.sub}</div>
                      </div>
                  </div>
              ))}
            </div>

            <div className="absolute -bottom-5 -left-2 lg:-left-6 bg-white p-3 pr-5 rounded-2xl shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 z-20 flex items-center gap-3 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-black text-slate-900 leading-none flex items-baseline">
                        <Counter end={10} /><span className="text-[var(--color-accent)] ml-0.5">+</span>
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Jahre Erfahrung</div>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 z-20 flex gap-1.5">
                {STORY_SLIDES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={cn("h-1 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm ring-1 ring-white/20", idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white")}
                    />
                ))}
            </div>
          </div>


          {/* --- RECHTS: TEXT CONTENT --- */}
          <div className="space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-slate-500 text-xs font-bold shadow-sm tracking-wide uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              Unsere Philosophie
            </div>

           {/* STANDARD H2 GRÖSSE: 
              text-4xl md:text-5xl lg:text-6xl
           */}
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Pflege ist für uns <br/>
              <span className="relative inline-block px-1">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                  Familiensache.
                </span>
                <svg className="absolute w-full h-2 lg:h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            
            {/* STANDARD INTRO TEXT: 
               text-lg lg:text-xl
            */}
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Wir pflegen so, wie wir selbst gepflegt werden möchten: Mit Zeit, Respekt und einem offenen Ohr. 
              Bei uns sind Sie keine Nummer in einer Akte, sondern ein Mensch mit Geschichte.
            </p>

            <div className="grid gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
               {[
                  { title: "Vertrauen", text: "Feste Bezugspersonen, keine ständigen Wechsel.", icon: HeartHandshake },
                  { title: "Zeit & Ruhe", text: "Keine Stoppuhr-Pflege, sondern menschliche Nähe.", icon: History },
                  { title: "Sicherheit", text: "24h Erreichbarkeit im Notfall für unsere Patienten.", icon: Lock }
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-5 p-5 rounded-[1.5rem] bg-white border border-[var(--color-border-soft)] shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all duration-300 transform hover:-translate-x-1">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 text-lg group-hover:text-[var(--color-primary)] transition-colors mb-0.5">{item.title}</div>
                        <div className="text-slate-600 text-sm leading-snug font-medium">{item.text}</div>
                    </div>
                </div>
              ))}
            </div>

            <div className="pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <Link href="/ueber-uns">
                {/* BUTTON STYLE ANPASSUNG:
                   - rounded-full (für den neuen Look)
                   - div statt button (Link Fix)
                */}
                <div className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-14 px-8 text-base rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 hover:-translate-y-1 transition-all cursor-pointer font-bold"
                )}>
                  Mehr über uns erfahren
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}