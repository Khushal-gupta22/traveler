export const loadingMessages = [
  'Thinking...',
  'Generating the best travel itinerary...',
  'Finding the best hotels...',
  'Curating top restaurants...',
  'Planning exciting activities...',
  'Reviewing local attractions...',
  'Finalizing your custom travel experience...',
]

export const images = [
  '/images/eiffel-tower.jpg',
  '/images/louvre.jpg',
  '/images/hotel.jpg',
  '/images/river.jpg',
  '/images/restaurant.jpg',
]

export const AI_PROMPT = `
      You are a travel planner. Create a personalized travel itinerary based on the following input:
      - Destination: {destination}
      - Start Date: {startDate}
      - End Date: {endDate}
      - Budget: {budget}
      - Travel Group: {travelGroup}

      Create a detailed itinerary including daily activities, accommodation, and budget breakdown. Return the itinerary in this JSON format:
      Do not write the dates as "Day 1 Date" literallly, instead return the actual dates.

      {
        "destination": "Destination",
        "travel_dates": {
          "start_date": "Start Date",
          "end_date": "End Date"
        },
        "budget": "Budget Level",
        "travel_group": "Group Type",
        "itinerary": [
          {
            "day": 1,
            "date": "Day 1 Date",
            "activities": [
              {
                "time": "Activity Time",
                "activity": "Activity Name",
                "details": "Activity Details"
              }
            ]
          }
        ],
        "accommodation": {
          "hotel_name": "Hotel Name",
          "rating": "Hotel Rating",
          "location": "Hotel Location",
          "amenities": ["Amenity1", "Amenity2"]
        },
        "budget_breakdown": {
          "accommodation": "Cost",
          "food": "Cost",
          "activities": "Cost",
          "total": "Total Cost"
        }
      }

      Here is a sample itinerary to help you understand the exact format in which the data should be returned:
        {
              destination: "Paris, France",
              travel_dates: {
                  start_date: "2024-05-01",
                  end_date: "2024-05-03",
              },
              budget: "moderate",
              travel_group: "couple",
              itinerary: [
                  {
                  day: 1,
                  date: "2024-05-01",
                  activities: [
                      {
                      time: "10:00 AM",
                      activity: "Arrive at Paris Charles de Gaulle Airport",
                      details:
                          "Check into your hotel, freshen up, and have a relaxing morning.",
                      },
                      {
                      time: "12:00 PM",
                      activity: "Lunch at a Local Bistro",
                      details:
                          "Enjoy traditional French cuisine at a cozy bistro near the hotel.",
                      },
                      {
                      time: "2:00 PM",
                      activity: "Visit Eiffel Tower",
                      details:
                          "Spend the afternoon exploring the Eiffel Tower and taking in panoramic views.",
                      },
                      {
                      time: "6:00 PM",
                      activity: "Dinner at Le Jules Verne",
                      details:
                          "Dine at a Michelin-star restaurant located inside the Eiffel Tower.",
                      },
                      {
                      time: "8:00 PM",
                      activity: "Evening Seine River Cruise",
                      details:
                          "Enjoy a romantic cruise on the Seine River, viewing Paris by night.",
                      },
                  ],
                  },
                  {
                  day: 2,
                  date: "2024-05-03",
                  activities: [
                      {
                      time: "8:00 AM",
                      activity: "Day Trip to Versailles",
                      details:
                          "Take a guided tour of the Palace of Versailles, including the famous gardens.",
                      },
                      {
                      time: "12:00 PM",
                      activity: "Lunch at a Versailles Café",
                      details: "Enjoy lunch in Versailles before returning to Paris.",
                      },
                      {
                      time: "4:00 PM",
                      activity: "Explore Montmartre",
                      details:
                          "Spend the late afternoon exploring the artistic neighborhood of Montmartre.",
                      },
                      {
                      time: "7:00 PM",
                      activity: "Dinner at La Crémaillère",
                      details:
                          "Dine at a charming restaurant in Montmartre, known for its romantic ambiance.",
                      },
                  ],
                  },
              ],
              accommodation: {
                  hotel_name: "Hotel de Crillon",
                  rating: "5-star",
                  location: "Place de la Concorde, Paris",
                  amenities: ["Free Wi-Fi", "Spa", "Fitness center", "Airport transfer"],
              },
              budget_breakdown: {
                  accommodation: "$1,200",
                  food: "$600",
                  activities: "$400",
                  total: "$2,200",
              },
          }
      `
