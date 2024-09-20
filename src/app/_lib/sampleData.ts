import { ItineraryData } from './interfaces'

export const itineraryData: ItineraryData = {
  destination: 'Paris, France',
  travel_dates: {
    start_date: '2024-05-01',
    end_date: '2024-05-07',
  },
  budget: 'moderate',
  travel_group: 'couple',
  itinerary: [
    {
      day: 1,
      date: '2024-05-01',
      activities: [
        {
          time: '10:00 AM',
          activity: 'Arrive at Paris Charles de Gaulle Airport',
          details: 'Check into your hotel, freshen up, and have a relaxing morning.',
        },
        {
          time: '12:00 PM',
          activity: 'Lunch at a Local Bistro',
          details: 'Enjoy traditional French cuisine at a cozy bistro near the hotel.',
        },
        {
          time: '2:00 PM',
          activity: 'Visit Eiffel Tower',
          details: 'Spend the afternoon exploring the Eiffel Tower and taking in panoramic views.',
        },
        {
          time: '6:00 PM',
          activity: 'Dinner at Le Jules Verne',
          details: 'Dine at a Michelin-star restaurant located inside the Eiffel Tower.',
        },
        {
          time: '8:00 PM',
          activity: 'Evening Seine River Cruise',
          details: 'Enjoy a romantic cruise on the Seine River, viewing Paris by night.',
        },
      ],
    },
    {
      day: 2,
      date: '2024-05-02',
      activities: [
        {
          time: '9:00 AM',
          activity: 'Breakfast at Café de Flore',
          details: "Start the day with breakfast at one of Paris's most iconic cafes.",
        },
        {
          time: '10:00 AM',
          activity: 'Visit Louvre Museum',
          details: 'Spend the morning exploring the vast collections at the Louvre.',
        },
        {
          time: '1:00 PM',
          activity: 'Lunch at a Parisian Bakery',
          details: 'Grab a light lunch at a nearby bakery with fresh pastries.',
        },
        {
          time: '3:00 PM',
          activity: 'Walk through the Tuileries Garden',
          details: "Relax and stroll through one of Paris's most beautiful gardens.",
        },
        {
          time: '6:00 PM',
          activity: "Dinner at Chez l'Ami Jean",
          details: 'Enjoy a French Basque meal at this lively, casual restaurant.',
        },
      ],
    },
    {
      day: 3,
      date: '2024-05-03',
      activities: [
        {
          time: '8:00 AM',
          activity: 'Day Trip to Versailles',
          details: 'Take a guided tour of the Palace of Versailles, including the famous gardens.',
        },
        {
          time: '12:00 PM',
          activity: 'Lunch at a Versailles Café',
          details: 'Enjoy lunch in Versailles before returning to Paris.',
        },
        {
          time: '4:00 PM',
          activity: 'Explore Montmartre',
          details: 'Spend the late afternoon exploring the artistic neighborhood of Montmartre.',
        },
        {
          time: '7:00 PM',
          activity: 'Dinner at La Crémaillère',
          details: 'Dine at a charming restaurant in Montmartre, known for its romantic ambiance.',
        },
      ],
    },
  ],
  accommodation: {
    hotel_name: 'Hotel de Crillon',
    rating: '5-star',
    location: 'Place de la Concorde, Paris',
    amenities: ['Free Wi-Fi', 'Spa', 'Fitness center', 'Airport transfer'],
  },
  budget_breakdown: {
    accommodation: '$1,200',
    food: '$600',
    activities: '$400',
    total: '$2,200',
  },
}
