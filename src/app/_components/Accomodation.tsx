import { AccommodationProps } from '@/app/_lib/interfaces'

const Accommodation: React.FC<AccommodationProps> = ({
  hotel_name,
  rating,
  location,
  amenities,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Accommodation</h2>
      <p className="text-lg font-medium">
        {hotel_name} ({rating})
      </p>
      <p className="text-gray-600">{location}</p>
      <h3 className="mt-4 text-xl font-semibold">Amenities</h3>
      <ul className="ml-6 list-disc text-gray-600">
        {amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  )
}

export default Accommodation
