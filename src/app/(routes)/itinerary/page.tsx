'use client'
import React, { useEffect, useState } from 'react'
import Timeline from '../../_components/Timeline'
import ItineraryOverview from '../../_components/ItitneraryOverview'
import Accommodation from '../../_components/Accomodation'
import BudgetBreakdown from '../../_components/BudgetBreakDown'
import { itineraryData } from '@/app/_lib/sampleData'
import { useItineraryStore } from '@/store/itinerary-store'
import { useRouter } from 'next/navigation'
import LoginModal from '@/app/_components/LoginModal'
import Link from 'next/link'

const ItineraryPage: React.FC = () => {
  const router = useRouter()
  const itineraryDataGlobal = useItineraryStore(state => state.itineraryData)
  const [isSaving, setIsSaving] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSavedButton, setShowSavedButton] = useState(false)

  let dataToBePassed

  if (!itineraryDataGlobal) {
    dataToBePassed = itineraryData
  } else {
    dataToBePassed = itineraryDataGlobal
  }

  useEffect(() => {
    if (!itineraryDataGlobal) {
      try {
        router.push('/')
      } catch (error) {
        console.error('Navigation failed:', error)
      }
    }
  }, [itineraryDataGlobal, router])

  const handleSaveItinerary = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/save-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itinerary: itineraryDataGlobal }),
      })

      if (response.ok) {
        alert('Itinerary saved successfully!')
        setShowSavedButton(true)
      } else {
        throw new Error('Failed to save itinerary')
      }
    } catch (error) {
      console.error('Error saving itinerary:', error)
      alert('Failed to save itinerary. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    handleSaveItinerary()
  }

  if (!itineraryDataGlobal) {
    return null
  }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-8 p-6">
        <h1 className="mb-8 text-center text-3xl font-bold">Your Personalized Travel Itinerary</h1>
        <ItineraryOverview
          destination={dataToBePassed?.destination}
          startDate={dataToBePassed?.travel_dates.start_date}
          endDate={dataToBePassed?.travel_dates.end_date}
          travelGroup={dataToBePassed?.travel_group}
          budget={dataToBePassed?.budget}
        />
        <Timeline itinerary={dataToBePassed?.itinerary} />
        <Accommodation
          hotel_name={dataToBePassed?.accommodation.hotel_name}
          rating={dataToBePassed?.accommodation.rating}
          location={dataToBePassed?.accommodation.location}
          amenities={dataToBePassed?.accommodation.amenities}
        />
        <BudgetBreakdown
          accommodation={dataToBePassed?.budget_breakdown.accommodation}
          food={dataToBePassed?.budget_breakdown.food}
          activities={dataToBePassed?.budget_breakdown.activities}
          total={dataToBePassed?.budget_breakdown.total}
        />
      </div>
      <div className="flex justify-center gap-8 py-8">
        <button
          onClick={handleSaveItinerary}
          disabled={isSaving}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSaving ? 'Saving...' : 'Save Itinerary'}
        </button>
        {showSavedButton && (
          <div className="mt-4 flex justify-center">
            <Link
              href="/saved-itineraries"
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              View Saved Itineraries
            </Link>
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default ItineraryPage
