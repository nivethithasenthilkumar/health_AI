"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PredictionsPage() {
  const { user, healthData, getPredictions } = useAuth()
  
  if (!user) return null

  const isFemale = user.gender === "female"
  const predictions = getPredictions()
  
  const accentGradient = isFemale
    ? "from-pink-500 to-rose-500"
    : "from-blue-500 to-cyan-500"
  const cardGlass = isFemale ? "glass-pink" : "glass-blue"

  // Calculate averages from health data
  const recentData = healthData.slice(-7)
  const avgSteps = recentData.length > 0 
    ? Math.round(recentData.reduce((sum, d) => sum + d.steps, 0) / recentData.length) 
    : 0
  const avgSleep = recentData.length > 0 
    ? (recentData.reduce((sum, d) => sum + d.sleep, 0) / recentData.length).toFixed(1) 
    : "0"
  const avgWater = recentData.length > 0 
    ? Math.round(recentData.reduce((sum, d) => sum + d.water, 0) / recentData.length) 
    : 0
  const avgExercise = recentData.length > 0 
    ? Math.round(recentData.reduce((sum, d) => sum + d.exercise, 0) / recentData.length) 
    : 0

  // Risk assessment
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-500"
      case "medium": return "bg-yellow-500"
      case "high": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  // Weekly trend data
  const weeklyData = recentData.map((d, i) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(d.date).getDay()],
    steps: d.steps,
    sleep: d.sleep,
    water: d.water,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${cardGlass} rounded-3xl p-6 shadow-xl animate-slide-in-up`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isFemale ? "Your Wellness Predictions" : "Your Health Analytics"} 
          <span className="inline-block animate-wiggle ml-2">🔮</span>
        </h1>
        <p className="text-muted-foreground">
          {isFemale 
            ? "AI-powered insights to help you glow from within!" 
            : "Data-driven predictions to optimize your performance!"}
        </p>
      </div>

      {/* Main Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`lg:col-span-2 ${cardGlass} shadow-xl animate-slide-in-left`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">{isFemale ? "✨" : "⚡"}</span>
              Overall Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-2xl animate-pulse-glow`}>
                  <div className="w-40 h-40 rounded-full bg-card flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-card-foreground">{predictions.healthScore}</div>
                      <div className="text-muted-foreground">out of 100</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge className={`${getRiskColor(predictions.riskLevel)} text-primary-foreground`}>
                      {predictions.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress 
                    value={predictions.riskLevel === "low" ? 20 : predictions.riskLevel === "medium" ? 50 : 80} 
                    className="h-3"
                  />
                </div>
                <div className="p-4 rounded-xl bg-accent/30">
                  <p className="text-sm text-card-foreground">
                    {predictions.healthScore >= 80 
                      ? isFemale 
                        ? "You're absolutely glowing! Keep up the amazing self-care routine! 💖" 
                        : "You're crushing it! Keep up the beast mode! 💪"
                      : predictions.healthScore >= 60 
                        ? isFemale
                          ? "You're doing great! A few tweaks and you'll be radiant! ✨"
                          : "Good progress! A few improvements and you'll be unstoppable! 🔥"
                        : isFemale
                          ? "Let's focus on your wellness, beautiful! Small steps lead to big transformations! 🌸"
                          : "Time to level up, champ! Let's get those numbers up! 🎯"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trends */}
        <Card className={`${cardGlass} shadow-xl animate-slide-in-right`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">📈</span>
              Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.trends.length > 0 ? (
              predictions.trends.map((trend, index) => (
                <div 
                  key={trend.metric}
                  className="flex items-center justify-between p-3 rounded-xl bg-accent/30 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="font-medium text-card-foreground">{trend.metric}</span>
                  <span className={`text-2xl ${
                    trend.trend === "up" ? "text-green-500" : trend.trend === "down" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {trend.trend === "up" ? "📈" : trend.trend === "down" ? "📉" : "➡️"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Track more data to see trends!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Averages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg Steps", value: avgSteps.toLocaleString(), icon: "👟", target: 10000 },
          { label: "Avg Sleep", value: `${avgSleep}h`, icon: "😴", target: 8 },
          { label: "Avg Water", value: `${avgWater} glasses`, icon: "💧", target: 8 },
          { label: "Avg Exercise", value: `${avgExercise}min`, icon: isFemale ? "🧘" : "🏋️", target: 30 },
        ].map((stat, index) => (
          <Card 
            key={stat.label}
            className={`hover-lift animate-slide-in-up ${cardGlass}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4 text-center">
              <span className="text-3xl block mb-2">{stat.icon}</span>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">🤖</span>
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {predictions.recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-accent/50 border border-border animate-slide-in-up flex items-start gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-primary-foreground flex-shrink-0`}>
                    💡
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{rec}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isFemale ? "Take small steps daily for lasting change" : "Consistency is key to results"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">📊</span>
              <h3 className="text-xl font-bold text-card-foreground mb-2">No Data Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start tracking your health data to get personalized AI recommendations!
              </p>
              <Link href="/dashboard/tracking">
                <button className={`px-8 py-3 rounded-xl bg-gradient-to-r ${accentGradient} text-primary-foreground font-medium shadow-lg hover-lift`}>
                  Start Tracking Now
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${cardGlass} shadow-xl animate-slide-in-left`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">🎯</span>
              {isFemale ? "Wellness Goals" : "Performance Goals"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                name: isFemale ? "Glow Score" : "Power Level", 
                current: predictions.healthScore, 
                target: 90,
                icon: isFemale ? "✨" : "⚡"
              },
              { 
                name: "Daily Steps", 
                current: avgSteps, 
                target: 10000,
                icon: "👟"
              },
              { 
                name: isFemale ? "Beauty Sleep" : "Recovery Sleep", 
                current: parseFloat(avgSleep), 
                target: 8,
                icon: "😴"
              },
              { 
                name: "Hydration", 
                current: avgWater, 
                target: 8,
                icon: "💧"
              },
            ].map((goal, index) => (
              <div 
                key={goal.name}
                className="space-y-2 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-card-foreground">
                    <span>{goal.icon}</span>
                    {goal.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {typeof goal.current === "number" ? goal.current.toLocaleString() : goal.current} / {goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={Math.min((goal.current / goal.target) * 100, 100)} 
                  className="h-3"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={`${cardGlass} shadow-xl animate-slide-in-right`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <span className="text-2xl">📅</span>
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyData.length > 0 ? (
              <div className="space-y-3">
                {weeklyData.slice(-5).map((day, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-accent/30 animate-slide-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="font-medium text-card-foreground w-12">{day.day}</span>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>👟 {day.steps.toLocaleString()}</span>
                      <span>😴 {day.sleep}h</span>
                      <span>💧 {day.water}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No data for this week yet.</p>
                <p className="text-sm mt-2">Start tracking to see your weekly progress!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Future Predictions */}
      <Card className={`${cardGlass} shadow-xl animate-slide-in-up`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <span className="text-2xl">🔮</span>
            {isFemale ? "Your Wellness Forecast" : "Your Performance Forecast"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                period: "Next Week", 
                prediction: predictions.healthScore >= 70 
                  ? isFemale ? "Radiant glow expected!" : "Strong performance ahead!"
                  : isFemale ? "Focus on self-care" : "Time to push harder",
                icon: "📆",
                score: Math.min(predictions.healthScore + 5, 100)
              },
              { 
                period: "Next Month", 
                prediction: predictions.healthScore >= 70 
                  ? isFemale ? "Your best month yet!" : "Peak performance month!"
                  : isFemale ? "Steady improvement possible" : "Great gains possible",
                icon: "🗓️",
                score: Math.min(predictions.healthScore + 10, 100)
              },
              { 
                period: "3 Months", 
                prediction: predictions.healthScore >= 70 
                  ? isFemale ? "Transformation complete!" : "Beast mode achieved!"
                  : isFemale ? "Beautiful transformation" : "Major level up",
                icon: "🎯",
                score: Math.min(predictions.healthScore + 15, 100)
              },
            ].map((forecast, index) => (
              <div 
                key={forecast.period}
                className="p-6 rounded-2xl bg-accent/50 border border-border text-center animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-4xl block mb-3">{forecast.icon}</span>
                <h4 className="font-bold text-card-foreground text-lg mb-1">{forecast.period}</h4>
                <div className={`text-3xl font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent mb-2`}>
                  {forecast.score}
                </div>
                <p className="text-sm text-muted-foreground">{forecast.prediction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
