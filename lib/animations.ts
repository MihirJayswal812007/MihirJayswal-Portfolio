/**
 * lib/animations.ts — Mihir Jayswal Portfolio
 *
 * SINGLE SOURCE OF TRUTH for all Framer Motion variants.
 * Rule: NEVER write Framer Motion variants inline inside components.
 * ALWAYS import from this file.
 *
 * GSAP animations (modals, scroll timelines) are NOT defined here —
 * they live alongside the components that use them, scoped in useEffect.
 *
 * Ref: assets/animations.md in PortfolioVault
 */

import type { Variants } from "framer-motion";

// ── Spring easing curve ─────────────────────────────────────
// Used for anything that "lands" — word swarm, card flips, buttons
export const spring = [0.34, 1.56, 0.64, 1] as const;

// ── Section entry ───────────────────────────────────────────
// Standard entry animation: slides up 40px + fades in.
// Apply to every section's outermost motion element.
export const entry: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    // 700ms easeOut — feels purposeful but not slow
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ── Stagger container ───────────────────────────────────────
// Wrap sibling groups in this to stagger their entry by 80ms.
// Pair with `entry` variant on each child.
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.08, // 80ms stagger per child
      delayChildren:   0,
    },
  },
};

// ── Stagger container — fast (for grid cards) ───────────────
// 50ms stagger for denser grids like Skills + Projects
export const staggerFast: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.05, // 50ms
      delayChildren:   0,
    },
  },
};

// ── Stagger container — slow (for timeline nodes) ──────────
export const staggerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.15, // 150ms
      delayChildren:   0,
    },
  },
};

// ── Scene cut variants ──────────────────────────────────────
// Applied to Hero words on scroll-exit.
// Even words exit left, odd words exit right (toggled via JS).
// Note: These are used as animation targets, not full Variants maps.
// Apply via useAnimate() or animate() from framer-motion in the Hero component.
export const scenecut = {
  exitLeft: {
    opacity: 0,
    x: -120,
    transition: { duration: 0.5, ease: "easeIn" as const },
  },
  exitRight: {
    opacity: 0,
    x: 120,
    transition: { duration: 0.5, ease: "easeIn" as const },
  },
  exitUp: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
} as const;

// ── Word swarm ──────────────────────────────────────────────
// Each word flies in from a random angle and distance.
// Call with the stored origin offset (--ox, --oy from CSS vars).
// Origin is calculated once on mount and stored in component state.
export const wordSwarm = (originX: number, originY: number): Variants => ({
  hidden: {
    opacity: 0,
    x: originX,
    y: originY,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      // Spring physics — lands with a subtle bounce
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
});

// ── Card flip ───────────────────────────────────────────────
// Used by Skills FruitCard (front/back faces).
// Apply via transform-style: preserve-3d on parent.
// Note: GSAP handles modal open — Framer handles this flip only.
export const flipFront: Variants = {
  unflipped: { rotateY: 0 },
  flipped:   { rotateY: -180 },
};
export const flipBack: Variants = {
  unflipped: { rotateY: 180 },
  flipped:   { rotateY: 0 },
};
export const flipTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const,
};

// ── Slide from left / right ─────────────────────────────────
// Used by About section: left col slides from left, right from right.
export const slideFromLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const slideFromRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
  },
};

// ── Fade in only ────────────────────────────────────────────
// For elements that should appear without movement (overlays, etc.)
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ── Loading screen exit ─────────────────────────────────────
// Scale up slightly + fade out — cinematic reveal feel
export const loadingExit: Variants = {
  visible: { opacity: 1, scale: 1 },
  exiting: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// ── Nav link hover ──────────────────────────────────────────
// Subtle underline grow effect for nav items
export const navUnderline: Variants = {
  rest:  { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// ── Counter number ──────────────────────────────────────────
// For About section animated stat counters — fades up on trigger
export const counterEntry: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ── Tab switch (Skills filter) ──────────────────────────────
// Cards exit then enter when filter tab changes
export const tabCardExit: Variants = {
  visible: { opacity: 1, scale: 1 },
  exiting: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};
export const tabCardEntry: Variants = {
  hidden:  { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

// ── Mastery bar fill (Skills card back face) ─────────────────
// Animates width 0 → N% — triggered 300ms after card flip
export const masteryBar = (level: number): Variants => ({
  hidden:  { width: "0%" },
  visible: {
    width: `${level}%`,
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  },
});

// ── Social pill hover ────────────────────────────────────────
// Contact section social row pills
export const pillHover: Variants = {
  rest:  { scale: 1, borderColor: "rgba(200,168,75,0.3)" },
  hover: {
    scale: 1.05,
    borderColor: "rgba(200,168,75,0.9)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ── Idle quote overlay ───────────────────────────────────────
// Easter egg: fades in centred quote after 30s of inactivity
export const idleQuote: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
  exiting: {
    opacity: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};
