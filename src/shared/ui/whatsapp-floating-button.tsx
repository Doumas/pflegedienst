"use client"; 

import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { cn } from "@/shared/utils/cn"; 
import { getTimeStatus } from "@/shared/utils/time-status"; 

// Definiere einen Standard-Status, der beim ersten Rendern verwendet wird
// und keine zeitabhängige Logik ausführt.
const DEFAULT_TIME_STATUS = {
    color: "text-slate-500", // Neutraler Status, z.B. Grau
    dot: "bg-slate-500", // Neutraler Punkt
    text: "Status wird geladen...", // Neutrale Nachricht
};

export function WhatsappFloatingButton() {
    const [showCard, setShowCard] = useState(true); 
    
    // 1. Initialisiere mit dem neutralen Zustand, NICHT mit new Date()
    const [timeStatus, setTimeStatus] = useState(DEFAULT_TIME_STATUS); 

    // 2. Führe die zeitabhängige Logik ERST nach der Hydration aus (Client-Side)
    useEffect(() => {
        // Erstes Update direkt nach dem Mounten des Clients
        const updateStatus = () => setTimeStatus(getTimeStatus(new Date()));
        
        updateStatus(); // Sofort einmal ausführen

        // Live Update des Status jede Minute (wie gehabt)
        const timer = setInterval(updateStatus, 60000); 
        
        // Cleanup-Funktion
        return () => clearInterval(timer);
    }, []); // Leeres Array stellt sicher, dass es nur einmal nach dem Mounten läuft

    // Schließ-Fix: Komponente wird nicht gerendert, wenn false
    if (!showCard) {
        return null;
    }

    // Der Rest der Komponente bleibt gleich und nutzt nun den timeStatus aus dem State
    return (
        <a href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer"
        className="absolute bottom-10 -left-4 md:-left-12 bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 z-30 group cursor-pointer active:scale-95 transition-all">
        
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
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105">
                        <Phone className="w-6 h-6 fill-current" />
                    </div>
                    <div className={cn(
                        "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse",
                        // Nutzt den im useEffect gesetzten Status
                        timeStatus.dot 
                    )} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">WhatsApp Chat</p>
                    <p className={cn(
                        "text-xs font-medium mt-0.5", 
                        // Nutzt den im useEffect gesetzten Status
                        timeStatus.color
                    )}>
                        {timeStatus.text}
                    </p>
                </div>
            </div>
        </a>
    );
}