"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SiScratch, SiPython, SiHtml5 } from "react-icons/si"
import { Coffee } from "lucide-react"
import type { IconType } from "react-icons"
import type { LucideIcon } from "lucide-react"
import cubiImg from "@/app/img/cubi.png"
import appInventorImg from "@/app/img/appinventor.jpeg"
import calliopeImg from "@/app/img/calliope.jpeg"
import xlogoImg from "@/app/img/xlogo.png"
import tigerjythonImg from "@/app/img/TigerJython.jpg"

export type ToolEntry = {
  name: string
  level: string
  tag: string
  href: string
  Icon?: IconType | LucideIcon
  imgSrc?: string
  color: string
}

const programmingTools: ToolEntry[] = [
  { name: "Cubi",               level: "Kl. 5–7",  tag: "Blockprogrammierung", href: "https://it-for-kids.org/cubi/",                imgSrc: cubiImg.src,         color: "#3b82f6" },
  { name: "Scratch",            level: "Kl. 5–7",  tag: "Blockprogrammierung", href: "https://scratch.mit.edu/",                     Icon: SiScratch,             color: "#ff8c1a" },
  { name: "App Inventor",       level: "WP",        tag: "App-Entwicklung",     href: "https://appinventor.mit.edu/",                 imgSrc: appInventorImg.src,  color: "#22c55e" },
  { name: "Calliope / Callibot",level: "WP",        tag: "Physical Computing",  href: "https://calliope.cc/",                         imgSrc: calliopeImg.src,     color: "#a855f7" },
  { name: "XLogo",              level: "WP",        tag: "Turtle-Grafik",       href: "https://xlogo.inf.ethz.ch/release/latest/#/",  imgSrc: xlogoImg.src,        color: "#2ecc71" },
  { name: "TigerJython",        level: "WP",        tag: "Python-Einführung",   href: "https://tigerjython.ch/",                      imgSrc: tigerjythonImg.src,  color: "#fbbf24" },
  { name: "HTML & CSS",         level: "WP 9/10",   tag: "Webentwicklung",      href: "https://developer.mozilla.org/en-US/docs/Web/HTML", Icon: SiHtml5,          color: "#ef4444" },
  { name: "Python",             level: "Kl. 9+",    tag: "Skriptsprache",       href: "https://www.python.org/",                      Icon: SiPython,              color: "#3b82f6" },
  { name: "Java",               level: "EF–Q2",     tag: "OOP",                 href: "https://www.java.com/",                        Icon: Coffee,                color: "#f97316" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
}

function ToolCard({ tool }: { tool: ToolEntry }) {
  const Icon = tool.Icon as React.ElementType | undefined

  return (
    <motion.li variants={cardVariants}>
      <motion.a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex flex-col gap-2 rounded-xl border bg-card p-3 shadow-sm overflow-hidden"
        style={{ "--tool-color": tool.color } as React.CSSProperties}
        whileHover={{
          scale: 1.07,
          y: -5,
          boxShadow: `0 10px 28px ${tool.color}35`,
          borderColor: `${tool.color}90`,
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        {/* radial glow that appears on hover */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${tool.color}18, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
        />

        {tool.imgSrc ? (
          <img
            src={tool.imgSrc}
            alt={tool.name}
            className="relative z-10 h-6 w-6 shrink-0 rounded object-contain"
          />
        ) : Icon ? (
          <motion.span
            className="relative z-10"
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="h-6 w-6 shrink-0" style={{ color: tool.color }} />
          </motion.span>
        ) : null}

        <span className="relative z-10 text-xs font-semibold text-foreground leading-tight">
          {tool.name}
        </span>
        <span className="relative z-10 text-[10px] text-muted-foreground">
          {tool.level}
        </span>

        {/* tag badge that slides in on hover */}
        <motion.span
          className="absolute bottom-2 right-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-semibold"
          style={{ background: `${tool.color}22`, color: tool.color }}
          initial={{ opacity: 0, x: 6 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tool.tag}
        </motion.span>
      </motion.a>
    </motion.li>
  )
}

export default function ProgrammingToolsGrid() {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.ul
      ref={ref}
      className="mt-6 grid grid-cols-3 gap-2"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {programmingTools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </motion.ul>
  )
}
