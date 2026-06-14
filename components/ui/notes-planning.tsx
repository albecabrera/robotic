"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Trash2, Plus, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  date: string  // YYYY-MM-DD
  time: string  // HH:MM
  text: string
}

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const MONTHS = [
  "Januar","Februar","März","April","Mai","Juni",
  "Juli","August","September","Oktober","November","Dezember",
]

function ymd(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function firstWeekday(year: number, month: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1  // Mon=0 … Sun=6
}

function formatDisplay(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  const wd = new Date(y, m - 1, d).toLocaleDateString("de-DE", { weekday: "long" })
  return `${wd}, ${d}. ${MONTHS[m - 1]} ${y}`
}

export default function NotesPlanning() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState(ymd(today.getFullYear(), today.getMonth(), today.getDate()))
  const [notes, setNotes] = useState<Note[]>([])
  const [time, setTime] = useState("08:00")
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const todayStr = ymd(today.getFullYear(), today.getMonth(), today.getDate())

  const calendarDays = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth)
    const offset = firstWeekday(viewYear, viewMonth)
    const cells: (number | null)[] = Array(offset).fill(null)
    for (let d = 1; d <= total; d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [viewYear, viewMonth])

  const noteDates = useMemo(() => new Set(notes.map(n => n.date)), [notes])

  const dayNotes = useMemo(
    () => notes.filter(n => n.date === selected).sort((a, b) => a.time.localeCompare(b.time)),
    [notes, selected]
  )

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const addNote = () => {
    if (!text.trim()) { setError("Notiz darf nicht leer sein."); return }
    setNotes(prev => [...prev, { id: crypto.randomUUID(), date: selected, time, text: text.trim() }])
    setText("")
    setError("")
  }

  const deleteNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id))

  return (
    <section className="section-shell section-gap">
      <div className="mx-auto max-w-screen-xl">

        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="eyebrow">Notizen & Planung</p>
          <h2 className="mt-2 heading-2">Termine und Aufgaben planen</h2>
          <p className="mt-4 lead">Wähle einen Tag im Kalender, lege eine Uhrzeit fest und notiere, was ansteht.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Calendar */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Vorheriger Monat">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-semibold">{MONTHS[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Nächster Monat">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-2">
              {WEEKDAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground py-1">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />
                const dateStr = ymd(viewYear, viewMonth, day)
                const isSelected = dateStr === selected
                const isToday = dateStr === todayStr
                const hasNote = noteDates.has(dateStr)
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelected(dateStr)}
                    className={cn(
                      "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all",
                      isSelected
                        ? "bg-foreground text-background font-medium"
                        : isToday
                        ? "border border-foreground/40 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {day}
                    {hasNote && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notes panel */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-5">

            {/* Selected date header */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Ausgewählter Tag</p>
              <p className="text-sm font-medium text-foreground">{formatDisplay(selected)}</p>
            </div>

            {/* Time + text input */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Clock size={11} /> Uhrzeit
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-muted/30 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Notiz</label>
                <textarea
                  value={text}
                  onChange={e => { setText(e.target.value); setError("") }}
                  onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addNote() }}
                  placeholder="Was ist geplant?"
                  rows={3}
                  className="w-full bg-muted/30 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 resize-none"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                onClick={addNote}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-foreground py-2 text-xs font-medium text-background hover:opacity-80 transition-opacity"
              >
                <Plus size={13} /> Hinzufügen
              </button>
            </div>

            {/* Notes list */}
            <div className="flex-1 min-h-0">
              {dayNotes.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {dayNotes.length} Notiz{dayNotes.length !== 1 ? "en" : ""}
                  </p>
                  <AnimatePresence initial={false}>
                    {dayNotes.map(note => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.18 }}
                        className="group/note flex items-start gap-3 rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5"
                      >
                        <span className="mt-0.5 shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground">{note.time}</span>
                        <p className="flex-1 text-sm leading-snug text-foreground break-words">{note.text}</p>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="mt-0.5 shrink-0 opacity-0 group-hover/note:opacity-100 transition-opacity text-muted-foreground/50 hover:text-red-400"
                          aria-label="Notiz löschen"
                        >
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground/40 text-center py-4">Keine Notizen für diesen Tag</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
