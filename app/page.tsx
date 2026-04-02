"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FloatingElements, BouncingBubbles } from "@/components/floating-elements"
import { DoctorCartoon, NurseCartoon, PatientCartoon, HeartbeatAnimation } from "@/components/cartoon-characters"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden relative">
      <FloatingElements theme="neutral" count={20} />
      <BouncingBubbles theme="neutral" />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg hover-grow">
              <span className="text-2xl text-primary-foreground font-bold">H</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Health-Buddy AI
            </span>
          </div>
          
          <div className="flex items-center gap-4 animate-slide-in-right">
            <Link href="/login">
              <Button variant="ghost" className="hover-grow font-medium">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover-lift font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-slide-in-up opacity-0 stagger-1">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Your Personal Health Companion
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Track Your Health
                </span>
                <br />
                <span className="text-foreground">Live Your Best Life</span>
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground animate-slide-in-up opacity-0 stagger-2 text-pretty">
              AI-powered health tracking with personalized insights, predictions, and fun gamification 
              to keep you motivated on your wellness journey!
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-in-up opacity-0 stagger-3">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl hover-lift text-lg px-8">
                  Start Free Today
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="hover-lift text-lg px-8">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4 animate-slide-in-up opacity-0 stagger-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-center gap-4 mb-6">
                <DoctorCartoon className="w-32 h-48 animate-wiggle hover-grow" />
                <NurseCartoon className="w-32 h-48 animate-wiggle hover-grow" style={{ animationDelay: "0.2s" }} />
              </div>
              <HeartbeatAnimation className="w-full h-16 text-emerald-500" />
              <div className="text-center mt-4">
                <p className="text-lg font-medium text-foreground">Your health team is ready!</p>
                <p className="text-muted-foreground">Let us help you achieve your goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-16 bg-gradient-to-b from-transparent to-emerald-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Health-Buddy?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience health tracking like never before with features designed just for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Personalized Themes",
                description: "Get a unique experience based on your preferences - fun gaming themes for men, beautiful aesthetic themes for women!",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🤖",
                title: "AI Predictions",
                description: "Smart algorithms analyze your data to predict health trends and provide actionable recommendations.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: "📊",
                title: "Complete Tracking",
                description: "Track steps, sleep, water, exercise, mood, and even pregnancy milestones all in one place!",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "🏆",
                title: "Gamification",
                description: "Earn points, unlock achievements, and compete with friends to stay motivated on your health journey.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: "💡",
                title: "Smart Insights",
                description: "Get daily tips, weekly reports, and personalized advice to improve your overall wellbeing.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: "🔒",
                title: "Private & Secure",
                description: "Your health data stays private with industry-leading security measures to protect your information.",
                color: "from-gray-500 to-gray-700"
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title} 
                className={`hover-lift animate-slide-in-up opacity-0 stagger-${index + 1} overflow-hidden group`}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Users Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Fitness Enthusiast",
                content: "The pink theme is absolutely gorgeous! I love tracking my health with such a beautiful app.",
                avatar: "female",
                rating: 5
              },
              {
                name: "John D.",
                role: "Gym Regular",
                content: "The gamification features keep me motivated. Competing with friends makes health tracking fun!",
                avatar: "male",
                rating: 5
              },
              {
                name: "Emily R.",
                role: "New Mom",
                content: "The pregnancy tracking feature was amazing! Now I use it to track my postpartum health.",
                avatar: "female",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={testimonial.name} className={`hover-lift animate-slide-in-up opacity-0 stagger-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <PatientCartoon 
                      gender={testimonial.avatar as "male" | "female"} 
                      className="w-16 h-20"
                    />
                    <div>
                      <div className="font-bold text-card-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.content}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 shadow-2xl animate-scale-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join thousands of happy users who have transformed their lives with Health-Buddy AI
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl hover-lift text-xl px-12 py-6">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold">H</span>
            </div>
            <span className="font-bold text-foreground">Health-Buddy AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Made with care for your health journey
          </p>
        </div>
      </footer>
    </div>
  )
}
