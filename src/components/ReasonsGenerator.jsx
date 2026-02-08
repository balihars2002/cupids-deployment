import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ReasonsGenerator = () => {
  // Customize these with your own reasons!
  const reasons = [
    "Your laugh that makes everything better",
    "The way you steal the covers but I don't mind",
    "Your ambition and drive inspire me every day",
    "How you make me feel like I'm home",
    "Your smile that lights up my world",
    "The way you understand me without words",
    "Your kindness to everyone around you",
    "How you challenge me to be better",
    "Your sense of humor that matches mine perfectly",
    "The way you care about the little things",
    "Your beautiful mind and creative spirit",
    "How you make ordinary moments extraordinary",
    "Your strength and resilience",
    "The way you love with your whole heart",
    "Your passion for life is contagious"
  ]

  const [currentReason, setCurrentReason] = useState('')
  const [usedReasons, setUsedReasons] = useState(new Set())
  const hasGenerated = useRef(false)

  // Auto-generate the first reason on mount
  useEffect(() => {
    if (!hasGenerated.current) {
      hasGenerated.current = true
      generateReason()
    }
  }, [])

  const generateReason = () => {
    if (usedReasons.size >= reasons.length) {
      // Reset if all reasons have been shown
      setUsedReasons(new Set())
    }

    let availableReasons = reasons.filter((_, index) => !usedReasons.has(index))
    
    if (availableReasons.length === 0) {
      availableReasons = reasons
      setUsedReasons(new Set())
    }

    const randomIndex = Math.floor(Math.random() * availableReasons.length)
    const selectedReason = availableReasons[randomIndex]
    const originalIndex = reasons.indexOf(selectedReason)
    
    setCurrentReason(selectedReason)
    setUsedReasons(new Set([...usedReasons, originalIndex]))
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full">
      <h2 className="text-3xl font-script text-rose-red text-center mb-6">
        Reasons Why I Love You
      </h2>
      
      <AnimatePresence mode="wait">
        {currentReason && (
          <motion.div
            key={currentReason}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center justify-center"
          >
            <p className="text-xl md:text-2xl text-gray-700 text-center font-medium">
              {currentReason}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={generateReason}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-rose-red text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Show Me Another 💭
      </motion.button>
    </div>
  )
}

export default ReasonsGenerator
