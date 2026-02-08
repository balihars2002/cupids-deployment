import { motion } from 'framer-motion'
import ScratchCard from './ScratchCard'

const DateInvite = () => {
  const dateDetails = {
    title: "Valentine's Getaway",
    time: "Last week of Feb",
    location: "Sri Sai Acropolis",
    description: "I've made room reservations for us here 😂"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-script text-rose-red mb-2">
          Our Date Plans 📅
        </h2>
        <p className="text-gray-400 text-sm mb-6">Scratch to reveal the surprise!</p>

        <div className="space-y-5">
          {/* Time - Scratchable */}
          <div className="flex items-center gap-4">
            <span className="text-2xl flex-shrink-0">🕐</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-left mb-2">Time</p>
              <ScratchCard width={260} height={60}>
                <p className="text-gray-700 font-semibold text-lg">{dateDetails.time}</p>
              </ScratchCard>
            </div>
          </div>

          {/* Location - Scratchable */}
          <div className="flex items-center gap-4">
            <span className="text-2xl flex-shrink-0">📍</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-left mb-2">Location</p>
              <ScratchCard width={260} height={60}>
                <p className="text-gray-700 font-semibold text-lg">{dateDetails.location}</p>
              </ScratchCard>
            </div>
          </div>

          {/* Description - Scratchable */}
          <div className="flex items-center gap-4">
            <span className="text-2xl flex-shrink-0">💌</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-left mb-2">Secret Message</p>
              <ScratchCard width={260} height={70}>
                <p className="text-gray-700 font-medium text-base text-center leading-snug">
                  {dateDetails.description}
                </p>
              </ScratchCard>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DateInvite
