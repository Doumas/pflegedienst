import { Quote } from "lucide-react";

export function ParallaxSeparator() {
  return (
    <section 
      className="relative py-32 bg-fixed bg-center bg-cover flex items-center justify-center overflow-hidden"
      // Hier nutzen wir das Hero-Bild als Platzhalter. Du kannst auch ein 'parallax.jpg' hochladen.
      style={{ backgroundImage: 'url(/images/home/hero-bg.jpg)' }}
    >
      
      {/* 1. Farb-Filter (Markenfarbe) */}
      {/* bg-primary mit hoher Deckkraft (90%), damit das Bild nur subtil durchscheint */}
      <div className="absolute inset-0 bg-primary/90" />

      {/* 2. Muster-Overlay (Der "Brudi"-Effekt) */}
      {/* Ein feines Raster-Muster für mehr Textur */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(white 2px, transparent 2px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* 3. Inhalt */}
      <div className="container relative z-10 text-center text-white px-4">
        <Quote className="w-12 h-12 mx-auto mb-6 opacity-80" />
        
        <blockquote className="text-2xl md:text-4xl font-bold leading-snug max-w-4xl mx-auto mb-6">
          "Pflege ist für uns nicht nur ein Beruf, sondern eine Berufung. 
          Jeder Mensch hat das Recht auf ein würdevolles Leben im eigenen Zuhause."
        </blockquote>
        
        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
      </div>

    </section>
  );
}