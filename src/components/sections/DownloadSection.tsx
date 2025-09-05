"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation, fadeInUp, slideInLeft } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import Footer from "./Footer";

export default function DownloadSection() {
     const { ref, isInView } = useScrollAnimation();
     const [showGuideBook, setShowGuideBook] = useState(false);

     const textShadow = {
          textShadow: "0 2px 8px rgba(0,0,0,0.35), 0 1px 1px rgba(0,0,0,0.15)",
     } as const;

     const handleGuideBookClick = () => {
          setShowGuideBook(true);
     };

     const handleCloseOverlay = () => {
          setShowGuideBook(false);
     };

     // Handle ESC key press
     useEffect(() => {
          const handleEscPress = (event: KeyboardEvent) => {
               if (event.key === 'Escape' && showGuideBook) {
                    handleCloseOverlay();
               }
          };

          if (showGuideBook) {
               document.addEventListener('keydown', handleEscPress);
               // Prevent body scroll when modal is open
               document.body.style.overflow = 'hidden';
          }

          return () => {
               document.removeEventListener('keydown', handleEscPress);
               document.body.style.overflow = 'unset';
          };
     }, [showGuideBook]);

     return (
          <motion.section
               className="relative pt-24 lg:pt-26 pb-8 lg:pb-10 overflow-hidden"
               id="explore-kit"
               ref={ref}
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : { opacity: 0 }}
               transition={{ duration: 0.8 }}
          >

               {/* Mascot positioned betwee1n download and footer with highest z-index */}
               <motion.div
                    className="absolute left-4 sm:left-6 md:left-8 lg:left-14 bottom-18 sm:bottom-30 md:bottom-32 lg:bottom-40 xl:bottom-32 z-[15]"
                    initial={slideInLeft.initial}
                    animate={isInView ? slideInLeft.animate : slideInLeft.initial}
                    transition={{ duration: 0.8, delay: 0.2 }}
               >
                    <div className="relative h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] md:h-[180px] md:w-[180px] lg:h-[220px] lg:w-[220px] xl:h-[320px] xl:w-[320px]">
                         <Image
                              src="/assets/maskot.svg"
                              alt="ORMIK Mascot"
                              fill
                              sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 180px, (max-width: 1280px) 220px, 320px"
                              className="object-contain drop-shadow-2xl"
                              priority
                         />
                    </div>
               </motion.div>

               <div className="space-y-6">
                    <div className="container mx-auto px-6 sm:px-8 md:px-20 lg:px-20 xl:px-12 relative z-10 space-y-6">
                         {/* Download Section Overlay */}
                         <motion.div
                              className="relative bg-white/18 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3 lg:px-4 lg:pt-4 lg:pb-3 border border-white/10 shadow-2xl"
                              initial={fadeInUp.initial}
                              animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                              transition={{ duration: 0.8, delay: 0.4 }}
                         >
                              <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 lg:flex-row lg:gap-8">
                                   {/* Left copy */}
                                   <div className="ml-0 w-full max-w-full space-y-2 text-left lg:ml-40 lg:max-w-lg xl:ml-56">
                                        <h2 className="font-['Poppins'] text-lg font-bold leading-tight text-white drop-shadow-lg sm:text-xl lg:text-xl xl:text-2xl">
                                             Hai, Explorers!!
                                        </h2>
                                        <div className="space-y-1">
                                             <p
                                                  className="font-['Poppins'] text-xs font-light leading-relaxed text-white sm:text-sm lg:text-sm xl:text-base"
                                                  style={textShadow}
                                             >
                                                  Kamu bisa download Guide Book, Twibbon Explorer di dalam yaaa!!!
                                             </p>
                                             <p
                                                  className="font-['Poppins'] text-xs font-medium text-white sm:text-sm lg:text-sm xl:text-base"
                                                  style={textShadow}
                                             >
                                                  Klik download →
                                             </p>
                                        </div>
                                   </div>

                                   {/* Right Content - Button Actions */}
                                   <div className="flex flex-row gap-1 sm:gap-4 justify-center items-center flex-shrink-0 w-60 lg:w-auto">
                                        {/* Guide Book Button */}
                                        <button
                                             className="relative group transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                                             onClick={handleGuideBookClick}
                                        >
                                             <div className="relative w-full sm:w-[160px] md:w-[180px] lg:w-[170px] xl:w-[190px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[70px] xl:h-[85px] rounded-lg overflow-hidden transition-all duration-300">
                                                  <Image
                                                       src="/assets/button/guide-book.svg"
                                                       alt="Guide Book"
                                                       fill
                                                       className="object-contain group-hover:brightness-110 transition-all duration-300"
                                                  />
                                             </div>
                                        </button>

                                        {/* Twibbon Explorers Button */}
                                        <button
                                             className="relative group transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                                             onClick={() => window.open('https://www.twibbonize.com/explorers-oe25', '_blank')}
                                        >
                                             <div className="relative w-full sm:w-[160px] md:w-[180px] lg:w-[170px] xl:w-[190px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] xl:h-[70px] rounded-lg overflow-hidden transition-all duration-300">
                                                  <Image
                                                       src="/assets/button/twibbon.svg"
                                                       alt="Twibbon Explorers"
                                                       fill
                                                       className="object-contain group-hover:brightness-110 transition-all duration-300"
                                                  />
                                             </div>
                                        </button>
                                   </div>
                              </div>
                         </motion.div>
                    </div>

                    <Footer />
               </div>

               {/* Guide Book Overlay */}
               <AnimatePresence>
                    {showGuideBook && (
                         <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="fixed inset-0 z-[9999] flex items-center justify-center"
                              onClick={handleCloseOverlay}
                         >
                              {/* Background with backdrop blur */}
                              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                              {/* Modal Content */}
                              <motion.div
                                   initial={{ scale: 0.98, opacity: 0, y: 20 }}
                                   animate={{ scale: 1, opacity: 1, y: 0 }}
                                   exit={{ scale: 0.98, opacity: 0, y: 20 }}
                                   transition={{ duration: 0.3, ease: "easeOut" }}
                                   className="relative bg-white/18 backdrop-blur-sm border border-white/20 shadow-2xl max-w-6xl w-full rounded 2xl p-4 flex flex-col px-4 h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]"
                                   style={{
                                        maxHeight: "100vh",
                                   }}
                                   onClick={(e) => e.stopPropagation()}
                              >
                                   {/* Header */}
                                   <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6 px-4 pt-4 sm:px-0 sm:pt-0">
                                        <div className="flex items-center gap-3">
                                             <div>
                                                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white font-['Poppins']">
                                                       Guide Book ORMIK
                                                  </h3>
                                                  <p className="text-xs sm:text-sm text-white-600 font-['Poppins']">
                                                       Panduan Lengkap ORMIK Explore 2025
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Close Button */}
                                        <button
                                             onClick={handleCloseOverlay}
                                             className="relative group p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                                        >
                                             <svg
                                                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                             >
                                                  <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       strokeWidth={2}
                                                       d="M6 18L18 6M6 6l12 12"
                                                  />
                                             </svg>
                                        </button>
                                   </div>

                                   {/* Iframe Container */}
                                   <div className="relative flex-1 w-full bg-gray-100 rounded-none sm:rounded-xl overflow-hidden">
                                        <div className="aspect-[4/3] w-full h-screen sm:h-auto">
                                             <iframe
                                                  src="https://drive.google.com/file/d/1dicryzEqjhbPcSGXx02x9t2ULLRTb7oT/preview"
                                                  className="w-full h-full border-0"
                                                  allow="autoplay"
                                                  title="Guide Book ORMIK Explore 2025"
                                             />
                                        </div>
                                   </div>

                              </motion.div>
                         </motion.div>
                    )}
               </AnimatePresence>

          </motion.section>
     );
}
