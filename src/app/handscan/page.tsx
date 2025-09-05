"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import "./handscan.css";

export default function HandScanPage() {
     const scanRef = useRef<HTMLDivElement>(null);
     const videoRef = useRef<HTMLVideoElement>(null);
     const [showVideo, setShowVideo] = useState(false);
     const [fadeOutScan, setFadeOutScan] = useState(false);
     const [fadeInVideo, setFadeInVideo] = useState(false);
     const [videoEnded, setVideoEnded] = useState(false);

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
                    setShowVideo(false);
                    setFadeOutScan(false);
                    setFadeInVideo(false);
                    setVideoEnded(false);
               } else {
                    // Jangan mulai handscan jika video sudah selesai dan tidak direset
                    if (videoEnded) return;
                    scanContainer.classList.add("active");
                    scanContainer.classList.remove("completed");
                    setShowVideo(false);
                    setFadeOutScan(false);
                    setFadeInVideo(false);
                    scanTimeout = setTimeout(() => {
                         scanContainer.classList.remove("active");
                         scanContainer.classList.add("completed");
                         setFadeOutScan(true);
                         setTimeout(() => {
                              setShowVideo(true);
                              setFadeInVideo(true);
                         }, 500); // fade out scan, then fade in video
                    }, 7000);
               }
          };
          scanContainer.addEventListener("click", handleClick);
          return () => {
               scanContainer.removeEventListener("click", handleClick);
               if (scanTimeout) clearTimeout(scanTimeout);
          };
     }, [videoEnded]);

     // Ensure video plays automatically after showVideo is set
     useEffect(() => {
          if (showVideo && videoRef.current) {
               // Try to play video programmatically (for some browsers)
               videoRef.current.currentTime = 0;
               videoRef.current.play().catch(() => { });
          }
     }, [showVideo]);

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
               {/* Hand Scan Animation or Video */}
               <div className="relative z-content max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center h-full text-center overflow-hidden min-h-screen">
                    {!showVideo ? (
                         <div
                              ref={scanRef}
                              className={`scan transition-opacity duration-500 ${fadeOutScan ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                              id="scanContainer"
                         >
                              <div className="hand">
                                   <div className="lines"></div>
                              </div>
                              <h3>ORMIK EXPLORE 2025 - STARTING...</h3>
                         </div>
                    ) : (
                         <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${fadeInVideo ? 'opacity-100' : 'opacity-0'}`}>
                              <video
                                   ref={videoRef}
                                   src="/assets/handscan/openingceremony.mp4"
                                   autoPlay
                                   playsInline
                                   onEnded={() => setVideoEnded(true)}
                                   className="w-full h-full object-contain bg-black"
                                   style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                              >
                                   Your browser does not support the video tag.
                              </video>
                         </div>
                    )}
               </div>
          </div>
     );
}
