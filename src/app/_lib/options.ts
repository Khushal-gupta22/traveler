'use server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
// require('dotenv').config()
import { env } from '@/env.js'

const apiKey = env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

// export const chatSession = model.startChat({
//   generationConfig,
//   // safetySettings: Adjust safety settings
//   // See https://ai.google.dev/gemini-api/docs/safety-settings
//   history: [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: 'You are a travel planner. Create a personalized travel itinerary based on the following input:\n    - Destination: france\n    - Start Date:  "2024-05-01"\n    - End Date: "2024-05-03"\n    - Budget: moderate\n    - Travel Group: family\n\n    Create a detailed itinerary including daily activities, accommodation, and budget breakdown. Return the itinerary in this JSON format:\n    Do not write the dates as "Day 1 Date" literallly, instead return the actual dates.\n\n    {\n      "destination": "Destination",\n      "travel_dates": {\n        "start_date": "Start Date",\n        "end_date": "End Date"\n      },\n      "budget": "Budget Level",\n      "travel_group": "Group Type",\n      "itinerary": [\n        {\n          "day": 1,\n          "date": "Day 1 Date",\n          "activities": [\n            {\n              "time": "Activity Time",\n              "activity": "Activity Name",\n              "details": "Activity Details"\n            }\n          ]\n        }\n      ],\n      "accommodation": {\n        "hotel_name": "Hotel Name",\n        "rating": "Hotel Rating",\n        "location": "Hotel Location",\n        "amenities": ["Amenity1", "Amenity2"]\n      },\n      "budget_breakdown": {\n        "accommodation": "Cost",\n        "food": "Cost",\n        "activities": "Cost",\n        "total": "Total Cost"\n      }\n    }\n\n    Here is a sample itinerary to help you understand the exact format in which the data should be returned:\n       {\n            destination: "Paris, France",\n            travel_dates: {\n                start_date: "2024-05-01",\n                end_date: "2024-05-03",\n            },\n            budget: "moderate",\n            travel_group: "couple",\n            itinerary: [\n                {\n                day: 1,\n                date: "2024-05-01",\n                activities: [\n                    {\n                    time: "10:00 AM",\n                    activity: "Arrive at Paris Charles de Gaulle Airport",\n                    details:\n                        "Check into your hotel, freshen up, and have a relaxing morning.",\n                    },\n                    {\n                    time: "12:00 PM",\n                    activity: "Lunch at a Local Bistro",\n                    details:\n                        "Enjoy traditional French cuisine at a cozy bistro near the hotel.",\n                    },\n                    {\n                    time: "2:00 PM",\n                    activity: "Visit Eiffel Tower",\n                    details:\n                        "Spend the afternoon exploring the Eiffel Tower and taking in panoramic views.",\n                    },\n                    {\n                    time: "6:00 PM",\n                    activity: "Dinner at Le Jules Verne",\n                    details:\n                        "Dine at a Michelin-star restaurant located inside the Eiffel Tower.",\n                    },\n                    {\n                    time: "8:00 PM",\n                    activity: "Evening Seine River Cruise",\n                    details:\n                        "Enjoy a romantic cruise on the Seine River, viewing Paris by night.",\n                    },\n                ],\n                },\n                {\n                day: 2,\n                date: "2024-05-03",\n                activities: [\n                    {\n                    time: "8:00 AM",\n                    activity: "Day Trip to Versailles",\n                    details:\n                        "Take a guided tour of the Palace of Versailles, including the famous gardens.",\n                    },\n                    {\n                    time: "12:00 PM",\n                    activity: "Lunch at a Versailles Café",\n                    details: "Enjoy lunch in Versailles before returning to Paris.",\n                    },\n                    {\n                    time: "4:00 PM",\n                    activity: "Explore Montmartre",\n                    details:\n                        "Spend the late afternoon exploring the artistic neighborhood of Montmartre.",\n                    },\n                    {\n                    time: "7:00 PM",\n                    activity: "Dinner at La Crémaillère",\n                    details:\n                        "Dine at a charming restaurant in Montmartre, known for its romantic ambiance.",\n                    },\n                ],\n                },\n            ],\n            accommodation: {\n                hotel_name: "Hotel de Crillon",\n                rating: "5-star",\n                location: "Place de la Concorde, Paris",\n                amenities: ["Free Wi-Fi", "Spa", "Fitness center", "Airport transfer"],\n            },\n            budget_breakdown: {\n                accommodation: "$1,200",\n                food: "$600",\n                activities: "$400",\n                total: "$2,200",\n            },\n        }',
//         },
//       ],
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: '```json\n{\n  "destination": "France",\n  "travel_dates": {\n    "start_date": "2024-05-01",\n    "end_date": "2024-05-03"\n  },\n  "budget": "moderate",\n  "travel_group": "family",\n  "itinerary": [\n    {\n      "day": 1,\n      "date": "2024-05-01",\n      "activities": [\n        {\n          "time": "10:00 AM",\n          "activity": "Arrival in Paris",\n          "details": "Arrive at Charles de Gaulle Airport (CDG) and take a comfortable taxi or train to your hotel in central Paris."\n        },\n        {\n          "time": "11:00 AM",\n          "activity": "Check-in and Relax",\n          "details": "Check into your hotel, Hotel du Nord, a charming 4-star hotel near the Canal Saint-Martin, and settle in."\n        },\n        {\n          "time": "12:00 PM",\n          "activity": "Lunch at a Local Bistro",\n          "details": "Head out to a nearby bistro for a traditional French lunch, enjoying local specialties like croque monsieur and soupe à l\'oignon."\n        },\n        {\n          "time": "2:00 PM",\n          "activity": "Explore the Louvre Museum",\n          "details": "Spend the afternoon exploring the iconic Louvre Museum, marveling at masterpieces like the Mona Lisa and Venus de Milo."\n        },\n        {\n          "time": "6:00 PM",\n          "activity": "Dinner at a Parisian Restaurant",\n          "details": "Enjoy a delicious Parisian dinner at a cozy restaurant near the Louvre, savoring French cuisine with a family-friendly atmosphere."\n        },\n        {\n          "time": "8:00 PM",\n          "activity": "Evening Stroll Along the Seine River",\n          "details": "Take a leisurely evening stroll along the banks of the Seine River, admiring the city\'s lights and enjoying the romantic ambiance."\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "date": "2024-05-02",\n      "activities": [\n        {\n          "time": "9:00 AM",\n          "activity": "Visit the Eiffel Tower",\n          "details": "Ascend the Eiffel Tower for breathtaking panoramic views of Paris. Enjoy a picnic at the base with a view of the Champ de Mars."\n        },\n        {\n          "time": "12:00 PM",\n          "activity": "Lunch at a Cafe in the Latin Quarter",\n          "details": "Have lunch in the charming Latin Quarter, known for its student atmosphere and traditional cafes. Enjoy a relaxed meal with delicious pastries."\n        },\n        {\n          "time": "2:00 PM",\n          "activity": "Explore Notre Dame Cathedral",\n          "details": "Visit the majestic Notre Dame Cathedral, a masterpiece of Gothic architecture. Take a guided tour to learn about its history and significance."\n        },\n        {\n          "time": "4:00 PM",\n          "activity": "Boat Trip on the Seine River",\n          "details": "Enjoy a scenic boat trip on the Seine River, passing by iconic landmarks and soaking in the beauty of Paris."\n        },\n        {\n          "time": "7:00 PM",\n          "activity": "Dinner at a Restaurant with a View",\n          "details": "Enjoy a family-friendly dinner at a restaurant with a view, savoring delicious food and enjoying a memorable dining experience."\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "date": "2024-05-03",\n      "activities": [\n        {\n          "time": "9:00 AM",\n          "activity": "Explore the Palace of Versailles",\n          "details": "Take a day trip to the Palace of Versailles, a magnificent royal residence. Explore the opulent halls, gardens, and the Hall of Mirrors."\n        },\n        {\n          "time": "1:00 PM",\n          "activity": "Lunch at a Restaurant in Versailles",\n          "details": "Enjoy lunch at a charming restaurant in Versailles, tasting traditional French cuisine with a local ambiance."\n        },\n        {\n          "time": "4:00 PM",\n          "activity": "Return to Paris and Free Time",\n          "details": "Return to Paris and enjoy some free time for shopping, exploring local markets, or relaxing at a cafe."\n        },\n        {\n          "time": "8:00 PM",\n          "activity": "Farewell Dinner and Departure",\n          "details": "Enjoy a farewell dinner at a restaurant in Paris, reminiscing about your trip. Later, depart from Charles de Gaulle Airport (CDG)."\n        }\n      ]\n    }\n  ],\n  "accommodation": {\n    "hotel_name": "Hotel du Nord",\n    "rating": "4-star",\n    "location": "Canal Saint-Martin, Paris",\n    "amenities": [\n      "Free Wi-Fi",\n      "Breakfast Included",\n      "Family Rooms",\n      "Bar",\n      "24-hour Reception"\n    ]\n  },\n  "budget_breakdown": {\n    "accommodation": "€300",\n    "food": "€200",\n    "activities": "€200",\n    "total": "€700"\n  }\n}\n```',
//         },
//       ],
//     },
//   ],
// })

export async function createChatSession(prompt: string) {
  const chat = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  })

  return chat
}
