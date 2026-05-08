/**
 * components/Hero/index.tsx
 *
 * Cinematic Hero — Awwwards-style minimal typographic layout.
 * Layout: Large split name (MIHIR solid / JAYSWAL outlined) centred,
 * floating skill words left+right, availability badge in nav.
 * 
 * Animation strategy:
 *  - GSAP: initial reveal (lines fly in from sides, staggered)
 *  - Framer Motion: nav + CTA fade-ins (no conflict — different elements)
 *  - Stars: Three.js (unchanged StarField component)
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import StarField from "./StarField";
import { quotes } from "@/lib/quotes";
import { fadeIn } from "@/lib/animations";

// Skills shown floating on the left and right edges
const LEFT_SKILLS  = ["AI / ML", "PYTHON", "THREE.JS"];
const RIGHT_SKILLS = ["GSAP", "FULL STACK", "LANGCHAIN"];

export default function HeroSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Refs for GSAP targets
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const mihirRef     = useRef<HTMLDivElement>(null);
  const jayswalRef   = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const quoteRef     = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);

  // Logo Easter Egg
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    if (clickCount >= 3) {
      console.log("DEVIL FRUIT EASTER EGG TRIGGERED!");
      setClickCount(0);
    }
  }, [clickCount]);

  // GSAP entrance: elements fly in from opposite sides, staggered
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Eyebrow slides in from top
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.3
    )
    // MIHIR slides in from left
    .fromTo(mihirRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.9 },
      0.5
    )
    // JAYSWAL slides in from right
    .fromTo(jayswalRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.9 },
      0.6
    )
    // Divider line expands from centre
    .fromTo(dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: "center" },
      1.0
    )
    // Quote fades up
    .fromTo(quoteRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.2
    )
    // CTA row fades up
    .fromTo(ctaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.4
    )
    // Left skills stagger in from left edge
    .fromTo(leftRef.current?.querySelectorAll(".skill-word") ?? [],
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 },
      1.1
    )
    // Right skills stagger in from right edge
    .fromTo(rightRef.current?.querySelectorAll(".skill-word") ?? [],
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 },
      1.1
    );
  }, []);

  // Typewriter cycling through quotes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentQuote = quotes[quoteIndex];

    if (isTyping) {
      if (displayedQuote.length < currentQuote.length) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentQuote.slice(0, displayedQuote.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2800);
      }
    } else {
      if (displayedQuote.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentQuote.slice(0, displayedQuote.length - 1));
        }, 28);
      } else {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedQuote, isTyping, quoteIndex]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg-base flex flex-col">

      {/* ── Three.js Starfield ──────────────────────────────── */}
      <StarField />

      {/* Ambient amber bloom — very subtle, centred */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-gold/[0.04] blur-[120px] pointer-events-none animate-breathe" />

      {/* ── Navigation ──────────────────────────────────────── */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 w-full px-6 md:px-10 py-6 flex justify-between items-center z-20"
      >
        {/* Logo — easter egg on 3 clicks */}
        <button
          onClick={() => setClickCount(prev => prev + 1)}
          className="text-gold font-cinzel text-xl tracking-widest hover:opacity-70 transition-opacity"
        >
          M · J
        </button>

        {/* Centre: availability badge */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-inter uppercase tracking-[0.2em] text-parchment/60">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          Available for Internships 2025
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex gap-7 text-[10px] font-inter uppercase tracking-widest text-parchment/50">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.header>

      {/* ── Floating skill words — LEFT ─────────────────────── */}
      <div
        ref={leftRef}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 hidden lg:flex"
      >
        {LEFT_SKILLS.map((s) => (
          <span
            key={s}
            className="skill-word text-[9px] font-inter uppercase tracking-[0.3em] text-parchment/20 hover:text-gold/60 transition-colors duration-500 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>

      {/* ── Floating skill words — RIGHT ────────────────────── */}
      <div
        ref={rightRef}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 items-end hidden lg:flex"
      >
        {RIGHT_SKILLS.map((s) => (
          <span
            key={s}
            className="skill-word text-[9px] font-inter uppercase tracking-[0.3em] text-parchment/20 hover:text-gold/60 transition-colors duration-500 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>

      {/* ── Main Content — centred column ───────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-4">

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{ opacity: 0 }}
          className="text-[9px] md:text-[10px] font-cinzel text-gold uppercase tracking-[0.4em] mb-8"
        >
          A Mihir Jayswal Production
        </p>

        {/* Name block */}
        <h1 className="flex flex-col items-center leading-none mb-0 select-none">

          {/* MIHIR — solid white/parchment fill */}
          <div
            ref={mihirRef}
            style={{ opacity: 0 }}
            className="font-cinzel font-bold text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] text-parchment tracking-tight leading-[0.88]"
          >
            MIHIR
          </div>

          {/* JAYSWAL — outlined stroke only, gold colour */}
          <div
            ref={jayswalRef}
            style={{ opacity: 0 }}
            className="font-cinzel font-bold text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] tracking-tight leading-[0.88] hero-stroke"
          >
            JAYSWAL
          </div>
        </h1>

        {/* Thin divider line expanding from centre */}
        <div
          ref={dividerRef}
          style={{ opacity: 0, transform: "scaleX(0)" }}
          className="w-32 md:w-48 h-[1px] bg-gold/30 mt-6 mb-5 origin-center"
        />

        {/* Typewriter quote */}
        <div
          ref={quoteRef}
          style={{ opacity: 0 }}
          className="h-6 flex items-center justify-center gap-1"
        >
          <span className="font-cormorant italic text-base md:text-lg text-parchment/60">
            *{displayedQuote}
          </span>
          {/* Blinking cursor — GSAP does not control this, Tailwind animation only */}
          <span className="inline-block w-[1px] h-[1em] bg-gold align-middle animate-blink" />
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="flex items-center gap-6 mt-10"
        >
          <a
            href="#projects"
            className="group relative px-7 py-3 border border-gold/70 text-gold font-cinzel tracking-[0.15em] text-[11px] uppercase overflow-hidden hover:text-bg-base transition-colors duration-500"
          >
            {/* Fill sweep on hover */}
            <span className="absolute inset-0 bg-gold translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10">View Projects</span>
          </a>

          <a
            href="#codex"
            className="text-[11px] font-inter uppercase tracking-widest text-parchment/40 hover:text-gold transition-colors duration-300"
          >
            The Codex ↓
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] font-inter uppercase tracking-[0.3em] text-parchment/30">Scroll</span>
        {/* Animated line — Tailwind breathe keyframe */}
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold/40 to-transparent animate-breathe" />
      </motion.div>

    </section>
  );
}
