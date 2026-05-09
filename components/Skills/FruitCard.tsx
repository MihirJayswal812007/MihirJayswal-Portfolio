"use client";

/**
 * components/Skills/FruitCard.tsx
 *
 * Individual Devil Fruit card.
 * Front: emoji glow + fruit name + skill name.
 * Back:  fruit type pill + flavour ability text + animated mastery bar.
 * Flip: CSS 3D rotateY on click, 600ms cubic-bezier.
 */

import { useState, useEffect, useRef } from "react";
import { type Skill } from "@/lib/skills-data";

interface FruitCardProps {
  skill: Skill;
  /** Entry animation delay in ms — passed from parent for stagger */
  entryDelay: number;
  /** Whether parent has triggered the section-entry animation */
  isVisible: boolean;
}

const FRUIT_TYPE_LABELS: Record<string, string> = {
  Logia:    "LOGIA",
  Paramecia: "PARAMECIA",
  Zoan:     "ZOAN",
};

export default function FruitCard({ skill, entryDelay, isVisible }: FruitCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [masteryWidth, setMasteryWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  // Animate mastery bar 300ms after flip
  useEffect(() => {
    if (flipped) {
      const t = setTimeout(() => setMasteryWidth(skill.level), 300);
      return () => clearTimeout(t);
    } else {
      setMasteryWidth(0);
    }
  }, [flipped, skill.level]);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        height: "240px",
        perspective: "1000px",
        // Entry animation via CSS transition, triggered by isVisible
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${entryDelay}ms, transform 0.6s ease ${entryDelay}ms`,
      }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`Flip card for ${skill.name}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
    >
      {/* ── Inner — 3D flip container ────────────────────────── */}
      <div
        className="relative w-full h-full preserve-3d"
        style={{
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg border border-parchment/10 overflow-hidden flex flex-col items-center justify-center gap-3 bg-bg-section group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Radial glow blob behind emoji */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${skill.colorHex}22 0%, transparent 70%)`,
            }}
          />

          {/* Emoji */}
          <span
            className="text-5xl relative z-10 transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: `drop-shadow(0 0 12px ${skill.colorHex}88)`,
            }}
          >
            {skill.emoji}
          </span>

          {/* Fruit name */}
          <p className="font-cinzel text-[10px] text-parchment/40 uppercase tracking-[0.2em] text-center px-3 leading-relaxed relative z-10">
            {skill.fruitName}
          </p>

          {/* Skill name */}
          <p className="font-inter text-sm font-medium text-parchment relative z-10">
            {skill.name}
          </p>

          {/* Subtle flip hint */}
          <p className="text-[9px] font-inter text-parchment/20 uppercase tracking-widest mt-1 relative z-10">
            click to awaken
          </p>
        </div>

        {/* ── BACK ───────────────────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg border overflow-hidden flex flex-col justify-between p-5 bg-bg-section rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `${skill.colorHex}44`,
          }}
        >
          {/* Top row: fruit name + type pill */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <p className="font-cinzel text-[10px] text-parchment/50 uppercase tracking-widest leading-relaxed">
                {skill.fruitName}
              </p>
              <span
                className="text-[8px] font-inter uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0"
                style={{
                  color: skill.colorHex,
                  borderColor: `${skill.colorHex}55`,
                  backgroundColor: `${skill.colorHex}11`,
                }}
              >
                {FRUIT_TYPE_LABELS[skill.fruitType]}
              </span>
            </div>

            <p className="font-inter text-sm font-semibold text-parchment mt-0.5">
              {skill.name}
            </p>

            {/* Divider */}
            <div
              className="w-full h-[1px] mt-2 mb-3"
              style={{ backgroundColor: `${skill.colorHex}33` }}
            />

            {/* Ability text */}
            <p className="font-cormorant italic text-parchment/60 text-[13px] leading-relaxed">
              {skill.ability}
            </p>
          </div>

          {/* Mastery bar */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-inter uppercase tracking-widest text-parchment/40">
                Proficiency
              </span>
              <span
                className="text-[11px] font-inter font-bold"
                style={{ color: skill.colorHex }}
              >
                {skill.level}%
              </span>
            </div>
            <div className="w-full h-[3px] rounded-full bg-parchment/10 overflow-hidden">
              <div
                ref={barRef}
                className="h-full rounded-full"
                style={{
                  width: `${masteryWidth}%`,
                  transition: "width 1s ease",
                  backgroundColor: skill.colorHex,
                  boxShadow: `0 0 6px ${skill.colorHex}88`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
