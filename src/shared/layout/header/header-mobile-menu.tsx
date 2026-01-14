"use client";

import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export function HeaderMobileMenu({ isOpen, closeMenu }: HeaderMobileMenuProps) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setOpenSection(openSection === label ? null : label);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.4, 
            ease: [0.32, 0.72, 0, 1] as const 
        } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            // ÄNDERUNG: Hintergrund ist jetzt Primary (Blau/Türkis), Text Weiß
            className="lg:hidden fixed inset-0 z-[40] bg-[var(--color-primary)] text-white pt-[160px] px-6 pb-10 flex flex-col h-[100dvh] overflow-y-auto"
          >
             {/* NAVIGATION - Linien jetzt in Weiß mit Deckkraft */}
             <nav className="flex flex-col w-full border-t border-white/20">
               {siteConfig.nav.map((item, i) => {
                 const isExpanded = openSection === item.label;
                 
                 return (
                   <div key={item.label} className="border-b border-white/20">
                      {item.items ? (
                        // --- DROPDOWN ITEM ---
                        <div className="group">
                           <button 
                              onClick={() => toggleSection(item.label)}
                              className="w-full flex justify-between items-center py-5 text-left"
                           >
                              {/* Text ist jetzt Weiß */}
                              <span className="text-2xl font-bold text-white tracking-tight">
                                {item.label}
                              </span>
                              {isExpanded ? (
                                <Minus className="w-6 h-6 text-white" />
                              ) : (
                                <Plus className="w-6 h-6 text-white/70" />
                              )}
                           </button>
                           
                           {/* Submenu Content */}
                           <AnimatePresence>
                             {isExpanded && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 // ÄNDERUNG: Hintergrund leichtes Weiß (Glas-Effekt) statt Grau
                                 className="overflow-hidden bg-white/10 -mx-6 px-6"
                               >
                                  <div className="py-6 flex flex-col gap-4">
                                      {item.items.map(sub => (
                                          <Link 
                                              key={sub.href} 
                                              href={sub.href} 
                                              onClick={closeMenu}
                                              // ÄNDERUNG: Sub-Links in Weiß/80%
                                              className="text-lg font-medium text-white/90 hover:text-white flex items-center gap-3 pl-2 transition-colors"
                                          >
                                              <ArrowRight className="w-4 h-4 text-white/60" />
                                              {sub.label}
                                          </Link>
                                      ))}
                                  </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                      ) : (
                        // --- NORMAL LINK ---
                        <Link 
                            href={item.href || "#"} 
                            onClick={closeMenu} 
                            className="w-full flex justify-between items-center py-5 group"
                        >
                            <span className="text-2xl font-bold text-white tracking-tight group-hover:text-white/80 transition-colors">
                                {item.label}
                            </span>
                        </Link>
                      )}
                   </div>
                 );
               })}
               
               {/* KARRIERE (Extrapunkt) */}
               <div className="border-b border-white/20">
                    <Link href="/karriere" onClick={closeMenu} className="w-full flex justify-between items-center py-5 group">
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Karriere
                        </span>
                        <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                    </Link>
               </div>
             </nav>
             
             {/* FOOTER INFO */}
             <div className="mt-auto pt-12">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* Label leicht transparent */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">
                             Direktkontakt
                        </p>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-xl font-bold text-white block mb-1">
                            {siteConfig.contact.phone}
                        </a>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-medium text-white/80 block">
                            {siteConfig.contact.email}
                        </a>
                    </div>
                </div>
             </div>

          </motion.div>
      )}
    </AnimatePresence>
  );
}