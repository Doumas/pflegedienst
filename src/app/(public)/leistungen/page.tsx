import type { Metadata } from "next";
import { ServicesTemplate } from "@/modules/services/templates/services-template";

export const metadata: Metadata = {
  title: "Unsere Leistungen | Dalas Pflegedienst",
  description: "Von der Intensivpflege bis zur Alltagshilfe – wir sind für Sie da.",
};

export default function ServicesPage() {
  return <ServicesTemplate />;
}