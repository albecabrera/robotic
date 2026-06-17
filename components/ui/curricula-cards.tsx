"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Download } from "lucide-react"

type Plan = {
  level: string
  title: string
  points: string[]
  docHref?: string
  docLabel?: string
}

const COLORS = ["#a855f7", "#3b82f6", "#22c55e"]

function CurriculaCard({ plan, index }: { plan: Plan; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const color = COLORS[index % COLORS.length]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.1 }}
      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow: `0 12px 32px ${color}28`,
        borderColor: `${color}70`,
      }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm overflow-hidden cursor-default"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 65%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <p className="relative z-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {plan.level}
      </p>
      <h3 className="relative z-10 mt-3 heading-3">{plan.title}</h3>
      <ul className="relative z-10 mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
        {plan.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {plan.docHref && (
        <motion.a
          href={plan.docHref}
          download
          className="relative z-10 mt-5 inline-flex items-center gap-2 self-start rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
          style={{ borderColor: `${color}50`, color }}
          whileHover={{
            scale: 1.06,
            backgroundColor: `${color}15`,
            borderColor: color,
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Download className="h-3.5 w-3.5" />
          {plan.docLabel ?? "Lehrplan herunterladen"}
        </motion.a>
      )}
    </motion.article>
  )
}

export default function CurriculaCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {plans.map((plan, i) => (
        <CurriculaCard key={plan.level} plan={plan} index={i} />
      ))}
    </div>
  )
}
