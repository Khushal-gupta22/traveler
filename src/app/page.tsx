'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import ProgressBar from './_components/ProgressBar'
import DestinationInput from './_components/DestinationInput'
import BudgetOptions from './_components/BudgetOptions'
import GroupSizeOptions from './_components/GroupSizeOptions'
import GenerateButton from './_components/GenerateButton'
import NavigationButtons from './_components/NavigationButtons'
import DateRange from './_components/DateRange'
import { format, formatDistance } from 'date-fns'
import { CalendarDate } from '@nextui-org/react'

function parseCalendarDate(date: CalendarDate): Date {
  return new Date(date.year, date.month - 1, date.day)
}

function formatDate(date: CalendarDate | null): string {
  if (!date) return 'Not selected'
  const jsDate = parseCalendarDate(date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(jsDate)
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 5

  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState<CalendarDate | null>(null)
  const [endDate, setEndDate] = useState<CalendarDate | null>(null)
  const [budget, setBudget] = useState('')
  const [groupSize, setGroupSize] = useState('')

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      if (validateStep()) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!destination.trim()) {
          toast.error('Please enter a destination')
          return false
        }
        break
      case 1:
        if (!startDate || !endDate) {
          toast.error('Please select your travel dates')
          return false
        }
        break
      case 2:
        if (!budget) {
          toast.error('Please select a budget option')
          return false
        }
        break
      case 3:
        if (!groupSize) {
          toast.error('Please select a group size')
          return false
        }
        break
    }
    return true
  }

  const handleDateChange = (start: CalendarDate | null, end: CalendarDate | null) => {
    setStartDate(start)
    setEndDate(end)
  }

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  }

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-[#f9f9f9] text-[#11111c]">
      <h1 className="py-10 text-4xl font-semibold text-gray-600">
        Enter Your Travel Preferences 🏕️🌴
      </h1>
      <p className="text-wrap px-10">
        Just provide some basic information, and our trip planner will generate a customized
        itinerary based on your preferences.
      </p>
      <div className="mx-auto mt-16 flex w-1/2 flex-col rounded-xl bg-neutral-200 px-16 py-8">
        <Toaster position="bottom-center" reverseOrder={false} />

        <div>{/* <ProgressBar currentStep={currentStep} totalSteps={totalSteps} /> */}</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="mt-8 flex-grow"
          >
            {currentStep === 0 && (
              <DestinationInput value={destination} onChange={setDestination} />
            )}
            {currentStep === 1 && (
              <DateRange startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
            )}
            {currentStep === 2 && (
              <BudgetOptions selectedBudget={budget} setSelectedBudget={setBudget} />
            )}
            {currentStep === 3 && (
              <GroupSizeOptions selectedSize={groupSize} setSelectedSize={setGroupSize} />
            )}
            {currentStep === 4 && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex w-3/4 flex-col gap-4 rounded-md border bg-white p-4">
                  <h3 className="mb-2 text-center text-xl font-bold">Your Choices</h3>
                  <div>
                    <p className="font-semibold">Destination</p>
                    <p className="capitalize">{destination}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p>
                      {formatDistance(parseCalendarDate(endDate!), parseCalendarDate(startDate!))} (
                      {format(parseCalendarDate(startDate!), 'MMM d')} -{' '}
                      {format(parseCalendarDate(endDate!), 'MMM d')})
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="capitalize">{groupSize}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Budget</p>
                    <p className="capitalize">{budget}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {currentStep === totalSteps - 1 && (
          <div className="mt-4">
            <GenerateButton
              budget={budget}
              destination={destination}
              groupSize={groupSize}
              startDate={format(parseCalendarDate(startDate!), 'MMM d yyyy')}
              endDate={format(parseCalendarDate(endDate!), 'MMM d yyyy')}
            />
          </div>
        )}
        <NavigationButtons
          onNext={handleNext}
          onBack={handleBack}
          showBack={currentStep > 0}
          showNext={currentStep < totalSteps - 1}
        />
      </div>
    </div>
  )
}
