"use client";

export function HeroVideos() {
  return (
    // Responsive Wrapper:
    // Mobil/Tablet: Begrenzte Breite und zentriert (max-w-[550px] mx-auto)
    // Desktop: Rechtsbündig im Grid (lg:ml-auto)
    <div className="relative w-full max-w-[550px] mx-auto lg:mx-0 lg:ml-auto h-[350px] md:h-[450px] lg:h-[480px]">
      
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
        
        {/* BRAND LAYER: Hier nutzen wir jetzt CREME (Secondary) für den warmen Look */}
        <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-20 mix-blend-multiply pointer-events-none" />
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

        {/* BRAND LAYER: Auch hier CREME Overlay */}
        <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-20 mix-blend-multiply pointer-events-none" />
      </div>

    </div>
  );
}