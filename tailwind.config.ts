import type { Config } from "tailwindcss";

const config: Config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}" ],
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: "var(--color-primary)",           // Rose-700
          foreground: "var(--color-primary-foreground)",
          dark: "var(--color-primary-dark)",
          hover: "var(--color-primary-hover)",       // Rose-800 (NEU: auch für Border nutzbar)
          deep: "var(--color-primary-deep)",         // Rose-900
        },
        secondary: { 
          DEFAULT: "var(--color-secondary)",         // Rose-50
          foreground: "var(--color-secondary-foreground)" 
        },
        footer: {
          bg: "var(--color-footer-bg)",              // Rose-950
        },
        border: {
          soft: "var(--color-border-soft)",          // Rose-200
        },
        accent: {
          soft: "var(--color-accent-soft)",          // Rose-300
        },
        text: {
          light: "var(--color-text-light)",          // Rose-100
        }
      },
      container: { center: true, padding: "1.5rem", screens: { "2xl": "1400px" } },
    },
  },
  plugins: [],
};
export default config;