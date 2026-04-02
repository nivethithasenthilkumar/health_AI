"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HeartbeatAnimation, RunningPerson } from "@/components/cartoon-characters"
import Link from "next/link"

export default function DashboardPage() {
  const { user, healthData, getPredictions, getLatestHealthData } = useAuth()
  
  if (!user) return null

  const isFemale = user.gender === "female"
  const latestData = getLatestHealthData()
  const predictions = getPredictions()
  
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"
  
  const cardGlass = isFemale ? "glass-pink" : "glass-blue"

  // Gender-specific content
  const maleActivities = [
    { icon: "🏋️", name: "Gym Session", points: 50, color: "bg-blue-500" },
    { icon: "🚴", name: "Cycling", points: 40, color: "bg-cyan-500" },
    { icon: "🏃", name: "Running", points: 35, color: "bg-sky-500" },
    { icon: "🏀", name: "Basketball", points: 45, color: "bg-indigo-500" },
  ]

  const femaleActivities = [
    { icon: "🧘", name: "Yoga", points: 40, color: "bg-pink-500" },
    { icon: "💃", name: "Dance", points: 35, color: "bg-rose-500" },
    { icon: "🏃‍♀️", name: "Jogging", points: 30, color: "bg-fuchsia-500" },
    { icon: "🥗", name: "Healthy Meal", points: 25, color: "bg-purple-400" },
  ]

  const activities = isFemale ? femaleActivities : maleActivities

  const maleQuickStats = [
    { label: "Power Level", value: predictions.healthScore, max: 100, icon: "⚡" },
    { label: "Strength XP", value: healthData.length * 10, max: 1000, icon: "💪" },
    { label: "Daily Streak", value: Math.min(healthData.length, 7), max: 7, icon: "🔥" },
  ]

  const femaleQuickStats = [
    { label: "Wellness Score", value: predictions.healthScore, max: 100, icon: "✨" },
    { label: "Self-Care Points", value: healthData.length * 10, max: 1000, icon: "💖" },
    { label: "Glow Streak", value: Math.min(healthData.length, 7), max: 7, icon: "🌟" },
  ]

  const quickStats = isFemale ? femaleQuickStats : maleQuickStats

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`${cardGlass} rounded-3xl p-6 shadow-xl animate-slide-in-up`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {isFemale ? "Hey Beautiful" : "Hey Champ"}, {user.name.split(" ")[0]}! 
              <span className="inline-block animate-wiggle ml-2">{isFemale ? "💕" : "💪"}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {isFemale 
                ? "Let's make today amazing! Your wellness journey continues..." 
                : "Ready to crush it today? Let's level up your health game!"}
            </p>
          </div>
          <div className="relative">
            {!isFemale && (
              <div className="absolute -top-4 left-0 right-0">
                <RunningPerson className="w-24 h-24 text-blue-500" />
              </div>
            )}
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-2xl animate-pulse-glow`}>
              <div className="text-center text-primary-foreground">
                <div className="text-3xl font-bold">{predictions.healthScore}</div>
                <div className="text-sm opacity-90">Health Score</div>
              </div>
            </div>
          </div>
        </div>
        <HeartbeatAnimation className={`w-full h-12 mt-4 ${isFemale ? "text-pink-500" : "text-blue-500"}`} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className={`hover-lift animate-slide-in-up opacity-0 ${cardGlass}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2">{stat.value}</div>
              <Progress 
                value={(stat.value / stat.max) * 100} 
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Goals */}
        <Card className={`hover-lift animate-slide-in-left ${cardGlass}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">{isFemale ? "🎯" : "🎮"}</span>
              {isFemale ? "Today's Goals" : "Daily Missions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Steps", current: latestData?.steps || 0, goal: 10000, icon: "👟" },
              { name: "Water", current: latestData?.water || 0, goal: 8, icon: "💧" },
              { name: "Exercise", current: latestData?.exercise || 0, goal: 30, icon: isFemale ? "🧘" : "🏋️" },
              { name: "Sleep", current: latestData?.sleep || 0, goal: 8, icon: "😴" },
            ].map((goal) => (
              <div key={goal.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{goal.icon}</span>
                    <span className="font-medium text-card-foreground">{goal.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.goal} {goal.name === "Water" ? "glasses" : goal.name === "Exercise" || goal.name === "Sleep" ? "hrs" : ""}
                  </span>
                </div>
                <Progress 
                  value={Math.min((goal.current / goal.goal) * 100, 100)} 
                  className="h-3"
                />
              </div>
            ))}
            <Link href="/dashboard/tracking">
              <button className={`w-full mt-4 py-3 rounded-xl bg-gradient-to-r ${accentGradient} text-primary-foreground font-medium shadow-lg hover-lift`}>
                {isFemale ? "Log Today's Progress" : "Complete Missions"}
              </button>
            </Link>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card className={`hover-lift animate-slide-in-right ${cardGlass}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">{isFemale ? "💅" : "🏆"}</span>
              {isFemale ? "Self-Care Activities" : "Power Activities"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {activities.map((activity, index) => (
                <button
                  key={activity.name}
                  className={`p-4 rounded-2xl border-2 border-border hover:border-primary transition-all hover-lift animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-3xl block mb-2">{activity.icon}</span>
                  <span className="font-medium text-card-foreground block">{activity.name}</span>
                  <Badge variant="secondary" className="mt-2">
                    +{activity.points} pts
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className={`hover-lift animate-slide-in-up ${cardGlass}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">🤖</span>
            AI Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predictions.recommendations.length > 0 ? (
              predictions.recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-accent/50 border border-border animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-primary-foreground flex-shrink-0`}>
                      💡
                    </div>
                    <p className="text-sm text-card-foreground">{rec}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <p className="text-lg">Start tracking your health data to get personalized recommendations!</p>
                <Link href="/dashboard/tracking">
                  <button className={`mt-4 px-6 py-3 rounded-xl bg-gradient-to-r ${accentGradient} text-primary-foreground font-medium shadow-lg hover-lift`}>
                    Start Tracking
                  </button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gender-Specific Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isFemale ? (
          <>
            {/* Pinterest-style inspiration */}
            <Card className={`hover-lift animate-slide-in-left ${cardGlass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <span className="text-2xl">🌸</span>
                  Daily Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Morning Routine", icon: "🌅", color: "bg-orange-100" },
                    { title: "Skincare Tips", icon: "✨", color: "bg-pink-100" },
                    { title: "Healthy Recipes", icon: "🥗", color: "bg-green-100" },
                    { title: "Meditation", icon: "🧘", color: "bg-purple-100" },
                  ].map((item, i) => (
                    <div 
                      key={item.title}
                      className={`${item.color} p-4 rounded-2xl text-center hover-lift cursor-pointer animate-scale-in`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <span className="text-3xl block mb-2">{item.icon}</span>
                      <span className="text-sm font-medium text-foreground">{item.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mood Tracker */}
            <Card className={`hover-lift animate-slide-in-right ${cardGlass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <span className="text-2xl">💭</span>
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  {["😊", "😌", "😐", "😔", "😢"].map((mood) => (
                    <button
                      key={mood}
                      className="text-4xl hover:scale-125 transition-transform p-2"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                <p className="text-center text-muted-foreground mt-4 text-sm">
                  Tap to log your mood
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Gamification - Leaderboard */}
            <Card className={`hover-lift animate-slide-in-left ${cardGlass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <span className="text-2xl">🏆</span>
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "You", points: healthData.length * 10 + 500, badge: "🥇" },
                    { rank: 2, name: "Mike", points: 480, badge: "🥈" },
                    { rank: 3, name: "Jake", points: 450, badge: "🥉" },
                    { rank: 4, name: "Chris", points: 420, badge: "4" },
                  ].map((player) => (
                    <div 
                      key={player.rank}
                      className={`flex items-center justify-between p-3 rounded-xl ${player.rank === 1 ? "bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300" : "bg-accent/30"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-8 text-center">{player.badge}</span>
                        <span className="font-medium text-card-foreground">{player.name}</span>
                      </div>
                      <span className="font-bold text-card-foreground">{player.points} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className={`hover-lift animate-slide-in-right ${cardGlass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <span className="text-2xl">🎯</span>
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "7-Day Warrior", progress: 70, reward: "🎖️ Gold Badge" },
                    { name: "10K Steps Boss", progress: 45, reward: "⚡ Power Boost" },
                    { name: "Hydration King", progress: 90, reward: "💎 Diamond Cup" },
                  ].map((challenge, i) => (
                    <div 
                      key={challenge.name}
                      className="p-3 rounded-xl bg-accent/30 animate-slide-in-up"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-card-foreground">{challenge.name}</span>
                        <Badge variant="outline">{challenge.reward}</Badge>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{challenge.progress}% complete</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
