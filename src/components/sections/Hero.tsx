"use client";

import Image from "next/image";
import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";
import Countdown from "@/components/widgets/Countdown";
import ScheduleCards from "@/components/widgets/ScheduleCards";

export default function Hero() {
     const { ref, isInView } = useScrollAnimation();

     const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
          e.preventDefault();
          const el = document.getElementById(targetId);
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top, behavior: "smooth" });
     };

     return (
          <section className="relative min-h-screen bg-primary overflow-hidden">
               <div className="absolute inset-0 -z-10">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         priority
                         className="object-cover object-top"
                    />
               </div>

               <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 translate-y-70 md:translate-y-52 lg:translate-y-26 w-[80%] md:w-[70%] lg:w-[60%] z-[-2]">
                         <Image
                              src="/assets/decorative/radar.png"
                              alt="Radar"
                              width={1000}
                              height={1000}
                              className="w-full h-auto opacity-100"
                         />
                    </div>

                    <div className="absolute top-[28%] left-[12%] md:left-[22%] lg:left-[28%] w-24 md:w-28 lg:w-36 opacity-90 z-10">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={220} height={80} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[16%] right-[12%] md:right-[22%] lg:right-[28%] w-20 md:w-28 lg:w-32 opacity-90 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={200} height={80} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-1/2 -left-6 md:-left-4 lg:left-0 w-24 md:w-40 lg:w-72 -rotate-6 opacity-90 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={170} height={70} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[52%] -right-8 md:-right-6 lg:right-0 w-24 md:w-40 lg:w-72 -rotate-6 opacity-100 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={160} height={70} className="w-full h-auto" />
                    </div>

                    <div className="absolute lg:top-[12%] top-[55%] left-0 w-24 md:w-40 lg:w-72 -rotate-12 opacity-60 z-0">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>
                    <div className="absolute lg:top-[12%] top-[55%] right-0 w-24 md:w-40 lg:w-72 rotate-12 opacity-60 z-0">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-[70%]">
                         <div className="flex justify-center items-end">
                              <div className="hidden lg:block absolute -left-[45%] lg:-left-[36%] md:-left-[35%] w-full h-full z-[1]">
                                   <Image
                                        src="/assets/background/building/left.png"
                                        alt=""
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              <div className="absolute bottom-5 w-full h-full z-[0] md:left-0 md:right-0 md:w-full lg:left-0 lg:right-0 lg:w-full">
                                   <Image
                                        src="/assets/background/building/center.png"
                                        alt=""
                                        width={680}
                                        height={600}
                                        className="w-[130%] md:w-full lg:w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              <div className="hidden lg:block absolute -right-[45%] lg:-right-[36%] md:-right-[35%] w-full h-full z-[1]">
                                   <Image
                                        src="/assets/background/building/right.png"
                                        alt=""
                                        width={680}
                                        height={600}
                                        className="w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>
                         </div>

                         <div className="flex flex-col-reverse justify-center items-end">
                              <div className="absolute bottom-0 left-0 right-0 h-[150%] z-[2] pointer-events-none"
                                   style={{
                                        background: 'linear-gradient(to top, rgba(226,220,0,0.4) 0%, rgba(226,220,0,0.3) 20%, rgba(226,220,0,0.2) 30%, rgba(226,220,0,0.1) 40%, rgba(226,220,0,0.05) 50%, transparent 60%)'
                                   }}>
                              </div>
                         </div>

                         <div className="absolute -bottom-24 md:-bottom-24 lg:-bottom-24 rotate-y-180 flex justify-center items-end h-[60%] w-[85%] md:w-[85%] lg:w-[85%] z-[1]">
                              <Image
                                   src="/assets/background/building/road.png"
                                   alt=""
                                   width={340}
                                   height={600}
                                   className="w-full h-full object-contain object-bottom opacity-100"
                              />
                         </div>
                    </div>
               </div>

               <motion.div
                    className="relative z-20"
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
               >
                    <div className="mx-auto max-w-6xl px-4">
                         <div className="min-h-screen flex flex-col items-center pt-32 sm:pt-12 text-center">
                              <motion.div
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.2 }}
                              >
                                   <Image
                                        src="/assets/logo-ormik.svg"
                                        alt="ORMIK 2025"
                                        width={181}
                                        height={181}
                                        className="mb-3 w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                                   />
                              </motion.div>

                              <motion.div
                                   className="relative mb-4"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.4 }}
                              >
                                   <Image
                                        src="/assets/READY TO EXPLORE.svg"
                                        alt="Ready to Explore"
                                        width={814}
                                        height={160}
                                        className="w-[320px] md:w-[460px] lg:w-[600px] h-auto"
                                   />
                                   <Image
                                        src="/assets/READY TO EXPLORE (1).svg"
                                        alt=""
                                        width={814}
                                        height={150}
                                        className="pointer-events-none absolute inset-0 w-[320px] md:w-[460px] lg:w-[600px] h-auto opacity-90 m-auto"
                                   />
                                   <Image
                                        src="/assets/READY TO EXPLORE (2).svg"
                                        alt=""
                                        width={755}
                                        height={91}
                                        className="pointer-events-none absolute inset-0 w-[300px] md:w-[430px] lg:w-[560px] h-auto opacity-95 m-auto"
                                   />
                              </motion.div>

                              <motion.div
                                   className="mb-10"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.6 }}
                              >
                                   <a href="#campus-explore" onClick={(e) => handleSmoothScroll(e, "campus-explore")} className="inline-block">
                                        <button
                                             className="group inline-flex items-center justify-center gap-2 rounded-md border-b border-yellow-400
                             bg-blue-950 px-6 py-2 text-white font-semibold transition
                             [box-shadow:1px_3px_1px_1px_rgba(226,220,0,1),0_6px_0_0_rgba(226,220,0,0.4)]
                             hover:translate-y-1 hover:[box-shadow:0_0_0_0_rgba(226,220,0,1),0_0_0_0_rgba(226,220,0,0.4)]
                             active:translate-y-1"
                                             aria-label="Go to Campus Explore"
                                        >
                                             <span className="text-sm md:text-base">CAMPUS EXPLORE</span>
                                             <Image src="/icons/ri_arrow-up-line.svg" alt="" width={18} height={18} className="transition-transform group-active:scale-95" />
                                        </button>
                                   </a>
                              </motion.div>

                              <motion.div
                                   className="mb-6"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.8 }}
                              >
                                   <Countdown />
                              </motion.div>

                              <motion.div
                                   className="w-full"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 1.0 }}
                              >
                                   <ScheduleCards />
                              </motion.div>
                         </div>
                    </div>
               </motion.div>
          </section>
     );
}
