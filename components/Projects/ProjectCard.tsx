"use client";

import { Project } from "@/lib/projects-data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Individual project card, rendered inside the CardStack fan component.
 */
export function ProjectCard({
  project,
  index,
  isActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
}) {
  const isEven = index % 2 !== 0; 
  const isTeaser = project.isTeaser;

  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden border-[0.5px] bg-black/80
        ${isEven ? "bg-[#111827]" : "bg-[#1C1A14]"}
        ${isTeaser ? "border-dashed" : "border-solid"}
      `}
      style={{
        borderColor: isActive ? "rgba(200, 168, 75, 0.4)" : "rgba(200, 168, 75, 0.1)",
        transition: "border-color 0.5s ease"
      }}
    >
      <div className="flex flex-col-reverse md:flex-row h-full w-full">
        {/* LEFT SIDE: Info */}
        <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-r border-[#C8A84B]/10">
          <div className="space-y-4">
            <div>
              <p className="eyebrow text-[#C8A84B] text-[9px] tracking-[0.2em] uppercase mb-2">
                CHAPTER {romanize(index + 1)}
              </p>
              <h3 className="font-cinzel text-xl md:text-2xl text-parchment leading-tight">
                {project.title}
              </h3>
              <p className="font-cormorant italic text-[#C8A84B]/50 text-[12px] md:text-[13px] mt-1">
                {isTeaser ? project.tagline : `In the spirit of · ${project.movie_ref}`}
              </p>
            </div>

            {!isTeaser && (
              <p className="text-dim text-xs md:text-sm leading-relaxed hidden sm:block">
                {project.tagline}
              </p>
            )}

            {!isTeaser ? (
              <>
                <div className="pt-2 hidden sm:block">
                  <p className="text-[9px] uppercase font-inter text-dim mb-2 tracking-wider">CAST</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] md:text-[11px] font-inter text-parchment/80 bg-black/40 border border-[#C8A84B]/20 px-2 md:px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-4">
                  <Link href={project.live} target="_blank" className="flex items-center gap-2 text-[10px] md:text-xs font-inter text-parchment border border-[#C8A84B]/50 hover:bg-[#C8A84B]/10 transition-colors px-3 md:px-4 py-2 rounded-full pointer-events-auto">
                    Live Demo <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <Link href={project.github} target="_blank" className="flex items-center gap-2 text-[10px] md:text-xs font-inter text-dim border border-dim/30 hover:text-parchment hover:border-dim transition-colors px-3 md:px-4 py-2 rounded-full pointer-events-auto">
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="pt-4 md:pt-8">
                <span className="text-[10px] md:text-[11px] font-inter text-[#C8A84B]/80 bg-[#C8A84B]/10 border border-[#C8A84B]/30 px-4 py-2 rounded-full inline-block">
                  In Development
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Visual */}
        <div className="w-full md:w-[55%] h-[200px] md:h-full relative overflow-hidden flex items-center justify-center bg-black/20">
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
            className="relative z-10 text-[60px] md:text-[80px] filter drop-shadow-2xl"
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
