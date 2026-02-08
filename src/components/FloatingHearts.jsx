import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🧡']
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 20 + Math.random() * 20,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -100, -200, -300, -400],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 1, 1, 0.5],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts
