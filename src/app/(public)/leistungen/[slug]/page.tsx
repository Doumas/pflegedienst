import { notFound } from "next/navigation";
// Achte darauf, dass dieser Pfad zu deinem Template stimmt
import { ServiceDetailTemplate } from "@/modules/services/templates/service-detail-template";

// KORREKTUR: Wir importieren jetzt die BEIDEN neuen Listen
// Der Pfad muss auf deine Datei zeigen (laut Fehlermeldung: modules/services/data/services)
import { SERVICES, SECTORS } from "@/modules/services/data/services";

// Wir werfen beide Listen zusammen, damit wir in ALLEN Leistungen suchen können
const ALL_SERVICES = [...SECTORS, ...SERVICES];

interface PageProps {
  params: {
    slug: string;
  };
}

// Generiert statische Pfade für ALLE Leistungen (SEO & Performance)
export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const service = ALL_SERVICES.find((s) => s.slug === params.slug);
  if (!service) return;

  return {
    title: `${service.title} | Dalas Pflege`,
    description: service.description,
  };
}

export default function ServicePage({ params }: PageProps) {
  // Wir suchen den Slug in der kombinierten Liste
  const service = ALL_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Wir übergeben die gefundenen Daten an dein Template
  return <ServiceDetailTemplate service={service} />;
}