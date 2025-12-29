import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"

const buttonVariants = cva(
  // BASIS-STYLES:
  // 1. rounded-full: Pillenform statt Ecken
  // 2. font-bold: Bessere Lesbarkeit
  // 3. active:scale-95: Der "Klick-Effekt" (Eindrücken)
  // 4. transition-all: Alles animieren (Farbe, Position, Schatten)
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // DEFAULT: Unser Haupt-Button (Petrol)
        // Schwebt beim Hovern leicht hoch (-translate-y-1) und wirft mehr Schatten
        default: 
          "bg-[var(--color-primary)] text-white shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/90 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30",
        
        // DESTRUCTIVE: Für Fehler/Löschen (Rot)
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:-translate-y-0.5",
        
        // OUTLINE: Weißer Hintergrund, Petrol Rand
        outline:
          "border-2 border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5 shadow-sm",
        
        // SECONDARY: Mint/Hellblau Hintergrund (Sehr passend für dein Design!)
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-primary)] border border-[var(--color-primary)]/5 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        
        // GHOST: Nur Text, Hover wird Hellblau
        ghost:
          "hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]",
        
        // LINK: Einfacher Text-Link
        link:
          "text-[var(--color-primary)] underline-offset-4 hover:underline decoration-2",
      },
      size: {
        // Größere Standard-Größe für bessere Touch-Bedienung
        default: "h-12 px-6 py-2", 
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8 text-base", // Perfekt für Hero-Sections
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