import type { Config } from "tailwindcss";

/**
 * Tailwind configuration — Mihir Jayswal Portfolio
 *
 * COLOUR SYSTEM (2026-05-18):
 *   All backgrounds unified into one blue-violet near-black hue family.
 *   Lightness shifts ±5% between sections — hue never changes.
 *   bg-deep  → hero + loading (darkest)
 *   bg-mid   → about + projects
 *   bg-raised → skills (lightest = slight visual lift)
 *   bg-base  → body default / fallback
 *
 * MARQUEE:
 *   Animation variable renamed --marquee-duration to avoid collision
 *   with any other CSS vars on the page.
 *   Keyframes use calc(-50% - 0.5rem) for 2-copy seamless loop.
 */

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,tsx}",
  ],
  safelist: [
    "animate-marquee",
    "animate-marquee-reverse",
    "animate-marquee-vertical",
  ],
  theme: {
    extend: {
      // ── Colour tokens ──────────────────────────────────────────
      // Source of truth — never use raw hex in components.
      // All bg-* tokens are in the same blue-violet near-black family.
      colors: {
        // Section backgrounds — unified hue family
        "bg-base":   "#07070F", // body fallback
        "bg-deep":   "#03030A", // hero, loading, contact, footer (darkest)
        "bg-mid":    "#0C0C18", // about, projects
        "bg-raised": "#101022", // skills (slightly lighter = visual lift)

        // Accents
        gold:          "#C8A84B", // The One Ring
        "avatar-blue": "#378ADD", // Avatar bioluminescence
        "luffy-red":   "#E24B4A", // Luffy's vest / Sith
        "teal-accent": "#5DCAA5", // backend category dot

        // Text
        parchment: "#E8DFC0", // LOTR map paper
        dim:       "#9CA3AF", // meta, subtitles, disabled
      },

      // ── Font family vars ────────────────────────────────────────
      fontFamily: {
        cinzel:    ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        inter:     ["var(--font-inter)", "sans-serif"],
        mono:      ["var(--font-jetbrains)", "monospace"],
      },

      // ── Animation keyframes ─────────────────────────────────────
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
        // Amber bloom pulse
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.08)" },
        },
        // Cursor blink
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        // Scroll hint pulse
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
        // Gold shimmer
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        // Horizontal marquee — translate by exactly -50% for 2-copy seamless loop.
        // repeat={2} required. --marquee-duration set per-row via wrapper inline style.
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(calc(-50% - 0.5rem))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-50% - 0.5rem))" },
          to:   { transform: "translateX(0)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to:   { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "grain-shift":      "grain-shift 0.15s steps(1) infinite",
        breathe:            "breathe 4s ease-in-out infinite",
        blink:              "blink 1s step-end infinite",
        "scroll-pulse":     "scroll-pulse 2s ease-in-out infinite",
        crawl:              "crawl 12s linear forwards",
        shimmer:            "shimmer 3s linear infinite",
        // --marquee-duration is set per-row via wrapper div inline style.
        // Using a unique var name to avoid collision with any other CSS vars.
        marquee:            "marquee var(--marquee-duration, 30s) linear infinite",
        "marquee-reverse":  "marquee-reverse var(--marquee-duration, 30s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--marquee-duration, 40s) linear infinite",
      },

      // ── Background sizes ────────────────────────────────────────
      backgroundSize: {
        "200%": "200% auto",
      },

      // ── Scanline overlay ────────────────────────────────────────
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
      },

      // ── Z-index scale ───────────────────────────────────────────
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
