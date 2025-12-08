import Link from "next/link";
import { ArrowRight, UserCheck, HeartPulse, FileText } from "lucide-react";

export function QuickLinks() {
  const links = [
    {
      title: "Ambulante Pflege",
      text: "Unterstützung im Alltag & medizinische Versorgung zu Hause.",
      icon: UserCheck,
      href: "/leistungen/ambulante-pflege"
    },
    {
      title: "Intensivpflege",
      text: "Spezialisierte Betreuung für schwerstpflegebedürftige Menschen.",
      icon: HeartPulse,
      href: "/leistungen/intensivpflege"
    },
    {
      title: "Beratung & Antrag",
      text: "Wir helfen bei Pflegegrad, Kostenklärung und Formularen.",
      icon: FileText,
      href: "/kontakt"
    }
  ];

  return (
    // z-30 sorgt dafür, dass die Boxen ÜBER dem Hero liegen
    <section className="relative z-30 px-4">
      <div className="container">
        
        {/* -mt-24 zieht die Boxen 96px nach oben in den Hero-Bereich */}
        <div className="grid md:grid-cols-3 gap-6 -mt-24">
          
          {links.map((item, i) => (
            <Link key={i} href={item.href} className="group">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                
                {/* Farbiger Balken unten beim Hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-start justify-between mb-4">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.text}
                </p>
                
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}