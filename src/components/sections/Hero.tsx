"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp } from "@/hooks/useScrollAnimation";
import Countdown from "@/components/widgets/Countdown";
import ScheduleCards from "@/components/widgets/ScheduleCards";

export default function Hero() {
     const { ref, isInView } = useScrollAnimation();

     const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
          e.preventDefault();
          const el = document.getElementById(targetId);
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
     };

     return (
          <section className="relative min-h-screen overflow-hidden bg-primary">
               {/* Background */}
               <div className="absolute inset-0 -z-10">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         priority
                         className="object-cover object-top"
                    />
               </div>

               {/* Decorations */}
               <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-40 sm:top-20 md:-top-50 lg:top-20 w-[80%] md:w-[70%] lg:w-[60%] z-[-2]">
                         <Image
                              src="/assets/decorative/radar.svg"
                              alt="Radar"
                              width={500}
                              height={500}
                              className="w-full h-auto"
                         />
                    </div>

                    <div className="absolute top-[28%] left-[12%] md:left-[22%] lg:left-[28%] w-24 md:w-28 lg:w-36 opacity-90 z-12">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={220} height={80} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[16%] right-[12%] md:right-[22%] lg:right-[28%] w-20 md:w-28 lg:w-32 opacity-90 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={200} height={80} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-1/2 -left-6 md:-left-4 lg:left-0 xl:-left-20 w-24 md:w-40 lg:w-72 -rotate-6 opacity-90 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={170} height={70} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[52%] -right-8 md:-right-6 lg:right-12 xl:-right-20 w-24 md:w-40 lg:w-72 -rotate-6 opacity-100 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={160} height={70} className="w-full h-auto" />
                    </div>

                    <div className="absolute bottom-[18%] sm:top-[45%] md:top-[23%] lg:top-[12%] -left-6 md:-left-10 lg:-left-16 w-24 md:w-40 lg:w-72 -rotate-12 opacity-60 z-0">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>
                    <div className="absolute bottom-[18%] sm:top-[45%] md:top-[23%] lg:top-[12%] -right-6 md:-right-10 lg:-right-16 w-24 md:w-40 lg:w-72 rotate-12 opacity-60 z-0">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-[70%]">
                         <div className="flex justify-center items-end">
                              <div className="hidden md:block absolute top-4 -left-[45%] lg:-left-[36%] md:-left-[35%] w-full h-full z-[1]">
                                   <Image
                                        src="/assets/background/building/left.png"
                                        alt=""
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              <div className="absolute bottom-0 w-full h-full z-[0] md:left-0 md:right-0 md:w-full lg:left-0 lg:right-0 lg:w-full">
                                   <Image
                                        src="/assets/background/building/center.png"
                                        alt=""
                                        width={680}
                                        height={600}
                                        className="w-[130%] md:w-full lg:w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              <div className="hidden md:block absolute top-4 -right-[45%] lg:-right-[36%] md:-right-[35%] w-full h-full z-[1]">
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

                         <div className="absolute -bottom-6 md:-bottom-10 lg:-bottom-24 rotate-y-180 flex justify-center items-end h-[60%] w-[85%] md:w-[85%] lg:w-[85%] z-[1]">
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
                    ref={ref}
                    className="relative z-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
               >
                    <div className="mx-auto max-w-6xl px-4">
                         <div className="flex min-h-screen flex-col items-center pt-[18vh] sm:pt-[20vh] md:pt-[22vh] lg:pt-[24vh] text-center">
                              {/* Headline */}
                              <motion.div
                                   className="relative mb-4"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.2 }}
                              >
                                   <Image
                                        src="/assets/READY TO EXPLORE.svg"
                                        alt="Ready to Explore"
                                        width={814}
                                        height={160}
                                        className="h-auto w-[320px] md:w-[460px] lg:w-[600px]"
                                        priority={false}
                                   />
                                   <Image
                                        src="/assets/READY TO EXPLORE (1).svg"
                                        alt=""
                                        width={814}
                                        height={150}
                                        className="pointer-events-none absolute inset-0 m-auto h-auto w-[320px] opacity-90 md:w-[460px] lg:w-[600px]"
                                   />
                                   <Image
                                        src="/assets/READY TO EXPLORE (2).svg"
                                        alt=""
                                        width={755}
                                        height={91}
                                        className="pointer-events-none absolute inset-0 m-auto h-auto w-[300px] opacity-95 md:w-[430px] lg:w-[560px]"
                                   />
                              </motion.div>

                              {/* CTA */}
                              <motion.div
                                   className="mb-10"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.4 }}
                              >
                                   <a
                                        href="https://tour.nurulfikri.ac.id/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block"
                                   >
                                        <button
                                             className="group inline-flex items-center justify-center gap-2 rounded-md border-b border-yellow-400
                             bg-blue-950 px-6 py-2 font-semibold text-white transition
                             [box-shadow:1px_3px_1px_1px_rgba(226,220,0,1),0_6px_0_0_rgba(226,220,0,0.4)]
                             hover:translate-y-1 hover:[box-shadow:0_0_0_0_rgba(226,220,0,1),0_0_0_0_rgba(226,220,0,0.4)]
                             active:translate-y-1"
                                             aria-label="Go to Campus Explore"
                                        >
                                             <span className="text-sm md:text-base">CAMPUS EXPLORE</span>
                                             <Image
                                                  src="/icons/ri_arrow-up-line.svg"
                                                  alt=""
                                                  width={18}
                                                  height={18}
                                                  className="transition-transform group-active:scale-95"
                                             />
                                        </button>
                                   </a>
                              </motion.div>

                              {/* Countdown */}
                              <motion.div
                                   className="mb-6"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.6 }}
                              >
                                   <Countdown />
                              </motion.div>

                              {/* Schedules */}
                              <motion.div
                                   className="w-full"
                                   initial={fadeInUp.initial}
                                   animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                                   transition={{ duration: 0.7, delay: 0.8 }}
                              >
                                   <ScheduleCards />
                              </motion.div>
                         </div>
                    </div>
               </motion.div>
          </section>
     );
}
