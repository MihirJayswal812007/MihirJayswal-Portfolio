/**
 * components/Skills/SkillMarquee.tsx
 *
 * Three horizontal marquee rows of skill badges.
 * Row grouping and speeds per spec:
 *   Row 1 — AI / ML :      direction left,  30s
 *   Row 2 — Frontend:      direction right, 45s
 *   Row 3 — Backend+Tools: direction left,  22s
 *
 * Badge anatomy: dot (5px, category colour) + skill name (no emojis).
 * Active filter → matching badges: opacity 100%, border gold/40.
 * Non-matching →  opacity 15%, border transparent.
 * "All Fruits" → every badge at full opacity.
 */

"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { skills, type Category, type Skill } from "@/lib/skills-data";

// ── Category colour tokens (inline style — unavoidable for dynamic colours) ──
const CAT_COLOR: Record<string, string> = {
  "ai-ml":    "#378ADD",
  frontend:   "#E24B4A",
  backend:    "#C8A84B",
  tools:      "#9CA3AF",
};

// ── Row configuration ──────────────────────────────────────────────────────
const ROWS: { skills: Skill[]; reverse: boolean; duration: number }[] = [
  {
    skills:   skills.filter((s) => s.category === "ai-ml"),
    reverse:  false, // direction left
    duration: 30,
  },
  {
    skills:   skills.filter((s) => s.category === "frontend"),
    reverse:  true,  // direction right
    duration: 45,
  },
  {
    skills:   skills.filter((s) => s.category === "backend" || s.category === "tools"),
    reverse:  false, // direction left
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
      // mx-1.5 ensures visible gap between badges — gap-(--gap) is Tailwind v4 syntax
      // that does not resolve in this project's v3.4.1 setup, so margin is the fallback
      className="inline-flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-full whitespace-nowrap transition-all duration-300"
      style={{
        // Dynamic border: gold/40 when active, transparent when dimmed
        border: `0.5px solid ${isActive ? "rgba(200,168,75,0.4)" : "transparent"}`,
        opacity: isActive ? 1 : 0.15,
      }}
    >
      {/* Category colour dot — 5px circle, no emoji */}
      <span
        className="shrink-0 rounded-full"
        style={{
          width: "5px",
          height: "5px",
          backgroundColor: CAT_COLOR[skill.category],
        }}
      />
      {/* Skill name: Inter 10px, uppercase, wide tracking. text-parchment/80 handles opacity */}
      <span
        className="font-inter uppercase text-parchment/80 leading-none"
        style={{ fontSize: "10px", letterSpacing: "0.15em" }}
      >
        {skill.name}
      </span>
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
        // repeat={2}: the marquee keyframe uses calc(-50%) which means
        // "translate by exactly one copy width" — requires exactly 2 copies.
        // With more copies the math breaks and rows 1+3 freeze or jump.
        <Marquee
          key={rowIdx}
          reverse={row.reverse}
          pauseOnHover
          repeat={2}
          style={
            {
              "--duration": `${row.duration}s`,
              "--gap":      "0.75rem",
            } as React.CSSProperties
          }
        >
          {row.skills.map((skill) => (
            <SkillBadge
              key={skill.id}
              skill={skill}
              activeCategory={activeCategory}
            />
          ))}
        </Marquee>
      ))}
    </div>
  );
}
