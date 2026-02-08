import { motion } from 'framer-motion'

const DateInvite = () => {
  // Customize these details!
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
        <h2 className="text-3xl font-script text-rose-red mb-4">
          Our Date Plans 📅
        </h2>
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="font-semibold text-gray-800">Time</p>
              <p className="text-gray-600">{dateDetails.time}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold text-gray-800">Location</p>
              <p className="text-gray-600">{dateDetails.location}</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mt-6 italic">
          {dateDetails.description}
        </p>
      </div>

    </motion.div>
  )
}

export default DateInvite
