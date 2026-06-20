"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Trash2, Plus, X, Check, Lock, Unlock } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: "01",
    title: "Unterrichtsmaterialien",
    subtitle: "Arbeitsblätter & Aufgaben",
    description:
      "Materialien nach Thema und Niveau: Grundlagen, Übungsaufgaben, Musterlösungen und Lernziele.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
  },
  {
    id: "02",
    title: "Projekte",
    subtitle: "Praxis & Teamarbeit",
    description:
      "Projektideen mit klaren Anforderungen: Webseiten, Datenbanken, kleine Programme und kreative Challenges.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
  },
  {
    id: "03",
    title: "Lernvideos",
    subtitle: "Wiederholen & Vertiefen",
    description:
      "Videos zu wichtigen Konzepten, damit du zu Hause wiederholen und gezielt üben kannst.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200",
  },
];

const EMPTY_FORM = { title: "", subtitle: "", description: "", image: "" };
const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isAdmin, openLogin, logout } = useAuth();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (services.length === 1) return;
    const next = services.filter((_, i) => i !== index);
    setServices(next);
    setActiveIndex((prev) => Math.min(prev, next.length - 1));
  };

  const handleAdd = () => {
    if (!form.title.trim()) { setFormError("Titel ist Pflicht."); return; }
    const newId = String(services.length + 1).padStart(2, "0");
    const newService: Service = {
      id: newId,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || "Neuer Bereich",
      description: form.description.trim() || "Beschreibung folgt.",
      image: form.image.trim() || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    };
    const next = [...services, newService];
    setServices(next);
    setActiveIndex(next.length - 1);
    setDirection(1);
    setForm(EMPTY_FORM);
    setFormError("");
    setAdding(false);
  };

  const cancelAdd = () => {
    setAdding(false);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  useEffect(() => {
    if (isPaused || adding) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, adding, handleNext]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section className="w-full section-gap">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-1 mb-12">
              <h2 className="heading-2 text-balance">Was euch im Unterricht erwartet</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="eyebrow ml-0.5">Bereiche</span>
                <button
                  onClick={() => isAdmin ? logout() : openLogin()}
                  className="p-1 rounded text-muted-foreground/30 hover:text-muted-foreground transition-colors"
                  aria-label={isAdmin ? "Abmelden" : "Anmelden"}
                >
                  {isAdmin ? <Unlock size={12} /> : <Lock size={12} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-0">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={service.id + index}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleTabClick(index)}
                    onKeyDown={(e) => e.key === "Enter" && handleTabClick(index)}
                    className={cn(
                      "group/tab relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-border/50 first:border-0 cursor-pointer",
                      isActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-muted">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-foreground origin-top"
                          initial={{ height: "0%" }}
                          animate={isPaused || adding ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>

                    <span className="text-[11px] md:text-[11px] font-medium mt-1 tabular-nums opacity-50">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <span className={cn(
                        "text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight transition-colors duration-500",
                        isActive ? "text-foreground" : ""
                      )}>
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                              {service.subtitle}
                            </p>
                            <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Delete button — admin only, visible on hover */}
                    {isAdmin && services.length > 1 && (
                      <button
                        onClick={(e) => handleDelete(index, e)}
                        className="opacity-0 group-hover/tab:opacity-100 transition-opacity shrink-0 mt-1 p-1.5 rounded-md text-muted-foreground/50 hover:text-red-400 hover:bg-red-400/10"
                        aria-label={`${service.title} löschen`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add new — admin only */}
            <AnimatePresence mode="wait">
              {isAdmin && adding ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Neuer Bereich
                    </p>
                    <input
                      autoFocus
                      value={form.title}
                      onChange={(e) => { setForm(f => ({ ...f, title: e.target.value })); setFormError(""); }}
                      placeholder="Titel *"
                      className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30"
                    />
                    <input
                      value={form.subtitle}
                      onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))}
                      placeholder="Untertitel"
                      className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30"
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Beschreibung"
                      rows={2}
                      className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 resize-none"
                    />
                    <input
                      value={form.image}
                      onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
                      placeholder="Bild-URL (optional)"
                      className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30"
                    />
                    {formError && <p className="text-xs text-red-400">{formError}</p>}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleAdd}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
                      >
                        <Check size={12} /> Speichern
                      </button>
                      <button
                        onClick={cancelAdd}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 text-muted-foreground text-xs hover:text-foreground transition-colors"
                      >
                        <X size={12} /> Abbrechen
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : isAdmin ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setAdding(true)}
                  className="mt-4 flex items-center gap-2 text-xs text-muted-foreground/50 hover:text-foreground transition-colors border-t border-border/30 pt-4 w-full"
                >
                  <Plus size={13} />
                  Bereich hinzufügen
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Right: image */}
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-4/5 md:aspect-4/3 lg:aspect-16/11 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-muted/30 border border-border/40">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex + services[activeIndex]?.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={services[activeIndex]?.image}
                      alt={services[activeIndex]?.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Zurück"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Weiter"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;
