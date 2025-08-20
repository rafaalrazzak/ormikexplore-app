"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundOrUnauthorized() {
     return (
          <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
               {/* Animated Logo */}
               <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="z-[11]"
               >
                    <Image
                         src="/assets/logo-ormik.svg"
                         alt="ORMIK 2025"
                         width={120}
                         height={120}
                         className="mb-4 w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
                    />
               </motion.div>
               {/* Background */}
               <div className="absolute inset-0 z-0">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt="background"
                         fill
                         className="object-cover object-center"
                         priority
                    />
               </div>
               {/* Decorative Elements */}
               <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[80px] opacity-70 z-10">
                         <Image src="/assets/cloud.png" alt="cloud" width={80} height={40} className="w-full h-auto animate-pulse" />
                    </div>
                    <div className="absolute bottom-[10%] right-[8%] w-[100px] opacity-70 z-10">
                         <Image src="/assets/cloud-right.png" alt="cloud" width={100} height={50} className="w-full h-auto animate-pulse" />
                    </div>
                    <div className="absolute top-[60%] left-[5%] w-[120px] opacity-40 z-0 -rotate-12">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={120} height={60} className="w-full h-auto" />
                    </div>
                    <div className="absolute top-[70%] right-[8%] w-[110px] opacity-40 z-0 rotate-12">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={110} height={55} className="w-full h-auto" />
                    </div>
               </div>
               {/* Content */}
               <motion.div
                    className="relative z-10 max-w-lg mx-6 px-6 py-10 bg-white/10 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center text-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
               >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Poppins']">Oops!</h1>
                    <p className="text-white/90 text-lg md:text-xl font-semibold mb-2 font-['Poppins']">Halaman tidak ditemukan<br />atau Anda tidak memiliki akses.</p>
                    <p className="text-white/70 text-sm md:text-base mb-6 font-['Poppins']">Silakan kembali ke halaman utama atau hubungi admin jika Anda merasa ini adalah kesalahan.</p>
                    <Link
                         href="/"
                         className="inline-block px-6 py-2 rounded bg-gold text-primary font-bold hover:bg-accent transition mb-2 underline-offset-4 hover:underline"
                    >
                         Kembali ke Beranda
                    </Link>
                    <a
                         href="https://www.instagram.com/ormikxplore/"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="block text-[gold] hover:text-accent transition-colors text-sm md:text-base font-medium font-['Poppins'] underline decoration-[gold]/50 hover:decoration-accent mt-2"
                    >
                         @ormikxplore
                    </a>
               </motion.div>

               {/* Footer */}
               <motion.div
                    className="mt-6 text-center z-1 mx-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
               >
                    <p className="text-white/60 text-xs md:text-sm font-['Poppins']">
                         © 2025 ORMIK EXPLORE - Sekolah Tinggi Teknologi Terpadu Nurul Fikri
                    </p>
               </motion.div>
          </div>
     );
}
