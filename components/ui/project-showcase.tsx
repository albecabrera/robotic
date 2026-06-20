"use client"

import { useEffect, useRef, useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import stadt1 from "@/public/projekte/xlogo/stadtlandschaft1.png"
import stadt2 from "@/public/projekte/xlogo/stadtlandschaft2.png"
import stadt3 from "@/public/projekte/xlogo/stadtlandschaft3.png"
import { accent } from "@/lib/accents"

const xlogoGallery: { src: StaticImageData; alt: string }[] = [
  { src: stadt1, alt: "Stadtlandschaft mit Kirche, Turm und Hochhaus in xLogo" },
  { src: stadt2, alt: "Skyline mit Fernsehturm, Uhrturm und Autos in xLogo" },
  { src: stadt3, alt: "Stadtansicht mit Big Ben, Kirche und Bäumen in xLogo" },
]

const projects = [
  {
    emoji: "🌐",
    title: "Meine erste Webseite",
    grade: "Kl. 9/10",
    tags: ["HTML", "CSS"],
    desc: "Eine persönliche Portfolio-Seite mit Navigation, Über-mich-Abschnitt und Kontaktformular.",
    color: accent.red,
  },
  {
    emoji: "🐍",
    title: "Snake in Python",
    grade: "Kl. 9+",
    tags: ["Python", "TigerJython"],
    desc: "Das klassische Snake-Spiel komplett selbst programmiert — mit Kollisionserkennung und Highscore.",
    color: accent.blue,
  },
  {
    emoji: "📱",
    title: "Wetter-App",
    grade: "WP",
    tags: ["App Inventor"],
    desc: "Eine Android-App, die Wetterdaten anzeigt und den Nutzer mit Benachrichtigungen erinnert.",
    color: accent.green,
  },
  {
    emoji: "🤖",
    title: "Callibot-Parcours",
    grade: "WP",
    tags: ["Calliope", "Hardware"],
    desc: "Einen kleinen Roboter durch einen Hindernisparcours navigieren — mit Sensoren und Schleifen.",
    color: accent.purple,
  },
  {
    emoji: "🗄️",
    title: "Schul-Datenbank",
    grade: "EF",
    tags: ["SQL", "Java"],
    desc: "Relationale Datenbank mit Schülern, Kursen und Lehrern — abfragbar mit SQL-Statements.",
    color: accent.orange,
  },
  {
    emoji: "💬",
    title: "KI-Chatbot",
    grade: "Q1/Q2",
    tags: ["Python", "KI"],
    desc: "Ein einfacher Chatbot mit Entscheidungsbaum und API-Anbindung an ein Sprachmodell.",
    color: accent.amber,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.09 }}
      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow: `0 12px 32px ${project.color}30`,
        borderColor: `${project.color}80`,
      }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-sm overflow-hidden cursor-default"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 65%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-10 flex items-start justify-between gap-2">
        <motion.span
          className="text-3xl"
          role="img"
          aria-label={project.title}
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.35 }}
        >
          {project.emoji}
        </motion.span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{ background: `${project.color}18`, color: project.color }}
        >
          {project.grade}
        </span>
      </div>
      <h3 className="relative z-10 text-base font-bold text-foreground">{project.title}</h3>
      <p className="relative z-10 text-xs leading-5 text-muted-foreground">{project.desc}</p>
      <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 pt-1">
        {project.tags.map((tag) => (
          <motion.span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            whileHover={{ borderColor: project.color, color: project.color, scale: 1.08 }}
            transition={{ duration: 0.15 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.article>
  )
}

function FeaturedXLogo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
      else if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % xlogoGallery.length))
      else if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + xlogoGallery.length) % xlogoGallery.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="relative mb-8 overflow-hidden rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, 12, transparent 60%)` }}
      />
      <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          WP-Informatik 7
        </span>
        <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Schülerprojekt
        </span>
      </div>
      <h3 className="relative z-10 mt-3 heading-3 text-foreground">Eine Stadtlandschaft mit xLogo bauen</h3>
      <p className="relative z-10 mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        Mit der Turtle-Grafik in xLogo haben die Schülerinnen und Schüler aus Befehlen, Schleifen und
        Winkeln ganze Stadtlandschaften gezeichnet — Kirchen, Türme, Hochhäuser und Bäume entstehen
        Zeile für Zeile aus reiner Geometrie.
      </p>

      <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3">
        {xlogoGallery.map((img, i) => (
          <motion.button
            key={img.alt}
            type="button"
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-xl border bg-white"
            aria-label={`${img.alt} — vergrößern`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              className="h-auto w-full"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
          </motion.button>
        ))}
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {["xLogo", "Turtle-Grafik", "Geometrie", "Schleifen"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={xlogoGallery[lightbox].src}
                alt={xlogoGallery[lightbox].alt}
                className="h-auto w-full"
                sizes="100vw"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Schließen"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function ProjectShowcase() {
  return (
    <section id="projekte" className="section-shell section-gap">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Projekte</p>
          <h2 className="mt-2 heading-2">Was Schülerinnen und Schüler bauen</h2>
          <p className="mt-4 lead">
            Echte Projekte aus dem Unterricht — von der ersten App bis zur Datenbank.
          </p>
        </div>
        <div className="mt-10">
          <FeaturedXLogo />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
