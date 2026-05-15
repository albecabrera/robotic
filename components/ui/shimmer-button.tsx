"use client"

import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function ShimmerButton({
  children,
  href,
  className,
  showArrow = true,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode
  href?: string
  className?: string
  showArrow?: boolean
  variant?: "primary" | "outline"
  onClick?: () => void
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-medium transition-all duration-300"

  const variants = {
    primary: cn(
      "bg-foreground text-background shadow-lg",
      "hover:-translate-y-0.5 hover:shadow-foreground/20 hover:shadow-xl",
    ),
    outline: cn(
      "border-2 border-foreground/20 text-foreground",
      "hover:border-foreground/60 hover:-translate-y-0.5",
    ),
  }

  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15 transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
      />
      <span className="relative flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cn(base, variants[variant], className)}>
      {content}
    </button>
  )
}
