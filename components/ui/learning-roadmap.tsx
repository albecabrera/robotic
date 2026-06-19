"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Database,
  Code2,
  Cpu,
  Network,
  ShieldCheck,
  Users,
  ExternalLink,
  Layers,
  GitBranch,
  FileCode,
  Server,
  Globe,
} from "lucide-react"

type Topic = { label: string; code: boolean }

const steps = [
  {
    grade: "Klasse 5/6",
    title: "Erste Schritte",
    desc: "Digitale Grundlagen, logisches Denken, erste Algorithmen",
    tools: ["Cubi", "Scratch", "Calliope"],
    topics: [
      { label: "Digitale Identität", code: false },
      { label: "Algorithmen", code: false },
      { label: "Codierungen", code: false },
      { label: "Automaten", code: false },
      { label: "Verschlüsselung", code: false },
      { label: "KI & Maschinelles Lernen", code: false },
      { label: "Datenschutz", code: false },
      { label: "Programmieren", code: true },
    ] as Topic[],
    color: "#f97316",
    bg: "bg-orange-500/10 border-orange-500/30",
    num: "01",
    target: 1,
  },
  {
    grade: "Klasse 7/8",
    title: "Logik & Apps",
    desc: "Vernetzung, Datenmodellierung, Apps und erste Textsprache",
    tools: ["App Inventor", "XLogo", "TigerJython"],
    topics: [
      { label: "Vernetzung", code: false },
      { label: "Internet & Protokolle", code: false },
      { label: "Datenmodellierung", code: false },
      { label: "Datensicherheit", code: false },
      { label: "Objekte & Klassen", code: false },
      { label: "App-Entwicklung", code: true },
      { label: "Turtle-Grafik", code: true },
      { label: "Python-Grundlagen", code: true },
    ] as Topic[],
    color: "#a855f7",
    bg: "bg-purple-500/10 border-purple-500/30",
    num: "02",
    target: 2,
  },
  {
    grade: "Klasse 9/10",
    title: "Web & Daten",
    desc: "Datenbanken, Datenschutz, KI-Systeme und Webentwicklung",
    tools: ["HTML & CSS", "Python", "SQL"],
    topics: [
      { label: "OOP & Modellierung", code: false },
      { label: "Datenbanken", code: false },
      { label: "Datenschutz & DSGVO", code: false },
      { label: "KI-Systeme", code: false },
      { label: "Vernetzung & Sicherheit", code: false },
      { label: "Webentwicklung", code: true },
      { label: "Python vertieft", code: true },
    ] as Topic[],
    color: "#3b82f6",
    bg: "bg-blue-500/10 border-blue-500/30",
    num: "03",
    target: 3,
  },
  {
    grade: "EF – Q2",
    title: "Profi-Niveau",
    desc: "OOP, Datenstrukturen, Algorithmik, Datenbanken, formale Sprachen",
    tools: ["Java", "SQL", "BlueJ"],
    topics: [
      { label: "OOP & Modellierung", code: false },
      { label: "Datenstrukturen", code: false },
      { label: "Algorithmik & Rekursion", code: true },
      { label: "Formale Sprachen", code: false },
      { label: "Endliche Automaten", code: false },
      { label: "Relationale Datenbanken", code: false },
      { label: "SQL-Abfragen", code: true },
      { label: "Informatiksysteme", code: false },
      { label: "Datenschutz & Recht", code: false },
      { label: "Informatik & Gesellschaft", code: false },
    ] as Topic[],
    color: "#22c55e",
    bg: "bg-green-500/10 border-green-500/30",
    num: "04",
    target: 4,
  },
]

