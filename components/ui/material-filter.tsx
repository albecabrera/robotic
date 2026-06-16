"use client"

import { useState } from "react"
import { MaterialCard } from "./material-card"

const allMaterials = [
  { title: "Blockprogrammierung",      items: "Cubi, Scratch, Aufgaben und Erklärungen zum Einstieg",    level: "Kl. 5–7",  filter: "5-7" },
  { title: "App Inventor & XLogo",     items: "Anleitungen, Übungen und Projektvorlagen",                 level: "Kl. 7–8",  filter: "7-10" },
  { title: "Grundlagen Programmieren", items: "Algorithmen, Variablen, Bedingungen, Schleifen",           level: "Kl. 8–10", filter: "7-10" },
  { title: "Aufgaben & Arbeitsblätter",items: "Übungen, Musterlösungen, Checklisten",                    level: "Alle",     filter: "alle" },
  { title: "Webentwicklung",           items: "HTML, CSS, erste JavaScript-Grundlagen",                   level: "Kl. 9/10", filter: "7-10" },
  { title: "Oberstufe",                items: "Java, Datenbanken, Webentwicklung, KI-Grundlagen",        level: "EF–Q2",    filter: "ef" },
]

const filters = [
  { label: "Alle",     value: "alle" },
  { label: "Kl. 5–7", value: "5-7" },
  { label: "Kl. 7–10",value: "7-10" },
  { label: "EF–Q2",   value: "ef" },
]

export default function MaterialFilter() {
  const [active, setActive] = useState("alle")

  const visible = active === "alle"
    ? allMaterials
    : allMaterials.filter((m) => m.filter === active || m.filter === "alle")

  return (
    <div>
      {/* filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active === f.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {visible.map((m) => (
          <MaterialCard key={m.title} title={m.title} items={m.items} level={m.level} />
        ))}
      </div>
    </div>
  )
}
