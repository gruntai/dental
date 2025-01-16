import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        "1.5s": "1500ms",
        "2s": "2000ms",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "pulse-ongoing": {
          "0%": {
            // transform: "scale(1)",
            boxShadow: "0 0 0 0 var(--state-ongoing)",
            opacity: "1",
          },
          "50%": {
            // transform: "scale(1.01)",
            // boxShadow: "0 0 0 10px var(--state-ongoing)",
            boxShadow: "0 0 0 25px rgba(229, 62, 62, 0)",
            opacity: "0.5",
          },
          "100%": {
            // transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        "pulse-ongoing": "pulse-ongoing 2s infinite",
      },
      // animation: {
      //   pulse: "pulse 3s ease-in-out infinite", // Extend the duration to 3s
      // },
      // keyframes: {
      //   pulse: {
      //     "0%, 100%": {
      //       opacity: "1",
      //       boxShadow: "0 0 0 0 var(--state-ongoing)",
      //     }, // Stronger shadow
      //     "50%": {
      //       opacity: "0.5",
      //       boxShadow: "0 0 0 15px rgba(229, 62, 62, 0)",
      //     },
      //     "100%": {
      //       opacity: "1",
      //       // boxShadow: "0 0 0 0 var(--state-ongoing)",
      //     } // Shadow change at mid pulse
      //   },
      // },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
