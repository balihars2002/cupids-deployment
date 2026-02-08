import { useState } from 'react'
import { motion } from 'framer-motion'

const PasswordGate = ({ onAuthenticate }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  // ✏️ Change this to the actual date (1-31) you first met
  const correctDate = 5

  const handleDateClick = (day) => {
    setSelectedDate(day)
    setError('')

    if (day === correctDate) {
      // Small delay to show the selection before transitioning
      setTimeout(() => {
        onAuthenticate()
      }, 400)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setError("That's not quite right... think harder! 💭")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            🔒
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-script text-rose-red mb-3">
            Before we begin...
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium">
            What date did we first meet? 💕
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Pick a number from 1 – 31
          </p>
        </div>

        {/* Date Grid */}
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-7 gap-2 mb-6"
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <motion.button
              key={day}
              type="button"
              onClick={() => handleDateClick(day)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={`
                aspect-square rounded-xl font-semibold text-base md:text-lg
                flex items-center justify-center transition-all duration-200
                ${selectedDate === day && day === correctDate
                  ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                  : selectedDate === day && day !== correctDate
                  ? 'bg-red-400 text-white shadow-lg shadow-red-200'
                  : 'bg-rose-50 text-gray-700 hover:bg-rose-200 hover:text-rose-red'
                }
              `}
            >
              {day}
            </motion.button>
          ))}
        </motion.div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Success flash */}
        {selectedDate === correctDate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-center font-semibold text-lg mt-2"
          >
            That's it! 🎉
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

export default PasswordGate
