/**
 * Site accent palette — single source of truth for the recurring theme colors
 * used across cards, roadmap steps, buttons and gradients.
 *
 * Brand colors of external tools (e.g. Scratch, XLogo) intentionally stay inline
 * in their components, since they represent those products' own identity.
 */
export const accent = {
  blue: "#3b82f6",
  orange: "#f97316",
  green: "#22c55e",
  purple: "#a855f7",
  amber: "#fbbf24",
  red: "#ef4444",
  teal: "#14b8a6",
} as const

export type Accent = (typeof accent)[keyof typeof accent]
