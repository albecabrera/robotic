"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface MaterialCardProps {
  level: string
  title: string
  items: string
  index?: number
}

export function MaterialCard({ level, title, items, index = 0 }: MaterialCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.08 }}
      whileHover={{
        scale: 1.04,
        y: -5,
        boxShadow: "0 12px 30px rgba(59,130,246,0.22)",
        borderColor: "rgba(59,130,246,0.6)",
      }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-2xl border bg-card p-6 shadow-sm overflow-hidden cursor-default"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.1), transparent 65%)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <p className="relative z-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">{level}</p>
      <h3 className="relative z-10 mt-3 heading-3">{title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-6 text-muted-foreground">{items}</p>
    </motion.article>
  )
}
