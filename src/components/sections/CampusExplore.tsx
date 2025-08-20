"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation, slideInLeft, slideInRight, fadeInUp } from "@/hooks/useScrollAnimation";

interface CampusData {
     titleImage: string;
     address: string;
     mapImage: string;
}

const campusData: CampusData[] = [
     {
          titleImage: "/assets/heading/campus-a.svg",
          address: "Jl. Setu Indah No.116, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
          mapImage: "/assets/campus/campus-b.svg"
     },
     {
          titleImage: "/assets/heading/campus-b.svg",
          address: "Jl. Lenteng Agung Raya No.20 RT.5/RW.1 Lenteng Agung, Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan, 12640",
          mapImage: "/assets/campus/campus-b.svg"
     }
];

export default function CampusExplore() {
     const { ref, isInView } = useScrollAnimation();
     
     return (
          <motion.section 
               className="relative py-16 lg:py-32 overflow-hidden" 
               id="campus-explore"
               ref={ref}
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : { opacity: 0 }}
               transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >

               {/* Decorative clouds */}
               <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute top-10 left-10 w-32 h-20 z-[12]">
                         <Image src="/assets/decorative/iconexplore.svg" alt="cloud" width={128} height={80} className="w-full h-auto" />
                    </div>

                    <div className="absolute bottom-6 -right-30 w-48 h-28 sm:w-64 sm:h-36 md:w-80 md:h-48 lg:w-96 lg:h-56 xl:w-[28rem] xl:h-64 2xl:w-[32rem] 2xl:h-72 opacity-95 z-[11]">
                         <Image src="/assets/cloud.png" alt="cloud" width={384} height={224} className="w-full h-auto -rotate-12" />
                    </div>

               </div>

               <div className="absolute inset-0 z-[1] m-4 lg:m-8">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="opacity-60 rounded-xl object-center"
                         priority
                    />
               </div>

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Campus Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
                         {campusData.map((campus, index) => (
                              <motion.div
                                   key={index}
                                   className="text-left lg:text-center"
                                   initial={index === 0 ? slideInLeft.initial : slideInRight.initial}
                                   animate={isInView ? (index === 0 ? slideInLeft.animate : slideInRight.animate) : (index === 0 ? slideInLeft.initial : slideInRight.initial)}
                                   transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                              >
                                   {/* Campus Title Image */}
                                   <motion.div 
                                        className="mb-6 flex justify-start lg:justify-center"
                                        initial={fadeInUp.initial}
                                        animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                        transition={{ duration: 0.7, delay: index * 0.2 + 0.4 }}
                                   >
                                        <div className="relative h-16 w-auto">
                                             <Image
                                                  src={campus.titleImage}
                                                  alt={`Campus ${index + 1} Title`}
                                                  width={300}
                                                  height={64}
                                                  className="h-full w-auto object-contain"
                                                  priority={index === 0}
                                             />
                                        </div>
                                   </motion.div>

                                   {/* Campus Address */}
                                   <motion.div 
                                        className="mb-6 px-6 sm:px-2 lg:px-6"
                                        initial={fadeInUp.initial}
                                        animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                        transition={{ duration: 0.7, delay: index * 0.2 + 0.6 }}
                                   >
                                        <p className="text-white italic text-sm lg:text-base leading-relaxed">
                                             {campus.address}
                                        </p>
                                   </motion.div>

                                   {/* Campus Map */}
                                   <motion.div 
                                        className="w-full"
                                        initial={fadeInUp.initial}
                                        animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                        transition={{ duration: 0.7, delay: index * 0.2 + 0.8 }}
                                   >
                                        <div className="relative w-full h-64 lg:h-80">
                                             <Image
                                                  src={campus.mapImage}
                                                  alt={`Campus ${index + 1} Floor Plan`}
                                                  fill
                                                  className="object-contain"
                                                  priority={index === 0}
                                             />
                                        </div>
                                   </motion.div>
                              </motion.div>
                         ))}
                    </div>
               </div>
          </motion.section>
     );
}
