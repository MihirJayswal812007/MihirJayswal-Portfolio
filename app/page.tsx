/**
 * app/page.tsx — Mihir Jayswal Portfolio
 *
 * Root page. Renders the Loading screen first, then reveals the main site.
 * Section order (spec/00-overview.md):
 *   Loading → Hero → About → Skills → Projects → Codex → Contact → Footer
 *
 * Easter eggs mounted at root level so they can overlay any section:
 *   - DevilFruitModal (M·J logo ×3)
 */

"use client";

import { useState } from "react";
import LoadingScreen from "@/components/Loading";
import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import SkillsSection from "@/components/Skills";
import ProjectsSection from "@/components/Projects";
import DevilFruitModal from "@/components/EasterEggs/DevilFruitModal";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  // Controls whether the loading screen is shown
  const [loadingDone, setLoadingDone] = useState(false);

  // Easter egg: Devil Fruit modal state (M·J logo ×3 click)
  const [devilFruitOpen, setDevilFruitOpen] = useState(false);

  return (
    <>
      <CustomCursor />

      {/* Loading screen — unmounts itself after exit animation completes */}
      {!loadingDone && (
        <LoadingScreen onComplete={() => setLoadingDone(true)} />
      )}

      {/* Main site — rendered beneath loading screen, revealed when loading exits */}
      <main className={loadingDone ? "block" : "invisible"} aria-hidden={!loadingDone}>
        <HeroSection onDevilFruitOpen={() => setDevilFruitOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      {/* ── Easter Eggs — mounted at root, overlay everything ──── */}
      {/* Devil Fruit Encyclopedia: triggered by M·J logo ×3 click  */}
      <DevilFruitModal
        isOpen={devilFruitOpen}
        onClose={() => setDevilFruitOpen(false)}
      />
    </>
  );
}
