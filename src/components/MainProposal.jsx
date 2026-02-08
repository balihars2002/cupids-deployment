import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ReasonsGenerator from './ReasonsGenerator'

const MainProposal = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [noInitialized, setNoInitialized] = useState(false)
  const [showReasons, setShowReasons] = useState(false)
  const noButtonRef = useRef(null)
  const containerRef = useRef(null)

  // Place the No button next to Yes initially
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setNoButtonPos({
        x: rect.width / 2 + 40,
        y: rect.height / 2 + 60,
      })
      setNoInitialized(true)
    }
  }, [])

  // Flee when the mouse gets close
  const handleMouseMove = useCallback((e) => {
    if (!noButtonRef.current || !containerRef.current) return

    const btn = noButtonRef.current.getBoundingClientRect()
    const container = containerRef.current.getBoundingClientRect()

    const btnCenterX = btn.left + btn.width / 2
    const btnCenterY = btn.top + btn.height / 2

    const dx = e.clientX - btnCenterX
    const dy = e.clientY - btnCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const fleeRadius = 150 // pixels – start running when cursor is this close

    if (distance < fleeRadius) {
      // Move away from the cursor
      const angle = Math.atan2(dy, dx)
      const fleeDistance = 200 + Math.random() * 100

      let newX = noButtonPos.x - Math.cos(angle) * fleeDistance
      let newY = noButtonPos.y - Math.sin(angle) * fleeDistance

      // Keep within container bounds
      const padding = 10
      const maxX = container.width - btn.width - padding
      const maxY = container.height - btn.height - padding

      // If pushed out of bounds, bounce to the opposite side
      if (newX < padding) newX = maxX - Math.random() * 100
      if (newX > maxX) newX = padding + Math.random() * 100
      if (newY < padding) newY = maxY - Math.random() * 100
      if (newY > maxY) newY = padding + Math.random() * 100

      newX = Math.max(padding, Math.min(newX, maxX))
      newY = Math.max(padding, Math.min(newY, maxY))

      setNoButtonPos({ x: newX, y: newY })
    }
  }, [noButtonPos])

  // Fallback: also flee on hover / touch
  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const btn = noButtonRef.current.getBoundingClientRect()
    const maxX = container.width - btn.width - 20
    const maxY = container.height - btn.height - 20
    setNoButtonPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    })
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    handleNoHover()
    setTimeout(() => {
      alert('Error 404: Rejection not found. Please try again. 💕')
    }, 100)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Main Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-center mb-12 z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-script text-rose-red mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Will you be my Valentine?
        </motion.h1>
        <motion.div
          className="text-6xl pulse-heart"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💕
        </motion.div>
      </motion.div>

      {/* Yes Button – stays put */}
      <motion.button
        onClick={onAccept}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-2xl hover:bg-green-600 hover:shadow-green-300/50 transition-all z-20"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(34, 197, 94, 0.7)',
            '0 0 0 20px rgba(34, 197, 94, 0)',
            '0 0 0 0 rgba(34, 197, 94, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Yes! 💖
      </motion.button>

      {/* No Button – runs away from cursor */}
      {noInitialized && (
        <motion.button
          ref={noButtonRef}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={handleNoClick}
          animate={{ left: noButtonPos.x, top: noButtonPos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute bg-red-500 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:bg-red-600 z-10 select-none"
        >
          No 😢
        </motion.button>
      )}

      {/* Reasons Why Button */}
      <div className="mt-10 z-10">
        <motion.button
          onClick={() => setShowReasons(!showReasons)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 backdrop-blur-sm text-rose-red px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {showReasons ? 'Hide' : 'Show'} Reasons Why 💭
        </motion.button>
      </div>

      {/* Reasons Generator */}
      {showReasons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 z-10"
        >
          <ReasonsGenerator />
        </motion.div>
      )}
    </div>
  )
}

export default MainProposal
