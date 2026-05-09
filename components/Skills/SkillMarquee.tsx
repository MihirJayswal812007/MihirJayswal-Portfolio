"use client";

import React from "react";
import { type Category, skills } from "@/lib/skills-data";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

// Split the skills into rows
const row1 = skills.slice(0, 6);
const row2 = skills.slice(6, 12);
const row3 = skills.slice(12, 18);

interface TypographyItemProps {
  name: string;
  category: string;
  colorHex: string;
  isActive: boolean;
}

const TypographyItem = ({ name, colorHex, isActive }: TypographyItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-6 md:gap-12 mx-4 md:mx-8 transition-all duration-700",
        isActive ? "opacity-100" : "opacity-20 blur-[1px]"
      )}
    >
      <span 
        className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-black tracking-widest uppercase whitespace-nowrap"
        style={{ 
          color: isActive ? "transparent" : "rgba(255,255,255,0.05)",
          WebkitTextStroke: isActive ? `1px ${colorHex}` : "none",
          textShadow: isActive ? `0 0 40px ${colorHex}50` : "none"
        }}
      >
        {name}
      </span>
      <span 
        className="text-3xl md:text-5xl"
        style={{ color: isActive ? colorHex : "rgba(255,255,255,0.05)", opacity: isActive ? 0.8 : 0.2 }}
      >
        ✦
      </span>
    </div>
  );
};

export default function SkillMarquee({ activeCategory }: { activeCategory: Category }) {
  return (
    <div className="relative flex flex-col w-full overflow-hidden py-10 md:py-20 [perspective:1000px]">
      
      <div 
        className="flex flex-col gap-8 md:gap-12 w-full"
        style={{
          transform: "rotateX(15deg) rotateY(-5deg) rotateZ(2deg)",
          transformStyle: "preserve-3d"
        }}
      >
        <Marquee pauseOnHover style={{ "--duration": "40s" } as React.CSSProperties}>
          {row1.map((skill) => (
            <TypographyItem 
              key={skill.id} 
              name={skill.name} 
              category={skill.category}
              colorHex={skill.colorHex}
              isActive={activeCategory === "all" || activeCategory === skill.category} 
            />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover style={{ "--duration": "50s" } as React.CSSProperties}>
          {row2.map((skill) => (
            <TypographyItem 
              key={skill.id} 
              name={skill.name} 
              category={skill.category}
              colorHex={skill.colorHex}
              isActive={activeCategory === "all" || activeCategory === skill.category} 
            />
          ))}
        </Marquee>

        <Marquee pauseOnHover style={{ "--duration": "45s" } as React.CSSProperties}>
          {row3.map((skill) => (
            <TypographyItem 
              key={skill.id} 
              name={skill.name} 
              category={skill.category}
              colorHex={skill.colorHex}
              isActive={activeCategory === "all" || activeCategory === skill.category} 
            />
          ))}
        </Marquee>
      </div>

      {/* Cinematic Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg-section to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg-section to-transparent z-10"></div>
    </div>
  );
}
