"use client"; 

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn"; 
import { getTimeStatus } from "@/shared/utils/time-status"; 
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_TIME_STATUS = {
    color: "text-slate-400",
    dot: "bg-slate-400",
    text: "Status wird geladen...",
    isOpen: false
};

export function WhatsappFloatingButton() {
    const [isVisible, setIsVisible] = useState(false); 
    const [showCard, setShowCard] = useState(true); 
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    useEffect(() => {
        // Erscheint zügig (800ms)
        const timerOut = setTimeout(() => setIsVisible(true), 800);
        const updateStatus = () => setTimeStatus(getTimeStatus(new Date()) as any);
        updateStatus(); 
        const interval = setInterval(updateStatus, 60000); 
        
        return () => {
            clearTimeout(timerOut);
            clearInterval(interval);
        };
    }, []);

    if (!showCard) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // Einblend-Animation (Einmalig)
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[999]"
                >
                    {/* Floating-Container (Permanente, langsame Bewegung) */}
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                            duration: 5, // Sehr langsam (5 Sek)
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1 // Startet erst nach dem Einblenden
                        }}
                        className="relative"
                    >
                        {/* SCHLIESSEN BUTTON */}
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300 }} 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowCard(false);
                            }}
                            className={cn(
                                "absolute -top-2 -right-2 w-7 h-7 bg-white shadow-lg border border-slate-100 rounded-full text-slate-500 z-50",
                                "flex items-center justify-center active:bg-slate-50"
                            )}
                        >
                            <X className="w-4 h-4" />
                        </motion.button>

                        <a 
                            href="https://wa.me/4917646695655" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(
                                "flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 pr-5 md:p-3 md:pr-6",
                                "rounded-2xl border border-white/50 shadow-xl shadow-black/5",
                                "active:scale-95 transition-transform duration-200"
                            )}
                        >
                            <div className="relative shrink-0"> 
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm">
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                </div>
                                
                                {timeStatus.isOpen && (
                                    <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-col text-left text-slate-900">
                                <span className="text-[13px] font-black leading-none mb-0.5">
                                    WhatsApp
                                </span>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider leading-none",
                                    timeStatus.isOpen ? "text-emerald-600" : "text-slate-400"
                                )}>
                                    {timeStatus.isOpen ? "Online" : "Büro geschlossen"}
                                </span>
                            </div>
                        </a>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}