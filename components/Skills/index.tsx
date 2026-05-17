/**
 * components/Skills/index.tsx
 *
 * Skills Section — Devil Fruit Encyclopedia
 *
 * LAYOUT DECISION: Full-width stack (Icon Cloud centred full-width above,
 * three marquee rows below). Chosen over 45/55 side-by-side because:
 *   1. The react-icon-cloud sphere needs a square-ish, uncompressed container.
 *   2. Horizontal marquee rows are cinematic at full width — cramped at 55%.
 *   3. One focal point at a time (cloud → marquee) reads more like editorial.
 *
 * Top → bottom:
 *   1. Ghost bg text (parallax)
 *   2. Section header: eyebrow "DEVIL FRUIT ENCYCLOPEDIA" + title "Awakened Abilities"
 *   3. Filter tabs: All Fruits / AI·ML / Frontend / Backend / Tools
 *   4. Icon Cloud — full width, 280px height wrapper, monochrome parchment tint
 *   5. Three marquee rows (AI/ML 30s left · Frontend 45s right · Backend+Tools 22s left)
 *
 * Filter → marquee connection:
 *   Active category → matching badges: opacity 100%, border gold/40
 *   Non-matching badges → opacity 15%, border transparent
 *   "All Fruits" → all badges full opacity
 *
 * Mobile (<768px): single column, everything stacks naturally (flex-col).
 */

"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES, getCloudSlugs, type Category } from "@/lib/skills-data";
import IconCloud from "./IconCloud";
import SkillMarquee from "./SkillMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Refs for GSAP entrance targets
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const tabsRef     = useRef<HTMLDivElement>(null);
  const cloudRef    = useRef<HTMLDivElement>(null);
  const marqueeRef  = useRef<HTMLDivElement>(null);
  const ghostRef    = useRef<HTMLSpanElement>(null);

  // ── GSAP entrance (fires once on scroll enter) ─────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Ghost bg text drifts in from right
      tl.fromTo(ghostRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.4 },
        0
      )
      // Eyebrow fades up
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.2
      )
      // Title clip-path wipe left→right (matches About pattern for consistency)
      .fromTo(titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.85 },
        0.45
      )
      // Filter tabs slide up
      .fromTo(tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      )
      // Icon cloud scales in — spring feel via back.out easing
      .fromTo(cloudRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        1.0
      )
      // Marquee rows fade in staggered after cloud
      .fromTo(marqueeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.35
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slugs filtered by active tab — passed to IconCloud for reactive sphere
  const cloudSlugs = getCloudSlugs(activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-raised overflow-hidden"
      style={{ padding: "clamp(5rem, 10vw, 8rem) 0" }}
    >
      {/* ── Ghost background text — decorative parallax word ─────────────── */}
      <span
        ref={ghostRef}
        style={{ opacity: 0 }}
        className="absolute right-[-2vw] top-[8%] font-cinzel font-bold text-[18vw] leading-none text-parchment/[0.025] pointer-events-none select-none z-0 whitespace-nowrap"
        aria-hidden="true"
      >
        ABILITIES
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          {/* Eyebrow: "DEVIL FRUIT ENCYCLOPEDIA" — fixed from old "ABILITIES" label */}
          <p
            ref={eyebrowRef}
            style={{ opacity: 0, color: "rgba(200,168,75,0.35)" }}
            className="font-inter text-[10px] font-normal uppercase tracking-[0.4em] mb-3"
          >
            Devil Fruit Encyclopedia
          </p>
          {/* Title: clip-path starts fully hidden right; GSAP wipes it open */}
          <h2
            ref={titleRef}
            className="font-cinzel text-[clamp(1.75rem,4vw,2.625rem)] text-parchment font-normal tracking-tight"
            style={{ clipPath: "inset(0 100% 0 0)", marginTop: "8px", marginBottom: "24px" }}
          >
            Awakened Abilities
          </h2>
        </div>

        {/* ── Filter tabs ─────────────────────────────────────────────────── */}
        {/* Active state: bg-gold/15, border-gold/50, text-gold — NOT solid bg-gold */}
        <div
          ref={tabsRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              id={`skills-tab-${key}`}
              onClick={() => setActiveCategory(key)}
              className="px-4 py-1.5 text-[10px] font-inter uppercase tracking-widest rounded-full transition-all duration-150"
              style={
                activeCategory === key
                  ? {
                      // Active pill: subtle gold fill + gold border + gold text
                      background: "rgba(200,168,75,0.15)",
                      border:     "1px solid rgba(200,168,75,0.50)",
                      color:      "#C8A84B",
                    }
                  : {
                      background: "transparent",
                      border:     "1px solid rgba(255,255,255,0.08)",
                      color:      "rgba(232,223,192,0.35)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Icon Cloud — full width, clipped to 320px, monochrome parchment tint ─ */}
        {/* scale 0.85→1 + opacity entrance via GSAP (see useEffect) */}
        <div
          ref={cloudRef}
          style={{ opacity: 0, height: "320px", overflow: "hidden" }}
          className="w-full flex items-center justify-center mb-10"
        >
          <IconCloud slugs={cloudSlugs} />
        </div>

        {/* ── Three marquee rows ─────────────────────────────────────────── */}
        {/* Staggered fade-in after cloud via GSAP timeline (see useEffect) */}
        <div
          ref={marqueeRef}
          style={{ opacity: 0 }}
          className="w-full"
        >
          <SkillMarquee activeCategory={activeCategory} />
        </div>

        {/* ── Section bottom rule ────────────────────────────────────────── */}
        <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </section>
  );
}
