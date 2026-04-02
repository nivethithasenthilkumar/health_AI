"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PatientCartoon } from "@/components/cartoon-characters"

export default function ProfilePage() {
  const { user, updateUser, healthData } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age?.toString() || "",
    weight: user?.weight?.toString() || "",
    height: user?.height?.toString() || "",
  })
  const [saved, setSaved] = useState(false)
  
  if (!user) return null

  const isFemale = user.gender === "female"
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"
  const cardGlass = isFemale ? "glass-pink" : "glass-blue"

  const handleSave = () => {
    updateUser({
      name: formData.name,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    })
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Calculate BMI
  const bmi = user.weight && user.height 
    ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1)
    : "N/A"

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "bg-yellow-500" }
    if (bmiValue < 25) return { label: "Normal", color: "bg-green-500" }
    if (bmiValue < 30) return { label: "Overweight", color: "bg-orange-500" }
    return { label: "Obese", color: "bg-red-500" }
  }

  const bmiCategory = bmi !== "N/A" ? getBmiCategory(parseFloat(bmi)) : null

  // Stats
  const totalEntries = healthData.length
  const totalSteps = healthData.reduce((sum, d) => sum + d.steps, 0)
  const totalExercise = healthData.reduce((sum, d) => sum + d.exercise, 0)
  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${cardGlass} rounded-3xl p-6 shadow-xl animate-slide-in-up`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isFemale ? "Your Profile" : "Your Stats"} 
          <span className="inline-block animate-wiggle ml-2">{isFemale ? "👸" : "🧔"}</span>
        </h1>
        <p className="text-muted-foreground">
          {isFemale 
            ? "Manage your wellness profile and track your journey!" 
            : "View your stats and level up your profile!"}
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 animate-slide-in-up flex items-center gap-2">
          <span className="text-xl">✅</span>
          Profile updated successfully!
        </div>
      )}

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`lg:col-span-1 ${cardGlass} shadow-xl animate-slide-in-left`}>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <PatientCartoon 
                gender={user.gender} 
                className="w-32 h-48 mx-auto animate-wiggle"
              />
              <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center text-primary-foreground font-bold shadow-lg`}>
                {Math.floor(totalEntries * 10 / 500) + 1}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-card-foreground">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            
            <div className="flex justify-center gap-2 mt-4">
              <Badge className={`bg-gradient-to-r ${accentGradient} text-primary-foreground`}>
                {isFemale ? "Wellness Queen" : "Health Warrior"}
              </Badge>
              <Badge variant="outline">
                Level {Math.floor(totalEntries * 10 / 500) + 1}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Member since {memberSince}
            </p>
          </CardContent>
        </Card>

        {/* Stats & Edit */}
        <Card className={`lg:col-span-2 ${cardGlass} shadow-xl animate-slide-in-right`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <span className="text-2xl">📋</span>
                Personal Information
              </CardTitle>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => {
                  if (isEditing) {
                    setFormData({
                      name: user.name,
                      age: user.age.toString(),
                      weight: user.weight.toString(),
                      height: user.height.toString(),
                    })
                  }
                  setIsEditing(!isEditing)
                }}
                className={!isEditing ? `bg-gradient-to-r ${accentGradient}` : ""}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                ) : (
                  <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center text-card-foreground">
                    {user.name}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center text-muted-foreground">
                  {user.email}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="h-12"
                  />
                ) : (
                  <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center text-card-foreground">
                    {user.age} years old
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center gap-2 text-card-foreground">
                  <span>{isFemale ? "👩" : "🧔"}</span>
                  {isFemale ? "Female" : "Male"}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                {isEditing ? (
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="h-12"
                    step="0.1"
                  />
                ) : (
                  <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center text-card-foreground">
                    {user.weight} kg
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                {isEditing ? (
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="h-12"
                  />
                ) : (
                  <div className="h-12 px-4 rounded-lg bg-accent/30 flex items-center text-card-foreground">
                    {user.height} cm
                  </div>
                )}
              </div>
            </div>
            
            {isEditing && (
              <Button
                onClick={handleSave}
                className={`w-full mt-6 h-12 bg-gradient-to-r ${accentGradient} shadow-lg hover-lift`}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* BMI Card */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">⚖️</span>
            Body Mass Index (BMI)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-2xl`}>
              <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-card-foreground">{bmi}</div>
                  <div className="text-xs text-muted-foreground">BMI</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              {bmiCategory && (
                <div className="flex items-center gap-3">
                  <Badge className={`${bmiCategory.color} text-primary-foreground`}>
                    {bmiCategory.label}
                  </Badge>
                  <span className="text-muted-foreground">
                    Based on your height ({user.height}cm) and weight ({user.weight}kg)
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Underweight", range: "< 18.5", color: "bg-yellow-100 border-yellow-300" },
                  { label: "Normal", range: "18.5 - 24.9", color: "bg-green-100 border-green-300" },
                  { label: "Overweight", range: "25 - 29.9", color: "bg-orange-100 border-orange-300" },
                  { label: "Obese", range: "> 30", color: "bg-red-100 border-red-300" },
                ].map((cat) => (
                  <div key={cat.label} className={`p-2 rounded-lg border-2 ${cat.color} text-center`}>
                    <div className="font-medium text-card-foreground text-sm">{cat.label}</div>
                    <div className="text-xs text-muted-foreground">{cat.range}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Entries", value: totalEntries, icon: "📝" },
          { label: "Total Steps", value: totalSteps.toLocaleString(), icon: "👟" },
          { label: "Exercise Time", value: `${totalExercise} min`, icon: isFemale ? "🧘" : "🏋️" },
        ].map((stat, index) => (
          <Card 
            key={stat.label}
            className={`${cardGlass} hover-lift animate-slide-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6 text-center">
              <span className="text-4xl block mb-2">{stat.icon}</span>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">⚙️</span>
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Email Notifications", description: "Receive daily health reminders", icon: "📧", enabled: true },
              { label: "Push Notifications", description: "Get real-time health alerts", icon: "🔔", enabled: true },
              { label: "Weekly Reports", description: "Receive weekly progress summaries", icon: "📊", enabled: false },
              { label: "Dark Mode", description: "Switch to dark theme", icon: "🌙", enabled: false },
            ].map((setting) => (
              <div 
                key={setting.label}
                className="flex items-center justify-between p-4 rounded-xl bg-accent/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{setting.icon}</span>
                  <div>
                    <div className="font-medium text-card-foreground">{setting.label}</div>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                </div>
                <button
                  className={`w-12 h-6 rounded-full transition-colors ${
                    setting.enabled 
                      ? `bg-gradient-to-r ${accentGradient}` 
                      : "bg-muted"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    setting.enabled ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
