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
  // State für Accordions (welches ist gerade offen?)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setOpenSection(openSection === label ? null : label);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            // ÄNDERUNG: pt-[160px] sorgt für massig Abstand nach oben, wie im Hunter Beispiel
            className="lg:hidden fixed inset-0 z-[40] bg-[var(--color-secondary)] pt-[160px] px-6 pb-10 flex flex-col h-[100dvh] overflow-y-auto"
          >
             {/* NAVIGATION - Hunter Style (Listen mit Linien) */}
             <nav className="flex flex-col w-full border-t border-[var(--color-primary-deep)]/10">
               {siteConfig.nav.map((item, i) => {
                 const isExpanded = openSection === item.label;
                 
                 return (
                   <div key={item.label} className="border-b border-[var(--color-primary-deep)]/10">
                      {item.items ? (
                        // --- DROPDOWN ITEM (Accordion Style) ---
                        <div className="group">
                           <button 
                              onClick={() => toggleSection(item.label)}
                              className="w-full flex justify-between items-center py-5 text-left"
                           >
                              <span className="text-2xl font-bold text-[var(--color-primary-deep)] tracking-tight">
                                {item.label}
                              </span>
                              {/* Hunter Style: Plus / Minus Icon rechts */}
                              {isExpanded ? (
                                <Minus className="w-5 h-5 text-[var(--color-primary)]" />
                              ) : (
                                <Plus className="w-5 h-5 text-[var(--color-primary-deep)] opacity-50" />
                              )}
                           </button>
                           
                           {/* Submenu Content */}
                           <AnimatePresence>
                             {isExpanded && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden bg-[var(--color-primary-deep)]/5 -mx-6 px-6"
                               >
                                  <div className="py-4 flex flex-col gap-4">
                                      {item.items.map(sub => (
                                          <Link 
                                              key={sub.href} 
                                              href={sub.href} 
                                              onClick={closeMenu}
                                              className="text-base font-medium text-slate-600 hover:text-[var(--color-primary)] flex items-center gap-3 pl-2"
                                          >
                                              <ArrowRight className="w-4 h-4 opacity-50" />
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
                            <span className="text-2xl font-bold text-[var(--color-primary-deep)] tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                                {item.label}
                            </span>
                            {/* Optional: Pfeil oder leer bei normalen Links */}
                        </Link>
                      )}
                   </div>
                 );
               })}
               
               {/* KARRIERE (Extrapunkt wie im Topbar) */}
               <div className="border-b border-[var(--color-primary-deep)]/10">
                    <Link href="/karriere" onClick={closeMenu} className="w-full flex justify-between items-center py-5 group">
                        <span className="text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                            Karriere
                        </span>
                        <ArrowRight className="w-5 h-5 text-[var(--color-primary)] -rotate-45" />
                    </Link>
               </div>
             </nav>
             
             {/* FOOTER INFO - Ganz unten positioniert */}
             <div className="mt-auto pt-12">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">
                             Direktkontakt
                        </p>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-xl font-bold text-[var(--color-primary-deep)] block mb-1">
                            {siteConfig.contact.phone}
                        </a>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-medium text-slate-500 block">
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