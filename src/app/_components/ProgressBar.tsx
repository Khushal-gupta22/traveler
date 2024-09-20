'use client'
import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-4 flex justify-between">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
        ></div>
      ))}
    </div>
  )
}

export default ProgressBar
