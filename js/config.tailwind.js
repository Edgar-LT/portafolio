/* ==========================================================================
   TAILWIND DESIGN TOKENS — KINETIC PRECISION (DESIGN.md)
   ========================================================================== */

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#aee0ff",
        "on-primary-fixed": "#002022",
        "surface-container-high": "#262a33",
        "inverse-primary": "#006970",
        "on-tertiary-container": "#00668b",
        "surface-dim": "#0f131c",
        "on-secondary": "#003822",
        "tertiary-fixed": "#c4e7ff",
        "primary-fixed-dim": "#00dbe9",
        "surface-container-lowest": "#0a0e16",
        "on-background": "#dfe2ee",
        "on-tertiary": "#00354a",
        "error-container": "#93000a",
        "on-primary-fixed-variant": "#004f54",
        "on-error-container": "#ffdad6",
        "surface-container-highest": "#31353e",
        "on-primary": "#00363a",
        "on-primary-container": "#006970",
        "tertiary": "#eef7ff",
        "surface-bright": "#353942",
        "outline-variant": "#3b494b",
        "secondary": "#70ffba",
        "on-error": "#690005",
        "background": "#0f131c",
        "on-secondary-fixed-variant": "#005234",
        "secondary-fixed": "#4dffb2",
        "on-surface": "#dfe2ee",
        "inverse-surface": "#dfe2ee",
        "surface-container-low": "#181c24",
        "tertiary-fixed-dim": "#7bd0ff",
        "surface-container": "#1c2028",
        "secondary-fixed-dim": "#00e297",
        "on-tertiary-fixed-variant": "#004c69",
        "surface-tint": "#00dbe9",
        "primary-container": "#00f0ff",
        "inverse-on-surface": "#2c3039",
        "secondary-container": "#01e599",
        "on-tertiary-fixed": "#001e2c",
        "on-surface-variant": "#b9cacb",
        "primary-fixed": "#7df4ff",
        "on-secondary-container": "#00613e",
        "primary": "#dbfcff",
        "surface": "#0f131c",
        "on-secondary-fixed": "#002112",
        "surface-variant": "#31353e",
        "outline": "#849495",
        "error": "#ffb4ab"
      },
      borderRadius: {
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
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
        "headline-xl": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.03em", "fontWeight": "700" }],
        "headline-xl-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "body-md": ["15px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-sm": ["13px", { "lineHeight": "20px", "fontWeight": "400" }],
        "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "500" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "500" }],
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.06em", "fontWeight": "400" }]
      }
    }
  }
};
