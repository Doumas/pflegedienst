"use client";

import { FadeIn } from "@/shared/ui/fade-in";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- DATEN ---
const VALUES = [
  {
    id: "01",
    title: "Menschlichkeit.",
    text: "Wir pflegen keine Akten, sondern Menschen. Empathie ist unser wichtigstes Werkzeug."
  },
  {
    id: "02",
    title: "Verlässlichkeit.",
    text: "Ein Wort ist ein Wort. Pünktlichkeit und Absprachen sind das Fundament unseres Vertrauens."
  },
  {
    id: "03",
    title: "Qualität.",
    text: "Fortbildung ist Pflicht. Wir arbeiten nach den neuesten pflegewissenschaftlichen Standards."
  },
  {
    id: "04",
    title: "Transparenz.",
    text: "Keine versteckten Kosten. Wir kommunizieren offen über Möglichkeiten und Grenzen."
  },
  {
    id: "05",
    title: "Leidenschaft.",
    text: "Wir sind Pfleger aus Überzeugung. Herz und Hand gehen bei uns immer zusammen."
  },
  {
    id: "06",
    title: "Innovation.",
    text: "Wir nutzen digitale Wege, um mehr Zeit für das Wesentliche zu haben: Die Pflege."
  }
];

const TEAM = [
  { name: "Dalas Team", role: "Pflegedienstleitung", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" },
  { name: "Verwaltung", role: "Management", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80" },
  { name: "Pflegefachkraft", role: "Teamleitung", image: "https://images.unsplash.com/photo-1550791871-cf27d6d37950?auto=format&fit=crop&q=80" },
  { name: "Betreuung", role: "Hauswirtschaft", image: "https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&q=80" },
];

export function AboutTemplate() {
  
  // --- REUSABLE IMAGE COMPONENT ---
  const ImageComposition = () => (
    <div className="relative w-full h-[400px] lg:h-[550px] mt-12 lg:mt-0 block">
        
        {/* NEU: Cross-Dots Pattern (Konsistent mit Contact/Services) */}
        <div className="absolute inset-0 -z-10 opacity-30">
             <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
        </div>

        {/* Deko Kreuze */}
        <div className="absolute top-0 right-0 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        <div className="absolute bottom-10 right-10 text-[var(--color-primary)] opacity-40 text-2xl select-none">+</div>
        
        {/* BILD 1: Hinten */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 right-0 w-[75%] h-[70%] z-10 bg-slate-100 shadow-lg shadow-[var(--color-primary)]/5"
        >
            <div className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80')" }} />
            <div className="absolute inset-0 bg-[var(--color-primary-deep)]/5 mix-blend-multiply" />
        </motion.div>

        {/* BILD 2: Vorne (Overlay) */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-12 left-0 w-[45%] h-[35%] bg-white p-3 shadow-2xl shadow-slate-200/50 z-20"
        >
            <div className="w-full h-full relative overflow-hidden bg-slate-200 border border-slate-100">
                <div className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80')" }} />
                
                {/* Overlay Badge */}
                <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white px-4 py-2">
                    <span className="text-xs font-bold uppercase tracking-widest">Team</span>
                </div>
            </div>
        </motion.div>
    </div>
  );

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-32 lg:pt-48 pb-0 overflow-hidden relative">
      
      {/* Hintergrund Deko (Minimal) */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/2 left-6 text-[var(--color-primary)] opacity-20 text-2xl select-none">+</div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* LEFT: Content */}
            <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-[1px] w-8 bg-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                        Über Dalas
                    </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-[var(--color-primary-deep)] mb-6 lg:mb-8">
                    Wir sind hier, <br/>
                    um Pflege <br/>
                    <span className="text-[var(--color-primary)]">neu zu denken.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 border-l-4 border-[var(--color-primary)] pl-6 max-w-lg">
                    Gegründet, um den Status Quo der ambulanten Pflege zu hinterfragen. Wir verbinden Menschlichkeit mit höchster Professionalität.
                </p>
            </FadeIn>

            {/* RIGHT: Double Images */}
            <div className="block w-full">
                <ImageComposition />
            </div>
        </div>
      </section>

      {/* --- BIG LETTER SECTION --- */}
      {/* FIX: Rahmenfarbe auf primary-deep/10 und Cross-Dots Pattern hinzugefügt */}
      <section className="py-32 bg-slate-50 border-y border-[var(--color-primary-deep)]/10 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
            <div className="w-full h-full bg-pattern-cross-dots text-[var(--color-primary)] scale-75" />
          </div>

          <div className="absolute top-0 right-0 text-[300px] lg:text-[400px] leading-none font-black text-white mix-blend-overlay pointer-events-none select-none">
              D
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <FadeIn>
                      <h2 className="font-heading text-4xl md:text-6xl font-bold text-[var(--color-primary-deep)] mb-8 leading-tight">
                          Dalas markiert <br/> den Unterschied.
                      </h2>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                      <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                          <p>
                              Wo Disziplin, Empathie und Potenzial aufeinandertreffen. Wir passen die Zukunft der Pflege an die Bedürfnisse derer an, die die Vorstellungskraft und Fähigkeiten haben, sie aufzubauen.
                          </p>
                          <p>
                              Qualität vor Quantität. Ein spezieller Fokus auf den ambulanten Sektor. Tiefe Branchenkenntnis und unermüdlicher Fleiß. Das ist es, was uns antreibt.
                          </p>
                      </div>
                  </FadeIn>
              </div>
          </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-32 px-6 bg-white">
          <div className="container mx-auto">
              
              <FadeIn className="mb-24">
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary-deep)] mb-6">
                      Unsere Werte.
                  </h2>
                  <p className="text-xl text-slate-500 max-w-2xl">
                      Diese Prinzipien sind nicht verhandelbar. Sie sind das Fundament unserer täglichen Arbeit.
                  </p>
              </FadeIn>

              {/* Grid Layout für Werte */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                  {VALUES.map((val, i) => (
                      <FadeIn key={i} delay={i * 0.1} className="group">
                          {/* Accent Line: Farbe auf primary-deep/10 angepasst */}
                          <div className="w-full h-[1px] bg-[var(--color-primary-deep)]/10 group-hover:bg-[var(--color-primary)] transition-colors duration-500 mb-8 origin-left" />
                          
                          <div className="flex flex-col">
                              <span className="text-sm font-bold text-[var(--color-primary)] mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                  {val.id}
                              </span>
                              <h3 className="font-heading text-3xl font-bold text-[var(--color-primary-deep)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                  {val.title}
                              </h3>
                              <p className="text-slate-500 leading-relaxed font-medium pr-4">
                                  {val.text}
                              </p>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <FadeIn>
                      <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
                          Das Team
                      </h2>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                      <Link href="/kontakt" className="inline-flex items-center gap-2 font-bold text-[var(--color-primary)] uppercase tracking-widest hover:text-white transition-colors text-xs border border-[var(--color-primary)] px-6 py-3 hover:bg-[var(--color-primary)]">
                          Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
                      </Link>
                  </FadeIn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {TEAM.map((member, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                          <div className="group cursor-pointer">
                              <div className="overflow-hidden bg-slate-800 mb-6 relative aspect-[3/4] border-b-4 border-[var(--color-primary)]">
                                  <div 
                                      className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                                      style={{ backgroundImage: `url(${member.image})` }}
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                                  {member.name}
                              </h3>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                                  {member.role}
                              </p>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
}