/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0A0B",
        surface: "#121214",
        elevated: "#1A1A1D",
        primary: "#F5F3EE",
        secondary: "#A8A5A0",
        muted: "#6B6864",
        accent: "#C9A227",
        "accent-hover": "#E8C547",
        "border-subtle": "#8A6F1A",
        "on-accent": "#0A0A0B",
        black: "#0A0A0B",
        white: "#F5F3EE",
        danger: "#F87171",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 7vw, 5rem)", { lineHeight: "1.05" }],
        h1: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.875rem, 4vw, 3rem)", { lineHeight: "1.15" }],
        h3: ["clamp(1.375rem, 3vw, 1.875rem)", { lineHeight: "1.25" }],
        body: ["1rem", { lineHeight: "1.75" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "base-8": "0.5rem",
        "section": "6rem",
        "section-mobile": "4rem",
        "gutter": "1.5rem",
      },
      borderRadius: {
        xl: "8px",
        "2xl": "12px",
        "3xl": "12px",
        card: "12px",
        button: "8px",
        pill: "999px",
      },
      maxWidth: {
        "7xl": "75rem",
        content: "75rem",
      },
    },
  },
  plugins: [],
};