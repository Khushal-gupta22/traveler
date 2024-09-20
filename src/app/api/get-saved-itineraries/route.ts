import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'saved-itineraries.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const savedItineraries = JSON.parse(fileContents)

    return NextResponse.json(savedItineraries)
  } catch (error) {
    console.error('Error fetching saved itineraries:', error)
    return NextResponse.json({ message: 'Failed to fetch saved itineraries' }, { status: 500 })
  }
}
