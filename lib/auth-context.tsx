"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  gender: "male" | "female"
  age: number
  weight: number
  height: number
  createdAt: string
}

export interface HealthData {
  id?: number
  userId: string
  date: string
  steps: number
  calories: number
  water: number
  sleep: number
  mood: "great" | "good" | "okay" | "bad"
  exercise: number
  heartRate?: number
  bloodPressure?: { systolic: number; diastolic: number }
  pregnancyWeek?: number
  babyKicks?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id" | "createdAt"> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
  healthData: HealthData[]
  addHealthData: (data: Omit<HealthData, "userId">) => Promise<void>
  getLatestHealthData: () => HealthData | null
  getPredictions: () => {
    healthScore: number
    riskLevel: "low" | "medium" | "high"
    recommendations: string[]
    trends: { metric: string; trend: "up" | "down" | "stable" }[]
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = "http://localhost:8080/api"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [predictions, setPredictions] = useState<any>({
    healthScore: 75,
    riskLevel: "medium",
    recommendations: [],
    trends: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const savedUser = localStorage.getItem("healthbuddy_user")
      if (savedUser) {
        const u = JSON.parse(savedUser)
        setUser(u)
        await fetchHealthData(u.id)
        await fetchPredictions(u.id)
      }
      setIsLoading(false)
    }
    init()
  }, [])

  const fetchHealthData = async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/health-data/${userId}`)
      if (res.ok) {
        setHealthData(await res.json())
      }
    } catch (e) {
      console.error(e)
    }
  }

  const fetchPredictions = async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/predictions/${userId}`)
      if (res.ok) {
        setPredictions(await res.json())
      }
    } catch (e) {
      console.error(e)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      if (res.ok) {
        const loggedInUser = await res.json()
        setUser(loggedInUser)
        localStorage.setItem("healthbuddy_user", JSON.stringify(loggedInUser))
        await fetchHealthData(loggedInUser.id)
        await fetchPredictions(loggedInUser.id)
        return true
      }
    } catch (e) {
      console.error(e)
    }
    return false
  }

  const register = async (userData: Omit<User, "id" | "createdAt"> & { password: string }): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })
      if (res.ok) {
        const newUser = await res.json()
        setUser(newUser)
        localStorage.setItem("healthbuddy_user", JSON.stringify(newUser))
        setHealthData([])
        return true
      }
    } catch (e) {
      console.error(e)
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setHealthData([])
    localStorage.removeItem("healthbuddy_user")
  }

  const updateUser = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      // Todo: Put mapping on backend, for now just update locally.
      localStorage.setItem("healthbuddy_user", JSON.stringify(updatedUser))
    }
  }

  const addHealthData = async (data: Omit<HealthData, "userId">) => {
    if (user) {
      const newData = { ...data, userId: user.id }
      try {
        const res = await fetch(`${API_URL}/health-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        })
        if (res.ok) {
          const savedData = await res.json()
          setHealthData(prev => [...prev, savedData])
          await fetchPredictions(user.id)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const getLatestHealthData = (): HealthData | null => {
    if (healthData.length === 0) return null
    return [...healthData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  }

  const getPredictions = () => predictions

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      healthData,
      addHealthData,
      getLatestHealthData,
      getPredictions
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
