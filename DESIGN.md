---
name: Kinetic Precision
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#70ffba'
  on-secondary: '#003822'
  secondary-container: '#01e599'
  on-secondary-container: '#00613e'
  tertiary: '#eef7ff'
  on-tertiary: '#00354a'
  tertiary-container: '#aee0ff'
  on-tertiary-container: '#00668b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#4dffb2'
  secondary-fixed-dim: '#00e297'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005234'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-precision digital environment that bridges mechanical hardware engineering, robotics, and advanced software development. Tailored for an ambitious Mechatronics Engineer, Full-Stack Web, and Mobile Developer, the visual identity embodies rigorous craftsmanship, computational clarity, and architectural elegance.

The UI style merges **Technical Minimalism** with nuanced **Glassmorphism** and architectural grid structures. Rather than relying on gratuitous cyberpunk tropes, it conveys a measured, lab-grade aesthetic: deep obsidian-slate backdrops, subtle geometric alignments, sub-pixel grid lines, and high-energy cyan/electric-teal accents that evoke telemetry monitors, schematic blueprints, and high-performance compilation environments.

Targeted toward engineering leads, tech recruiters, deep-tech founders, and hardware-software collaborators, the experience evokes trust, technical mastery, and meticulous attention to detail.

## Colors

The palette operates in an immersive, high-contrast dark space engineered for prolonged technical review and visual impact:

- **Primary (`#00F0FF`)**: "Hyper Cyan" — reserved for active states, interactive focal points, cursor track indicators, and live telemetry data badges.
- **Secondary (`#00E599`)**: "Kinetic Emerald" — signifies mechatronic systems, successful deployment states, hardware verification, and active real-time status loops.
- **Tertiary (`#38BDF8`)**: "Signal Sky" — structural accents, secondary interactive components, code block tokens, and link hover transitions.
- **Neutral (`#0B0F17`)**: "Deep Obsidian Slate" — the anchoring foundation, paired with tiered tonal steps (`#111827`, `#1F2937`, `#374151`) and subdued technical borders (`rgba(255, 255, 255, 0.08)`).
- **Text & Foreground**: Pure White (`#FFFFFF`) for primary titles, Ice Gray (`#94A3B8`) for body prose, and Muted Slate (`#64748B`) for technical timestamps and metadata annotations.

## Typography

The typographic hierarchy establishes distinct functional domains:

1. **Display & Section Titles (`Space Grotesk`)**: Imparts structured, mechanical authority with subtle geometric idiosyncrasies that speak to both engineering schematics and modern digital design.
2. **Body & Descriptive Prose (`Inter`)**: Delivers supreme legibility, neutral balance, and effortless reading across case studies, research papers, and technical project manifests.
3. **Labels, Code & Hardware Telemetry (`JetBrains Mono`)**: Accents the interface with precise, monospace cadence for metrics (e.g., `PWM: 24kHz`, `FPS: 120`, `V: 3.3V`), git commits, stack tags, and sub-labels.

All headings employ tight negative tracking to maintain density, while monospace labels use expanded tracking to reinforce an instrument-panel feel.

## Layout & Spacing

The design system enforces a 12-column fluid grid system on desktop, collapsing to an 8-column layout on tablet devices and a 4-column layout on mobile viewports.

- **Desktop (1024px+)**: Max content container constrained to `1280px` centered with dynamic outer margins starting at `margin: 4rem`. Column gutter rests at `gutter: 1.5rem`.
- **Tablet (768px - 1023px)**: Fluid 8-column structure with `margin-tablet: 2rem` and 1.25rem gutters.
- **Mobile (< 768px)**: Compact 4-column structure with `margin-mobile: 1.25rem` and `gutter-mobile: 1rem`.

Spacing operates strictly along an 8-point base module (with a 4-point micro-step for compact components), ensuring mechanical rhythm and consistent alignment across complex schematics, mobile device mockups, and layout containers.

## Elevation & Depth

Visual depth is achieved through **low-contrast architectural outlines** blended with **subtle glassmorphism** and **cyan ambient glows**, avoiding generic blurred drop shadows:

