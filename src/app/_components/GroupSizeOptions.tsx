import { cn } from '@nextui-org/react'
import React from 'react'

interface GroupSizeOptionsProps {
  selectedSize: string
  setSelectedSize: (size: string) => void
}

const GroupSizeOptions: React.FC<GroupSizeOptionsProps> = ({ selectedSize, setSelectedSize }) => {
  const sizeOptions = [
    {
      value: 'solo',
      label: 'Just Me',
      icon: '✈️',
      description: 'A sole traveler in exploration',
    },
    {
      value: 'couple',
      label: 'A Couple',
      icon: '🥂',
      description: 'Two travelers in tandem',
    },
    {
      value: 'family',
      label: 'Family',
      icon: '🏠',
      description: 'A group of fun loving adventurers',
    },
    {
      value: 'friends',
      label: 'Friends',
      icon: '⛵',
      description: 'A bunch of thrill-seekers',
    },
  ]

  return (
    <div className="mb-4 flex h-full flex-col items-center">
      <h2 className="mb-4 text-2xl font-bold">
        Who do you plan on traveling with on your next adventure?
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {sizeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedSize(option.value)}
              className={cn(
                'rounded-lg border bg-white p-4 text-center transition-colors hover:bg-blue-50',
                {
                  'border-blue-500 bg-blue-50': selectedSize === option.value,
                  'border-gray-200': selectedSize !== option.value,
                }
              )}
            >
              <span className="mb-2 block text-4xl">{option.icon}</span>
              <p className="font-semibold">{option.label}</p>
              <p className="text-sm text-gray-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupSizeOptions
