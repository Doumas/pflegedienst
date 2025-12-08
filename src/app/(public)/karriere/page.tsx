import { CareerTemplate } from "@/modules/career/templates/career-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karriere & Jobs | Pflegedienst Herz & Hand",
  description: "Werden Sie Teil unseres Teams. Wir bieten Top-Gehalt, Firmenwagen und Zeit für echte Pflege. Jetzt in 60 Sekunden bewerben!",
};

export default function CareerPage() {
  return <CareerTemplate />;
}