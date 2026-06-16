"use client"
import React, { useEffect, useState, memo } from 'react'
import scratchImg from '@/app/img/scratch.png'
import xlogoImg from '@/app/img/xlogo.png'
import tigerjythonImg from '@/app/img/TigerJython.jpg'
import cubiImg from '@/app/img/cubi.png'
import appInventorImg from '@/app/img/appinventor.jpeg'
import calliopeImg from '@/app/img/calliope.jpeg'

type IconType = 'scratch' | 'xlogo' | 'tigerjython' | 'html' | 'css' | 'python' | 'java' | 'cubi' | 'appinventor' | 'calliope'
type GlowColor = 'cyan' | 'purple' | 'orange'

interface SkillIconProps { type: IconType }
interface SkillConfig {
  id: string
  orbitRadius: number
  size: number
  speed: number
  iconType: IconType
  phaseShift: number
  glowColor: GlowColor
  label: string
}
interface OrbitingSkillProps { config: SkillConfig; angle: number }
interface GlowingOrbitPathProps { radius: number; glowColor?: GlowColor; animationDelay?: number }

const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  scratch: {
    color: '#FF7F00',
    component: () => (
      <img src={scratchImg.src} alt="Scratch" className="w-full h-full object-contain rounded-full" />
    ),
  },
  xlogo: {
    color: '#2ecc71',
    component: () => (
      <img src={xlogoImg.src} alt="XLogo" className="w-full h-full object-contain rounded-full" />
    ),
  },
  tigerjython: {
    color: '#F39C12',
    component: () => (
      <img src={tigerjythonImg.src} alt="TigerJython" className="w-full h-full object-contain rounded-full" />
    ),
  },
  cubi: {
    color: '#3B82F6',
    component: () => (
      <img src={cubiImg.src} alt="Cubi" className="w-full h-full object-contain rounded-full" />
    ),
  },
  appinventor: {
    color: '#22c55e',
    component: () => (
      <img src={appInventorImg.src} alt="App Inventor" className="w-full h-full object-contain rounded-full" />
    ),
  },
  calliope: {
    color: '#a855f7',
    component: () => (
      <img src={calliopeImg.src} alt="Calliope" className="w-full h-full object-contain rounded-full" />
    ),
  },
  html: {
    color: '#E34F26',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
  },
  css: {
    color: '#1572B6',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
  },
  python: {
    color: '#3776AB',
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.912S0 5.789 0 11.969c0 6.18 3.403 5.957 3.403 5.957h2.034v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.131V3.129S18.302 0 11.914 0zm-3.206 1.81a1.054 1.054 0 1 1-.001 2.107A1.054 1.054 0 0 1 8.708 1.81z" fill="#3776AB"/>
        <path d="M12.085 24c6.096 0 5.715-2.656 5.715-2.656l-.007-2.752h-5.814v-.826h8.109S24 18.211 24 12.031c0-6.18-3.403-5.957-3.403-5.957h-2.034v2.867s.109 3.402-3.35 3.402H9.444s-3.24-.052-3.24 3.131v5.396S5.698 24 12.085 24zm3.206-1.81a1.054 1.054 0 1 1 .001-2.107 1.054 1.054 0 0 1-.001 2.107z" fill="#FFD43B"/>
      </svg>
    ),
  },
  java: {
    color: '#ED8B00',
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.542 1.644-2.469 6.197-3.665 5.189-7.624M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" fill="#ED8B00"/>
      </svg>
    ),
  },
}

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component
  return IconComponent ? <IconComponent /> : null
})
SkillIcon.displayName = 'SkillIcon'

