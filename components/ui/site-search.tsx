"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

const HIGHLIGHT = "site-search"
const ACTIVE = "site-search-active"
const MIN_LEN = 2

// CSS Custom Highlight API — present in Chromium/Arc and Safari 17.2+.
function searchSupported() {
  return typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined"
}

const SiteSearch = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(0)
  const [supported, setSupported] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const ranges = useRef<Range[]>([])

  useEffect(() => setSupported(searchSupported()), [])

  const clear = useCallback(() => {
    if (!searchSupported()) return
    CSS.highlights.delete(HIGHLIGHT)
    CSS.highlights.delete(ACTIVE)
    ranges.current = []
  }, [])

  const focusMatch = useCallback((index: number) => {
    const list = ranges.current
    if (!list.length || !searchSupported()) return
    const i = ((index % list.length) + list.length) % list.length
    CSS.highlights.set(ACTIVE, new Highlight(list[i]))
    list[i].startContainer.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" })
    setActive(i)
  }, [])

  const run = useCallback(
    (raw: string) => {
      if (!searchSupported()) return
      clear()
      const term = raw.trim().toLowerCase()
      if (term.length < MIN_LEN) {
        setCount(0)
        setActive(0)
        return
      }
      const main = document.querySelector("main")
      if (!main) return

      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          // Skip the navbar/search UI, non-content tags, and opted-out nodes.
          if (parent.closest("header, script, style, noscript, [data-search-ignore]")) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        },
      })

      const found: Range[] = []
      let node: Node | null
      while ((node = walker.nextNode())) {
        const text = node.nodeValue!.toLowerCase()
        let idx = text.indexOf(term)
        while (idx !== -1) {
          const range = new Range()
          range.setStart(node, idx)
          range.setEnd(node, idx + term.length)
          found.push(range)
          idx = text.indexOf(term, idx + term.length)
        }
      }

      ranges.current = found
      setCount(found.length)
      setActive(0)
      if (found.length) {
        CSS.highlights.set(HIGHLIGHT, new Highlight(...found))
        focusMatch(0)
      }
    },
    [clear, focusMatch],
  )

  // Debounced search on query change.
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => run(query), 120)
    return () => window.clearTimeout(id)
  }, [query, open, run])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    clear()
  }, [clear])

  // Global Cmd/Ctrl+K to open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Focus input when opened.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      close()
    } else if (e.key === "Enter") {
      e.preventDefault()
      focusMatch(active + (e.shiftKey ? -1 : 1))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      focusMatch(active + 1)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      focusMatch(active - 1)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Suchen"
        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex justify-center px-4 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className="h-fit w-full max-w-xl rounded-2xl border border-white/10 bg-[#1f1f1fee] p-2 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 px-2">
              <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Auf der Seite suchen…"
                className="h-11 w-full bg-transparent text-base outline-none placeholder:text-gray-500"
              />
              {query.trim().length >= MIN_LEN && (
                <span className="shrink-0 text-sm tabular-nums text-gray-400">
                  {count ? `${active + 1}/${count}` : "0"}
                </span>
              )}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => focusMatch(active - 1)}
                  disabled={!count}
                  aria-label="Vorheriger Treffer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 hover:bg-white/10 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => focusMatch(active + 1)}
                  disabled={!count}
                  aria-label="Nächster Treffer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 hover:bg-white/10 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Suche schließen"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 hover:bg-white/10"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {!supported ? (
              <p className="px-3 pb-2 pt-1 text-xs text-amber-400">
                Die Suche wird in diesem Browser nicht unterstützt.
              </p>
            ) : query.trim().length >= MIN_LEN && count === 0 ? (
              <p className="px-3 pb-2 pt-1 text-xs text-gray-400">Keine Treffer.</p>
            ) : (
              <p className="px-3 pb-2 pt-1 text-xs text-gray-500">
                ↑↓ navigieren · ↵ weiter · esc schließen
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export { SiteSearch }
