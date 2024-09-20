import { cn } from '@nextui-org/react'
import React from 'react'

interface BudgetOptionsProps {
  selectedBudget: string
  setSelectedBudget: (budget: string) => void
}

const BudgetOptions: React.FC<BudgetOptionsProps> = ({ selectedBudget, setSelectedBudget }) => {
  const budgetOptions = [
    {
      value: 'cheap',
      label: 'Cheap',
      icon: '💵',
      description: 'Stay conscious of costs',
    },
    {
      value: 'moderate',
      label: 'Moderate',
      icon: '💰',
      description: 'Keep cost on the average side',
    },
    {
      value: 'luxury',
      label: 'Luxury',
      icon: '💎',
      description: "Don't worry about cost",
    },
  ]

  return (
    <div className="mb-4 flex h-full flex-col items-center">
      <h2 className="mb-4 text-center text-2xl font-bold">What is Your Budget?</h2>
      <div className="flex flex-grow items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {budgetOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedBudget(option.value)}
              className={cn(
                'rounded-lg border bg-white p-4 text-center transition-colors hover:border-gray-300 hover:bg-blue-50',
                {
                  'border-blue-500 bg-blue-50': selectedBudget === option.value,
                  'border-gray-200': selectedBudget !== option.value,
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

export default BudgetOptions