const sekISchwerpunkte = [
  {
    icon: Database,
    title: "Daten und Informationen",
    desc: "Wie werden Informationen digital dargestellt, gespeichert, verarbeitet und übertragen?",
    color: "#f97316",
  },
  {
    icon: Code2,
    title: "Algorithmen und Programmierung",
    desc: "Wie lassen sich Probleme systematisch lösen? Die Schülerinnen und Schüler entwickeln eigene Programme und lernen grundlegende Konzepte des Programmierens kennen.",
    color: "#a855f7",
  },
  {
    icon: Cpu,
    title: "Informatiksysteme",
    desc: "Wie funktionieren Computer, Netzwerke und digitale Geräte? Die Lernenden erhalten Einblicke in Hard- und Software sowie in die Funktionsweise des Internets.",
    color: "#fbbf24",
  },
  {
    icon: Network,
    title: "Digitale Kommunikation und Vernetzung",
    desc: "Wie kommunizieren Menschen und Geräte miteinander? Themen sind unter anderem Netzwerke, Internetdienste und digitale Zusammenarbeit.",
    color: "#3b82f6",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz und IT-Sicherheit",
    desc: "Wie können persönliche Daten geschützt werden? Die Schülerinnen und Schüler setzen sich mit Datensicherheit, Verschlüsselung und einem verantwortungsvollen Umgang mit digitalen Medien auseinander.",
    color: "#ef4444",
  },
  {
    icon: Users,
    title: "Informatik, Mensch und Gesellschaft",
    desc: "Welche Auswirkungen haben Digitalisierung, Künstliche Intelligenz und digitale Technologien auf unseren Alltag, unsere Arbeitswelt und die Gesellschaft?",
    color: "#22c55e",
  },
]

const inhaltsfelder = [
  {
    icon: Layers,
    title: "Daten und ihre Strukturierung",
    phasen: "EF · Q1 · Q2",
    desc: "Von einfachen Datentypen über Klassen und Objekte bis zu relationalen Datenbanken — wie werden Daten modelliert, strukturiert und verwaltet?",
    color: "#f97316",
  },
  {
    icon: GitBranch,
    title: "Algorithmik",
    phasen: "EF · Q1 · Q2",
    desc: "Kontrollstrukturen, rekursive Algorithmen, Sortier- und Suchverfahren sowie die Analyse von Effizienz und Korrektheit.",
    color: "#a855f7",
  },
  {
    icon: FileCode,
    title: "Formale Sprachen und Automaten",
    phasen: "Q2",
    desc: "Endliche Automaten, reguläre Ausdrücke und die theoretischen Grundlagen der Informatik — bis hin zu den Grenzen der Berechenbarkeit.",
    color: "#fbbf24",
  },
  {
    icon: Server,
    title: "Informatiksysteme",
    phasen: "EF · Q1",
    desc: "Rechnerarchitektur, Schichtenmodelle, Client-Server-Systeme, Protokolle und die Funktionsweise moderner Netzwerke.",
    color: "#3b82f6",
  },
  {
    icon: Globe,
    title: "Informatik, Mensch und Gesellschaft",
    phasen: "EF · Q1 · Q2",
    desc: "Datenschutz, ethische Fragen der KI, gesellschaftliche Auswirkungen der Digitalisierung und rechtliche Rahmenbedingungen.",
    color: "#22c55e",
  },
]

const phasen = [
  {
    label: "EF",
    title: "Einführungsphase",
    themen: [
      "Einführung in die objektorientierte Modellierung",
      "Algorithmen und Kontrollstrukturen",
      "Client-Server-Architekturen und Internet",
      "Datenschutz und verantwortungsvoller Umgang",
    ],
    color: "#f97316",
  },
  {
    label: "Q1",
    title: "Qualifikationsphase 1",
    themen: [
      "Vertiefte OOP-Modellierung mit UML",
      "Lineare Datenstrukturen: Listen, Stacks, Queues",
      "Bäume als nicht-lineare Datenstruktur",
      "Kommunikation in vernetzten Systemen",
    ],
    color: "#3b82f6",
  },
  {
    label: "Q2",
    title: "Qualifikationsphase 2",
    themen: [
      "Relationale Datenbanken und SQL",
      "Endliche Automaten und formale Sprachen",
      "Algorithmen auf Graphen",
      "Grenzen der Berechenbarkeit",
    ],
    color: "#22c55e",
  },
]

function CountingNumber({
  target,
  color,
  inView,
  delay,
}: {
  target: number
  color: string
  inView: boolean
  delay: number
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: ReturnType<typeof setTimeout>
    const start = () => {
      let current = 0
      const tick = () => {
        current++
        setDisplay(current)
        if (current < target) {
          frame = setTimeout(tick, 100)
        }
      }
      frame = setTimeout(tick, delay)
    }
    start()
    return () => clearTimeout(frame)
  }, [inView, target, delay])

  return (
    <span className="text-lg font-bold tabular-nums" style={{ color }}>
      {String(display).padStart(2, "0")}
    </span>
  )
}

function RoadmapStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
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
      {index < steps.length - 1 && (
        <motion.div
          className="absolute left-1/2 top-8 hidden h-0.5 w-full origin-left lg:block"
          style={{
            background: `linear-gradient(to right, ${step.color}80, ${steps[index + 1].color}80)`,
            translateX: "50%",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        />
      )}

      <motion.div
        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 ${step.bg} cursor-default select-none`}
        style={{ borderColor: step.color }}
        whileHover={{
          scale: 1.18,
          boxShadow: `0 0 22px ${step.color}55, 0 0 6px ${step.color}80`,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ border: `2px solid ${step.color}` }}
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.55, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <CountingNumber
          target={step.target}
          color={step.color}
          inView={inView}
          delay={index * 120 + 200}
        />
      </motion.div>

      <div className="mt-4 w-full text-center lg:text-left">
        <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border border-border mb-2">
          {step.grade}
        </span>
        <h3 className="text-base font-bold text-foreground">{step.title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.desc}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-1 lg:justify-start">
          {step.tools.map((t) => (
            <motion.span
              key={t}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: `${step.color}18`, color: step.color }}
              whileHover={{ scale: 1.1, background: `${step.color}30` }}
              transition={{ duration: 0.15 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {step.topics.length > 0 && (
          <div className="mt-3">
            <p className="mb-1 text-[9px] uppercase tracking-widest text-muted-foreground/50">
              Lehrplan-Themen
            </p>
            <div className="flex flex-wrap justify-center gap-1 lg:justify-start">
              {step.topics.map((t) => (
                <span
                  key={t.label}
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={
                    t.code
                      ? { border: `1px solid ${step.color}55`, color: `${step.color}bb` }
                      : { background: `${step.color}12`, color: step.color }
                  }
                >
                  {t.code && (
                    <span className="mr-0.5 font-mono opacity-70">&lt;/&gt;</span>
                  )}
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SchwerpunktCard({
  item,
  index,
}: {
  item: (typeof sekISchwerpunkte)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ background: `${item.color}18` }}
      >
        <item.icon className="h-4 w-4" style={{ color: item.color }} />
      </div>
      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
    </motion.div>
  )
}

function InhaltsfeldCard({
  item,
  index,
}: {
  item: (typeof inhaltsfelder)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${item.color}18` }}
        >
          <item.icon className="h-4 w-4" style={{ color: item.color }} />
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-medium tracking-wide"
          style={{ background: `${item.color}12`, color: item.color }}
        >
          {item.phasen}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
    </motion.div>
  )
}

