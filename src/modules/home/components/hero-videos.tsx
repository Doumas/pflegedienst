"use client";

export function HeroVideos() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-full">
      
      {/* 1. Das große Hintergrund-Video (Oben Rechts) */}
      <div className="absolute top-0 right-0 w-[85%] h-[80%] overflow-hidden shadow-lg z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Patient_im_Rollstuhl_im_Park.mp4" type="video/mp4" />
        </video>
        
        {/* BRAND LAYER: Hauchdünnes Türkis (Primary) im "Multiply" Modus. 
            Das färbt die dunklen Stellen leicht ein, behält aber den Kontrast. */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 2. Das kleine Vordergrund-Video (Unten Links) */}
      {/* FIX: Border entfernt! Nur Shadow bleibt. */}
      <div className="absolute bottom-8 left-0 w-[55%] h-[50%] overflow-hidden shadow-2xl z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Fürsorgliche_Pflege_für_Senioren.mp4" type="video/mp4" />
        </video>

        {/* BRAND LAYER: Auch hier für einheitlichen Look */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 mix-blend-multiply pointer-events-none" />
      </div>

    </div>
  );
}