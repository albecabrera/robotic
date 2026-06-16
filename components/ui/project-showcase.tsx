"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const projects = [
  {
    emoji: "🌐",
    title: "Meine erste Webseite",
    grade: "Kl. 9/10",
    tags: ["HTML", "CSS"],
    desc: "Eine persönliche Portfolio-Seite mit Navigation, Über-mich-Abschnitt und Kontaktformular.",
    color: "#ef4444",
  },
  {
    emoji: "🐍",
    title: "Snake in Python",
    grade: "Kl. 9+",
    tags: ["Python", "TigerJython"],
    desc: "Das klassische Snake-Spiel komplett selbst programmiert — mit Kollisionserkennung und Highscore.",
    color: "#3b82f6",
  },
  {
    emoji: "📱",
    title: "Wetter-App",
    grade: "WP",
    tags: ["App Inventor"],
    desc: "Eine Android-App, die Wetterdaten anzeigt und den Nutzer mit Benachrichtigungen erinnert.",
    color: "#22c55e",
  },
  {
    emoji: "🤖",
    title: "Callibot-Parcours",
    grade: "WP",
    tags: ["Calliope", "Hardware"],
    desc: "Einen kleinen Roboter durch einen Hindernisparcours navigieren — mit Sensoren und Schleifen.",
    color: "#a855f7",
  },
  {
    emoji: "🗄️",
    title: "Schul-Datenbank",
    grade: "EF",
    tags: ["SQL", "Java"],
    desc: "Relationale Datenbank mit Schülern, Kursen und Lehrern — abfragbar mit SQL-Statements.",
    color: "#f97316",
  },
  {
    emoji: "💬",
    title: "KI-Chatbot",
    grade: "Q1/Q2",
    tags: ["Python", "KI"],
    desc: "Ein einfacher Chatbot mit Entscheidungsbaum und API-Anbindung an ein Sprachmodell.",
    color: "#fbbf24",
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
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
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
            className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
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
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
