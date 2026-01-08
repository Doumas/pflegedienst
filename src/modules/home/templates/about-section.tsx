"use client"; 

import Image from "next/image";
import { buttonVariants } from "@/shared/ui/button"; 
import { ArrowRight, HeartHandshake, Award, History, Lock, Quote, Pen } from "lucide-react"; // Pen importiert
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background"; // <--- BEST PRACTICE IMPORT
import { motion } from "framer-motion"; 

// --- CUSTOM ICON FÜR BADGE (Stift - Draw Animation) ---
const BadgePenIcon = (props: any) => (
    <motion.svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...props}
    >
        <motion.path 
            d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
            variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { 
                    pathLength: 1, 
                    opacity: 1, 
                    transition: { duration: 1.5, ease: "easeInOut" } 
                }
            }}
        />
    </motion.svg>
);

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

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-20% 0px -20% 0px", 
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
  const { ref: imageRef, isInCenter: isImageActive } = useInCenter();
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
      
      {/* --- HINTERGRUND SCHEMA --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          
          {/* 1. ANIMIERTE HINTERGRUND ICONS (STIFT) */}
          {/* Nutzung der Shared Component für Konsistenz */}
  <AnimatedBackground 
            icon={Pen} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            // HIER GEÄNDERT: Anzahl auf 22 geändert, um die Positionen neu zu mischen
            count={5} 
            className="opacity-80" 
         />
          {/* 2. Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.4] z-0" 
               style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
          />
      </div>

      {/* 3. Blobs */}
      {isVisible && (
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform z-0" />
      )}
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none transform-gpu z-0" />


      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center lg:items-start"> 
          
           {/* --- LINKS: BILD SLIDER --- */}
           <FadeIn direction="right" className="w-full max-w-md mx-auto lg:mx-0 pt-8 lg:pt-0">
               <div 
                    ref={imageRef}
                    className="relative group/image"
               >
                
                {/* Dekorative Rahmen (Accent = Orange) */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[104%] h-[104%] border-2 border-[var(--color-accent)]/20 rounded-[2.5rem] -z-10 transition-transform duration-700 ease-out transform-gpu",
                    isImageActive ? "rotate-0 scale-102" : "rotate-1 group-hover/image:rotate-0"
                )} />
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[104%] h-[104%] border-2 border-white/60 rounded-[2.5rem] -z-10 transition-transform duration-700 ease-out transform-gpu",
                    isImageActive ? "rotate-0 scale-102" : "-rotate-1 group-hover/image:rotate-0"
                )} />

                {/* Badge (Erfahrung) */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:-left-6 lg:translate-x-0 z-30 bg-white p-4 rounded-2xl shadow-xl shadow-[var(--color-primary)]/10 border border-slate-100 flex items-center gap-4 transition-transform duration-300 hover:scale-105 min-w-[200px] lg:min-w-0">
                    <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <Award className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <div className="text-3xl font-black text-slate-900 leading-none flex items-baseline">
                            <Counter end={10} /><span className="text-[var(--color-accent)] ml-0.5">+</span>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1 whitespace-nowrap">Jahre Erfahrung</div>
                    </div>
                </div>

                {/* Bild Container */}
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
                          {/* Gradient Overlay in Deep Teal */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/90 via-transparent to-transparent opacity-80" />

                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-1 text-left">
                              {/* Quote Icon in Orange Accent */}
                              <Quote className="w-8 h-8 text-[var(--color-accent)] mb-3 opacity-90" />
                              <div className="text-2xl font-bold mb-2 leading-tight">{slide.title}</div>
                              <div className="text-white/90 text-base font-medium leading-relaxed">{slide.sub}</div>
                          </div>
                      </div>
                  ))}
                </div>

                {/* Dots */}
                <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                    {STORY_SLIDES.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={cn("h-1.5 rounded-full transition-all duration-300 shadow-sm ring-1 ring-white/20", idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white")}
                        />
                    ))}
                </div>
              </div>
           </FadeIn>


          {/* --- RECHTS: TEXT CONTENT --- */}
          <div className="space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <div className="space-y-6 flex flex-col items-center lg:items-start">
                
                {/* Badge mit ANIMIERTEM ICON (STIFT) */}
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-slate-500 text-xs font-bold shadow-sm tracking-wide uppercase">
                        <BadgePenIcon className="w-4 h-4 text-[var(--color-accent)]" />
                        Unsere Philosophie
                    </div>
                </FadeIn>

                {/* Headline mit Script Font */}
                <FadeIn delay={0.2}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        Pflege ist für uns <br/>
                        {/* Familiensache in Script Font & Orange */}
                        <span className="font-script text-[var(--color-accent)] text-[1.1em] relative inline-block mt-2 px-1 font-normal">
                            Familiensache.
                            {/* Teal Underline für Kontrast */}
                            <svg className="absolute w-full h-2 lg:h-3 -bottom-1 left-0 text-[var(--color-primary)] -z-10 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h2>
                </FadeIn>
                
                {/* Intro Text */}
                <FadeIn delay={0.3}>
                    <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                        Wir pflegen so, wie wir selbst gepflegt werden möchten: Mit Zeit, Respekt und einem offenen Ohr. 
                        Bei uns sind Sie keine Nummer in einer Akte, sondern ein <span className="text-[var(--color-primary)] font-bold">Mensch mit Geschichte.</span>
                    </p>
                </FadeIn>
            </div>

            {/* Feature Grid */}
            <div className="flex flex-col gap-4 w-full">
               {[
                  { title: "Vertrauen", text: "Feste Bezugspersonen, keine ständigen Wechsel.", icon: HeartHandshake },
                  { title: "Zeit & Ruhe", text: "Keine Stoppuhr-Pflege, sondern menschliche Nähe.", icon: History },
                  { title: "Sicherheit", text: "24h Erreichbarkeit im Notfall für unsere Patienten.", icon: Lock }
              ].map((item, i) => (
                <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="left">
                    <div className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6 p-6 rounded-[1.5rem] bg-white border border-[var(--color-border-soft)] shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all duration-300 w-full">
                        {/* Icon Box */}
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300 shadow-sm mt-1">
                            <item.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-xl group-hover:text-[var(--color-primary)] transition-colors mb-1">{item.title}</div>
                            <div className="text-slate-600 text-base leading-relaxed font-medium">{item.text}</div>
                        </div>
                    </div>
                </FadeIn>
              ))}
            </div>

            {/* CTA Button */}
            <FadeIn delay={0.7}>
                <Link href="/ueber-uns" className="inline-block">
                    <div className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-14 px-10 text-base rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 hover:-translate-y-1 transition-all cursor-pointer font-bold text-white"
                    )}>
                    Mehr über uns erfahren
                    <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                </Link>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}