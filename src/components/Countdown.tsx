"use client";
import { useState, useEffect } from 'react';
import { countdownData } from '@/data/ormikData';

interface TimeLeft {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
}

export default function Countdown() {
     const [timeLeft, setTimeLeft] = useState<TimeLeft>({
          days: 30,
          hours: 30,
          minutes: 30,
          seconds: 30
     });

     useEffect(() => {
          const calculateTimeLeft = () => {
               const difference = +new Date(countdownData.targetDate) - +new Date();

               if (difference > 0) {
                    setTimeLeft({
                         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                         minutes: Math.floor((difference / 1000 / 60) % 60),
                         seconds: Math.floor((difference / 1000) % 60)
                    });
               }
          };

          const timer = setInterval(calculateTimeLeft, 1000);
          calculateTimeLeft(); // Calculate immediately

          return () => clearInterval(timer);
     }, []);

     return (
          <div className="backdrop-blur-[10.2px] rounded-[10px] bg-white/5 p-3 lg:p-6 mx-auto max-w-[380px] lg:max-w-[600px]">
               {/* Countdown Numbers */}
               <div className="flex justify-center items-center gap-2 lg:gap-6 mb-2 lg:mb-4">
                    <div className="text-center">
                         <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 relative">
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.days.toString().padStart(2, '0')}
                              </div>
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.days.toString().padStart(2, '0')}
                              </div>
                         </div>
                         <p className="text-white text-[10px] lg:text-sm font-medium mt-1 lg:mt-2">Day</p>
                    </div>

                    <div className="text-center">
                         <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 relative">
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.hours.toString().padStart(2, '0')}
                              </div>
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.hours.toString().padStart(2, '0')}
                              </div>
                         </div>
                         <p className="text-white text-[10px] lg:text-sm font-medium mt-1 lg:mt-2">Hour</p>
                    </div>

                    <div className="text-center">
                         <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 relative">
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.minutes.toString().padStart(2, '0')}
                              </div>
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.minutes.toString().padStart(2, '0')}
                              </div>
                         </div>
                         <p className="text-white text-[10px] lg:text-sm font-medium mt-1 lg:mt-2">Minute</p>
                    </div>

                    <div className="text-center">
                         <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 relative">
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-[2px] lg:left-[5px] top-0 absolute flex items-center justify-center text-[midnightblue] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.seconds.toString().padStart(2, '0')}
                              </div>
                              <div className="w-[50px] h-[35px] lg:w-20 lg:h-11 left-0 top-0 absolute flex items-center justify-center text-[gold] text-[20px] lg:text-5xl font-bold font-['Poppins'] lg:leading-[62.50px]">
                                   {timeLeft.seconds.toString().padStart(2, '0')}
                              </div>
                         </div>
                         <p className="text-white text-[10px] lg:text-sm font-medium mt-1 lg:mt-2">Second</p>
                    </div>
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
