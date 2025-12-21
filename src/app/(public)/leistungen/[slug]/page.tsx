import { ServiceDetailTemplate } from "@/modules/services/templates/service-detail-template";
// KORREKTUR: Der Pfad zeigt jetzt auf dein Modul
import { servicesData } from "@/modules/services/data/services"; 
import { notFound } from "next/navigation";

// 1. SEO Titel generieren
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData.find((s) => s.slug === params.slug);
  return {
    title: service ? `${service.title} | Pflegedienst Dalas` : "Leistung nicht gefunden",
  };
}

// 2. Static Params für den Export (Wichtig für Static Site Generation)
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// 3. Die eigentliche Seite
export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  // Next.js 15: Params müssen awaited werden
  const params = await props.params;
  
  // Wir prüfen, ob ein Service mit diesem Slug existiert
  const serviceExists = servicesData.some((s) => s.slug === params.slug);

  if (!serviceExists) {
    return notFound();
  }

  // WICHTIG: Wir übergeben NUR den String 'slug'. 
  // Das Template lädt sich die Daten (inkl. Icons) dann selbst.
  return <ServiceDetailTemplate slug={params.slug} />;
}