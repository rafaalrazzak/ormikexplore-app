'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from "react-icons/fa";
import { FiSend, FiX, FiUser, FiMessageSquare } from "react-icons/fi";
import Image from 'next/image';
import { ormikAI } from '@/services/ormikAI'

interface Message {
     id: string
     content: string
     sender: 'user' | 'bot'
     timestamp: Date
}

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
     const messagesEndRef = useRef<HTMLDivElement>(null)
     const inputRef = useRef<HTMLInputElement>(null)

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
     }, [isOpen])

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

     const getAIResponse = async (userInput: string): Promise<string> => {
          try {
               return await ormikAI.generateResponse(userInput)
          } catch (error) {
               console.error('AI Response Error:', error)
               return 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat. 🙏\n\nUntuk informasi lengkap, silakan:\n• Baca guidebook di bagian Download\n• Hubungi panitia melalui kontak resmi\n• Tanyakan ke mentor atau kakak tingkat'
          }
     }

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
                              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
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

                              {/* Messages */}
                              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
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
