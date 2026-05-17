/**
 * app/page.tsx — Mihir Jayswal Portfolio
 *
 * Root page. Renders the Loading screen first, then reveals the main site.
 * Section order (spec/00-overview.md):
 *   Loading → Hero → About → Skills → Projects → Codex → Contact → Footer
 *
 * SectionBridges inserted between every adjacent section to dissolve the
 * hard background cuts that were jarring the eye between hue families.
 *
 * Token hex values used in bridges must match tailwind.config.ts tokens:
 *   bg-deep   = #03030A  (hero, loading)
 *   bg-mid    = #0C0C18  (about, projects)
 *   bg-raised = #101022  (skills)
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
import SectionBridge from "@/components/ui/SectionBridge";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
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
        {/* Hero: bg-deep (#03030A) */}
        <HeroSection onDevilFruitOpen={() => setDevilFruitOpen(true)} />

        {/* Hero → About: #03030A → #0C0C18 */}
        <SectionBridge from="#03030A" to="#0C0C18" />

        {/* About: bg-mid (#0C0C18) */}
        <AboutSection />

        {/* About → Skills: #0C0C18 → #101022 */}
        <SectionBridge from="#0C0C18" to="#101022" />

        {/* Skills: bg-raised (#101022) */}
        <SkillsSection />

        {/* Skills → Projects: #101022 → #0C0C18 */}
        <SectionBridge from="#101022" to="#0C0C18" />

        {/* Projects: bg-mid (#0C0C18) */}
        <ProjectsSection />
      </main>

      {/* Easter Eggs — mounted at root, overlay everything */}
      <DevilFruitModal
        isOpen={devilFruitOpen}
        onClose={() => setDevilFruitOpen(false)}
      />
    </>
  );
}
