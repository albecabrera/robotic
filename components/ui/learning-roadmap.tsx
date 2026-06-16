"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const steps = [
  {
    grade: "Klasse 5/6",
    title: "Erste Schritte",
    desc: "Digitale Grundlagen, Algorithmen, logisches Denken",
    tools: ["Cubi", "Scratch"],
    color: "#f97316",
    bg: "bg-orange-500/10 border-orange-500/30",
    dot: "bg-orange-500",
    num: "01",
  },
  {
    grade: "Klasse 7",
    title: "Logik & Apps",
    desc: "Eigene Apps bauen, Turtle-Grafik, erstes Programmieren",
    tools: ["App Inventor", "XLogo"],
    color: "#a855f7",
    bg: "bg-purple-500/10 border-purple-500/30",
    dot: "bg-purple-500",
    num: "02",
  },
  {
    grade: "Klasse 8",
    title: "Python & Hardware",
    desc: "Erste Textsprache, physische Roboterprogrammierung",
    tools: ["TigerJython", "Calliope"],
    color: "#fbbf24",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    dot: "bg-yellow-500",
    num: "03",
  },
  {
    grade: "Klasse 9/10",
    title: "Web & Code",
    desc: "Webseiten bauen, Python vertiefen, Daten auswerten",
    tools: ["HTML & CSS", "Python"],
    color: "#3b82f6",
    bg: "bg-blue-500/10 border-blue-500/30",
    dot: "bg-blue-500",
    num: "04",
  },
  {
    grade: "EF – Q2",
    title: "Profi-Niveau",
    desc: "OOP, Datenbanken, KI-Grundlagen, komplexe Projekte",
    tools: ["Java", "SQL", "KI"],
    color: "#22c55e",
    bg: "bg-green-500/10 border-green-500/30",
    dot: "bg-green-500",
    num: "05",
  },
]

function RoadmapStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center"
    >
      {/* connector line — hidden on last */}
      {index < steps.length - 1 && (
        <motion.div
          className="absolute left-1/2 top-8 hidden h-0.5 w-full origin-left lg:block"
          style={{ background: `linear-gradient(to right, ${step.color}80, ${steps[index + 1].color}80)`, translateX: "50%" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        />
      )}

      {/* dot */}
      <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 ${step.bg}`} style={{ borderColor: step.color }}>
        <span className="text-lg font-bold" style={{ color: step.color }}>{step.num}</span>
      </div>

      {/* content */}
      <div className="mt-4 w-full text-center lg:text-left">
        <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border border-border mb-2">
          {step.grade}
        </span>
        <h3 className="text-base font-bold text-foreground">{step.title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.desc}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-1 lg:justify-start">
          {step.tools.map((t) => (
            <span key={t} className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: `${step.color}18`, color: step.color }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function LearningRoadmap() {
  return (
    <section id="roadmap" className="section-shell section-gap">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Lernweg</p>
          <h2 className="mt-2 heading-2">Von Klasse 5 bis zum Abitur</h2>
          <p className="mt-4 lead">
            Schritt für Schritt aufgebaut — jede Stufe baut auf der vorherigen auf.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
          {steps.map((step, i) => (
            <RoadmapStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
