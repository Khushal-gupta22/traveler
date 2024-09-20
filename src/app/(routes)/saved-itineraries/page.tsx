'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SavedItinerary {
  userId: string
  itinerary: any // Adjust this to match your itinerary type
  savedAt: string
}

const SavedItinerariesPage: React.FC = () => {
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn')
      setIsLoggedIn(Boolean(loggedIn))
    }

    const fetchSavedItineraries = async () => {
      try {
        const response = await fetch('/api/get-saved-itineraries')
        if (response.ok) {
          const data = await response.json()
          setSavedItineraries(
            data.filter((itinerary: SavedItinerary) => itinerary.userId === '12345')
          ) // Dummy user ID
        } else {
          throw new Error('Failed to fetch saved itineraries')
        }
      } catch (error) {
        console.error('Error fetching saved itineraries:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkLoginStatus()
    if (isLoggedIn) {
      fetchSavedItineraries()
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn])

  if (isLoading) {
    return <div>Loading saved itineraries...</div>
  }

  if (!isLoggedIn) {
    return <div>Please log in to view your saved itineraries.</div>
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Saved Itineraries</h1>
      {savedItineraries.length === 0 ? (
        <p>No saved itineraries found.</p>
      ) : (
        <ul>
          {savedItineraries.map((item, index) => (
            <li key={index} className="mb-4 rounded border p-4">
              <h2 className="text-xl font-semibold">Itinerary for {item.itinerary.destination}</h2>
              <p>Saved on: {new Date(item.savedAt).toLocaleString()}</p>
              <Link href={`/itinerary?id=${index}`} className="text-blue-500 hover:underline">
                View Itinerary
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedItinerariesPage
