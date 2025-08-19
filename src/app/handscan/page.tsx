"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import "./handscan.css";

export default function HandScanPage() {
     const scanRef = useRef<HTMLDivElement>(null);
     useEffect(() => {
          // Handscan animation logic (from original, do not change)
          const scanContainer = scanRef.current;
          if (!scanContainer) return;
          let scanTimeout: NodeJS.Timeout | undefined;
          const handleClick = () => {
               if (scanTimeout) clearTimeout(scanTimeout);
               if (scanContainer.classList.contains("active")) {
                    scanContainer.classList.remove("active");
                    scanContainer.classList.remove("completed");
               } else {
                    scanContainer.classList.add("active");
                    scanContainer.classList.remove("completed");
                    scanTimeout = setTimeout(() => {
                         scanContainer.classList.remove("active");
                         scanContainer.classList.add("completed");
                    }, 7000);
               }
          };
          scanContainer.addEventListener("click", handleClick);
          return () => {
               scanContainer.removeEventListener("click", handleClick);
               if (scanTimeout) clearTimeout(scanTimeout);
          };
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
               {/* Decorative Elements (clouds, hexagons, radar, etc) */}
               <div className="absolute inset-0 pointer-events-none">
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
               {/* Hand Scan Animation */}
               <div className="relative z-content max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center h-full text-center overflow-hidden min-h-screen">
                    <div ref={scanRef} className="scan" id="scanContainer">
                         <div className="hand">
                              <div className="lines"></div>
                         </div>
                         <h3>ORMIK EXPLORE 2025 - STARTING...</h3>
                    </div>
               </div>
          </div>
     );
}
