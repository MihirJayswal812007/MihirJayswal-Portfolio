/**
 * lib/projects-data.ts
 *
 * Single source of truth for all projects.
 * Used by: ProjectsSection
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  movie_ref: string;
  accent: string; // Tailwind color hex or token
  emoji: string;
  tech: string[];
  github: string;
  live: string;
  isTeaser?: boolean;
}

export const projects: Project[] = [
  {
    id: "chapter-1",
    title: "Jansathi AI",
    tagline: "Bridging the gap between citizens and governance — across every language.",
    movie_ref: "Interstellar",
    accent: "#378ADD", // avatar-blue
    emoji: "🤖",
    tech: ["TypeScript", "Next.js", "LLM APIs", "i18n"],
    github: "https://github.com/MihirJayswal812007",
    live: "#"
  },
  {
    id: "chapter-2",
    title: "AI Code Review Agent",
    tagline: "Every great trick has three parts. So does every great codebase.",
    movie_ref: "The Prestige",
    accent: "#7F77DD", // purple
    emoji: "🔍",
    tech: ["Python", "LangChain", "OpenAI API", "AST parsing"],
    github: "https://github.com/MihirJayswal812007",
    live: "#"
  },
  {
    id: "chapter-3",
    title: "Multilingual Mandi",
    tagline: "A marketplace that speaks every farmer's language. Fair trade, no middlemen.",
    movie_ref: "Avatar",
    accent: "#5DCAA5", // teal
    emoji: "🌾",
    tech: ["JavaScript", "Voice NLP", "AI Agents", "Real-time"],
    github: "https://github.com/MihirJayswal812007",
    live: "#"
  },
  {
    id: "chapter-4",
    title: "UIDAI Aadhaar Analytics",
    tagline: "Patterns hidden in plain sight. A million registrations, one forecast.",
    movie_ref: "Dark",
    accent: "#E24B4A", // luffy-red
    emoji: "📊",
    tech: ["Python", "Jupyter", "Pandas", "ML Forecasting"],
    github: "https://github.com/MihirJayswal812007",
    live: "#"
  },
  {
    id: "chapter-5",
    title: "Coming Soon",
    tagline: "The next chapter is still being written.",
    movie_ref: "One Piece",
    accent: "#C8A84B", // gold
    emoji: "🏴‍☠️",
    tech: [],
    github: "#",
    live: "#",
    isTeaser: true
  }
];
