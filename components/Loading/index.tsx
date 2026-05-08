/**
 * components/Loading/index.tsx — Mihir Jayswal Portfolio
 *
 * Loading screen: Star Wars crawl + LOTR title card aesthetic.
 * Renders before the main page mounts. Fades out after 3s or on click.
 *
 * Spec ref: spec/01-loading.md
 * Copy ref: assets/copy-and-quotes.md
 *
 * Animation tools:
 * - Framer Motion: production text fade-up, final exit (loadingExit variant)
 * - CSS: crawl animation (perspective rotateX + translateY), film grain
 * - GSAP: NOT used here (spec rule: GSAP for modals + scroll timelines)
 */

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";

// ── Crawl copy ─────────────────────────────────────────────
// Three lines that rise in the Star Wars perspective crawl.
const CRAWL_LINES = [
  "A long time ago, in a repo far, far away...",
  "A young engineer set out to build something worthy of the Age of AI.",
  "Armed with Python, React, and an unreasonable love of Tolkien, he began.",
];

// ── Timing constants ───────────────────────────────────────
const PRODUCTION_LABEL_DELAY = 200;  // ms before production label fades in
const CRAWL_START_DELAY      = 800;  // ms before crawl appears
const AUTO_EXIT_DELAY        = 3000; // ms before automatic exit starts

interface LoadingScreenProps {
  /** Called when exit animation completes — unmounts this component */
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"entering" | "visible" | "exiting">("entering");
  const [showCrawl, setShowCrawl] = useState(false);
  const exitTriggered = useRef(false);

  // ── Trigger exit ──────────────────────────────────────────
  const triggerExit = useCallback(() => {
    if (exitTriggered.current) return;
    exitTriggered.current = true;
    setPhase("exiting");
  }, []);

  // ── Auto-exit timer ───────────────────────────────────────
  useEffect(() => {
    // Show production label immediately (Framer Motion handles the fade-in)
    // Show crawl after 800ms
    const crawlTimer = setTimeout(() => {
      setShowCrawl(true);
      setPhase("visible");
    }, CRAWL_START_DELAY);

    // Auto-exit after 3s
    const exitTimer = setTimeout(triggerExit, AUTO_EXIT_DELAY);

    return () => {
      clearTimeout(crawlTimer);
      clearTimeout(exitTimer);
    };
  }, [triggerExit]);

  // ── Click anywhere to skip ────────────────────────────────
  const handleSkip = () => triggerExit();

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exiting" && (
        <motion.div
          key="loading-screen"
          className="
            fixed inset-0 z-loading
            flex flex-col items-center justify-center
            bg-bg-base film-grain scanlines
            cursor-pointer select-none
            overflow-hidden
          "
          // Entry: already visible (starts at opacity 1)
          initial={{ opacity: 1, scale: 1 }}
          // Exit: fade out + slight scale — cinematic reveal
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.45, ease: "easeIn" } }}
          onClick={handleSkip}
          aria-label="Loading screen — click to skip"
          role="status"
        >

          {/* ── Amber bloom — Interstellar radial glow ──────── */}
          <div
            className="
              absolute inset-0 pointer-events-none
              animate-breathe
            "
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(200,168,75,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* ── Production label ─────────────────────────────── */}
          {/* "A MIHIR JAYSWAL PRODUCTION" — fades up from hidden */}
          <motion.p
            className="
              relative z-10
              font-cinzel tracking-[0.45em]
              text-[9px] sm:text-[10px]
              text-gold uppercase
              mb-10
            "
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: PRODUCTION_LABEL_DELAY / 1000, duration: 0.6 }}
            aria-label="A Mihir Jayswal Production"
          >
            A Mihir Jayswal Production
          </motion.p>

          {/* ── Star Wars crawl container ─────────────────────── */}
          {/* Perspective parent: gives the 3D tilt effect */}
          <AnimatePresence>
            {showCrawl && (
              <motion.div
                key="crawl-wrapper"
                className="
                  relative z-10 w-full max-w-2xl px-8
                  overflow-hidden
                "
                style={{
                  // Perspective on wrapper, crawl child rotates on X axis
                  perspective: "300px",
                  height: "260px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                {/* The actual crawl strip — CSS translateY animation */}
                <div
                  className="
                    absolute inset-x-0 bottom-0
                    text-center
                    animate-crawl
                  "
                  style={{
                    // 3D tilt — matches spec: rotateX(20deg)
                    transform: "rotateX(20deg)",
                    transformOrigin: "bottom center",
                  }}
                  aria-hidden="true" // Decorative — not read by screen readers
                >
                  {CRAWL_LINES.map((line, i) => (
                    <p
                      key={i}
                      className="
                        font-cinzel text-parchment/80
                        text-sm sm:text-base
                        leading-loose mb-4
                        tracking-[0.15em]
                      "
                      style={{
                        // Masking: fade out at top edge of viewport
                        maskImage:
                          "linear-gradient(to top, rgba(255,255,255,1) 60%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to top, rgba(255,255,255,1) 60%, transparent 100%)",
                      }}
                    >
                      {line}
                    </p>
                  ))}

                  {/* Gold divider before the title reveal */}
                  <div className="w-16 h-px bg-gold/50 mx-auto my-6" aria-hidden />

                  {/* The big title line */}
                  <p
                    className="
                      font-cinzel text-gold
                      text-xl sm:text-2xl
                      tracking-[0.3em]
                      uppercase
                    "
                  >
                    Mihir Jayswal
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Skip hint ─────────────────────────────────────── */}
          <motion.p
            className="
              absolute bottom-8
              font-inter text-dim/50
              text-[10px] tracking-[0.3em] uppercase
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.6 } }}
            aria-label="Click anywhere to skip"
          >
            Click anywhere to skip
          </motion.p>

          {/* ── Corner decoration — gold rule ─────────────────── */}
          <div
            className="absolute top-8 left-8 w-8 h-8 border-l border-t border-gold/40"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-8 w-8 h-8 border-r border-t border-gold/40"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-gold/40"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-gold/40"
            aria-hidden="true"
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
