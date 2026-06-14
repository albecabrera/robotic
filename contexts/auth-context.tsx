"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"

interface AuthContextType {
  isAdmin: boolean
  openLogin: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  openLogin: () => {},
  logout: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

const EMPTY = { kuerzel: "", passwort: "" }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [show, setShow] = useState(false)
  const [fields, setFields] = useState(EMPTY)
  const [error, setError] = useState("")

  const openLogin = () => { setShow(true); setError(""); setFields(EMPTY) }
  const logout = () => setIsAdmin(false)

  const handleLogin = () => {
    if (fields.kuerzel === "ca" && fields.passwort === "cabrera") {
      setIsAdmin(true)
      setShow(false)
      setFields(EMPTY)
      setError("")
    } else {
      setError("Kürzel oder Passwort falsch.")
    }
  }

  const close = () => { setShow(false); setError(""); setFields(EMPTY) }

  return (
    <AuthContext.Provider value={{ isAdmin, openLogin, logout }}>
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) close() }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-sm mx-4 rounded-2xl border border-border/60 bg-background p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold">Lehrerbereich</h3>
                <button onClick={close} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Kürzel</label>
                  <input
                    autoFocus
                    value={fields.kuerzel}
                    onChange={(e) => { setFields(f => ({ ...f, kuerzel: e.target.value })); setError("") }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full bg-muted/30 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Passwort</label>
                  <input
                    type="password"
                    value={fields.passwort}
                    onChange={(e) => { setFields(f => ({ ...f, passwort: e.target.value })); setError("") }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full bg-muted/30 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/40"
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  onClick={handleLogin}
                  className="w-full mt-1 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Anmelden
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  )
}
