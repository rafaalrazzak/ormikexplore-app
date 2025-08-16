import Image from "next/image";

export default function AboutSection() {
     return (
          <div className="relative" id="about">
               <div className="absolute inset-0 pointer-events-none">

                    {/* Hexagonal decorative elements - positioned between Hero and About sections */}
                    <div className="hidden lg:block absolute -top-24 left-20 w-[180px] z-[10] -rotate-12 opacity-80">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>
                    <div className="hidden lg:block absolute -top-18 right-20 w-[160px] z-[10] rotate-12 opacity-80">
                         <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
                    </div>

                    <div className="absolute -bottom-12 -left-24 md:-left-38 w-48 h-28 sm:w-64 sm:h-36 md:w-80 md:h-48 lg:w-96 lg:h-56 xl:w-[28rem] xl:h-52 2xl:w-[32rem] 2xl:h-72 opacity-95 z-[11]">
                         <Image src="/assets/cloud.png" alt="cloud" width={384} height={224} className="w-full h-auto -rotate-12" />
                    </div>

                    <div className="absolute -bottom-6 right-1 md:right-0 w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 lg:w-30 lg:h-30 xl:w-40 xl:h-40 2xl:w-50 2xl:h-50 opacity-95 z-[11]">
                         <Image src="/assets/decorative/iconexplore.svg" alt="iconexplore" width={50} height={50} className="w-full h-auto" />
                    </div>
               </div>

               {/* Yellow Section */}
               <section className="relative py-8 sm:px-10 sm:py-14 md:px-12 lg:py-16 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-[1] m-4 lg:m-8 shadow-lg">
                         <Image
                              src="/assets/background/bg-yellow.png"
                              alt=""
                              fill
                              className="object-cover rounded-2xl"
                              priority
                         />
                    </div>

                    <div className="relative container mx-auto px-12 sm:px-4 md:px-14 lg:px-18 xl:px-12 z-10">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-18 items-center">
                              {/* Left Content - Explore Our Logo */}
                              <div className="lg:col-span-3">
                                   <div className="space-y-4 lg:space-y-6">
                                        {/* Heading Image */}
                                        <div className="flex justify-start">
                                             <div className="w-full max-w-[180px] lg:max-w-[220px]">
                                                  <Image
                                                       src="/assets/heading/ourlogo.svg"
                                                       alt="Explore Our Logo"
                                                       width={300}
                                                       height={100}
                                                       className="w-full h-auto"
                                                  />
                                             </div>
                                        </div>
                                        {/* Description Text */}
                                        <div className="text-justify">
                                             <p className="text-xs sm:text-sm  leading-snug sm:leading-relaxed md:leading-relaxed text-[midnightblue] font-['Poppins'] break-words">
                                                  Bentuk <span className="font-bold">&quot;X&quot;</span> dan <span className="font-bold">dua kaki</span> melambangkan manusia sebagai <span className="font-bold">pusat eksplorasi</span> yang aktif bergerak maju, menjelajahi dunia <span className="font-bold">akademik dan teknologi</span>.
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Center Content - Logo Display */}
                              <div className="lg:col-span-6 flex justify-center">

                                   <div className="absolute top-80 left-6 w-22 h-22 sm:top-[55%] sm:w-36 sm:-left-6 md:left-6 lg:left-[25%] xl:top-60 xl:left-[25%] xl:w-48 xl:h-48 opacity-100 z-[11]">
                                        <Image src="/assets/abouts-tags.svg" alt="cloud" width={128} height={80} className="w-full h-auto" />
                                   </div>

                                   <div className="relative p-8 lg:p-12 flex flex-col items-center text-white overflow-hidden w-full max-w-lg aspect-[4/3]">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 z-0">
                                             <Image
                                                  src="/assets/kerumunan.png"
                                                  alt="background"
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>

                                        {/* Left Gold Gradient Shadow */}
                                        <div className="absolute inset-y-0 left-0 w-1/7 z-[2]"
                                             style={{
                                                  background: 'linear-gradient(to right, rgba(226, 220, 0, 1) 0%, rgba(226,220,0,0.1) 50%, transparent 100%)'
                                             }}>
                                        </div>

                                        {/* Main Shadow Overlay */}
                                        <div className="absolute inset-0 z-[1]"
                                             style={{
                                                  backgroundColor: 'rgba(0, 14, 97, 0.65)'
                                             }}>
                                        </div>

                                        {/* Right Gold Gradient Shadow */}
                                        <div className="absolute inset-y-0 right-0 w-1/7 z-[2]"
                                             style={{
                                                  background: 'linear-gradient(to left, rgba(226, 220, 0, 1) 0%, rgba(226,220,0,0.1) 50%, transparent 100%)'
                                             }}>
                                        </div>

                                        {/* Content - Above overlays */}
                                        <div className="relative z-[3] flex flex-col items-center justify-center h-full">
                                             {/* Ticket */}
                                             <div className="absolute -top-2 -right-16 md:-top-3 w-[130px] sm:-right-34 sm:w-[270px] md:-right-40 md:w-[300px] lg:-right-30 lg:w-[240px] xl:-right-40 xl:w-[320px]">
                                                  <Image
                                                       src="/assets/ticket.svg"
                                                       alt="decorative"
                                                       width={330}
                                                       height={70}
                                                       className="w-full h-auto"
                                                  />
                                             </div>

                                        </div>
                                   </div>
                              </div>

                              {/* Right Content - Description */}
                              <div className="lg:col-span-3">
                                   <div className="space-y-0">
                                        {/* Description Text */}
                                        <div className="text-[midnightblue] text-xs sm:text-sm leading-snug sm:leading-relaxed md:leading-relaxed font-['Poppins'] text-justify break-words">
                                             <span className="font-normal">Logo ini </span>
                                             <span className="font-bold">merepresentasikan semangat eksplorasi akademik</span>
                                             <span className="font-normal"> dan </span>
                                             <span className="font-bold">teknologi</span>
                                             <span className="font-normal">, serta mengajak explorers untuk </span>
                                             <span className="font-bold">berani mengexplore</span>
                                             <span className="font-normal">, </span>
                                             <span className="font-bold">terhubung</span>
                                             <span className="font-normal"> dengan masa depan, dan </span>
                                             <span className="font-bold">aktif berinovasi</span>
                                             <span className="font-normal">.</span>
                                        </div>

                                        {/* Icon boxes with frame */}
                                        <div className="relative flex items-center justify-center">
                                             <div className="w-40 h-20 sm:w-50 sm:h-24 md:w-64 md:h-36 lg:w-72 lg:h-24 flex items-center justify-center relative rounded-md">
                                                  <Image src="/assets/logo-variations.svg" alt="logo" fill />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Blue Section */}
               <section className="relative py-8 sm:px-10 sm:py-14 md:px-12 lg:py-24">

                    <div className="absolute inset-0 z-[1] m-4 lg:m-8 shadow-lg">
                         <Image
                              src="/assets/background/bg-horizontal.png"
                              alt=""
                              fill
                              className="object-cover rounded-2xl"
                              priority
                         />
                    </div>

                    <div className="relative container mx-auto px-12 sm:px-4 md:px-14 lg:px-18 xl:px-12 z-10">
                         <div className="relative flex flex-col lg:flex-row items-start gap-6 lg:gap-0">
                              {/* Left Content - Blue Section (Larger width) */}
                              <div className="w-full lg:w-[58%] flex flex-col justify-start space-y-4 lg:space-y-6 lg:pr-6">

                                   <div className="flex flex-col gap-2">
                                        {/* Heading Images - Side by side with divider */}
                                        <div className="flex items-end gap-3 sm:gap-5">
                                             <div className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]">
                                                  <Image
                                                       src="/assets/heading/ormik.svg"
                                                       alt="Ormik Teks"
                                                       width={300}
                                                       height={100}
                                                       className="w-full h-auto"
                                                  />
                                             </div>
                                             {/* Divider line */}
                                             <div className="h-8 sm:h-10 md:h-12 w-1.5 bg-white rounded-2xl opacity-100 mx-1"></div>

                                             <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[300px]">
                                                  <Image
                                                       src="/assets/heading/orientasi-akademik.svg"
                                                       alt="Orientasi Akademik"
                                                       width={300}
                                                       height={100}
                                                       className="w-full h-auto"
                                                  />
                                             </div>
                                        </div>

                                        {/* Tagline */}
                                        <div className="text-left">
                                             <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Poppins']">
                                                  Sekolah Tinggi Teknologi Terpadu Nurul Fikri
                                             </p>
                                        </div>

                                   </div>

                                   {/* Deskripsi */}
                                   <div className="text-left">
                                        <p className="text-white text-xs sm:text-sm font-['Poppins']">
                                             Kegiatan yang bertujuan untuk <span className="font-bold text-gold">memperkenalkan mahasiswa baru</span> dengan sistem <span className="font-bold text-gold">perkuliahan</span> dan <span className="font-bold text-gold">lingkungan kampus</span>.
                                        </p>
                                   </div>
                              </div>

                              {/* Vertical Divider (Desktop only) */}
                              <div className="hidden lg:flex absolute left-[58%] top-0 bottom-0 items-center justify-center">
                                   <div className="w-1 h-[100%] bg-white/90 rounded-full"></div>
                              </div>

                              {/* Right Content - ORMIK EXPLORE (Smaller width) */}
                              <div className="w-full lg:w-[42%] flex flex-col justify-start space-y-4 xl:ml-12  lg:space-y-6 lg:pl-6 text-white relative">
                                   <div className="w-full max-w-[200px] sm:max-w-[300px] xl:max-w-[400px]">
                                        <Image
                                             src="/assets/heading/ormik-explore.svg"
                                             alt="Ormik Explore"
                                             width={400}
                                             height={120}
                                             className="w-full h-auto"
                                        />
                                   </div>
                                   <div className="text-left">
                                        <p className="text-xs sm:text-sm font-['Poppins']">
                                             <span className="font-bold">ORMIK EXPLORE 2025</span> <span className="text-white">memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.</span>
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

          </div>
     );
}
