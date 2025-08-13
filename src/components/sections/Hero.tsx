import Image from "next/image";
import Countdown from "@/components/widgets/Countdown";
import ScheduleCards from "@/components/widgets/ScheduleCards";

export default function Hero() {
     return (
          <section className="relative min-h-screen text-center overflow-hidden bg-primary">
               {/* Background Image */}
               <div className="absolute inset-0 z-[background]">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="object-cover object-top"
                         priority
                    />
               </div>

               {/* Decorative Background Elements - Radar + Univ */}
               <div className="absolute inset-0 pointer-events-none">
                    {/* Radar SVG - Center, responsive width and positioning */}
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 translate-y-70 md:translate-y-52 lg:translate-y-26 w-[80%] md:w-[70%] lg:w-[60%] z-[-2]">
                          <Image
                                src="/assets/decorative/radar.png"
                                alt="Radar"
                                width={1000}
                                height={1000}
                                className="w-full h-auto opacity-100"
                          />
                    </div>

                    {/* Clouds - positioned and rotated as in the design */}
                    {/* Top Left Cloud */}
                    <div className="absolute top-[30%] md:top-[28%] lg:top-[28%] left-[15%] md:left-[25%] lg:left-[30%] w-[60px] md:w-[80px] lg:w-[110px] z-[4] opacity-90">
                          <Image src="/assets/cloud-right.png" alt="cloud" width={220} height={80} className="w-full h-auto" />
                    </div>
                    {/* Top Right Cloud */}
                    <div className="absolute top-[18%] md:top-[16%] lg:top-[16%] right-[15%] md:right-[25%] lg:right-[29%] w-[50px] md:w-[80px] lg:w-[130px] z-[4] opacity-90">
                          <Image src="/assets/cloud.png" alt="cloud" width={200} height={80} className="w-full h-auto" />
                    </div>
                    {/* Center Left Cloud */}
                    <div className="absolute top-[50%] md:top-[45%] lg:top-[45%] -left-[10%] md:-left-[8%] lg:-left-[5%] w-[80px] md:w-[150px] lg:w-[350px] z-[2] -rotate-6 md:-rotate-8 lg:-rotate-12 opacity-90">
                          <Image src="/assets/cloud.png" alt="cloud" width={170} height={70} className="w-full h-auto" />
                    </div>
                    {/* Center Right Cloud */}
                    <div className="absolute top-[55%] md:top-[50%] lg:top-[50%] -right-[12%] md:-right-[10%] lg:-right-[7%] w-[80px] md:w-[150px] lg:w-[350px] z-[2] -rotate-6 md:-rotate-8 lg:-rotate-12 opacity-100">
                          <Image src="/assets/cloud.png" alt="cloud" width={160} height={70} className="w-full h-auto" />
                    </div>

                    {/* Hexagonal Left */}
                    <div className="absolute top-[60%] md:top-[50%] lg:top-[15%] -left-[5%] md:-left-[12%] lg:-left-[9%] w-[80px] md:w-[150px] lg:w-[350px] z-[1] -rotate-6 md:-rotate-8 lg:-rotate-12 opacity-100">
                            <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>

                    {/* Hexagonal Right */}
                    <div className="absolute top-[60%] md:top-[50%] lg:top-[15%] -right-[5%] md:-right-[12%] lg:-right-[9%] w-[80px] md:w-[150px] lg:w-[350px] z-[0] -rotate-6 md:-rotate-8 lg:-rotate-12 opacity-100">
                            <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>

                    {/* University SVG - Positioned behind countdown area */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-[70%]">
                         <div className="flex justify-center items-end">
                              {/* Left Building - Hidden on mobile, visible on tablet+ */}
                              <div className="hidden lg:block absolute -left-[45%] lg:-left-[36%] md:-left-[35%] w-full h-full z-[1]">
                                   <Image
                                        src="/assets/background/building/left.png"
                                        alt=""
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              {/* Center Building - Always visible, responsive sizing */}
                              <div className="absolute bottom-5 w-full h-full z-[0] md:left-0 md:right-0 md:w-full lg:left-0 lg:right-0 lg:w-full">
                                   <Image
                                        src="/assets/background/building/center.png"
                                        alt=""
                                        width={680}
                                        height={600}
                                        className="w-[130%] md:w-full lg:w-full h-full object-contain object-bottom opacity-100"
                                   />
                              </div>

                              {/* Right Building - Hidden on mobile, visible on tablet+ */}
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

                         {/* Shadow Overlay - Always visible, responsive */}
                         <div className="flex flex-col-reverse justify-center items-end">
                              <div className="absolute bottom-0 left-0 right-0 h-[150%] z-[2] pointer-events-none"
                                   style={{
                                        background: 'linear-gradient(to top, rgba(226,220,0,0.4) 0%, rgba(226,220,0,0.3) 20%, rgba(226,220,0,0.2) 30%, rgba(226,220,0,0.1) 40%, rgba(226,220,0,0.05) 50%, transparent 60%)'
                                   }}>
                              </div>
                         </div>

                         {/* Road - Always visible, responsive sizing and positioning */}
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

               {/* Content */}
               <div className="relative z-content max-w-container mx-auto px-4 py-4 lg:py-6 z-[3]">
                    <div className="flex flex-col items-center">
                         {/* Logo */}
                         <div className="mb-2 lg:mb-3">
                              <Image
                                   src="/assets/logo-ormik.svg"
                                   alt="ORMIK 2025"
                                   width={181}
                                   height={181}
                                   className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
                              />
                         </div>

                         {/* Headline with Multiple Ready to Explore Assets */}
                         <div className="relative mb-1 lg:mb-2 flex items-center justify-center">
                              {/* Layered Ready to Explore Assets */}
                              <div className="relative">
                                   {/* Base Layer - Main Asset with Drop Shadow */}
                                   <div className="relative">
                                        <Image
                                             src="/assets/READY TO EXPLORE.svg"
                                             alt=""
                                             width={814}
                                             height={160}
                                             className="w-[320px] md:w-[450px] lg:w-[580px] h-auto opacity-100"
                                        />
                                   </div>

                                   {/* Second Layer - Inner Shadow Effect */}
                                   <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                             src="/assets/READY TO EXPLORE (1).svg"
                                             alt=""
                                             width={814}
                                             height={150}
                                             className="w-[320px] md:w-[450px] lg:w-[580px] h-auto opacity-90"
                                        />
                                   </div>

                                   {/* Third Layer - Gold Fill Text */}
                                   <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                             src="/assets/READY TO EXPLORE (2).svg"
                                             alt=""
                                             width={755}
                                             height={91}
                                             className="w-[300px] md:w-[420px] lg:w-[530px] h-auto opacity-95"
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* CTA Button */}
                         <div className="relative mb-8 lg:mb-20">
                              <button className="w-44 h-11 bg-blue-950 rounded-[8px] flex items-center justify-center cursor-pointer select-none
                                   hover:translate-y-2 hover:[box-shadow:0_0px_0_0_rgba(226,220,0,1.00),0_0px_0_0_rgba(226,220,0,0.4)]
                                   hover:border-b-[0px]
                                   active:translate-y-2 active:[box-shadow:0_0px_0_0_rgba(226,220,0,1.00),0_0px_0_0_rgba(226,220,0,0.4)]
                                   active:border-b-[0px]
                                   transition-all duration-150 [box-shadow:1px_3px_1px_1px_rgba(226,220,0,1.00),0_6px_0_0_rgba(226,220,0,0.4)]
                                   border-b-[1px] border-yellow-400
                                   touch-manipulation
                              ">
                                   <span className="text-white text-sm font-semibold font-['Poppins'] transform transition-transform duration-200 
                                        active:scale-95 group-active:scale-95">
                                        CAMPUS EXPLORE
                                   </span>
                                   <Image
                                        src="/icons/ri_arrow-up-line.svg"
                                        alt="Arrow Up"
                                        width={18}
                                        height={18}
                                        className="ml-2 transition-transform duration-200 active:scale-95"
                                   />
                              </button>
                         </div>

                         {/* Countdown Component */}
                         <div className="mb-3 lg:mb-6">
                              <Countdown />
                         </div>

                         {/* Schedule Cards */}
                         <div className="w-full">
                              <ScheduleCards />
                         </div>
                    </div>
               </div>
          </section>
     );
}
