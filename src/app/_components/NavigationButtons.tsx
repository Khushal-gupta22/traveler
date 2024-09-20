'use client'
import React from 'react'

interface NavigationButtonsProps {
  onNext: () => void
  onBack: () => void
  showBack: boolean
  showNext: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  showBack,
  showNext,
}) => {
  return (
    <div className="relative z-20 mt-4 flex justify-between">
      {showBack && (
        <button onClick={onBack} className="mr-auto rounded bg-gray-300 px-4 py-2 text-gray-700">
          Back
        </button>
      )}
      {showNext && (
        <button onClick={onNext} className="ml-auto rounded bg-blue-500 px-4 py-2 text-white">
          Next
        </button>
      )}
    </div>
  )
}

export default NavigationButtons
