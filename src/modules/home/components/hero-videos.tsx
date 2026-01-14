"use client";

export function HeroVideos() {
  return (
    // FIX: 
    // 1. lg:h-[550px] -> Feste Höhe auf Desktop. Verhindert das "Zusammendrücken".
    // 2. lg:max-w-[650px] -> Maximale Breite. Verhindert das "Ausleiern" nach rechts.
    // 3. lg:ml-auto -> Schiebt die Box im Grid-Container nach rechts (Hunter Style).
    // 4. w-full -> Auf kleineren Screens nimmt es den Platz, den es kriegt.
    <div className="relative w-full h-[400px] lg:h-[550px] lg:max-w-[650px] lg:ml-auto">
      
      {/* 1. Das große Hintergrund-Video (Oben Rechts) */}
      <div className="absolute top-0 right-0 w-[85%] h-[80%] overflow-hidden shadow-lg z-0 rounded-sm">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Patient_im_Rollstuhl_im_Park.mp4" type="video/mp4" />
        </video>
        
        {/* BRAND LAYER */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 2. Das kleine Vordergrund-Video (Unten Links) */}
      <div className="absolute bottom-8 left-0 w-[55%] h-[50%] overflow-hidden shadow-2xl z-10 rounded-sm">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Fürsorgliche_Pflege_für_Senioren.mp4" type="video/mp4" />
        </video>

        {/* BRAND LAYER */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 mix-blend-multiply pointer-events-none" />
      </div>

    </div>
  );
}