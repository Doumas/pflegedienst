import type { Config } from "tailwindcss";

const config: Config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}" ],
  theme: {
    extend: {
      // 1. FARBEN (Deine Struktur + Ergänzung für Accent Standard)
      colors: {
        primary: { 
          DEFAULT: "var(--color-primary)",           
          foreground: "var(--color-primary-foreground)",
          dark: "var(--color-primary-dark)",
          hover: "var(--color-primary-hover)",       
          deep: "var(--color-primary-deep)",         
        },
        secondary: { 
          DEFAULT: "var(--color-secondary)",         
          foreground: "var(--color-secondary-foreground)" 
        },
        // Ergänzt: Default Accent für die orangenen Highlights
        accent: {
          DEFAULT: "var(--color-accent)",            
          soft: "var(--color-accent-soft)",          
        },
        footer: {
          bg: "var(--color-footer-bg)",              
        },
        border: {
          soft: "var(--color-border-soft)",          
        },
        text: {
          light: "var(--color-text-light)",          
        }
      },

      // 2. TYPOGRAFIE (Das neue Design-System)
      fontSize: {
        // Hero Headlines (Riesig)
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '900' }],
        'display-mobile': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        
        // Sektions-Überschriften (H2)
        'h2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],      // Desktop (60px)
        'h2-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }], // Mobile (36px)
        
        // Karten-Titel (H3)
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }], 
        
        // Fließtext
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '500' }], // Intro-Texte (18px)
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],       // Standard (16px)
        'label': ['0.75rem', { letterSpacing: '0.05em', fontWeight: '700', textTransform: 'uppercase' }], // Badges
      },
      
      // 3. SCHRIFTART (Verbindung zur next/font Variable)
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },

      // 4. CONTAINER (Deine Einstellungen)
      container: { 
        center: true, 
        padding: "1.5rem", 
        screens: { "2xl": "1400px" } 
      },
    },
  },
  // 5. PLUGINS (Wichtig für die Animationen!)
  plugins: [require("tailwindcss-animate")],
};

export default config;