"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const people = [
  {
    id: 1,
    name: "Alan Turing",
    role: "Vater der Informatik",
    beitrag: "Turingmaschine, künstliche Intelligenz",
    profile: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    role: "Erste Programmiererin der Welt",
    beitrag: "Erster Algorithmus für eine Maschine",
    profile: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg",
  },
  {
    id: 3,
    name: "Grace Hopper",
    role: "Pionierin der Softwareentwicklung",
    beitrag: "Erfand den ersten Compiler",
    profile: "https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",
  },
  {
    id: 4,
    name: "Tim Berners-Lee",
    role: "Erfinder des World Wide Web",
    beitrag: "HTML, HTTP und das WWW",
    profile: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg",
  },
  {
    id: 5,
    name: "Linus Torvalds",
    role: "Schöpfer des Linux-Kernels",
    beitrag: "Linux, Git — Open Source Ikone",
    profile: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg",
  },
  {
    id: 6,
    name: "Margaret Hamilton",
    role: "NASA Software-Pionierin",
    beitrag: "Apollo-Software, prägte den Begriff 'Software Engineering'",
    profile: "https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg",
  },
  {
    id: 7,
    name: "Donald Knuth",
    role: "Algorithmen-Legende",
    beitrag: "The Art of Computer Programming",
    profile: "https://upload.wikimedia.org/wikipedia/commons/4/4f/KnuthAtOpenContentAlliance.jpg",
  },
  {
    id: 8,
    name: "Edsger Dijkstra",
    role: "Pionier strukturierter Programmierung",
    beitrag: "Dijkstra-Algorithmus, Semaphore",
    profile: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg",
  },
];

const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  (e.target as HTMLImageElement).src = "https://placehold.co/100x100/1a1a2e/a1a1aa?text=?";
};

const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState<"xs" | "sm" | "md" | "lg">("lg");
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const w = window.innerWidth;
      if (w < 480) setScreenSize("xs");
      else if (w < 640) setScreenSize("sm");
      else if (w < 768) setScreenSize("md");
      else setScreenSize("lg");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return screenSize;
};

export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const screenSize = useResponsive();

  const getResponsiveValues = () => {
    switch (screenSize) {
      case "xs": return { containerRadius: 100, profileSize: 45, cardWidth: "w-36", avatarSize: "w-12 h-12", avatarMargin: "-mt-8", fontSize: { name: "text-sm", role: "text-xs", beitrag: "text-xs" } };
      case "sm": return { containerRadius: 120, profileSize: 55, cardWidth: "w-40", avatarSize: "w-14 h-14", avatarMargin: "-mt-9", fontSize: { name: "text-base", role: "text-xs", beitrag: "text-xs" } };
      case "md": return { containerRadius: 150, profileSize: 65, cardWidth: "w-44", avatarSize: "w-16 h-16", avatarMargin: "-mt-10", fontSize: { name: "text-base", role: "text-sm", beitrag: "text-xs" } };
      default:   return { containerRadius: 200, profileSize: 80, cardWidth: "w-56", avatarSize: "w-20 h-20", avatarMargin: "-mt-12", fontSize: { name: "text-lg", role: "text-sm", beitrag: "text-xs" } };
    }
  };

  const { containerRadius, profileSize, cardWidth, avatarSize, avatarMargin, fontSize } = getResponsiveValues();
  const containerSize = containerRadius * 2 + 100;

  const getRotation = React.useCallback(
    (index: number) => (index - activeIndex) * (360 / people.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = people[activeIndex];

  return (
    <div
      className="flex flex-col items-center p-2 sm:p-4 relative min-h-[350px] sm:min-h-[400px]"
      onClick={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>

        {/* Active card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`z-10 bg-card shadow-xl rounded-xl p-2 sm:p-4 ${cardWidth} text-center border border-border`}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={active.profile}
              alt={active.name}
              onError={safeImage}
              className={`${avatarSize} rounded-full mx-auto ${avatarMargin} border-4 border-card object-cover shadow-md`}
            />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h3 className={`mt-2 font-bold text-foreground ${fontSize.name}`}>{active.name}</h3>
              <div className={`flex items-center justify-center gap-1 text-muted-foreground mt-1 ${fontSize.role}`}>
                <Code2 size={11} />
                <span className="truncate">{active.role}</span>
              </div>
              <div className={`flex items-start justify-center gap-1 text-muted-foreground/70 mt-1 px-1 ${fontSize.beitrag}`}>
                <Lightbulb size={11} className="mt-0.5 shrink-0" />
                <span className="line-clamp-2 text-left">{active.beitrag}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-2 sm:mt-3 gap-2"
            >
              <button onClick={prev} className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <ChevronLeft size={14} className="text-foreground" />
              </button>
              <button onClick={next} className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <ChevronRight size={14} className="text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting avatars */}
        {people.map((p, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={p.id}
              animate={{ transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)` }}
              transition={{ type: "spring", stiffness: 150, damping: 20, delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05 }}
              style={{ width: profileSize, height: profileSize, position: "absolute", top: `calc(50% - ${profileSize / 2}px)`, left: `calc(50% - ${profileSize / 2}px)`, zIndex: isActive ? 20 : 10 }}
            >
              <motion.div animate={{ rotate: -rotation }} transition={{ type: "spring", stiffness: 150, damping: 20 }} className="w-full h-full">
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => i !== activeIndex && setActiveIndex(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    isActive ? "border-4 border-primary shadow-lg" : "border-2 border-border hover:border-primary/60"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-1.5">
        {people.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
