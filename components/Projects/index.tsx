"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { projects } from "@/lib/projects-data";
import { ProjectCard } from "./ProjectCard";
import { entry } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Scroll mechanic for the stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
      className="relative w-full z-10 px-6 md:px-12 lg:px-24"
      // Section height = cards * 600px to give plenty of scrolling room
      style={{ height: `${projects.length * 600}px` }}
    >
      <div className="sticky top-[80px] w-full max-w-5xl mx-auto flex flex-col pt-12">
        {/* Section Header */}
        <div className="mb-12">
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
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-parchment leading-tight tracking-wide"
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          >
            FEATURED WORKS
          </h2>
        </div>

        {/* Cards Stack Container */}
        <div className="relative w-full h-[480px]">
          {projects.map((project, index) => {
            const card = (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                progress={scrollYProgress}
              />
            );

            // First card entry animation
            if (index === 0) {
              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 z-50 pointer-events-none"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="relative w-full h-full pointer-events-auto">
                    {card}
                  </div>
                </motion.div>
              );
            }

            return card;
          })}
        </div>
      </div>
    </section>
  );
}
