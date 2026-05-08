"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wordSwarm } from "@/lib/animations";

/**
 * components/Hero/WordSwarm.tsx
 * 
 * Title words fly in from random angles and distances with spring physics.
 * Replaces with simple fade on mobile (handled by CSS/Tailwind if needed, 
 * but spec says: word swarm replaced with mask-wipe reveal below 768px.
 * We'll implement the swarm for desktop and simple reveal for mobile).
 */

interface WordSwarmProps {
  text: string;
}

export default function WordSwarm({ text }: WordSwarmProps) {
  const words = text.split(" ");
  const [origins, setOrigins] = useState<{ x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile (width < 768px)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Calculate random origins for each word
    const calculatedOrigins = text.split(" ").map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 200; // 200-400px
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });
    setOrigins(calculatedOrigins);

    return () => window.removeEventListener("resize", checkMobile);
  }, [text]);

  // Don't render until origins are calculated (prevents hydration mismatch/jumping)
  if (origins.length === 0) return <div className="opacity-0">{text}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 lg:gap-x-4">
      {words.map((word, i) => {
        // Words "wander" and "code." render in gold
        const isGold = word.toLowerCase().includes("wander") || word.toLowerCase().includes("code.");
        
        return (
          <motion.span
            key={i}
            className={`inline-block ${isGold ? "text-gold" : "text-parchment"}`}
            variants={
              isMobile
                ? {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }
                : wordSwarm(origins[i].x, origins[i].y)
            }
            initial="hidden"
            animate="visible"
            transition={{
              // Delay = 0.3 + (index × 0.09)s
              delay: 0.3 + i * 0.09,
            }}
            // Add classes for scroll exit targeting
            // Even words exit left, odd exit right
            data-scroll-exit={i % 2 === 0 ? "left" : "right"}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
