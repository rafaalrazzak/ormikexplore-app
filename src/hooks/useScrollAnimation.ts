'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = () => {
     const ref = useRef(null);
     const isInView = useInView(ref, {
          once: true,
          margin: "-100px 0px -100px 0px"
     });

     return { ref, isInView };
};

// Animation configuration objects for common animations
export const fadeInUp = {
     initial: { opacity: 0, y: 30 },
     animate: { opacity: 1, y: 0 },
     transition: { duration: 0.7, ease: "easeOut" }
};

export const fadeIn = {
     initial: { opacity: 0 },
     animate: { opacity: 1 },
     transition: { duration: 0.8, ease: "easeOut" }
};

export const slideInLeft = {
     initial: { opacity: 0, x: -50 },
     animate: { opacity: 1, x: 0 },
     transition: { duration: 0.8, ease: "easeOut" }
};

export const slideInRight = {
     initial: { opacity: 0, x: 50 },
     animate: { opacity: 1, x: 0 },
     transition: { duration: 0.8, ease: "easeOut" }
};

export const scaleIn = {
     initial: { opacity: 0, scale: 0.8 },
     animate: { opacity: 1, scale: 1 },
     transition: { duration: 0.7, ease: "easeOut" }
};