function PhasenRow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {phasen.map((phase) => (
        <div
          key={phase.label}
          className="rounded-xl border border-border p-5"
          style={{ borderLeftColor: phase.color, borderLeftWidth: 2 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold"
              style={{ background: `${phase.color}18`, color: phase.color }}
            >
              {phase.label}
            </span>
            <span className="text-xs text-muted-foreground">{phase.title}</span>
          </div>
          <ul className="space-y-1.5">
            {phase.themen.map((t) => (
              <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: phase.color }}
                />
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  )
}

export default function LearningRoadmap() {
  const sekIRef = useRef(null)
  const sekIInView = useInView(sekIRef, { once: true, margin: "-60px" })
  const obstufeRef = useRef(null)
  const obstufeInView = useInView(obstufeRef, { once: true, margin: "-60px" })

  return (
    <section id="roadmap" className="section-shell section-gap">
      <div className="mx-auto max-w-screen-xl">

        {/* ── Heading ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Lernweg</p>
          <h2 className="mt-2 heading-2">Von Klasse 5 bis zum Abitur</h2>
          <p className="mt-4 lead">
            Schritt für Schritt aufgebaut — jede Stufe baut auf der vorherigen auf.
          </p>
        </div>

        {/* ── Roadmap steps ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-4">
          {steps.map((step, i) => (
            <RoadmapStep key={step.num} step={step} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground/40">
          <span className="font-mono">&lt;/&gt;</span>
          {" "}= Programmieren — nur ein Teil von vielen Themen
        </p>

        {/* ── Divider ── */}
        <div className="my-20 border-t border-border" />

        {/* ── Sekundarstufe I ── */}
        <motion.div
          ref={sekIRef}
          initial={{ opacity: 0, y: 20 }}
          animate={sekIInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Sekundarstufe I</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Informatik in der Sekundarstufe I
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Im Informatikunterricht erwerben die Schülerinnen und Schüler grundlegende Kompetenzen
              für eine zunehmend digital geprägte Welt. Sie lernen nicht nur den sicheren und
              verantwortungsvollen Umgang mit digitalen Medien, sondern entwickeln auch Fähigkeiten
              zum logischen Denken, Problemlösen und kreativen Gestalten mit digitalen Technologien.
            </p>
          </div>

          <div className="mt-12">
            <p className="mb-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Schwerpunkte des Informatikunterrichts
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sekISchwerpunkte.map((item, i) => (
                <SchwerpunktCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Unser Ziel
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Der Informatikunterricht befähigt die Schülerinnen und Schüler, digitale Technologien
              nicht nur zu nutzen, sondern sie zu verstehen, kritisch zu hinterfragen und kreativ
              mitzugestalten. Damit werden wichtige Grundlagen für die weitere schulische Laufbahn,
              die Berufswelt und die aktive Teilhabe an der digitalen Gesellschaft geschaffen.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border p-6 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex-1 text-sm leading-7 text-muted-foreground">
              <p>
                Die Inhalte orientieren sich am Kernlehrplan Informatik des Landes
                Nordrhein-Westfalen. Interessierte Eltern und Schülerinnen und Schüler finden
                weitere Informationen im{" "}
                <a
                  href="https://lehrplannavigator.nrw.de/sekundarstufe-i/gesamtschule/informatik-neu-ab-20212022-gesamtschule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  Lehrplannavigator NRW
                  <ExternalLink className="h-3 w-3" />
                </a>
                .
              </p>
            </div>
            <div className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-xs leading-5 text-amber-400 sm:max-w-xs">
              <span className="font-semibold">Hinweis Oberstufe:</span> Informatik wird an unserer
              Schule derzeit nicht in der gymnasialen Oberstufe angeboten. Die Einführung ist
              für das Schuljahr 2027/28 geplant.
            </div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="my-20 border-t border-border" />

        {/* ── Gymnasiale Oberstufe ── */}
        <motion.div
          ref={obstufeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={obstufeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* coming-soon banner */}
          <div className="mx-auto mb-10 flex max-w-fit items-center gap-2.5 rounded-full border border-green-500/30 bg-green-500/8 px-4 py-2 text-xs font-medium text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Geplant ab Schuljahr 2027/28
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Gymnasiale Oberstufe</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Informatik in der gymnasialen Oberstufe
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              In der gymnasialen Oberstufe vertiefen und erweitern die Schülerinnen und Schüler
              ihre informatischen Kompetenzen auf wissenschaftspropädeutischem Niveau. Der
              Unterricht orientiert sich am{" "}
              <a
                href="https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-2013/informatik-gymnasiale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                Kernlehrplan Informatik NRW (2013)
                <ExternalLink className="h-3 w-3" />
              </a>
              .
            </p>
          </div>

          {/* Inhaltsfelder */}
          <div className="mt-12">
            <p className="mb-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
              5 Inhaltsfelder des Kernlehrplans
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inhaltsfelder.map((item, i) => (
                <InhaltsfeldCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Phasenübersicht */}
          <div className="mt-14">
            <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Phasenübersicht
            </p>
            <p className="mt-1 text-center text-xs text-muted-foreground/60">
              Unterrichtsvorhaben nach Einführungs- und Qualifikationsphase (GK &amp; LK)
            </p>
            <PhasenRow />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
