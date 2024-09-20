'use client'
import React, { useState } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'

const libraries: 'places'[] = ['places']

interface DestinationInputProps {
  value: string
  onChange: (value: string) => void
}

const DestinationInput: React.FC<DestinationInputProps> = ({ value, onChange }) => {
  // TODO: Implement Google Places API Integeration

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  })

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      onChange(place.formatted_address || '')
    }
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="flex h-full flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-600">Where are you planning to go?</h2>
      <div className="flex flex-grow items-center justify-center">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            className="mt-2 w-[30vw] rounded-md border border-gray-300 p-2"
            type="text"
            value={value}
            //   also make it input by pressing enter key
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onChange(e.currentTarget.value)
              }
            }}
            onChange={e => onChange(e.target.value)}
            placeholder="Enter your destination"
            autoFocus={true}
          />
        </Autocomplete>
      </div>
    </div>
  )
}

export default DestinationInput
