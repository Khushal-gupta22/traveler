import { DayItinerary, Activity } from '@/app/_lib/interfaces'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion'

interface TimelineProps {
  itinerary: DayItinerary[]
}

const Timeline: React.FC<TimelineProps> = ({ itinerary }) => {
  return (
    <div className="w-full space-y-6">
      <Accordion type="single" collapsible>
        {itinerary.map((day, index) => (
          <AccordionItem key={index} value={`day-${day.day}`}>
            <AccordionTrigger>{`Day ${day.day}: ${day.date}`}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {day.activities.map((activity: Activity, activityIndex) => (
                  <div key={activityIndex} className="flex items-center space-x-4">
                    <div className="w-16 text-right">
                      <p className="text-lg font-semibold">{activity.time}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{activity.activity}</p>
                      <p className="text-gray-600">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

{
  /* <div key={day.day} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Day {day.day}: {day.date}
          </h2>
          <ul className="space-y-3">
            {day.activities.map((activity, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="font-medium text-blue-600">{activity.time}</div>
                <div>
                  <h4 className="text-lg font-semibold">{activity.activity}</h4>
                  <p className="text-gray-600">{activity.details}</p>
                </div>
              </li>
            ))}
          </ul>
        </div> */
}

export default Timeline
