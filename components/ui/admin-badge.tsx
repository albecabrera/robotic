"use client"

import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/contexts/auth-context"

export function AdminBadge() {
  const { isAdmin, logout } = useAuth()

  return (
    <AnimatePresence>
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-5 z-[100] flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-md"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-bold tracking-wide text-black select-none">
            CA
          </div>

          {/* Name + logout */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">Alberto Cabrera</span>
            <button
              onClick={logout}
              className="text-left text-[11px] text-white/50 hover:text-white/80 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
