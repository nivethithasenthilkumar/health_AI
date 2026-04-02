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
import { DoctorCartoon, NurseCartoon } from "@/components/cartoon-characters"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "" as "male" | "female" | "",
    age: "",
    weight: "",
    height: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { register, user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      setStep(2)
      return
    }

    if (!formData.gender || !formData.age || !formData.weight || !formData.height) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender as "male" | "female",
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height)
    })

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Email already exists. Please try a different email.")
      setIsLoading(false)
    }
  }

  const theme = formData.gender === "male" ? "male" : formData.gender === "female" ? "female" : "neutral"

  return (
    <div className={`min-h-screen ${
      formData.gender === "male" 
        ? "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 theme-male" 
        : formData.gender === "female" 
          ? "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 theme-female" 
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
    } overflow-hidden relative flex items-center justify-center p-6 transition-all duration-700`}>
      <FloatingElements theme={theme} count={15} />
      <BouncingBubbles theme={theme} />
      
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
            {formData.gender === "female" ? (
              <NurseCartoon className="w-40 h-60 animate-wiggle hover-grow" />
            ) : formData.gender === "male" ? (
              <DoctorCartoon className="w-40 h-60 animate-wiggle hover-grow" />
            ) : (
              <>
                <DoctorCartoon className="w-32 h-48 animate-wiggle hover-grow" />
                <NurseCartoon className="w-32 h-48 animate-wiggle hover-grow" style={{ animationDelay: "0.2s" }} />
              </>
            )}
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Join Health-Buddy!</h2>
            <p className="text-muted-foreground text-lg">Your personalized health journey awaits</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="glass shadow-2xl animate-slide-in-right overflow-hidden">
          <div className={`h-2 ${
            formData.gender === "male" 
              ? "bg-gradient-to-r from-blue-400 to-cyan-400" 
              : formData.gender === "female" 
                ? "bg-gradient-to-r from-pink-400 to-rose-400" 
                : "bg-gradient-to-r from-emerald-400 to-teal-400"
          }`} />
          
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">
              {step === 1 ? "Create Account" : "Tell Us About You"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1 ? "Enter your details to get started" : "Help us personalize your experience"}
            </CardDescription>
            
            {/* Progress Steps */}
            <div className="flex justify-center gap-2 pt-4">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2 animate-slide-in-up opacity-0 stagger-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-up opacity-0 stagger-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-up opacity-0 stagger-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-up opacity-0 stagger-4">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 animate-slide-in-up opacity-0 stagger-1">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "male" })}
                        className={`p-6 rounded-2xl border-2 transition-all hover-lift ${
                          formData.gender === "male"
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-border hover:border-blue-300"
                        }`}
                      >
                        <div className="text-4xl mb-2">🧔</div>
                        <div className="font-medium text-card-foreground">Male</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "female" })}
                        className={`p-6 rounded-2xl border-2 transition-all hover-lift ${
                          formData.gender === "female"
                            ? "border-pink-500 bg-pink-50 shadow-lg"
                            : "border-border hover:border-pink-300"
                        }`}
                      >
                        <div className="text-4xl mb-2">👩</div>
                        <div className="font-medium text-card-foreground">Female</div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-up opacity-0 stagger-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="h-12"
                      min="1"
                      max="120"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 animate-slide-in-up opacity-0 stagger-3">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="h-12"
                        step="0.1"
                        min="20"
                        max="300"
                      />
                    </div>
                    
                    <div className="space-y-2 animate-slide-in-up opacity-0 stagger-4">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="170"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="h-12"
                        min="50"
                        max="250"
                      />
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm animate-slide-in-up">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 h-12 ${
                    formData.gender === "male"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      : formData.gender === "female"
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  } shadow-lg hover-lift`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </span>
                  ) : step === 1 ? "Continue" : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
