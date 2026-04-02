"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FloatingElements } from "@/components/floating-elements"

import { AIBot } from "@/components/ai-bot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-emerald-300 rounded-full" />
          <div className="h-4 w-32 bg-emerald-200 rounded" />
        </div>
      </div>
    )
  }

  if (!user) return null

  const isFemale = user.gender === "female"
  const themeClass = isFemale ? "theme-female" : "theme-male"
  const bgGradient = isFemale 
    ? "from-pink-50 via-rose-50 to-fuchsia-50" 
    : "from-blue-50 via-cyan-50 to-sky-50"
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"

  const navItems = [
    { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard" },
    { id: "tracking", label: "Tracking", icon: "📊", href: "/dashboard/tracking" },
    { id: "predictions", label: "Predictions", icon: "🔮", href: "/dashboard/predictions" },
    { id: "achievements", label: "Achievements", icon: "🏆", href: "/dashboard/achievements" },
    { id: "profile", label: "Profile", icon: "👤", href: "/dashboard/profile" },
  ]

  return (
    <div className={`min-h-screen ${themeClass} bg-gradient-to-br ${bgGradient} overflow-hidden`}>
      <FloatingElements theme={user.gender} count={12} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${accentGradient} rounded-xl flex items-center justify-center shadow-lg hover-grow`}>
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">Health-Buddy</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover-grow ${
                  activeTab === item.id 
                    ? `bg-gradient-to-r ${accentGradient} text-primary-foreground shadow-md` 
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center text-primary-foreground font-medium`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="font-medium text-foreground hidden sm:block">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <nav className="md:hidden flex items-center justify-around px-2 py-2 border-t border-border/30">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                activeTab === item.id 
                  ? `bg-gradient-to-r ${accentGradient} text-primary-foreground shadow-md` 
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <AIBot />
    </div>
  )
}
