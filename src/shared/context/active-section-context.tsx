"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Typendefinition
interface ActiveSectionContextType {
  activeIcon: LucideIcon | null;
  setActiveIcon: (icon: LucideIcon | null) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

// Provider (wickelt die App ein)
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeIcon, setActiveIcon] = useState<LucideIcon | null>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeIcon, setActiveIcon }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

// Hook für einfachen Zugriff
export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (context === undefined) {
    throw new Error('useActiveSection must be used within an ActiveSectionProvider');
  }
  return context;
}