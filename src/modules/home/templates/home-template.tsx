"use client";
import { Hero } from "./hero";
// import { TrustBar } from "./trust-bar"; // <--- LÖSCHEN oder Auskommentieren
import { CareConfigurator } from "./care-configurator"; 
import { GoogleReviews } from "./google-reviews";
import { AboutSection } from "./about-section";
import { FeaturesAndServices } from "@/modules/features/templates/FeaturesAndServices";
import { FaqSection } from "./faq-section"; 
import { CareerTeaser } from "./career-teaser"; 
import { ProcessSteps } from "./process-steps";

export function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. & 3. KOMBINIERT: Power-Card (Configurator + Trust Footer) */}
      {/* Die TrustBar ist jetzt TEIL dieser Komponente. 
          Das alte <TrustBar /> Tag muss weg! */}
      <CareConfigurator />

      {/* 4. BRAND STORY */}
      <AboutSection />

      {/* 5. SERVICES */}
      <FeaturesAndServices />

      {/* 6. HOW-TO */}
      <ProcessSteps />

      {/* 7. SOCIAL PROOF */}
      <GoogleReviews />

      {/* 8. OBJECTION HANDLING */}
      <FaqSection />

      {/* 9. RECRUITING */}
      <CareerTeaser />
      
    </div>
  );
}