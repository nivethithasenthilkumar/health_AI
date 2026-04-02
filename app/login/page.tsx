"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { FloatingElements, BouncingBubbles } from "@/components/floating-elements"
import { DoctorCartoon, NurseCartoon, HeartbeatAnimation } from "@/components/cartoon-characters"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    setIsLoading(true)
    
    const success = await login(email, password)
    
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden relative flex items-center justify-center p-6">
      <FloatingElements theme="neutral" count={15} />
      <BouncingBubbles theme="neutral" />
      
      {/* Back Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Characters */}
        <div className="hidden md:flex flex-col items-center justify-center animate-slide-in-left">
          <div className="flex gap-4 mb-8">
            <DoctorCartoon className="w-36 h-52 animate-wiggle hover-grow" />
            <NurseCartoon className="w-36 h-52 animate-wiggle hover-grow" style={{ animationDelay: "0.2s" }} />
          </div>
          <HeartbeatAnimation className="w-64 h-12 text-emerald-500 mb-6" />
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back!</h2>
            <p className="text-muted-foreground text-lg">We missed you! Let&apos;s continue your health journey.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="glass shadow-2xl animate-slide-in-right overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400" />
          
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 animate-slide-in-up opacity-0 stagger-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2 animate-slide-in-up opacity-0 stagger-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm animate-slide-in-up">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover-lift animate-slide-in-up opacity-0 stagger-3"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground text-sm mb-4">
                Quick demo accounts:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto py-3 flex flex-col items-center gap-1 hover-lift"
                  onClick={() => {
                    setEmail("john@demo.com")
                    setPassword("demo123")
                  }}
                >
                  <span className="text-2xl">🧔</span>
                  <span className="text-xs">Male Demo</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto py-3 flex flex-col items-center gap-1 hover-lift"
                  onClick={() => {
                    setEmail("sarah@demo.com")
                    setPassword("demo123")
                  }}
                >
                  <span className="text-2xl">👩</span>
                  <span className="text-xs">Female Demo</span>
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