- **Level 0 (Canvas Base)**: `#0B0F17` uninterrupted background, optionally mapped with a faint 24px isometric or Cartesian grid pattern at 3% opacity.
- **Level 1 (Card & Module Surfaces)**: `rgba(17, 24, 39, 0.7)` with `backdrop-filter: blur(12px)` and a precise hairline border: `1px solid rgba(255, 255, 255, 0.08)`.
- **Level 2 (Active/Hover Cards & Popovers)**: `rgba(22, 32, 50, 0.85)` with a targeted border highlight: `1px solid rgba(0, 240, 255, 0.35)` and a localized inner shadow `inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`.
- **Level 3 (Focused & Interactive Overlays)**: `rgba(15, 23, 42, 0.95)` framed with a directional ambient glow: `0 0 24px -4px rgba(0, 240, 255, 0.18)` and an accented top border.

## Shapes

The design system adopts a controlled **Soft (`roundedness: 1`)** geometry. 

- Micro-elements, badges, and inline buttons utilize a standard `0.25rem` (4px) radius.
- Standard modules, modal dialogs, and project viewports utilize `rounded-lg` (`0.5rem` / 8px).
- Complex application previews and outer wrappers cap at `rounded-xl` (`0.75rem` / 12px).

This restrained edge radius reinforces structural integrity and hardware precision, avoiding overly playful ballooning while softening brutalist harshness into a sleek, instrument-grade silhouette.

## Components

### Buttons
- **Primary**: Solid background with a linear gradient (`linear-gradient(135deg, #00F0FF 0%, #00B8D4 100%)`), text set in `#0B0F17` using `Space Grotesk` Medium, with a subtle hover expansion and ambient cyan edge glow (`0 0 16px rgba(0, 240, 255, 0.4)`).
- **Secondary (Outline)**: Ghost surface (`rgba(255, 255, 255, 0.03)`), bordered by `1px solid rgba(255, 255, 255, 0.15)`. On hover, the border shifts to `#00F0FF` and text brightens to `#FFFFFF`.
- **Monospace Action**: Designed for hardware terminal triggers or code downloads; features bracket delimiters (`[ view_schematic.dxf ]`) rendered in `JetBrains Mono`.

### Chips & Badges
- Compact padding (`0.25rem 0.625rem`), `JetBrains Mono` label-sm text.
- Stack categorization tags (e.g., `ROS2`, `Flutter`, `Next.js`, `Embedded C++`) feature a dark slate fill (`rgba(255, 255, 255, 0.04)`), a 1px border (`rgba(255, 255, 255, 0.08)`), and a micro colored indicator dot (3px diameter) representing category (Hardware: Emerald, Web: Cyan, Mobile: Sky).

### Project & Experiment Cards
- Built using Level 1 glass surfaces.
- Incorporate a technical header bar featuring breadcrumbs (e.g., `PROJECT // 03`), status flags (`SYS.ACTIVE`), and a hover state that softly reveals an underlying technical coordinate grid.
- Media windows (3D CAD renders, web app viewports, mobile screens) are recessed with a 1px border and an inner shadow to simulate embedded glass displays.

### Form Inputs & Terminal Fields
- Dark input wells (`#090D14`) with inset hairline borders (`rgba(255, 255, 255, 0.1)`).
- Focus states transition the border instantly to `#00F0FF` with a subtle box-shadow pulse (`0 0 0 2px rgba(0, 240, 255, 0.15)`).
- Monospace placeholders and prompt prefixes (e.g., `cmd > `) for technical engagement.

### Checkboxes & Toggle Switches
- Monospace square checkbox with hard cut micro-corners (`2px`), activating with a solid cyan fill and deep slate checkmark icon.
- Toggles resemble tactile CNC rocker switches: muted track (`rgba(255, 255, 255, 0.1)`) with a sliding metallic-styled knob that illuminates green (`#00E599`) when engaged.

### Specialized Portfolio Components
- **Telemetry HUD**: Displays current availability, firmware/software versioning, and real-time GitHub/CI-CD build status in `JetBrains Mono`.
- **CAD/Mobile Interactive Split-Viewer**: A bifurcated module displaying responsive mobile application screen previews on one flank and interactive 3D mechanical components or kinematic schematics on the other.