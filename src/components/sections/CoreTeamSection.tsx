"use client";
import Image from "next/image";

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
          description: "Langkah besar selalu dimulai dari arah yang tepat. Inilah mereka, tim pengarah yang memastikan seluruh proses ORMIK Explore 2025 berjalan sesuai visi dan misi. Tegas, bijak, dan penuh pertimbangan Steering Committee hadir sebagai kompas utama Core Team.",
          image: "/assets/members/sc.png"
     },
     {
          id: 2,
          name: "Project Officer",
          position: "PROJECT OFFICER",
          description: "Di balik geraknya seluruh tim, ada satu sosok sentral yang jadi penggerak. Dengan semangat dan kepemimpinan, ia memimpin semua bagian menuju satu tujuan besar suksesnya ORMIK Explore 2025.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 3,
          name: "Sekretaris ",
          position: "SEKRETARIS",
          description: "Catatan rapi, jadwal teratur, dan koordinasi dokumen yang presisi semua berkat mereka! Tim Sekretaris adalah otak administratif yang menjaga agar setiap detail terkelola dengan baik.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 4,
          name: "Bendahara",
          position: "BENDARAHA",
          description: "Mengelola keuangan bukan soal angka, tapi soal tanggung jawab. Tim ini memastikan setiap rupiah dikelola dengan bijak, demi keberlangsungan acara.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 5,
          name: "Public Relations",
          position: "PUBLIC RELATIONS",
          description: "Public Relations bukan sekadar bicara, mereka adalah jembatan komunikasi, pencipta citra positif, dan penyambung pesan dari dalam ke luar. Tim Public Relations membangun relasi dan menghadirkan ORMIK Explore 2025 dengan wajah profesional dan ramah.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 6,
          name: "Liaison Officer",
          position: "LIAISON OFFICER",
          description: "Komunikasi adalah kunci kelancaran. Tim LO siap menjadi penghubung antara narasumber dan Core team agar tidak ada informasi yang tertinggal.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 7,
          name: "Event",
          position: "EVENT",
          description: "Dari konsep hingga panggung utama, mereka adalah kreator pengalaman. Tim Event merancang alur kegiatan dengan penuh energi dan kejutan siap bikin ORMIK Explore 2025 makin berkesan.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 8,
          name: "Media",
          position: "MEDIA",
          description: "Dokumentasi, publikasi, dan otak di balik semua visual yang dilakukan dengan penuh kreativitas. Tim media adalah wajah ORMIK Explore 2025 di depan publik, mengabadikan momen dan membagikannya ke dunia.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 9,
          name: "Kreatif",
          position: "KREATIF",
          description: "Di balik tawa dan keseruan ORMIK, ada mereka yang siap jadi pengatur vibe! Dengan ide-ide segar dan semangat yang penuh warna, mereka hadir untuk membawa keceriaan dan kehangatan di setiap momen ORMIK Explore 2025. ",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 10,
          name: "Kedisiplinan",
          position: "KEDISIPLINAN",
          description: "Tegas bukan berarti menakutkan, tapi peduli dan bertanggung jawab. Tim kedisiplinan menjaga agar jalannya acara tetap kondusif dan tertib. ",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 11,
          name: "Mentor",
          position: "MENTOR",
          description: "Menjadi teman, pembimbing, sekaligus teladan, itulah peran mereka. Tim mentor siap membimbing Explorers agar tidak merasa sendiri dalam proses adaptasi.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 12,
          name: "Logistik",
          position: "LOGISTIK",
          description: "Di balik setiap alat, perlengkapan, dan kebutuhan teknis ada mereka yang bekerja tanpa pamrih. Tim logistik memastikan semua peralatan tersedia dan siap digunakan kapan pun dibutuhkan.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 13,
          name: "Konsumsi",
          position: "KONSUMSI",
          description: "Perjalanan panjang butuh tenaga, dan tenaga butuh asupan! Tim konsumsi bertugas memastikan semua Explorers tetap bertenaga selama kegiatan.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 14,
          name: "Medis",
          position: "MEDIS",
          description: "Kesehatan adalah prioritas, dan mereka siap menjaga kita setiap saat. Tim medis selalu siaga untuk memberikan pertolongan dan memastikan kondisi Explorers.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 15,
          name: "IT Support",
          position: "IT SUPPORT",
          description: "Di balik kelancaran sistem dan teknologi, ada mereka yang sigap dan tanggap! Tim IT Support hadir untuk memastikan semua aspek digital berjalan mulus tanpa hambatan.",
          image: "https://placehold.co/1920x1080"
     }
];

