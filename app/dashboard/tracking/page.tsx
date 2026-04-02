"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function TrackingPage() {
  const { user, addHealthData, healthData } = useAuth()
  const [formData, setFormData] = useState({
    steps: "",
    calories: "",
    water: "",
    sleep: "",
    exercise: "",
    mood: "" as "great" | "good" | "okay" | "bad" | "",
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    pregnancyWeek: "",
    babyKicks: "",
  })
  const [saved, setSaved] = useState(false)

  if (!user) return null

  const isFemale = user.gender === "female"
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"
  const cardGlass = isFemale ? "glass-pink" : "glass-blue"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addHealthData({
      date: new Date().toISOString(),
      steps: parseInt(formData.steps) || 0,
      calories: parseInt(formData.calories) || 0,
      water: parseInt(formData.water) || 0,
      sleep: parseFloat(formData.sleep) || 0,
      exercise: parseInt(formData.exercise) || 0,
      mood: formData.mood || "okay",
      heartRate: parseInt(formData.heartRate) || undefined,
      bloodPressure: formData.bloodPressureSystolic && formData.bloodPressureDiastolic 
        ? { systolic: parseInt(formData.bloodPressureSystolic), diastolic: parseInt(formData.bloodPressureDiastolic) }
        : undefined,
      pregnancyWeek: parseInt(formData.pregnancyWeek) || undefined,
      babyKicks: parseInt(formData.babyKicks) || undefined,
    })
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    
    setFormData({
      steps: "",
      calories: "",
      water: "",
      sleep: "",
      exercise: "",
      mood: "",
      heartRate: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      pregnancyWeek: "",
      babyKicks: "",
    })
  }

  const todayData = healthData.filter(d => {
    const date = new Date(d.date)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  })

  const totalSteps = todayData.reduce((sum, d) => sum + d.steps, 0)
  const totalWater = todayData.reduce((sum, d) => sum + d.water, 0)
  const totalExercise = todayData.reduce((sum, d) => sum + d.exercise, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${cardGlass} rounded-3xl p-6 shadow-xl animate-slide-in-up`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isFemale ? "Daily Wellness Log" : "Daily Power Log"} 
          <span className="inline-block animate-wiggle ml-2">{isFemale ? "📝" : "💪"}</span>
        </h1>
        <p className="text-muted-foreground">
          {isFemale 
            ? "Track your self-care journey and stay radiant!" 
            : "Log your stats and level up your health game!"}
        </p>
      </div>

      {/* Today's Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Steps Today", value: totalSteps, goal: 10000, icon: "👟" },
          { label: "Water Glasses", value: totalWater, goal: 8, icon: "💧" },
          { label: "Exercise (min)", value: totalExercise, goal: 30, icon: isFemale ? "🧘" : "🏋️" },
        ].map((stat, index) => (
          <Card 
            key={stat.label}
            className={`hover-lift animate-slide-in-up ${cardGlass}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground mb-2">
                {stat.value} <span className="text-sm font-normal text-muted-foreground">/ {stat.goal}</span>
              </div>
              <Progress value={Math.min((stat.value / stat.goal) * 100, 100)} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tracking Form */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">{isFemale ? "✨" : "⚡"}</span>
            Log Your {isFemale ? "Wellness" : "Stats"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="steps" className="flex items-center gap-2">
                  👟 Steps
                </Label>
                <Input
                  id="steps"
                  type="number"
                  placeholder="e.g., 8000"
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calories" className="flex items-center gap-2">
                  🔥 Calories Burned
                </Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="water" className="flex items-center gap-2">
                  💧 Water (glasses)
                </Label>
                <Input
                  id="water"
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.water}
                  onChange={(e) => setFormData({ ...formData, water: e.target.value })}
                  className="h-12"
                  min="0"
                  max="20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sleep" className="flex items-center gap-2">
                  😴 Sleep (hours)
                </Label>
                <Input
                  id="sleep"
                  type="number"
                  placeholder="e.g., 7.5"
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                  className="h-12"
                  step="0.5"
                  min="0"
                  max="24"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exercise" className="flex items-center gap-2">
                  {isFemale ? "🧘" : "🏋️"} Exercise (minutes)
                </Label>
                <Input
                  id="exercise"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.exercise}
                  onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
                  className="h-12"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  😊 Mood
                </Label>
                <div className="flex gap-2">
                  {[
                    { value: "great", emoji: "😄" },
                    { value: "good", emoji: "😊" },
                    { value: "okay", emoji: "😐" },
                    { value: "bad", emoji: "😔" },
                  ].map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: mood.value as typeof formData.mood })}
                      className={`text-2xl p-2 rounded-xl border-2 transition-all hover-grow ${
                        formData.mood === mood.value 
                          ? `border-primary bg-primary/10` 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Vitals */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <span>❤️</span> Health Vitals (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="e.g., 72"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                    className="h-12"
                    min="40"
                    max="200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bpSystolic">Blood Pressure (Systolic)</Label>
                  <Input
                    id="bpSystolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.bloodPressureSystolic}
                    onChange={(e) => setFormData({ ...formData, bloodPressureSystolic: e.target.value })}
                    className="h-12"
                    min="70"
                    max="200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bpDiastolic">Blood Pressure (Diastolic)</Label>
                  <Input
                    id="bpDiastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={formData.bloodPressureDiastolic}
                    onChange={(e) => setFormData({ ...formData, bloodPressureDiastolic: e.target.value })}
                    className="h-12"
                    min="40"
                    max="130"
                  />
                </div>
              </div>
            </div>

            {/* Pregnancy Tracking (Female Only) */}
            {isFemale && (
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                  <span>🤰</span> Pregnancy Tracking (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pregnancyWeek">Pregnancy Week</Label>
                    <Input
                      id="pregnancyWeek"
                      type="number"
                      placeholder="e.g., 24"
                      value={formData.pregnancyWeek}
                      onChange={(e) => setFormData({ ...formData, pregnancyWeek: e.target.value })}
                      className="h-12"
                      min="1"
                      max="42"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="babyKicks">Baby Kicks Today</Label>
                    <Input
                      id="babyKicks"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.babyKicks}
                      onChange={(e) => setFormData({ ...formData, babyKicks: e.target.value })}
                      className="h-12"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              {saved && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 animate-slide-in-up flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  Data saved successfully! Keep up the great work!
                </div>
              )}
              <Button
                type="submit"
                className={`w-full h-14 text-lg bg-gradient-to-r ${accentGradient} hover-lift shadow-xl`}
              >
                {isFemale ? "Save My Wellness Log ✨" : "Log My Power Stats 💪"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {healthData.length > 0 && (
        <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">📊</span>
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthData.slice(-5).reverse().map((entry, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-accent/30 flex flex-wrap items-center gap-4 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-sm text-muted-foreground min-w-[100px]">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm">👟 {entry.steps} steps</span>
                    <span className="text-sm">💧 {entry.water} glasses</span>
                    <span className="text-sm">😴 {entry.sleep}h sleep</span>
                    <span className="text-sm">{isFemale ? "🧘" : "🏋️"} {entry.exercise}min</span>
                    <span className="text-sm">
                      {entry.mood === "great" ? "😄" : entry.mood === "good" ? "😊" : entry.mood === "okay" ? "😐" : "😔"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
