import Image from "next/image";

export default function Footer() {
     return (
          <footer className="relative overflow-hidden">
               <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mx-2 sm:mx-4 lg:mx-8">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-[1]">
                         <Image
                              src="/assets/background/bg-yellow.png"
                              alt=""
                              fill
                              className="object-cover"
                         />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 my-4 sm:my-6 lg:my-10">
                         <div className="flex flex-col items-center justify-center gap-4 text-center">
                              {/* Instagram Section */}
                              <div className="flex items-center gap-3">
                                   <div className="w-5 h-5 lg:w-6 lg:h-6">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[midnightblue]">
                                             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                   </div>
                                   <a
                                        href="https://www.instagram.com/ormikxplore/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm sm:text-sm lg:text-sm xl:text-base font-['Poppins'] text-[midnightblue] hover:underline font-medium"
                                   >
                                        @ormikxplore
                                   </a>
                              </div>

                              {/* Divider */}
                              <div className="w-12 h-0.5 bg-[midnightblue] opacity-100 rounded-full"></div>

                              {/* Copyright Section */}
                              <div className="flex items-center gap-3">
                                   <div className="w-5 h-5 lg:w-6 lg:h-6">
                                   </div>
                                   <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-['Poppins'] text-[midnightblue] font-medium">
                                        &copy; ORMIK EXPLORE 2025. All rights reserved.
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
