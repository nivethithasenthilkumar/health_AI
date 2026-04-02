"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Bot, X, Send } from "lucide-react"

export function AIBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "Hi! I'm your Health-Buddy AI. How can I help you with your wellness journey today?" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process that right now. Please try again later." }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Network error occurred." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all z-50 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>

      <div className={`fixed bottom-6 right-6 w-80 md:w-96 transition-all duration-300 z-50 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}>
        <Card className="shadow-2xl border-emerald-200">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 flex flex-row items-center justify-between rounded-t-xl py-3 px-4">
            <CardTitle className="text-emerald-800 flex items-center gap-2 text-base">
              <Bot className="w-5 h-5" /> Health AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-emerald-600 hover:bg-emerald-200">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-white/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user" 
                      ? "bg-emerald-500 text-white rounded-br-none" 
                      : "bg-emerald-100 text-emerald-900 rounded-bl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-emerald-100 text-emerald-900 rounded-2xl rounded-bl-none px-4 py-2 text-sm max-w-[80%]">
                    Typing...
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-emerald-100 flex gap-2 rounded-b-xl">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your health..." 
                className="flex-1 focus-visible:ring-emerald-500"
              />
              <Button type="submit" disabled={isLoading} className="bg-emerald-500 hover:bg-emerald-600 px-3">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
