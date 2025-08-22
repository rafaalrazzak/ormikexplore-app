"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp } from "@/hooks/useScrollAnimation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useState, useRef } from 'react';

interface TeamMember {
     id: number;
     name: string;
     position: string;
     description: string;
     image: string;
}

const coreTeamData: TeamMember[] = [
     {
          id: 1,
          name: "Steering Committee",
          position: "STEERING COMMITTEE",
          description: "Steering Committee bertanggung jawab mengendalikan seluruh proses kegiatan, mulai dari tahap perencanaan hingga evaluasi akhir, guna memastikan kegiatan berjalan sesuai tujuan dan harapan.",
          image: "/assets/members/SC.png"
     },
     {
          id: 2,
          name: "Project Officer",
          position: "PROJECT OFFICER",
          description: "Individu yang memegang tanggung jawab penuh atas pelaksanaan kegiatan ORMIK. Project Officer bertugas mengawasi secara langsung seluruh elemen di bawahnya, antara lain Sekretaris, Bendahara, dan divisi-divisi lainnya.",
          image: "/assets/members/PO.png"
     },
     {
          id: 3,
          name: "Sekretaris",
          position: "SEKRETARIS",
          description: "Membantu Project officer dalam menjalankan fungsi administrasi, dengan tanggung jawab utama meliputi pengelolaan dokumen, surat-menyurat, proposal, serta pembuatan notulen rapat.",
          image: "/assets/members/SEKRE.png"
     },
     {
          id: 4,
          name: "Bendahara",
          position: "BENDAHARA",
          description: "Bendahara bertugas untuk menyusun rencana anggaran, mencatat transaksi keuangan, dan membuat laporan pertanggungjawaban keuangan, serta berkoordinasi dengan pihak Kemahasiswaan terkait dana kegiatan.",
          image: "/assets/members/BENDAHARA.png"
     },
     {
          id: 5,
          name: "Public Relation",
          position: "PUBLIC RELATION",
          description: "Bertanggung jawab untuk mengelola komunikasi, membangun citra positif, serta menjalin hubungan antara ORMIK dengan eksternal di lingkup STT NF.",
          image: "/assets/members/PR.png"
     },
     {
          id: 6,
          name: "Liaison Officer",
          position: "LIAISON OFFICER",
          description: "Divisi ini akan berkomunikasi dengan publik eksternal maupun internal kampus. LO juga bertindak sebagai contact person bagi pihak internal maupun eksternal. Serta membantu briefing pihak internal maupun eksternal.",
          image: "/assets/members/LO.png"
     },
     {
          id: 7,
          name: "Event",
          position: "EVENT",
          description: "Bertanggung jawab atas perencanaan, koordinasi, dan pelaksanaan seluruh rangkaian acara ORMIK, termasuk acara puncak.",
          image: "/assets/members/EVENT.png"
     },
     {
          id: 8,
          name: "Media",
          position: "MEDIA",
          description: "Bertugas untuk memproduksi, mengelola, dan mengabadikan seluruh momen kegiatan ORMIK dalam bentuk dokumentasi serta memastikan seluruh kebutuhan visual dan desain terpenuhi.",
          image: "/assets/members/MEDIA.png"
     },
     {
          id: 9,
          name: "Kreatif",
          position: "KREATIF",
          description: "Divisi Kreatif bertugas menciptakan suasana acara yang menarik, interaktif, dan berkesan melalui berbagai elemen hiburan, visual, dan partisipatif.",
          image: "/assets/members/KREATIF.png"
     },
     {
          id: 10,
          name: "Kedisiplinan",
          position: "KEDISIPLINAN",
          description: "Bertugas memastikan seluruh rangkaian kegiatan ORMIK berjalan dengan tertib, tepat waktu, dan sesuai aturan yang telah ditetapkan.",
          image: "/assets/members/KEDIS.png"
     },
     {
          id: 11,
          name: "Mentor",
          position: "MENTOR",
          description: "Bertugas untuk membimbing, mengarahkan, mendampingi, dan memberikan dukungan kepada peserta ORMIK selama kegiatan berlangsung.",
          image: "/assets/members/MENTOR.png"
     },
     {
          id: 12,
          name: "Logistik",
          position: "LOGISTIK",
          description: "Bertanggung jawab untuk mengatur seluruh kebutuhan perlengkapan, peralatan, dan sarana prasarana yang diperlukan dalam mendukung kelancaran kegiatan ORMIK.",
          image: "/assets/members/LOGISTIK.png"
     },
     {
          id: 13,
          name: "Konsumsi",
          position: "KONSUMSI",
          description: "Bertugas untuk menyiapkan menu makanan, camilan, serta menjadwalkan waktu makan selama kegiatan ORMIK. Divisi ini juga harus mampu mengatur persediaan makanan dengan cermat untuk memastikan kelancaran acara.",
          image: "/assets/members/KONSUM.png"
     },
     {
          id: 14,
          name: "Medis",
          position: "MEDIS",
          description: "Bertugas untuk memastikan keselamatan dan kesehatan seluruh peserta dan panitia selama kegiatan ORMIK berlangsung.",
          image: "/assets/members/MEDIS.png"
     },
     {
          id: 15,
          name: "IT Support",
          position: "IT SUPPORT",
          description: "Fokus utama divisi ini mencakup instalasi perangkat, live streaming, serta pengawasan terhadap tiga objek utama, komputer, software, dan sistem jaringan (network).",
          image: "/assets/members/IT_SUPPORT.png"
     }
];

