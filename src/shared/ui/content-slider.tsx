"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/shared/data/service-data";

// --- HOOK: DRAG SCROLL (Bleibt gleich) ---
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

// --- CARD COMPONENT ---
interface SliderCardProps {
  item: ServiceItem;
  isActive: boolean;
  onHover: () => void;
  inactiveBgColor: string; 
  heightClass: string;
}

function SliderCard({ item, isActive, onHover, inactiveBgColor, heightClass }: SliderCardProps) {
  return (
    <div 
      onMouseEnter={onHover}
      style={{ 
        width: isActive ? "calc(15% + 300px)" : "calc(10% + 200px)",
        minWidth: "280px"
      }}
      className={`
        relative flex-shrink-0 
        ${heightClass} 
        flex flex-col justify-between p-8 md:p-10
        transition-all duration-500 ease-out overflow-hidden
        group select-none 
        border-r border-[var(--color-primary-deep)]/10 last:border-r-0
        
        ${isActive ? "bg-black" : inactiveBgColor}
      `}
    >
      <div className="flex justify-between items-start z-20">
        <span className={`text-xl font-bold transition-colors duration-500 ${isActive ? "text-white" : "text-[var(--color-primary-deep)]/30"}`}>
          {item.id}
        </span>
        
        <div className={`p-2 rounded-full transition-colors duration-500 ${isActive ? "bg-white/20 text-white backdrop-blur-sm" : "text-[var(--color-primary)] bg-white border border-[var(--color-primary-deep)]/5"}`}>
            <item.icon className="w-5 h-5" />
        </div>
      </div>

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

      <div className="relative z-20 mt-auto">
        <h3 className={`text-xl lg:text-2xl font-bold mb-3 leading-tight transition-colors duration-500 ${isActive ? "text-white" : "text-[var(--color-text-main)]"}`}>
          {item.title}
        </h3>
        
        <div className={`h-[1px] w-full my-4 transition-colors duration-500 ${isActive ? "bg-white/30" : "bg-[var(--color-primary-deep)]/10"}`} />
        
        <p className={`text-sm font-medium leading-relaxed transition-colors duration-500 line-clamp-3 ${isActive ? "text-white/90" : "text-slate-600"}`}>
          {item.description}
        </p>

        <div className={`mt-6 flex justify-end transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`}>
           <Link href={item.href} draggable={false} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-[var(--color-primary)]"}`}>
              Mehr erfahren
              <ArrowUpRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}

// --- MAIN SLIDER ---
interface ContentSliderProps {
  title: React.ReactNode;
  items: ServiceItem[];
  id: string;
  sectionBgColor?: string;
  titleColor?: string;
  inactiveCardBgColor?: string; 
  cardHeight?: string;
  paddingY?: string;
  borderBottom?: boolean;
}

export function ContentSlider({ 
    title, 
    items, 
    id, 
    sectionBgColor = "bg-white", 
    titleColor = "text-[var(--color-text-main)]",
    inactiveCardBgColor = "bg-slate-50",
    cardHeight = "h-[350px]", 
    paddingY = "py-20",
    borderBottom = true
}: ContentSliderProps) {

  const scrollRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging } = useDraggableScroll(scrollRef);
  const [activeIdx, setActiveIdx] = useState(0);

  // Hilfsfunktion: Führt das Scrollen nur aus, wenn wir es explizit wollen (Buttons)
  const performScroll = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cards = container.children;
      const targetCard = cards[index] as HTMLElement;
      
      if (targetCard) {
        // Padding links berücksichtigen
        const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
        const scrollPos = targetCard.offsetLeft - paddingLeft;
        
        container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
      }
    }
  };

  const nextSlide = () => {
    const next = (activeIdx + 1) % items.length;
    setActiveIdx(next);
    performScroll(next); // Scroll nur bei Klick!
  };

  const prevSlide = () => {
    const prev = (activeIdx - 1 + items.length) % items.length;
    setActiveIdx(prev);
    performScroll(prev); // Scroll nur bei Klick!
  };

  // FIX: useEffect entfernt! 
  // Kein automatisches Scrollen mehr, wenn activeIdx sich durch Hover ändert.

  return (
    <div className={`w-full ${sectionBgColor} overflow-hidden transition-colors duration-500 ${borderBottom ? 'border-b border-[var(--color-primary-deep)]/5' : ''} ${paddingY}`}>
      
      {/* HEADER: Titel + HERO BUTTONS */}
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between gap-4">
        <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight leading-none ${titleColor}`}>
          {title}
        </h2>

        {/* BUTTONS */}
        <div className="flex shrink-0 border border-[var(--color-primary-deep)]/10 bg-white">
          <button 
            onClick={prevSlide} 
            className="w-12 h-12 flex items-center justify-center bg-white hover:text-[var(--color-primary)] transition-colors border-r border-[var(--color-primary-deep)]/10 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="w-12 h-12 flex items-center justify-center bg-white hover:text-[var(--color-primary)] transition-colors group"
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* CONTAINER FÜR SCROLL */}
      <div 
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing no-scrollbar"
        // Startposition gefixt mit Padding Left
        style={{
            paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
            paddingRight: '1.5rem'
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item, index) => (
            <SliderCard 
                key={`${id}-${item.id}`}
                item={item}
                isActive={activeIdx === index}
                onHover={() => setActiveIdx(index)} // Ändert nur die Breite, scrollt NICHT
                inactiveBgColor={inactiveCardBgColor}
                heightClass={cardHeight}
            />
        ))}
        {/* Platzhalter am Ende */}
        <div className="w-12 flex-shrink-0" />
      </div>
    </div>
  );
}