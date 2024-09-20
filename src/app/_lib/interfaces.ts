// Interfaces for itinerary data
interface TravelDates {
  start_date: string
  end_date: string
}

interface Activity {
  time: string
  activity: string
  details: string
}

interface DayItinerary {
  day: number
  date: string
  activities: Activity[]
}

interface AccommodationProps {
  hotel_name: string
  rating: string
  location: string
  amenities: string[]
}

interface BudgetBreakdownProps {
  accommodation: string
  food: string
  activities: string
  total: string
}

interface ItineraryOverviewProps {
  destination: string
  startDate: string
  endDate: string
  travelGroup: string
  budget: string
}

interface ItineraryData {
  destination: string
  travel_dates: TravelDates
  budget: string
  travel_group: string
  itinerary: DayItinerary[]
  accommodation: AccommodationProps
  budget_breakdown: BudgetBreakdownProps
}

export type {
  ItineraryData,
  AccommodationProps,
  Activity,
  DayItinerary,
  TravelDates,
  BudgetBreakdownProps,
  ItineraryOverviewProps,
}
