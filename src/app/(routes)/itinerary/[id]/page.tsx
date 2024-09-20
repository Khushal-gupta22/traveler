// src/app/(routes)/itinerary/[id]/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ItineraryOverview from '@/app/_components/ItitneraryOverview'
import Timeline from '@/app/_components/Timeline'
import Accommodation from '@/app/_components/Accomodation'
import BudgetBreakdown from '@/app/_components/BudgetBreakDown'
import { ItineraryData } from '@/app/_lib/interfaces'

// interface Itinerary {
//   destination: string
//   travel_dates: { start_date: string; end_date: string }
//   travel_group: string
//   budget: string
//   itinerary: Array<{
//     day: number
//     date: string
//     activities: Array<{ time: string; activity: string; details: string }>
//   }>
//   accommodation: {
//     hotel_name: string
//     rating: string
//     location: string
//     amenities: string[]
//   }
//   budget_breakdown: {
//     accommodation: string
//     food: string
//     activities: string
//     total: string
//   }
// }

const ItineraryDetails: React.FC = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') // Get the itinerary ID from URL search params
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchItinerary = async () => {
        try {
          const response = await fetch('/api/get-saved-itineraries')
          if (response.ok) {
            const data = await response.json()
            const selectedItinerary = data[id as unknown as number] // Fetch itinerary by index
            setItinerary(selectedItinerary.itinerary)
          } else {
            throw new Error('Failed to fetch itinerary')
          }
        } catch (error) {
          console.error('Error fetching itinerary:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchItinerary()
    }
  }, [id])

  if (isLoading && !itinerary) {
    return <div>Loading itinerary...</div>
  }

  if (!itinerary) {
    return <div>Itinerary not found.</div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Your Personalized Travel Itinerary</h1>
      <ItineraryOverview
        destination={itinerary.destination}
        startDate={itinerary.travel_dates.start_date}
        endDate={itinerary.travel_dates.end_date}
        travelGroup={itinerary.travel_group}
        budget={itinerary.budget}
      />
      <Timeline itinerary={itinerary.itinerary} />
      <Accommodation
        hotel_name={itinerary.accommodation.hotel_name}
        rating={itinerary.accommodation.rating}
        location={itinerary.accommodation.location}
        amenities={itinerary.accommodation.amenities}
      />
      <BudgetBreakdown
        accommodation={itinerary.budget_breakdown.accommodation}
        food={itinerary.budget_breakdown.food}
        activities={itinerary.budget_breakdown.activities}
        total={itinerary.budget_breakdown.total}
      />
    </div>
  )
}

export default ItineraryDetails
