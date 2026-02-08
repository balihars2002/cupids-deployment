import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      {/* Envelope */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Envelope body */}
            <div className="w-72 h-48 md:w-96 md:h-56 bg-gradient-to-b from-rose-100 to-rose-200 rounded-2xl shadow-2xl relative overflow-hidden border-2 border-rose-300">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 400 120" className="w-full">
                  <path
                    d="M0,0 L200,100 L400,0 L400,0 L0,0 Z"
                    fill="#fda4af"
                    stroke="#fb7185"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Heart seal */}
              <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 z-10"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-14 h-14 bg-rose-red rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💌</span>
                </div>
              </motion.div>

              {/* "Open me" text */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-rose-red font-script text-2xl">Tap to open</p>
                <motion.p
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-rose-400 text-sm mt-1"
                >
                  A letter for you ❤️
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Letter Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full max-w-lg"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-rose-100 relative overflow-hidden">
              {/* Decorative top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 via-rose-red to-rose-300" />

              {/* Letter content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-script text-rose-red text-3xl mb-6 text-center">
                  My Dearest,
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    From the moment you walked into my life, everything changed. The colors got brighter, the days felt shorter, and my heart found a rhythm it never knew before.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    You are my favorite notification, my best 2 AM conversation, and the reason I smile at my phone like an idiot. Every moment with you feels like a gift I didn't know I deserved.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    So here I am — no big speech, just a simple truth: I'm so lucky to have you, and I'd choose you over and over again, in every lifetime.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="mt-8 text-right"
                >
                  <p className="font-script text-2xl text-rose-red">
                    Forever yours,
                  </p>
                  <p className="font-script text-xl text-rose-400 mt-1">
                    Your Valentine 💕
                  </p>
                </motion.div>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full text-center text-rose-400 hover:text-rose-red transition-colors text-sm"
              >
                Close letter ✉️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoveLetter
