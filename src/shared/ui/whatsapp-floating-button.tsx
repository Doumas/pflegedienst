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
    const [isVisible, setIsVisible] = useState(false); 
    const [showCard, setShowCard] = useState(true); 
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    useEffect(() => {
        setIsVisible(true); 
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
                    // POSITIONIERUNG: Näher am Rand (left-4) für mehr Platz
                    "fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[999]",
                    "transition-all duration-500 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
            >
                <a 
                    href="https://wa.me/491234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                        // LAYOUT: Kompakteres Padding auf Mobile (p-3 pr-5), etwas größer auf Desktop
                        "block bg-white/80 backdrop-blur-xl p-3 pr-5 md:p-4 md:pr-6 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60 group cursor-pointer active:scale-95 transition-all hover:bg-white animate-float-y",
                        "w-max max-w-[calc(100vw-32px)]" // Verhindert Overflow auf sehr kleinen Screens
                    )}
                >
                
                    {/* Schließen Button - Größe angepasst */}
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            setShowCard(false); 
                        }}
                        className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 p-0.5 md:p-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-900 transition-colors z-50 shadow-sm border border-white"
                        aria-label="Chat schließen"
                    >
                        <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                    
                    {/* INHALT: Gap reduziert für weniger Breite */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Icon Container */}
                        <div className="relative shrink-0"> 
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110">
                                <Phone className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>
                            <div className={cn(
                                "absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white animate-pulse",
                                timeStatus.dot 
                            )} />
                        </div>
                        
                        {/* Text Container */}
                        <div className="whitespace-nowrap overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 leading-tight">WhatsApp Chat</p>
                            <p className={cn(
                                "text-[10px] md:text-[11px] font-medium mt-0.5 leading-tight truncate max-w-[140px] md:max-w-none", 
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