import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import DateInvite from './DateInvite'
import LoveLetter from './LoveLetter'

const SuccessState = () => {
  const confettiRef = useRef(null)

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 5000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    // Big burst at the start
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center mb-8"
      >
        <motion.div
          className="text-8xl md:text-9xl mb-6"
          animate={{ 
            rotate: [0, 10, -10, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 0.5 }}
        >
          🎉
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl font-script text-rose-red mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Yay!
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-3xl text-gray-700 mb-8 font-script"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You said yes! 💕
        </motion.p>
      </motion.div>

      {/* Love Letter Envelope */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10 w-full flex justify-center"
      >
        <LoveLetter />
      </motion.div>

      {/* Date Invite */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-4"
      >
        <DateInvite />
      </motion.div>

      <canvas ref={confettiRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
    </div>
  )
}

export default SuccessState
