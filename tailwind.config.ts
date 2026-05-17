import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for Mihir Jayswal's cinematic portfolio.
 * All colour tokens defined here — never use raw hex in components.
 * Font variables injected via CSS vars from app/layout.tsx.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Colour tokens ─────────────────────────────────────────
      // Source of truth: assets/colours.md in PortfolioVault
      // Never reference these as raw hex — always use the token name.
      colors: {
        "bg-base":    "#02020A", // Hero + Loading bg — Interstellar void
        "bg-section": "#111827", // Alternating sections — Dark series night
        "bg-warm":    "#1C1A14", // Warm sections — Mordor lava glow
        gold:         "#C8A84B", // Primary accent — The One Ring
        "avatar-blue":"#378ADD", // Secondary accent — Avatar bioluminescence
        "luffy-red":  "#E24B4A", // Danger / easter eggs — Luffy's vest / Sith
        parchment:    "#E8DFC0", // Body text — LOTR map paper
        dim:          "#9CA3AF", // Meta, subtitles, disabled states
      },

      // ── Font family vars ─────────────────────────────────────
      // Injected in app/layout.tsx via next/font/google → CSS vars
      fontFamily: {
        cinzel:     ["var(--font-cinzel)", "serif"],      // Display / H1
        cormorant:  ["var(--font-cormorant)", "serif"],   // H2 / section headings / quotes
        inter:      ["var(--font-inter)", "sans-serif"],  // Body / UI
        mono:       ["var(--font-jetbrains)", "monospace"], // Terminal / code only
      },

      // ── Animation keyframes ──────────────────────────────────
      keyframes: {
        // Film grain — subtle noise overlay
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":      { transform: "translate(-2%, -3%)" },
          "20%":      { transform: "translate(1%, 2%)" },
          "30%":      { transform: "translate(-1%, 1%)" },
          "40%":      { transform: "translate(3%, -2%)" },
          "50%":      { transform: "translate(-2%, 3%)" },
          "60%":      { transform: "translate(2%, -1%)" },
          "70%":      { transform: "translate(-3%, 2%)" },
          "80%":      { transform: "translate(1%, -3%)" },
          "90%":      { transform: "translate(-1%, 1%)" },
        },
        // Amber bloom pulse — Hero background glow
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.08)" },
        },
        // Cursor blink for typewriter
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        // Scroll hint line pulse
        "scroll-pulse": {
          "0%, 100%": { opacity: "0.3", scaleY: "1" },
          "50%":      { opacity: "1",   scaleY: "1.2" },
        },
        // Star Wars crawl
        crawl: {
          "0%":   { transform: "perspective(300px) rotateX(20deg) translateY(0%)" },
          "100%": { transform: "perspective(300px) rotateX(20deg) translateY(-200%)" },
        },
        // Timeline node fill
        "node-fill": {
          "0%":   { backgroundColor: "transparent", borderColor: "#9CA3AF" },
          "100%": { backgroundColor: "#C8A84B",     borderColor: "#C8A84B" },
        },
        // Gold shimmer for border
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        // Horizontal marquee — translates by -100% so one full copy exits left
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-100%)" },
        },
        // Vertical marquee — same principle on Y axis
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to:   { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "grain-shift":       "grain-shift 0.15s steps(1) infinite",
        breathe:             "breathe 4s ease-in-out infinite",
        blink:               "blink 1s step-end infinite",
        "scroll-pulse":      "scroll-pulse 2s ease-in-out infinite",
        crawl:               "crawl 12s linear forwards",
        shimmer:             "shimmer 3s linear infinite",
        // Speed is overridden per-row via --duration CSS variable on the element
        marquee:             "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical":  "marquee-vertical var(--duration, 40s) linear infinite",
      },

      // ── Background sizes ─────────────────────────────────────
      backgroundSize: {
        "200%": "200% auto",
      },

      // ── Scanline overlay ─────────────────────────────────────
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
      },

      // ── Z-index scale ────────────────────────────────────────
      zIndex: {
        grain:   "5",
        nav:     "50",
        modal:   "60",
        loading: "100",
        cursor:  "9999",
      },
    },
  },
  plugins: [],
};

export default config;
