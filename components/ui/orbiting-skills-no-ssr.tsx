"use client"
import dynamic from "next/dynamic"

const OrbitingSkills = dynamic(() => import("./orbiting-skills"), { ssr: false })

export default OrbitingSkills
