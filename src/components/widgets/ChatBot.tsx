'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from "react-icons/fa";
import { FiSend, FiX, FiUser, FiMessageSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from 'next/image';
import { ormikAI } from '@/services/ormikAI'

interface Message {
     id: string
     content: string
     sender: 'user' | 'bot'
     timestamp: Date
}

// Custom styles for better scrollbar support across browsers
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #f3f4f6;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 2px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  
  .custom-scrollbar-y {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #f3f4f6;
  }
  
  .custom-scrollbar-y::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar-y::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 3px;
  }
  
  .custom-scrollbar-y::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  
  .custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`

export default function ChatBot() {
     const [isOpen, setIsOpen] = useState(false)
     const [hasUnreadMessage, setHasUnreadMessage] = useState(true)
     const [messages, setMessages] = useState<Message[]>([
          {
               id: '1',
               content: 'Halo! Saya ZEERO 🤖\n\nSaya siap membantu menjawab pertanyaan tentang:\n• Jadwal kegiatan ORMIK\n• Divisi dan struktur organisasi\n• Panduan dan tata tertib\n• Lokasi dan fasilitas kampus\n• Tips mengikuti orientasi\n\nAda yang ingin ditanyakan?',
               sender: 'bot',
               timestamp: new Date()
          }
     ])
     const [inputValue, setInputValue] = useState('')
     const [isTyping, setIsTyping] = useState(false)
     const [showSuggestions, setShowSuggestions] = useState(true)
     const [aiMode, setAiMode] = useState<'auto' | 'keyword-only'>('auto')
     const [ollamaStatus, setOllamaStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown')
     const messagesEndRef = useRef<HTMLDivElement>(null)
     const inputRef = useRef<HTMLInputElement>(null)
     const scrollContainerRef = useRef<HTMLDivElement>(null)

     // Suggestion options for quick questions
     const suggestions = [
          { label: '📅 Jadwal ORMIK', query: 'jadwal kegiatan ORMIK' },
          { label: '👔 Dress Code', query: 'dress code ORMIK' },
          { label: '📋 Tata Tertib', query: 'tata tertib ORMIK' },
          { label: '🎒 Atribut', query: 'atribut yang harus dibawa' },
          { label: '📝 Tugas', query: 'tugas ORMIK' },
          { label: '📍 Lokasi', query: 'lokasi kampus' },
          { label: '📞 Kontak', query: 'kontak panitia' },
          { label: '💡 Tips', query: 'tips sukses ORMIK' }
     ]

     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
     }

     useEffect(() => {
          scrollToBottom()
     }, [messages])

     useEffect(() => {
          if (isOpen && inputRef.current) {
               inputRef.current.focus()
               setHasUnreadMessage(false)
          }
          // Reset suggestions when reopening chat if it's back to initial state
          if (isOpen && messages.length === 1) {
               setShowSuggestions(true)
          }
     }, [isOpen, messages.length])

     const handleSendMessage = async () => {
          if (!inputValue.trim()) return

          const userMessage: Message = {
               id: Date.now().toString(),
               content: inputValue.trim(),
               sender: 'user',
               timestamp: new Date()
          }

          setMessages(prev => [...prev, userMessage])
          setInputValue('')
          setIsTyping(true)
          setShowSuggestions(false) // Hide suggestions after first user message

          try {
               const response = await getAIResponse(userMessage.content)

               setTimeout(() => {
                    const botMessage: Message = {
                         id: (Date.now() + 1).toString(),
                         content: response,
                         sender: 'bot',
                         timestamp: new Date()
                    }
                    setMessages(prev => [...prev, botMessage])
                    setIsTyping(false)

                    if (!isOpen) {
                         setHasUnreadMessage(true)
                    }
               }, 1000 + Math.random() * 2000)
          } catch {
               setTimeout(() => {
                    const errorMessage: Message = {
                         id: (Date.now() + 1).toString(),
                         content: 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat. 🙏',
                         sender: 'bot',
                         timestamp: new Date()
                    }
                    setMessages(prev => [...prev, errorMessage])
                    setIsTyping(false)

                    if (!isOpen) {
                         setHasUnreadMessage(true)
                    }
               }, 1000)
          }
     }

     const handleSuggestionClick = (query: string) => {
          setInputValue(query)
          // Automatically send the suggestion
          setTimeout(() => {
               const userMessage: Message = {
                    id: Date.now().toString(),
                    content: query,
                    sender: 'user',
                    timestamp: new Date()
               }

               setMessages(prev => [...prev, userMessage])
               setInputValue('')
               setIsTyping(true)
               setShowSuggestions(false)

               getAIResponse(query).then(response => {
                    setTimeout(() => {
                         const botMessage: Message = {
                              id: (Date.now() + 1).toString(),
                              content: response,
                              sender: 'bot',
                              timestamp: new Date()
                         }
                         setMessages(prev => [...prev, botMessage])
                         setIsTyping(false)
                    }, 1000 + Math.random() * 1500)
               })
          }, 100)
     }

     const scrollSuggestions = (direction: 'left' | 'right') => {
          if (scrollContainerRef.current) {
               const scrollAmount = 150
               const currentScroll = scrollContainerRef.current.scrollLeft
               const newScroll = direction === 'left' 
                    ? currentScroll - scrollAmount 
                    : currentScroll + scrollAmount
               
               scrollContainerRef.current.scrollTo({
                    left: newScroll,
                    behavior: 'smooth'
               })
          }
     }

     const getAIResponse = async (userInput: string): Promise<string> => {
          try {
               // Check Ollama status periodically
               if (aiMode === 'auto') {
                    updateOllamaStatus()
               }
               
               if (aiMode === 'keyword-only') {
                    // Force keyword-only mode
                    return await ormikAI.getKeywordBasedResponse(userInput)
               } else {
                    // Use hybrid mode (auto)
                    return await ormikAI.generateResponse(userInput)
               }
          } catch (error) {
               console.error('AI Response Error:', error)
               return 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat. 🙏\n\nUntuk informasi lengkap, silakan:\n• Baca guidebook di bagian Download\n• Hubungi panitia melalui kontak resmi\n• Tanyakan ke mentor atau kakak tingkat'
          }
     }
     
     // Update Ollama status
     const updateOllamaStatus = async () => {
          try {
               const response = await fetch('/api/ai', { method: 'GET' })
               setOllamaStatus(response.ok ? 'healthy' : 'unhealthy')
          } catch {
               setOllamaStatus('unhealthy')
          }
     }
     
     // Check Ollama status on component mount
     useEffect(() => {
          updateOllamaStatus()
     }, [])

     // Function to format message with bold text
     const formatMessage = (content: string) => {
          const parts = content.split(/(\*\*.*?\*\*)/g)
          return parts.map((part, index) => {
               if (part.startsWith('**') && part.endsWith('**')) {
                    const boldText = part.slice(2, -2)
                    return <strong key={index} className="font-semibold">{boldText}</strong>
               }
               return part
          })
     }

     const handleKeyPress = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault()
               handleSendMessage()
          }
     }

     return (
          <>
               {/* Custom Scrollbar Styles */}
               <style jsx global>{scrollbarStyles}</style>
               
               {/* Chat Message Box - Separate from button */}
               <AnimatePresence>
                    {isOpen && (
                         <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 20, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 h-[32rem] sm:h-[36rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                         >
                              {/* Header */}
                              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex flex-col">
                                   <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                                                  <Image
                                                       src="/assets/maskot.svg"
                                                       alt="ZEERO Maskot"
                                                       width={24}
                                                       height={24}
                                                       className="w-6 h-6 object-contain"
                                                       onError={(e) => {
                                                            // Fallback to bot icon if maskot image fails
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            target.nextElementSibling?.classList.remove('hidden');
                                                       }}
                                                  />
                                                  <FaRobot className="w-5 h-5 hidden" />
                                             </div>
                                             <div>
                                                  <h3 className="font-semibold text-sm">ZEERO</h3>
                                                  <p className="text-xs opacity-90">AI Helper 🤖</p>
                                             </div>
                                        </div>
                                        <button
                                             onClick={() => setIsOpen(false)}
                                             className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                                        >
                                             <FiX className="w-5 h-5" />
                                        </button>
                                   </div>
                                   
                                   {/* AI Mode Toggle */}
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs">
                                             <span className="opacity-80">Mode:</span>
                                             <button
                                                  onClick={() => setAiMode(aiMode === 'auto' ? 'keyword-only' : 'auto')}
                                                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                                                       aiMode === 'auto' 
                                                            ? 'bg-white/20 text-white' 
                                                            : 'bg-white/10 text-white/70 hover:bg-white/15'
                                                  }`}
                                             >
                                                  {aiMode === 'auto' ? '🧠 Smart' : '⚡ Fast'}
                                             </button>
                                        </div>
                                        
                                        {/* Ollama Status Indicator */}
                                        {aiMode === 'auto' && (
                                             <div className="flex items-center gap-1 text-xs opacity-80">
                                                  <div className={`w-2 h-2 rounded-full ${
                                                       ollamaStatus === 'healthy' ? 'bg-green-400' :
                                                       ollamaStatus === 'unhealthy' ? 'bg-red-400' : 'bg-yellow-400'
                                                  }`} />
                                                  <span className="capitalize">{ollamaStatus}</span>
                                             </div>
                                        )}
                                   </div>
                              </div>

                              {/* Messages */}
                              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                   {/* Suggestion Chips */}
                                   {showSuggestions && messages.length === 1 && (
                                        <motion.div
                                             initial={{ opacity: 0, y: 10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: -10 }}
                                             className="mb-4"
                                        >
                                             <div className="text-xs text-gray-500 mb-2 px-1">💡 Pertanyaan Cepat:</div>
                                             <div 
                                                  className="flex flex-wrap gap-2 max-h-36 overflow-y-auto custom-scrollbar-y px-2 py-1"
                                             >
                                                  {suggestions.map((suggestion, index) => (
                                                       <motion.button
                                                            key={suggestion.label}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            onClick={() => handleSuggestionClick(suggestion.query)}
                                                            className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full px-3 py-2 text-xs text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                       >
                                                            {suggestion.label}
                                                       </motion.button>
                                                  ))}
                                             </div>
                                             {/* Scroll hint for desktop when many suggestions */}
                                             <div className="text-xs text-gray-400 text-center mt-2 hidden sm:block">
                                                  Klik pertanyaan di atas atau scroll untuk melihat semua opsi
                                             </div>
                                        </motion.div>
                                   )}

                                   {messages.map((message) => (
                                        <div
                                             key={message.id}
                                             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                             <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${message.sender === 'user'
                                                       ? 'bg-blue-600 text-white'
                                                       : 'bg-white shadow-sm'
                                                       }`}>
                                                       {message.sender === 'user' ? (
                                                            <FiUser className="w-3 h-3" />
                                                       ) : (
                                                            <>
                                                                 <Image
                                                                      src="/assets/maskot.svg"
                                                                      alt="ZEERO"
                                                                      width={16}
                                                                      height={16}
                                                                      className="w-4 h-4 object-contain"
                                                                      onError={(e) => {
                                                                           const target = e.target as HTMLImageElement;
                                                                           target.style.display = 'none';
                                                                           target.nextElementSibling?.classList.remove('hidden');
                                                                      }}
                                                                 />
                                                                 <FaRobot className="w-3 h-3 text-gray-600 hidden" />
                                                            </>
                                                       )}
                                                  </div>
                                                  <div className={`rounded-2xl px-4 py-3 text-sm ${message.sender === 'user'
                                                       ? 'bg-blue-600 text-white rounded-br-md'
                                                       : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                                                       }`}>
                                                       <div className="whitespace-pre-wrap leading-relaxed">
                                                            {formatMessage(message.content)}
                                                       </div>
                                                       <div className={`text-xs mt-2 opacity-70 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                            }`}>
                                                            {message.timestamp.toLocaleTimeString('id-ID', {
                                                                 hour: '2-digit',
                                                                 minute: '2-digit'
                                                            })}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   ))}

                                   {isTyping && (
                                        <div className="flex justify-start">
                                             <div className="flex gap-2 max-w-[85%]">
                                                  <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                       <Image
                                                            src="/assets/maskot.svg"
                                                            alt="ZEERO"
                                                            width={16}
                                                            height={16}
                                                            className="w-4 h-4 object-contain"
                                                            onError={(e) => {
                                                                 const target = e.target as HTMLImageElement;
                                                                 target.style.display = 'none';
                                                                 target.nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                       />
                                                       <FaRobot className="w-3 h-3 text-gray-600 hidden" />
                                                  </div>
                                                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                                       <div className="flex gap-1">
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   )}
                                   <div ref={messagesEndRef} />
                              </div>

                              {/* Input */}
                              <div className="p-4 border-t border-gray-200 bg-white">
                                   {/* Quick Suggestions Row */}
                                   {!showSuggestions && messages.length > 1 && !isTyping && (
                                        <div className="mb-3">
                                             <div className="relative">
                                                  {/* Scroll Left Button */}
                                                  <button
                                                       onClick={() => scrollSuggestions('left')}
                                                       className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 transition-colors hidden sm:block"
                                                  >
                                                       <FiChevronLeft className="w-4 h-4 text-gray-600" />
                                                  </button>

                                                  {/* Suggestions Container */}
                                                  <div 
                                                       ref={scrollContainerRef}
                                                       className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar px-8 sm:px-8"
                                                  >
                                                       {suggestions.slice(0, 6).map((suggestion) => (
                                                            <button
                                                                 key={suggestion.label}
                                                                 onClick={() => handleSuggestionClick(suggestion.query)}
                                                                 className="flex-shrink-0 bg-gray-100 hover:bg-blue-100 border border-gray-200 hover:border-blue-300 rounded-full px-3 py-1 text-xs text-gray-600 hover:text-blue-600 transition-all duration-200 whitespace-nowrap"
                                                            >
                                                                 {suggestion.label}
                                                            </button>
                                                       ))}
                                                  </div>

                                                  {/* Scroll Right Button */}
                                                  <button
                                                       onClick={() => scrollSuggestions('right')}
                                                       className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 transition-colors hidden sm:block"
                                                  >
                                                       <FiChevronRight className="w-4 h-4 text-gray-600" />
                                                  </button>
                                             </div>

                                             {/* Scroll hint */}
                                             <div className="text-xs text-gray-400 text-center mt-1">
                                                  <span className="sm:hidden">← Geser untuk melihat lebih banyak →</span>
                                                  <span className="hidden sm:inline">Gunakan tombol panah atau scroll mouse</span>
                                             </div>
                                        </div>
                                   )}

                                   <div className="flex gap-3">
                                        <input
                                             ref={inputRef}
                                             type="text"
                                             value={inputValue}
                                             onChange={(e) => setInputValue(e.target.value)}
                                             onKeyPress={handleKeyPress}
                                             placeholder="Tanya tentang ORMIK..."
                                             className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                             disabled={isTyping}
                                        />
                                        <button
                                             onClick={handleSendMessage}
                                             disabled={!inputValue.trim() || isTyping}
                                             className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                             <FiSend className="w-5 h-5" />
                                        </button>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Chat Button - Fixed position, separate from message box */}
               <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
               >
                    <AnimatePresence mode="wait">
                         {isOpen ? (
                              <motion.div
                                   key="close"
                                   initial={{ opacity: 0, rotate: -90 }}
                                   animate={{ opacity: 1, rotate: 0 }}
                                   exit={{ opacity: 0, rotate: 90 }}
                                   transition={{ duration: 0.2 }}
                              >
                                   <FiX className="w-6 h-6" />
                              </motion.div>
                         ) : (
                              <motion.div
                                   key="open"
                                   initial={{ opacity: 0, rotate: 90 }}
                                   animate={{ opacity: 1, rotate: 0 }}
                                   exit={{ opacity: 0, rotate: -90 }}
                                   transition={{ duration: 0.2 }}
                                   className="flex items-center justify-center w-full h-full"
                              >
                                   <FiMessageSquare className="w-6 h-6" />
                              </motion.div>
                         )}
                    </AnimatePresence>
               </motion.button>
          </>
     )
}
