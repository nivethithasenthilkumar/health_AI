"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  emoji: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const maleEmojis = ["🏋️", "🚗", "🏎️", "🚀", "⚽", "🏀", "🎮", "💪", "🏃", "🚴", "🏆", "🎯", "🔥", "⚡"]
const femaleEmojis = ["🌸", "💖", "🦋", "🌺", "✨", "💅", "🎀", "🌷", "💐", "🍰", "🧁", "💝", "🌹", "🦄"]
const neutralEmojis = ["❤️", "🏥", "💊", "🩺", "🍎", "🥗", "💧", "😊", "🌟", "✨", "💪", "🧘", "🏃", "💚"]

export function FloatingElements({ 
  theme = "neutral",
  count = 15 
}: { 
  theme?: "male" | "female" | "neutral"
  count?: number 
}) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const emojis = theme === "male" ? maleEmojis : theme === "female" ? femaleEmojis : neutralEmojis
    
    const newElements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10
    }))
    
    setElements(newElements)
  }, [theme, count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float opacity-30"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  )
}

export function MovingGradient({ theme = "neutral" }: { theme?: "male" | "female" | "neutral" }) {
  const gradients = {
    male: "from-blue-400/20 via-cyan-300/20 to-blue-500/20",
    female: "from-pink-400/20 via-rose-300/20 to-pink-500/20",
    neutral: "from-emerald-400/20 via-teal-300/20 to-emerald-500/20"
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradients[theme]} animate-gradient-shift`}
      />
      <div 
        className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial ${gradients[theme]} animate-slow-spin opacity-50`}
      />
    </div>
  )
}

export function BouncingBubbles({ theme = "neutral" }: { theme?: "male" | "female" | "neutral" }) {
  const colors = {
    male: ["bg-blue-400", "bg-cyan-400", "bg-sky-400", "bg-indigo-400"],
    female: ["bg-pink-400", "bg-rose-400", "bg-fuchsia-400", "bg-purple-300"],
    neutral: ["bg-emerald-400", "bg-teal-400", "bg-green-400", "bg-cyan-400"]
  }

  const [bubbles, setBubbles] = useState<{ id: number; color: string; size: number; x: number; delay: number }[]>([])

  useEffect(() => {
    const themeColors = colors[theme]
    setBubbles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        size: 50 + Math.random() * 100,
        x: Math.random() * 100,
        delay: Math.random() * 5
      }))
    )
  }, [theme])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute rounded-full ${bubble.color} opacity-20 animate-bounce-slow`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            bottom: "-100px",
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  )
}
