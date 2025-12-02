import { Activity, UserCheck, HeartPulse, Baby, FileText, Home } from "lucide-react";

export const servicesData = [
  {
    title: "Intensivpflege",
    description: "Hochspezialisierte Versorgung für schwerstpflegebedürftige Menschen im eigenen Zuhause.",
    icon: Activity,
    href: "/leistungen/intensivpflege",
    features: ["Beatmungspflege (invasiv/non-invasiv)", "Trachealkanülenmanagement", "24h Überwachung der Vitalwerte", "Enge Zusammenarbeit mit Fachärzten"],
    details: "Die außerklinische Intensivpflege ermöglicht schwerstkranken Menschen ein Leben in ihrer vertrauten Umgebung. Unser hochqualifiziertes Team übernimmt die komplette medizinische Überwachung, inklusive Beatmungspflege. Wir legen dabei größten Wert auf Sicherheit, Hygiene und eine menschliche Zuwendung, die die Würde des Patienten in den Mittelpunkt stellt."
  },
  {
    title: "24-Stunden-Betreuung",
    description: "Rund-um-die-Uhr Versorgung für maximale Sicherheit und Geborgenheit.",
    icon: UserCheck,
    href: "/leistungen/24h-betreuung",
    features: ["Lückenlose 1:1 Betreuung", "Grundpflege & Hauswirtschaft", "Begleitung im Alltag & Freizeit", "Nachtbereitschaft & Sicherheit"],
    details: "Wenn eine stundenweise Pflege nicht mehr ausreicht, ist unsere 24-Stunden-Betreuung die Alternative zum Pflegeheim. Eine feste Bezugsperson oder ein kleines Team wechselt sich ab, sodass immer jemand vor Ort ist. Das gibt nicht nur Sicherheit, sondern ermöglicht auch einen strukturierten Alltag und echte soziale Teilhabe."
  },
  {
    title: "Ambulante Pflege",
    description: "Die klassische Unterstützung im Alltag – genau da, wo sie gebraucht wird.",
    icon: Home,
    href: "/leistungen/ambulante-pflege",
    features: ["Körperpflege (Waschen, Duschen)", "Medikamentengabe & Wundversorgung", "Hilfe bei der Nahrungsaufnahme", "Mobilisation & Lagerung"],
    details: "Unsere ambulante Pflege unterstützt Sie genau dort, wo Sie Hilfe benötigen – sei es bei der täglichen Körperpflege, beim Anziehen oder bei medizinischen Aufgaben wie Spritzen oder Verbänden. Unser Ziel ist es, Ihre Selbstständigkeit so lange wie möglich zu erhalten und Angehörige wirkungsvoll zu entlasten."
  },
  {
    title: "Kinderintensivpflege",
    description: "Liebevolle und fachkompetente Versorgung für unsere kleinsten Patienten.",
    icon: Baby,
    href: "/leistungen/kinderintensivpflege",
    features: ["Schul- & Kindergartenbegleitung", "Häusliche Intensivpflege", "Elternanleitung & Beratung", "Freizeitbegleitung & Ausflüge"],
    details: "Kinder sind keine kleinen Erwachsenen. Unsere Kinderintensivpflege erfordert besonderes Feingefühl und fachliche Expertise. Wir begleiten schwerkranke Kinder in ihrem Alltag – ob zu Hause, im Kindergarten oder in der Schule. Dabei arbeiten wir eng mit den Eltern zusammen, um ein möglichst normales Familienleben zu ermöglichen."
  },
  {
    title: "Beratungseinsatz § 37.3",
    description: "Der gesetzlich vorgeschriebene Nachweis für Pflegegeldempfänger.",
    icon: FileText,
    href: "/leistungen/beratungseinsatz",
    features: ["Nachweis für die Pflegekasse", "Pflegegrad-Einschätzung", "Hilfsmittelberatung", "Wohnraumanpassung & Sicherheit"],
    details: "Wenn Sie Pflegegeld beziehen und keine Pflegesachleistungen in Anspruch nehmen, verlangt die Pflegekasse regelmäßige Beratungsbesuche (bei Pflegegrad 2 & 3 halbjährlich, bei 4 & 5 vierteljährlich). Wir führen diese Einsätze unkompliziert durch, geben wertvolle Tipps für den Pflegealltag und leiten den Nachweis direkt an Ihre Kasse weiter."
  }
];