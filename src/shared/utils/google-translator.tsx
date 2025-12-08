"use client";

import { useEffect, useState, useRef } from "react";
import { Globe, X, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export function GoogleTranslator({ 
  className, 
  buttonClassName,
  elementId = "google_translate_element" 
}: { 
  className?: string;
  buttonClassName?: string;
  elementId?: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clearGoogleCookie = () => {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + window.location.hostname + "; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isActive) {
      const drawWidget = () => {
        if (window.google?.translate?.TranslateElement && document.getElementById(elementId)) {
            const container = document.getElementById(elementId);
            if(container && container.innerHTML.trim() !== "") return;

            clearGoogleCookie();
            new window.google.translate.TranslateElement(
                {
                pageLanguage: "de",
                autoDisplay: false,
                // UPDATE: Deutsch, Englisch, Kroatisch, Serbisch
                includedLanguages: "de,en,hr,sr", 
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                elementId
            );
        }
      };

      if (!document.getElementById("google-translate-script")) {
        window.googleTranslateElementInit = () => {};
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      const checkInterval = setInterval(() => {
        if (window.google?.translate?.TranslateElement) {
          drawWidget();
          clearInterval(checkInterval);
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, [isActive, elementId]);

  return (
    <div className={cn("relative z-50", className)} ref={wrapperRef}>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (!isActive) setIsActive(true);
          setIsOpen(!isOpen);
        }}
        className={cn(
          "flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer relative z-50",
          !buttonClassName && "bg-white border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary",
          buttonClassName
        )}
        title="Sprache / Language / Jezik"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Sprache</span>
        <span className="sm:hidden">DE</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform opacity-50", isOpen && "rotate-180")} />
      </button>

      <div 
        className={cn(
          "absolute right-0 top-full mt-2 w-48 bg-white p-3 rounded-xl shadow-xl border border-slate-100 origin-top-right transition-all duration-200 z-[100]",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center mb-2 border-b border-slate-50 pb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Auswahl</span>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-3 h-3" />
          </button>
        </div>
        
        <div className="min-h-[40px]">
          <div id={elementId} className="w-full" />
          {isActive && !window.google?.translate && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" /> Laden...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}