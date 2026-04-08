import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#2A3F6B",
          dark: "#0F1A30",
          50: "#E8EBF0",
          100: "#C5CCDA",
          200: "#9FADC4",
          300: "#7A8EAE",
          400: "#4A6690",
          500: "#1B2A4A",
          600: "#172442",
          700: "#131E38",
          800: "#0F1A30",
          900: "#0A1120",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E5D89A",
          dark: "#A88A32",
          50: "#FAF6EB",
          100: "#F2E9C8",
          200: "#E5D89A",
          300: "#D9C46E",
          400: "#C9A84C",
          500: "#B5933A",
          600: "#A88A32",
          700: "#8A7028",
          800: "#6C581F",
          900: "#4E3F16",
        },
        cream: "#FAF8F5",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        pulse_gold: "pulseGold 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(201, 168, 76, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-navy":
          "linear-gradient(135deg, #1B2A4A 0%, #0F1A30 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C9A84C 0%, #E5D89A 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #0F1A30 0%, #1B2A4A 50%, #2A3F6B 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 26, 48, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(15, 26, 48, 0.2)",
        gold: "0 4px 20px 0 rgba(201, 168, 76, 0.25)",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
