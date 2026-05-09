"use client";

/**
 * components/Skills/SkillMarquee.tsx
 *
 * 3D Marquee of Skill Cards, tilted in perspective.
 */

import { type Category, skills, Skill } from "@/lib/skills-data";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

// Split the skills into 4 columns for the 3D marquee
const col1 = skills.slice(0, 5);
const col2 = skills.slice(5, 10);
const col3 = skills.slice(10, 14);
const col4 = skills.slice(14, 18);

interface SkillCardProps {
  skill: Skill;
  activeCategory: Category;
}

const SkillCard = ({ skill, activeCategory }: SkillCardProps) => {
  const isActive = activeCategory === "all" || activeCategory === skill.category;
  const dotColor = skill.colorHex;

  return (
    <figure
      className={cn(
        "relative h-fit w-40 cursor-pointer overflow-hidden rounded-xl border p-4 backdrop-blur-md transition-all duration-700",
        isActive 
          ? "border-[#C8A84B]/30 bg-black/60 shadow-[0_0_20px_rgba(200,168,75,0.15)]" 
          : "border-white/5 bg-white/5 opacity-30 scale-95 saturate-0"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <span 
          className="text-2xl filter drop-shadow-xl"
          style={{ textShadow: isActive ? `0 0 10px ${dotColor}80` : "none" }}
        >
          {skill.emoji}
        </span>
        <div className="flex flex-col">
          <figcaption className="text-xs font-cinzel text-parchment font-medium tracking-wide">
            {skill.name}
          </figcaption>
          <p className="text-[9px] uppercase tracking-wider font-inter text-[#C8A84B]/70 mt-0.5">
            {skill.category.replace("-", " ")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000" 
            style={{ 
              width: `${skill.level}%`, 
              backgroundColor: dotColor,
              boxShadow: isActive ? `0 0 8px ${dotColor}` : "none"
            }} 
          />
        </div>
        <span className="text-[8px] font-inter text-dim">{skill.level}%</span>
      </div>
    </figure>
  );
};

interface SkillMarqueeProps {
  activeCategory: Category;
}

export default function SkillMarquee({ activeCategory }: SkillMarqueeProps) {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-50px) translateY(0px) translateZ(-50px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {col1.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
          {col2.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {col3.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
        
        <Marquee pauseOnHover vertical className="[--duration:28s]">
          {col4.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeCategory={activeCategory} />
          ))}
        </Marquee>
      </div>

      {/* Fade edges to black for seamless transition into background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0A0A0A] to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0A0A] to-transparent"></div>
    </div>
  );
}
