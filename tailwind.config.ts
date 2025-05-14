import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      popover: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      greenCircle: "#00b140",
      greenBackground: "#d4f5dd",
      platinum: "#E7E7E7",
      primary: "#4F008C",
      darkprimary: "#21003B",
      secprimary: "#4F008C1a",
      success: "#04BD5E",
      secsuccess: "#04BD5E1a",
      darksuccess: "#0F7177",
      orange: "#FF8861",
      secondary: "#1C2D37",
      header: "#171717e8",
      thirdy: "#F8F4F0",
      natural: "#F0F0F2",
      dark: "#171717",
      secondrydark: "#8D8D8D",
      grey: "#EAF0F5",
      border: "#CACACA",
      subborder: "#E7E7E7",

      placeholder: "#BDC1DF",
      line: "#F5F6FF",
      white: "#ffffff",
      text: "#3E3E3E",
      secondrytext: "#848484",
      "text-light": "var(--website_light_font_color)",
      greynormal: "#F7F7F7",
      secgreynormal: "#FFF5EB",
      footer: "#1E1E1E",
      error: "#EF233C",
      sub: "#818C92",
      transparent: "transparent",
      current: "currentColor",
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      spin: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      spin: "spin 3s linear infinite",
      pulse: "pulseOpacity 1.5s infinite", // Added pulse animation
    },
    screens: {
      xs: "475px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1500px",
      "3xl": "1600px",
    },
    opacity: {
      "2": ".2",
      "5": "0.05",
      "04": ".04",
      "02": ".02",
      "0": "0",
      "25": ".25",
      "50": ".5",
      "75": ".75",
      "10": ".1",
      "20": ".2",
      "30": ".3",
      "40": ".4",
      "60": ".6",
      "70": ".7",
      "80": ".8",
      "90": ".9",
      "100": "1",
    },
    fontFamily: {
      switzer: ["Switzer", "sans-serif"],
      din: ["Din", "sans-serif"],
      Cairo: ["Cairo", "sans-serif"],
      allura: ["Allura", "sans-serif"],
      alex: ["Alex", "sans-serif"],
      URWDin: ["URWDin", "sans-serif"],
      Alex: ["Alex", "sans-serif"],

      SchibstedGrotesk: ["SchibstedGrotesk", "sans-serif"],
    },

    boxShadow: {
      none: "none",
      "card-shadow": "0px 7px 58px 0px #b1b1b11a",
    },
    extend: {
      keyframes: {
        pulseOpacity: {
          "50%": {
            opacity: "0.5",
          },
        },
        accordionUp: {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: "0" },
        },
        accordionDown: {
          "0%": { height: "0" },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        "accordion-up": "accordionUp 0.3s ease-out",
        "accordion-down": "accordionDown 0.3s ease-out",
        pulseOpacity: "pulseOpacity 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      transitionProperty: {
        "font-weight": "font-weight",
      },
    },
    variants: {
      extend: {
        fontWeight: ["hover", "focus"],
      },
    },
    container: {
      center: true,
      screens: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      padding: {
        DEFAULT: "1rem",
        xl: "0",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
