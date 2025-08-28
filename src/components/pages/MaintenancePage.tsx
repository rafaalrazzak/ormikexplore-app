"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchMaintenanceConfig, getMaintenanceTimeRemaining } from "@/utils/maintenance";
import { useRouter, useSearchParams } from "next/navigation";


interface TimeRemaining {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
}

export default function MaintenancePage() {
     const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
     const [maintenanceMessage, setMaintenanceMessage] = useState<string>("");
     const [showBypass, setShowBypass] = useState(false);
     const [bypassInput, setBypassInput] = useState("");
     const [bypassError, setBypassError] = useState("");
     const router = useRouter();
     const searchParams = useSearchParams();

     useEffect(() => {
          async function fetchData() {
               const config = await fetchMaintenanceConfig();
               setMaintenanceMessage(config.message || "");
               const remainingTime = await getMaintenanceTimeRemaining();
               setTimeRemaining(remainingTime);
               setShowBypass(!!config.password);
          }

          fetchData();

          // Bypass via URL param
          if (typeof window !== "undefined") {
               const passParam = searchParams?.get("pass");
               if (passParam) {
                    fetch("/api/maintenance-bypass", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ password: passParam })
                    })
                         .then(res => {
                              if (res.ok) {
                                   router.push("/");
                              } else {
                                   setBypassError("Password salah!");
                              }
                         });
               }
          }

          // Set up interval for real-time countdown
          const interval = setInterval(async () => {
               const remainingTime = await getMaintenanceTimeRemaining();
               setTimeRemaining(remainingTime);
          }, 1000);
          return () => clearInterval(interval);
     }, [searchParams, router]);

     // Handle bypass form submit
     async function handleBypassSubmit(e: React.FormEvent) {
          e.preventDefault();
          setBypassError("");
          const res = await fetch("/api/maintenance-bypass", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ password: bypassInput })
          });
          if (res.ok) {
               // Success: reload ke halaman utama
               router.push("/");
          } else {
               setBypassError("Password salah!");
          }
     }
     return (
          <div className="relative min-h-screen overflow-hidden bg-primary flex items-center">
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
                              src="/assets/decorative/radar.svg"
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
               <div className="relative z-content max-w-4xl mx-auto px-4 py-2 flex flex-col items-center justify-center h-full text-center overflow-hidden">
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

                         {/* Progress bar dihapus karena tidak digunakan lagi */}

                         {/* Bypass Form (Whitelist) */}
                         {showBypass && (
                              <motion.div
                                   className="text-center mb-4"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.8, delay: 1.05 }}
                              >
                                   <form onSubmit={handleBypassSubmit} className="flex flex-col items-center gap-2">
                                        <input
                                             type="password"
                                             value={bypassInput}
                                             onChange={e => setBypassInput(e.target.value)}
                                             className="rounded px-3 py-1 bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-gold"
                                             autoComplete="off"
                                        />
                                        <button type="submit" className="mt-1 px-4 py-1 rounded bg-gold text-primary font-bold hover:underline hover:underline-offset-3 transition">Masuk</button>
                                        {bypassError && <span className="text-red-400 text-xs mt-1">{bypassError}</span>}
                                   </form>
                              </motion.div>
                         )}
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
