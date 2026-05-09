"use client";

/**
 * components/EasterEggs/DevilFruitModal.tsx
 *
 * Full-screen modal triggered by clicking the M·J logo ×3 times.
 * Shows the complete Devil Fruit flip card grid (all skills).
 * Spec ref: spec/09-easter-eggs.md → id: logo-click
 *
 * Animation:
 *  - Overlay: opacity 0→1, 400ms ease
 *  - Grid container: scale(0.92)→scale(1) + opacity 0→1, spring
 *  - Cards: staggered entry via IntersectionObserver (same as original Skills layout)
 */

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconAnchor } from "@tabler/icons-react";
import { skills, CATEGORIES, type Category } from "@/lib/skills-data";
import FruitCard from "@/components/Skills/FruitCard";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DevilFruitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DevilFruitModal({ isOpen, onClose }: DevilFruitModalProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [cardsVisible, setCardsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Trigger card entry animation once modal opens and grid mounts
  useEffect(() => {
    if (isOpen) {
      // Small delay so modal scale animation plays first
      const t = setTimeout(() => setCardsVisible(true), 350);
      return () => clearTimeout(t);
    } else {
      setCardsVisible(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll while modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop overlay ──────────────────────────────── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-bg-base/95 z-[60] cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}   // click outside to close
          />

          {/* ── Modal panel ───────────────────────────────────── */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[61] flex flex-col overflow-hidden"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* ── Header ──────────────────────────────────────── */}
            <div className="flex items-start justify-between px-6 md:px-12 pt-8 pb-6 shrink-0">
              <div>
                {/* Eyebrow — references the easter egg trigger */}
                <p className="eyebrow mb-1">⚡ Devil Fruit Awakened</p>
                <h2 className="font-cinzel text-2xl md:text-3xl text-parchment font-bold tracking-tight">
                  Encyclopedia of Fruits
                </h2>
                <p className="text-[11px] font-inter text-parchment/30 uppercase tracking-widest mt-1">
                  Click any card to reveal its ability
                </p>
              </div>

              {/* Close button — ⚓ icon (Tabler Icons) */}
              <button
                onClick={onClose}
                aria-label="Close Devil Fruit Encyclopedia"
                className="group mt-1 p-2 border border-parchment/15 hover:border-gold/50 hover:text-gold text-parchment/40 transition-all duration-300"
              >
                <IconAnchor size={20} stroke={1.5} />
              </button>
            </div>

            {/* ── Filter tabs ───────────────────────────────────── */}
            <div className="flex flex-wrap gap-2 px-6 md:px-12 mb-6 shrink-0">
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

            {/* Thin divider */}
            <div className="mx-6 md:mx-12 h-[1px] bg-gradient-to-r from-gold/20 via-gold/10 to-transparent mb-6 shrink-0" />

            {/* ── Card grid ──────────────────────────────────────── */}
            <div
              ref={gridRef}
              className="flex-1 overflow-y-auto px-6 md:px-12 pb-12"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#C8A84B #02020A" }}
            >
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                }}
              >
                {filtered.map((skill, i) => (
                  <FruitCard
                    key={skill.id}
                    skill={skill}
                    entryDelay={i * 55}
                    isVisible={cardsVisible}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
