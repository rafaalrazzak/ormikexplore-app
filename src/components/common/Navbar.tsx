"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
     const [isScrolled, setIsScrolled] = useState(false);
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               setIsScrolled(window.scrollY > 50);
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
          e.preventDefault();
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
               const headerOffset = 80; // Offset for fixed navbar
               const elementPosition = targetElement.getBoundingClientRect().top;
               const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

               window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
               });
          }
          // Close mobile menu after clicking
          setIsMobileMenuOpen(false);
     };

     const toggleMobileMenu = () => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
     };

     return (
          <header 
               id="navbar" 
               className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                    isScrolled ? 'bg-primary/80 backdrop-blur-md' : ''
               }`}
          >
               <nav className="container mx-auto flex items-center justify-between p-4">
                    {/* Navbar Left */}
                    <div className="items-center space-x-6 hidden md:flex">
                         <a 
                              href="#about" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'about')}
                         >
                              Tentang
                         </a>
                         <a 
                              href="#core-team" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'core-team')}
                         >
                              Core Team
                         </a>
                    </div>

                    {/* Center Logo */}
                    <Link href="/" className="flex-shrink-0">
                         <Image
                              src="/assets/logo-ormik.svg"
                              alt="ORMIK Logo"
                              width={40}
                              height={40}
                              className="h-16 w-auto"
                         />
                    </Link>

                    {/* Navbar Right */}
                    <div className="items-center space-x-6 hidden md:flex">
                         <a 
                              href="#campus-explore" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'campus-explore')}
                         >
                              Campus Explore
                         </a>
                         <a 
                              href="#download" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'download')}
                         >
                              Download
                         </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                         id="mobile-menu-btn" 
                         className="md:hidden text-white focus:outline-none"
                         onClick={toggleMobileMenu}
                    >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                         </svg>
                    </button>
               </nav>

               {/* Mobile Menu */}
               <div 
                    id="mobile-menu" 
                    className={`md:hidden bg-primary/80 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
                         isMobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
                    }`}
               >
                    <div className="flex flex-col items-center py-4 space-y-4">
                         <a 
                              href="#about" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'about')}
                         >
                              Tentang
                         </a>
                         <a 
                              href="#core-team" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'core-team')}
                         >
                              Core Team
                         </a>
                         <a 
                              href="#campus-explore" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'campus-explore')}
                         >
                              Campus Explore
                         </a>
                         <a 
                              href="#download" 
                              className="text-white hover:text-gold font-medium transition-colors"
                              onClick={(e) => handleSmoothScroll(e, 'download')}
                         >
                              Download
                         </a>
                    </div>
               </div>
          </header>
     );
}
