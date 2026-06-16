import React from "react"
import { GlowingButton } from "@/components/ui/glowing-button"
import { Navbar1 } from "@/components/ui/navbar-1"
import RainingLetters from "@/components/ui/modern-animated-hero-section"
import OrbitingSkills from "@/components/ui/orbiting-skills-no-ssr"
import OrbitCarousel from "@/components/ui/orbiting-carousel-with-animated-icons"
import { SplineSceneBasic } from "@/components/blocks/spline-hero"
import { VerticalTabs } from "@/components/ui/vertical-tabs"
import { Testimonials } from "@/components/ui/testimonials-columns-1"
import Footer4Col from "@/components/ui/footer-column"
import LearningRoadmap from "@/components/ui/learning-roadmap"
import ProjectShowcase from "@/components/ui/project-showcase"
import ElternSection from "@/components/ui/eltern-section"
import MaterialFilter from "@/components/ui/material-filter"
import { SiScratch, SiPython, SiHtml5 } from "react-icons/si"
import { Coffee } from "lucide-react"
import type { IconType } from "react-icons"
import type { LucideIcon } from "lucide-react"
import cubiImg from "@/app/img/cubi.png"
import appInventorImg from "@/app/img/appinventor.jpeg"
import calliopeImg from "@/app/img/calliope.jpeg"
import xlogoImg from "@/app/img/xlogo.png"
import tigerjythonImg from "@/app/img/TigerJython.jpg"

type ToolEntry = {
  name: string
  level: string
  tag: string
  href: string
  Icon?: IconType | LucideIcon
  imgSrc?: string
  color: string
}

const programmingTools: ToolEntry[] = [
  { name: "Cubi",               level: "Kl. 5–7",  tag: "Blockprogrammierung", href: "https://it-for-kids.org/cubi/",                imgSrc: cubiImg.src,         color: "#3b82f6" },
  { name: "Scratch",            level: "Kl. 5–7",  tag: "Blockprogrammierung", href: "https://scratch.mit.edu/",                     Icon: SiScratch,             color: "#ff8c1a" },
  { name: "App Inventor",       level: "WP",        tag: "App-Entwicklung",     href: "https://appinventor.mit.edu/",                 imgSrc: appInventorImg.src,  color: "#22c55e" },
  { name: "Calliope / Callibot",level: "WP",        tag: "Physical Computing",  href: "https://calliope.cc/",                         imgSrc: calliopeImg.src,     color: "#a855f7" },
  { name: "XLogo",              level: "WP",        tag: "Turtle-Grafik",       href: "https://xlogo.inf.ethz.ch/release/latest/#/",  imgSrc: xlogoImg.src,        color: "#2ecc71" },
  { name: "TigerJython",        level: "WP",        tag: "Python-Einführung",   href: "https://tigerjython.ch/",                      imgSrc: tigerjythonImg.src,  color: "#fbbf24" },
  { name: "HTML & CSS",         level: "WP 9/10",   tag: "Webentwicklung",      href: "https://developer.mozilla.org/en-US/docs/Web/HTML", Icon: SiHtml5,          color: "#ef4444" },
  { name: "Python",             level: "Kl. 9+",    tag: "Skriptsprache",       href: "https://www.python.org/",                      Icon: SiPython,              color: "#3b82f6" },
  { name: "Java",               level: "EF–Q2",     tag: "OOP",                 href: "https://www.java.com/",                        Icon: Coffee,                color: "#f97316" },
]


