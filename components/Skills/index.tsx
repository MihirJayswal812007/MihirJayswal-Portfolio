"use client";

/**
 * components/Skills/index.tsx
 *
 * Skills Section — Devil Fruit Encyclopedia.
 * 
 * Layout:
 *  - Section label + ghost bg text "ABILITIES"
 *  - Filter tabs: All Fruits | AI/ML | Frontend | Backend | Tools
 *  - Responsive auto-fill card grid
 * 
 * Animations:
 *  - GSAP: section eyebrow + heading slide-in on scroll
 *  - IntersectionObserver: card entry stagger (translateY + opacity)
 *  - CSS 3D: card flip on click
 *  - Tab switch: filter with exit scale + opacity, then re-entry
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { skills, CATEGORIES, type Category } from "./data";
import FruitCard from "./FruitCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [visibleCards, setVisibleCards] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<Category | null>(null);

  // Refs for GSAP targets
  const sectionRef    = useRef<HTMLElement>(null);
  const eyebrowRef    = useRef<HTMLParagraphElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const ghostRef      = useRef<HTMLSpanElement>(null);
  const tabsRef       = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);

  // Filtered skill list
  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  // ── GSAP scroll-triggered entrance ──────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(ghostRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
        0
      )
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.2
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.3
      )
      .fromTo(tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Card visibility via IntersectionObserver ─────────────────
  useEffect(() => {
    if (!gridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleCards(true); },
      { threshold: 0.1 }
    );
    obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Filter tab switch with exit/entry animation ───────────────
  const handleFilter = useCallback((cat: Category) => {
    if (cat === activeCategory || isFiltering) return;
    setIsFiltering(true);
    setPendingCategory(cat);

    // Exit: shrink + fade cards
    if (gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll(".fruit-card-wrap"), {
        scale: 0.92,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power1.in",
        onComplete: () => {
          setActiveCategory(cat);
          setPendingCategory(null);
          setIsFiltering(false);
          // Reset — entry animation will trigger via visibleCards flag
          setTimeout(() => {
            if (gridRef.current) {
              gsap.set(gridRef.current.querySelectorAll(".fruit-card-wrap"), {
                scale: 1, opacity: 1,
              });
            }
          }, 50);
        },
      });
    }
  }, [activeCategory, isFiltering]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-bg-warm overflow-hidden"
      style={{ padding: "clamp(5rem, 10vw, 8rem) 0" }}
    >
      {/* ── Ghost background text ─────────────────────────────── */}
      <span
        ref={ghostRef}
        style={{ opacity: 0 }}
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 font-cinzel font-bold text-[18vw] leading-none text-parchment/[0.03] pointer-events-none select-none z-0 whitespace-nowrap"
      >
        ABILITIES
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="eyebrow mb-3"
          >
            Devil Fruit Encyclopedia
          </p>
          <h2
            ref={headingRef}
            style={{ opacity: 0 }}
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-parchment font-bold tracking-tight"
          >
            Awakened Abilities
          </h2>
        </div>

        {/* ── Filter tabs ───────────────────────────────────────── */}
        <div
          ref={tabsRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
        >
          {CATEGORIES.map(({ key, label }) => {
            const isActive = activeCategory === key || pendingCategory === key;
            return (
              <button
                key={key}
                onClick={() => handleFilter(key)}
                className={[
                  "px-4 py-2 text-[10px] font-inter uppercase tracking-widest border transition-all duration-300",
                  isActive
                    ? "bg-gold text-bg-base border-gold"
                    : "text-parchment/50 border-parchment/15 hover:border-gold/50 hover:text-gold/80",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Card grid ─────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          }}
        >
          {filtered.map((skill, i) => (
            <div key={skill.id} className="fruit-card-wrap">
              <FruitCard
                skill={skill}
                entryDelay={i * 60}
                isVisible={visibleCards}
              />
            </div>
          ))}
        </div>

        {/* ── Section bottom rule ───────────────────────────────── */}
        <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </section>
  );
}
