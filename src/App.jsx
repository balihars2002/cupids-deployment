import { useState, useEffect } from 'react'
import PasswordGate from './components/PasswordGate'
import MainProposal from './components/MainProposal'
import SuccessState from './components/SuccessState'
import FloatingHearts from './components/FloatingHearts'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)

  // Play background music on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioPlayed) {
        const audio = document.getElementById('background-audio')
        if (audio) {
          audio.play().catch(() => {
            // Auto-play blocked, that's okay
          })
          setAudioPlayed(true)
        }
      }
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [audioPlayed])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-pink via-pink-50 to-rose-100">
        <FloatingHearts />
        <PasswordGate onAuthenticate={() => setIsAuthenticated(true)} />
        <audio id="background-audio" loop>
          <source src="/your-song.mp3" type="audio/mpeg" />
          {/* Add your song file to public folder */}
        </audio>
      </div>
    )
  }

  if (hasAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-soft-pink">
        <FloatingHearts />
        <SuccessState />
        <audio id="background-audio" loop>
          <source src="/your-song.mp3" type="audio/mpeg" />
        </audio>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-pink-50 to-rose-100">
      <FloatingHearts />
      <MainProposal onAccept={() => setHasAccepted(true)} />
      <audio id="background-audio" loop>
        <source src="/your-song.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default App
