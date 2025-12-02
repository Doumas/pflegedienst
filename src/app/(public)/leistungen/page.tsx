import { ServicesTemplate } from "@/modules/services/templates/services-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Leistungen | Pflegedienst Herz & Hand",
  description: "Grundpflege, Behandlungspflege und Hauswirtschaft. Wir sind für Sie da.",
};

export default function ServicesPage() {
  return <ServicesTemplate />;
}