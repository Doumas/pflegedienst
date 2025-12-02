import { FAQTemplate } from "@/modules/faq/templates/faq-template";
import type { Metadata } from "next";

// Das hier ist wichtig für Google und den Browser-Tab
export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) | Pflegedienst Herz & Hand",
  description: "Antworten zu Kosten, Abrechnung und Pflegeablauf.",
};

export default function FAQPage() {
  return <FAQTemplate />;
}