const skillsConfig: SkillConfig[] = [
  // Inner orbit — Blockprogrammierung
  { id: 'scratch',     orbitRadius: 100, size: 44, speed: 0.8,  iconType: 'scratch',     phaseShift: 0,                    glowColor: 'orange', label: 'Scratch' },
  { id: 'xlogo',       orbitRadius: 100, size: 44, speed: 0.8,  iconType: 'xlogo',       phaseShift: (2 * Math.PI) / 3,    glowColor: 'orange', label: 'XLogo' },
  { id: 'tigerjython', orbitRadius: 100, size: 44, speed: 0.8,  iconType: 'tigerjython', phaseShift: (4 * Math.PI) / 3,    glowColor: 'orange', label: 'Tigerjython' },
  // Middle orbit — WP tools
  { id: 'cubi',        orbitRadius: 145, size: 44, speed: -0.6, iconType: 'cubi',        phaseShift: 0,                    glowColor: 'purple', label: 'Cubi' },
  { id: 'appinventor', orbitRadius: 145, size: 44, speed: -0.6, iconType: 'appinventor', phaseShift: (2 * Math.PI) / 3,    glowColor: 'purple', label: 'App Inventor' },
  { id: 'calliope',    orbitRadius: 145, size: 44, speed: -0.6, iconType: 'calliope',    phaseShift: (4 * Math.PI) / 3,    glowColor: 'purple', label: 'Calliope' },
  // Outer orbit — Textbasiert
  { id: 'html',   orbitRadius: 185, size: 46, speed: -0.5, iconType: 'html',   phaseShift: 0,                    glowColor: 'cyan',   label: 'HTML5' },
  { id: 'css',    orbitRadius: 185, size: 46, speed: -0.5, iconType: 'css',    phaseShift: Math.PI / 2,          glowColor: 'cyan',   label: 'CSS3' },
  { id: 'python', orbitRadius: 185, size: 46, speed: -0.5, iconType: 'python', phaseShift: Math.PI,              glowColor: 'cyan',   label: 'Python' },
  { id: 'java',   orbitRadius: 185, size: 46, speed: -0.5, iconType: 'java',   phaseShift: (3 * Math.PI) / 2,   glowColor: 'cyan',   label: 'Java' },
]

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { orbitRadius, size, iconType, label } = config
  const x = Math.cos(angle) * orbitRadius
  const y = Math.sin(angle) * orbitRadius

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{ width: `${size}px`, height: `${size}px`, transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`, zIndex: isHovered ? 20 : 10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-1.5 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg'}`}
        style={{ boxShadow: isHovered ? `0 0 30px ${iconComponents[iconType]?.color}60, 0 0 60px ${iconComponents[iconType]?.color}30` : undefined }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none z-30">
            {label}
          </div>
        )}
      </div>
    </div>
  )
})
OrbitingSkill.displayName = 'OrbitingSkill'

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan:   { primary: 'rgba(6,182,212,0.4)',   secondary: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.3)' },
    purple: { primary: 'rgba(147,51,234,0.4)',  secondary: 'rgba(147,51,234,0.15)',  border: 'rgba(147,51,234,0.3)' },
    orange: { primary: 'rgba(249,115,22,0.4)',  secondary: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.3)' },
  }
  const colors = glowColors[glowColor]

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`, boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`, animation: 'pulse 4s ease-in-out infinite', animationDelay: `${animationDelay}s` }} />
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${colors.border}` }} />
    </div>
  )
})
GlowingOrbitPath.displayName = 'GlowingOrbitPath'

export default function OrbitingSkills() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    let id: number
    let last = performance.now()
    const animate = (now: number) => {
      setTime(t => t + (now - last) / 1000)
      last = now
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [isPaused])

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[480px] md:h-[480px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Orbit paths */}
        <GlowingOrbitPath radius={100} glowColor="orange" animationDelay={0} />
        <GlowingOrbitPath radius={145} glowColor="purple" animationDelay={0.75} />
        <GlowingOrbitPath radius={185} glowColor="cyan" animationDelay={1.5} />

        {/* Center icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#codeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        </div>

        {/* Skills */}
        {skillsConfig.map((config) => (
          <OrbitingSkill key={config.id} config={config} angle={time * config.speed + config.phaseShift} />
        ))}
      </div>
    </div>
  )
}
