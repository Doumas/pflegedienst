"use client"; 

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button"; 
import { MapPin, CheckCircle2, Loader2, Star, X } from "lucide-react"; 
import { cn } from "@/shared/utils/cn";
import { WhatsappFloatingButton } from "@/shared/ui/whatsapp-floating-button"; 

// --- BILDER & DATEN ---
const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces&q=80"
];

const STORY_SLIDES = [
  { id: 1, src: "/images/home/hero-bg.jpg", title: "Fürsorge.", sub: "Jeden Tag aufs Neue." },
  { id: 2, src: "/images/home/hero-bg2.jpg", title: "Sicherheit.", sub: "Rund um die Uhr für Sie da." },
  { id: 3, src: "/images/home/hero-bg3.jpg", title: "Vertrauen.", sub: "Ein Team, das sich kümmert." }
];

const SLIDE_INTERVAL = 5000;

// --- HELPER HOOK: Erkenne, ob Element in der Mitte ist (für Mobile Auto-Hover) ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // IntersectionObserver prüft Sichtbarkeit
        const observer = new IntersectionObserver(([entry]) => {
            // Wenn Element in der Mitte des Bildschirms ist (durch rootMargin definiert)
            setIsInCenter(entry.isIntersecting);
        }, {
            // Dieser "Margin" definiert einen schmalen Streifen in der Mitte des Bildschirms
            // Alles was da durchläuft, triggert den Effekt.
            rootMargin: "-40% 0px -40% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // States für PLZ Check
  const [zipCode, setZipCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [checkResult, setCheckResult] = useState<"success" | "error" | null>(null);
  const [checkMessage, setCheckMessage] = useState("");

  // Hook für die Karten-Animation
  const { ref: cardStackRef, isInCenter: cardStackActive } = useInCenter();
  // Hook für das PLZ Widget (Optional, falls das auch leuchten soll)
  const { ref: widgetRef, isInCenter: widgetActive } = useInCenter();

  // Performance: Pausiere den Slider, wenn User nicht hinschaut
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    // Einfacher Observer für den ganzen Hero-Bereich
    const observer = new IntersectionObserver(([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
    });
    
    const heroSection = document.getElementById('hero-section');
    if (heroSection) observer.observe(heroSection);

    let timer: NodeJS.Timeout;
    
    // Slider läuft nur, wenn Hero sichtbar ist
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
    <section id="hero-section" className="relative w-full overflow-hidden pt-6 pb-12 lg:pt-28 lg:pb-48 flex items-center lg:min-h-[85vh]">
      
      {/* 1. HINTERGRUND FX - Nur rendern/animieren wenn sichtbar */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none -z-30 transform-gpu" 
           style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* Auf Mobile statisch, auf Desktop animiert - spart Akku */}
      {isHeroVisible && (
          <>
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] lg:w-[1000px] h-[500px] lg:h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[80px] lg:blur-[120px] opacity-70 pointer-events-none -z-20 md:animate-pulse transform-gpu will-change-transform" style={{ animationDuration: '8s' }} />
            <div className="absolute top-[10%] right-[-10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[100px] md:animate-pulse pointer-events-none -z-20 transform-gpu will-change-transform" style={{ animationDuration: '6s' }} />
          </>
      )}
      <div className="absolute bottom-0 left-[-10%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[50px] lg:blur-[80px] pointer-events-none -z-20 transform-gpu" />
      <div className="absolute bottom-0 left-0 right-0 h-24 lg:h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-0 pointer-events-none transform-gpu" />


      {/* 2. CONTENT */}
      <div className="container relative z-10 px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center lg:items-start">
          
          {/* TEXT CONTENT */}
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-0 fill-mode-both">
              <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-white border border-[var(--color-border-soft)] shadow-sm hover:border-[var(--color-primary)]/30 transition-colors cursor-default">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                </span>
                <span className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ihr Pflegedienst in Frankfurt
                </span>
              </div>
            </div>

           <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
              Gut versorgt. <br/>
              <span className="relative inline-block px-1">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                   Zuhause leben.
                 </span>
                 <svg className="absolute w-full h-2 lg:h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                 </svg>
              </span>
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both text-base lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              Ihr verlässlicher Partner in Frankfurt. Wir verbinden <span className="font-bold text-slate-900">fachliche Kompetenz</span> mit echter Zuwendung – damit Sie sich in Ihren vier Wänden sicher fühlen.
            </p>
          </div>

          {/* VISUAL STACK - AUTO-HOVER AUF MOBILE */}
          <div className="order-2 lg:col-start-2 lg:row-span-2 relative flex justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-300 py-2 lg:py-0 fill-mode-both">
            
            {/* Kreise drehen sich nur, wenn sichtbar */}
            {isHeroVisible && (
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[650px] h-[350px] lg:h-[650px] border border-[var(--color-primary)]/10 rounded-full animate-[spin_60s_linear_infinite] transform-gpu will-change-transform" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] border border-[var(--color-accent)]/20 rounded-full animate-[spin_40s_linear_infinite_reverse] border-dashed transform-gpu will-change-transform" />
                </>
            )}

            {/* KARTEN STACK - HIER IST DIE MAGIE */}
            <div 
                ref={cardStackRef} // Observer Reference
                className="relative z-10 w-[260px] sm:w-[340px] lg:w-[380px] aspect-[4/5] group perspective-1000 animate-float"
            >
               
               {/* Hintere Karte: Reagiert auf Hover (Desktop) ODER Scroll-Position (Mobile) */}
               <div className={cn(
                   "absolute inset-0 bg-[var(--color-primary)]/5 rounded-[2rem] lg:rounded-[2.5rem] border border-[var(--color-primary)]/10 will-change-transform transition-transform duration-700 ease-out",
                   // Wenn Maus drüber ODER in Mobile-Mitte -> Aufklappen!
                   (cardStackActive) ? "rotate-12 translate-x-6" : "rotate-6 translate-x-4",
                   "group-hover:rotate-12 group-hover:translate-x-6" // Fallback für Desktop Maus
               )} />
               
               {/* Mittlere Karte */}
               <div className={cn(
                   "absolute inset-0 bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 shadow-xl z-10 will-change-transform transition-transform duration-700 ease-out",
                   (cardStackActive) ? "-rotate-6 -translate-x-4" : "-rotate-3 -translate-x-2",
                   "group-hover:-rotate-6 group-hover:-translate-x-4"
               )} />
               
               {/* Vordere Karte */}
               <div className={cn(
                   "absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl shadow-slate-300/50 bg-white p-1.5 lg:p-2 z-20 overflow-hidden ring-1 ring-slate-100 will-change-transform transition-all duration-700 ease-out",
                   (cardStackActive) ? "rotate-0 scale-100" : "rotate-[-2deg]",
                   "group-hover:rotate-0"
               )}>
                  <div className="relative w-full h-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-slate-200 transform-gpu">
                     {STORY_SLIDES.map((slide, index) => {
                       const isActive = index === currentSlide;
                       // Performance: Render nur aktive und nächste Slide um DOM klein zu halten
                       // (Hier lassen wir alle, da es nur 3 sind und wir Fading brauchen, aber wir priorisieren das Laden)
                       return (
                         <div key={slide.id} className={cn("absolute inset-0 transition-opacity duration-[1500ms]", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}>
                            <Image 
                                src={slide.src} 
                                alt={slide.title} 
                                fill 
                                className={cn("object-cover transition-transform duration-[8000ms]", isActive ? "scale-110" : "scale-100")} 
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 50vw" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)]/80 via-transparent to-transparent" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 pb-20 lg:p-8 lg:pb-8 text-white translate-y-2 pointer-events-none">
                                  <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 drop-shadow-md">{slide.title}</p>
                                  <p className="text-xs sm:text-sm opacity-90 text-slate-100">{slide.sub}</p>
                            </div>
                         </div>
                       );
                     })}
                  </div>
               </div>

               {/* WhatsApp Button - Hüpft kurz, wenn im Fokus */}
               <div className={cn(
                   "absolute z-30 -bottom-3 -left-1 lg:-bottom-6 lg:-left-4 w-max max-w-[calc(100vw-30px)] transition-transform duration-500 transform-gpu",
                   (cardStackActive) ? "scale-105" : "scale-100",
                   "group-hover:scale-105"
               )}>
                  <WhatsappFloatingButton />
               </div>
            </div>
            
          </div>

          {/* 3. PLZ CHECK WIDGET - Reagiert auch auf Scrollen */}
          <div ref={widgetRef} className="order-3 lg:col-start-1 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both max-w-lg mx-auto lg:mx-0 pt-2 lg:pt-0 transform-gpu">
                <div className={cn(
                    "bg-white rounded-[2rem] p-4 xs:p-5 lg:p-6 shadow-xl shadow-slate-200/60 border ring-1 ring-slate-50 relative overflow-hidden transition-all duration-500 group/widget",
                    // Wenn Widget in der Mitte des Screens -> Leichter Glow Effekt (User Feedback)
                    (widgetActive) ? "border-[var(--color-primary)]/30 shadow-[var(--color-primary)]/10 scale-[1.02]" : "border-slate-100 shadow-slate-200/60 scale-100",
                    "hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20"
                )}>
                    <form onSubmit={handleCheck} className="flex flex-col gap-4 lg:gap-5">
                        <div>
                            <label className="text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 lg:mb-2 block group-hover/widget:text-[var(--color-primary)] transition-colors">
                                Nehmen Sie noch Patienten auf?
                            </label>
                            <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-tight text-balance">
                                Jetzt Verfügbarkeit für Ihre Region prüfen.
                            </h3>
                        </div>
                        
                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-full p-1.5 transition-all shadow-inner group-hover/widget:bg-white group-hover/widget:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)]/50 focus-within:bg-white">
                            <MapPin className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Ihre Postleitzahl" 
                                className="w-full h-12 pl-10 pr-28 bg-transparent border-none text-slate-900 font-bold placeholder:font-normal focus:ring-0 text-lg rounded-full outline-none"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, '').slice(0,5))}
                            />
                            <button 
                                type="submit"
                                disabled={zipCode.length < 5 || isChecking}
                                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 lg:px-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-full transition-all shadow-md shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-sm min-w-[90px] lg:min-w-[100px] active:scale-95"
                            >
                                {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "Prüfen"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 lg:pt-8 ml-2 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-forwards">
                   <div className="flex -space-x-3">
                      {AVATAR_IMAGES.map((src, i) => (
                         <div key={i} className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full border-[3px] border-white shadow-sm overflow-hidden ring-1 ring-slate-100 bg-slate-100 hover:scale-110 transition-transform z-0 hover:z-10">
                            <Image src={src} alt="Kunden" fill className="object-cover" sizes="40px" />
                         </div>
                      ))}
                   </div>
                   <div className="text-sm text-left">
                      <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-current" />)}
                      </div>
                      <span className="font-medium text-slate-600 text-xs sm:text-sm">
                        Vertrauen von <span className="font-bold text-slate-900">500+ Familien</span>.
                      </span>
                   </div>
                </div>

          </div>

        </div>
      </div>
    </section>

    {/* Result Modal */}
    {resultModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[var(--color-primary-deep)]/40 backdrop-blur-sm" onClick={closeResultModal} />
           <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 ring-1 ring-slate-100">
              <div className="absolute top-4 right-4 z-10">
                 <button onClick={closeResultModal} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-8 pt-12 pb-10">
                 {checkResult === "success" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-white shadow-xl shadow-green-100 flex items-center justify-center text-green-600 mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Kapazität verfügbar!</h3>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-[280px] mx-auto">
                            Gute Nachrichten! Wir fahren in <strong className="text-slate-900 bg-green-50 px-2 py-0.5 rounded-lg">{zipCode}</strong> an.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button size="lg" className="w-full h-14 text-lg">
                                    Jetzt Erstgespräch sichern
                                </Button>
                            </Link>
                            <button onClick={closeResultModal} className="text-sm font-bold text-slate-400 hover:text-[var(--color-primary)] py-2">
                                Schließen
                            </button>
                        </div>
                    </>
                 )}
                 {checkResult === "error" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-white shadow-xl shadow-slate-100 flex items-center justify-center text-slate-400 mb-6">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Nicht in Ihrem Gebiet</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-[280px] mx-auto">
                            In <strong className="text-slate-900">{zipCode}</strong> sind wir momentan leider noch nicht aktiv.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button variant="outline" size="lg" className="w-full h-14 text-lg">
                                    Dennoch anfragen
                                </Button>
                            </Link>
                            <button onClick={closeResultModal} className="text-sm font-bold text-slate-400 hover:text-slate-600 py-2">
                                Andere PLZ prüfen
                            </button>
                        </div>
                    </>
                 )}
              </div>
              <div className="h-2 w-full bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent opacity-50"></div>
           </div>
        </div>
    )}
    </>
  );
}