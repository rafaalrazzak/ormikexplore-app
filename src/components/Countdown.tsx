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
                    setTimeLeft(calculateTimeLeft());
               }, 1000);
               return () => clearInterval(timer);
          }
     }, [animated]);

     return (
          <div className="backdrop-blur-[10.2px] rounded-[10px] bg-white/5 p-3 lg:p-6 mx-auto max-w-[380px] lg:max-w-[600px]">
               {/* Countdown Numbers */}
               <div className="flex justify-center items-center gap-2 lg:gap-6 mb-2 lg:mb-4">
                    {/* Animated Number Counter hanya saat animasi awal */}
                    {[
                         { label: 'Day', value: timeLeft.days },
                         { label: 'Hour', value: timeLeft.hours },
                         { label: 'Minute', value: timeLeft.minutes },
                         { label: 'Second', value: timeLeft.seconds },
                    ].map((item) => (
                         <div className="text-center" key={item.label}>
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 relative overflow-hidden">
                                   {animated ? (
                                        <AnimatePresence initial={false} mode="wait">
                                             <motion.div
                                                  key={item.value}
                                                  initial={{ y: 30, opacity: 0 }}
                                                  animate={{ y: 0, opacity: 1 }}
                                                  exit={{ y: -30, opacity: 0 }}
                                                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                                                  className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]"
                                             >
                                                  {item.value.toString().padStart(2, '0')}
                                             </motion.div>
                                        </AnimatePresence>
                                   ) : (
                                        <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                             {item.value.toString().padStart(2, '0')}
                                        </div>
                                   )}
                                   <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px] pointer-events-none select-none">
                                        {item.value.toString().padStart(2, '0')}
                                   </div>
                              </div>
                              <p className="text-white text-[10px] lg:text-sm font-medium mt-1 lg:mt-2">{item.label}</p>
                         </div>
                    ))}
               </div>

               {/* Countdown Title */}
               <div className="text-center">
                    <h3 className="text-white text-[14px] lg:text-xl font-bold">
                         {countdownData.title}
                    </h3>
               </div>
          </div>
     );
}
