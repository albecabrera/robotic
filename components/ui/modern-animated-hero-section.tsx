"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"

const FULL_TEXT = "Willkommen im Informatikunterricht!\nViel Spaß beim logischen Denken und Programmieren!"
const TYPING_SPEED = 40
const PAUSE_AFTER = 3000
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
const COUNT = 100

const FullSentence: React.FC = () => {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const type = (index: number) => {
      if (index <= FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, index))
        timeout = setTimeout(() => type(index + 1), TYPING_SPEED)
      } else {
        timeout = setTimeout(() => { setDisplayed(""); type(0) }, PAUSE_AFTER)
      }
    }
    type(0)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <p className="text-white text-center font-mono text-lg font-bold leading-snug sm:text-2xl lg:text-3xl whitespace-pre-line">
      {displayed}
      <span className="animate-pulse">▎</span>
    </p>
  )
}

interface Character { char: string; x: number; y: number; speed: number }

const RainingLetters: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const initialChars = useMemo<Character[]>(() =>
    Array.from({ length: COUNT }, () => ({
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.08 + Math.random() * 0.18,
    })), [])

  useEffect(() => {
    setCharacters(initialChars)
  }, [initialChars])

  // RAF loop for falling — only when motion is allowed
  useEffect(() => {
    if (reducedMotion) return
    const update = () => {
      setCharacters(prev =>
        prev.map(c => c.y >= 100
          ? { ...c, y: -5, x: Math.random() * 100, char: CHARS[Math.floor(Math.random() * CHARS.length)] }
          : { ...c, y: c.y + c.speed }
        )
      )
      rafRef.current = requestAnimationFrame(update)
    }
    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion])

  // Flicker at 200ms (was 50ms — 4× less re-renders)
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      const next = new Set<number>()
      const count = 2 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count; i++) next.add(Math.floor(Math.random() * COUNT))
      setActiveIndices(next)
    }, 200)
    return () => clearInterval(id)
  }, [reducedMotion])

  return (
    <div className="relative w-full h-[50vh] bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl px-6 text-center">
        <FullSentence />
      </div>

      {!reducedMotion && characters.map((char, index) => (
        <span
          key={index}
          aria-hidden
          className={`absolute select-none pointer-events-none ${
            activeIndices.has(index)
              ? "text-[#00ff00] font-bold z-10"
              : "text-slate-600 font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%)${activeIndices.has(index) ? " scale(1.25)" : ""}`,
            textShadow: activeIndices.has(index) ? "0 0 8px rgba(255,255,255,0.8)" : "none",
            opacity: activeIndices.has(index) ? 1 : 0.4,
            fontSize: "1.8rem",
          }}
        >
          {char.char}
        </span>
      ))}
    </div>
  )
}

export default RainingLetters
