import { FAQList } from "@/modules/faq/components/accordion";
import { Button } from "@/shared/ui/button";
import { HelpCircle, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    question: "Wie schnell können Sie mit der Pflege beginnen?",
    answer: "In dringenden Fällen können wir oft innerhalb von 24 bis 48 Stunden die Versorgung aufnehmen. Rufen Sie uns am besten direkt an."
  },
  {
    question: "Abrechnung: Arbeiten Sie mit meiner Krankenkasse zusammen?",
    answer: "Ja. Als zugelassener Pflegedienst haben wir Versorgungsverträge mit allen gesetzlichen und privaten Kranken- und Pflegekassen."
  },
  {
    question: "Was kostet das Erstgespräch?",
    answer: "Nichts. Unser erstes Beratungsgespräch ist für Sie vollkommen kostenlos und unverbindlich."
  },
  {
    question: "Kommen immer die gleichen Pflegekräfte?",
    answer: "Wir arbeiten mit einem festen Bezugspflege-System, um den Kreis der Mitarbeiter so klein wie möglich zu halten."
  },
  {
    question: "Was passiert im Notfall?",
    answer: "Für unsere Patienten haben wir eine 24-Stunden-Rufbereitschaft eingerichtet."
  },
  {
    question: "Wie beantrage ich einen Pflegegrad?",
    answer: "Wir unterstützen Sie gerne bei der Antragstellung und bereiten Sie auf den MDK-Besuch vor."
  }
];

export function FAQTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* Header */}
      <section className="bg-secondary py-20 border-b border-slate-100">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 opacity-70">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Wissenswertes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Häufige Fragen & <span className="text-primary">Antworten.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Hier finden Sie schnelle Hilfe zu den wichtigsten Themen rund um Pflege, 
            Kostenübernahme und Ablauf.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <div className="container py-16 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Links: Liste */}
          <div className="lg:col-span-2">
            <FAQList items={faqData} />
          </div>

          {/* Rechts: Sidebar (JETZT FREUNDLICH & HELL) */}
          <div className="space-y-6">
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg sticky top-24">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">Frage nicht gefunden?</h3>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                Jede Pflegesituation ist einzigartig. Zögern Sie nicht, uns direkt zu kontaktieren.
              </p>
              
              <div className="space-y-4">
                <a href="tel:08912345678" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-secondary transition-colors border border-slate-100 group">
                  <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Rufen Sie uns an</div>
                    <div className="font-bold text-slate-900">089 / 123 456 78</div>
                  </div>
                </a>

                <Link href="/kontakt" className="block">
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white h-12 text-base shadow-md">
                    Nachricht schreiben
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}