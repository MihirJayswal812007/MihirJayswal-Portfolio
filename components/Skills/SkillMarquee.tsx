/**
 * components/Skills/SkillMarquee.tsx
 *
 * Three horizontal marquee rows of skill badges.
 *
 * Row grouping and speeds:
 *   Row 1 — AI / ML :      direction left,  30s
 *   Row 2 — Frontend:      direction right, 45s
 *   Row 3 — Backend+Tools: direction left,  22s
 *
 * Badge anatomy: 5px coloured dot + skill name text. No emojis.
 *
 * Duration scoping:
 *   Each row has its own wrapper <div> with --marquee-duration set as an
 *   inline style. The Marquee component reads this variable for its animation.
 *   Using a dedicated wrapper (not style prop on Marquee) ensures CSS variable
 *   inheritance is unambiguous and survives Vercel's CDN edge caching.
 *
 * Filter logic:
 *   activeCategory === "all"  → all badges: opacity 1, border gold/40
 *   activeCategory matches    → matching badges full, others dimmed to 15%
 */

"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { skills, type Category, type Skill } from "@/lib/skills-data";

// ── Category colour tokens (inline — unavoidable for dynamic values) ───────
const CAT_COLOR: Record<string, string> = {
  "ai-ml":   "#378ADD", // avatar-blue
  frontend:  "#E24B4A", // luffy-red
  backend:   "#5DCAA5", // teal-accent (was gold — changed for visual variety)
  tools:     "#9CA3AF", // dim
};

// ── Row configuration ──────────────────────────────────────────────────────
const ROWS: { skills: Skill[]; reverse: boolean; duration: number }[] = [
  {
    skills:   skills.filter((s) => s.category === "ai-ml"),
    reverse:  false,
    duration: 30,
  },
  {
    skills:   skills.filter((s) => s.category === "frontend"),
    reverse:  true,
    duration: 45,
  },
  {
    skills:   skills.filter((s) => s.category === "backend" || s.category === "tools"),
    reverse:  false,
    duration: 22,
  },
];

// ── Single badge ───────────────────────────────────────────────────────────
function SkillBadge({
  skill,
  activeCategory,
}: {
  skill: Skill;
  activeCategory: Category;
}) {
  const isActive = activeCategory === "all" || activeCategory === skill.category;

  return (
    <span
      className="flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-full whitespace-nowrap
                 transition-all duration-300 hover:border-gold/30 hover:text-parchment/70"
      style={{
        border:   `0.5px solid ${isActive ? "rgba(200,168,75,0.4)" : "transparent"}`,
        opacity:  isActive ? 1 : 0.15,
        color:    "rgba(232,223,192,0.4)",
        fontSize: "10px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontFamily: "var(--font-inter)",
      }}
    >
      {/* 5px category dot — no emoji */}
      <span
        className="shrink-0 rounded-full"
        style={{
          width:           "5px",
          height:          "5px",
          backgroundColor: CAT_COLOR[skill.category],
          flexShrink:      0,
        }}
      />
      {skill.name}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function SkillMarquee({
  activeCategory,
}: {
  activeCategory: Category;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {ROWS.map((row, rowIdx) => (
        /*
         * Each row gets its own wrapper div with --marquee-duration as an
         * inline style. The Marquee component inherits this variable.
         *
         * WHY wrapper div instead of style prop on Marquee:
         *   CSS custom properties cascade from parent → child.
         *   A wrapper div guarantees the var is set on an ancestor of the
         *   animating inner div, regardless of how Marquee merges its style prop.
         *   This is the most reliable pattern for Vercel production.
         *
         * repeat={2}: keyframe uses calc(-50% - 0.5rem) = translate one copy.
         *   With 2 copies this creates a seamless infinite loop.
         *   With 4+ copies the math produces a partial-cycle jump.
         */
        <div
          key={rowIdx}
          style={{ "--marquee-duration": `${row.duration}s` } as React.CSSProperties}
        >
          <Marquee
            reverse={row.reverse}
            pauseOnHover
            repeat={2}
          >
            {row.skills.map((skill) => (
              <SkillBadge
                key={skill.id}
                skill={skill}
                activeCategory={activeCategory}
              />
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}
