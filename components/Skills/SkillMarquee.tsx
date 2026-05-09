"use client";

/**
 * components/Skills/SkillMarquee.tsx
 *
 * Three infinite-scrolling marquee rows of skill badge pills.
 * Row 1: AI/ML     — scrolls left,  normal speed
 * Row 2: Frontend  — scrolls right, slow
 * Row 3: Backend + Tools — scrolls left, fast
 *
 * Filter behaviour: badges matching the active category are full opacity
 * with a gold border; non-matching badges dim to 15% opacity.
 */

import { type Category, skills } from "@/lib/skills-data";

// ── Category dot colours (hex — unavoidable for inline style) ─────────────────
const DOT_COLORS: Record<Exclude<Category, "all">, string> = {
  "ai-ml":    "#378ADD", // avatar-blue
  frontend:   "#E24B4A", // luffy-red
  backend:    "#5DCAA5", // teal (not in Tailwind tokens — spec-defined)
  tools:      "#9CA3AF", // dim
};

// ── Row configuration ─────────────────────────────────────────────────────────
const ROWS = [
  {
    id: "row-aiml",
    categories: ["ai-ml"] as Exclude<Category, "all">[],
    direction: "left" as const,
    duration: 28,  // seconds for one full loop
  },
  {
    id: "row-frontend",
    categories: ["frontend"] as Exclude<Category, "all">[],
    direction: "right" as const,
    duration: 38,  // slower
  },
  {
    id: "row-backend-tools",
    categories: ["backend", "tools"] as Exclude<Category, "all">[],
    direction: "left" as const,
    duration: 20,  // faster
  },
];

// ── Badge component ───────────────────────────────────────────────────────────

interface BadgeProps {
  name: string;
  category: Exclude<Category, "all">;
  activeCategory: Category;
}

function Badge({ name, category, activeCategory }: BadgeProps) {
  // Determine if this badge is "highlighted" by the active filter
  const isActive = activeCategory === "all" || activeCategory === category;
  const dotColor = DOT_COLORS[category];

  return (
    <span
      className="inline-flex items-center gap-2 mx-2 px-4 py-2 rounded-full font-inter text-[11px] uppercase tracking-[0.12em] shrink-0 select-none whitespace-nowrap"
      style={{
        // Badge container: always dark pill, border fades in when active
        backgroundColor: "rgba(17,24,39,0.8)",  // bg-section-ish with slight transparency
        border: isActive
          ? "0.5px solid rgba(200,168,75,0.5)"  // gold border when active
          : "0.5px solid rgba(200,168,75,0.1)", // barely-there border when dimmed
        color: isActive ? "rgba(232,223,192,0.85)" : "rgba(232,223,192,0.15)",
        // Smooth opacity transition on filter change
        transition: "color 0.4s ease, border-color 0.4s ease, opacity 0.4s ease",
      }}
    >
      {/* Category colour dot */}
      <span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          backgroundColor: dotColor,
          opacity: isActive ? 1 : 0.2,
          transition: "opacity 0.4s ease",
          boxShadow: isActive ? `0 0 4px ${dotColor}88` : "none",
        }}
      />
      {name}
    </span>
  );
}

// ── Marquee row component ─────────────────────────────────────────────────────

interface MarqueeRowProps {
  rowSkills: typeof skills;
  direction: "left" | "right";
  duration: number;
  activeCategory: Category;
  /** Pause scrolling on hover */
  paused?: boolean;
}

function MarqueeRow({ rowSkills, direction, duration, activeCategory, paused }: MarqueeRowProps) {
  // Duplicate items twice so the infinite scroll is seamless
  const doubled = [...rowSkills, ...rowSkills];

  return (
    <div
      className="relative w-full overflow-hidden"
      /* Fade edges with mask for seamless look */
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex"
        style={{
          /* Direction: left = translateX(0→-50%), right = translateX(-50%→0%) */
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((skill, i) => (
          <Badge
            key={`${skill.id}-${i}`}
            name={skill.name}
            category={skill.category as Exclude<Category, "all">}
            activeCategory={activeCategory}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface SkillMarqueeProps {
  activeCategory: Category;
}

export default function SkillMarquee({ activeCategory }: SkillMarqueeProps) {
  return (
    <div className="flex flex-col gap-4 w-full group">
      {ROWS.map((row) => {
        // Filter skills to those belonging to this row's categories
        const rowSkills = skills.filter((s) =>
          (row.categories as string[]).includes(s.category)
        );

        return (
          <MarqueeRow
            key={row.id}
            rowSkills={rowSkills}
            direction={row.direction}
            duration={row.duration}
            activeCategory={activeCategory}
            paused={false} // individual rows never pause; section container handles hover
          />
        );
      })}
    </div>
  );
}
