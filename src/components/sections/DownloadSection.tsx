"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, slideInLeft } from "@/hooks/useScrollAnimation";
import Footer from "./Footer";


function CtaButton({ src, alt }: { src: string; alt: string }) {
     return (
          <button
               type="button"
               className="group inline-block w-full select-none bg-transparent p-0 outline-none transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
               aria-label={alt}
          >
               <Image
                    src={src}
                    alt={alt}
                    width={160}
                    height={55}
                    className="h-auto w-full transition-all duration-300 group-hover:brightness-110"
                    sizes="(max-width:640px) 120px, (max-width:1024px) 150px, 160px"
                    priority={false}
               />
          </button>
     );
}

export default function DownloadSection() {
     const { ref, isInView } = useScrollAnimation();

     const textShadow = {
          textShadow: "0 2px 8px rgba(0,0,0,0.35), 0 1px 1px rgba(0,0,0,0.15)",
     } as const;

     return (
          <motion.section
               id="download"
               ref={ref}
               className="relative overflow-hidden pt-24 pb-8 lg:pt-26 lg:pb-10"
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : { opacity: 0 }}
               transition={{ duration: 0.8 }}
          >
               {/* Mascot */}
               <motion.div
                    className="absolute left-4 bottom-18 z-[15] sm:left-6 sm:bottom-30 md:left-8 md:bottom-32 lg:left-14 lg:bottom-40 xl:left-4 xl:bottom-32"
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
                    <div className="container relative z-10 mx-auto space-y-6 px-6 sm:px-8 md:px-20 lg:px-20 xl:px-12">
                         {/* Download card */}
                         <motion.div
                              className="relative rounded-2xl border border-white/10 bg-white/18 px-4 pt-3 pb-2 shadow-2xl backdrop-blur-lg sm:rounded-3xl sm:px-6 sm:pt-4 sm:pb-3 lg:px-4 lg:pt-4 lg:pb-3"
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

                                   <div className="flex items-center justify-center gap-3 sm:gap-4">
                                        <div className="w-[100px] md:w-[150px] lg:w-[180px]">
                                             <CtaButton src="/assets/button/guide-book.svg" alt="Guide Book" />
                                        </div>
                                        <div className="w-[80px] md:w-[115px] lg:w-[140px]">
                                             <CtaButton src="/assets/button/twibbon.svg" alt="Twibbon Explorers" />
                                        </div>
                                   </div>
                              </div>
                         </motion.div>
                    </div>

                    <Footer />
               </div>
          </motion.section>
     );
}
