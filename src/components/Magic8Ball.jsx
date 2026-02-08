import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const answers = [
  "Signs point to forever 💕",
  "Absolutely, babe 😘",
  "The stars say YES ✨",
  "Without a doubt, my love 💖",
  "You already know the answer 😉",
  "100% yes, always 💗",
  "Ask me again and I'll kiss you 😚",
  "The universe ships us 🌌",
  "It is destined, my love 🔮",
  "Reply hazy... just kidding, YES 💕",
  "All signs point to us 🥰",
  "Better believe it, cutie 💘",
  "My heart says absolutely 💓",
  "Concentrate and ask again... okay fine, YES 😂",
  "As sure as the sun rises ☀️",
  "You + Me = Forever 💞",
  "That's a big fat YES 💖",
  "Even my magic says you're the one ✨",
]

const Magic8Ball = () => {
  const [answer, setAnswer] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [usedAnswers, setUsedAnswers] = useState(new Set())

  const shakeBall = useCallback(() => {
    if (isShaking) return

    setShowAnswer(false)
    setIsShaking(true)

    // Pick a random answer (avoid repeats)
    let available = answers.filter((_, i) => !usedAnswers.has(i))
    if (available.length === 0) {
      setUsedAnswers(new Set())
      available = answers
    }

    const idx = Math.floor(Math.random() * available.length)
    const picked = available[idx]
    const originalIdx = answers.indexOf(picked)

    setTimeout(() => {
      setAnswer(picked)
      setUsedAnswers((prev) => new Set([...prev, originalIdx]))
      setIsShaking(false)
      setShowAnswer(true)
    }, 1500)
  }, [isShaking, usedAnswers])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full">
      <h2 className="text-2xl font-script text-rose-red text-center mb-2">
        Magic 8-Ball of Love
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Ask a question, then shake the ball!
      </p>

      {/* The 8-Ball */}
      <div className="flex justify-center mb-6">
        <motion.div
          onClick={shakeBall}
          animate={
            isShaking
              ? {
                  rotate: [0, -15, 12, -10, 8, -5, 3, 0],
                  x: [0, -10, 8, -6, 5, -3, 2, 0],
                  y: [0, -5, 4, -3, 2, -1, 1, 0],
                }
              : {}
          }
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer select-none"
        >
          {/* Outer ball */}
          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute top-3 left-6 w-16 h-10 bg-white/15 rounded-full blur-md" />
            <div className="absolute top-6 left-10 w-6 h-4 bg-white/20 rounded-full blur-sm" />

            {/* Inner blue window */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 flex items-center justify-center shadow-inner border-2 border-blue-800/50">
              <AnimatePresence mode="wait">
                {isShaking ? (
                  <motion.div
                    key="shaking"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl"
                  >
                    🔮
                  </motion.div>
                ) : showAnswer ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="text-center px-2"
                  >
                    <p className="text-blue-200 text-xs font-bold leading-tight">
                      {answer}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="eight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <span className="text-white text-4xl font-bold">8</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Shake button */}
      <motion.button
        onClick={shakeBall}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isShaking}
        className={`w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all ${
          isShaking
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-rose-red text-white hover:shadow-xl'
        }`}
      >
        {isShaking ? 'Shaking... 🔮' : showAnswer ? 'Ask Again 🎱' : 'Shake the Ball 🎱'}
      </motion.button>
    </div>
  )
}

export default Magic8Ball
