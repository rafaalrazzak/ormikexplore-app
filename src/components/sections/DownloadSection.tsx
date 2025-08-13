import Image from "next/image";
import Footer from "./Footer";

export default function DownloadSection() {
     return (
          <section className="relative pt-24 lg:pt-26 pb-8 lg:pb-10 overflow-hidden">

               {/* Mascot positioned between download and footer with highest z-index */}
               <div className="absolute left-4 sm:left-6 md:left-8 lg:left-14 bottom-28 sm:bottom-30 md:bottom-32 lg:bottom-40 xl:bottom-32 z-[15]">
                    <div className="relative w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] lg:h-[220px] lg:w-[220px] xl:w-[320px] xl:h-[320px]">
                         <Image
                              src="/assets/maskot.svg"
                              alt="ORMIK Mascot"
                              fill
                              className="object-contain drop-shadow-2xl"
                              priority
                         />
                    </div>
               </div>

               <div className="space-y-6">
                    <div className="container mx-auto px-6 sm:px-8 md:px-20 lg:px-20 xl:px-12 relative z-10 space-y-6">
                         {/* Download Section Overlay */}
                         <div className="relative bg-white/18 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3 lg:px-4 lg:pt-4 lg:pb-3 border border-white/10 shadow-2xl">
                              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
                                   {/* Left Content - Greetings Text with margin for mascot */}
                                   <div className="flex-1 space-y-1 sm:space-y-2 text-center lg:text-left max-w-full lg:max-w-lg ml-0 lg:ml-40">
                                        <h2 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-white font-['Poppins'] drop-shadow-lg leading-tight text-left lg:text-left">
                                             Hai, Explorers!!
                                        </h2>

                                        <div className="space-y-1 sm:space-y-0">
                                             <p className="text-xs sm:text-sm lg:text-sm xl:text-base font-light text-white font-['Poppins'] leading-relaxed drop-shadow-md text-left lg:text-left">
                                                  Kamu bisa download Guide Book, Twibbon Explorer di dalam yaaa!!!
                                             </p>
                                             <p className="text-xs sm:text-sm lg:text-sm xl:text-base font-medium text-white font-['Poppins'] drop-shadow-md text-left lg:text-left">
                                                  Klik download →
                                             </p>
                                        </div>
                                   </div>

                                   {/* Right Content - Download Center Button */}
                                   <div className="w-full lg:w-auto flex justify-center lg:justify-end lg:flex-shrink-0">
                                        <button className="relative group transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] w-full lg:w-auto">
                                             {/* Button Background */}
                                             <div className="relative w-[200px] h-[50px] sm:w-[320px] sm:h-[60px] lg:w-[330px] lg:h-[70px] xl:w-[400px] xl:h-[75px] mx-auto lg:mx-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-300">
                                                  <Image
                                                       src="/assets/background/bg-yellow.png"
                                                       alt=""
                                                       fill
                                                       className="object-fill group-hover:brightness-110 transition-all duration-300"
                                                  />

                                                  {/* Download Text Overlay */}
                                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                                       <div className="relative w-[180px] h-[22px] sm:w-[200px] sm:h-[25px] lg:w-[240px] lg:h-[30px] xl:w-[260px] xl:h-[32px] group-hover:scale-105 transition-transform duration-300 ease-out">
                                                            <Image
                                                                 src="/assets/heading/download.svg"
                                                                 alt="Download Center"
                                                                 fill
                                                                 className="object-contain drop-shadow-sm"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Footer Section */}
                    <Footer />
               </div>

          </section>
     );
}
