"use client"
import dynamic from "next/dynamic"

const OrbitingSkills = dynamic(() => import("./orbiting-skills"), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] w-full animate-pulse rounded-2xl bg-muted/20" aria-hidden />
  ),
})

export default OrbitingSkills
