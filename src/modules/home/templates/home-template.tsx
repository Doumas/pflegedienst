import { Hero } from "./hero";
import { QuickLinks } from "./quick-links"; // <--- NEU
import { GoogleReviews } from "./google-reviews";
import { AboutSection } from "./about-section";
import { FeatureGrid } from "@/modules/features/templates/feature-grid";
import { ProcessSteps } from "./process-steps";

export function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero (Bild) */}
      <Hero />

  
      
        {/* 5. Features */}
      <FeatureGrid />

      {/* 4. Über uns */}
      <AboutSection />

   

       {/* 3. Social Proof */}
      <GoogleReviews />
      

      {/* 6. Ablauf */}
      <ProcessSteps />
      
    </div>
  );
}