"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "./handscan.css";

type Phase = "idle" | "scanning" | "transition" | "playing" | "ended";

const SCAN_MS = 2000;
const FADE_MS = 500;
const YT_VIDEO_ID = "dQw4w9WgXcQ";

declare global {
     interface Window {
          /* eslint-disable @typescript-eslint/no-explicit-any */
          YT: any;
          onYouTubeIframeAPIReady?: () => void;
     }
}

export default function HandScanPage() {
     const [phase, setPhase] = useState<Phase>("idle");

     /* eslint-disable @typescript-eslint/no-explicit-any */
     const playerRef = useRef<any>(null);
     const apiLoadedRef = useRef(false);
     const playerReadyRef = useRef(false);
     const primedRef = useRef(false);

     const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
     const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

     const showOverlay = phase === "playing" || phase === "ended";
     const scanHidden = phase === "transition" || showOverlay;

     /** Cleanup helpers */
     const clearTimers = () => {
          if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
          if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
          scanTimerRef.current = null;
          fadeTimerRef.current = null;
     };

     const reset = useCallback(() => {
          clearTimers();
          try {
               playerRef.current?.stopVideo?.();
               playerRef.current?.mute?.(false);
               playerRef.current?.setVolume?.(100);
          } catch { }
          primedRef.current = false;
          setPhase("idle");
          const el = document.getElementById("scanContainer");
          el?.classList.remove("active", "completed");
     }, []);

     useEffect(() => () => clearTimers(), []);

     useEffect(() => {
          if (typeof window === "undefined" || apiLoadedRef.current) return;

          const mountPlayer = () => {
               const mount = document.getElementById("yt-player");
               if (!mount || playerRef.current || !window.YT?.Player) return;

               playerRef.current = new window.YT.Player(mount, {
                    videoId: YT_VIDEO_ID,
                    playerVars: {
                         autoplay: 0,
                         controls: 0,
                         playsinline: 1,
                         rel: 0,
                         modestbranding: 1,
                         iv_load_policy: 3,
                         fs: 0
                    },
                    events: {
                         onReady: () => {
                              const iframe = mount.querySelector("iframe");
                              if (iframe) {
                                   iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
                                   iframe.setAttribute("allowfullscreen", "true");
                                   iframe.setAttribute("playsinline", "true");
                              }
                              playerReadyRef.current = true;
                         },
                         /* eslint-disable @typescript-eslint/no-explicit-any */
                         onStateChange: (e: any) => {
                              if (e?.data === window.YT?.PlayerState?.ENDED) setPhase("ended");
                         }
                    }
               });
          };

          if (window.YT?.Player) {
               apiLoadedRef.current = true;
               mountPlayer();
               return;
          }

          window.onYouTubeIframeAPIReady = () => {
               apiLoadedRef.current = true;
               mountPlayer();
          };
          const s = document.createElement("script");
          s.src = "https://www.youtube.com/iframe_api";
          s.async = true;
          document.body.appendChild(s);
     }, []);

     const revealWithAudio = useCallback(() => {
          const p = playerRef.current;
          if (!p) return;
          try {
               p.setVolume?.(100);
               p.playVideo?.();
          } catch { }
     }, []);

     const handleScanClick = useCallback(() => {
          if (phase === "ended") return;
          if (phase !== "idle") return reset();

          if (!playerReadyRef.current) return;


          setPhase("scanning");
          const el = document.getElementById("scanContainer");
          el?.classList.add("active");
          el?.classList.remove("completed");

          scanTimerRef.current = setTimeout(() => {
               el?.classList.remove("active");
               el?.classList.add("completed");
               setPhase("transition");

               fadeTimerRef.current = setTimeout(() => {
                    revealWithAudio();
                    setPhase("playing");
               }, FADE_MS);
          }, SCAN_MS);
     }, [phase, reset, revealWithAudio]);

     return (
          <div className="relative min-h-screen overflow-hidden bg-primary">
               <div className="absolute inset-0 z-[background]">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="object-cover object-center"
                         priority
                    />
               </div>

               <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[60px] md:w-[80px] lg:w-[100px] z-[2] opacity-70">
                         <Image src="/assets/cloud.png" alt="cloud" width={100} height={40} className="w-full h-auto animate-pulse" />
                    </div>
                    <div className="absolute top-[30%] right-[15%] w-[50px] md:w-[70px] lg:w-[90px] z-[2] opacity-70">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={90} height={40} className="w-full h-auto animate-pulse" style={{ animationDelay: "1s" }} />
                    </div>
                    <div className="absolute bottom-[20%] left-[20%] w-[70px] md:w-[90px] lg:w-[120px] z-[2] opacity-60 -rotate-12">
                         <Image src="/assets/cloud.png" alt="cloud" width={120} height={50} className="w-full h-auto animate-pulse" style={{ animationDelay: "2s" }} />
                    </div>
                    <div className="absolute bottom-[25%] right-[10%] w-[65px] md:w-[85px] lg:w-[110px] z-[2] opacity-60 rotate-12">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={110} height={45} className="w-full h-auto animate-pulse" style={{ animationDelay: "3s" }} />
                    </div>
                    <div className="absolute top-[60%] left-[5%] w-[80px] md:w-[120px] lg:w-[150px] z-[1] -rotate-12 opacity-40">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={150} height={60} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[70%] right-[8%] w-[75px] md:w-[110px] lg:w-[140px] z-[1] rotate-12 opacity-40">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={140} height={55} className="w-full h-auto" />
                    </div>
               </div>

               <div className="relative max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen text-center">

                    {!showOverlay && (
                         <button
                              type="button"
                              onClick={handleScanClick}
                              id="scanContainer"
                              className={[
                                   "scan transition-opacity duration-500",
                                   scanHidden ? "opacity-0 pointer-events-none" : "opacity-100",
                              ].join(" ")}
                              aria-label={phase === "idle" ? "Start hand scan" : "Reset hand scan"}
                         >
                              <div className={`hand ${phase === "scanning" ? "active" : ""}`}>
                                   <div className="lines" />
                              </div>
                              <h3 className={phase === "scanning" ? "animate-pulse" : ""}>
                                   ORMIK EXPLORE 2025 — {phase === "idle" ? "TAP TO START" : "SCANNING..."}
                              </h3>
                         </button>
                    )}

                    <div
                         className={[
                              "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500",
                              showOverlay ? "opacity-100" : "opacity-0 pointer-events-none",
                         ].join(" ")}
                         aria-hidden={!showOverlay}
                    >
                         <button
                              type="button"
                              onClick={reset}
                              className="absolute top-4 right-4 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                              aria-label="Close video"
                         >
                              ✕
                         </button>

                         <div className="w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center">
                              <div id="yt-player" className="w-full h-full" />
                         </div>
                    </div>
               </div>
          </div>
     );
}