export default function CoreTeamSection() {
     const { ref, isInView } = useScrollAnimation();
     const [activeCard, setActiveCard] = useState<number | null>(null);
     /* eslint-disable @typescript-eslint/no-explicit-any */
     const topSwiperRef = useRef<any>(null); 
     /* eslint-disable @typescript-eslint/no-explicit-any */
     const bottomSwiperRef = useRef<any>(null);

     const topRowData = coreTeamData.slice(0, Math.ceil(coreTeamData.length / 2));
     const bottomRowData = coreTeamData.slice(Math.ceil(coreTeamData.length / 2));

     const handleCardClick = (memberId: number) => {
          setActiveCard(activeCard === memberId ? null : memberId);
     };

     const handleMouseEnter = () => {
          topSwiperRef.current?.swiper?.autoplay?.stop();
          bottomSwiperRef.current?.swiper?.autoplay?.stop();
     };

     const handleMouseLeave = () => {
          topSwiperRef.current?.swiper?.autoplay?.start();
          bottomSwiperRef.current?.swiper?.autoplay?.start();
     };

     /* eslint-disable @typescript-eslint/no-unused-vars */
     const TeamMemberCard = ({ member, keyPrefix }: { member: TeamMember; keyPrefix: string }) => {
          const isActive = activeCard === member.id;
          
          return (
               <div
                    className="relative w-full max-w-lg mx-auto shadow-lg group bg-white flex-shrink-0 cursor-pointer"
                    style={{ aspectRatio: "16/9", width: "480px" }}
                    onClick={() => handleCardClick(member.id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
               >
                    <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                         <Image
                              src={member.image}
                              alt={member.position}
                              fill
                              unoptimized={true}
                              className="object-contain w-full h-full transition-transform duration-500"
                         />
                         {/* Desktop hover overlay */}
                         <div className="hidden md:flex absolute inset-0 flex-col justify-center items-center p-4 text-center opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 bg-[midnightblue]/60">
                              <div className="relative mb-3">
                                   {/* Lapisan bawah: teks kuning solid dengan shadow dan glow */}
                                   <h3 className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-transparent font-['Poppins'] text-shadow-solid-glow">
                                        {member.position}
                                   </h3>
                                   {/* Lapisan atas: teks biru tua */}
                                   <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-midnightblue-custom font-['Poppins']">
                                        {member.position}
                                   </h3>
                              </div>
                              <p className="text-white text-sm leading-relaxed drop-shadow-sm">
                                   {member.description}
                              </p>
                         </div>
                         
                         {/* Mobile click overlay */}
                         <div className={`md:hidden absolute inset-0 flex flex-col justify-center items-center p-4 text-center backdrop-blur-md transition-opacity duration-500 bg-[midnightblue]/60 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                              <div className="relative mb-3">
                                   {/* Lapisan bawah: teks kuning solid dengan shadow dan glow */}
                                   <h3 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-transparent font-['Poppins'] text-shadow-solid-glow">
                                        {member.position}
                                   </h3>
                                   {/* Lapisan atas: teks biru tua */}
                                   <h3 className="relative z-10 text-xl font-bold text-midnightblue-custom font-['Poppins']">
                                        {member.position}
                                   </h3>
                              </div>
                              <p className="text-white text-xs leading-relaxed drop-shadow-sm">
                                   {member.description}
                              </p>
                         </div>
                    </div>
               </div>
          );
     };

     return (
          <motion.section
               className="relative py-16 lg:py-24 overflow-hidden"
               id="core-team"
               ref={ref}
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : { opacity: 0 }}
               transition={{ duration: 0.8 }}
          >

               {/* Decorative clouds */}
               <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute bottom-6 -right-30 w-48 h-28 sm:w-64 sm:h-36 md:w-80 md:h-48 lg:w-96 lg:h-56 xl:w-[28rem] xl:h-64 2xl:w-[32rem] 2xl:h-72 opacity-95 z-[11]">
                         <Image src="/assets/cloud.png" alt="cloud" width={384} height={224} className="w-full h-auto -rotate-12" />
                    </div>

                    <div className="absolute top-44 -right-6 w-26 h-26 sm:top-30 sm:right-0 sm:w-40 sm:h-40 md:top-44 md:right-0 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-40 xl:h-40 2xl:h-72 z-[2]">
                         <Image src="/assets/hexagonal.png" alt="hexagonal" width={50} height={50} className="w-full h-auto" />
                    </div>

                    <div className="absolute bottom-0 -left-12 w-26 h-26 sm:bottom-0 sm:-left-14 sm:w-40 sm:h-40 md:bottom-6 md:-left-10 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-40 xl:h-40 2xl:h-72 z-[11]">
                         <Image src="/assets/hexagonal.png" alt="hexagonal" width={50} height={50} className="w-full h-auto" />
                    </div>
               </div>

               <div className="mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                    {/* Title */}
                    <motion.div
                         className="text-center mb-16 lg:mb-20"
                         initial={fadeInUp.initial}
                         animate={isInView ? fadeInUp.animate : fadeInUp.initial}
                         transition={{ duration: 0.8, delay: 0.2 }}
                    >
                         <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Poppins'] text-[gold] mb-6"
                         >
                              THE CORE TEAM IN HERE
                         </h2>
                    </motion.div>

                    {/* Team Grid */}
                    <div className="space-y-3">
                         <div className="relative w-full overflow-hidden">
                              {/* Shadow overlay for right edge - Top Row */}
                              <div className="absolute top-0 right-0 w-12 h-full z-[20] pointer-events-none">
                                   <div className="w-full h-full bg-gradient-to-l from-[#000E61] via-[#000E61]/60 to-transparent"></div>
                              </div>

                              <Swiper
                                   ref={topSwiperRef}
                                   modules={[Autoplay]}
                                   spaceBetween={12}
                                   slidesPerView="auto"
                                   loop={true}
                                   autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                   }}
                                   speed={10000}
                                   className="!overflow-visible"
                              >
                                   {topRowData.map((member) => (
                                        <SwiperSlide key={`top-${member.id}`} className="!w-auto">
                                             <TeamMemberCard member={member} keyPrefix="top" />
                                        </SwiperSlide>
                                   ))}
                              </Swiper>
                         </div>

                         <div className="relative w-full overflow-hidden">
                              {/* Shadow overlay for right edge - Bottom Row */}
                              <div className="absolute top-0 right-0 w-12 h-full z-20 pointer-events-none">
                                   <div className="w-full h-full bg-gradient-to-l from-[#000E61] via-[#000E61]/60 to-transparent"></div>
                              </div>

                              <Swiper
                                   ref={bottomSwiperRef}
                                   modules={[Autoplay]}
                                   spaceBetween={12}
                                   slidesPerView="auto"
                                   loop={true}
                                   autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                   }}
                                   speed={10000}
                                   className="!overflow-visible"
                              >
                                   {bottomRowData.map((member) => (
                                        <SwiperSlide key={`bottom-${member.id}`} className="!w-auto">
                                             <TeamMemberCard member={member} keyPrefix="bottom" />
                                        </SwiperSlide>
                                   ))}
                              </Swiper>
                         </div>
                    </div>
               </div>
          </motion.section>
     );
}
