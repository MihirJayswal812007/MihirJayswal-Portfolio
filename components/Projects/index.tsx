"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { entry } from "@/lib/animations";
import { projects } from "@/lib/projects-data";
import { ProjectCard } from "./ProjectCard";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Project } from "@/lib/projects-data";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Extend CardStackItem to include our custom Project data
type ProjectStackItem = CardStackItem & {
  project: Project;
  index: number;
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });

  // Handle responsive card dimensions since CardStack uses fixed pixel sizes
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ width: w - 40, height: 400 });
      } else if (w < 1024) {
        setDimensions({ width: 600, height: 400 });
      } else {
        setDimensions({ width: 800, height: 480 });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Map our data to the CardStackItem format
  const stackItems: ProjectStackItem[] = projects.map((p, i) => ({
    id: p.id,
    title: p.title, // required by CardStackItem
    project: p,
    index: i,
  }));

  // Section entry animations
  useGSAP(() => {
    if (!titleRef.current) return;

    // Title clip-path reveal (same as Skills section)
    gsap.fromTo(
      titleRef.current,
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-screen py-32 overflow-hidden flex flex-col items-center"
    >
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0" style={{ backgroundImage: 'url(/noise.png)' }}></div>
      
      {/* Section Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <motion.p
          variants={entry}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="eyebrow mb-4"
        >
          CHAPTER SELECT
        </motion.p>
        
        <h2 
          ref={titleRef}
          className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-parchment leading-tight tracking-wider"
          style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        >
          FEATURED WORKS
        </h2>
      </div>

      {/* Card Stack Interactive Component */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-8">
        <motion.div
          variants={entry}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex justify-center"
        >
          <CardStack
            items={stackItems}
            cardWidth={dimensions.width}
            cardHeight={dimensions.height}
            initialIndex={0}
            autoAdvance={false}
            showDots={true}
            overlap={0.48}
            spreadDeg={48}
            tiltXDeg={12}
            activeScale={1.03}
            inactiveScale={0.94}
            renderCard={(item, { active }) => (
              <ProjectCard 
                project={(item as ProjectStackItem).project} 
                index={(item as ProjectStackItem).index} 
                isActive={active} 
              />
            )}
          />
        </motion.div>
      </div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 text-dim text-[11px] uppercase tracking-widest font-inter"
      >
        Drag or swipe to navigate chapters
      </motion.p>
    </section>
  );
}
