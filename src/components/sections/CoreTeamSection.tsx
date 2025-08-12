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
          description: "Bertanggung jawab atas perencanaan dan koordinasi seluruh kegiatan ORMIK. Project Officer memimpin tim organisasi secara langsung dan berkolaborasi dengan stakeholder untuk memastikan pencapaian tujuan kegiatan.",
          image: "/assets/members/sc.png"
     },
     {
          id: 2,
          name: "Project Officer",
          position: "CREATIVE TEAM",
          description: "Tim kreatif yang bertanggung jawab atas konsep visual, desain grafis, dan materi promosi untuk kegiatan ORMIK. Mereka menciptakan identitas visual yang menarik dan konsisten.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 3,
          name: "Media & Documentation",
          position: "MEDIA & DOCUMENTATION",
          description: "Tim yang menangani dokumentasi kegiatan, pengelolaan media sosial, dan publikasi konten. Mereka memastikan setiap momen kegiatan terekam dengan baik.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 4,
          name: "Event Organizer",
          position: "EVENT ORGANIZER",
          description: "Tim yang bertanggung jawab atas pelaksanaan teknis kegiatan, koordinasi venue, rundown acara, dan memastikan kelancaran jalannya semua agenda ORMIK.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 5,
          name: "Logistics & Facilities",
          position: "LOGISTICS & FACILITIES",
          description: "Tim yang menangani kebutuhan logistik, perlengkapan, konsumsi, dan fasilitas yang diperlukan untuk mendukung kegiatan ORMIK secara menyeluruh.",
          image: "https://placehold.co/1920x1080"
     },
     {
          id: 6,
          name: "Registration & Relations",
          position: "REGISTRATION & RELATIONS",
          description: "Tim yang menangani pendaftaran peserta, hubungan eksternal, komunikasi dengan mahasiswa baru, dan memastikan informasi kegiatan tersampaikan dengan baik.",
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                         {coreTeamData.map((member) => (
                              <div
                                   key={member.id}
                                   className="relative w-full max-w-sm mx-auto rounded-lg shadow-lg group bg-white"
                                   style={{ aspectRatio: "16/9" }}
                              >
                                   <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                                        <Image
                                             src={member.image}
                                             alt={member.position}
                                             fill
                                             unoptimized={true}
                                             className="object-contain w-full h-full transition-transform duration-500"
                                             style={{ borderRadius: "0.5rem" }}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 bg-[midnightblue]/60 rounded-lg">
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
