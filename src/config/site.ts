import { SERVICES } from "@/shared/data/service-data";

export type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

export const siteConfig = {
  name: "Dalas Pflegedienst",
  description: "Ihr verlässlicher Partner für Intensiv- und Ambulante Pflege in Frankfurt.",
  contact: {
    // Deine echten Daten (statt München/Platzhalter)
    phone: "069 / 123 456 78",
    email: "info@dalas-pflege.de",
    address: "Borsigallee 37, 60388 Frankfurt am Main"
  },
  nav: [
    { 
      label: "Start", 
      href: "/" 
    },
    { 
      label: "Über uns", 
      href: "/ueber-uns" 
    },
    { 
      label: "Leistungen", 
      href: "/leistungen",
      // WICHTIG: Hier ziehen wir die Daten dynamisch!
      // Das Array "items" wird jetzt automatisch anhand deiner Service-Daten generiert.
      items: SERVICES.map((service) => ({
        label: service.title,
        href: service.href
      }))
    },
    { 
      label: "Karriere",
      href: "/karriere" 
    },
    { 
      label: "FAQ", 
      href: "/faq" 
    },
    { 
      label: "Kontakt", 
      href: "/kontakt" 
    },
  ] as NavItem[]
};