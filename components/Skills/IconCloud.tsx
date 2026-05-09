"use client";

/**
 * components/Skills/IconCloud.tsx
 *
 * 3D rotating sphere of tech stack icons powered by react-icon-cloud.
 * Icons fetched from SimpleIcons CDN, rendered monochromatically in parchment.
 *
 * When `slugs` prop changes (tab filter), the cloud fades out, updates,
 * then fades back in to give a smooth category-switch feel.
 */

import { useEffect, useState, useRef } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, type ICloud } from "react-icon-cloud";

// ── Static cloud options — defined outside component to prevent re-creation ──
const CLOUD_OPTIONS: ICloud["options"] = {
  reverse: true,          // reverses auto-rotation direction for visual interest
  depth: 1,               // controls perspective depth of sphere
  wheelZoom: false,       // disable scroll zoom (conflicts with page scroll)
  imageScale: 2,          // scale factor for icon images
  activeCursor: "pointer",
  initial: [0.1, -0.1],  // initial rotation velocity [x, y]
  clickToFront: 500,      // ms animation to bring icon to front on click
  tooltipDelay: 0,
  outlineColour: "#0000", // transparent icon outlines
  maxSpeed: 0.05,         // idle auto-rotation max speed
  minSpeed: 0.02,         // idle auto-rotation min speed
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface IconCloudProps {
  /** SimpleIcons slugs to display — changes trigger fade-transition + reload */
  slugs: string[];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function IconCloud({ slugs }: IconCloudProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [icons, setIcons] = useState<any[]>([]);
  const [opacity, setOpacity] = useState(1); // controls fade-transition on slug change
  const prevSlugsRef = useRef<string[]>([]);

  useEffect(() => {
    // Skip fetch if slugs haven't actually changed (avoid re-fetch on parent re-renders)
    const same =
      slugs.length === prevSlugsRef.current.length &&
      slugs.every((s, i) => s === prevSlugsRef.current[i]);
    if (same && icons.length > 0) return;

    // Fade out → fetch → update → fade in
    setOpacity(0);
    const timer = setTimeout(async () => {
      try {
        const result = await fetchSimpleIcons({ slugs });
        const rendered = Object.values(result.simpleIcons).map((icon) =>
          // renderSimpleIcon converts a SimpleIcon to an anchor element with SVG
          renderSimpleIcon({
            icon,
            size: 38,
            // bgHex forces contrast calculation; fallbackHex is the parchment colour
            bgHex: "#111827",        // bg-section — our dark background
            fallbackHex: "#E8DFC0", // parchment — used when contrast is too low
            minContrastRatio: 2,
            aProps: {
              href: undefined,
              target: undefined,
              rel: undefined,
              // Prevent navigation on icon click
              onClick: (e: React.MouseEvent) => e.preventDefault(),
            },
          })
        );
        setIcons(rendered);
        prevSlugsRef.current = slugs;
      } catch {
        // If fetch fails (network/invalid slug), render with whatever we have
      }
      setOpacity(1);
    }, 250); // wait 250ms for fade-out before re-fetching

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugs]);

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: "260px",
        maxHeight: "380px",
        // Fade transition when slug list changes
        opacity,
        transition: "opacity 0.25s ease",
        // Monochrome gold-tinted filter on the entire cloud container
        filter: "grayscale(1) brightness(1.6) sepia(0.15)",
      }}
    >
      {/* Ambient gold bloom behind cloud */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,168,75,0.06) 0%, transparent 70%)",
        }}
      />

      {icons.length > 0 ? (
        <Cloud options={CLOUD_OPTIONS}>
          {/* Each icon is a rendered anchor element from renderSimpleIcon */}
          {icons}
        </Cloud>
      ) : (
        // Skeleton while fetching — pulsing ring
        <div className="w-48 h-48 rounded-full border border-gold/10 animate-breathe" />
      )}
    </div>
  );
}
