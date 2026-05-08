"use client";

import { useEffect, useRef, useState } from "react";


/**
 * components/ui/CustomCursor.tsx
 * 
 * Custom cursor: 36px gold ring (80ms lag) + 5px gold dot.
 * Inception trail: 4px dots fade 800ms on hero only.
 */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  // Use a state to track if we're on a non-touch device
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsVisible(true);



    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Update dot (instant)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Update ring (delayed via CSS transition)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // ── Inception Trail ─────────────────────────────────────
      // Only generate trail if we are over the Hero section.
      // We check if the target has a specific ancestor or if scroll is at top.
      // Easiest is checking scrollY since Hero is the first 100vh.
      if (window.scrollY < window.innerHeight && trailContainerRef.current) {
        const dot = document.createElement("div");
        dot.className = "absolute w-1 h-1 bg-gold rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-60";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.transition = "opacity 800ms ease-out";
        
        trailContainerRef.current.appendChild(dot);

        // Fade out after 10ms (to trigger CSS transition)
        requestAnimationFrame(() => {
          setTimeout(() => {
            dot.style.opacity = "0";
          }, 10);
        });

        // Remove from DOM after 800ms
        setTimeout(() => {
          if (trailContainerRef.current?.contains(dot)) {
            trailContainerRef.current.removeChild(dot);
          }
        }, 800);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // Add hover effects for clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        if (ringRef.current) ringRef.current.style.transform += " scale(1.5)";
        if (ringRef.current) ringRef.current.style.borderColor = "rgba(200, 168, 75, 0.2)";
        if (ringRef.current) ringRef.current.style.backgroundColor = "rgba(200, 168, 75, 0.1)";
      }
    };

    const handleMouseOut = () => {
      if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace(" scale(1.5)", "");
      if (ringRef.current) ringRef.current.style.borderColor = "#C8A84B";
      if (ringRef.current) ringRef.current.style.backgroundColor = "transparent";
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail Container */}
      <div ref={trailContainerRef} className="fixed inset-0 z-cursor pointer-events-none overflow-hidden" aria-hidden="true" />
      
      {/* Main Cursor Ring */}
      <div
        ref={ringRef}
        className="
          fixed top-0 left-0 w-9 h-9 border-2 border-gold rounded-full 
          pointer-events-none z-cursor -ml-4 -mt-4
          mix-blend-difference
        "
        style={{ transition: "transform 80ms ease-out, border-color 0.2s, background-color 0.2s" }}
        aria-hidden="true"
      />

      {/* Main Cursor Dot */}
      <div
        ref={dotRef}
        className="
          fixed top-0 left-0 w-[5px] h-[5px] bg-gold rounded-full 
          pointer-events-none z-cursor -ml-[2px] -mt-[2px]
        "
        aria-hidden="true"
      />
    </>
  );
}
