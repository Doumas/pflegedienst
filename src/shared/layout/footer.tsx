"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight, HeartHandshake, ArrowUp, HeartIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/ui/button";
import { siteConfig } from "@/config/site";
import { DalasLogo } from "@/shared/ui/dalas-logo";
import { FadeIn } from "@/shared/ui/fade-in"; 
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/shared/ui/animated-background"; 

// --- HELPER HOOK ---
function useInCenter(options = { threshold: 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInCenter(entry.isIntersecting);
        }, {
            rootMargin: "-35% 0px -35% 0px", 
            threshold: 0
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isInCenter };
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { ref: ctaRef, isInCenter: isCtaActive } = useInCenter();

  return (
    <footer className="relative bg-[var(--color-footer-bg)] text-white font-sans mt-32 border-t border-white/5">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <AnimatedBackground 
            icon={HeartIcon} 
            variant="section" 
            color="text-[var(--color-primary)]" 
            count={8} 
            className="opacity-40" 
         />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ 
                 backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
               }} />
      </div>

      {/* ========================================================= */}
      {/* PRE-FOOTER CTA                                            */}
      {/* ========================================================= */}
      <div className="relative z-50 container px-4 md:px-6">
        <FadeIn delay={0.1} direction="up" className="w-full">
            <div 
                ref={ctaRef}
                className={cn(
                    "-mt-24 bg-[var(--color-primary)] rounded-[3rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group border border-white/20 transition-all duration-700 transform-gpu shadow-2xl",
                    isCtaActive 
                        ? "scale-[1.02] shadow-[var(--color-primary)]/40" 
                        : "hover:scale-[1.01]"
                )}
            >
                {/* Visual FX im CTA */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2.5s_infinite] pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <HeartHandshake className="w-4 h-4 text-[var(--color-accent)]" />
                        </motion.div>
                        Wir sind für Sie da
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                        Noch Fragen offen?
                    </h2>
                    <p className="text-white/80 text-xl font-medium max-w-lg leading-relaxed font-script italic">
                        Lassen Sie uns persönlich über Ihr Anliegen sprechen.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
                    <a href={`tel:${siteConfig.contact.phone}`} className={cn(
                        "h-16 px-10 bg-white text-[var(--color-primary-deep)] hover:bg-[var(--color-accent)] hover:text-white font-black text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                    )}>
                        <Phone className="w-5 h-5" />
                        {siteConfig.contact.phone}
                    </a>
                    
                    <Link href="/kontakt" className="w-full sm:w-auto">
                        <div className={cn(
                            "h-16 px-10 bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 font-black text-lg rounded-2xl transition-all flex items-center justify-center cursor-pointer active:scale-95"
                        )}>
                            Anfrage senden
                        </div>
                    </Link>
                </div>
            </div>
        </FadeIn>
      </div>


      {/* ========================================================= */}
      {/* MAIN FOOTER CONTENT                                       */}
      {/* ========================================================= */}
      <div className="container px-4 md:px-6 relative z-10 pb-12 pt-20 md:pt-28 text-left">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
            
            {/* SPALTE 1: BRANDING */}
            <FadeIn delay={0.2} className="space-y-8">
               <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
                    <DalasLogo variant="light" className="w-64 md:w-72" />
               </Link>
                <p className="text-white/50 leading-relaxed text-base font-medium max-w-xs text-pretty">
                    Ihre Experten für würdevolle Pflege und ambulante Versorgung in Frankfurt. Menschlichkeit als höchstes Gebot.
                </p>
                <div className="flex gap-4">
                    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--color-accent)] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </FadeIn>

            {/* SPALTE 2: NAVIGATION */}
            <FadeIn delay={0.3}>
                <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-10">Navigation</h4>
                <ul className="space-y-4">
                    {siteConfig.nav.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href || "#"} className="group flex items-center gap-3 text-white/70 hover:text-[var(--color-accent)] transition-colors text-base font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] group-hover:bg-[var(--color-accent)] transition-colors" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </FadeIn>

            {/* SPALTE 3: LEISTUNGEN */}
            <FadeIn delay={0.4}>
                <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-10">Unsere Pflege</h4>
                <ul className="space-y-4">
                    {['Grundpflege', 'Behandlungspflege', 'Intensivpflege', 'Betreuung', 'MDK-Beratung'].map((item) => (
                        <li key={item}>
                            <Link href="/leistungen" className="group flex items-center gap-3 text-white/70 hover:text-[var(--color-accent)] transition-colors text-base font-bold">
                                <ArrowRight className="w-4 h-4 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
                                <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </FadeIn>

            {/* SPALTE 4: KONTAKT */}
            <FadeIn delay={0.5}>
                <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-10">Kontakt</h4>
                <ul className="space-y-6 text-left">
                    <li className="flex gap-5">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-accent)] border border-white/5 shadow-sm">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div className="text-base text-white/70 font-bold">
                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Anschrift</span>
                            {siteConfig.contact.address} <br/>
                            Frankfurt am Main
                        </div>
                    </li>
                    <li className="flex gap-5">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-accent)] border border-white/5 shadow-sm">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div className="text-base text-white/70 font-bold">
                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Direktkontakt</span>
                            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">{siteConfig.contact.phone}</a>
                        </div>
                    </li>
                    <li className="flex gap-5">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-accent)] border border-white/5 shadow-sm">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="text-base text-white/70 font-bold">
                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">E-Mail</span>
                            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors break-all">{siteConfig.contact.email}</a>
                        </div>
                    </li>
                </ul>
            </FadeIn>

        </div>

        {/* BOTTOM BAR */}
        <FadeIn delay={0.6}>
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] font-bold text-white/30">
                <div className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Dalas GmbH. Alle Rechte vorbehalten.
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                    <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                    <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
                </div>
                <button 
                    onClick={scrollToTop} 
                    className="p-4 bg-white/5 hover:bg-[var(--color-accent)] text-white rounded-2xl transition-all group shadow-sm active:scale-90"
                    aria-label="Nach oben scrollen"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </FadeIn>

      </div>
    </footer>
  );
}