"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
     AnimatePresence,
     motion,
     useScroll,
     useSpring,
     useTransform,
} from "framer-motion";
import { useSpring as useReactSpring, animated, config } from "@react-spring/web";

const CONFIG = {
     scroll: {
          START: 60,
          BLEND: 80,
          MENU_APPEAR: 0.2,
     },
     mobile: {
          LOGO_SLIDE: 0.4,
          LOGO_MAX_WIDTH: 110,
     },
     desktop: {
          TOP_OFFSET: 64,
     },
     spring: {
          stiffness: 120,
          damping: 30,
          mass: 0.4,
          restDelta: 0.001,
          restSpeed: 0.001,
     },
     transitions: {
          smooth: {
               type: "spring" as const,
               stiffness: 120,
               damping: 30,
               mass: 0.4,
               restDelta: 0.001,
          },
          quick: {
               type: "spring" as const,
               stiffness: 180,
               damping: 25,
               mass: 0.3,
          },
          menu: {
               duration: 0.3,
               ease: [0.25, 0.1, 0.25, 1] as const,
          },
     },
} as const;

const NAV_ITEMS = [
     { label: "Tentang", href: "#about" },
     { label: "Core Team", href: "#core-team" },
     { label: "Campus Explore", href: "#campus-explore" },
     { label: "Explorer Kit", href: "#explore-kit" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

const useResponsive = () => {
     const [isMobile, setIsMobile] = useState(false);
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          const mediaQuery = window.matchMedia("(max-width: 767px)");

          const updateScreenSize = () => setIsMobile(mediaQuery.matches);

          setMounted(true);
          updateScreenSize();

          mediaQuery.addEventListener("change", updateScreenSize);
          return () => mediaQuery.removeEventListener("change", updateScreenSize);
     }, []);

     return { isMobile, mounted };
};

const useScrollProgress = () => {
     const { scrollY } = useScroll();

     const rawProgress = useTransform(
          scrollY,
          [CONFIG.scroll.START, CONFIG.scroll.START + CONFIG.scroll.BLEND],
          [0, 1],
          { clamp: true }
     );

     return useSpring(rawProgress, {
          ...CONFIG.spring,
          velocity: 0,
     });
};

