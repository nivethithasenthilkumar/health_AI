import { NextResponse } from "next/server"

// A simple rule-based mock AI for answering health questions.
// In a production app, you would replace this with an @ai-sdk call to OpenAI or Gemini.
export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const msgLower = message.toLowerCase()
    
    let reply = "That's a great question about your health. Could you provide a bit more detail?"

    if (msgLower.includes("water") || msgLower.includes("drink")) {
      reply = "Staying hydrated is crucial! Try to aim for at least 8 glasses (about 2 liters) of water a day depending on your activity level."
    } else if (msgLower.includes("sleep")) {
      reply = "Good sleep is the foundation of health. Ensure you're getting 7-8 hours of quality sleep by maintaining a consistent schedule and limiting screens before bed."
    } else if (msgLower.includes("exercise") || msgLower.includes("workout")) {
      reply = "Consistent exercise boosts both physical and mental health. Aim for 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week."
    } else if (msgLower.includes("diet") || msgLower.includes("food") || msgLower.includes("eat")) {
      reply = "A balanced diet rich in vegetables, lean proteins, and whole grains is key. Avoid highly processed foods when possible."
    } else if (msgLower.includes("stress") || msgLower.includes("anx")) {
      reply = "Managing stress is very important. Consider incorporating meditation, deep breathing exercises, or a short walk into your daily routine."
    } else if (msgLower.includes("hello") || msgLower.includes("hi")) {
      reply = "Hello there! How can I support your health journey today?"
    }

    // Simulate network delay for realistic bot feel
    await new Promise(resolve => setTimeout(resolve, 800))

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
