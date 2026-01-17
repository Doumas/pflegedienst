import { ServiceDetailTemplate } from "@/modules/services/templates/service-detail-template";
import { SERVICES } from "@/shared/data/service-data";
import { notFound } from "next/navigation";

// --- WICHTIG FÜR DEINE VERSION: params als Promise typisieren ---
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Statische Pfade generieren (bleibt gleich)
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// 2. Metadaten generieren (jetzt async mit await params)
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // WICHTIG: awaiten
  const service = SERVICES.find((s) => s.slug === slug);
  
  if (!service) return { title: "Leistung nicht gefunden" };
  
  return {
    title: `${service.title} | Dalas Pflegedienst`,
    description: service.description,
  };
}

// 3. Die eigentliche Seite (jetzt async mit await params)
export default async function ServiceDetailPage({ params }: Props) {
  // WICHTIG: Hier müssen wir auf die Params warten
  const { slug } = await params;

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailTemplate slug={slug} />;
}