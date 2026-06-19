"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

type VideoCard = {
  text: string
  image: string
  name: string
  role: string
}

const videos: VideoCard[] = [
  { text: "Variablen, Datentypen und einfache Ausgaben verständlich wiederholen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=python", name: "Python-Grundlagen", role: "Video · Einstieg" },
  { text: "So zerlegst du ein Problem in klare Schritte und saubere Algorithmen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=algorithmus", name: "Algorithmisches Denken", role: "Video · Methode" },
  { text: "HTML-Struktur, CSS-Styling und erste eigene Webseiten Schritt für Schritt.", image: "https://api.dicebear.com/9.x/icons/svg?seed=web", name: "Webentwicklung", role: "Video · Projekt" },
  { text: "Tabellen, Schlüssel und einfache SQL-Abfragen mit SELECT verstehen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=datenbank", name: "Datenbanken & SQL", role: "Video · Übung" },
  { text: "KI sinnvoll nutzen: Chancen, Grenzen und verantwortungsvolle Prompts.", image: "https://api.dicebear.com/9.x/icons/svg?seed=ki", name: "KI im Unterricht", role: "Video · Reflexion" },
  { text: "Typische Fehler im Code erkennen, lesen und systematisch beheben.", image: "https://api.dicebear.com/9.x/icons/svg?seed=debug", name: "Debugging", role: "Video · Praxis" },
  { text: "So dokumentierst du dein Projekt nachvollziehbar und bewertbar.", image: "https://api.dicebear.com/9.x/icons/svg?seed=doku", name: "Dokumentation", role: "Video · Bewertung" },
  { text: "Git-Grundideen: Versionen, Änderungen und Zusammenarbeit verstehen.", image: "https://api.dicebear.com/9.x/icons/svg?seed=git", name: "Versionierung", role: "Video · Fortgeschritten" },
  { text: "Wie du dich auf Tests, Abgaben und Präsentationen gezielt vorbereitest.", image: "https://api.dicebear.com/9.x/icons/svg?seed=lernen", name: "Lernstrategie", role: "Video · Vorbereitung" },
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
        {[...items, ...items].map(({ text, image, name, role }, index) => (
          <article
            className="w-[min(22rem,calc(100vw-2rem))] shrink-0 rounded-3xl border p-6 shadow-lg shadow-primary/10 sm:w-[20rem] sm:p-8 md:p-10"
            key={`${name}-${index}`}
          >
            <p>{text}</p>
            <div className="mt-5 flex items-center gap-2">
              <img width={40} height={40} src={image} alt="Video-Symbol" loading="lazy" decoding="async" className="h-10 w-10 rounded-full" />
              <div className="flex flex-col">
                <div className="font-medium leading-5 tracking-tight">{name}</div>
                <div className="leading-5 tracking-tight opacity-60">{role}</div>
              </div>
            </div>
          </article>
        ))}
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
