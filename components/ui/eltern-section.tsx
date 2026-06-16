"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen, HeartHandshake, MessageCircle } from "lucide-react"

const cards = [
  {
    Icon: BookOpen,
    color: "#3b82f6",
    title: "Was lernt mein Kind?",
    desc: "Der Informatikunterricht an der ESG führt schrittweise von Blockprogrammierung bis zu Java und KI. Jede Jahrgangsstufe hat klare Lernziele.",
    link: "#lehrplaene",
    linkLabel: "Lehrpläne ansehen",
  },
  {
    Icon: HeartHandshake,
    color: "#22c55e",
    title: "Wie kann ich helfen?",
    desc: "Interesse zeigen ist der beste Start. Fragen Sie Ihr Kind, was es gebaut hat. Kleine Coding-Projekte zu Hause — auch kurze — stärken das Verständnis enorm.",
    link: "#materialien",
    linkLabel: "Materialien entdecken",
  },
  {
    Icon: MessageCircle,
    color: "#f97316",
    title: "Direkt Kontakt aufnehmen",
    desc: "Fragen zu Noten, Themen oder Projekten? Herr Cabrera ist per E-Mail erreichbar. Sprechen Sie mich gerne auch nach dem Unterricht an.",
    link: "#kontakt",
    linkLabel: "Kontakt aufnehmen",
  },
]

export default function ElternSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="eltern" ref={ref} className="section-shell section-gap">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Für Eltern</p>
          <h2 className="mt-2 heading-2">Ihr Kind lernt Informatik — wir begleiten Sie beide</h2>
          <p className="mt-4 lead">
            Transparenz, offene Türen und klare Lernziele — damit Schule und Zuhause Hand in Hand gehen.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.Icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${card.color}18` }}
                >
                  <Icon className="h-5 w-5" style={{ color: card.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.desc}</p>
                </div>
                <a
                  href={card.link}
                  className="mt-auto inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:text-foreground"
                  style={{ color: card.color }}
                >
                  {card.linkLabel} →
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
