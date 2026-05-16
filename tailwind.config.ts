import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: {
          50: "#fdf8f0",
          100: "#f5ead6",
          200: "#e8d2a8",
          300: "#d4b47a",
          400: "#c09050",
          500: "#a67c3a",
          600: "#8a6228",
          700: "#6e4d1e",
          800: "#3d2b10",
          900: "#1a1208",
        },
        obituary: {
          bg: "#0a0806",
          paper: "#1c1610",
          cream: "#f0e6d0",
          dark: "#12100c",
          gold: "#c9a84c",
          red: "#8b1a1a",
          gray: "#4a4540",
        },
      },
      fontFamily: {
        serif: ["Crimson Text", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["Courier Prime", "Courier New", "monospace"],
      },
      backgroundImage: {
        "paper-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      animation: {
        "typewriter": "typewriter 0.05s steps(1) both",
        "flicker": "flicker 3s infinite",
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
