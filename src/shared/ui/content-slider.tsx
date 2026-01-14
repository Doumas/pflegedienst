"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/shared/data/service-data";

// --- HOOK: DRAG SCROLL ---
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
  isPaused: boolean;
  inactiveBgColor: string; 
  heightClass: string;
}

function SliderCard({ item, isActive, onHover, isPaused, inactiveBgColor, heightClass }: SliderCardProps) {
  return (
    <div 
      onMouseEnter={onHover}
      className={`
        relative flex-shrink-0 
        /* FIX: Höhe 350px (fest) & Breite 450px (Hunter-Breite) */
        w-[85vw] md:w-[450px]
        ${heightClass} 
        flex flex-col justify-between p-8 md:p-10
        transition-all duration-500 overflow-hidden
        group select-none 
        border-r border-[var(--color-primary-deep)]/10 last:border-r-0
        
        ${isActive ? "bg-black" : inactiveBgColor}
      `}
    >
      {/* TOP: Nummer & Icon */}
      <div className="flex justify-between items-start z-20">
        <span className={`text-xl font-bold transition-colors duration-500 ${isActive ? "text-white" : "text-[var(--color-primary-deep)]/30"}`}>
          {item.id}
        </span>
        
        <div className={`p-2 rounded-full transition-colors duration-500 ${isActive ? "bg-white/20 text-white backdrop-blur-sm" : "text-[var(--color-primary)] bg-white border border-[var(--color-primary-deep)]/5"}`}>
            <item.icon className="w-5 h-5" />
        </div>
      </div>

      {/* BACKGROUND IMAGE */}
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

      {/* CONTENT */}
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

      {/* PROGRESS BAR */}
      {isActive && !isPaused && (
         <div className="absolute top-0 left-0 w-full h-[3px] bg-white/20 z-30">
            <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 4, ease: "linear" }} 
                className="h-full bg-[var(--color-primary)]" 
            />
        </div>
      )}
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isPaused, isDragging, items.length]);

  useEffect(() => {
    if (scrollRef.current && !isDragging) {
      const container = scrollRef.current;
      const cards = container.children;
      const targetCard = cards[activeIdx] as HTMLElement;
      if (targetCard) {
        // Logik: Wir scrollen zur Karte. Da der Container selbst schon Margin hat,
        // ist offsetLeft = 0 die erste Karte.
        const scrollPos = targetCard.offsetLeft; 
        container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
      }
    }
  }, [activeIdx, isDragging]);

  const nextSlide = () => setActiveIdx((p) => (p + 1) % items.length);
  const prevSlide = () => setActiveIdx((p) => (p - 1 + items.length) % items.length);

  const isDarkSection = sectionBgColor.includes("primary") || sectionBgColor.includes("black");
  const buttonClass = isDarkSection 
    ? "bg-white/10 border-white/20 text-white hover:bg-white hover:text-[var(--color-primary)]" 
    : "bg-white border-slate-100 text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

  return (
    <div className={`w-full ${sectionBgColor} overflow-hidden transition-colors duration-500 ${borderBottom ? 'border-b border-[var(--color-primary-deep)]/5' : ''} ${paddingY}`}>
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight ${titleColor}`}>
          {title}
        </h2>

        {/* Buttons */}
        <div className="flex gap-2">
          <button onClick={prevSlide} className={`p-3 border rounded-full transition-colors ${buttonClass}`}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={nextSlide} className={`p-3 border rounded-full transition-colors ${buttonClass}`}>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTAINER FÜR SCROLL */}
      {/* HIER IST DER FIX: 
          Wir nutzen style-Attribut für dynamisches Margin.
          Margin-left schiebt die Box nach rechts -> alles links davon ist "Wand".
          Width = 100vw minus Margin, damit es rechts bis zum Rand geht.
          1280px ist die Breite von container max-w-7xl.
      */}
      <div 
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing no-scrollbar"
        style={{
            marginLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
            width: 'calc(100vw - max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem)))'
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={() => { onMouseLeave(); setIsPaused(false); }}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsPaused(true)}
      >
        {items.map((item, index) => (
            <SliderCard 
                key={`${id}-${item.id}`}
                item={item}
                isActive={activeIdx === index}
                onHover={() => setActiveIdx(index)}
                isPaused={isPaused}
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