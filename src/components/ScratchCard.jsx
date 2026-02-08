import { useRef, useState, useEffect, useCallback } from 'react'

const ScratchCard = ({ children, width = 280, height = 80, revealThreshold = 40 }) => {
  const canvasRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const scratchedRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Scale for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Draw scratch layer
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f43f5e')
    gradient.addColorStop(0.5, '#e11d48')
    gradient.addColorStop(1, '#be123c')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.roundRect(0, 0, width, height, 16)
    ctx.fill()

    // Add shimmer pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    for (let i = 0; i < width; i += 12) {
      ctx.fillRect(i, 0, 6, height)
    }

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.font = 'bold 16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✨ Scratch to reveal! ✨', width / 2, height / 2)
  }, [width, height])

  const getPosition = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const scratch = useCallback((pos) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(pos.x * dpr, pos.y * dpr, 22 * dpr, 0, Math.PI * 2)
    ctx.fill()

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    const percentage = (transparent / (pixels.length / 4)) * 100
    scratchedRef.current = percentage

    if (percentage >= revealThreshold) {
      setIsRevealed(true)
    }
  }, [revealThreshold])

  const handleStart = useCallback((e) => {
    e.preventDefault()
    setIsScratching(true)
    scratch(getPosition(e))
  }, [scratch, getPosition])

  const handleMove = useCallback((e) => {
    e.preventDefault()
    if (!isScratching) return
    scratch(getPosition(e))
  }, [isScratching, scratch, getPosition])

  const handleEnd = useCallback(() => {
    setIsScratching(false)
  }, [])

  return (
    <div
      className="relative inline-block rounded-2xl overflow-hidden"
      style={{ width, height }}
    >
      {/* Hidden content underneath */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-3"
        style={{ width, height }}
      >
        {children}
      </div>

      {/* Scratch canvas on top */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="absolute inset-0 cursor-pointer z-10 rounded-2xl"
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Revealed state with animation */}
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-3 animate-pulse-once">
          {children}
        </div>
      )}
    </div>
  )
}

export default ScratchCard
