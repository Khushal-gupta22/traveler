import { create } from 'zustand'
import { ItineraryData } from '@/app/_lib/interfaces'

interface ItineraryState {
  itineraryData: ItineraryData | null
  isLoading: boolean
  setItineraryData: (data: ItineraryData) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useItineraryStore = create<ItineraryState>(set => ({
  itineraryData: null,
  isLoading: false,
  setItineraryData: data => set({ itineraryData: data }),
  setIsLoading: isLoading => set({ isLoading }),
}))
