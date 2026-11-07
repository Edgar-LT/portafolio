/* ==========================================================================
   TAILWIND DESIGN TOKENS — IDENTITY & HIGH-CLARITY THEME
   Edgar López // Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   ========================================================================== */

if (typeof window !== "undefined") {
  window.tailwindConfig = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "brand-blue": "#2563eb",
          "brand-indigo": "#4f46e5",
          "brand-teal": "#0d9488"
        },
        spacing: {
          "space-xs": "0.25rem",
          "space-sm": "0.5rem",
          "space-md": "1rem",
          "space-lg": "1.5rem",
          "space-xl": "2.5rem",
          "margin": "4rem",
          "margin-tablet": "2rem",
          "margin-mobile": "1.25rem"
        },
        fontFamily: {
          "display": ["Space Grotesk", "sans-serif"],
          "sans": ["Inter", "sans-serif"],
          "mono": ["JetBrains Mono", "monospace"]
        }
      }
    }
  };
  if (typeof tailwind !== "undefined" && tailwind) {
    tailwind.config = window.tailwindConfig;
  }
}

