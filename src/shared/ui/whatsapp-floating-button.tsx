"use client"; 

import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { cn } from "@/shared/utils/cn"; 
import { getTimeStatus } from "@/shared/utils/time-status"; 

const DEFAULT_TIME_STATUS = {
    color: "text-slate-500",
    dot: "bg-slate-500",
    text: "Status wird geladen...",
};

export function WhatsappFloatingButton() {
    // Initial false, damit es nicht beim Server-Rendering flackert (Hydration), 
    // oder true, wenn es sofort da sein soll. 
    // Für Fixed-Elemente ist ein kurzes Einblenden oft schöner.
    const [isVisible, setIsVisible] = useState(false); 
    const [showCard, setShowCard] = useState(true); 
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    useEffect(() => {
        setIsVisible(true); // Aktiviert die Anzeige nach dem Mounten
        const updateStatus = () => setTimeStatus(getTimeStatus(new Date()));
        updateStatus(); 
        const timer = setInterval(updateStatus, 60000); 
        return () => clearInterval(timer);
    }, []);

    if (!showCard) {
        return null;
    }

    return (
        <>
            <style jsx>{`
                @keyframes float-y {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                .animate-float-y {
                    animation: float-y 5s ease-in-out infinite;
                }
            `}</style>

            <div
                className={cn(
                    // POSITIONIERUNG: Fixed für Sticky-Effekt unten links
                    "fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[999]",
                    "transition-all duration-500 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
            >
                <a 
                    href="https://wa.me/491234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                        "block bg-white/80 backdrop-blur-xl p-4 pr-6 rounded-full md:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60 group cursor-pointer active:scale-95 transition-all hover:bg-white animate-float-y",
                        "w-max"
                    )}
                >
                
                    {/* Schließen Button - dezent oben rechts positioniert, aber innerhalb der 'Fixed' Logik */}
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            setShowCard(false); 
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-900 transition-colors z-50 shadow-sm border border-white"
                        aria-label="Chat schließen"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    
                    <div className="flex items-center gap-4">
                        {/* Icon Container */}
                        <div className="relative shrink-0"> 
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110">
                                <Phone className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>
                            <div className={cn(
                                "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse",
                                timeStatus.dot 
                            )} />
                        </div>
                        
                        {/* Text Container */}
                        <div className="whitespace-nowrap">
                            <p className="text-sm font-bold text-slate-900 leading-tight">WhatsApp Chat</p>
                            <p className={cn(
                                "text-[11px] font-medium mt-0.5 leading-tight", 
                                timeStatus.color
                            )}>
                                {timeStatus.text}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}