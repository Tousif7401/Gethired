'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
  showWidget?: boolean
}

const TRAINING_MESSAGES = [
  {
    title: "My AI is cooking fr",
    message: "Teaching it everything about me rn. It's gonna be so fire when it's ready.",
  },
  {
    title: "AI in its villain arc era",
    message: "My assistant is learning to be useful instead of just hallucinating facts. The growth is real.",
  },
  {
    title: "No cap, my AI is learning",
    message: "It's going through my entire career. Won't stop till it's in its main character era.",
  },
  {
    title: "AI grinding in the shadows",
    message: "My assistant is studying my work while I sleep. It understands the assignment.",
  },
  {
    title: "Bet you didn't expect this",
    message: "Teaching my AI to be lowkey helpful and highkey knowledgeable. Returning soon with a different vibe.",
  },
]

const TOOLTIP_MESSAGES = [
  "AI cooking rn...",
  "Chat being built fr",
  "Wait for it...",
  "Almost there",
  "In training rn",
]

export default function ChatWidget({ isOpen, onClose, showWidget = true }: ChatWidgetProps) {
  const [randomMessage, setRandomMessage] = useState(TRAINING_MESSAGES[0])
  const [randomTooltip, setRandomTooltip] = useState(TOOLTIP_MESSAGES[0])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setRandomMessage(TRAINING_MESSAGES[Math.floor(Math.random() * TRAINING_MESSAGES.length)])
    setRandomTooltip(TOOLTIP_MESSAGES[Math.floor(Math.random() * TOOLTIP_MESSAGES.length)])
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <>
      {/* Floating Widget */}
      {showWidget && (
        <div className="chat-widget-wrap group relative">
          <motion.button
            data-chat-trigger
            className="chat-btn"
            onClick={isOpen ? onClose : () => {}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            aria-label="Open AI chat"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5" y="8" width="16" height="12" rx="4"
                stroke="white" strokeWidth="1.5" fill="none"
              />
              <circle cx="9.5" cy="14" r="1.5" fill="white" />
              <circle cx="16.5" cy="14" r="1.5" fill="white" />
              <circle cx="13" cy="6.5" r="1.2" fill="white" />
              <line
                x1="13" y1="7.7" x2="13" y2="8"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"
              />
              <rect x="9" y="19" width="2" height="2.5" rx="1" fill="white" />
              <rect x="15" y="19" width="2" height="2.5" rx="1" fill="white" />
            </svg>
          </motion.button>

          {/* Tooltip */}
          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <p className="text-white/80 text-xs">{randomTooltip}</p>
              <div className="absolute top-full right-4 -mt-px">
                <div className="w-2 h-2 bg-white/10 border-r border-b border-white/10 transform rotate-45" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Popover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 sm:left-auto sm:right-10 sm:top-20 sm:translate-y-0 sm:w-[400px] sm:max-w-[400px] z-50 max-w-[calc(100vw-2rem)]"
            >
              <div className="liquid-glass rounded-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-3 sm:px-5 sm:py-3 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-white font-display text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                      Mohammed
                    </h3>
                    <span className="text-white/20 text-[10px]">/</span>
                    <span className="text-white/40 text-[10px]">Chat</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="relative w-1 h-1">
                      <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                      <motion.div
                        className="absolute inset-0 w-1 h-1 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-white/50 text-[8px]">Training...</span>
                  </div>
                </div>

                {/* Training Message */}
                <div className="px-3 sm:px-5 py-5 sm:py-6 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-white text-sm sm:text-base font-display mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {randomMessage.title}
                    </h4>
                    <p className="text-white/50 text-[10px] sm:text-xs max-w-[200px] sm:max-w-[280px] mx-auto mb-3 sm:mb-4 leading-relaxed">
                      {randomMessage.message}
                    </p>

                    <div className="bg-white/[0.03] rounded-lg border border-white/10 px-2.5 py-2 sm:px-4 sm:py-2.5 max-w-[200px] sm:max-w-[280px] mx-auto">
                      <p className="text-white/40 text-[8px] mb-1">Or just slide into my DMs:</p>
                      <a
                        href="mailto:tousif.cse.rymec@gmail.com"
                        className="text-white/80 text-[10px] hover:text-white transition-colors break-all block"
                      >
                        tousif.cse.rymec@gmail.com
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="px-3 py-3 sm:px-5 sm:py-2.5 border-t border-white/10">
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-[10px] sm:text-xs"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
