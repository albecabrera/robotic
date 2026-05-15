'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingButton } from "@/components/ui/glowing-button"

export function SplineSceneBasic() {
  return (
    <Card className="relative min-h-[520px] w-full overflow-hidden border border-white/10 bg-black/[0.96] shadow-2xl sm:min-h-[560px] lg:h-[500px] lg:min-h-0">
      <Spotlight size={300} />
      <div className="flex h-full flex-col lg:flex-row">
        <div className="relative z-10 flex flex-[3] flex-col justify-center p-6 sm:p-8 lg:pl-12 lg:pr-6">
          <p className="mb-4 w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-neutral-300">
            Elisabeth-Selbert-Gesamtschule Bonn · Informatik
          </p>
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
            Informatik an der ESG
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-300 sm:text-base">
            Hier findest du Unterrichtsmaterialien, Aufgaben, Projekte und Lernvideos für den Informatikunterricht bei Herrn Cabrera.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <GlowingButton href="#materialien" glowColor="#a3e635">
              Materialien ansehen
            </GlowingButton>
            <GlowingButton href="#projekte" glowColor="#22d3ee">
              Projekte entdecken
            </GlowingButton>
          </div>
        </div>
        <div className="relative flex-[2] min-h-[260px] lg:min-h-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  )
}
