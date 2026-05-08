/**
 * components/Skills/data.ts
 *
 * All Devil Fruit skill definitions.
 * Colour values must reference Tailwind token names only (no raw hex).
 */

export type Category = "all" | "ai-ml" | "frontend" | "backend" | "tools";
export type FruitType = "Logia" | "Paramecia" | "Zoan";

export interface Skill {
  id: string;
  name: string;
  fruitName: string;       // Japanese-style fruit name
  fruitType: FruitType;
  emoji: string;            // Visual icon for the card front
  category: Exclude<Category, "all">;
  /** Tailwind colour token used for the radial glow and mastery bar */
  colorToken: string;
  /** CSS color value for glows — must match the token */
  colorHex: string;
  level: number;            // 0-100 mastery
  ability: string;          // Flavour text for card back
}

export const skills: Skill[] = [
  // ── AI / ML ────────────────────────────────────────────────
  {
    id: "python",
    name: "Python",
    fruitName: "Hebi-Hebi no Mi",
    fruitType: "Logia",
    emoji: "🐍",
    category: "ai-ml",
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    level: 88,
    ability: "User becomes a living serpent of logic — coiling through data pipelines with effortless elegance.",
  },
  {
    id: "ml",
    name: "Machine Learning",
    fruitName: "Chi-Chi no Mi",
    fruitType: "Paramecia",
    emoji: "🧠",
    category: "ai-ml",
    colorToken: "purple",
    colorHex: "#9B59B6",
    level: 75,
    ability: "Grants the ability to see patterns invisible to ordinary eyes, predicting futures through sheer intellect.",
  },
  {
    id: "langchain",
    name: "LangChain",
    fruitName: "Rensa-Rensa no Mi",
    fruitType: "Paramecia",
    emoji: "⛓️",
    category: "ai-ml",
    colorToken: "gold",
    colorHex: "#C8A84B",
    level: 70,
    ability: "Chains thought itself — linking language models into reasoning engines of unstoppable intelligence.",
  },

  // ── Frontend ────────────────────────────────────────────────
  {
    id: "react",
    name: "React / Next.js",
    fruitName: "Kumo-Kumo no Mi",
    fruitType: "Logia",
    emoji: "⚛️",
    category: "frontend",
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    level: 82,
    ability: "Weaves interfaces like a spider spins silk — reactive, declarative, inescapably fast.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    fruitName: "Kaze-Kaze no Mi",
    fruitType: "Paramecia",
    emoji: "🌬️",
    category: "frontend",
    colorToken: "gold",
    colorHex: "#C8A84B",
    level: 80,
    ability: "Commands the gale of utility classes — styling entire UIs with the speed of thought.",
  },
  {
    id: "gsap",
    name: "GSAP / Framer",
    fruitName: "Ugoki-Ugoki no Mi",
    fruitType: "Zoan",
    emoji: "✨",
    category: "frontend",
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    level: 65,
    ability: "Breathes life into static elements — every pixel may move, bounce, or vanish at will.",
  },

  // ── Backend ─────────────────────────────────────────────────
  {
    id: "nodejs",
    name: "Node.js",
    fruitName: "Mori-Mori no Mi",
    fruitType: "Logia",
    emoji: "🌲",
    category: "backend",
    colorToken: "gold",
    colorHex: "#C8A84B",
    level: 72,
    ability: "Grows server logic like an ancient forest — asynchronous, non-blocking, ever-expanding.",
  },
  {
    id: "database",
    name: "PostgreSQL / MongoDB",
    fruitName: "Tochi-Tochi no Mi",
    fruitType: "Paramecia",
    emoji: "🗄️",
    category: "backend",
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    level: 68,
    ability: "Merges with the earth of data — storing, querying, and shaping information at the root level.",
  },

  // ── Tools ───────────────────────────────────────────────────
  {
    id: "git",
    name: "Git / GitHub",
    fruitName: "Tako-Tako no Mi",
    fruitType: "Zoan",
    emoji: "🐙",
    category: "tools",
    colorToken: "dim",
    colorHex: "#9CA3AF",
    level: 85,
    ability: "Extends eight arms through every branch of history — no commit forgotten, no merge feared.",
  },
];

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all",      label: "All Fruits" },
  { key: "ai-ml",   label: "AI / ML" },
  { key: "frontend", label: "Frontend" },
  { key: "backend",  label: "Backend" },
  { key: "tools",    label: "Tools" },
];
