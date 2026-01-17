import { 
  Activity, 
  UserCheck, 
  FileText, 
  Home, 
  Sunset, 
  Coffee, 
  Umbrella, 
  Stethoscope,
  Heart,
  Syringe,
  ShieldCheck,
  Brain, // WICHTIG: Das fehlte vorher
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

// --- HAUPTLISTE: UMFASSENDE PFLEGELEISTUNGEN ---
export const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "Außerklinische Intensivpflege",
    slug: "intensivpflege",
    description: "Spezialisierte 1:1 Versorgung für beatmungspflichtige Patienten zuhause.",
    icon: Activity,
    href: "/leistungen/intensivpflege",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80", 
    features: ["Beatmungspflege (invasiv/non-invasiv)", "Trachealkanülenmanagement", "24h Monitoring", "Notfallmanagement"],
    details: "Unser spezialisiertes Team ermöglicht schwerstpflegebedürftigen Menschen ein Leben in den eigenen vier Wänden. Mit modernster Technik und viel menschlicher Wärme garantieren wir maximale Sicherheit rund um die Uhr."
  },
  {
    id: "02",
    title: "Medizinische Behandlungspflege",
    slug: "behandlungspflege",
    description: "Medizinische Leistungen nach ärztlicher Verordnung (SGB V).",
    icon: Syringe,
    href: "/leistungen/behandlungspflege",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80",
    features: ["Injektionen (Insulin, Heparin)", "Wundversorgung", "Medikamentengabe", "Kompressionsverbände"],
    details: "Wir übernehmen die professionelle Durchführung medizinischer Maßnahmen, die Ihr Haus- oder Facharzt verordnet hat. Unsere examinierten Fachkräfte sorgen für eine sterile und fachgerechte Versorgung."
  },
  {
    id: "03",
    title: "Ambulante Grundpflege",
    slug: "grundpflege",
    description: "Unterstützung bei der Körperpflege, Ernährung und Mobilität (SGB XI).",
    icon: Home,
    href: "/leistungen/grundpflege",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    features: ["Körperpflege (Waschen, Duschen)", "An- und Auskleiden", "Hilfe bei der Nahrungsaufnahme", "Lagerung & Mobilisation"],
    details: "Pflege ist Vertrauenssache. Wir unterstützen Sie respektvoll bei den alltäglichen Dingen des Lebens, damit Sie Ihre Selbstständigkeit so lange wie möglich bewahren können."
  },
  {
    id: "04",
    title: "Palliativpflege (SAPV)",
    slug: "palliativpflege",
    description: "Würdevolle Begleitung in der letzten Lebensphase.",
    icon: Sunset,
    href: "/leistungen/palliativpflege",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80", 
    features: ["Symptomkontrolle", "Schmerzmanagement", "Psychosoziale Unterstützung", "24h Rufbereitschaft"],
    details: "Wenn eine Heilung nicht mehr möglich ist, steht die Lebensqualität an erster Stelle. Wir begleiten Patienten und Angehörige einfühlsam, schmerzfrei und geborgen auf ihrem letzten Weg."
  },
  {
    id: "05",
    title: "Wundmanagement",
    slug: "wundversorgung",
    description: "Zertifizierte Wundversorgung für chronische und akute Wunden.",
    icon: Stethoscope,
    href: "/leistungen/wundversorgung",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80", 
    features: ["Versorgung durch Wundexperten (ICW)", "Dekubitusbehandlung", "Ulcus Cruris Therapie", "Digitale Wunddokumentation"],
    details: "Chronische Wunden schränken die Lebensqualität massiv ein. Unsere Wundexperten arbeiten eng mit Ärzten zusammen, um Heilungsprozesse durch moderne Wundauflagen zu beschleunigen."
  },
  {
    id: "06",
    title: "Verhinderungspflege",
    slug: "verhinderungspflege",
    description: "Urlaubs- und Krankheitsvertretung für pflegende Angehörige.",
    icon: Umbrella,
    href: "/leistungen/verhinderungspflege",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80",
    features: ["Stundenweise Entlastung", "Urlaubsvertretung", "Abrechnung direkt mit der Kasse", "Flexibler Einsatz"],
    details: "Pflegende Angehörige brauchen Pausen. Wir springen ein, wenn Sie krank sind, in den Urlaub fahren oder einfach mal Zeit für sich brauchen – die Kosten übernimmt oft komplett die Kasse."
  },
  {
    id: "07",
    title: "Hauswirtschaft & Betreuung",
    slug: "betreuung",
    description: "Hilfe im Haushalt und soziale Betreuung (§ 45b SGB XI).",
    icon: Coffee,
    href: "/leistungen/betreuung",
    image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80",
    features: ["Reinigung der Wohnung", "Einkaufsservice", "Begleitung zu Ärzten", "Gedächtnistraining"],
    details: "Ein sauberes Zuhause und soziale Kontakte sind wichtig für das Wohlbefinden. Unsere Betreuungskräfte leisten Gesellschaft, gehen mit Ihnen spazieren oder erledigen den Wocheneinkauf."
  },
  {
    id: "08",
    title: "Demenzbetreuung",
    slug: "demenzbetreuung",
    description: "Spezialisierte Betreuung für Menschen mit Demenz.",
    icon: Brain,
    href: "/leistungen/demenzbetreuung",
    image: "https://images.unsplash.com/photo-1534349762913-96c8713025bf?auto=format&fit=crop&q=80", 
    features: ["Biografiearbeit", "Tagesstrukturierung", "Validation", "Entlastung der Familie"],
    details: "Demenz verändert den Alltag. Wir begegnen Betroffenen mit Geduld und Verständnis, schaffen Orientierung und sorgen für Sicherheit im gewohnten Umfeld."
  },
  {
    id: "09",
    title: "Beratungseinsatz § 37.3",
    slug: "beratungseinsatz",
    description: "Pflichtberatung für Pflegegeldempfänger.",
    icon: FileText,
    href: "/leistungen/beratungseinsatz",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    features: ["Nachweis für die Pflegekasse", "Pflegegrad-Überprüfung", "Hilfsmittelberatung", "Schulung von Angehörigen"],
    details: "Wir führen die gesetzlich vorgeschriebenen Beratungsbesuche kompetent durch. Dabei kontrollieren wir nicht, sondern beraten Sie, wie Sie die Pflege optimieren und mehr Leistungen erhalten können."
  },
  {
    id: "10",
    title: "Sicherheits-Check & Notruf",
    slug: "sicherheit",
    description: "Wohnraumanpassung und Hausnotruf-Vermittlung.",
    icon: ShieldCheck,
    href: "/leistungen/sicherheit",
    image: "https://images.unsplash.com/photo-1516574187841-69301976e499?auto=format&fit=crop&q=80",
    features: ["Wohnraum-Beratung", "Hausnotruf-Installation", "Sturzprophylaxe", "Hilfsmittel-Check"],
    details: "Oft genügen kleine Anpassungen (Haltegriffe, Teppiche entfernen), um Stürze zu vermeiden. Wir beraten Sie zur Wohnraumanpassung und vermitteln moderne Hausnotruf-Systeme."
  }
];

// Helper: Kompatibilität
export const ALL_SERVICES = SERVICES;