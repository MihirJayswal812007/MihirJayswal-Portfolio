/**
 * lib/skills-data.ts
 *
 * Single source of truth for all skill definitions.
 * Used by: SkillsSection (marquee + icon cloud), DevilFruitModal (flip cards).
 *
 * Colour tokens must match tailwind.config.ts — never use raw hex in components.
 */

// ── Types ───────────────────────────────────────────────────────────────────

export type Category = "all" | "ai-ml" | "frontend" | "backend" | "tools";
export type FruitType = "Logia" | "Paramecia" | "Zoan";

export interface Skill {
  id: string;
  name: string;
  category: Exclude<Category, "all">;

  // Mastery level 0-100
  level: number;

  // Marquee badge dot colour
  colorToken: string;   // Tailwind token (for className usage)
  colorHex: string;     // Hex (for CSS-in-JS inline styles only — unavoidable)

  // Icon Cloud: SimpleIcons slug (null = no cloud icon for this skill)
  iconSlug: string | null;

  // Devil Fruit card data
  fruitName: string;
  fruitType: FruitType;
  emoji: string;
  ability: string;
}

// ── Skill Definitions ───────────────────────────────────────────────────────

export const skills: Skill[] = [

  // ── AI / ML ──────────────────────────────────────────────────
  {
    id: "python",
    name: "Python",
    category: "ai-ml",
    level: 88,
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    iconSlug: "python",
    fruitName: "Hebi-Hebi no Mi",
    fruitType: "Logia",
    emoji: "🐍",
    ability: "User becomes a living serpent of logic — coiling through data pipelines with effortless elegance.",
  },
  {
    id: "ml",
    name: "Machine Learning",
    category: "ai-ml",
    level: 75,
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    iconSlug: "scikitlearn",     // scikit-learn as closest ML icon
    fruitName: "Chi-Chi no Mi",
    fruitType: "Paramecia",
    emoji: "🧠",
    ability: "Grants the ability to see patterns invisible to ordinary eyes, predicting futures through sheer intellect.",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai-ml",
    level: 70,
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    iconSlug: "langchain",       // may not exist; IconCloud handles gracefully
    fruitName: "Rensa-Rensa no Mi",
    fruitType: "Paramecia",
    emoji: "⛓️",
    ability: "Chains thought itself — linking language models into reasoning engines of unstoppable intelligence.",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai-ml",
    level: 68,
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    iconSlug: "pytorch",
    fruitName: "Honoo-Honoo no Mi",
    fruitType: "Logia",
    emoji: "🔥",
    ability: "Ignites tensors into blazing neural fire — training deep networks with the fury of a furnace.",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai-ml",
    level: 65,
    colorToken: "avatar-blue",
    colorHex: "#378ADD",
    iconSlug: "tensorflow",
    fruitName: "Kago-Kago no Mi",
    fruitType: "Zoan",
    emoji: "🕸️",
    ability: "Weaves computation graphs like cosmic webs — every tensor flows through an orchestrated destiny.",
  },

  // ── Frontend ─────────────────────────────────────────────────
  {
    id: "react",
    name: "React / Next.js",
    category: "frontend",
    level: 82,
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    iconSlug: "react",
    fruitName: "Kumo-Kumo no Mi",
    fruitType: "Logia",
    emoji: "⚛️",
    ability: "Weaves interfaces like a spider spins silk — reactive, declarative, inescapably fast.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: 80,
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    iconSlug: "tailwindcss",
    fruitName: "Kaze-Kaze no Mi",
    fruitType: "Paramecia",
    emoji: "🌬️",
    ability: "Commands the gale of utility classes — styling entire UIs with the speed of thought.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 78,
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    iconSlug: "typescript",
    fruitName: "Tetsu-Tetsu no Mi",
    fruitType: "Paramecia",
    emoji: "🔷",
    ability: "Armours every line of code in iron-strict types — runtime errors cannot pierce this defence.",
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "frontend",
    level: 65,
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    iconSlug: "framer",
    fruitName: "Odori-Odori no Mi",
    fruitType: "Zoan",
    emoji: "🎭",
    ability: "Forces any element to dance on command — physics, spring, and inertia obey this power.",
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "frontend",
    level: 62,
    colorToken: "luffy-red",
    colorHex: "#E24B4A",
    iconSlug: "greensock",        // GSAP's SimpleIcons slug
    fruitName: "Ugoki-Ugoki no Mi",
    fruitType: "Zoan",
    emoji: "✨",
    ability: "Breathes life into static elements — every pixel may move, bounce, or vanish at will.",
  },

  // ── Backend ──────────────────────────────────────────────────
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: 72,
    colorToken: "gold",
    colorHex: "#C8A84B",
    iconSlug: "nodedotjs",
    fruitName: "Mori-Mori no Mi",
    fruitType: "Logia",
    emoji: "🌲",
    ability: "Grows server logic like an ancient forest — asynchronous, non-blocking, ever-expanding.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: 68,
    colorToken: "gold",
    colorHex: "#C8A84B",
    iconSlug: "postgresql",
    fruitName: "Tochi-Tochi no Mi",
    fruitType: "Paramecia",
    emoji: "🐘",
    ability: "Stores knowledge in relational earth — ACID transactions flow like lava, slow but unstoppable.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    level: 65,
    colorToken: "gold",
    colorHex: "#C8A84B",
    iconSlug: "mongodb",
    fruitName: "Docu-Docu no Mi",
    fruitType: "Paramecia",
    emoji: "🍃",
    ability: "Shapes data into any form — schema-free, infinitely flexible, adapting like water to any container.",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    level: 60,
    colorToken: "gold",
    colorHex: "#C8A84B",
    iconSlug: "express",
    fruitName: "Hayai-Hayai no Mi",
    fruitType: "Logia",
    emoji: "⚡",
    ability: "Routes every request at the speed of light — minimalist, unopinionated, and brutally efficient.",
  },

  // ── Tools ────────────────────────────────────────────────────
  {
    id: "git",
    name: "Git / GitHub",
    category: "tools",
    level: 85,
    colorToken: "dim",
    colorHex: "#9CA3AF",
    iconSlug: "git",
    fruitName: "Tako-Tako no Mi",
    fruitType: "Zoan",
    emoji: "🐙",
    ability: "Extends eight arms through every branch of history — no commit forgotten, no merge feared.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    level: 58,
    colorToken: "dim",
    colorHex: "#9CA3AF",
    iconSlug: "docker",
    fruitName: "Hako-Hako no Mi",
    fruitType: "Paramecia",
    emoji: "🐳",
    ability: "Seals entire environments into indestructible containers — ship anywhere, break nothing.",
  },
  {
    id: "jupyter",
    name: "Jupyter",
    category: "tools",
    level: 72,
    colorToken: "dim",
    colorHex: "#9CA3AF",
    iconSlug: "jupyter",
    fruitName: "Note-Note no Mi",
    fruitType: "Paramecia",
    emoji: "📓",
    ability: "Transforms thought experiments into living documents — code and narrative inseparably merged.",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    level: 70,
    colorToken: "dim",
    colorHex: "#9CA3AF",
    iconSlug: "vercel",
    fruitName: "Kara-Kara no Mi",
    fruitType: "Logia",
    emoji: "▲",
    ability: "Deploys to the edge of the earth in seconds — builds vanish into global infrastructure without a trace.",
  },
];

// ── Category map ─────────────────────────────────────────────────────────────

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all",       label: "All Fruits" },
  { key: "ai-ml",    label: "AI / ML" },
  { key: "frontend",  label: "Frontend" },
  { key: "backend",   label: "Backend" },
  { key: "tools",     label: "Tools" },
];

// ── Cloud icon slug map (category → slugs) ────────────────────────────────────
// Derived from skills above; only skills with a non-null iconSlug appear.

export function getCloudSlugs(category: Category): string[] {
  const source = category === "all"
    ? skills
    : skills.filter((s) => s.category === category);
  return source
    .map((s) => s.iconSlug)
    .filter((slug): slug is string => slug !== null);
}
