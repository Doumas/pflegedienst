import { FAQTemplate } from "@/modules/faq/templates/faq-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) | Dalas Pflegedienst",
  description: "Antworten auf Ihre Fragen rund um Pflege, Kosten und unseren Service.",
};

export default function FAQPage() {
  return <FAQTemplate />;
}