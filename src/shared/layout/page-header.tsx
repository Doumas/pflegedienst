import Image from "next/image";
import { siteConfig } from "@/config/site"; // Optional, falls wir Fallback-Texte brauchen

type PageHeaderProps = {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
};

export function PageHeader({ 
  title, 
  description, 
  imageSrc, 
  imageAlt = "Header Bild" 
}: PageHeaderProps) {
  return (
    // FIX:
    // 1. min-h-[50vh]: Nimmt immer mindestens den halben Bildschirm ein (Responsive!).
    // 2. pt-40: Sicherer Abstand von oben (unter dem Header).
    // 3. pb-24: Genug Luft nach unten.
    // KEINE feste 'h-[400px]' mehr!
    <section className="relative w-full min-h-[50vh] flex flex-col justify-start pt-40 pb-24 overflow-hidden font-sans text-white">
      
      {/* Hintergrund */}
      <div className="absolute inset-0 -z-20">
        <Image 
          src={imageSrc} 
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Filter */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      
      {/* Inhalt */}
      <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Deko-Strich */}
        <div className="w-16 h-1.5 bg-primary mx-auto mb-8 rounded-full shadow-sm" />

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 drop-shadow-xl">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            {description}
          </p>
        )}
      </div>

    </section>
  );
}