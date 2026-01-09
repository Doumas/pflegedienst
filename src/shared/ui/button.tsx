"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"

const buttonVariants = cva(
  // BASIS-STYLES:
  // rounded-2xl: Passt perfekt zu den Karten-Rundungen deines Designs
  // tracking-tight: Moderner Look für fette Schriftarten
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] transform-gpu",
  {
    variants: {
      variant: {
        // DEFAULT: Unser Haupt-Button (Teal)
        default: 
          "bg-[var(--color-primary)] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30",
        
        // ACCENT: Der "Emotionale" Button (Orange) - Ideal für "Jetzt bewerben" oder "Check starten"
        accent:
          "bg-[var(--color-accent)] text-white shadow-xl shadow-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/90 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[var(--color-accent)]/30",

        // SECONDARY: Sanftes Teal/Mint (Sehr gut für sekundäre Aktionen)
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-primary)] border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5 shadow-sm",
        
        // OUTLINE: Weiß mit Teal Rand
        outline:
          "border-2 border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:-translate-y-0.5 shadow-sm",
        
        // GHOST: Dezent, nur beim Hover sichtbar
        ghost:
          "text-slate-600 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]",
        
        // DESTRUCTIVE: Für Warnungen (Rot)
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:-translate-y-0.5",

        // LINK: Einfacher Text-Link mit CI-Farbe
        link:
          "text-[var(--color-primary)] underline-offset-4 hover:underline decoration-2 font-black",
      },
      size: {
        default: "h-12 px-6 py-2", 
        sm: "h-10 px-4 text-xs rounded-xl",
        lg: "h-16 px-10 text-lg rounded-2xl", // Mächtiger für Hero-Sections
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }