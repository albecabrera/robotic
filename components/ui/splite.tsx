'use client'

import { Suspense, lazy, Component, type ReactNode, useState, useEffect } from 'react'

const splineModule = import('@splinetool/react-spline')
const Spline = lazy(() => splineModule)

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

interface ErrorBoundaryState { hasError: boolean }

class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

const Fallback = () => (
  <div className="flex h-full min-h-[220px] w-full items-center justify-center">
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-cyan-500/10 blur-2xl" />
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="url(#heroGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 opacity-40">
        <defs>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="m9 8 3 3 3-3" />
      </svg>
    </div>
  </div>
)

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglOk(detectWebGL())
  }, [])

  if (webglOk === null) return (
    <div className="flex h-full min-h-[220px] w-full items-center justify-center">
      <span className="text-sm text-muted-foreground">3D-Szene wird geladen...</span>
    </div>
  )

  if (!webglOk) return <Fallback />

  return (
    <SplineErrorBoundary fallback={<Fallback />}>
      <Suspense
        fallback={
          <div className="flex h-full min-h-[220px] w-full items-center justify-center">
            <span className="text-sm text-muted-foreground">3D-Szene wird geladen...</span>
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
