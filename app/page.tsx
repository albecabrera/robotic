import { GlowingButton } from "@/components/ui/glowing-button"
import { MaterialCard } from "@/components/ui/material-card"
import { Navbar1 } from "@/components/ui/navbar-1"
import RainingLetters from "@/components/ui/modern-animated-hero-section"
import OrbitingSkills from "@/components/ui/orbiting-skills-no-ssr"
import OrbitCarousel from "@/components/ui/orbiting-carousel-with-animated-icons"
import { SplineSceneBasic } from "@/components/blocks/spline-hero"
import { VerticalTabs } from "@/components/ui/vertical-tabs"
import { Testimonials } from "@/components/ui/testimonials-columns-1"
import Footer4Col from "@/components/ui/footer-column"

const materials = [
  {
    title: "Grundlagen",
    items: "Algorithmen, Variablen, Bedingungen, Schleifen",
    level: "Jg. 8–10",
  },
  {
    title: "Aufgaben & Arbeitsblätter",
    items: "Übungen, Musterlösungen, Checklisten",
    level: "alle Kurse",
  },
  {
    title: "Oberstufe",
    items: "Datenbanken, Webentwicklung, KI, Projektarbeit",
    level: "EF–Q2",
  },
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

      <section id="inicio" className="mx-auto w-[calc(100%-2rem)] max-w-6xl pb-10 pt-24 sm:pt-28 md:pb-14 xl:pt-32">
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
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Scratch — Blockprogrammierung für Einsteiger",
                "XLogo — Algorithmisches Denken mit der Turtle",
                "Tigerjython — erster Einstieg in Python-Syntax",
                "HTML & CSS — Struktur und Design im Web",
                "Python — vielseitige Skriptsprache",
                "Java — objektorientierte Programmierung",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <OrbitingSkills />
        </div>
      </section>

      <section id="kurse">
        <VerticalTabs />
      </section>

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
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {materials.map((material) => (
              <MaterialCard key={material.title} {...material} />
            ))}
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
