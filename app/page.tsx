/**
 * app/page.tsx — Mihir Jayswal Portfolio
 *
 * Root page. Renders the Loading screen first, then reveals the main site.
 * Section order (spec/00-overview.md):
 *   Loading → Hero → About → Skills → Projects → Codex → Contact → Footer
 *
 */

"use client";

import { useState } from "react";
import LoadingScreen from "@/components/Loading";
import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  // Controls whether the loading screen is shown
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      <CustomCursor />
      
      {/* Loading screen — unmounts itself after exit animation completes */}
      {!loadingDone && (
        <LoadingScreen onComplete={() => setLoadingDone(true)} />
      )}

      {/* Main site — rendered beneath loading screen, revealed when loading exits */}
      <main className={loadingDone ? "block" : "invisible"} aria-hidden={!loadingDone}>
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
}
