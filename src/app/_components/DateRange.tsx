'use client'
import React from 'react'
import {
  DateRangePicker,
  DateRangePickerField,
  DateRangePickerProps,
} from '@nextui-org/date-picker'
import { CalendarDate } from '@nextui-org/react'

interface DateRangeProps {
  startDate: CalendarDate | null
  endDate: CalendarDate | null
  onDateChange: (start: CalendarDate | null, end: CalendarDate | null) => void
}

const DateRange: React.FC<DateRangeProps> = ({ startDate, endDate, onDateChange }) => {
  return (
    <div className="relative z-10 mb-4 flex h-full flex-col items-center">
      <h2 className="mb-4 text-2xl font-bold">Select Your Travel Dates</h2>
      <div className="flex w-3/4 flex-grow items-center justify-center">
        <DateRangePicker
          onChange={value => {
            value.start && value.end && onDateChange(value.start, value.end)
          }}
          value={startDate && endDate ? { start: startDate, end: endDate } : null}
        />
      </div>
    </div>
  )
}

export default DateRange
