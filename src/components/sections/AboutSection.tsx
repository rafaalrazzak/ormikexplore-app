import Image from "next/image";

export default function AboutSection() {
     return (
          <div className="relative">

               {/* Hexagonal decorative elements - positioned between Hero and About sections */}
               <div className="hidden lg:block absolute -top-24 left-20 w-[180px] z-[10] -rotate-12 opacity-80">
                    <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
               </div>
               <div className="hidden lg:block absolute -top-18 right-20 w-[160px] z-[10] rotate-12 opacity-80">
                    <Image src="/assets/hexagonal.png" alt="decorative" width={160} height={70} className="w-full h-auto" />
               </div>

               {/* Yellow Section */}
               <section className="relative py-8 sm:10 md:12 lg:py-16 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-[1] m-4 lg:m-8 shadow-lg">
                         <Image
                              src="/assets/background/bg-yellow.png"
                              alt=""
                              fill
                              className="opacity-100 rounded-xl object-center"
                              priority
                         />
                    </div>

                    <div className="container mx-auto px-12 sm:px-4 lg:px-6 relative z-10">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
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
                                        <div className="text-left">
                                             <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-snug sm:leading-relaxed md:leading-relaxed text-[midnightblue] font-['Poppins'] break-words">
                                                  Bentuk <span className="font-semibold">&quot;X&quot;</span> dan <span className="font-semibold">dua kaki</span> melambangkan manusia sebagai <span className="font-semibold">pusat eksplorasi</span> yang aktif bergerak maju, menjelajahi dunia <span className="font-semibold">akademik dan teknologi</span>.
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Center Content - Logo Display */}
                              <div className="lg:col-span-6 flex justify-center">
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
                                             {/* Oval overlay */}
                                             <div className="absolute -top-2 -right-24 lg:-right-40 md:-top-3 w-[200px] md:w-[200px] lg:w-[330px] z-[0] opacity-100">
                                                  <Image
                                                       src="/assets/oval-overlay.svg"
                                                       alt="decorative"
                                                       width={330}
                                                       height={70}
                                                       className="w-full h-auto"
                                                  />
                                             </div>

                                             {/* Hole overlay */}
                                             <div className="absolute top-2 -right-20 lg:-right-32 md:top-5 w-[170px] md:w-[200px] lg:w-[260px] z-[0] opacity-100">
                                                  <Image
                                                       src="/assets/hole.svg"
                                                       alt="decorative"
                                                       width={280}
                                                       height={70}
                                                       className="w-full h-auto"
                                                  />
                                             </div>

                                             {/* Main logo */}
                                             <div className="absolute -left-14 lg:-left-20 md:bottom-24 w-[100px] md:w-[200px] lg:w-[170px] z-[4] opacity-100">
                                                  <Image
                                                       src="/assets/logo-nobg.png"
                                                       alt="decorative"
                                                       width={170}
                                                       height={70}
                                                       className="w-full h-auto"
                                                  />
                                             </div>

                                             {/* Description text */}
                                             <div className="absolute bottom-1 z-[4] w-32 md:w-40 lg:w-48 h-16 md:h-20 lg:h-24 text-center flex items-center justify-center">
                                                  <p className="text-blue-950 text-[8px] md:text-[10px] lg:text-xs font-['Poppins'] leading-tight">
                                                       Font <span className="font-bold">geometris</span> & <span className="font-bold">tegas</span> yang mencerminkan <span className="font-bold">teknologi, struktur,</span> dan <span className="font-bold">profesionalisme</span>.
                                                  </p>
                                             </div>

                                             {/* Ticket image */}
                                             <div className="absolute -left-20 top-4 md:-left-24 lg:-left-28 md:top-8 w-40 h-48 md:w-48 md:h-60 lg:w-60 lg:h-72">
                                                  <Image
                                                       src="/assets/ticket.svg"
                                                       alt="ticket"
                                                       width={240}
                                                       height={288}
                                                       className="w-full h-full object-contain"
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Content - Description */}
                              <div className="lg:col-span-3">
                                   <div className="space-y-6">
                                        {/* Description Text */}
                                        <div className="text-[midnightblue] text-xs sm:text-sm md:text-base lg:text-base xl:text-lg leading-snug sm:leading-relaxed md:leading-relaxed font-['Poppins'] text-left break-words">
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
                                        <div className="relative">
                                             {/* Frame border */}
                                             <div className="flex items-center justify-center relative p-4">
                                                  {/* Border image */}
                                                  <div className="absolute inset-0 z-[10] w-[108%] bottom-3 -left-2.5">
                                                       <Image src="/assets/background/logo/border.png" alt="border" fill className="object-contain" />
                                                  </div>
                                                  <div className="flex relative z-10">
                                                       <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center relative rounded-md">
                                                            <Image src="/assets/background/logo/left.png" alt="background" fill />
                                                            <Image src="/assets/list-logo/left.svg" alt="logo" width={56} height={56} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain relative z-10" />
                                                       </div>
                                                       <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center relative rounded-md">
                                                            <Image src="/assets/background/logo/center.png" alt="background" fill />
                                                            <Image src="/assets/list-logo/center.svg" alt="logo" width={56} height={56} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain relative z-10" />
                                                       </div>
                                                       <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center relative rounded-md">
                                                            <Image src="/assets/background/logo/right.png" alt="background" fill />
                                                            <Image src="/assets/list-logo/right.svg" alt="logo" width={56} height={56} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain relative z-10" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Blue Section */}
               <section className="relative bg-primary py-12 lg:py-20 sm:10 md:12">

                    <div className="absolute inset-0 z-[1] m-4 lg:m-8 shadow-lg">
                         <Image
                              src="/assets/background/bg-horizontal.png"
                              alt=""
                              fill
                              className="opacity-100 rounded-xl object-center"
                              priority
                         />
                    </div>

                    <div className="container mx-auto px-12 sm:px-6 lg:px-8 relative z-10">
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

                                             <div className="w-full max-w-[140px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[300px]">
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
                                        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-['Poppins'] leading-snug sm:leading-relaxed md:leading-relaxed">
                                             Kegiatan yang bertujuan untuk <span className="font-semibold text-gold">memperkenalkan mahasiswa baru</span> dengan sistem <span className="font-semibold text-gold">perkuliahan</span> dan <span className="font-semibold text-gold">lingkungan kampus</span>.
                                        </p>
                                   </div>
                              </div>

                              {/* Vertical Divider (Desktop only) */}
                              <div className="hidden lg:flex absolute left-[58%] top-0 bottom-0 items-center justify-center">
                                   <div className="w-1 h-[100%] bg-white/90 rounded-full"></div>
                              </div>

                              {/* Right Content - ORMIK EXPLORE (Smaller width) */}
                              <div className="w-full lg:w-[42%] flex flex-col justify-start space-y-4 lg:space-y-6 lg:pl-6 text-white relative">
                                   <div className="w-full max-w-[180px] lg:max-w-[280px]">
                                        <Image
                                             src="/assets/heading/ormik-explore.svg"
                                             alt="Ormik Explore"
                                             width={400}
                                             height={120}
                                             className="w-full h-auto"
                                        />
                                   </div>
                                   <div className="text-left">
                                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-['Poppins'] leading-snug sm:leading-relaxed md:leading-relaxed">
                                             <span className="font-bold text-gold ">ORMIK EXPLORE 2025</span> <span className="font-normal text-white">memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.</span>
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

          </div>
     );
}
