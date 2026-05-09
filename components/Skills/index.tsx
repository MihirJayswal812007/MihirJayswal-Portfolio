"use client";

/**
 * components/Skills/index.tsx
 *
 * Skills Section — Devil Fruit Encyclopedia (redesigned).
 *
 * Layout (top → bottom):
 *  1. Section eyebrow + clip-path title reveal
 *  2. Filter tabs (All | AI/ML | Frontend | Backend | Tools)
 *  3. Icon Cloud  — 3D sphere, icons filtered by active tab
 *  4. Marquee rows — skill badges scrolling left/right, opacity controlled by filter
 *
 * Animation:
 *  - GSAP ScrollTrigger: eyebrow fades up, title clip-path wipes left→right
 *  - Icon Cloud: scales 0.8→1 + opacity 0→1 with spring after title entrance
 *  - Marquee: staggered fade-in after cloud entrance
 */

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES, getCloudSlugs, type Category } from "@/lib/skills-data";
import IconCloud from "./IconCloud";
import SkillMarquee from "./SkillMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Refs for GSAP targets
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const tabsRef     = useRef<HTMLDivElement>(null);
  const cloudRef    = useRef<HTMLDivElement>(null);
  const marqueeRef  = useRef<HTMLDivElement>(null);
  const ghostRef    = useRef<HTMLSpanElement>(null);

  // ── GSAP entrance (ScrollTrigger — fires once) ──────────────
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
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      )
      // Title: clip-path wipes left→right (mask-reveal)
      .fromTo(titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9 },
        0.45
      )
      // Filter tabs slide up
      .fromTo(tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      )
      // Icon cloud scales in from 0.8 with spring feel
      .fromTo(cloudRef.current,
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        1.0
      )
      // Marquee rows stagger in
      .fromTo(marqueeRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Derived icon slugs for the current category filter
  const cloudSlugs = getCloudSlugs(activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-bg-section overflow-hidden"
      style={{ padding: "clamp(5rem, 10vw, 8rem) 0" }}
    >
      {/* ── Ghost background text ─────────────────────────────── */}
      <span
        ref={ghostRef}
        style={{ opacity: 0 }}
        className="absolute right-[-2vw] top-[10%] font-cinzel font-bold text-[18vw] leading-none text-parchment/[0.025] pointer-events-none select-none z-0 whitespace-nowrap"
      >
        ABILITIES
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-10">
          <p
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="eyebrow mb-3"
          >
            Devil Fruit Encyclopedia
          </p>
          {/* clip-path starts at inset(0 100% 0 0) — fully hidden right */}
          <h2
            ref={titleRef}
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-parchment font-bold tracking-tight"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            Awakened Abilities
          </h2>
        </div>

        {/* ── Filter tabs ───────────────────────────────────────── */}
        <div
          ref={tabsRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={[
                "px-4 py-1.5 text-[10px] font-inter uppercase tracking-widest border transition-all duration-300",
                activeCategory === key
                  ? "bg-gold text-bg-base border-gold"
                  : "text-parchment/40 border-parchment/12 hover:border-gold/40 hover:text-gold/70",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Single-column vertical layout ─ */}
        <div className="flex flex-col items-center gap-16">

          {/* Icon Cloud — Centered Hero */}
          <div
            ref={cloudRef}
            style={{ opacity: 0 }}
            className="w-full max-w-2xl mx-auto flex flex-col items-center"
          >
            <IconCloud slugs={cloudSlugs} />

            {/* Active category label beneath cloud */}
            <p className="text-center text-[10px] font-inter uppercase tracking-[0.4em] text-parchment/30 mt-6">
              {activeCategory === "all"
                ? "Full Stack Arsenal"
                : CATEGORIES.find((c) => c.key === activeCategory)?.label}
            </p>
          </div>
        </div>
      </div>
      
      {/* Marquee rows — Full width bleed below the container */}
      <div
        ref={marqueeRef}
        style={{ opacity: 0 }}
        className="w-full flex flex-col justify-center gap-4 mt-20 relative"
      >
        <SkillMarquee activeCategory={activeCategory} />
      </div>

        {/* ── Section bottom rule ───────────────────────────────── */}
        <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </section>
  );
}
