"use client";

import { useState } from "react";
import { Heart, UserCheck, Users, Award, MapPin } from "lucide-react";
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { SectionTracker } from "@/shared/ui/section-tracker";

// Importiere die neuen Sub-Templates
import { AboutHero } from "./about-hero";
import { AboutConcept } from "./about-concept";
import { AboutTeam } from "./about-team";
import { AboutQuality } from "./about-quality";
import { AboutLocation } from "./about-location";
import { FlyerModal } from "./flyer-modal";

export function AboutTemplate() {
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);

  const openFlyer = () => setIsFlyerOpen(true);
  const closeFlyer = () => setIsFlyerOpen(false);

  return (
    <>
      <div className="hide-on-print relative min-h-screen bg-white font-sans pb-20 selection:bg-[var(--color-primary)]/20 overflow-hidden">
        
        {/* GLOBALER HINTERGRUND */}
        <AnimatedBackground icon={Heart} variant="section" color="text-[var(--color-primary)]" />
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none transform-gpu z-0" 
             style={{ backgroundImage: 'radial-gradient(var(--color-border-soft) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[var(--color-secondary)]/60 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />

        <div className="relative z-10">
          
          <SectionTracker icon={Heart} id="about-hero">
             <AboutHero />
          </SectionTracker>

          <SectionTracker icon={UserCheck} id="about-concept">
             <AboutConcept onOpenFlyer={openFlyer} />
          </SectionTracker>

          <SectionTracker icon={Users} id="about-team">
             <AboutTeam />
          </SectionTracker>

          <SectionTracker icon={Award} id="about-quality">
             <AboutQuality />
          </SectionTracker>

          <SectionTracker icon={MapPin} id="about-location">
             <AboutLocation />
          </SectionTracker>

        </div>
      </div>

      {/* FLYER MODAL */}
      {isFlyerOpen && <FlyerModal onClose={closeFlyer} />}
    </>
  );
}