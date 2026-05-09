"use client";

import React from "react";
import { type Category, skills, Skill } from "@/lib/skills-data";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

// Split the 18 skills into 4 columns for vertical scrolling
const col1 = skills.slice(0, 5);
const col2 = skills.slice(5, 10);
const col3 = skills.slice(10, 14);
const col4 = skills.slice(14, 18);

const SkillCard = ({ skill, activeCategory }: { skill: Skill; activeCategory: Category }) => {
  const isActive = activeCategory === "all" || activeCategory === skill.category;
  
  return (
    <figure
      className={cn(
        "relative w-32 sm:w-40 cursor-pointer overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-500 backdrop-blur-md mb-4",
        isActive 
          ? "border-white/10 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.03)]" 
          : "border-transparent bg-transparent opacity-20 scale-95"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <span 
          className="text-4xl sm:text-5xl filter drop-shadow-xl transition-all duration-500"
          style={{ textShadow: isActive ? `0 0 20px ${skill.colorHex}60` : "none" }}
        >
          {skill.emoji}
        </span>
        <div className="flex flex-col">
          <figcaption className="text-xs sm:text-sm font-cinzel text-parchment font-semibold tracking-wider">
            {skill.name}
          </figcaption>
          <p className="text-[9px] uppercase tracking-widest font-inter text-parchment/40 mt-1">
            {skill.category.replace("-", " ")}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function SkillMarquee({ activeCategory }: { activeCategory: Category }) {
  return (
    <div className="relative flex h-[500px] lg:h-[600px] w-full flex-row items-center justify-center overflow-hidden [perspective:800px] rounded-3xl">
      
      {/* 3D Container */}
      <div
        className="flex flex-row items-center gap-4 sm:gap-6 w-full justify-center"
        style={{
          transform: "rotateX(15deg) rotateY(-10deg) rotateZ(5deg) scale(1.1)",
          transformStyle: "preserve-3d",
        }}
      >
        <Marquee pauseOnHover vertical style={{ "--duration": "30s" } as React.CSSProperties}>
          {col1.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover vertical style={{ "--duration": "40s" } as React.CSSProperties}>
          {col2.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
        
        <Marquee pauseOnHover vertical style={{ "--duration": "35s" } as React.CSSProperties}>
          {col3.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover vertical style={{ "--duration": "45s" } as React.CSSProperties}>
          {col4.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
      </div>

      {/* Cinematic Fades - Placed outside the 3D transform to avoid glitching */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
    </div>
  );
}
