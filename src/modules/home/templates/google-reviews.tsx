import { Star, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const reviews = [
  { 
    name: "Maria S.", 
    date: "vor 3 Wochen", 
    text: "Ein Segen für unsere Familie. Die Schwestern sind immer pünktlich und sehr liebevoll zu meinem Vater.", 
    stars: 5, 
    initial: "M",
    delay: "delay-0" // Keine Verzögerung
  },
  { 
    name: "Markus W.", 
    date: "vor 2 Monaten", 
    text: "Top Beratung zur Pflegeeinstufung. Wir wussten gar nicht, was uns zusteht. Vielen Dank!", 
    stars: 5, 
    initial: "M",
    delay: "delay-100" // 100ms Verzögerung
  },
  { 
    name: "S. Yilmaz", 
    date: "vor 1 Monat", 
    text: "Sehr zuverlässig und erreichbar. Auch am Wochenende hat alles geklappt. Klare Empfehlung.", 
    stars: 5, 
    initial: "S",
    delay: "delay-200" // 200ms Verzögerung
  }
];

export function GoogleReviews() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-secondary)] text-slate-900 border-b border-white overflow-hidden relative">
      
      {/* Background Pattern: Sehr subtil */}
      <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      
      {/* Dekoratives Element: Weicher Verlauf unten */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        
        {/* HEADER BEREICH */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          
          {/* BADGE: Jetzt mit echtem Google G für mehr Trust */}
          <div className="inline-flex items-center gap-3 bg-white border border-[var(--color-border-soft)] rounded-full pl-1.5 pr-6 py-1.5 shadow-sm mb-8 animate-in fade-in zoom-in duration-700">
            <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
               {/* Google G SVG */}
               <svg viewBox="0 0 24 24" className="w-4 h-4">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
            </div>
            <div className="flex flex-col items-start text-left leading-none">
                <span className="font-bold text-slate-900 text-xs">Google Bewertung</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-black text-slate-900 text-[10px]">4.9</span>
                    <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                    </div>
                </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 text-balance">
            Vertrauen, das man <br/>
            <span className="relative inline-block px-2">
               <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                 spüren kann.
               </span>
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-accent)] -z-0 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
               </svg>
            </span>
          </h2>
          
          <p className="text-slate-600 max-w-2xl text-lg md:text-xl leading-relaxed font-medium">
            Die Zufriedenheit unserer Patienten ist unser höchstes Gut.
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className={cn(
                "group relative bg-white p-8 rounded-[2rem] border border-white transition-all duration-500 flex flex-col justify-between",
                // ANIMATION: Sanftes Erscheinen mit Verzögerung (Staggered)
                "animate-in fade-in slide-in-from-bottom-8 fill-mode-both",
                review.delay,
                // INTERAKTION: Kein "Hüpfen" mehr, sondern ein "Leuchten" und sanfter Schatten
                "hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20"
              )}
            >
              
              {/* Deko Zitat im Hintergrund der Karte */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 fill-current group-hover:text-[var(--color-primary)]/5 transition-colors duration-500" />

              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current drop-shadow-sm" />)}
                    </div>
                    {/* Verifiziert Icon */}
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle2 className="w-3 h-3" /> Verifiziert
                    </div>
                 </div>
                 
                 <p className="text-slate-700 leading-relaxed font-medium mb-8">
                   "{review.text}"
                 </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)] border border-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-lg shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {review.initial}
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">{review.name}</div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}