import { ContactTemplate } from "@/modules/contact/templates/contact-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Pflegedienst Herz & Hand",
  description: "Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne.",
};

export default function ContactPage() {
  return <ContactTemplate />;
}