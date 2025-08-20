"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingSpinnerProps {
     size?: number;
     color?: string;
}

const LoadingSpinner = ({ size = 24, color = "white" }: LoadingSpinnerProps) => {
     return (
          <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="inline-block"
               style={{ width: size, height: size }}
          >
               <svg
                    className="animate-spin"
                    style={{ width: size, height: size }}
                    viewBox="0 0 24 24"
                    fill="none"
               >
                    <circle
                         cx="12"
                         cy="12"
                         r="10"
                         stroke={color}
                         strokeWidth="2"
                         strokeOpacity="0.3"
                    />
                    <path
                         d="M12 2a10 10 0 0 1 10 10"
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                    />
               </svg>
          </motion.div>
     );
};

interface SimpleLoadingProps {
     message?: string;
}

const SimpleLoading = ({ message = "Loading..." }: SimpleLoadingProps) => {
     return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary">
               {/* Background */}
               <div className="absolute inset-0">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="object-cover opacity-50"
                         priority
                    />
               </div>

               {/* Content */}
               <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Logo */}
                    <motion.div
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.5 }}
                         className="mb-6"
                    >
                         <Image
                              src="/assets/logo-ormik.svg"
                              alt="ORMIK Logo"
                              width={80}
                              height={80}
                              className="w-16 h-16 md:w-20 md:h-20"
                         />
                    </motion.div>

                    {/* Loading Spinner */}
                    <div className="mb-4">
                         <LoadingSpinner size={32} />
                    </div>

                    {/* Message */}
                    <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.3 }}
                         className="text-white font-['Poppins'] text-sm md:text-base"
                    >
                         {message}
                    </motion.p>
               </div>
          </div>
     );
};

export default SimpleLoading;
