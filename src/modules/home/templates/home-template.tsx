"use client";

// Bestehende Imports
import { Hero } from "./hero";
import { CareConfigurator } from "./care-configurator"; 
import { GoogleReviews } from "./google-reviews";
import { AboutSection } from "./about-section";
import { FeaturesAndServices } from "@/modules/home/templates/FeaturesAndServices";
import { FaqSection } from "./faq-section"; 
import { CareerTeaser } from "./career-teaser"; 
import { ProcessSteps } from "./process-steps";

// --- NEU: Imports für die Header-Logik ---
import { SectionTracker } from "@/shared/ui/section-tracker";
import { 
  Home, 
  ClipboardCheck, 
  Users, 
  Heart, 
  Compass, 
  Star, 
  HelpCircle, 
  Briefcase 
} from "lucide-react";

export function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION -> Home Icon */}
      <SectionTracker icon={Home} id="hero">
        <Hero />
      </SectionTracker>

      {/* 2. & 3. Configurator -> ClipboardCheck (Passt zum "Profi-Check") */}
      <SectionTracker icon={ClipboardCheck} id="pflege-check">
        <CareConfigurator />
      </SectionTracker>

      {/* 4. BRAND STORY -> Users (Team/Philosophie) */}
      <SectionTracker icon={Users} id="ueber-uns">
        <AboutSection />
      </SectionTracker>

      {/* 5. SERVICES -> Heart (Pflege/Leistungen) */}
      <SectionTracker icon={Heart} id="leistungen">
        <FeaturesAndServices />
      </SectionTracker>

      {/* 6. HOW-TO -> Compass (Wegweiser/Ablauf) */}
      <SectionTracker icon={Compass} id="ablauf">
        <ProcessSteps />
      </SectionTracker>

      {/* 7. SOCIAL PROOF -> Star (Bewertungen) */}
      <SectionTracker icon={Star} id="bewertungen">
        <GoogleReviews />
      </SectionTracker>

      {/* 8. OBJECTION HANDLING -> HelpCircle (FAQ) */}
      <SectionTracker icon={HelpCircle} id="faq">
        <FaqSection />
      </SectionTracker>

      {/* 9. RECRUITING -> Briefcase (Karriere) */}
      <SectionTracker icon={Briefcase} id="karriere">
        <CareerTeaser />
      </SectionTracker>
      
    </div>
  );
}