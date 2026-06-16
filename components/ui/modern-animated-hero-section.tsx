"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

const FULL_TEXT = "Willkommen im Informatikunterricht!\nViel Spaß beim logischen Denken und Programmieren!"
const TYPING_SPEED = 40   // ms per character
const PAUSE_AFTER = 3000  // ms before restarting

const FullSentence: React.FC = () => {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const type = (index: number) => {
      if (index <= FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, index))
        timeout = setTimeout(() => type(index + 1), TYPING_SPEED)
      } else {
        timeout = setTimeout(() => {
          setDisplayed("")
          type(0)
        }, PAUSE_AFTER)
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

const RainingLetters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const newCharacters: Character[] = []
    for (let i = 0; i < 300; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }
    return newCharacters
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const next = new Set<number>()
      const count = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < count; i++) {
        next.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(next)
    }, 50)
    return () => clearInterval(flickerInterval)
  }, [characters.length])

  useEffect(() => {
    let id: number
    const update = () => {
      setCharacters(prev =>
        prev.map(char => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * 65)
            ],
          }),
        }))
      )
      id = requestAnimationFrame(update)
    }
    id = requestAnimationFrame(update)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative w-full h-[50vh] bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl px-6 text-center">
        <FullSentence />
      </div>

      {characters.map((char, index) => (
        <span
          key={index}
          className={`absolute transition-colors duration-100 select-none ${
            activeIndices.has(index)
              ? "text-[#00ff00] font-bold animate-pulse z-10"
              : "text-slate-600 font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%)${activeIndices.has(index) ? ' scale(1.25)' : ''}`,
            textShadow: activeIndices.has(index) ? '0 0 8px rgba(255,255,255,0.8)' : 'none',
            opacity: activeIndices.has(index) ? 1 : 0.4,
            fontSize: '1.8rem',
          }}
        >
          {char.char}
        </span>
      ))}
    </div>
  )
}

export default RainingLetters
