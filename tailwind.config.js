/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Verde palette ──────────────────────────────
        primary: "#00594E", // Verde oscuro
        "primary-mid": "#347B72", // Verde medio
        "primary-light": "#679C95", // Verde claro
        "primary-lighter": "#9ABDB8", // Verde pálido
        "primary-lightest": "#CCDEDC",// Verde muy claro
        // legacy aliases kept for compatibility
        "primary-dark": "#003D35",
        "emerald-dark": "#003D35",

        // ── Bronce palette ─────────────────────────────
        accent: "#B5A160", // Bronce oscuro
        "accent-mid": "#C4B47F", // Bronce medio
        "accent-light": "#D3C79F", // Bronce claro
        "accent-lighter": "#E1D9BF", // Bronce pálido
        "accent-lightest": "#F0ECDF", // Bronce muy claro
        // legacy aliases
        secondary: "#B5A160",
        "secondary-dark": "#8f7640",
        "accent-gold": "#B5A160",

        // ── Neutrals ───────────────────────────────────
        "background-light": "#F9FAFB",
        "background-dark": "#121212",
        "surface-dark": "#1E1E1E",
        "surface-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'network-light': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        'network-dark': "url('https://www.transparenttextures.com/patterns/black-scales.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

