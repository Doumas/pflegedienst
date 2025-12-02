import { Star } from "lucide-react";

const reviews = [
  {
    name: "Maria S.",
    date: "vor 3 Wochen",
    text: "Ein Segen für unsere Familie. Die Schwestern sind immer pünktlich und sehr liebevoll zu meinem Vater.",
    stars: 5
  },
  {
    name: "Markus Weber",
    date: "vor 2 Monaten",
    text: "Top Beratung zur Pflegeeinstufung. Wir wussten gar nicht, was uns zusteht. Vielen Dank an das ganze Team!",
    stars: 5
  },
  {
    name: "S. Yilmaz",
    date: "vor 1 Monat",
    text: "Sehr zuverlässig und erreichbar. Auch am Wochenende hat alles geklappt. Klare Empfehlung.",
    stars: 5
  }
];

export function GoogleReviews() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-50">
      <div className="container">
        
        {/* --- HEADER BEREICH --- */}
        <div className="flex flex-col items-center text-center mb-16">
          
          {/* Das Premium Badge (Mit buntem G-Logo) */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-2 shadow-sm mb-6 hover:scale-105 transition-transform cursor-default select-none">
            
            {/* Original Google SVG Logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            
            <span className="font-bold text-slate-700 text-sm">Google Bewertungen</span>
            
            {/* Trennstrich */}
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            
            {/* Sterne */}
            <div className="flex gap-0.5 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            
            <span className="text-slate-500 text-xs font-medium ml-1">4.9 / 5.0</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Vertrauen, das man spüren kann.
          </h2>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
            Nichts ist uns wichtiger als das Wohlbefinden unserer Patienten. Lesen Sie hier, 
            was Familien über die Zusammenarbeit mit uns sagen.
          </p>
        </div>

        {/* --- KARTEN GRID --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-1">
              
              {/* Karte Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                  {review.name.charAt(0)}
                </div>
                
                {/* Name & Sterne */}
                <div>
                  <div className="font-bold text-slate-900">{review.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Bewertungstext */}
              <p className="text-slate-600 leading-relaxed italic relative z-10">
                "{review.text}"
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}