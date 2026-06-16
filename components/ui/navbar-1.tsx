"use client"

import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  { label: "Lernweg", href: "#roadmap" },
  { label: "Projekte", href: "#projekte" },
  { label: "Materialien", href: "#materialien" },
  { label: "Für Eltern", href: "#eltern" },
  { label: "Kontakt", href: "#kontakt" },
]

const AnimatedNavLink = ({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) => {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative flex min-h-11 items-center overflow-hidden rounded-full px-3 text-sm md:px-4 md:text-base"
    >
      <span className="relative h-5 overflow-hidden">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
          <span className={active ? "text-white" : "text-gray-300"}>{children}</span>
          <span className="text-white">{children}</span>
        </span>
      </span>
      {active && <span className="ml-2 h-2.5 w-2.5 rounded-full bg-white/80" />}
    </a>
  )
}

const logoElement = (
  <div className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
    <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gray-100 opacity-80" />
    <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gray-100 opacity-80" />
    <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gray-100 opacity-80" />
    <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gray-100 opacity-80" />
  </div>
)

const Navbar1 = () => {
  const { isAdmin, openLogin, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState("#materialien")
  const [progress, setProgress] = useState(0)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const frame = useRef<number | null>(null)
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-3xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass("rounded-full"), 300)
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current)
    }
  }, [isOpen])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const ratio = max > 0 ? (window.scrollY / max) * 100 : 0
        setProgress(Math.min(100, Math.max(0, ratio)))
        frame.current = null
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <header
      className={`fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-50 flex w-[calc(100%-1.25rem)] -translate-x-1/2 flex-col items-center border border-white/10 bg-[#1f1f1f70] px-4 py-3 text-white shadow-2xl shadow-black/10 backdrop-blur-md supports-backdrop-fallback transition-[border-radius] duration-300 sm:w-[calc(100%-2rem)] sm:max-w-screen-xl sm:px-6 md:px-8 ${headerShapeClass}`}
    >
      <div className="absolute inset-x-4 top-0 h-[2px] origin-left rounded-full bg-white/40" style={{ transform: `scaleX(${progress / 100})` }} />

      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <a href="#top" aria-label="Zur Startseite" className="flex min-h-14 items-center gap-3">
          {logoElement}
          <span className="hidden text-sm font-semibold tracking-wide text-white/90 md:inline">ESG Informatik</span>
        </a>

        <nav className="hidden items-center sm:flex sm:gap-x-1 md:gap-x-2 lg:gap-x-4">
          {navItems.map((item) => (
            <AnimatedNavLink key={item.href} href={item.href} active={active === item.href}>
              {item.label}
            </AnimatedNavLink>
          ))}
        </nav>


        {/* Admin avatar — top-right */}
        {isAdmin ? (
          <div className="group/avatar relative flex items-center gap-2">
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 pl-1 pr-3 py-1 hover:bg-white/15 transition-colors"
              aria-label="Abmelden"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-bold tracking-wide text-black select-none">
                CA
              </div>
              <span className="hidden text-xs font-semibold text-white sm:inline">Alberto Cabrera</span>
            </button>
          </div>
        ) : null}

        <button
          className="flex min-h-14 min-w-14 items-center justify-center text-gray-300 sm:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen ? "max-h-[600px] pt-5 opacity-100" : "max-h-0 pt-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`w-full rounded-xl py-3 text-center transition-colors ${active === item.href ? "bg-white/10 text-white" : "text-gray-300 hover:text-white"}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export { Navbar1 }
