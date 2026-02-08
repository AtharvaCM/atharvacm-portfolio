import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        text: "hsl(var(--text) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        glow: "0 20px 80px -40px hsl(var(--accent) / 0.5)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite"
      }
    }
  },
  plugins: [typography]
};

export default config;
