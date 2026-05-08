/**
 * components/About/index.tsx
 * 
 * About Section for Mihir Jayswal Portfolio
 * Two-column layout with photo and bio. Includes CSS film grain,
 * animated counters, staggered timeline nodes, and a parallax ghost text.
 * Blends seamlessly from Hero's bg-base to bg-warm using a gradient.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slideFromLeft, slideFromRight, fadeIn } from "@/lib/animations";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for animated counters
function useCounter(endValue: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out sine
        const easeProgress = Math.sin((progress * Math.PI) / 2);
        
        setCount(Math.floor(easeProgress * endValue));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(endValue); // ensure it hits exactly endValue
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, endValue, duration]);

  return { count, ref };
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Counters
  const repos = useCounter(42);
  const projects = useCounter(15);
  const years = useCounter(2);

  useEffect(() => {
    // Parallax effect for ghost text — GSAP tied to scroll
    const ctx = gsap.context(() => {
      // Moves ghost text down at 0.2x scroll speed
      gsap.to(ghostTextRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Timeline nodes filling gold staggered as they come into view
      const nodes = gsap.utils.toArray(".timeline-node");
      nodes.forEach((node) => {
        gsap.to(node as HTMLElement, {
          backgroundColor: "#C8A84B",
          borderColor: "#C8A84B",
          boxShadow: "0 0 15px rgba(200, 168, 75, 0.4)",
          duration: 0.5,
          scrollTrigger: {
            trigger: node as HTMLElement,
            start: "top 85%", // Triggers when the node is near the bottom of viewport
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      // Gradient from bg-base (Hero) to bg-warm to create a seamless transition
      className="relative w-full min-h-screen bg-gradient-to-b from-bg-base via-bg-warm to-bg-warm text-parchment pt-32 pb-24 overflow-hidden flex items-center"
    >
      {/* ── Parallax Ghost Text ────────────────────────────── */}
      <div 
        ref={ghostTextRef}
        className="absolute top-10 left-0 w-full flex justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[20vw] font-cinzel font-bold text-parchment opacity-[0.02] tracking-tighter whitespace-nowrap">
          STORY
        </span>
      </div>

      {/* ── Main Container ─────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-7xl">
        
        {/* Section Eyebrow — entry animation fading in */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-gold text-[10px] font-inter uppercase tracking-[0.3em]">The Story So Far</span>
          <div className="h-[1px] w-24 bg-gold/30" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ── Left Column: Photo ───────────────────────────── */}
          <motion.div 
            className="lg:col-span-5 relative group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideFromLeft}
          >
            {/* Film Grain SVG Filter Definition */}
            <svg className="hidden">
              <defs>
                <filter id="grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" result="noise" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" in="noise" result="coloredNoise" />
                  <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
                </filter>
              </defs>
            </svg>

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-section/50 border border-gold/10">
              {/* Photo Placeholder - Awwwards style abstract/cinematic setup */}
              <div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554260570-9140fd3b7614?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 grayscale opacity-70 mix-blend-luminosity"
              />
              
              {/* Grain Overlay - Intensifies on hover to simulate film developing */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-100"
                style={{ filter: "url(#grain)" }}
              />
              
              {/* Vignette for blending edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-warm via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-bg-warm/30 via-transparent to-transparent opacity-80" />
            </div>

            {/* Corner Accents for a premium framing effect */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-gold/50" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-gold/50" />
          </motion.div>

          {/* ── Right Column: Text & Timeline ────────────────── */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideFromRight}
          >
            {/* Bio Text */}
            <div className="font-inter text-parchment/80 leading-relaxed md:text-lg mb-8 space-y-6">
              <p>
                I am a 2nd-year B-Tech AI/ML engineer driven by an obsession with creating intelligent, beautiful, and cinematic digital experiences.
              </p>
              <p>
                My approach to software is deeply influenced by cinematic storytelling—every interface should have rhythm, every interaction should have purpose, and the underlying architecture should be robust enough to support it all seamlessly.
              </p>
            </div>

            {/* Quote adapted from Shawshank Redemption */}
            <blockquote className="font-cormorant italic text-2xl md:text-3xl text-gold mb-12 border-l-2 border-gold/30 pl-6 py-2 relative">
              &quot;Get busy building, or get busy dying.&quot;
              <span className="absolute top-0 -left-3 text-gold/10 text-6xl font-serif leading-none">&quot;</span>
            </blockquote>

            {/* Animated Counters triggered by intersection observer via useCounter */}
            <div className="grid grid-cols-3 gap-6 mb-16 border-t border-b border-gold/10 py-8">
              <div className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-mono text-gold" ref={repos.ref}>{repos.count}+</span>
                <span className="text-[10px] font-inter uppercase tracking-widest text-dim">Git Repos</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-mono text-gold" ref={projects.ref}>{projects.count}</span>
                <span className="text-[10px] font-inter uppercase tracking-widest text-dim">Live Projects</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-mono text-gold" ref={years.ref}>{years.count}</span>
                <span className="text-[10px] font-inter uppercase tracking-widest text-dim">Years Coding</span>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative w-full mt-4" ref={timelineRef}>
              {/* Base timeline line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-dim/20 -translate-y-1/2" />
              
              <div className="flex justify-between relative z-10">
                {["School", "B-Tech", "1st Hackathon", "UIDAI"].map((label) => (
                  <div key={label} className="flex flex-col items-center gap-3 w-1/4">
                    {/* Node — background animated by GSAP scroll trigger */}
                    <div className="timeline-node w-3 h-3 rounded-full border-2 border-dim/50 bg-bg-warm transition-colors duration-500" />
                    <span className="text-[9px] md:text-[11px] font-inter uppercase tracking-wider text-dim text-center">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
