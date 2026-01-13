"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/shared/data/service-data";

// --- HELPER: DRAG SCROLL ---
// FIX: Hier haben wir "| null" hinzugefügt, damit TypeScript nicht meckert
function useDraggableScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging };
}

interface ContentSliderProps {
  title: React.ReactNode;
  items: ServiceItem[];
  id: string;
  bgColor?: string;
  textColor?: string;
}

export function ContentSlider({ title, items, id, bgColor = "bg-white", textColor = "text-[var(--color-text-main)]" }: ContentSliderProps) {
  // useRef wird mit null initialisiert, daher ist der Typ effektiv RefObject<HTMLDivElement | null>
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging } = useDraggableScroll(scrollRef);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // AUTO-PLAY
  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isPaused, isDragging, items.length]);

  // AUTO-SCROLL
  useEffect(() => {
    if (scrollRef.current && !isDragging) {
      const container = scrollRef.current;
      const cards = container.children;
      const targetCard = cards[activeIdx] as HTMLElement;

      if (targetCard) {
        const paddingLeft = window.innerWidth > 1400 ? (window.innerWidth - 1400) / 2 + 24 : 24;
        const scrollPos = targetCard.offsetLeft - paddingLeft; 
        
        container.scrollTo({
          left: Math.max(0, scrollPos),
          behavior: "smooth"
        });
      }
    }
  }, [activeIdx, isDragging]);

  const nextSlide = () => setActiveIdx((p) => (p + 1) % items.length);
  const prevSlide = () => setActiveIdx((p) => (p - 1 + items.length) % items.length);

  // Helper um zu prüfen ob der Hintergrund dunkel ist
  const isDarkBg = bgColor.includes("primary") || bgColor.includes("black");

  return (
    <div className={`py-20 lg:py-24 border-b border-[var(--color-primary-deep)]/5 last:border-0 w-full ${bgColor} overflow-hidden transition-colors duration-500`}>
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight ${textColor}`}>
          {title}
        </h2>

        {/* Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={prevSlide} 
            className={`p-3 border rounded-full transition-colors ${isDarkBg ? 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-[var(--color-primary)]' : 'bg-white border-slate-100 text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide} 
            className={`p-3 border rounded-full transition-colors ${isDarkBg ? 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-[var(--color-primary)]' : 'bg-white border-slate-100 text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTAINER */}
      <div 
        ref={scrollRef}
        className={`
          flex gap-0 overflow-x-auto pb-12 cursor-grab active:cursor-grabbing no-scrollbar w-full
          pl-6 pr-6 lg:pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]
        `}
        onMouseDown={onMouseDown}
        onMouseLeave={() => { onMouseLeave(); setIsPaused(false); }}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsPaused(true)}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {items.map((item, index) => {
          const isActive = activeIdx === index;

          return (
            <div 
              key={`${id}-${item.id}`}
              onMouseEnter={() => setActiveIdx(index)}
              className={`
                relative flex-shrink-0 
                w-[85vw] sm:w-[45vw] lg:w-[400px] h-[550px] 
                bg-white 
                flex flex-col justify-between p-10 
                transition-all duration-500 overflow-hidden
                group select-none 
                border-r border-[var(--color-primary-deep)]/10 last:border-r-0
              `}
            >
              {/* --- TOP: Nummer & Icon --- */}
              <div className="flex justify-between items-start z-20">
                <span className={`text-xl font-bold transition-colors duration-500 ${isActive ? "text-white" : "text-[var(--color-primary-deep)]/20"}`}>
                  {item.id}
                </span>
                <div className={`p-2 rounded-full transition-colors duration-500 ${isActive ? "bg-white/20 text-white backdrop-blur-sm" : "text-[var(--color-primary)] bg-[var(--color-secondary)]/30"}`}>
                    <item.icon className="w-6 h-6" />
                </div>
              </div>

              {/* --- BACKGROUND IMAGE --- */}
              <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${isActive ? "opacity-100" : "opacity-0"}`}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                  draggable={false} 
                />
                <div className="absolute inset-0 bg-black/40" /> 
              </div>

              {/* --- CONTENT --- */}
              <div className="relative z-20 mt-auto">
                <h3 className={`text-2xl lg:text-3xl font-bold mb-4 leading-tight transition-colors duration-500 ${isActive ? "text-white" : "text-[var(--color-text-main)]"}`}>
                  {item.title}
                </h3>
                
                <div className={`h-[1px] w-full my-5 transition-colors duration-500 ${isActive ? "bg-white/30" : "bg-[var(--color-primary-deep)]/10"}`} />
                
                <p className={`text-base font-medium leading-relaxed transition-colors duration-500 ${isActive ? "text-white/90" : "text-slate-600"}`}>
                  {item.description}
                </p>

                <div className={`mt-8 flex justify-end transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`}>
                   <Link href={item.href} draggable={false} className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-[var(--color-primary)]"}`}>
                      Mehr erfahren
                      <ArrowUpRight className="w-5 h-5" />
                   </Link>
                </div>
              </div>

              {/* --- PROGRESS BAR --- */}
              {isActive && !isPaused && (
                 <div className="absolute top-0 left-0 w-full h-[3px] bg-white/20 z-30">
                    <motion.div 
                        key={index}
                        initial={{ width: "0%" }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 4, ease: "linear" }} 
                        className="h-full bg-[var(--color-primary)]" 
                    />
                </div>
              )}

            </div>
          );
        })}
        
        <div className="w-[10vw] flex-shrink-0" />
      </div>
    </div>
  );
}