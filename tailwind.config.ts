import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-dm-serif)", "DM Serif Display", "Georgia", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2D4A89",
          50: "#F0F4FF",
          100: "#E1E9FF",
          500: "#2D4A89",
          600: "#1E3A75",
          700: "#152B5C",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#E1C16E",
          50: "#FDF9F0",
          100: "#FBF3E1",
          500: "#E1C16E",
          600: "#D4A94A",
          700: "#B8912A",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#F13C20",
          50: "#FFF2F0",
          100: "#FFE5E1",
          500: "#F13C20",
          600: "#D12B0F",
          700: "#B01F08",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      letterSpacing: {
        tighter: "-0.02em",
      },
      lineHeight: {
        relaxed: "1.75",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
