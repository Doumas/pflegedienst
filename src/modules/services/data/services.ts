import { 
  Activity, 
  UserCheck, 
  HeartPulse, 
  Baby, 
  FileText, 
  Home, 
  Sunset, // Für Palliativ
  Coffee, // Für Betreuung/Entlastung
  Umbrella, // Für Verhinderungspflege
  Stethoscope // Für Wundmanagement/Behandlungspflege
} from "lucide-react";

export const servicesData = [
  {
    title: "Ambulante Pflege",
    description: "Der Klassiker: Medizinische und pflegerische Unterstützung direkt bei Ihnen zu Hause.",
    icon: Home,
    href: "/leistungen/ambulante-pflege",
    features: [
      "Grundpflege (SGB XI) & Hygiene", 
      "Behandlungspflege SGB V (Spritzen, Verbände)", 
      "Medikamentenmanagement", 
      "Mobilisation & Aktivierung"
    ],
    details: "Unsere ambulante Pflege ist das Rückgrat der häuslichen Versorgung. Wir kommen nicht nur zum 'Waschen', sondern um Lebensqualität zu erhalten. Ob Unterstützung bei der Körperpflege oder medizinische Aufgaben wie Insulingabe und Kompressionsstrümpfe – unser Team kommt pünktlich, arbeitet professionell und hat immer ein freundliches Wort übrig."
  },
  {
    title: "Außerklinische Intensivpflege",
    description: "Höchste medizinische Sicherheit für beatmungspflichtige Patienten im eigenen Zuhause.",
    icon: Activity, // Oder Stethoscope
    href: "/leistungen/intensivpflege",
    features: [
      "Beatmungspflege (invasiv/non-invasiv)", 
      "Trachealkanülenmanagement", 
      "24h Vitalzeichen-Monitoring", 
      "Enge Kooperation mit Fachärzten"
    ],
    details: "Schwerstpflegebedürftigkeit bedeutet nicht, dass das Leben im eigenen Zuhause enden muss. Unsere hochspezialisierten Fachkräfte übernehmen die komplexe medizinische Überwachung (z.B. bei ALS, COPD oder Wachkoma). Wir schaffen eine Umgebung, die maximale Sicherheit mit menschlicher Wärme verbindet – technikbasiert, aber immer menschenzugewandt."
  },
  {
    title: "24-Stunden-Betreuung",
    description: "Rund-um-die-Uhr Präsenz für ein Leben ohne Angst und Einsamkeit.",
    icon: UserCheck,
    href: "/leistungen/24h-betreuung",
    features: [
      "Lückenlose 1:1 Versorgung", 
      "Strukturierter Tagesablauf", 
      "Nächtliche Sicherheit & Bereitschaft", 
      "Teilhabe am gesellschaftlichen Leben"
    ],
    details: "Wenn eine stundenweise Versorgung nicht mehr ausreicht, bieten wir eine echte Alternative zum Pflegeheim. Ein festes Team wechselt sich ab, sodass lückenlos jemand vor Ort ist. Das bedeutet nicht nur Sicherheit in der Nacht, sondern auch: Gemeinsam kochen, Spaziergänge und Gespräche. Ein würdevolles Leben im vertrauten Umfeld."
  },
  {
    title: "Palliativpflege (SAPV)",
    description: "Begleitung auf dem letzten Weg – schmerzfrei, würdevoll und geborgen.",
    icon: Sunset,
    href: "/leistungen/palliativpflege",
    features: [
      "Spezialisierte Schmerztherapie", 
      "Psychosoziale Begleitung für Angehörige", 
      "24h Rufbereitschaft für Notfälle", 
      "Kooperation mit Hospizdiensten"
    ],
    details: "In der letzten Lebensphase geht es nicht mehr um Heilung, sondern um Lebensqualität. Unser Palliativ-Team sorgt dafür, dass Patienten ihre letzte Zeit schmerzfrei und angstfrei im Kreise ihrer Familie verbringen können. Wir sind da – medizinisch hochkompetent und menschlich einfühlsam, auch als Stütze für die Angehörigen."
  },
  {
    title: "Kinderintensivpflege",
    description: "Große Hilfe für kleine Helden. Fachkompetenz mit ganz viel Herz.",
    icon: Baby,
    href: "/leistungen/kinderintensivpflege",
    features: [
      "Schul- & Kindergartenbegleitung", 
      "Häusliche Beatmungspflege", 
      "Entlastung & Anleitung der Eltern", 
      "Integration in den Familienalltag"
    ],
    details: "Kinder sind keine kleinen Erwachsenen. Unsere Kinderintensivpflege erfordert besonderes Feingefühl. Wir begleiten schwerkranke Kinder in ihrem Alltag – ob zu Hause, im Kindergarten oder in der Schule – und ermöglichen ihnen so viel Normalität wie möglich. Eltern können wieder Eltern sein, nicht nur Pfleger."
  },
  {
    title: "Verhinderungspflege",
    description: "Ihre Auszeit ist wichtig. Wir übernehmen, wenn Sie verhindert sind.",
    icon: Umbrella,
    href: "/leistungen/verhinderungspflege",
    features: [
      "Urlaubs- & Krankheitsvertretung", 
      "Stundenweise Entlastung", 
      "Abrechnung direkt mit der Kasse", 
      "Flexibel abrufbar"
    ],
    details: "Pflegende Angehörige leisten Übermenschliches. Aber auch Sie brauchen mal Urlaub, werden krank oder haben Termine. Die Verhinderungspflege ist Ihr gesetzliches Recht auf Entlastung. Wir springen flexibel ein – sei es für ein paar Stunden pro Woche oder für mehrere Wochen am Stück. Tanken Sie Kraft, wir kümmern uns."
  },
  {
    title: "Hauswirtschaft & Betreuung",
    description: "Entlastung im Haushalt und Freude im Alltag (§ 45b SGB XI).",
    icon: Coffee,
    href: "/leistungen/betreuung",
    features: [
      "Reinigung & Einkäufe", 
      "Gedächtnistraining & Spiele", 
      "Begleitung zu Ärzten/Terminen", 
      "Leichte Gartenarbeit"
    ],
    details: "Oft sind es die kleinen Dinge, die schwerfallen. Unsere Hauswirtschaftskräfte sorgen für ein sauberes Zuhause, kaufen ein oder kochen. Unsere Betreuungskräfte leisten Gesellschaft, lesen vor oder gehen mit Ihnen spazieren. Diese Leistungen können oft über den Entlastungsbetrag (125€) finanziert werden."
  },
  {
    title: "Beratungseinsatz § 37.3",
    description: "Pflichttermin? Nein, Ihre Chance auf wertvolle Tipps und höhere Zuschüsse.",
    icon: FileText,
    href: "/leistungen/beratungseinsatz",
    features: [
      "Nachweis für die Pflegekasse", 
      "Überprüfung der Pflegesituation", 
      "Tipps zu Hilfsmitteln & Wohnraum", 
      "Schulung für Angehörige"
    ],
    details: "Für Bezieher von Pflegegeld ist dieser Besuch gesetzlich vorgeschrieben. Wir sehen das nicht als Kontrolle, sondern als Coaching. Wir zeigen Ihnen Griffe, die den Rücken schonen, empfehlen kostenlose Hilfsmittel und prüfen, ob Ihnen vielleicht ein höherer Pflegegrad zusteht. Wir leiten den Nachweis direkt an Ihre Kasse weiter."
  }
];