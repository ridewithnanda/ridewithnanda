import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          gold: "#FFFFFF",
        },
      },
      maxWidth: {
        site: "1100px",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(255,215,0,0.35)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 700ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;


