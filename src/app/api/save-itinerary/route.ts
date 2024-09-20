import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Dummy user data
const DUMMY_USER = {
  id: '12345',
  username: 'dummyuser',
  email: 'dummy@example.com',
}

export async function POST(request: Request) {
  try {
    const { itinerary } = await request.json()

    // In a real application, we would validate the user session here
    // For this demo, we'll always use the dummy user

    // object that includes the user ID and the itinerary
    const dataToSave = {
      userId: DUMMY_USER.id,
      itinerary,
      savedAt: new Date().toISOString(),
    }

    const filePath = path.join(process.cwd(), 'data', 'saved-itineraries.json')

    let existingData = []
    try {
      const fileContents = await fs.readFile(filePath, 'utf8')
      existingData = JSON.parse(fileContents)
    } catch (error) {
      console.log('No existing data found, starting with empty array')
    }

    // Add the new itinerary to the existing data
    existingData.push(dataToSave)

    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2))

    return NextResponse.json({ message: 'Itinerary saved successfully' })
  } catch (error) {
    console.error('Error saving itinerary:', error)
    return NextResponse.json({ message: 'Failed to save itinerary' }, { status: 500 })
  }
}
