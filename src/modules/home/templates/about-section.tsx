"use client"; 

import Image from "next/image";
import { buttonVariants } from "@/shared/ui/button"; 
import { ArrowRight, HeartHandshake, Sparkles, Award, History, Lock, Quote } from "lucide-react"; 
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in"; // <--- NEU: Animation
import { motion } from "framer-motion";

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

// --- HELPER HOOK (Für Mobile Auto-Focus) ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

// --- COUNTER COMPONENT ---
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
  
  // Hook für den Bild-Container (Mobile Effect)
  const { ref: imageRef, isInCenter: isImageActive } = useInCenter();

  // Performance Toggle (Slider nur wenn sichtbar)
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
    });
    if (sectionRef.current) observer.observe(sectionRef.current);

    let timer: NodeJS.Timeout;
    if (isVisible) {
        timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length);
        }, SLIDE_INTERVAL);
    }
    return () => {
        clearInterval(timer);
        observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section id="ueber-uns" ref={sectionRef} className="relative py-24 lg:py-32 bg-[var(--color-secondary)] font-sans overflow-hidden">
      
      {/* ========================================================= */}
      {/* HINTERGRUND FX - GPU OPTIMIERT                            */}
      {/* ========================================================= */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
      {/* Blob nur rendern wenn sichtbar */}
      {isVisible && (
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform" />
      )}
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />


      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
           {/* --- LINKS: BILD SLIDER (Mit Framer Motion FadeIn) --- */}
           <FadeIn direction="right" className="w-full max-w-md mx-auto lg:mx-0">
               <div 
                    ref={imageRef}
                    className="relative group/image"
               >
                
                {/* Dekorative Rahmen: Reagieren auf Mobile Scroll (isImageActive) ODER Desktop Hover */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[108%] border-2 border-[var(--color-accent)]/20 rounded-[2.5rem] -z-10 transition-transform duration-700 ease-out transform-gpu",
                    isImageActive ? "rotate-0 scale-105" : "-rotate-3 group-hover/image:rotate-0"
                )} />
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[108%] border-2 border-white/60 rounded-[2.5rem] -z-10 transition-transform duration-700 ease-out transform-gpu",
                    isImageActive ? "rotate-0 scale-105" : "rotate-2 group-hover/image:rotate-0"
                )} />

                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white bg-white z-10 transform-gpu">
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
                              sizes="(max-width: 768px) 100vw, 50vw" 
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

                {/* Badge unten links */}
                <div className="absolute -bottom-5 -left-2 lg:-left-6 bg-white p-3 pr-5 rounded-2xl shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 z-20 flex items-center gap-3">
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

                {/* Slider Dots */}
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
           </FadeIn>


          {/* --- RECHTS: TEXT CONTENT --- */}
          <div className="space-y-8">
            
            {/* Badge */}
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-slate-500 text-xs font-bold shadow-sm tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                Unsere Philosophie
                </div>
            </FadeIn>

           {/* Headline */}
           <FadeIn delay={0.2}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
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
           </FadeIn>
            
            {/* Intro Text */}
            <FadeIn delay={0.3}>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium">
                Wir pflegen so, wie wir selbst gepflegt werden möchten: Mit Zeit, Respekt und einem offenen Ohr. 
                Bei uns sind Sie keine Nummer in einer Akte, sondern ein Mensch mit Geschichte.
                </p>
            </FadeIn>

            {/* Feature Grid - Gestaffeltes Einblenden */}
            <div className="grid gap-4 pt-4">
               {[
                  { title: "Vertrauen", text: "Feste Bezugspersonen, keine ständigen Wechsel.", icon: HeartHandshake },
                  { title: "Zeit & Ruhe", text: "Keine Stoppuhr-Pflege, sondern menschliche Nähe.", icon: History },
                  { title: "Sicherheit", text: "24h Erreichbarkeit im Notfall für unsere Patienten.", icon: Lock }
              ].map((item, i) => (
                <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="left">
                    <div className="group flex items-center gap-5 p-5 rounded-[1.5rem] bg-white border border-[var(--color-border-soft)] shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all duration-300 transform hover:-translate-x-1">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-lg group-hover:text-[var(--color-primary)] transition-colors mb-0.5">{item.title}</div>
                            <div className="text-slate-600 text-sm leading-snug font-medium">{item.text}</div>
                        </div>
                    </div>
                </FadeIn>
              ))}
            </div>

            {/* CTA Button */}
            <FadeIn delay={0.7}>
                <div className="pt-6">
                <Link href="/ueber-uns">
                    <div className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-14 px-8 text-base rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 hover:-translate-y-1 transition-all cursor-pointer font-bold"
                    )}>
                    Mehr über uns erfahren
                    <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                </Link>
                </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}