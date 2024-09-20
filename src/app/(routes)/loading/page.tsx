'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { images, loadingMessages } from '@/app/_lib/constants'
import { useItineraryStore } from '@/store/itinerary-store'
import { ItineraryData } from '@/app/_lib/interfaces'

const LoadingPage: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()
  const itineraryData = useItineraryStore(state => state.itineraryData)
  const isLoading = useItineraryStore(state => state.isLoading)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length)
    }, 1500)

    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 1500)

    // push the itinerary route when you have the itinerary data
    if (!isLoading && itineraryData) {
      router.push('/itinerary')
    }

    return () => {
      clearInterval(messageInterval)
      clearInterval(imageInterval)
      // clearTimeout(timeout)
    }
  }, [router, isLoading, itineraryData])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="relative h-64 w-full max-w-lg">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute h-64 w-full rounded-lg object-cover shadow-lg"
          />
        </AnimatePresence>
      </div>

      {/* <div className="mt-8 h-16 w-16 animate-spin rounded-full border-t-4 border-blue-600"></div> */}

      <motion.p
        key={currentMessageIndex}
        className="mt-8 text-xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {loadingMessages[currentMessageIndex]}
      </motion.p>
    </div>
  )
}

export default LoadingPage
