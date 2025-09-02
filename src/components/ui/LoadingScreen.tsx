"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AssetCache from '@/utils/assetCache';

interface LoadingScreenProps {
     onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
     const [progress, setProgress] = useState(0);
     const [loadingText, setLoadingText] = useState('Preparing Exploration System...');
     const [isVisible, setIsVisible] = useState(true);
     const [isCacheValid, setIsCacheValid] = useState(false);

     useEffect(() => {
          // Debug cache info
          console.log('Asset Cache Info:', AssetCache.getInfo());

          // Check if assets are already cached
          const cacheValid = AssetCache.isValid();
          setIsCacheValid(cacheValid);

          if (cacheValid) {
               // If cache is valid, skip loading and show quick success animation
               setLoadingText('Preparing Exploration System...');
               setProgress(90);

               setTimeout(() => {
                    setProgress(100);
                    setLoadingText('Ready to Explore!');

                    setTimeout(() => {
                         setIsVisible(false);
                         setTimeout(onLoadingComplete, 300); // Finish faster
                    }, 800);
               }, 500);

               return;
          }

          let messageIndex = 0;

          // Critical assets to preload - moved inside useEffect to satisfy dependency array
          const criticalAssets = [
               // Core/Essential Assets
               '/assets/logo-ormik.svg',
               '/assets/maskot.svg',
               
               // Background Assets (High Priority)
               '/assets/background/bg-horizontal.png',
               '/assets/background/bg-yellow.png',
               '/assets/background/building/center.png',
               '/assets/background/building/left.png',
               '/assets/background/building/right.png',
               '/assets/background/building/road.png',
               
               // Decorative Elements (Medium Priority)
               '/assets/decorative/radar.svg',
               '/assets/decorative/iconexplore.svg',
               '/assets/cloud.png',
               '/assets/cloud-right.png',
               '/assets/hexagonal.png',
               
               // Hero Section Assets
               '/assets/heading/ready-to-explore.svg',
               '/icons/ri_arrow-up-line.svg',
               
               // About Section Assets
               '/assets/heading/ourlogo.svg',
               '/assets/heading/ormik.svg',
               '/assets/heading/orientasi-akademik.svg',
               '/assets/heading/ormik-explore.svg',
               '/assets/abouts-tags.svg',
               '/assets/kerumunan.png',
               '/assets/ticket.svg',
               '/assets/logo-variations.svg',
               
               // Campus Explore Assets
               '/assets/heading/campus-a.svg',
               '/assets/heading/campus-b.svg',
               '/assets/campus/campus-b.svg',
               
               // Download Section Assets
               '/assets/button/guide-book.svg',
               '/assets/button/twibbon.svg',
               
               // Core Team Assets (Essential Members Only)
               '/assets/members/SC.png',
               '/assets/members/PO.png',
               '/assets/members/SEKRE.png',
               '/assets/members/BENDAHARA.png',
               '/assets/members/PR.png',
               '/assets/members/LO.png',
               '/assets/members/EVENT.png',
               '/assets/members/MEDIA.png',
               '/assets/members/KREATIF.png',
               '/assets/members/KEDIS.png',
               '/assets/members/MENTOR.png',
               '/assets/members/LOGISTIK.png',
               '/assets/members/KONSUM.png',
               '/assets/members/MEDIS.png',
               '/assets/members/IT_SUPPORT.png'
          ];

          const loadingMessages = [
               'Initializing Orientation Protocol...',
               'Welcome, New Explorer!',
               'Calibrating Navigation Systems...',
               'Syncing ORMIK Mainframe...',
               'Preparing Virtual Runway...',
               'Loading Crew Manifest...',
               'Activating Download Terminal...',
               'Configuring Interface Controls...',
               'Storing Assets in Memory Bank...',
               'Final Systems Check...'
          ];

          // Change loading message periodically
          const messageInterval = setInterval(() => {
               messageIndex = (messageIndex + 1) % loadingMessages.length;
               setLoadingText(loadingMessages[messageIndex]);
          }, 800);

          // Start preloading with AssetCache utility
          AssetCache.preloadAssets(criticalAssets, (progressValue) => {
               setProgress(Math.min(progressValue, 95));
          })
               .then((success) => {
                    if (success) {
                         // Save successful load to cache
                         AssetCache.save(criticalAssets);
                    }

                    setProgress(100);
                    setLoadingText('Runway Ready, Happy Exploring!');

                    // Small delay before hiding
                    setTimeout(() => {
                         setIsVisible(false);
                         setTimeout(onLoadingComplete, 800); // Wait for fade out animation
                    }, 500);
               })
               .catch(() => {
                    // Even if some assets fail, continue
                    setProgress(100);
                    setLoadingText('Runway Ready, Happy Exploring!');
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
                                   className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[50%] lg:w-[40%] opacity-80"
                                   animate={{ rotate: 360 }}
                                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              >
                                   <Image
                                        src="/assets/decorative/radar.svg"
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
                                   {/* Cache indicator */}
                                   {isCacheValid && (
                                        <motion.div
                                             initial={{ opacity: 0, scale: 0.8 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             transition={{ duration: 0.5, delay: 0.2 }}
                                             className="mt-2 flex items-center justify-center gap-2"
                                        >
                                             {/* <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                             <span className="text-xs text-green-300 font-['Poppins']">
                                                  Assets Tersimpan
                                             </span> */}
                                        </motion.div>
                                   )}
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
                         {/* {progress === 100 && (
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
                         )} */}
                    </motion.div>
               )}
          </AnimatePresence>
     );
};

export default LoadingScreen;
