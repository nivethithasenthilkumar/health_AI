"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function AchievementsPage() {
  const { user, healthData } = useAuth()
  
  if (!user) return null

  const isFemale = user.gender === "female"
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"
  const cardGlass = isFemale ? "glass-pink" : "glass-blue"

  // Calculate achievements based on health data
  const totalEntries = healthData.length
  const totalSteps = healthData.reduce((sum, d) => sum + d.steps, 0)
  const totalWater = healthData.reduce((sum, d) => sum + d.water, 0)
  const totalExercise = healthData.reduce((sum, d) => sum + d.exercise, 0)

  const maleAchievements = [
    { 
      id: 1, 
      name: "First Steps", 
      description: "Log your first health entry", 
      icon: "🎮", 
      progress: Math.min(totalEntries, 1), 
      target: 1,
      unlocked: totalEntries >= 1,
      xp: 50
    },
    { 
      id: 2, 
      name: "7-Day Warrior", 
      description: "Track health for 7 days", 
      icon: "🏆", 
      progress: Math.min(totalEntries, 7), 
      target: 7,
      unlocked: totalEntries >= 7,
      xp: 200
    },
    { 
      id: 3, 
      name: "Step Master", 
      description: "Walk 50,000 total steps", 
      icon: "🚀", 
      progress: Math.min(totalSteps, 50000), 
      target: 50000,
      unlocked: totalSteps >= 50000,
      xp: 500
    },
    { 
      id: 4, 
      name: "Hydration King", 
      description: "Drink 50 glasses of water", 
      icon: "👑", 
      progress: Math.min(totalWater, 50), 
      target: 50,
      unlocked: totalWater >= 50,
      xp: 300
    },
    { 
      id: 5, 
      name: "Gym Beast", 
      description: "Exercise for 500 total minutes", 
      icon: "💪", 
      progress: Math.min(totalExercise, 500), 
      target: 500,
      unlocked: totalExercise >= 500,
      xp: 750
    },
    { 
      id: 6, 
      name: "Marathon Runner", 
      description: "Walk 100,000 total steps", 
      icon: "🏃", 
      progress: Math.min(totalSteps, 100000), 
      target: 100000,
      unlocked: totalSteps >= 100000,
      xp: 1000
    },
    { 
      id: 7, 
      name: "30-Day Legend", 
      description: "Track health for 30 days", 
      icon: "🎖️", 
      progress: Math.min(totalEntries, 30), 
      target: 30,
      unlocked: totalEntries >= 30,
      xp: 1500
    },
    { 
      id: 8, 
      name: "Iron Man", 
      description: "Exercise for 1000 total minutes", 
      icon: "🦾", 
      progress: Math.min(totalExercise, 1000), 
      target: 1000,
      unlocked: totalExercise >= 1000,
      xp: 2000
    },
  ]

  const femaleAchievements = [
    { 
      id: 1, 
      name: "Self-Care Start", 
      description: "Log your first wellness entry", 
      icon: "🌸", 
      progress: Math.min(totalEntries, 1), 
      target: 1,
      unlocked: totalEntries >= 1,
      xp: 50
    },
    { 
      id: 2, 
      name: "Glow Week", 
      description: "Track wellness for 7 days", 
      icon: "✨", 
      progress: Math.min(totalEntries, 7), 
      target: 7,
      unlocked: totalEntries >= 7,
      xp: 200
    },
    { 
      id: 3, 
      name: "Walking Beauty", 
      description: "Walk 50,000 total steps", 
      icon: "👠", 
      progress: Math.min(totalSteps, 50000), 
      target: 50000,
      unlocked: totalSteps >= 50000,
      xp: 500
    },
    { 
      id: 4, 
      name: "Hydration Queen", 
      description: "Drink 50 glasses of water", 
      icon: "👸", 
      progress: Math.min(totalWater, 50), 
      target: 50,
      unlocked: totalWater >= 50,
      xp: 300
    },
    { 
      id: 5, 
      name: "Yoga Goddess", 
      description: "Exercise for 500 total minutes", 
      icon: "🧘", 
      progress: Math.min(totalExercise, 500), 
      target: 500,
      unlocked: totalExercise >= 500,
      xp: 750
    },
    { 
      id: 6, 
      name: "Wellness Walker", 
      description: "Walk 100,000 total steps", 
      icon: "🦋", 
      progress: Math.min(totalSteps, 100000), 
      target: 100000,
      unlocked: totalSteps >= 100000,
      xp: 1000
    },
    { 
      id: 7, 
      name: "30-Day Glow Up", 
      description: "Track wellness for 30 days", 
      icon: "💎", 
      progress: Math.min(totalEntries, 30), 
      target: 30,
      unlocked: totalEntries >= 30,
      xp: 1500
    },
    { 
      id: 8, 
      name: "Wellness Warrior", 
      description: "Exercise for 1000 total minutes", 
      icon: "💖", 
      progress: Math.min(totalExercise, 1000), 
      target: 1000,
      unlocked: totalExercise >= 1000,
      xp: 2000
    },
  ]

  const achievements = isFemale ? femaleAchievements : maleAchievements

  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0)
  const unlockedCount = achievements.filter(a => a.unlocked).length

  // Level calculation
  const level = Math.floor(totalXP / 500) + 1
  const xpForNextLevel = (level * 500) - totalXP
  const xpProgress = ((totalXP % 500) / 500) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${cardGlass} rounded-3xl p-6 shadow-xl animate-slide-in-up`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isFemale ? "Your Achievements" : "Your Trophies"} 
          <span className="inline-block animate-wiggle ml-2">{isFemale ? "💎" : "🏆"}</span>
        </h1>
        <p className="text-muted-foreground">
          {isFemale 
            ? "Celebrate your wellness journey milestones!" 
            : "Track your gaming progress and unlock rewards!"}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`${cardGlass} hover-lift animate-slide-in-up`}>
          <CardContent className="p-6 text-center">
            <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-xl mb-4`}>
              <span className="text-3xl font-bold text-primary-foreground">{level}</span>
            </div>
            <h3 className="font-bold text-card-foreground text-lg">Level</h3>
            <Progress value={xpProgress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{xpForNextLevel} XP to next</p>
          </CardContent>
        </Card>

        <Card className={`${cardGlass} hover-lift animate-slide-in-up`} style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6 text-center">
            <span className="text-5xl block mb-2">{isFemale ? "✨" : "⚡"}</span>
            <div className="text-3xl font-bold text-card-foreground">{totalXP}</div>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </CardContent>
        </Card>

        <Card className={`${cardGlass} hover-lift animate-slide-in-up`} style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6 text-center">
            <span className="text-5xl block mb-2">{isFemale ? "🎀" : "🏅"}</span>
            <div className="text-3xl font-bold text-card-foreground">{unlockedCount}</div>
            <p className="text-sm text-muted-foreground">Unlocked</p>
          </CardContent>
        </Card>

        <Card className={`${cardGlass} hover-lift animate-slide-in-up`} style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6 text-center">
            <span className="text-5xl block mb-2">🔒</span>
            <div className="text-3xl font-bold text-card-foreground">{achievements.length - unlockedCount}</div>
            <p className="text-sm text-muted-foreground">To Unlock</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">{isFemale ? "🌟" : "🎮"}</span>
            All {isFemale ? "Badges" : "Achievements"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-2xl border-2 transition-all hover-lift animate-scale-in ${
                  achievement.unlocked 
                    ? `bg-gradient-to-br ${isFemale ? "from-pink-50 to-rose-50" : "from-blue-50 to-cyan-50"} border-primary shadow-lg` 
                    : "bg-muted/30 border-border opacity-70"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-center">
                  <div className={`text-5xl mb-3 ${achievement.unlocked ? "animate-wiggle" : "grayscale"}`}>
                    {achievement.icon}
                  </div>
                  <h4 className="font-bold text-card-foreground">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">{achievement.description}</p>
                  
                  <Progress 
                    value={(achievement.progress / achievement.target) * 100} 
                    className="h-2 mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
                    </span>
                    <Badge variant={achievement.unlocked ? "default" : "outline"}>
                      +{achievement.xp} XP
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">🎯</span>
            Daily {isFemale ? "Goals" : "Missions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                name: isFemale ? "Morning Glow" : "Early Bird", 
                task: "Log your morning stats",
                reward: "+25 XP",
                icon: "🌅",
                completed: totalEntries > 0
              },
              { 
                name: isFemale ? "Hydration Goal" : "Water Warrior", 
                task: "Drink 8 glasses of water",
                reward: "+30 XP",
                icon: "💧",
                completed: totalWater >= 8
              },
              { 
                name: isFemale ? "Active Beauty" : "Movement Master", 
                task: "Complete 30min exercise",
                reward: "+50 XP",
                icon: isFemale ? "🧘" : "🏋️",
                completed: totalExercise >= 30
              },
            ].map((challenge, index) => (
              <div
                key={challenge.name}
                className={`p-4 rounded-2xl border-2 animate-slide-in-up ${
                  challenge.completed 
                    ? "bg-green-50 border-green-300" 
                    : "bg-accent/30 border-border"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-3xl ${challenge.completed ? "" : "grayscale"}`}>
                    {challenge.completed ? "✅" : challenge.icon}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-card-foreground">{challenge.name}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.task}</p>
                    <Badge 
                      variant={challenge.completed ? "default" : "outline"} 
                      className="mt-2"
                    >
                      {challenge.reward}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Preview (Male) / Streak (Female) */}
      {isFemale ? (
        <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">🔥</span>
              Your Wellness Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2 py-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                    i < Math.min(totalEntries, 7)
                      ? "bg-gradient-to-br from-pink-500 to-rose-500 text-primary-foreground shadow-lg animate-scale-in"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"][i]}
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              {totalEntries > 0 
                ? `${Math.min(totalEntries, 7)} day streak! Keep glowing!` 
                : "Start your streak today!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">🏆</span>
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "You", xp: totalXP + 1000, badge: "🥇" },
                { rank: 2, name: "Alex", xp: 980, badge: "🥈" },
                { rank: 3, name: "Jordan", xp: 850, badge: "🥉" },
                { rank: 4, name: "Sam", xp: 720, badge: "4" },
                { rank: 5, name: "Taylor", xp: 650, badge: "5" },
              ].sort((a, b) => b.xp - a.xp).map((player, i) => (
                <div
                  key={player.name}
                  className={`flex items-center justify-between p-3 rounded-xl animate-slide-in-up ${
                    player.name === "You" 
                      ? "bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300" 
                      : "bg-accent/30"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </span>
                    <span className={`font-medium ${player.name === "You" ? "text-blue-600" : "text-card-foreground"}`}>
                      {player.name}
                    </span>
                  </div>
                  <span className="font-bold text-card-foreground">{player.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
