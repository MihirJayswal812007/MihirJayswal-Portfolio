/**
 * components/About/index.tsx
 *
 * About Section — "The Story So Far"
 *
 * Layout:  Two-column CSS grid — explicit 40% left / 60% right, gap 48px.
 *          Left:  MJ initials photo placeholder + film-grain overlay + three counter boxes.
 *          Right: Eyebrow → clip-path title reveal → bio → blockquote → horizontal timeline.
 *
 * Counter fix:  IntersectionObserver on the section element (threshold 0.2).
 *               requestAnimationFrame loop — no setInterval.
 *               Fires once; observer disconnects immediately after.
 *
 * Timeline:     GSAP, nodes fill gold with 200ms stagger on scroll enter.
 *               toggleActions "play none none none" — never reverses.
 *
 * Mobile (<768px):  Single column; photo stacks above text.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slideFromLeft } from "@/lib/animations";

// Register GSAP plugin — guard for SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Counter hook ─────────────────────────────────────────────────────────────
// Uses requestAnimationFrame for a smooth ease-out-sine count-up.
// `start()` is called externally by the IntersectionObserver on the section.
// hasStarted ref prevents double-triggering on subsequent re-renders.
function useCounter(endValue: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);
  const rafRef = useRef<number>(0);

  // Cancel any pending rAF on unmount to prevent memory leaks
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const start = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let startTime = 0;

    // rAF loop: eases count from 0 → endValue over `duration` ms
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out sine: fast start, decelerates into final value
      const eased = Math.sin((progress * Math.PI) / 2);
      setCount(Math.floor(eased * endValue));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue); // guarantee exact final value
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  return { count, start };
}

// ── Title words for clip-path wipe reveal ─────────────────────────────────────
const TITLE_WORDS = ["Building", "at", "the", "intersection", "of", "AI", "and", "craft."];

// ── Timeline milestones ───────────────────────────────────────────────────────
const TIMELINE = ["School", "B-Tech", "1st Hackathon", "UIDAI 2026"];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const ghostRef    = useRef<HTMLDivElement>(null);

  // Three counter instances
  const repos    = useCounter(11);
  const projects = useCounter(4);
  const years    = useCounter(3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── IntersectionObserver for counters ──────────────────────────────────
    // Attach to the section element (not an inner span) so it fires reliably.
    // threshold 0.2 = 20% of section visible → start counting.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          repos.start();
          projects.start();
          years.start();
          observer.disconnect(); // fire once only
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);

    // ── GSAP: parallax ghost text + timeline node fill ─────────────────────
    const ctx = gsap.context(() => {
      // Ghost text moves down at 0.3× scroll speed — subtle parallax depth
      gsap.to(ghostRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Timeline nodes fill gold sequentially, 200ms stagger.
      // toggleActions "play none none none" → fills once, never reverses on scroll-back.
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node, i) => {
        gsap.to(node, {
          backgroundColor: "#C8A84B",
          borderColor: "#C8A84B",
          boxShadow: "0 0 12px rgba(200,168,75,0.35)",
          duration: 0.4,
          delay: i * 0.2, // 200ms stagger between nodes
          scrollTrigger: {
            trigger: section,
            start: "bottom 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      // Gradient transitions seamlessly from Hero's bg-base into bg-warm
      className="relative w-full min-h-screen bg-gradient-to-b from-bg-deep via-bg-mid to-bg-mid text-parchment pt-32 pb-24 overflow-hidden"
    >
      {/* ── SVG grain filter definition — referenced by filter:url(#grain) ── */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* ── Parallax ghost text — moves with scroll for 3D depth feel ── */}
      <div
        ref={ghostRef}
        className="absolute top-10 left-0 w-full flex justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-cinzel font-bold text-parchment opacity-[0.02] tracking-tighter whitespace-nowrap">
          STORY
        </span>
      </div>

      {/* ── Main container ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-7xl">

        {/* Explicit 40/60 split — not col-span fractions, to guarantee proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-12 items-start">

          {/* ── LEFT COLUMN: Photo placeholder + counters ─────────────────── */}
          <motion.div
            className="relative group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideFromLeft}
          >
            {/* Photo placeholder: MJ initials with film grain overlay.
                border-radius 8px + 0.5px gold/20 border per spec. */}
            <div
              className="relative aspect-[3/4] w-full overflow-hidden bg-raised/60"
              style={{
                border: "0.5px solid rgba(200,168,75,0.2)",
                borderRadius: "8px",
              }}
            >
              {/* MJ initials — Cinzel font, gold, centred */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cinzel text-5xl md:text-7xl text-gold select-none tracking-widest">
                  M·J
                </span>
              </div>

              {/* Grain overlay: intensifies on hover (developing-photo effect) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-30 group-hover:opacity-80"
                style={{ filter: "url(#grain)" }}
              />

              {/* Bottom vignette — blends photo into bg-mid */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-mid via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-b from-bg-mid/20 via-transparent to-transparent opacity-70" />
            </div>

            {/* Corner accent brackets — premium framing detail */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-gold/50" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-gold/50" />

            {/* ── Counter boxes — three side by side below photo ─────────── */}
            {/* IntersectionObserver (on section) triggers start() for each counter */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { count: repos.count,    label: "Repos",    suffix: "+" },
                { count: projects.count, label: "Projects", suffix: ""  },
                { count: years.count,    label: "Years",    suffix: ""  },
              ].map(({ count, label, suffix }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center py-3.5 px-2 rounded-lg"
                  style={{ border: "0.5px solid rgba(200,168,75,0.12)" }}
                >
                  {/* Number: Cinzel, 32px, gold — counts up from 0 */}
                  <span className="font-cinzel text-3xl text-gold leading-none tabular-nums">
                    {count}{suffix}
                  </span>
                  {/* Label: Inter, 9px, uppercase, wide tracking */}
                  <span className="font-inter text-[9px] uppercase tracking-[0.15em] text-dim mt-1.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Eyebrow, title, bio, quote, timeline ────────── */}
          <div className="flex flex-col justify-start pt-0 lg:pt-10">

            {/* Eyebrow — lives inside right column, not floating above grid */}
            <motion.span
              className="font-inter text-[10px] font-normal uppercase tracking-[0.4em] mb-5 block"
              style={{ color: "rgba(200,168,75,0.35)" }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              The Story So Far
            </motion.span>

            {/* Section title — each word reveals via clip-path left→right wipe */}
            <h2 className="font-cinzel text-3xl md:text-4xl text-parchment font-normal mb-7 leading-tight" style={{ marginTop: "8px" }}>
              {TITLE_WORDS.map((word, i) => (
                // clip-path wipe: each word masked right-to-left, staggered 80ms
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Bio — rewritten: punchy, cinematic, first-person, mentions AI builds */}
            <motion.p
              className="font-inter text-[13px] text-parchment/50 leading-[1.8] mb-7"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I&apos;m a 2nd-year B-Tech AI/ML engineer who builds at the edge of
              intelligence and craft — shipping AI-augmented products that are fast,
              cinematic, and obsessively detailed. Every line of code I write has a reason;
              every interface I ship has a rhythm.
            </motion.p>

            {/* Quote — single string, no duplicated quote marks, gold left border */}
            <motion.blockquote
              className="font-cormorant italic text-[14px] leading-relaxed pl-4 mb-10"
              style={{
                // 1px gold left border per spec — inline style for dynamic value
                borderLeft: "1px solid rgba(200,168,75,0.4)",
                color: "rgba(200,168,75,0.4)",
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              &ldquo;Get busy building, or get busy dying.&rdquo;
            </motion.blockquote>

            {/* ── Timeline — horizontal, node → line → node pattern ─────── */}
            {/* Fades in at delay 0.4s; nodes then fill via GSAP (see useEffect) */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Connecting base line — full-width hairline */}
              <div className="absolute top-[3px] left-0 right-0 h-[1px] bg-dim/20" />

              <div className="flex justify-between relative z-10">
                {TIMELINE.map((label) => (
                  <div key={label} className="flex flex-col items-center gap-3 w-1/4">
                    {/* Node: 8px circle. GSAP fills backgroundColor + borderColor to gold */}
                    <div
                      className="timeline-node w-2 h-2 rounded-full transition-colors duration-400"
                      style={{
                        border: "1px solid rgba(200,168,75,0.3)",
                        backgroundColor: "transparent",
                      }}
                    />
                    <span className="text-[9px] md:text-[10px] font-inter uppercase tracking-wider text-dim text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
