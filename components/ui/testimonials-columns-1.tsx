"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

type VideoCard = {
  text: string
  image: string
  name: string
  role: string
  href?: string
}

const videos: VideoCard[] = [
  { text: "Variablen, Datentypen und einfache Ausgaben verständlich wiederholen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=python", name: "Python-Grundlagen", role: "Video · Einstieg", href: "https://www.youtube.com/watch?v=7_k0M_wHvi8" },
  { text: "So zerlegst du ein Problem in klare Schritte und saubere Algorithmen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=algorithmus", name: "Algorithmisches Denken", role: "Video · Methode", href: "https://www.youtube.com/watch?v=2UvK-8DyXyc" },
  { text: "HTML-Struktur, CSS-Styling und erste eigene Webseiten Schritt für Schritt.", image: "https://api.dicebear.com/9.x/icons/svg?seed=web", name: "Webentwicklung", role: "Video · Projekt", href: "https://www.youtube.com/watch?v=dOgFkZiVC8w" },
  { text: "Tabellen, Schlüssel und einfache SQL-Abfragen mit SELECT verstehen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=datenbank", name: "Datenbanken & SQL", role: "Video · Übung", href: "https://www.youtube.com/watch?v=6XH5hAEqE4k" },
  { text: "KI sinnvoll nutzen: Chancen, Grenzen und verantwortungsvolle Prompts.", image: "https://api.dicebear.com/9.x/icons/svg?seed=ki", name: "KI im Unterricht", role: "Video · Reflexion", href: "https://www.youtube.com/watch?v=3yp3dVxiBzE" },
  { text: "Typische Fehler im Code erkennen, lesen und systematisch beheben.", image: "https://api.dicebear.com/9.x/icons/svg?seed=debug", name: "Debugging", role: "Video · Praxis", href: "https://www.youtube.com/watch?v=k4Ccdw-wJ9w" },
  { text: "So dokumentierst du dein Projekt nachvollziehbar und bewertbar.", image: "https://api.dicebear.com/9.x/icons/svg?seed=doku", name: "Dokumentation", role: "Video · Bewertung", href: "https://www.youtube.com/watch?v=dJmBppS_4Zc" },
  { text: "Git-Grundideen: Versionen, Änderungen und Zusammenarbeit verstehen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=git", name: "Versionierung", role: "Video · Fortgeschritten", href: "https://www.youtube.com/watch?v=V0bXqLxIivo" },
  { text: "Wie du dich auf Tests, Abgaben und Präsentationen gezielt vorbereitest.", image: "https://api.dicebear.com/9.x/icons/svg?seed=lernen", name: "Lernstrategie", role: "Video · Vorbereitung", href: "https://www.youtube.com/watch?v=onEXvpip6Jw" },
]

const VideoCarousel = ({ items, duration = 28 }: { items: VideoCard[]; duration?: number }) => {
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        animate={reducedMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={reducedMotion ? {} : { duration, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-6 pb-4"
      >
        {[...items, ...items].map(({ text, image, name, role, href }, index) => {
          const cardClass =
            "group relative block w-[min(22rem,calc(100vw-2rem))] shrink-0 rounded-3xl border p-6 shadow-lg shadow-primary/10 sm:w-[20rem] sm:p-8 md:p-10"
          const inner = (
            <>
              {href && (
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-foreground transition-colors group-hover:bg-primary/20" aria-hidden="true">
                  <svg className="h-4 w-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
              <p className={href ? "pr-10" : undefined}>{text}</p>
              <div className="mt-5 flex items-center gap-2">
                <img width={40} height={40} src={image} alt="Video-Symbol" loading="lazy" decoding="async" className="h-10 w-10 rounded-full" />
                <div className="flex flex-col">
                  <div className="font-medium leading-5 tracking-tight">{name}</div>
                  <div className="leading-5 tracking-tight opacity-60">{role}</div>
                </div>
              </div>
              {href && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
                  Ansehen
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              )}
            </>
          )
          return href ? (
            <a
              key={`${name}-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} transition-[transform,border-color] hover:-translate-y-1 hover:border-primary/40`}
            >
              {inner}
            </a>
          ) : (
            <article key={`${name}-${index}`} className={cardClass}>
              {inner}
            </article>
          )
        })}
      </motion.div>
    </div>
  )
}

export const Testimonials = () => {
  return (
    <section id="lernvideos" className="section-shell section-gap relative">
      <div className="z-10 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} className="mx-auto flex max-w-[540px] flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="rounded-lg border border-border bg-card px-4 py-1 text-sm">Lernvideos</div>
          </div>
          <h2 className="mt-5 heading-2 text-center">Kurz wiederholen, sicher anwenden</h2>
          <p className="mt-4 lead text-center">Nutze die Videos zum Nacharbeiten, Üben und Vorbereiten.</p>
        </motion.div>

        <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <VideoCarousel items={videos} />
        </div>
      </div>
    </section>
  )
}
