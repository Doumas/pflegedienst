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
    const [showCard, setShowCard] = useState(true); 
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    useEffect(() => {
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
                    50% { transform: translateY(-8px); }
                }
                .animate-float-y {
                    animation: float-y 4s ease-in-out infinite;
                }
            `}</style>

            <a href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer"
            className={cn(
                "absolute bottom-10 -left-4 md:-left-12 bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 z-30 group cursor-pointer active:scale-95 transition-all animate-float-y",
                // FIX: w-max sorgt dafür, dass sich die Box an den Inhalt anpasst und nicht schrumpft
                "w-max"
            )}>
            
                <button 
                onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setShowCard(false); 
                }}
                className="absolute top-2 right-2 p-1 bg-white/50 hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition-colors z-40"
                aria-label="Chat schließen"
                >
                    <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0"> {/* shrink-0 verhindert Verformung des Icons */}
                        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105">
                            <Phone className="w-6 h-6 fill-current" />
                        </div>
                        <div className={cn(
                            "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse",
                            timeStatus.dot 
                        )} />
                    </div>
                    
                    {/* FIX: whitespace-nowrap verhindert Zeilenumbrüche im Text */}
                    <div className="whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-900">WhatsApp Chat</p>
                        <p className={cn(
                            "text-xs font-medium mt-0.5", 
                            timeStatus.color
                        )}>
                            {timeStatus.text}
                        </p>
                    </div>
                </div>
            </a>
        </>
    );
}