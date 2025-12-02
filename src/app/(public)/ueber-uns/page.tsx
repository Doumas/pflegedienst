import { AboutTemplate } from "@/modules/about/templates/about-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns | Pflegedienst Herz & Hand",
  description: "Lernen Sie unser Team und unsere Philosophie kennen.",
};

export default function AboutPage() {
  return <AboutTemplate />;
}