'use client'
import { CalendarDate } from '@nextui-org/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import LoadingPage from '../(routes)/loading/page'
import { AI_PROMPT } from '../_lib/constants'
import { createChatSession } from '../_lib/options'
import { itineraryData } from '../_lib/sampleData'
import { useItineraryStore } from '@/store/itinerary-store'

interface GenerateButtonProps {
  destination: string
  startDate: string
  endDate: string
  budget: string
  groupSize: string
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  destination,
  startDate,
  endDate,
  budget,
  groupSize,
}) => {
  const router = useRouter()

  const setItineraryData = useItineraryStore(state => state.setItineraryData)
  const setIsLoading = useItineraryStore(state => state.setIsLoading)

  const handleGenerate = async () => {
    router.push('/loading')
    // TODO: Implement itinerary generation logic
    console.log('Generating itinerary...')
    setIsLoading(true)

    try {
      const FINAL_PROMPT = AI_PROMPT.replace('{destination}', destination)
        .replace('{startDate}', startDate)
        .replace('{endDate}', endDate)
        .replace('{budget}', budget)
        .replace('{travelGroup}', groupSize)

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: FINAL_PROMPT }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate itinerary')
      }

      const data = await response.json()
      console.log(data.result)

      // Parse the JSON string in data.result
      const parsedData = JSON.parse(data.result)

      // Set the itinerary data in the global store
      setItineraryData(parsedData)

      router.push('/itinerary')

      // Handle the response here (e.g., parse JSON, update state, navigate to results page)
    } catch (error) {
      console.error('Error generating itinerary:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <button
        onClick={handleGenerate}
        className={`w-full rounded bg-green-500 p-3 text-white transition-colors hover:bg-green-600`}
      >
        Generate Itinerary
      </button>
    </div>
  )
}

export default GenerateButton
