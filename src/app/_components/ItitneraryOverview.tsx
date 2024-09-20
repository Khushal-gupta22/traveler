import { ItineraryOverviewProps } from '@/app/_lib/interfaces'

const ItineraryOverview: React.FC<ItineraryOverviewProps> = ({
  destination,
  startDate,
  endDate,
  travelGroup,
  budget,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Travel Overview</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Destination:</strong> {destination}
        </p>
        <p>
          <strong>Dates:</strong> {startDate} - {endDate}
        </p>
        <p>
          <strong>Group:</strong> {travelGroup}
        </p>
        <p>
          <strong>Budget:</strong> {budget}
        </p>
      </div>
    </div>
  )
}

export default ItineraryOverview
