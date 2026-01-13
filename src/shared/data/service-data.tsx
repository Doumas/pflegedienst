import { 
  Activity, 
  UserCheck, 
  Baby, 
  FileText, 
  Home, 
  Sunset, 
  Coffee, 
  Umbrella, 
  // Neue Icons
  Stethoscope,
  Brain,
  GraduationCap,
  Sparkles,
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
    image: "/images/home/hero-bg.jpg", 
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
    image: "/images/home/hero-bg2.jpg", 
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
    image: "/images/home/hero-bg3.jpg", 
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
    image: "/images/home/hero-bg4.jpg", 
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
  },
  // --- NEUE LEISTUNGEN (Erweiterung) ---
  {
    id: "05",
    title: "Wundversorgung",
    slug: "wundversorgung",
    description: "Professionelles Wundmanagement für schnellere Heilung chronischer Wunden.",
    icon: Stethoscope,
    href: "/leistungen/wundversorgung",
    image: "/images/home/hero-bg.jpg", 
    features: ["ICW-Wundexperten", "Verbandswechsel", "Zusammenarbeit mit Ärzten", "Schmerzlinderung"],
    details: "Chronische Wunden belasten den Alltag stark. Unsere spezialisierten Wundexperten sorgen mit modernen Therapiemethoden für eine schnellere und schmerzarme Heilung."
  },
  {
    id: "06",
    title: "Demenzbetreuung",
    slug: "demenzbetreuung",
    description: "Einfühlsame Begleitung, um Erinnerungen zu bewahren und Sicherheit zu geben.",
    icon: Brain,
    href: "/leistungen/demenzbetreuung",
    image: "/images/home/hero-bg2.jpg", 
    features: ["Biografiearbeit", "Tagesstrukturierung", "Gedächtnisübungen", "Entlastung Angehöriger"],
    details: "Menschen mit Demenz leben in ihrer eigenen Welt. Wir holen sie dort ab, wo sie sind, und schaffen Momente der Freude und Orientierung im gewohnten Umfeld."
  },
  {
    id: "07",
    title: "Schulbegleitung",
    slug: "schulbegleitung",
    description: "Inklusion leben: Wir begleiten Kinder mit Hilfsbedarf in Schule und Kita.",
    icon: GraduationCap,
    href: "/leistungen/schulbegleitung",
    image: "/images/home/hero-bg3.jpg", 
    features: ["Pflege in der Schule", "Begleitung im Unterricht", "Kita-Assistenz", "Ausflugs-Begleitung"],
    details: "Jedes Kind hat ein Recht auf Bildung und Gemeinschaft. Unsere Fachkräfte stellen sicher, dass die medizinische Versorgung auch während des Unterrichts gewährleistet ist."
  },
  {
    id: "08",
    title: "Service Plus (Privat)",
    slug: "service-plus",
    description: "Mehr als der Standard. Individuelle Komfortleistungen nach Ihren Wünschen.",
    icon: Sparkles,
    href: "/leistungen/service-plus",
    image: "/images/home/hero-bg4.jpg", 
    features: ["Reisebegleitung", "Erweiterte Hauswirtschaft", "Kulturbegleitung", "Concierge-Services"],
    details: "Die Pflegekasse deckt nicht alles ab, was das Leben schön macht. Mit unserem Service Plus buchen Sie sich genau das Extra an Komfort und Freiheit dazu, das Sie sich wünschen."
  }
];