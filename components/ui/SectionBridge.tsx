/**
 * components/ui/SectionBridge.tsx
 *
 * Renders a 100px gradient fade between adjacent sections.
 * Eliminates hard background-colour cuts by dissolving from one
 * section bg into the next.
 *
 * Usage:
 *   <SectionBridge from="#03030A" to="#0C0C18" />  // hero → about
 *   <SectionBridge from="#0C0C18" to="#101022" />  // about → skills
 *   <SectionBridge from="#101022" to="#0C0C18" />  // skills → projects
 *   <SectionBridge from="#0C0C18" to="#03030A" />  // projects → contact
 */

interface SectionBridgeProps {
  /** Hex colour of the section above (the "from" end of the gradient) */
  from: string;
  /** Hex colour of the section below (the "to" end of the gradient) */
  to: string;
  /** Height of the bridge div in px. Default: 100 */
  height?: number;
}

export default function SectionBridge({ from, to, height = 100 }: SectionBridgeProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        // Sits at z-index 1 — above grain overlay (z-0) below all section content (z-10+)
        position: "relative",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
