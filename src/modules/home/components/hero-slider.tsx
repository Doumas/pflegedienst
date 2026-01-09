"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { WhatsappFloatingButton } from "@/shared/ui/whatsapp-floating-button";
import { FadeIn } from "@/shared/ui/fade-in";
import { useInCenter } from "./hero-hooks"; // Importiert den Hook von nebenan

const STORY_SLIDES = [
  { id: 1, src: "/images/home/hero-bg.jpg", title: "", sub: "Jeden Tag aufs Neue." },
  { id: 2, src: "/images/home/hero-bg2.jpg", title: "", sub: "Rund um die Uhr da." },
  { id: 3, src: "/images/home/hero-bg3.jpg", title: "", sub: "Ein Team mit Herz." }
];

const SLIDE_INTERVAL = 5000;

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref: cardStackRef, isInCenter: cardStackActive } = useInCenter();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    // Observer nur für das Pausieren des Sliders
    const observer = new IntersectionObserver(([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
    });
    
    // Kleiner Trick: Wir hängen uns an das cardStackRef Element
    const el = cardStackRef.current;
    if (el) observer.observe(el);

    let timer: NodeJS.Timeout;
    if (isHeroVisible) {
        timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length); 
        }, SLIDE_INTERVAL);
    }

    return () => {
        clearInterval(timer);
        if(el) observer.unobserve(el);
        observer.disconnect();
    };
  }, [isHeroVisible, cardStackRef]);

  return (
    <div className="order-2 lg:col-start-2 lg:row-span-2 relative flex justify-center lg:justify-end py-6 lg:py-0">
        <FadeIn delay={0.4} direction="left" className="relative flex justify-center lg:justify-end">
            {/* Rotierende Kreise im Hintergrund */}
            {isHeroVisible && (
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[650px] h-[350px] lg:h-[650px] border border-[var(--color-primary)]/10 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] border border-[var(--color-accent)]/20 rounded-full animate-[spin_40s_linear_infinite_reverse] border-dashed" />
                </>
            )}

            {/* Der 3D Karten-Stapel */}
            <div 
                ref={cardStackRef} 
                className="relative z-10 w-[280px] sm:w-[360px] lg:w-[420px] aspect-[4/5] group perspective-1000 animate-float"
            >
                {/* Hinterste Karte */}
                <div className={cn(
                    "absolute inset-0 bg-[var(--color-primary)]/10 rounded-[2rem] lg:rounded-[2.5rem] border border-[var(--color-primary)]/20 transition-transform duration-700 ease-out",
                    (cardStackActive) ? "rotate-12 translate-x-6" : "rotate-6 translate-x-4",
                    "group-hover:rotate-12 group-hover:translate-x-6"
                )} />
                
                {/* Mittlere Karte */}
                <div className={cn(
                    "absolute inset-0 bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-xl z-10 transition-transform duration-700 ease-out",
                    (cardStackActive) ? "-rotate-6 -translate-x-4" : "-rotate-3 -translate-x-2",
                    "group-hover:-rotate-6 group-hover:-translate-x-4"
                )} />
                
                {/* Vorderste Karte (Mit Slider) */}
                <div className={cn(
                    "absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl shadow-[var(--color-primary)]/10 bg-white p-1.5 lg:p-2 z-20 overflow-hidden ring-1 ring-slate-100 transition-all duration-700 ease-out",
                    (cardStackActive) ? "rotate-0 scale-100" : "rotate-[-2deg]",
                    "group-hover:rotate-0"
                )}>
                    <div className="relative w-full h-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-slate-200 transform-gpu">
                        {STORY_SLIDES.map((slide, index) => {
                        const isActive = index === currentSlide;
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-transparent to-transparent opacity-90" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 pb-20 lg:p-10 lg:pb-12 text-white translate-y-2 pointer-events-none text-center">
                                    <p className="font-serif italic text-3xl lg:text-4xl mb-2 drop-shadow-md text-[var(--color-accent)]">
                                        {slide.title}
                                    </p>
                                    <p className="text-sm sm:text-base font-bold opacity-95 text-slate-100 tracking-wider uppercase">
                                        {slide.sub}
                                    </p>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
                
                {/* Whatsapp Button (schwebt am Stapel) */}
                <div className={cn(
                    "absolute z-30 -bottom-3 -left-1 lg:-bottom-6 lg:-left-4 w-max max-w-[calc(100vw-30px)] transition-transform duration-500",
                    (cardStackActive) ? "scale-105" : "scale-100",
                    "group-hover:scale-105"
                )}>
                    <WhatsappFloatingButton />
                </div>
            </div>
        </FadeIn>
    </div>
  );
}