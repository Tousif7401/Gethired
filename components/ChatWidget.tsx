'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Send, Sparkles } from 'lucide-react'
// TTS-related imports - DISABLED: Fish.audio API requires payment/credits
// To enable: Uncomment these imports and the TTS code below
// import { Volume2, VolumeX } from 'lucide-react'

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  showWidget?: boolean
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const TOOLTIP_MESSAGES = [
  "Chat with Mohammed's AI",
  "Ask about my work",
  "AI assistant ready",
  "Need help? Chat now",
  "Curious about my projects?",
  "Want to know my tech stack?",
  "How can I contact you?",
  "Ask me anything!",
]

const DEFAULT_GREETING = "Hey! I'm Mohammed, a Full Stack Developer who loves building things that actually work. Ask me about my projects, tech stack, or how I survived my hackathon runs."

const QUICK_OPTIONS = [
  { label: '🎯 Projects', message: 'Tell me about your projects' },
  { label: '🧠 Tech Stack', message: 'What technologies do you work with?' },
  { label: '📧 Contact', message: 'How can I contact you?' },
  { label: '🎓 Education', message: 'Tell me about your education' },
  { label: '💼 Experience', message: 'What is your work experience?' },
  { label: '🏆 Achievements', message: 'What are your key achievements?' },
]

export default function ChatWidget({ isOpen, onClose, onOpen, showWidget = true }: ChatWidgetProps) {
  const [randomTooltip, setRandomTooltip] = useState(TOOLTIP_MESSAGES[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // TTS state - DISABLED: Fish.audio API requires payment/credits
  // To enable: Add credits at https://fish.audio/app/developers
  // const [isSpeaking, setIsSpeaking] = useState(false)
  // const [ttsEnabled, setTtsEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // const audioRef = useRef<HTMLAudioElement | null>(null)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setRandomTooltip(TOOLTIP_MESSAGES[Math.floor(Math.random() * TOOLTIP_MESSAGES.length)])
  }, [])

  // Rotate through tooltip messages every 3 seconds
  useEffect(() => {
    if (!showWidget) return

    const interval = setInterval(() => {
      setRandomTooltip((prev) => {
        const currentIndex = TOOLTIP_MESSAGES.indexOf(prev)
        const nextIndex = (currentIndex + 1) % TOOLTIP_MESSAGES.length
        return TOOLTIP_MESSAGES[nextIndex]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [showWidget])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // TTS functions - DISABLED: Fish.audio API requires payment/credits
  // To enable: Add credits at https://fish.audio/app/developers
  /*
  const playTTS = async (text: string) => {
    if (!ttsEnabled || !text) return

    try {
      setIsSpeaking(true)

      // Stop any existing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        console.error('TTS failed:', await response.text())
        return
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      audio.onerror = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      await audio.play()
    } catch (error) {
      console.error('TTS error:', error)
      setIsSpeaking(false)
    }
  }

  const stopTTS = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsSpeaking(false)
  }
  */

  // Initialize with greeting when chat opens for the first time
  /* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isOpen && !hasInitialized && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: DEFAULT_GREETING,
        timestamp: new Date(),
      }])
      setHasInitialized(true)
      // Play TTS for greeting - DISABLED
      // setTimeout(() => playTTS(DEFAULT_GREETING), 500)
    }
  }, [isOpen, hasInitialized])
  /* eslint-enable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (!reader) throw new Error('No response body')

      // Add placeholder for assistant message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', timestamp: new Date() },
      ])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        assistantMessage += chunk

        // Update the last message with accumulated content
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: assistantMessage,
          }
          return updated
        })
      }

      // Play TTS when response is complete - DISABLED
      // if (assistantMessage) {
      //   await playTTS(assistantMessage)
      // }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't connect. Please try again or email tousif.cse.rymec@gmail.com",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickOption = (message: string) => {
    setInput(message)
    setTimeout(() => sendMessage(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Widget */}
      {showWidget && (
        <div className="chat-widget-wrap group relative">
          <motion.button
            data-chat-trigger
            className="chat-btn"
            onClick={isOpen ? onClose : onOpen}
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
              <div className="liquid-glass rounded-xl overflow-hidden flex flex-col h-[500px] max-h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-white font-display text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                      Mohammed's AI
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* TTS Toggle - DISABLED: Fish.audio API requires payment/credits */}
                    {/* To enable: Add credits at https://fish.audio/app/developers */}
                    {/*
                    <button
                      onClick={() => {
                        setTtsEnabled(!ttsEnabled)
                        if (!ttsEnabled) stopTTS()
                      }}
                      className={`p-1.5 rounded-lg transition-all ${
                        ttsEnabled
                          ? 'bg-white/10 text-white/80'
                          : 'bg-white/5 text-white/40'
                      }`}
                      title={ttsEnabled ? 'TTS enabled' : 'TTS disabled'}
                    >
                      {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>

                    {isSpeaking && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    */}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/60 text-sm mb-2">Hi! Ask me anything</p>
                      <p className="text-white/40 text-xs">About my work, projects, or technical background</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.role === 'user'
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-white/80'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {isLoading && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 rounded-lg px-3 py-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white/60"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white/60"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white/60"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Options */}
                {messages.length <= 4 && (
                  <div className="px-4 py-2 border-t border-white/10 shrink-0">
                    <p className="text-white/40 text-xs mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_OPTIONS.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => handleQuickOption(option.message)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 hover:text-white transition-all"
                          disabled={isLoading}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="px-4 py-3 border-t border-white/10 shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stop speaking button - DISABLED */}
                  {/*
                  {isSpeaking && (
                    <button
                      onClick={stopTTS}
                      className="mt-2 text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
                    >
                      <VolumeX className="w-3 h-3" />
                      Stop speaking
                    </button>
                  )}
                  */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
