"use client";

import Link from "next/link";
import { Star, Quote, CheckCircle2, ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/shared/ui/animated-background"; // <--- IMPORT

// Direkter Link zu den Rezensionen
const GOOGLE_REVIEW_LINK = "https://www.google.com/search?q=Dalas+Ambulanter+Intensivpflegedienst+Frankfurt+Rezensionen";

const reviews = [
  { 
    name: "Maria S.", 
    location: "aus Frankfurt", 
    text: "Ein Segen für unsere Familie. Die Schwestern sind immer pünktlich und sehr liebevoll zu meinem Vater.", 
    stars: 5, 
    initial: "M"
  },
  { 
    name: "Markus W.", 
    location: "aus Maintal", 
    text: "Top Beratung zur Pflegeeinstufung. Wir wussten gar nicht, was uns zusteht. Vielen Dank!", 
    stars: 5, 
    initial: "M"
  },
  { 
    name: "S. Yilmaz", 
    location: "aus Offenbach", 
    text: "Sehr zuverlässig und erreichbar. Auch am Wochenende hat alles geklappt. Klare Empfehlung.", 
    stars: 5, 
    initial: "S"
  }
];

// --- CUSTOM ICON FÜR SEKTIONS-HINTERGRUND (QUOTE) ---
const QuoteIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    </svg>
);

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return { ref, isInCenter };
}

// --- REVIEW CARD ---
function ReviewCard({ review }: { review: typeof reviews[0] }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "group relative bg-white p-8 rounded-[2rem] border border-white transition-all duration-500 flex flex-col justify-between transform-gpu h-full overflow-hidden",
                "items-center text-center lg:items-start lg:text-left",
                isInCenter 
                    ? "shadow-xl shadow-[var(--color-primary)]/10 scale-[1.02] border-[var(--color-primary)]/20" 
                    : "hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 hover:scale-[1.01]"
            )}
        >
            {/* KARTEN HINTERGRUND ICONS (Sterne) */}
            <AnimatedBackground icon={Star} variant="card" count={4} color="text-[var(--color-primary)]" />

            {/* Quote Icon - Teal (Primary) */}
            <Quote className={cn(
                "absolute w-10 h-10 fill-current transition-colors duration-500 pointer-events-none z-10",
                "top-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-8 lg:right-8",
                isInCenter ? "text-[var(--color-primary)]/10" : "text-slate-50 group-hover:text-[var(--color-primary)]/10"
            )} />

            <div className="relative z-10 w-full">
                {/* Header: Sterne & Badge */}
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-3 mb-6 w-full">
                    {/* Orange Sterne */}
                    <div className="flex text-[var(--color-accent)] gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current drop-shadow-sm" />)}
                    </div>
                    
                    {/* Verifiziert Badge */}
                    <div className={cn(
                        "flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full transition-all duration-300",
                        isInCenter ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                    )}>
                        <CheckCircle2 className="w-3 h-3" /> Verifiziert
                    </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed font-medium text-base mb-8 italic">
                    "{review.text}"
                </p>
            </div>

            {/* Footer: Author */}
            <div className="flex flex-col lg:flex-row items-center gap-4 pt-6 border-t border-slate-50 relative z-10 mt-auto w-full">
                {/* Initials Circle */}
                <div className={cn(
                    "w-12 h-12 rounded-full bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] font-bold text-lg shadow-sm shrink-0 transition-transform duration-500",
                    isInCenter ? "scale-110" : "group-hover:scale-110"
                )}>
                    {review.initial}
                </div>
                <div>
                    <div className="font-bold text-slate-900 leading-tight text-base">{review.name}</div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wide block mt-0.5">{review.location}</span>
                </div>
            </div>
        </div>
    );
}

export function GoogleReviews() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-secondary)] text-slate-900 overflow-hidden relative font-sans border-t border-white">
      
      {/* 1. SEKTIONS-HINTERGRUND (Quote Icons) */}
            <AnimatedBackground icon={Star} variant="section" count={4} color="text-[var(--color-primary)]" />

      {/* 2. Background Pattern */}
      <div className="absolute inset-0 opacity-[0.4] transform-gpu pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none transform-gpu z-0" />

      <div className="container px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-16 lg:mb-24">
          
          {/* NEUES BADGE MIT ANIMIERTEM ICON (Sprechblase + Stern) */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-primary)] text-xs font-bold tracking-wide uppercase shadow-sm mb-8">
                <motion.svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-4 h-4 text-[var(--color-accent)] overflow-visible"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Sprechblase */}
                    <motion.path 
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
                        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1 } } }}
                    />
                    {/* Stern (Ploppt auf) */}
                    <motion.path 
                       d="M12 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"
                       className="fill-[var(--color-accent)] stroke-none"
                       variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 1, type: "spring" } } }}
                    />
                </motion.svg>
                Kundenstimmen
            </div>
          </FadeIn>

          {/* GOOGLE BUTTON (Als sekundäres Element) */}
          <FadeIn delay={0.15}>
            <Link 
                href={GOOGLE_REVIEW_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block cursor-pointer mb-6" 
            >
                <div className="group inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-2 pr-6 py-2 shadow-sm hover:shadow-lg hover:border-[var(--color-primary)]/30 hover:scale-105 transition-all">
                    <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.04-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start text-left leading-none">
                        <span className="font-bold text-slate-900 text-xs group-hover:text-[var(--color-primary)] transition-colors mb-0.5">Google Bewertung</span>
                        <div className="flex items-center gap-1.5">
                            <span className="font-black text-slate-900 text-[11px]">4.9</span>
                            <div className="flex gap-0.5 text-[var(--color-accent)]">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
          </FadeIn>

           <FadeIn delay={0.2}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                Vertrauen, das man <br/>
                <span className="font-script text-[var(--color-primary)] text-[1.1em] relative inline-block px-1 mt-1 font-normal">
                    spüren kann.
                    {/* Orange Swoosh */}
                    <svg className="absolute w-[110%] h-3 -bottom-2 -left-1 text-[var(--color-accent)] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h2>
           </FadeIn>
          
          <FadeIn delay={0.3}>
              <p className="text-slate-600 max-w-2xl text-lg md:text-xl leading-relaxed font-medium">
                Die Zufriedenheit unserer Patienten ist unser höchstes Gut.
              </p>
          </FadeIn>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={0.4 + (i * 0.15)} direction="up" className="h-full">
                <ReviewCard review={review} />
            </FadeIn>
          ))}
        </div>

        {/* GOOGLE LINK BUTTON */}
        <FadeIn delay={0.8} direction="up" className="flex justify-center lg:justify-start">
            <Link href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer">
                <div className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }), 
                    "h-14 px-10 border-white bg-white/60 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/20 shadow-sm group cursor-pointer rounded-full font-bold transition-all text-base"
                )}>
                    Alle Bewertungen lesen
                    <ArrowUpRight className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>
        </FadeIn>

      </div>
    </section>
  );
}