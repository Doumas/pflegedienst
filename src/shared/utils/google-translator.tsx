"use client";

import { useEffect, useState, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// Erweitert das Window-Objekt für TypeScript
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

const LANGUAGES = [
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "hr", label: "Hrvatski", short: "HR" },
];

export function GoogleTranslator({ 
  className, 
  buttonClassName,
  elementId = "google_translate_element" 
}: { 
  className?: string;
  buttonClassName?: string;
  elementId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("de");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Klick außerhalb schließt das Dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialisierung: Cookie lesen & Google Script laden
  useEffect(() => {
    // 1. Aktuelle Sprache aus Cookie lesen
    const cookies = document.cookie.split("; ");
    const langCookie = cookies.find(row => row.startsWith("googtrans="));
    if (langCookie) {
      const lang = langCookie.split("/").pop();
      if (lang === "hr" || lang === "de") {
        setCurrentLang(lang);
      }
    }

    // 2. Google Script laden (falls noch nicht da)
    if (!window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "de",
            includedLanguages: "de,hr", // Nur diese zwei Sprachen laden
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          elementId
        );
      };
      
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [elementId]);

  // Sprache wechseln
  const changeLanguage = (langCode: string) => {
    // Cookie setzen, damit Google weiß, was zu tun ist
    const domain = window.location.hostname;
    document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    
    setCurrentLang(langCode);
    setIsOpen(false);
    window.location.reload(); // Reload für saubere Übersetzung
  };

  return (
    <div className={cn("relative z-50", className)} ref={wrapperRef}>
      
      {/* Das versteckte Google-Element (Muss existieren!) */}
      <div id={elementId} className="hidden pointer-events-none absolute w-0 h-0 overflow-hidden" />

      {/* --- DER BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 group",
          // Standard-Design: Weiß, Slate-Border
          "bg-white border-slate-200 text-slate-600 shadow-sm",
          // Hover-Design: Primary Color Border & Text
          "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5",
          // Active State (wenn offen):
          isOpen && "border-[var(--color-primary)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/10",
          buttonClassName
        )}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold uppercase tracking-wider min-w-[16px]">
            {/* Zeigt aktuell gewählte Sprache an (kurz) */}
            {LANGUAGES.find(l => l.code === currentLang)?.short || "DE"}
        </span>
        <ChevronDown className={cn(
            "w-3 h-3 transition-transform duration-300 opacity-50 group-hover:opacity-100", 
            isOpen && "rotate-180"
        )} />
      </button>

      {/* --- DAS DROPDOWN --- */}
      <div 
        className={cn(
          "absolute right-0 top-full mt-2 w-40 bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 origin-top-right transition-all duration-200 ease-out z-[100]",
          isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-1">
            {LANGUAGES.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={cn(
                            "flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-xl transition-colors",
                            isActive 
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" 
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <span className="flex items-center gap-2">
                           {/* Kleiner Punkt für optische Struktur */}
                           <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-[var(--color-primary)]" : "bg-slate-300")} />
                           {lang.label}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5" />}
                    </button>
                )
            })}
        </div>
      </div>
    </div>
  );
}