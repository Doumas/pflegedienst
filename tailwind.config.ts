import type { Config } from "tailwindcss";

const config: Config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}" ],
  theme: {
    extend: {
      // 1. FARBEN
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

      // 2. TYPOGRAFIE
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '900' }],
        'display-mobile': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        'h2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        'h2-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }], 
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '500' }], 
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['0.75rem', { letterSpacing: '0.05em', fontWeight: '700', textTransform: 'uppercase' }],
      },
      
      // 3. SCHRIFTART (Hier ist das Update!)
      fontFamily: {
        // Inter (Standard) - muss zur Variable in layout.tsx passen (--font-inter)
        sans: ["var(--font-inter)", "sans-serif"],
        // Dancing Script (Neu) - für das Logo
        script: ["var(--font-dancing)", "cursive"],
      },

      // 4. CONTAINER
      container: { 
        center: true, 
        padding: "1.5rem", 
        screens: { "2xl": "1400px" } 
      },
    },
  },
  // 5. PLUGINS
  plugins: [require("tailwindcss-animate")],
};

export default config;