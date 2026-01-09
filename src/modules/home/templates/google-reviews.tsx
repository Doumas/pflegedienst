"use client";

import Link from "next/link";
import { Star, Quote, CheckCircle2, ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button"; 
import { FadeIn } from "@/shared/ui/fade-in";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/shared/ui/animated-background";

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

function ReviewCard({ review }: { review: typeof reviews[0] }) {
    const { ref, isInCenter } = useInCenter();

    return (
        <div 
            ref={ref}
            className={cn(
                "group relative bg-white p-8 rounded-[2rem] border border-white transition-all duration-500 flex flex-col justify-between transform-gpu h-full overflow-hidden",
                "items-center text-center", // Zentrierung innerhalb der Karte
                isInCenter 
                    ? "shadow-xl shadow-[var(--color-primary)]/10 scale-[1.02] border-[var(--color-primary)]/20" 
                    : "hover:shadow-2xl hover:border-[var(--color-primary)]/20 hover:scale-[1.01]"
            )}
        >
            <AnimatedBackground icon={Star} variant="card" count={4} color="text-[var(--color-primary)]" />

            <div className="relative z-10 w-full">
                <div className="flex flex-col items-center gap-3 mb-6 w-full">
                    <div className="flex text-[var(--color-accent)] gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current drop-shadow-sm" />)}
                    </div>
                    <div className={cn(
                        "flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full transition-all duration-300",
                        isInCenter ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                    )}>
                        <CheckCircle2 className="w-3 h-3" /> Verifiziert
                    </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed font-medium text-base mb-8 italic">
                    &quot;{review.text}&quot;
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-50 relative z-10 mt-auto w-full">
                <div className={cn(
                    "w-12 h-12 rounded-full bg-[var(--color-secondary)] border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] font-bold text-lg shrink-0 transition-transform duration-500",
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
      
      {/* 1. SEKTIONS-HINTERGRUND (Icons) */}
      <AnimatedBackground 
            icon={Star} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={3} 
            className="opacity-80" 
      />
      
      <div className="absolute inset-0 opacity-[0.4] transform-gpu pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        
        {/* HEADER: Jetzt konsequent zentriert für Symmetrie */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          
          {/* Badge mit Animation */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase shadow-sm mb-8">
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <MessageCircle className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </motion.div>
                <span>Kundenstimmen</span>
            </div>
          </FadeIn>

           <FadeIn delay={0.2}>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight text-balance leading-[1.1]">
                Vertrauen, das man <br/>
                <span className="relative inline-block px-2 mt-2">
                    <span className="relative z-10 font-script text-[var(--color-accent)] font-bold text-[1.1em]">spüren kann.</span>
                    <svg className="absolute w-[110%] h-3 lg:h-5 -bottom-2 -left-[5%] text-[var(--color-accent)] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h2>
           </FadeIn>
          
          <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium text-pretty leading-relaxed">
                Die Zufriedenheit unserer Patienten ist unser höchstes Gut.
              </p>
          </FadeIn>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={0.4 + (i * 0.15)} direction="up" className="h-full">
                <ReviewCard review={review} />
            </FadeIn>
          ))}
        </div>

        {/* BUTTON: Jetzt durch umschließendes FadeIn perfekt zentriert */}
        <FadeIn delay={0.8} className="flex justify-center w-full">
            <Link href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <div className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }), 
                    "h-16 px-12 border-2 border-white bg-white/60 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/20 shadow-xl transition-all font-black text-lg rounded-[2rem] flex items-center justify-center gap-3 active:scale-95"
                )}>
                    Alle Rezensionen lesen
                    <ArrowUpRight className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
            </Link>
        </FadeIn>

      </div>
    </section>
  );
}