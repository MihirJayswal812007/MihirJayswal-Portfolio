"use client";

import { useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { Project } from "@/lib/projects-data";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Individual scroll-driven stacked project card.
 */
export function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const [isActive, setIsActive] = useState(index === 0);

  // Define scroll progress points for this specific card
  // p1: card starts sliding up from bottom
  // p2: card reaches the top and becomes fully active
  // p3: next card finishes covering this card
  // p4: card completely fades out as it's too deep in the stack
  const p1 = (index - 1) / total;
  const p2 = index / total;
  const p3 = (index + 1) / total;
  const p4 = (index + 2) / total;

  // Track if this card is the currently active (topmost) one
  useMotionValueEvent(progress, "change", (latest) => {
    // It's active when it has reached the top (p2) but hasn't been fully covered by the next (p3)
    // We add a small margin so it activates slightly before it fully stops, and deactivates when the next is mostly up.
    const startActivating = index === 0 ? 0 : p2 - (0.5 / total);
    const endActivating = p3 - (0.5 / total);
    setIsActive(latest >= startActivating && latest < endActivating);
  });

  // Calculate transforms based on scroll progress
  // Slide up from 800px below, stop at 0, then stay at 0 but scale down as next card covers it.
  const y = useTransform(progress, [p1, p2, p3, p4], [800, 0, -20, -60], { clamp: true });
  const scale = useTransform(progress, [p1, p2, p3, p4], [1, 1, 0.94, 0.88], { clamp: true });
  const opacity = useTransform(progress, [p1, p2, p3, p4], [1, 1, 0.6, 0], { clamp: true });
  const borderOpacity = useTransform(progress, [p1, p2, p3], [0.12, 0.35, 0.12], { clamp: true });
  
  // Convert MotionValue number to rgba string for border
  const borderColor = useTransform(borderOpacity, (val) => `rgba(200, 168, 75, ${val})`);

  const isEven = index % 2 !== 0; // index is 0-based, so 0 is odd in appearance? Actually 0 is 1st card.
  
  const isTeaser = project.isTeaser;

  const cardRef = useRef<HTMLDivElement>(null);

  // Manually apply scroll transforms to bypass Framer Motion's WAAPI generator,
  // which crashes if inputRange values (like -0.2) get clamped into duplicate offsets.
  useMotionValueEvent(progress, "change", () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translateY(${y.get()}px) scale(${scale.get()})`;
      cardRef.current.style.opacity = `${opacity.get()}`;
      cardRef.current.style.borderColor = borderColor.get();
    }
  });

  return (
    <div
      ref={cardRef}
      style={{
        zIndex: total - index, // earlier cards have lower z-index so later ones stack on top
      }}
      className={`absolute top-0 left-0 w-full rounded-xl overflow-hidden border-[0.5px] shadow-2xl backdrop-blur-sm
        ${isEven ? "bg-[#111827]" : "bg-[#1C1A14]"}
        ${isTeaser ? "border-dashed" : "border-solid"}
      `}
    >
      <div className="flex flex-col-reverse md:flex-row h-auto md:h-[480px] w-full">
        {/* LEFT SIDE: Info */}
        <div className="w-full md:w-[40%] p-8 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-r border-[#C8A84B]/10">
          <div className="space-y-4">
            <div>
              <p className="eyebrow text-[#C8A84B] text-[9px] tracking-[0.2em] uppercase mb-2">
                CHAPTER {romanize(index + 1)}
              </p>
              <h3 className="font-cinzel text-2xl text-parchment leading-tight">
                {project.title}
              </h3>
              <p className="font-cormorant italic text-[#C8A84B]/50 text-[13px] mt-1">
                {isTeaser ? project.tagline : `In the spirit of · ${project.movie_ref}`}
              </p>
            </div>

            {!isTeaser && (
              <p className="text-dim text-sm leading-relaxed">
                {project.tagline}
              </p>
            )}

            {!isTeaser ? (
              <>
                <div className="pt-2">
                  <p className="text-[9px] uppercase font-inter text-dim mb-2 tracking-wider">CAST</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-[11px] font-inter text-parchment/80 bg-black/40 border border-[#C8A84B]/20 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Link href={project.live} className="flex items-center gap-2 text-xs font-inter text-parchment border border-[#C8A84B]/50 hover:bg-[#C8A84B]/10 transition-colors px-4 py-2 rounded-full">
                    Live Demo <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <Link href={project.github} className="flex items-center gap-2 text-xs font-inter text-dim border border-dim/30 hover:text-parchment hover:border-dim transition-colors px-4 py-2 rounded-full">
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="pt-8">
                <span className="text-[11px] font-inter text-[#C8A84B]/80 bg-[#C8A84B]/10 border border-[#C8A84B]/30 px-4 py-2 rounded-full inline-block">
                  In Development
                </span>
              </div>
            )}

            {!isTeaser && (
              <div className="absolute bottom-6 left-8">
                <span className="text-[10px] font-inter text-dim border border-dashed border-[#C8A84B]/40 px-3 py-1 rounded">
                  AI-augmented build
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Visual */}
        <div className="w-full md:w-[60%] h-[300px] md:h-full relative overflow-hidden flex items-center justify-center bg-black/20">
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30'}`}
            style={{
              background: `radial-gradient(circle at center, ${project.accent}20 0%, transparent 60%)`,
              animation: isActive ? "pulse-glow 6s ease-in-out infinite" : "none"
            }}
          />

          {/* Emoji / Symbol */}
          <div 
            className="relative z-10 text-[80px] filter drop-shadow-2xl"
            style={{ 
              animation: isActive ? "float 4s ease-in-out infinite" : "none",
              textShadow: `0 0 40px ${project.accent}80` 
            }}
          >
            {isTeaser ? (
              <span className="animate-pulse text-[#C8A84B]/50">_</span>
            ) : (
              project.emoji
            )}
          </div>
          
          {/* Film Grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-20" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        </div>
      </div>
    </div>
  );
}

function romanize(num: number) {
  const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
