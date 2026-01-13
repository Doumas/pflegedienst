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
          {/* Hier das Video für die "große" Szene (z.B. die Hände oder Pflege zu Hause) */}
          <source src="/videos/Patient_im_Rollstuhl_im_Park.mp4" type="video/mp4" />
        </video>
        {/* Leichter Overlay für edleren Look */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* 2. Das kleine Vordergrund-Video (Unten Links - Überlappend) */}
      {/* Der Border muss die gleiche Farbe haben wie dein Hintergrund (var(--color-secondary)), damit es "ausgeschnitten" wirkt */}
      <div className="absolute bottom-8 left-0 w-[55%] h-[50%]  overflow-hidden shadow-2xl z-10  border-[var(--color-secondary)]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Hier das Video für die "kleine" Szene (z.B. Park/Rollstuhl) */}
                    <source src="/videos/Fürsorgliche_Pflege_für_Senioren.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
}