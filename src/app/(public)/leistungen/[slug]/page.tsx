import { ServiceDetailTemplate } from "@/modules/services/templates/service-detail-template";
import { servicesData } from "@/modules/services/data/services";
import { notFound } from "next/navigation";

// 1. SEO Titel generieren
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData.find((s) => s.href.endsWith(params.slug));
  return {
    title: service ? `${service.title} | Pflegedienst Herz & Hand` : "Leistung",
  };
}

// 2. Static Params für den Export (Wichtig für Static Site!)
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.href.split("/").pop(),
  }));
}

// 3. Die eigentliche Seite (Der Fix!)
export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  // In Next.js 15 MUSS man params erst 'awaiten'
  const params = await props.params;
  
  // Wir suchen den Service, dessen Link mit dem Slug endet (z.B. "grundpflege")
  const service = servicesData.find((s) => s.href.endsWith(params.slug));

  // Wenn nix gefunden -> 404 Seite
  if (!service) {
    return notFound();
  }

  // Wenn gefunden -> Template anzeigen
  return <ServiceDetailTemplate service={service} />;
}