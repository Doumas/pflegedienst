"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { MapPin, Loader2, Star, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { FadeIn } from "@/shared/ui/fade-in";
import { useInCenter } from "./hero-hooks";

// Daten für die Avatare
const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces&q=80"
];

export function HeroWidget() {
  const [zipCode, setZipCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [checkResult, setCheckResult] = useState<"success" | "error" | null>(null);
  
  const { ref: widgetRef, isInCenter: widgetActive } = useInCenter();

  // Scroll Lock bei Modal
  useEffect(() => {
    document.body.style.overflow = resultModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [resultModalOpen]);

  const handleCheck = (e: React.FormEvent) => {
      e.preventDefault();
      if (!zipCode || zipCode.length < 5) return;
      setIsChecking(true);
      setTimeout(() => {
          setIsChecking(false);
          // Einfache Logik für Frankfurt PLZ
          if (zipCode.startsWith("60") || zipCode.startsWith("659")) {
              setCheckResult("success");
          } else {
              setCheckResult("error");
          }
          setResultModalOpen(true);
      }, 1500);
  };

  const closeResultModal = () => setResultModalOpen(false);

  return (
    <>
      <div className="order-3 lg:col-start-1 w-full max-w-lg mx-auto lg:mx-0 pt-8 lg:pt-0">
            {/* Widget Container */}
            <FadeIn delay={0.4} className="w-full">
                <div 
                    ref={widgetRef} 
                    className={cn(
                    "bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 xs:p-6 lg:p-8 shadow-xl shadow-[var(--color-primary)]/5 border border-white relative overflow-hidden transition-all duration-500 group/widget transform-gpu",
                    (widgetActive) ? "border-[var(--color-primary)]/30 scale-[1.02]" : "scale-100",
                    "hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/40"
                )}>
                    <form onSubmit={handleCheck} className="flex flex-col gap-4 lg:gap-5">
                        <div>
                            <label className="text-[10px] lg:text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1 lg:mb-2 block">
                                Freie Kapazitäten prüfen
                            </label>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                                Wir kommen zu Ihnen.
                            </h3>
                        </div>
                        
                        <div className="relative flex items-center bg-white border border-slate-200 rounded-full p-1.5 transition-all shadow-sm group-hover/widget:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)]">
                            <MapPin className="absolute left-4 w-5 h-5 text-[var(--color-accent)]" />
                            <input 
                                type="text" 
                                placeholder="Ihre Postleitzahl" 
                                className="w-full h-12 pl-11 pr-32 bg-transparent border-none text-slate-900 font-bold placeholder:font-medium placeholder:text-slate-400 focus:ring-0 text-lg rounded-full outline-none"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, '').slice(0,5))}
                            />
                            <button 
                                type="submit"
                                disabled={zipCode.length < 5 || isChecking}
                                className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-full transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-sm min-w-[100px] active:scale-95"
                            >
                                {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "Prüfen"}
                            </button>
                        </div>
                    </form>
                </div>
            </FadeIn>

            {/* Social Proof (Sterne & Köpfe) */}
            <FadeIn delay={0.5}>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 lg:pt-8 ml-2">
                <div className="flex -space-x-3">
                    {AVATAR_IMAGES.map((src, i) => (
                        <div key={i} className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full border-[3px] border-white shadow-sm overflow-hidden ring-1 ring-slate-100 bg-slate-100 hover:scale-110 transition-transform z-0 hover:z-10">
                            <Image src={src} alt="Kunden" fill className="object-cover" sizes="48px" />
                        </div>
                    ))}
                </div>
                <div className="text-sm text-left pl-1">
                    <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-current" />)}
                    </div>
                    <span className="font-medium text-slate-600 text-xs sm:text-sm block">
                        Von Frankfurter Familien empfohlen.
                    </span>
                </div>
                </div>
            </FadeIn>
      </div>

      {/* DAS MODAL (Overlay) */}
      {resultModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[var(--color-primary-deep)]/60 backdrop-blur-sm" onClick={closeResultModal} />
           <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
              <div className="absolute top-4 right-4 z-10">
                 <button onClick={closeResultModal} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-8 pt-12 pb-10">
                 {checkResult === "success" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-white shadow-xl shadow-green-100 flex items-center justify-center text-[var(--color-primary)] mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-extrabold text-[var(--color-primary)] mb-1">Gute Nachricht!</h3>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-[280px] mx-auto">
                            Wir sind in <strong className="text-slate-900 bg-green-50 px-2 py-0.5 rounded-lg">{zipCode}</strong> für Sie da.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button size="lg" className="w-full h-14 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                                    Jetzt kennenlernen
                                </Button>
                            </Link>
                        </div>
                    </>
                 )}
                 {checkResult === "error" && (
                    <>
                        <div className="w-20 h-20 rounded-full bg-orange-50 border-4 border-white shadow-xl shadow-orange-100 flex items-center justify-center text-[var(--color-accent)] mb-6">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Momentan nicht aktiv</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-[280px] mx-auto">
                            In <strong className="text-slate-900">{zipCode}</strong> sind wir leider noch nicht.
                        </p>
                        <div className="w-full space-y-3">
                            <Link href="/kontakt" className="w-full block">
                                <Button variant="outline" size="lg" className="w-full h-14 text-lg border-slate-200">
                                    Dennoch anfragen
                                </Button>
                            </Link>
                        </div>
                    </>
                 )}
              </div>
           </div>
        </div>
    )}
    </>
  );
}