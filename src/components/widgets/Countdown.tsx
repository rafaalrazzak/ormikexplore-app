"use client";
import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { countdownData } from '@/data/ormikData';

interface TimeLeft {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
}


export default function Countdown() {
     const [timeLeft, setTimeLeft] = useState<TimeLeft>({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
     });
     const [animated, setAnimated] = useState(true);
     const [isCountdownFinished, setIsCountdownFinished] = useState(false);
     const [showCelebration, setShowCelebration] = useState(false);

     useEffect(() => {
          const calculateTimeLeft = () => {
               const difference = +new Date(countdownData.targetDate) - +new Date();
               if (difference > 0) {
                    return {
                         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                         minutes: Math.floor((difference / 1000 / 60) % 60),
                         seconds: Math.floor((difference / 1000) % 60)
                    };
               }
               return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          };

          // Animate from 0 to target on mount
          const target = calculateTimeLeft();

          // Check if countdown is finished
          if (target.days === 0 && target.hours === 0 && target.minutes === 0 && target.seconds === 0) {
               setIsCountdownFinished(true);
               setShowCelebration(true);
               setTimeout(() => setShowCelebration(false), 5000); // Hide celebration after 5 seconds
          }

          let frame: number;
          let start: number | null = null;
          const duration = 900; // ms
          function animateCountUp(ts: number) {
               if (start === null) start = ts;
               const progress = Math.min((ts - start) / duration, 1);
               setTimeLeft({
                    days: Math.floor(target.days * progress),
                    hours: Math.floor(target.hours * progress),
                    minutes: Math.floor(target.minutes * progress),
                    seconds: Math.floor(target.seconds * progress),
               });
               if (progress < 1) {
                    frame = requestAnimationFrame(animateCountUp);
               } else {
                    setTimeLeft(target);
                    setAnimated(false); // animasi selesai
               }
          }
          frame = requestAnimationFrame(animateCountUp);

          return () => {
               cancelAnimationFrame(frame);
          };
     }, []);

     // Setelah animasi selesai, update countdown secara biasa tanpa animasi
     useEffect(() => {
          if (!animated) {
               const calculateTimeLeft = () => {
                    const difference = +new Date(countdownData.targetDate) - +new Date();
                    if (difference > 0) {
                         return {
                              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                              minutes: Math.floor((difference / 1000 / 60) % 60),
                              seconds: Math.floor((difference / 1000) % 60)
                         };
                    }
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
               };
               const timer = setInterval(() => {
                    const newTimeLeft = calculateTimeLeft();
                    setTimeLeft(newTimeLeft);

                    // Check if countdown just finished
                    if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                         setIsCountdownFinished(true);
                         setShowCelebration(true);
                         setTimeout(() => setShowCelebration(false), 5000);
                    }
               }, 1000);
               return () => clearInterval(timer);
          }
     }, [animated]);

     return (
          <div className={`backdrop-blur-[10.2px] rounded-[10px] lg:rounded-[12px] bg-white/5 p-3 md:p-4 lg:p-5 xl:p-6 mx-auto max-w-[380px] md:max-w-[480px] lg:max-w-[600px] xl:max-w-[650px] relative overflow-hidden transition-all duration-1000 ${isCountdownFinished ? 'bg-gradient-to-r from-gold/20 via-accent/20 to-gold/20' : ''}`}>

               {/* Celebration Effects */}
               <AnimatePresence>
                    {showCelebration && (
                         <>
                              {/* Confetti Effect */}
                              <div className="absolute inset-0 pointer-events-none z-10">
                                   {[...Array(20)].map((_, i) => (
                                        <motion.div
                                             key={`confetti-${i}`}
                                             initial={{
                                                  y: -20,
                                                  x: Math.random() * 400 - 200,
                                                  rotate: 0,
                                                  scale: 0
                                             }}
                                             animate={{
                                                  y: 400,
                                                  x: Math.random() * 400 - 200,
                                                  rotate: 360,
                                                  scale: 1
                                             }}
                                             exit={{ opacity: 0 }}
                                             transition={{
                                                  duration: 3 + Math.random() * 2,
                                                  delay: Math.random() * 2,
                                                  ease: "easeOut"
                                             }}
                                             className={`absolute w-2 h-2 ${i % 3 === 0 ? 'bg-gold' : i % 3 === 1 ? 'bg-accent' : 'bg-white'} rounded-full`}
                                             style={{
                                                  left: '50%',
                                                  top: '10%'
                                             }}
                                        />
                                   ))}
                              </div>

                              {/* Pulse Effect */}
                              <motion.div
                                   initial={{ scale: 1, opacity: 0.5 }}
                                   animate={{ scale: 1.1, opacity: 0 }}
                                   exit={{ opacity: 0 }}
                                   transition={{ duration: 2, repeat: Infinity }}
                                   className="absolute inset-0 bg-gradient-to-r from-gold/30 via-accent/30 to-gold/30 rounded-[10px] lg:rounded-[12px]"
                              />
                         </>
                    )}
               </AnimatePresence>

               {/* Countdown Numbers */}
               <div className="flex justify-center items-center gap-2 md:gap-4 lg:gap-6 xl:gap-7 mb-3 md:mb-4 lg:mb-5 relative z-5">
                    {/* Animated Number Counter hanya saat animasi awal */}
                    {[
                         { label: 'Day', value: timeLeft.days },
                         { label: 'Hour', value: timeLeft.hours },
                         { label: 'Minute', value: timeLeft.minutes },
                         { label: 'Second', value: timeLeft.seconds },
                    ].map((item) => (
                         <div className="text-center" key={item.label}>
                              <motion.div
                                   className="w-[50px] h-[35px] md:w-[65px] md:h-[45px] lg:w-[80px] lg:h-[55px] xl:w-[90px] xl:h-[60px] relative overflow-hidden"
                                   animate={isCountdownFinished ? {
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                   } : {}}
                                   transition={{ duration: 0.6, repeat: isCountdownFinished ? Infinity : 0, repeatDelay: 1 }}
                              >
                                   {animated ? (
                                        <AnimatePresence initial={false} mode="wait">
                                             <motion.div
                                                  key={item.value}
                                                  initial={{ y: 30, opacity: 0 }}
                                                  animate={{ y: 0, opacity: 1 }}
                                                  exit={{ y: -30, opacity: 0 }}
                                                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                                                  className={`w-[50px] h-[35px] md:w-[65px] md:h-[45px] lg:w-[80px] lg:h-[55px] xl:w-[90px] xl:h-[60px] left-[2px] md:left-[3px] lg:left-[4px] xl:left-[5px] top-0 absolute flex items-center justify-center font-bold font-['Poppins'] leading-tight ${isCountdownFinished ? 'text-gold animate-pulse' : 'text-[midnightblue]'} text-[20px] md:text-[26px] lg:text-[36px] xl:text-[42px]`}
                                             >
                                                  {item.value.toString().padStart(2, '0')}
                                             </motion.div>
                                        </AnimatePresence>
                                   ) : (
                                        <div className={`w-[50px] h-[35px] md:w-[65px] md:h-[45px] lg:w-[80px] lg:h-[55px] xl:w-[90px] xl:h-[60px] left-[2px] md:left-[3px] lg:left-[4px] xl:left-[5px] top-0 absolute flex items-center justify-center font-bold font-['Poppins'] leading-tight ${isCountdownFinished ? 'text-gold animate-pulse' : 'text-[midnightblue]'} text-[20px] md:text-[26px] lg:text-[36px] xl:text-[42px]`}>
                                             {item.value.toString().padStart(2, '0')}
                                        </div>
                                   )}
                                   <div className="w-[50px] h-[35px] md:w-[65px] md:h-[45px] lg:w-[80px] lg:h-[55px] xl:w-[90px] xl:h-[60px] left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] md:text-[26px] lg:text-[36px] xl:text-[42px] font-bold font-['Poppins'] leading-tight pointer-events-none select-none">
                                        {item.value.toString().padStart(2, '0')}
                                   </div>
                              </motion.div>
                              <p className={`font-medium mt-1 md:mt-1.5 lg:mt-2 text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] ${isCountdownFinished ? 'text-gold animate-pulse' : 'text-white'}`}>{item.label}</p>
                         </div>
                    ))}
               </div>

               {/* Countdown Title */}
               <div className="text-center relative z-5">
                    {isCountdownFinished ? (
                         <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                         >
                              <h3 className="text-gold text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px] font-bold animate-pulse mb-2">
                                   🎉 ORMIK EXPLORE 2025 HAS STARTED! 🎉
                              </h3>
                              <p className="text-white text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-medium">
                                   Welcome to ORMIK Explore MABA 2025!
                              </p>
                         </motion.div>
                    ) : (
                         <h3 className="text-white text-[14px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-bold">
                              {countdownData.title}
                         </h3>
                    )}
               </div>
          </div>
     );
}
