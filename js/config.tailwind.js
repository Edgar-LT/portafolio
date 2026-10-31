/* ==========================================================================
   TAILWIND DESIGN TOKENS — CLEAN MINIMALIST DARK THEME
   Edgar López // Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   ========================================================================== */

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#09090b",
        "surface-container-lowest": "#0c0c0f",
        "surface-container-low": "#121216",
        "surface-container": "#141419",
        "surface-container-high": "#1c1c22",
        "surface-container-highest": "#27272f",
        "primary": "#fafafa",
        "on-primary": "#09090b",
        "primary-container": "#fafafa",
        "on-primary-container": "#09090b",
        "secondary": "#a1a1aa",
        "secondary-fixed": "#e4e4e7",
        "tertiary-fixed-dim": "#93c5fd",
        "on-surface": "#f4f4f5",
        "on-surface-variant": "#a1a1aa",
        "outline": "#52525b",
        "outline-variant": "#27272a"
      },
      borderRadius: {
        "sm": "0.25rem",
        "DEFAULT": "0.375rem",
        "md": "0.5rem",
        "lg": "0.625rem",
        "xl": "0.875rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "margin": "4rem",
        "margin-tablet": "2rem",
        "margin-mobile": "1.25rem"
      },
      fontFamily: {
        "headline-xl": ["Space Grotesk", "sans-serif"],
        "headline-xl-mobile": ["Space Grotesk", "sans-serif"],
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "headline-lg-mobile": ["Space Grotesk", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "headline-sm": ["Space Grotesk", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-lg": ["JetBrains Mono", "monospace"],
        "label-md": ["JetBrains Mono", "monospace"],
        "label-sm": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-xl": ["52px", { "lineHeight": "1.12", "letterSpacing": "-0.03em", "fontWeight": "600" }],
        "headline-xl-mobile": ["34px", { "lineHeight": "1.18", "letterSpacing": "-0.025em", "fontWeight": "600" }],
        "headline-lg": ["34px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "headline-lg-mobile": ["26px", { "lineHeight": "1.25", "letterSpacing": "-0.015em", "fontWeight": "600" }],
        "headline-md": ["22px", { "lineHeight": "1.35", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-sm": ["18px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "body-lg": ["17px", { "lineHeight": "1.65", "fontWeight": "400" }],
        "body-md": ["15px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-sm": ["14px", { "lineHeight": "1.55", "fontWeight": "400" }],
        "label-lg": ["13px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "label-md": ["12px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "label-sm": ["11px", { "lineHeight": "1.4", "fontWeight": "500" }]
      }
    }
  }
};