export default function CoreTeamSection() {
     return (
          <section className="relative py-16 lg:py-24 overflow-hidden" id="core-team">

               {/* Decorative clouds */}
               <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute bottom-6 -right-30 w-96 h-56 opacity-95 z-[11]">
                         {/* <Image src="/assets/cloud.png" alt="cloud" width={384} height={224} className="w-full h-auto -rotate-12" /> */}
                    </div>

               </div>


               <div className="mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                    {/* Title */}
                    <div className="text-center mb-16 lg:mb-20">
                         <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Poppins'] text-[gold] mb-6"
                         >
                              THE CORE TEAM IN HERE
                         </h2>
                    </div>

                    {/* Team Grid */}
                    <div className="space-y-4">
                         {/* Top Row - Left to Right */}
                         <div className="relative overflow-hidden">
                              {/* Shadow overlay for right edge - Top Row */}
                              <div className="absolute top-0 right-0 w-12 h-full z-[20] pointer-events-none">
                                   <div className="w-full h-full bg-gradient-to-l from-[#000E61] via-[#000E61]/60 to-transparent"></div>
                              </div>

                              <div className="flex animate-scroll-left space-x-4">
                                   {/* Duplicate the first half of array to create seamless loop */}
                                   {[...coreTeamData.slice(0, Math.ceil(coreTeamData.length / 2)), ...coreTeamData.slice(0, Math.ceil(coreTeamData.length / 2))].map((member, index) => (
                                        <div
                                             key={`top-${member.id}-${index}`}
                                             className="relative w-full max-w-md mx-auto shadow-lg group bg-white flex-shrink-0"
                                             style={{ aspectRatio: "16/9" }}
                                        >
                                             <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                                                  <Image
                                                       src={member.image}
                                                       alt={member.position}
                                                       fill
                                                       unoptimized={true}
                                                       className="object-contain w-full h-full transition-transform duration-500"
                                                  />
                                                  <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 bg-[midnightblue]/60">
                                                       <h3 className="text-[gold] text-2xl md:text-3xl font-bold mb-3 font-['Poppins']" >
                                                            {member.position}
                                                       </h3>
                                                       <p className="text-white text-base md:text-lg leading-relaxed">
                                                            {member.description}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Bottom Row - Right to Left */}
                         <div className="relative overflow-hidden">
                              {/* Shadow overlay for right edge - Bottom Row */}
                              <div className="absolute top-0 right-0 w-12 h-full z-20 pointer-events-none">
                                   <div className="w-full h-full bg-gradient-to-l from-[#000E61] via-[#000E61]/60 to-transparent"></div>
                              </div>
                              <div className="flex animate-scroll-left space-x-4">
                                   {/* Duplicate the second half of array to create seamless loop */}
                                   {[...coreTeamData.slice(Math.ceil(coreTeamData.length / 2)), ...coreTeamData.slice(Math.ceil(coreTeamData.length / 2))].map((member, index) => (
                                        <div
                                             key={`bottom-${member.id}-${index}`}
                                             className="relative w-full max-w-md mx-auto shadow-lg group bg-white flex-shrink-0"
                                             style={{ aspectRatio: "16/9" }}
                                        >
                                             <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                                                  <Image
                                                       src={member.image}
                                                       alt={member.position}
                                                       fill
                                                       unoptimized={true}
                                                       className="object-contain w-full h-full transition-transform duration-500"
                                                  />
                                                  <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 bg-[midnightblue]/60">
                                                       <h3 className="text-[gold] text-2xl md:text-3xl font-bold mb-3 font-['Poppins']" >
                                                            {member.position}
                                                       </h3>
                                                       <p className="text-white text-base md:text-lg leading-relaxed">
                                                            {member.description}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </section >
     );
}
