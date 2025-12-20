export type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

export const siteConfig = {
  name: "DALAS",
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
      href: "/leistungen",
      items: [
        { label: "Ambulante Pflege", href: "/leistungen/ambulante-pflege" },
        { label: "Intensivpflege", href: "/leistungen/intensivpflege" },
        { label: "24-Stunden-Betreuung", href: "/leistungen/24h-betreuung" },
        { label: "Palliativpflege (SAPV)", href: "/leistungen/palliativpflege" },
        { label: "Kinderintensivpflege", href: "/leistungen/kinderintensivpflege" },
        { label: "Verhinderungspflege", href: "/leistungen/verhinderungspflege" },
        { label: "Hauswirtschaft & Betreuung", href: "/leistungen/betreuung" },
        { label: "Beratungseinsatz § 37.3", href: "/leistungen/beratungseinsatz" },
      ] 
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