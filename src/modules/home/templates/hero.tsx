"use client"; 

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button"; 
import { MapPin, CheckCircle2, Loader2, Star, X, Ambulance } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { WhatsappFloatingButton } from "@/shared/ui/whatsapp-floating-button"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { AnimatedBackground } from "@/shared/ui/animated-background"; 
import { motion } from "framer-motion"; 

// --- CUSTOM ICON: DAS MARKEN-LOGO (HAUS + HERZ) ---
const BrandIcon = (props: any) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M3 12a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
        <path d="M12 8C12 8 13.5 6 15 6C16.5 6 17.5 7 17.5 8.5C17.5 11 12 15 12 15C12 15 6.5 11 6.5 8.5C6.5 7 7.5 6 9 6C10.5 6 12 8 12 8Z" />
    </svg>
);

const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces&q=80"
];

const STORY_SLIDES = [
  { id: 1, src: "/images/home/hero-bg.jpg", title: "Fürsorge", sub: "Jeden Tag aufs Neue." },
  { id: 2, src: "/images/home/hero-bg2.jpg", title: "Sicherheit", sub: "Rund um die Uhr da." },
  { id: 3, src: "/images/home/hero-bg3.jpg", title: "Vertrauen", sub: "Ein Team mit Herz." }
];

const SLIDE_INTERVAL = 5000;

