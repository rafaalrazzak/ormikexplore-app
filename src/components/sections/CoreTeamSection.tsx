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
          position: "NEW POSITION",
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
          <section className="relative py-16 lg:py-24 overflow-hidden">

               {/* Decorative clouds */}
               <div className="absolute top-10 left-10 w-32 h-20 opacity-70 z-[2]">
                    <Image src="/assets/cloud.png" alt="cloud" width={128} height={80} className="w-full h-auto" />
               </div>
               <div className="absolute bottom-10 right-10 w-40 h-24 opacity-70 z-[2]">
                    <Image src="/assets/cloud-right.png" alt="cloud" width={160} height={96} className="w-full h-auto" />
               </div>

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Title */}
                    <div className="text-center mb-12 lg:mb-16">
                         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Poppins'] text-[gold] mb-4"
                         >
                              THE CORE TEAM IN HERE
                         </h2>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl">
                         {coreTeamData.map((member) => (
                              <div
                                   key={member.id}
                                   className="relative w-full max-w-sm mx-auto shadow-lg group bg-white"
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
                                             <h3 className="text-[gold] text-xl md:text-2xl font-bold mb-2 font-['Poppins']" >
                                                  {member.position}
                                             </h3>
                                             <p className="text-white text-sm md:text-sm leading-relaxed">
                                                  {member.description}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
