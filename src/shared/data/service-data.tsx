import { 
  Activity, 
  UserCheck, 
  Baby, 
  FileText, 
  Home, 
  Sunset, 
  Coffee, 
  Umbrella, 
  LucideIcon 
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
  features: string[];
  details: string;
}

// --- GRUPPE 1: FACHBEREICHE (Spezialisierte Pflege) ---
export const SECTORS: ServiceItem[] = [
  {
    id: "01",
    title: "Außerklinische Intensivpflege",
    slug: "intensivpflege",
    description: "Höchste medizinische Sicherheit für beatmungspflichtige Patienten im eigenen Zuhause.",
    icon: Activity,
    href: "/leistungen/intensivpflege",
    image: "/images/home/hero-bg.jpg", // Bitte Bild anpassen
    features: ["Beatmungspflege", "Trachealkanülenmanagement", "24h Monitoring", "Enge Kooperation mit Fachärzten"],
    details: "Schwerstpflegebedürftigkeit bedeutet nicht, dass das Leben im eigenen Zuhause enden muss. Wir schaffen eine Umgebung, die maximale Sicherheit mit menschlicher Wärme verbindet."
  },
  {
    id: "02",
    title: "Kinderintensivpflege",
    slug: "kinderintensivpflege",
    description: "Große Hilfe für kleine Helden. Fachkompetenz mit ganz viel Herz.",
    icon: Baby,
    href: "/leistungen/kinderintensivpflege",
    image: "/images/home/hero-bg2.jpg", // Bitte Bild anpassen
    features: ["Schul- & Kitaservice", "Häusliche Beatmung", "Entlastung der Eltern", "Familienintegration"],
    details: "Kinder sind keine kleinen Erwachsenen. Wir begleiten schwerkranke Kinder in ihrem Alltag und ermöglichen ihnen so viel Normalität wie möglich."
  },
  {
    id: "03",
    title: "Palliativpflege (SAPV)",
    slug: "palliativpflege",
    description: "Begleitung auf dem letzten Weg – schmerzfrei, würdevoll und geborgen.",
    icon: Sunset,
    href: "/leistungen/palliativpflege",
    image: "/images/home/hero-bg3.jpg", // Bitte Bild anpassen
    features: ["Schmerztherapie", "Psychosoziale Begleitung", "24h Rufbereitschaft", "Hospiz-Kooperation"],
    details: "In der letzten Lebensphase geht es nicht mehr um Heilung, sondern um Lebensqualität. Wir sorgen für eine schmerzfreie Zeit im Kreise der Familie."
  },
  {
    id: "04",
    title: "24-Stunden-Betreuung",
    slug: "24h-betreuung",
    description: "Rund-um-die-Uhr Präsenz für ein Leben ohne Angst und Einsamkeit.",
    icon: UserCheck,
    href: "/leistungen/24h-betreuung",
    image: "/images/home/hero-bg4.jpg", // Bitte Bild anpassen
    features: ["1:1 Versorgung", "Strukturierter Tagesablauf", "Nächtliche Sicherheit", "Teilhabe am Leben"],
    details: "Eine echte Alternative zum Pflegeheim. Ein festes Team wechselt sich ab, sodass lückenlos jemand vor Ort ist – für Sicherheit und Gesellschaft."
  }
];

// --- GRUPPE 2: UNSERE LEISTUNGEN (Allgemeine Versorgung) ---
export const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "Ambulante Pflege",
    slug: "ambulante-pflege",
    description: "Der Klassiker: Medizinische und pflegerische Unterstützung direkt bei Ihnen.",
    icon: Home,
    href: "/leistungen/ambulante-pflege",
    image: "/images/home/hero-bg4.jpg",
    features: ["Grundpflege", "Behandlungspflege", "Medikamentengabe", "Mobilisation"],
    details: "Wir kommen nicht nur zum 'Waschen', sondern um Lebensqualität zu erhalten. Pünktlich, professionell und immer mit einem freundlichen Wort."
  },
  {
    id: "02",
    title: "Verhinderungspflege",
    slug: "verhinderungspflege",
    description: "Ihre Auszeit ist wichtig. Wir übernehmen, wenn Sie verhindert sind.",
    icon: Umbrella,
    href: "/leistungen/verhinderungspflege",
    image: "/images/home/hero-bg.jpg",
    features: ["Urlaubsvertretung", "Stundenweise Entlastung", "Kassenabrechnung", "Flexibel abrufbar"],
    details: "Pflegende Angehörige leisten Übermenschliches. Tanken Sie Kraft – wir springen flexibel ein, sei es stundenweise oder für den Urlaub."
  },
  {
    id: "03",
    title: "Hauswirtschaft & Betreuung",
    slug: "betreuung",
    description: "Entlastung im Haushalt und Freude im Alltag (§ 45b SGB XI).",
    icon: Coffee,
    href: "/leistungen/betreuung",
    image: "/images/home/hero-bg2.jpg",
    features: ["Reinigung & Einkäufe", "Gedächtnistraining", "Begleitung zu Terminen", "Spaziergänge"],
    details: "Oft sind es die kleinen Dinge, die schwerfallen. Wir sorgen für ein sauberes Zuhause und leisten Gesellschaft."
  },
  {
    id: "04",
    title: "Beratungseinsatz § 37.3",
    slug: "beratungseinsatz",
    description: "Pflichttermin? Nein, Ihre Chance auf wertvolle Tipps und höhere Zuschüsse.",
    icon: FileText,
    href: "/leistungen/beratungseinsatz",
    image: "/images/home/hero-bg3.jpg",
    features: ["Nachweis Pflegekasse", "Pflegegrad-Check", "Hilfsmittel-Tipps", "Schulung"],
    details: "Wir sehen das nicht als Kontrolle, sondern als Coaching. Wir prüfen, ob Ihnen höhere Zuschüsse oder Hilfsmittel zustehen."
  }
];