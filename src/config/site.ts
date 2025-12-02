export type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

export const siteConfig = {
  name: "Pflegedienst Herz & Hand",
  description: "Ihr zuverlässiger Partner für häusliche Intensivpflege und Betreuung.",
  contact: {
    phone: "089 / 123 456 78",
    email: "info@herz-hand-pflege.de",
    address: "Musterstraße 49, 80331 München"
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
      href: "/leistungen", // Klick auf "Leistungen" führt zur Übersicht
      items: [
        { label: "Intensivpflege", href: "/leistungen/intensivpflege" },
        { label: "24-Stunden-Betreuung", href: "/leistungen/24h-betreuung" },
        { label: "Ambulante Pflege", href: "/leistungen/ambulante-pflege" },
        { label: "Kinderintensivpflege", href: "/leistungen/kinderintensivpflege" },
        { label: "Beratungseinsatz § 37.3", href: "/leistungen/beratungseinsatz" },
      ] 
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