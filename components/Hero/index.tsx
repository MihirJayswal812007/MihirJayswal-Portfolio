"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StarField from "./StarField";
import WordSwarm from "./WordSwarm";
import { quotes } from "@/lib/quotes";
import { fadeIn } from "@/lib/animations";

export default function HeroSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Logo Easter Egg
  const [clickCount, setClickCount] = useState(0);
  
  useEffect(() => {
    if (clickCount >= 3) {
      console.log("DEVIL FRUIT EASTER EGG TRIGGERED!");
      setClickCount(0);
      // TODO: Trigger actual Devil Fruit animation later
    }
  }, [clickCount]);

  // Typewriter effect logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentQuote = quotes[quoteIndex];
    
    if (isTyping) {
      if (displayedQuote.length < currentQuote.length) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentQuote.slice(0, displayedQuote.length + 1));
        }, 50); // Typing speed
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000); // Pause at end of quote
      }
    } else {
      if (displayedQuote.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentQuote.slice(0, displayedQuote.length - 1));
        }, 30); // Deleting speed
      } else {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedQuote, isTyping, quoteIndex]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg-base flex flex-col items-center justify-center">
      {/* ── Background Elements ──────────────────────────────── */}
      <StarField />
      
      {/* Amber Breathing Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gold/5 blur-[100px] pointer-events-none animate-breathe mix-blend-screen" />
      
      {/* ── Navigation Header ────────────────────────────────── */}
      <header className="absolute top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-20">
        <button 
          onClick={() => setClickCount(prev => prev + 1)}
          className="text-gold font-cinzel text-xl md:text-2xl tracking-widest hover:scale-105 transition-transform"
        >
          M · J
        </button>
        
        <nav className="hidden md:flex gap-8 text-xs font-inter uppercase tracking-widest text-parchment/60">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-12 md:mt-0">
        
        {/* Pre-title */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-[9px] md:text-[11px] font-cinzel text-gold uppercase tracking-[0.4em] mb-6"
        >
          A Mihir Jayswal Production
        </motion.p>
        
        {/* Title Swarm */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-cormorant font-bold leading-tight md:leading-tight mb-8">
          <WordSwarm text="Not all those who wander are without code." />
        </h1>
        
        {/* Subtitle Typewriter */}
        <div className="h-6 md:h-8 mb-8 text-sm md:text-base font-inter text-parchment/80 italic relative">
          <span className="relative z-10">{displayedQuote}</span>
          <span className="animate-cursor inline-block w-[2px] h-[1em] bg-gold align-middle ml-1" />
        </div>
        
        {/* Role Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center justify-center gap-2 md:gap-4 text-[9px] md:text-[11px] font-inter uppercase tracking-widest text-parchment/70 mb-12 flex-wrap"
        >
          <span>AI / ML Engineer</span>
          <span className="text-gold text-[8px]">●</span>
          <span>Full Stack</span>
          <span className="text-gold text-[8px]">●</span>
          <span>B-Tech 2nd Year</span>
        </motion.div>
        
        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a href="#projects" className="group relative px-8 py-3 border border-gold text-gold font-cinzel tracking-widest text-sm uppercase overflow-hidden transition-colors duration-500 hover:text-bg-base">
            <span className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10">View Projects</span>
          </a>
          
          <a href="#codex" className="text-xs font-inter uppercase tracking-widest text-parchment/60 hover:text-gold transition-colors duration-300 animate-pulse">
            The Codex ↓
          </a>
        </motion.div>
      </div>
      
      {/* ── Scroll Hint ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-inter uppercase tracking-widest text-parchment/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent animate-breathe" />
      </motion.div>
    </section>
  );
}
