"use client"; 

import { useState, useEffect } from "react";
import { Phone, X, MessageCircle } from "lucide-react"; // MessageCircle passt oft besser zu WhatsApp
import { cn } from "@/shared/utils/cn"; 
import { getTimeStatus } from "@/shared/utils/time-status"; 

const DEFAULT_TIME_STATUS = {
    color: "text-slate-400",
    dot: "bg-slate-400",
    text: "Status wird geladen...",
};

export function WhatsappFloatingButton() {
    const [isVisible, setIsVisible] = useState(false); 
    const [showCard, setShowCard] = useState(true); 
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    useEffect(() => {
        // Kurze Verzögerung beim Start für sanftes Einblenden nach dem Laden der Seite
        const timerOut = setTimeout(() => setIsVisible(true), 1000);

        const updateStatus = () => setTimeStatus(getTimeStatus(new Date()));
        updateStatus(); 
        const interval = setInterval(updateStatus, 60000); 
        
        return () => {
            clearTimeout(timerOut);
            clearInterval(interval);
        };
    }, []);

    if (!showCard) return null;

    return (
        <>
            <style jsx>{`
                @keyframes float-y-gentle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                .animate-float-gentle {
                    animation: float-y-gentle 4s ease-in-out infinite;
                }
            `}</style>

            <div
                className={cn(
                    "fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[990]",
                    "transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)", // Schöner "Pop" Effekt beim Erscheinen
                    isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
                )}
            >
                <a 
                    href="https://wa.me/491234567890" // Hier deine Nummer eintragen
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                        "relative group flex items-center gap-3 md:gap-4",
                        "bg-white/90 backdrop-blur-xl p-3 pr-5 md:p-3.5 md:pr-6",
                        "rounded-[2rem] border border-[var(--color-primary)]/10", // CI-Farbe im Border
                        "shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_35px_rgba(13,148,136,0.15)]", // Teal Glow beim Hover
                        "cursor-pointer transition-all duration-300 active:scale-95 animate-float-gentle",
                        "max-w-[calc(100vw-40px)]"
                    )}
                >
                
                    {/* Schließen Button (Dezent integriert) */}
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            setShowCard(false); 
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-white hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors z-50 shadow-sm border border-slate-100"
                        title="Chat ausblenden"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* ICON CONTAINER (WhatsApp Grün + Pulse) */}
                    <div className="relative shrink-0"> 
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 group-hover:scale-110 transition-transform duration-300">
                            {/* Message Icon passt oft besser zu "Chat" als Telefon */}
                            <MessageCircle className="w-6 h-6 fill-current stroke-[1.5]" />
                        </div>
                        {/* Status Dot */}
                        <div className={cn(
                            "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-[2.5px] border-white",
                            timeStatus.dot 
                        )} />
                    </div>
                    
                    {/* TEXT CONTAINER */}
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                            WhatsApp Chat
                        </span>
                        <span className={cn(
                            "text-[11px] font-medium leading-none truncate opacity-90", 
                            timeStatus.color
                        )}>
                            {timeStatus.text}
                        </span>
                    </div>
                </a>
            </div>
        </>
    );
}