export default function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const { isMobile, mounted } = useResponsive();
     const progress = useScrollProgress();

     const backgroundColor = useTransform(
          progress,
          [0, 1],
          ["rgba(0,0,0,0)", "rgba(0,14,97,0.95)"]
     );

     const logoScale = useTransform(
          progress,
          [0, 1],
          isMobile ? [1, 0.8] : [1, 0.75]
     );

     const logoY = useTransform(
          progress,
          [0, 1],
          [isMobile ? 60 : CONFIG.desktop.TOP_OFFSET, 0]
     );

     const logoX = useTransform(
          progress,
          [0, CONFIG.mobile.LOGO_SLIDE, 1],
          [0, 0, isMobile ? -150 : 0]
     );

     const navOpacity = useTransform(progress, [0.3, 1], [0, 1]);
     const menuScale = useTransform(progress, [CONFIG.scroll.MENU_APPEAR, 0.8], [0, 1]);
     const menuOpacity = useTransform(progress, [CONFIG.scroll.MENU_APPEAR, 0.8], [0, 1]);

     const styles = useMemo(() => ({
          container: { backgroundColor },
          logo: { scale: logoScale, y: logoY, x: logoX },
          nav: { opacity: navOpacity },
          menu: { scale: menuScale, opacity: menuOpacity },
     }), [backgroundColor, logoScale, logoY, logoX, navOpacity, menuScale, menuOpacity]);

     const toggleMenu = useCallback(() => {
          setIsMenuOpen(prev => !prev);
     }, []);

     const closeMenu = useCallback(() => {
          if (isMenuOpen) setIsMenuOpen(false);
     }, [isMenuOpen]);

     useEffect(() => {
          const handleKeyDown = (e: KeyboardEvent) => {
               if (e.key === "Escape" && isMenuOpen) closeMenu();
          };

          const handleScroll = () => {
               if (isMenuOpen) closeMenu();
          };

          if (isMenuOpen) {
               document.addEventListener("keydown", handleKeyDown);
               window.addEventListener("scroll", handleScroll, { passive: true });

               return () => {
                    document.removeEventListener("keydown", handleKeyDown);
                    window.removeEventListener("scroll", handleScroll);
               };
          }
     }, [isMenuOpen, closeMenu]);

     useEffect(() => {
          if (isMenuOpen && isMobile) {
               const originalOverflow = document.body.style.overflow;
               document.body.style.overflow = "hidden";

               return () => {
                    document.body.style.overflow = originalOverflow;
               };
          }
     }, [isMenuOpen, isMobile]);

     const navSections = useMemo(
          () => ({
               left: NAV_ITEMS.slice(0, 2),
               right: NAV_ITEMS.slice(2),
          }),
          []
     );

     if (!mounted) {
          return <div className="h-16 w-full" aria-hidden="true" />;
     }

     return (
          <header className="fixed inset-x-0 top-0 z-50">
               <motion.div
                    style={styles.container}
                    className="relative will-change-transform"
               >
                    <nav className="mx-auto max-w-7xl">
                         {/* Desktop Layout */}
                         {!isMobile && (
                              <div className="flex items-center justify-between px-6 py-4 h-16">
                                   <motion.div
                                        style={styles.nav}
                                        className="flex items-center space-x-8 will-change-transform"
                                   >
                                        {navSections.left.map((item) => (
                                             <NavLink key={item.href} item={item} />
                                        ))}
                                   </motion.div>

                                   <motion.div
                                        style={styles.logo}
                                        className="will-change-transform"
                                   >
                                        <LogoComponent />
                                   </motion.div>

                                   <motion.div
                                        style={styles.nav}
                                        className="flex items-center space-x-8 will-change-transform"
                                   >
                                        {navSections.right.map((item) => (
                                             <NavLink key={item.href} item={item} />
                                        ))}
                                   </motion.div>
                              </div>
                         )}

                         {/* Mobile Layout */}
                         {isMobile && (
                              <div className="flex items-center justify-center px-4 py-3 h-16 relative">
                                   <motion.div
                                        style={styles.logo}
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                                   >
                                        <LogoComponent />
                                   </motion.div>

                                   <motion.div
                                        style={styles.menu}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 will-change-transform"
                                   >
                                        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
                                   </motion.div>
                              </div>
                         )}

                         {/* Mobile Menu */}
                         <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
                    </nav>
               </motion.div>
          </header>
     );
}

const LogoComponent = () => (
     <Link href="/" className="block">
          <Image
               src="/assets/logo-ormik.svg"
               alt="ORMIK"
               width={160}
               height={42}
               priority
               className="h-auto w-auto max-w-[110px] md:max-w-[160px] transition-opacity duration-200 hover:opacity-80"
               sizes="(max-width: 768px) 110px, 160px"
          />
     </Link>
);

const NavLink = ({ item }: { item: NavItem }) => {
     const [isHovered, setIsHovered] = useState(false);
     
     const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const targetId = item.href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
               targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
               });
          }
     };

     // Simple, clean spring animations
     const linkSpring = useReactSpring({
          y: isHovered ? -1 : 0,
          scale: isHovered ? 1.02 : 1,
          config: config.gentle,
     });

     const underlineSpring = useReactSpring({
          width: isHovered ? "100%" : "0%",
          opacity: isHovered ? 1 : 0,
          config: config.gentle,
     });

     return (
          <animated.a
               href={item.href}
               onClick={handleClick}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               style={{
                    transform: linkSpring.y.to(y => `translateY(${y}px) scale(${linkSpring.scale.get()})`),
               }}
               className="relative px-4 py-2 text-white/85 hover:text-white text-sm font-medium focus:outline-none focus:text-[gold] cursor-pointer transition-colors duration-300"
          >
               {/* Clean background on hover */}
               <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
               />
               
               {/* Text */}
               <span className="relative z-10 transition-colors duration-300">
                    {item.label}
               </span>
               
               {/* Minimalist underline */}
               <animated.div
                    style={{
                         width: underlineSpring.width,
                         opacity: underlineSpring.opacity,
                    }}
                    className="absolute bottom-0 left-1/2 h-0.5 bg-[gold] transform -translate-x-1/2"
               />
          </animated.a>
     );
};const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
     <motion.button
          onClick={onClick}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="p-2 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-[gold]/50 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={CONFIG.transitions.quick}
     >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
               {Array.from({ length: 3 }, (_, i) => (
                    <motion.span
                         key={i}
                         animate={
                              isOpen
                                   ? i === 0
                                        ? { rotate: 45, y: 8 }
                                        : i === 1
                                             ? { opacity: 0, x: -10 }
                                             : { rotate: -45, y: -8 }
                                   : { rotate: 0, y: 0, opacity: 1, x: 0 }
                         }
                         transition={CONFIG.transitions.smooth}
                         className="block w-6 h-0.5 bg-current rounded-full will-change-transform"
                    />
               ))}
          </div>
     </motion.button>
);

const MobileNavItem = ({ item, index, onClick }: { item: NavItem; index: number; onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) => {
     const [isPressed, setIsPressed] = useState(false);

     // Clean, minimal spring animations for mobile
     const itemSpring = useReactSpring({
          x: isPressed ? 6 : 0,
          scale: isPressed ? 0.98 : 1,
          config: config.gentle,
     });

     const backgroundSpring = useReactSpring({
          opacity: isPressed ? 1 : 0,
          config: config.gentle,
     });

     const handleTouchStart = () => setIsPressed(true);
     const handleTouchEnd = () => setIsPressed(false);
     const handleMouseDown = () => setIsPressed(true);
     const handleMouseUp = () => setIsPressed(false);
     const handleMouseLeave = () => setIsPressed(false);

     return (
          <animated.a
               href={item.href}
               onClick={(e) => {
                    e.preventDefault();
                    onClick(e, item.href);
               }}
               onTouchStart={handleTouchStart}
               onTouchEnd={handleTouchEnd}
               onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseLeave}
               style={{
                    transform: itemSpring.x.to(x => `translateX(${x}px) scale(${itemSpring.scale.get()})`),
               }}
               className="relative block text-white/90 active:text-white text-lg font-medium py-5 px-4 rounded-lg will-change-transform cursor-pointer transition-colors duration-200 select-none"
          >
               {/* Simple background highlight */}
               <animated.div
                    style={{ opacity: backgroundSpring.opacity }}
                    className="absolute inset-0 bg-white/8 rounded-lg"
               />
               
               {/* Minimal side indicator */}
               <motion.div
                    className="absolute left-0 top-1/2 w-1 h-8 bg-[gold] rounded-r-full transform -translate-y-1/2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isPressed ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
               />
               
               {/* Text */}
               <span className="relative z-10 ml-4 transition-colors duration-200">
                    {item.label}
               </span>
               
               {/* Simple bottom line */}
               <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px bg-[gold]/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPressed ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
               />
          </animated.a>
     );
};
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
     const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
          e.preventDefault();
          e.stopPropagation();
          
          console.log('Mobile nav clicked:', href); // Debug log
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
               // Close menu first
               onClose();
               
               // Small delay to let menu close animation start
               setTimeout(() => {
                    targetElement.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start'
                    });
               }, 100);
          } else {
               console.warn('Target element not found:', targetId);
               onClose(); // Still close menu even if target not found
          }
     };

     return (
          <AnimatePresence mode="wait">
               {isOpen && (
                    <>
                         {/* Menu content */}
                         <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={CONFIG.transitions.menu}
                              className="md:hidden overflow-hidden bg-[#000E61]/95 backdrop-blur-md border-t border-[gold]/20 relative"
                         >
                              <motion.div
                                   initial={{ y: -20 }}
                                   animate={{ y: 0 }}
                                   exit={{ y: -10 }}
                                   transition={{
                                        delay: 0.1,
                                        ...CONFIG.transitions.smooth
                                   }}
                                   className="px-6 py-6 space-y-2"
                              >
                                   {NAV_ITEMS.map((item, index) => (
                                        <motion.div
                                             key={item.href}
                                             initial={{ opacity: 0, x: -20 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             exit={{ opacity: 0, x: -10 }}
                                             transition={{
                                                  delay: index * 0.05 + 0.15,
                                                  ...CONFIG.transitions.smooth
                                             }}
                                        >
                                             <MobileNavItem 
                                                  item={item} 
                                                  index={index} 
                                                  onClick={handleMobileNavClick} 
                                             />
                                        </motion.div>
                                   ))}
                              </motion.div>
                         </motion.div>
                    </>
               )}
          </AnimatePresence>
     );
};