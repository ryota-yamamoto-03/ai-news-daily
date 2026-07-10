import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // 放送局スタイルのダークネイビー基調パレット
        navy: {
          950: "#050A18",
          900: "#081228",
          800: "#0C1B3A",
          700: "#12264E",
        },
        breaking: {
          DEFAULT: "#E11D2E",
          bright: "#FF2D3F",
          dark: "#9F1220",
        },
        signal: {
          blue: "#2E7CF6",
          cyan: "#39C3F2",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(255, 45, 63, 0.7)" },
          "50%": { opacity: "0.4", boxShadow: "0 0 0 6px rgba(255, 45, 63, 0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1s ease-in-out infinite",
        ticker: "ticker 40s linear infinite",
        "grid-drift": "grid-drift 12s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "spin-slower": "spin-slow 120s linear infinite reverse",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
