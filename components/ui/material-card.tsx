"use client"

import { useRef, MouseEvent } from "react"

interface MaterialCardProps {
  level: string
  title: string
  items: string
}

export function MaterialCard({ level, title, items }: MaterialCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.04)`
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(59,130,246,0.18), 0 8px 32px rgba(0,0,0,0.25)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"
    card.style.boxShadow = ""
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl border bg-card p-6 shadow-sm cursor-default"
      style={{ transition: "transform 0.12s ease, box-shadow 0.12s ease", willChange: "transform" }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{level}</p>
      <h3 className="mt-3 heading-3">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{items}</p>
    </article>
  )
}
