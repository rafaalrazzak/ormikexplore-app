"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
     onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
     const [progress, setProgress] = useState(0);
     const [loadingText, setLoadingText] = useState('Memuat Assets...');
     const [isVisible, setIsVisible] = useState(true); useEffect(() => {
          let loadedCount = 0;
          let messageIndex = 0;

          // Critical assets to preload - moved inside useEffect to satisfy dependency array
          const criticalAssets = [
               '/assets/logo-ormik.svg',
               '/assets/READY TO EXPLORE.svg',
               '/assets/background/bg-horizontal.png',
               '/assets/background/bg-vertical.png',
               '/assets/background/bg-yellow.png',
               '/assets/background/bg-road-vertical.svg',
               '/assets/background/building/center.png',
               '/assets/background/building/left.png',
               '/assets/background/building/right.png',
               '/assets/background/building/road.png',
               '/assets/decorative/radar.png',
               '/assets/cloud.png',
               '/assets/cloud-right.png',
               '/assets/hexagonal.png',
               '/assets/maskot.svg',
               '/assets/kerumunan.png',
               '/assets/heading/ourlogo.svg',
               '/assets/heading/ormik.svg',
               '/assets/heading/orientasi-akademik.svg',
               '/assets/heading/ormik-explore.svg',
               '/assets/heading/campus-a.svg',
               '/assets/heading/campus-b.svg',
               '/assets/heading/download.svg',
               '/assets/campus/campus-b.svg',
               '/assets/members/sc.png'
          ];

          const loadingMessages = [
               'Memuat Assets...',
               'Menyiapkan Maskot...',
               'Mengatur Background...',
               'Memuat Logo ORMIK...',
               'Persiapan Campus Explore...',
               'Hampir Selesai...'
          ];

          // Change loading message periodically
          const messageInterval = setInterval(() => {
               messageIndex = (messageIndex + 1) % loadingMessages.length;
               setLoadingText(loadingMessages[messageIndex]);
          }, 800);

          // Preload images
          const preloadImage = (src: string): Promise<void> => {
               return new Promise((resolve) => {
                    const img = new window.Image();
                    img.onload = () => {
                         loadedCount++;
                         const progressValue = Math.min((loadedCount / criticalAssets.length) * 100, 95);
                         setProgress(progressValue);
                         resolve();
                    };
                    img.onerror = () => {
                         loadedCount++;
                         const progressValue = Math.min((loadedCount / criticalAssets.length) * 100, 95);
                         setProgress(progressValue);
                         resolve(); // Continue even if some images fail
                    };
                    img.src = src;
               });
          };          // Start preloading
          Promise.all(criticalAssets.map(preloadImage))
               .then(() => {
                    setProgress(100);
                    setLoadingText('Siap Untuk Explore!');

                    // Small delay before hiding
                    setTimeout(() => {
                         setIsVisible(false);
                         setTimeout(onLoadingComplete, 800); // Wait for fade out animation
                    }, 500);
               })
               .catch(() => {
                    // Even if some assets fail, continue
                    setProgress(100);
                    setLoadingText('Siap Untuk Explore!');
                    setTimeout(() => {
                         setIsVisible(false);
                         setTimeout(onLoadingComplete, 800);
                    }, 500);
               });

          return () => {
               clearInterval(messageInterval);
          };
     }, [onLoadingComplete]);

     return (
          <AnimatePresence>
               {isVisible && (
                    <motion.div
                         initial={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.8, ease: "easeInOut" }}
                         className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden"
                    >
                         {/* Background */}
                         <div className="absolute inset-0">
                              <Image
                                   src="/assets/background/bg-horizontal.png"
                                   alt=""
                                   fill
                                   className="object-cover"
                                   priority
                              />
                         </div>

                         {/* Animated Background Elements */}
                         <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 2, ease: "easeOut" }}
                         >
                              {/* Rotating radar in background */}
                              <motion.div
                                   className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[50%] lg:w-[40%] opacity-20"
                                   animate={{ rotate: 360 }}
                                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              >
                                   <Image
                                        src="/assets/decorative/radar.png"
                                        alt=""
                                        width={800}
                                        height={800}
                                        className="w-full h-auto"
                                   />
                              </motion.div>

                              {/* Floating clouds */}
                              <motion.div
                                   className="absolute top-[20%] left-[15%] w-20 md:w-32 opacity-60"
                                   animate={{ y: [-10, 10, -10] }}
                                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              >
                                   <Image src="/assets/cloud.png" alt="" width={128} height={64} className="w-full h-auto" />
                              </motion.div>

                              <motion.div
                                   className="absolute top-[15%] right-[15%] w-16 md:w-28 opacity-60"
                                   animate={{ y: [10, -10, 10] }}
                                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              >
                                   <Image src="/assets/cloud-right.png" alt="" width={112} height={56} className="w-full h-auto" />
                              </motion.div>

                              {/* Hexagonal elements */}
                              <motion.div
                                   className="absolute bottom-[20%] left-[10%] w-16 md:w-24 opacity-40"
                                   animate={{ rotate: [0, 360] }}
                                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              >
                                   <Image src="/assets/hexagonal.png" alt="" width={96} height={96} className="w-full h-auto" />
                              </motion.div>

                              <motion.div
                                   className="absolute bottom-[25%] right-[10%] w-16 md:w-24 opacity-40"
                                   animate={{ rotate: [360, 0] }}
                                   transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                              >
                                   <Image src="/assets/hexagonal.png" alt="" width={96} height={96} className="w-full h-auto" />
                              </motion.div>
                         </motion.div>

                         {/* Main Loading Content */}
                         <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
                              {/* ORMIK Logo */}
                              <motion.div
                                   initial={{ scale: 0, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   transition={{ duration: 0.8, ease: "easeOut" }}
                                   className="mb-8"
                              >
                                   <Image
                                        src="/assets/logo-ormik.svg"
                                        alt="ORMIK Logo"
                                        width={120}
                                        height={120}
                                        className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                                   />
                              </motion.div>

                              {/* Loading Text */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                   className="mb-8"
                              >
                                   <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-['Poppins'] mb-2">
                                        ORMIK EXPLORE 2025
                                   </h1>
                                   <motion.p
                                        key={loadingText}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-sm md:text-base text-white/90 font-['Poppins']"
                                   >
                                        {loadingText}
                                   </motion.p>
                              </motion.div>

                              {/* Progress Bar */}
                              <motion.div
                                   initial={{ width: 0, opacity: 0 }}
                                   animate={{ width: '100%', opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                   className="w-full max-w-xs mx-auto mb-6"
                              >
                                   <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                             className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                             initial={{ width: '0%' }}
                                             animate={{ width: `${progress}%` }}
                                             transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                   </div>
                                   <div className="mt-2 text-center">
                                        <span className="text-white/80 text-sm font-['Poppins']">
                                             {Math.round(progress)}%
                                        </span>
                                   </div>
                              </motion.div>

                              {/* Bouncing Mascot */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                                   className="relative"
                              >
                                   <motion.div
                                        animate={{ y: [-5, 5, -5] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                   >
                                        <Image
                                             src="/assets/maskot.svg"
                                             alt="ORMIK Mascot"
                                             width={80}
                                             height={80}
                                             className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
                                        />
                                   </motion.div>
                              </motion.div>

                              {/* Loading Spinner */}
                              {progress < 100 && (
                                   <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                                   >
                                        <motion.div
                                             animate={{ rotate: 360 }}
                                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                             className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                   </motion.div>
                              )}
                         </div>

                         {/* Success Animation */}
                         {progress === 100 && (
                              <motion.div
                                   initial={{ scale: 0, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   transition={{ duration: 0.5, ease: "easeOut" }}
                                   className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                              >
                                   <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: 2 }}
                                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                                   >
                                        <motion.svg
                                             initial={{ pathLength: 0 }}
                                             animate={{ pathLength: 1 }}
                                             transition={{ duration: 0.5, delay: 0.2 }}
                                             className="w-5 h-5 text-white"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth={2}
                                             viewBox="0 0 24 24"
                                        >
                                             <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </motion.svg>
                                   </motion.div>
                              </motion.div>
                         )}
                    </motion.div>
               )}
          </AnimatePresence>
     );
};

export default LoadingScreen;
