import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '@/env.js'

const apiKey = env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const chat = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    })

    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error('Error generating itinerary:', error)
    return NextResponse.json({ message: 'Error generating itinerary' }, { status: 500 })
  }
}
