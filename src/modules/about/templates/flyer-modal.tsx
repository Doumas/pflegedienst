"use client";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { Printer, X, Heart, MapPin, CheckCircle2, Quote, Bath, Syringe, HelpCircle, Phone, FileText } from "lucide-react";
import { DalasLogo } from "@/shared/ui/dalas-logo";

export function FlyerModal({ onClose }: { onClose: () => void }) {
  const handlePrint = () => window.print();

  return (
    <div id="print-overlay" className="fixed inset-0 z-[1000]">
         <div className="fixed inset-0 no-print cursor-pointer bg-black/60 backdrop-blur-sm" onClick={onClose} />
         <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 no-print pointer-events-none">
            <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl w-full max-w-[210mm] pointer-events-auto">
               <div className="text-white font-bold px-3">Broschüre (5 Seiten)</div>
               <div className="flex gap-3">
                 <Button onClick={handlePrint} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-bold rounded-xl gap-2 shadow-lg">
                    <Printer className="w-4 h-4" /> PDF / Drucken
                 </Button>
                 <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                    <X className="w-6 h-6" />
                 </button>
               </div>
            </div>
         </div>
         
         <div id="flyer-content-container" className="relative z-10 w-full h-full overflow-y-auto pt-24 pb-10 px-4 flex flex-col items-center gap-8 no-scrollbar">
            
            {/* ... Hier kommt der Inhalt der 5 Seiten aus dem ursprünglichen Code ... */}
            {/* Der Inhalt hat sich nicht geändert, nur die Struktur. Du kannst den Flyer-Inhalt hier 1:1 reinkopieren. */}
            
            {/* Seite 1: Cover */}
            <div className="flyer-page bg-[var(--color-secondary)]">
               <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-16 md:p-24">
                   {/* ... Inhalt Seite 1 ... */}
                   <DalasLogo className="w-64 h-auto mb-10 relative z-10" variant="default" />
                   <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight relative z-10">
                      Ihr Wegweiser für <br/> <span className="text-[var(--color-primary)]">gute Pflege.</span>
                   </h1>
                   {/* ... */}
               </div>
            </div>

            {/* Seite 2: Konzept */}
            <div className="flyer-page bg-white">
                <div className="relative w-full h-full p-16 md:p-20 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 border-b pb-4">Unser Pflege-Konzept</h2>
                    {/* ... Restlicher Inhalt Seite 2 ... */}
                </div>
            </div>

            {/* ... Seite 3, 4, 5 folgen ... */}
            
         </div>
      </div>
  );
}