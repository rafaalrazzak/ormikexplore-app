"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getMaintenanceConfig, getMaintenanceTimeRemaining, getMaintenanceEndTime } from "@/utils/maintenance";


interface TimeRemaining {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
}
export default function MaintenancePage() {
     const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
     const [maintenanceMessage, setMaintenanceMessage] = useState<string>(getMaintenanceConfig().message || "");
     const [endTime, setEndTime] = useState<Date | null>(getMaintenanceEndTime());
     const [progress, setProgress] = useState<number>(0);
     const [startTime, setStartTime] = useState<Date | null>(null);

     useEffect(() => {
          // Initial calculation
          setTimeRemaining(getMaintenanceTimeRemaining());
          setMaintenanceMessage(getMaintenanceConfig().message || "");
          setEndTime(getMaintenanceEndTime());

          // Cari waktu mulai maintenance (dari localStorage, atau asumsikan waktu sekarang jika belum ada)
          let initialStart = null;
          if (typeof window !== "undefined") {
               const stored = window.localStorage.getItem("maintenanceStartTime");
               if (stored) initialStart = new Date(stored);
          }
          if (!initialStart && getMaintenanceEndTime()) {
               // Asumsikan maintenance dimulai saat user pertama kali buka page
               initialStart = new Date();
               if (typeof window !== "undefined") {
                    window.localStorage.setItem("maintenanceStartTime", initialStart.toISOString());
               }
          }
          setStartTime(initialStart);

          const interval = setInterval(() => {
               setTimeRemaining(getMaintenanceTimeRemaining());
               setMaintenanceMessage(getMaintenanceConfig().message || "");
               setEndTime(getMaintenanceEndTime());

               // Progress calculation
               const end = getMaintenanceEndTime();
               let start = initialStart;
               if (!start && end) {
                    start = new Date(end.getTime() - 60 * 60 * 1000); // fallback: 1 jam sebelum end
               }
               if (end && start) {
                    const now = new Date();
                    const total = end.getTime() - start.getTime();
                    const done = now.getTime() - start.getTime();
                    let percent = Math.max(0, Math.min(100, (done / total) * 100));
                    if (now > end) percent = 100;
                    setProgress(percent);
               } else {
                    setProgress(75); // fallback
               }
          }, 1000);
          return () => clearInterval(interval);
     }, []);
     return (
          <div className="relative min-h-screen overflow-hidden bg-primary">
               {/* Background Image */}
               <div className="absolute inset-0 z-[background]">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="object-cover object-center"
                         priority
                    />
               </div>

               {/* Decorative Background Elements */}
               <div className="absolute inset-0 pointer-events-none">
                    {/* Radar SVG - Center */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[50%] lg:w-[40%] z-[-1]">
                         <Image
                              src="/assets/decorative/radar.png"
                              alt="Radar"
                              width={800}
                              height={800}
                              className="w-full h-auto"
                         />
                    </div>

                    {/* Clouds */}
                    <div className="absolute top-[20%] left-[10%] w-[60px] md:w-[80px] lg:w-[100px] z-[2] opacity-70">
                         <Image src="/assets/cloud.png" alt="cloud" width={100} height={40} className="w-full h-auto animate-pulse" />
                    </div>
                    <div className="absolute top-[30%] right-[15%] w-[50px] md:w-[70px] lg:w-[90px] z-[2] opacity-70">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={90} height={40} className="w-full h-auto animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    <div className="absolute bottom-[20%] left-[20%] w-[70px] md:w-[90px] lg:w-[120px] z-[2] opacity-60 -rotate-12">
                         <Image src="/assets/cloud.png" alt="cloud" width={120} height={50} className="w-full h-auto animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>
                    <div className="absolute bottom-[25%] right-[10%] w-[65px] md:w-[85px] lg:w-[110px] z-[2] opacity-60 rotate-12">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={110} height={45} className="w-full h-auto animate-pulse" style={{ animationDelay: '3s' }} />
                    </div>

                    {/* Hexagonal elements */}
                    <div className="absolute top-[60%] left-[5%] w-[80px] md:w-[120px] lg:w-[150px] z-[1] -rotate-12 opacity-40">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={150} height={60} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[70%] right-[8%] w-[75px] md:w-[110px] lg:w-[140px] z-[1] rotate-12 opacity-40">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={140} height={55} className="w-full h-auto" />
                    </div>
               </div>

               {/* Content */}
               <div className="relative z-content max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center h-full text-center overflow-hidden">
                    {/* Logo */}
                    <motion.div 
                         className=""
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    >
                         <Image
                              src="/assets/logo-ormik.svg"
                              alt="ORMIK 2025"
                              width={150}
                              height={150}
                              className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[140px] lg:h-[140px]"
                         />
                    </motion.div>

                    {/* Maintenance Content */}
                    <motion.div 
                         className="backdrop-blur-[15px] rounded-[16px] lg:rounded-[20px] bg-white/10 p-4 md:p-6 lg:p-8 border border-white/20 shadow-2xl max-w-2xl w-full"
                         initial={{ y: 50, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.8, delay: 0.3 }}
                    >
                         {/* Maintenance Icon */}
                         <motion.div 
                              className="mb-4"
                              animate={{ 
                                   rotate: [0, 10, -10, 0],
                                   scale: [1, 1.05, 1]
                              }}
                              transition={{ 
                                   duration: 2,
                                   repeat: Infinity,
                                   ease: "easeInOut"
                              }}
                         >
                              <div className="w-14 h-14 md:w-18 md:h-18 mx-auto rounded-full flex items-center justify-center">
                                   <Image
                                        src="/icons/sand-clock.svg"
                                        alt="Maintenance Icon"
                                        fill
                                   />
                              </div>
                         </motion.div>

                         {/* Title */}
                         <motion.h1 
                              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-['Poppins']"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                         >
                              Website Sedang Maintenance
                         </motion.h1>

                         {/* Description */}
                         <motion.div 
                              className="space-y-3 mb-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.7 }}
                         >
                              <p className="text-white/90 text-base md:text-lg font-medium font-['Poppins']">
                                   Halo <span className="text-[gold] font-semibold">Explorers!</span>
                              </p>
                              <p className="text-white/80 text-sm md:text-base leading-relaxed font-['Poppins']">
                                   {maintenanceMessage || "Website ORMIK EXPLORE 2025 sedang dalam proses maintenance untuk memberikan pengalaman yang lebih baik. Kami akan segera kembali!"}
                              </p>
                         </motion.div>

                         {/* Countdown Timer (if end time is available) */}
                         {timeRemaining && (
                              <motion.div 
                                   className="mb-6"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 0.8 }}
                              >
                                   <h3 className="text-white/90 text-sm md:text-base font-medium font-['Poppins'] mb-3 text-center">
                                        Estimasi selesai maintenance:
                                   </h3>
                                   <div className="flex justify-center items-center gap-2 md:gap-3">
                                        {[ 
                                             { label: 'Hari', value: timeRemaining.days },
                                             { label: 'Jam', value: timeRemaining.hours },
                                             { label: 'Menit', value: timeRemaining.minutes },
                                             { label: 'Detik', value: timeRemaining.seconds },
                                        ].map((item) => (
                                             <div key={item.label} className="text-center">
                                                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                                       <span className="text-[gold] text-base md:text-lg font-bold font-['Poppins']">
                                                            {item.value.toString().padStart(2, '0')}
                                                       </span>
                                                  </div>
                                                  <p className="text-white/70 text-xs md:text-sm font-medium mt-1 font-['Poppins']">
                                                       {item.label}
                                                  </p>
                                             </div>
                                        ))}
                                   </div>
                              </motion.div>
                         )}

                         {/* Animated Progress Bar */}
                         <motion.div 
                              className="mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.9 }}
                         >
                              <div className="flex items-center justify-between mb-2">
                                   <span className="text-white/80 text-sm font-medium font-['Poppins']">Progress</span>
                                   <span className="text-[gold] text-sm font-semibold font-['Poppins']">{Math.round(progress)}%</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                   <motion.div
                                        className="bg-gradient-to-r from-[gold] to-accent h-2 rounded-full shadow-lg"
                                        initial={{ width: 0 }}
                                        animate={{ width: progress + "%" }}
                                        transition={{
                                             type: "spring",
                                             stiffness: 120,
                                             damping: 18,
                                             mass: 0.5,
                                             duration: 0.7,
                                         }}
                                        style={{ minWidth: 8, maxWidth: '100%' }}
                                   />
                              </div>
                         </motion.div>

                         {/* Contact Info */}
                         <motion.div 
                              className="text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 1.1 }}
                         >
                              <p className="text-white/70 text-xs md:text-sm mb-2 font-['Poppins']">
                                   Butuh bantuan? Hubungi kami:
                              </p>
                              <a
                                   href="https://www.instagram.com/ormikxplore/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-[gold] hover:text-accent transition-colors text-sm md:text-base font-medium font-['Poppins'] underline decoration-[gold]/50 hover:decoration-accent"
                              >
                                   @ormikxplore
                              </a>
                         </motion.div>
                    </motion.div>

                    {/* Footer Info */}
                    <motion.div 
                         className="mt-6 text-center"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.8, delay: 1.3 }}
                    >
                         <p className="text-white/60 text-xs md:text-sm font-['Poppins']">
                              © 2025 ORMIK EXPLORE - Sekolah Tinggi Teknologi Terpadu Nurul Fikri
                         </p>
                    </motion.div>
               </div>
          </div>
     );
}
