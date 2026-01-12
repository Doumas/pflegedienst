"use client";

// --- 1. CORE COMPONENTS ---
import { Hero } from "./hero";
import { CareConfigurator } from "./care-configurator"; 
import { GoogleReviews } from "./google-reviews";
import { AboutSection } from "./about-section";
import { FaqSection } from "./faq-section"; 
import { CareerTeaser } from "./career-teaser"; 
import { ProcessSteps } from "./process-steps";

// --- 2. NEW "HUNTER STYLE" COMPONENTS ---
import { StatsSection } from "@/modules/home/components/stats-section";
import { ServiceSectorSlider } from "@/modules/home/components/service-sector-slider";
import { ContactGridSection } from "@/modules/home/components/contact-grid-section";
import { ResourceDownloadSection } from "@/modules/home/components/resource-download-section"; // <--- NEU

// --- 3. SHARED UI ---
import { SectionTracker } from "@/shared/ui/section-tracker";
import { 
  Home, 
  ClipboardCheck, 
  Users, 
  Heart, 
  Compass, 
  Star, 
  HelpCircle, 
  Briefcase, 
  BarChart3, 
  LayoutGrid, 
  Phone,
  FileText // <--- Icon für Downloads
} from "lucide-react";

export function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO: Der emotionale Einstieg */}
      <SectionTracker icon={Home} id="hero">
        <Hero />
      </SectionTracker>

      {/* 2. STATS: Der dunkle "Breaker" für Autorität (24/7) */}
      <SectionTracker icon={BarChart3} id="fakten">
        <StatsSection />
      </SectionTracker>

      {/* 3. SECTORS: Die strukturierte Übersicht der Leistungen */}
      <SectionTracker icon={LayoutGrid} id="fachbereiche">
        <ServiceSectorSlider />
      </SectionTracker>

      {/* 4. CONTACT GRID: Direktkontakt & Optionen */}
      <SectionTracker icon={Phone} id="kontakt">
        <ContactGridSection />
      </SectionTracker>

      {/* 5. DOWNLOADS & TOOLS: Hilfsmittel (Direkt unter Kontakt platziert) */}
      <SectionTracker icon={FileText} id="downloads">
        <ResourceDownloadSection />
      </SectionTracker>
      
      {/* 6. CONFIGURATOR: Das interaktive Tool für Leads 
      <SectionTracker icon={ClipboardCheck} id="pflege-check">
        <CareConfigurator />
      </SectionTracker>
*/}
      {/* 7. ABOUT: Die menschliche Seite 
      <SectionTracker icon={Users} id="ueber-uns">
        <AboutSection />
      </SectionTracker>
*/}
      {/* 8. PROCESS: Wie es funktioniert 
      <SectionTracker icon={Compass} id="ablauf">
        <ProcessSteps />
      </SectionTracker>
*/}
      {/* 9. REVIEWS: Social Proof
      <SectionTracker icon={Star} id="bewertungen">
        <GoogleReviews />
      </SectionTracker>
 */}
      {/* 10. FAQ: Einwände behandeln 
      <SectionTracker icon={HelpCircle} id="faq">
        <FaqSection />
      </SectionTracker>
*/}
      {/* 11. CAREER: Recruiting (kurz vor Schluss) 
      <SectionTracker icon={Briefcase} id="karriere">
        <CareerTeaser />
      </SectionTracker>
      */}
    </div>
  );
}