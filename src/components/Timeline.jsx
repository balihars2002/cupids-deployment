import { motion } from 'framer-motion'

const Timeline = () => {
  // Customize these with your own relationship milestones!
  const milestones = [
    {
      date: "First Date",
      title: "The Beginning",
      description: "That nervous first coffee where we talked for hours and I knew you were special.",
      emoji: "☕"
    },
    {
      date: "Favorite Trip",
      title: "Adventure Together",
      description: "Our weekend getaway where we discovered we're perfect travel partners.",
      emoji: "✈️"
    },
    {
      date: "Special Moment",
      title: "The Realization",
      description: "The moment I realized I was falling in love with you.",
      emoji: "💫"
    },
    {
      date: "Today",
      title: "Valentine's Day",
      description: "Asking you to be my Valentine, because every day with you is special.",
      emoji: "💕"
    }
  ]

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
      <h2 className="text-4xl font-script text-rose-red text-center mb-12">
        Our Story
      </h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-200 via-rose-red to-rose-200 hidden md:block" />
        
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-rose-red rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {milestone.emoji}
                </div>
                <div className="absolute inset-0 bg-rose-red rounded-full animate-ping opacity-20" />
              </div>
              
              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex-1 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-2xl font-bold text-rose-red mb-2 md:mb-0">
                    {milestone.title}
                  </h3>
                  <span className="text-sm text-gray-500 font-semibold">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline
