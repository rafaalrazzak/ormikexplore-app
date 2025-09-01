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
     { label: "Explorer Kit", href: "#download" },
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
     const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const targetId = item.href.substring(1); // Remove the '#' from href
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
               targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
               });
          }
     };

     return (
          <motion.a
               href={item.href}
               onClick={handleClick}
               className="group relative text-white/90 hover:text-white text-sm font-medium focus:outline-none focus:text-[gold] cursor-pointer"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               transition={CONFIG.transitions.quick}
          >
               {item.label}
               <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-[gold] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={CONFIG.transitions.smooth}
               />
          </motion.a>
     );
};

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
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

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
     const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
          e.preventDefault();
          const targetId = href.substring(1); // Remove the '#' from href
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
               targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
               });
          }
          onClose(); // Close menu after navigation
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
                                   className="px-6 py-8 space-y-1"
                              >
                                   {NAV_ITEMS.map((item, index) => (
                                        <motion.a
                                             key={item.href}
                                             href={item.href}
                                             onClick={(e) => handleMobileNavClick(e, item.href)}
                                             initial={{ opacity: 0, x: -20 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             exit={{ opacity: 0, x: -10 }}
                                             transition={{
                                                  delay: index * 0.05 + 0.15,
                                                  ...CONFIG.transitions.smooth
                                             }}
                                             whileHover={{ x: 8, scale: 1.02 }}
                                             whileTap={{ scale: 0.98 }}
                                             className="block text-white/95 hover:text-[gold] text-lg font-medium py-4 px-4 -mx-4 rounded-lg hover:bg-white/5 border-b border-white/5 last:border-0 will-change-transform cursor-pointer"
                                        >
                                             {item.label}
                                        </motion.a>
                                   ))}
                              </motion.div>
                         </motion.div>
                    </>
               )}
          </AnimatePresence>
     );
};