function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [checkResult, setCheckResult] = useState<"success" | "error" | null>(null);
  const [checkMessage, setCheckMessage] = useState("");

  const { ref: cardStackRef, isInCenter: cardStackActive } = useInCenter();
  const { ref: widgetRef, isInCenter: widgetActive } = useInCenter();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
    });
    
    const heroSection = document.getElementById('hero-section');
    if (heroSection) observer.observe(heroSection);

    let timer: NodeJS.Timeout;
    if (isHeroVisible) {
        timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length); 
        }, SLIDE_INTERVAL);
    }

    if (resultModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
        clearInterval(timer);
        observer.disconnect();
    };
  }, [resultModalOpen, isHeroVisible]);

  const handleCheck = (e: React.FormEvent) => {
      e.preventDefault();
      if (!zipCode || zipCode.length < 5) return;
      setIsChecking(true);
      setTimeout(() => {
          setIsChecking(false);
          if (zipCode.startsWith("60") || zipCode.startsWith("659")) {
              setCheckResult("success");
              setCheckMessage(zipCode);
          } else {
              setCheckResult("error");
              setCheckMessage("Leider außerhalb unseres Gebiets");
          }
          setResultModalOpen(true);
      }, 1500);
  };

  const closeResultModal = () => setResultModalOpen(false);

  return (
    <>
    <section id="hero-section" className="relative w-full overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 text-center px-4 flex items-center lg:min-h-[90vh]">
      
      {/* --- HINTERGRUND SCHEMA --- */}
      <div className="absolute inset-0 z-0 bg-[#fffbf7] overflow-hidden">
          
          {/* KORREKTUR: Hier Ambulance statt BrandIcon übergeben */}
          <AnimatedBackground icon={Ambulance} variant="section" color="text-[var(--color-primary)]" />

          {/* 2. Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-10" 
               style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* 3. Emotionales Bild */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?q=80&w=2048&auto=format&fit=crop')] bg-cover bg-center opacity-[0.12] mix-blend-multiply pointer-events-none grayscale-[20%] z-0" />
          
          {/* 4. Weiche Verläufe */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#ffedd5]/10 to-white/95 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent pointer-events-none lg:block hidden z-0" />
      </div>

      {isHeroVisible && (
          <>
            <div className="absolute top-[-10%] left-1/4 -translate-x-1/2 w-[600px] lg:w-[1000px] h-[500px] lg:h-[700px] bg-[var(--color-primary)]/10 rounded-full blur-[80px] lg:blur-[120px] opacity-60 pointer-events-none -z-10 animate-pulse transform-gpu" style={{ animationDuration: '8s' }} />
            <div className="absolute top-[10%] right-[-10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[60px] lg:blur-[100px] animate-pulse pointer-events-none -z-10 transform-gpu" style={{ animationDuration: '7s' }} />
          </>
      )}
      
      <div className="container relative z-20 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center lg:items-start">
          
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
               
               {/* LOCATION BADGE MIT AMBULANCE ICON */}
               <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[var(--color-primary)]/20 text-[var(--color-primary-deep)] text-xs font-bold shadow-sm tracking-wide uppercase group hover:border-[var(--color-primary)]/40 transition-colors cursor-default">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <Ambulance className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-accent)]" />
                        </motion.div>
                        Borsigallee 37, 60388 Frankfurt
                    </div>
                </FadeIn>

            <FadeIn delay={0.2}>
                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-slate-900 mb-4 tracking-tight text-balance leading-[1.0] drop-shadow-sm">
                    Gut versorgt. <br/>
                    <span className="relative inline-block px-1 mt-2 lg:mt-3">
                        <span className="relative z-10 font-script text-[var(--color-primary)] font-bold tracking-normal text-[1.1em]">
                            Zuhause leben.
                        </span>
                        <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-2 text-[var(--color-accent)] -z-0 opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </h1>
           </FadeIn>

            <FadeIn delay={0.3}>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium text-pretty">
                Ihr verlässlicher Partner in Frankfurt. Wir verbinden <span className="font-bold text-[var(--color-primary)]">fachliche Kompetenz</span> mit echter <span className="font-script text-2xl text-[var(--color-accent)] px-1">Zuwendung</span> – damit Sie sich sicher fühlen.
                </p>
            </FadeIn>
          </div>

    {/* VISUAL STACK */}
<div className="order-2 lg:col-start-2 lg:row-span-2 relative flex justify-center lg:justify-end py-12 lg:py-0">
  <FadeIn delay={0.4} direction="left" className="relative flex justify-center lg:justify-end w-full">
      {isHeroVisible && (
          <>
              {/* Die dekorativen Ringe massiv vergrößert, um den Flyer-Rahmen zu sprengen */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1100px] h-[600px] lg:h-[1100px] border border-[var(--color-primary)]/10 rounded-full animate-[spin_80s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] lg:w-[1000px] h-[550px] lg:h-[1000px] border border-[var(--color-accent)]/15 rounded-full animate-[spin_60s_linear_infinite_reverse] border-dashed" />
          </>
      )}

      {/* CONTAINER ANPASSUNG: 
          - lg:w-[640px] sorgt für eine massive Breite (ähnlich einem großen Flyer)
          - aspect-[1/1.41] erzwingt exakt das DIN-Verhältnis (Hochformat-Flyer)
          - Falls du es lieber als breiten Flyer (Quer) willst: aspect-[1.41/1]
      */}
      <div 
          ref={cardStackRef} 
          className="relative z-10 w-[300px] sm:w-[480px] lg:w-[640px] aspect-[1/1.41] group perspective-2000 animate-float"
      >
          {/* Hintergrund-Karten für den Stapel-Effekt (Flyer-Stapel) */}
          <div className={cn(
              "absolute inset-0 bg-[var(--color-primary)]/10 rounded-[2.5rem] lg:rounded-[3rem] border border-[var(--color-primary)]/20 transition-transform duration-1000 ease-out shadow-inner",
              (cardStackActive) ? "rotate-12 translate-x-10 translate-y-4" : "rotate-6 translate-x-6",
              "group-hover:rotate-12 group-hover:translate-x-10"
          )} />
          
          <div className={cn(
              "absolute inset-0 bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl z-10 transition-transform duration-1000 ease-out",
              (cardStackActive) ? "-rotate-6 -translate-x-8 translate-y-2" : "-rotate-3 -translate-x-4",
              "group-hover:-rotate-6 group-hover:-translate-x-8"
          )} />
          
          {/* Haupt-Flyer */}
          <div className={cn(
              "absolute inset-0 rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-white p-2 lg:p-3 z-20 overflow-hidden ring-1 ring-slate-100 transition-all duration-1000 ease-out",
              (cardStackActive) ? "rotate-0 scale-105" : "rotate-[-1deg] scale-100",
              "group-hover:rotate-0 group-hover:scale-105"
          )}>
              <div className="relative w-full h-full rounded-[1.8rem] lg:rounded-[2.2rem] overflow-hidden bg-slate-200 transform-gpu">
                  {STORY_SLIDES.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                      <div key={slide.id} className={cn("absolute inset-0 transition-opacity duration-[2000ms]", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}>
                          <Image 
                              src={slide.src} 
                              alt={slide.title} 
                              fill 
                              className={cn("object-cover transition-transform duration-[10000ms]", isActive ? "scale-110 rotate-1" : "scale-100")} 
                              priority={index === 0}
                              sizes="(max-width: 1024px) 100vw, 1200px" 
                          />
                          {/* Gradient für bessere Textlesbarkeit auf dem Flyer */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/90 via-transparent to-black/20 opacity-90" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 lg:p-14 lg:pb-16 text-white pointer-events-none text-center">
                              <p className="font-script text-5xl lg:text-7xl mb-4 drop-shadow-2xl text-[var(--color-accent)]">
                                  {slide.title}
                              </p>
                              <p className="text-base lg:text-lg font-bold opacity-95 text-slate-100 tracking-[0.2em] uppercase drop-shadow-md">
                                  {slide.sub}
                              </p>
                          </div>
                      </div>
                  );
                  })}
              </div>
          </div>
          
          {/* WhatsApp Button Positionierung angepasst an Flyerrand */}
          <div className={cn(
              "absolute z-30 -bottom-6 -left-4 lg:-bottom-10 lg:-left-12 w-max transition-transform duration-700",
              (cardStackActive) ? "scale-110" : "scale-100",
              "group-hover:scale-110"
          )}>
              <WhatsappFloatingButton />
          </div>
      </div>
  </FadeIn>
</div>
          <div className="order-3 lg:col-start-1 w-full max-w-lg mx-auto lg:mx-0 pt-8 lg:pt-0">
                <FadeIn delay={0.4} className="w-full">
                    <div 
                        ref={widgetRef} 
                        className={cn(
                        "bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 xs:p-6 lg:p-8 shadow-xl shadow-[var(--color-primary)]/5 border border-white relative overflow-hidden transition-all duration-500 group/widget transform-gpu",
                        (widgetActive) ? "border-[var(--color-primary)]/30 scale-[1.02]" : "scale-100",
                        "hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/40"
                    )}>
                        <form onSubmit={handleCheck} className="flex flex-col gap-4 lg:gap-5">
                            <div>
                                <label className="text-[10px] lg:text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1 lg:mb-2 block">
                                    Freie Kapazitäten prüfen
                                </label>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                                    Wir kommen zu Ihnen.
                                </h3>
                            </div>
                            
                            <div className="relative flex items-center bg-white border border-slate-200 rounded-full p-1.5 transition-all shadow-sm group-hover/widget:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)]">
                                <MapPin className="absolute left-4 w-5 h-5 text-[var(--color-accent)]" />
                                <input 
                                    type="text" 
                                    placeholder="Ihre Postleitzahl" 
                                    className="w-full h-12 pl-11 pr-32 bg-transparent border-none text-slate-900 font-bold placeholder:font-medium placeholder:text-slate-400 focus:ring-0 text-lg rounded-full outline-none"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, '').slice(0,5))}
                                />
                                <button 
                                    type="submit"
                                    disabled={zipCode.length < 5 || isChecking}
                                    className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-full transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-sm min-w-[100px] active:scale-95"
                                >
                                    {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "Prüfen"}
                                </button>
                            </div>
                        </form>
                    </div>
                </FadeIn>

                <FadeIn delay={0.5}>
                    <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 lg:pt-8 ml-2">
                    <div className="flex -space-x-3">
                        {AVATAR_IMAGES.map((src, i) => (
                            <div key={i} className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full border-[3px] border-white shadow-sm overflow-hidden ring-1 ring-slate-100 bg-slate-100 hover:scale-110 transition-transform z-0 hover:z-10">
                                <Image src={src} alt="Kunden" fill className="object-cover" sizes="48px" />
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-left pl-1">
                        <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-current" />)}
                        </div>
                        <span className="font-medium text-slate-600 text-xs sm:text-sm block">
                            Von Frankfurter Familien empfohlen.
                        </span>
                    </div>
                    </div>
                </FadeIn>
          </div>
        </div>
      </div>
    </section>

    {resultModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[var(--color-primary-deep)]/60 backdrop-blur-sm" onClick={closeResultModal} />
           <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
              <div className="absolute top-4 right-4 z-10">
                 <button onClick={closeResultModal} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-8 pt-12 pb-10">
                 {checkResult === "success" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-white shadow-xl shadow-green-100 flex items-center justify-center text-[var(--color-primary)] mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-script font-bold text-[var(--color-primary)] mb-1">Gute Nachricht!</h3>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-[280px] mx-auto">
                            Wir sind in <strong className="text-slate-900 bg-green-50 px-2 py-0.5 rounded-lg">{zipCode}</strong> für Sie da.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button size="lg" className="w-full h-14 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                                    Jetzt kennenlernen
                                </Button>
                            </Link>
                        </div>
                    </>
                 )}
                 {checkResult === "error" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-orange-50 border-4 border-white shadow-xl shadow-orange-100 flex items-center justify-center text-[var(--color-accent)] mb-6">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Momentan nicht aktiv</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-[280px] mx-auto">
                            In <strong className="text-slate-900">{zipCode}</strong> sind wir leider noch nicht.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button variant="outline" size="lg" className="w-full h-14 text-lg border-slate-200">
                                    Dennoch anfragen
                                </Button>
                            </Link>
                        </div>
                    </>
                 )}
              </div>
           </div>
        </div>
    )}
    </>
  );
}