const curricula = [
  {
    level: "Jahrgänge 5/6",
    title: "Orientierung und erste digitale Werkzeuge",
    points: ["sicherer Umgang mit Geräten und Dateien", "erste Algorithmen und logisches Denken", "einfache Aufgaben mit klaren Lernzielen"],
  },
  {
    level: "Jahrgänge 7/8",
    title: "Strukturen verstehen und anwenden",
    points: ["Grundlagen des Programmierens", "Daten, Tabellen und Auswertungen", "kleine Projekte mit Dokumentation"],
  },
  {
    level: "Jahrgänge 9/10",
    title: "Informatik vertiefen und Projekte umsetzen",
    points: ["Webentwicklung, Datenbanken und KI-Grundlagen", "komplexere Projekte mit Abgabe", "Vorbereitung auf Oberstufe und Berufswelt"],
  },
]

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[min(420px,80vw)] w-[min(420px,80vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-[28rem] -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <Navbar1 />

      <section id="inicio" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 pt-24 sm:pt-28 md:pb-14 xl:pt-32">
        <SplineSceneBasic />
      </section>

      <section id="welcome">
        <RainingLetters />
      </section>

      <section id="programmieren" className="section-shell section-gap">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Programmieren</p>
            <h2 className="mt-2 heading-2">
              Von Blockprogrammierung bis Textcode
            </h2>
            <p className="mt-4 lead">
              Wir starten mit visuellen Umgebungen und arbeiten uns Schritt für Schritt bis hin zu professionellen Programmiersprachen vor.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-2">
              {programmingTools.map((tool) => {
                const Icon = tool.Icon as React.ElementType | undefined
                return (
                  <li key={tool.name}>
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-2 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-primary/50 hover:bg-card/80"
                    >
                      {tool.imgSrc ? (
                        <img src={tool.imgSrc} alt={tool.name} className="h-6 w-6 shrink-0 rounded object-contain" />
                      ) : Icon ? (
                        <Icon className="h-6 w-6 shrink-0" style={{ color: tool.color }} />
                      ) : null}
                      <span className="text-xs font-semibold text-foreground leading-tight">{tool.name}</span>
                      <span className="text-[10px] text-muted-foreground">{tool.level}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <OrbitingSkills />
        </div>
      </section>

      <LearningRoadmap />

      <section id="kurse">
        <VerticalTabs />
      </section>

      <ProjectShowcase />

      <section id="materialien" className="section-shell section-gap">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Unterrichtsmaterialien</p>
            <h2 className="mt-2 heading-2">
              Alles geordnet nach Thema und Niveau
            </h2>
            <p className="mt-4 lead">
              Nutze die Materialien zum Nacharbeiten, Üben und Vorbereiten. Jede Einheit enthält Lernziele, Aufgaben und Hinweise zur Abgabe.
            </p>
          </div>
          <div className="mt-8">
            <MaterialFilter />
          </div>
          <div className="mt-10 flex justify-center">
            <GlowingButton href="#kontakt" glowColor="#3b82f6">
              Herrn Cabrera fragen
            </GlowingButton>
          </div>
        </div>
      </section>

      <section id="lehrplaene" className="section-shell pb-4 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Interne Lehrpläne</p>
            <h2 className="mt-2 heading-2">
              Orientierung für die Jahrgänge 5/6, 7/8 und 9/10
            </h2>
            <p className="mt-4 lead">
              So siehst du schnell, welche Inhalte im Fach Informatik in deiner Jahrgangsstufe wichtig sind und worauf wir im Unterricht aufbauen.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {curricula.map((plan) => (
              <article key={plan.level} className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{plan.level}</p>
                <h3 className="mt-3 heading-3">{plan.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-shell pb-16 flex justify-center gap-4">
        <GlowingButton href="#lehrplaene" glowColor="#a855f7">
          Lehrpläne ansehen
        </GlowingButton>
        <GlowingButton href="#kontakt" glowColor="#f97316">
          Kontakt aufnehmen
        </GlowingButton>
      </div>

      <ElternSection />

      <section id="informatiker" className="section-shell section-gap">
        <div className="mb-10 text-center">
          <p className="eyebrow">Pioniere der Informatik</p>
          <h2 className="mt-2 heading-2">Berühmte Informatikerinnen und Informatiker</h2>
          <p className="mt-3 lead mx-auto max-w-2xl">
            Sie haben die digitale Welt geprägt — ihre Ideen sind die Grundlage von allem, was wir heute programmieren.
          </p>
        </div>
        <OrbitCarousel />
      </section>

      <Testimonials />

      <section id="kontakt">
        <Footer4Col />
      </section>
    </main>
  )
}
