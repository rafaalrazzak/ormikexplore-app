import Image from "next/image";

interface CampusData {
     titleImage: string;
     address: string;
     mapImage: string;
}

const campusData: CampusData[] = [
     {
          titleImage: "/assets/heading/campus-a.svg",
          address: "Jl. Setu Indah No.116, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
          mapImage: "/assets/campus/campus-b.svg"
     },
     {
          titleImage: "/assets/heading/campus-b.svg",
          address: "Jl. Lenteng Agung Raya No.20 RT.5/RW.1 Lenteng Agung, Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan, 12640",
          mapImage: "/assets/campus/campus-b.svg"
     }
];

export default function CampusExplore() {
     return (
          <section className="relative py-16 lg:py-32">

               {/* Decorative clouds */}
               <div className="absolute top-10 left-10 w-32 h-20 opacity-70 z-[2]">
                    <Image src="/assets/cloud.png" alt="cloud" width={128} height={80} className="w-full h-auto" />
               </div>

                  <div className="absolute -bottom-16 -right-16  md:-bottom-20 md:-right-2 lg:-right-40 xl:right-0 w-56 h-32 sm:w-80 sm:h-44 md:w-[420px] md:h-60 lg:w-[480px] lg:h-72 opacity-100 z-[11]">
                         <Image
                               src="/assets/cloud.png"
                               alt="cloud"
                               fill
                               className="w-full h-full object-contain -rotate-12"
                               sizes="(max-width: 640px) 14rem, (max-width: 1024px) 20rem, (max-width: 1280px) 26rem, 30rem"
                         />
                  </div>

               <div className="absolute inset-0 z-[1] m-4 lg:m-8">
                    <Image
                         src="/assets/background/bg-horizontal.png"
                         alt=""
                         fill
                         className="opacity-60 rounded-xl object-center"
                         priority
                    />
               </div>

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Campus Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
                         {campusData.map((campus, index) => (
                              <div
                                   key={index}
                                   className="text-left lg:text-center"
                              >
                                   {/* Campus Title Image */}
                                   <div className="mb-6 flex justify-start lg:justify-center">
                                        <div className="relative h-16 w-auto">
                                             <Image
                                                  src={campus.titleImage}
                                                  alt={`Campus ${index + 1} Title`}
                                                  width={300}
                                                  height={64}
                                                  className="h-full w-auto object-contain"
                                                  priority={index === 0}
                                             />
                                        </div>
                                   </div>

                                   {/* Campus Address */}
                                   <div className="mb-6 px-1 sm:px-2 lg:px-6">
                                        <p className="text-white italic text-sm lg:text-base leading-relaxed">
                                             {campus.address}
                                        </p>
                                   </div>

                                   {/* Campus Map */}
                                   <div className="w-full">
                                        <div className="relative w-full h-64 lg:h-80">
                                             <Image
                                                  src={campus.mapImage}
                                                  alt={`Campus ${index + 1} Floor Plan`}
                                                  fill
                                                  className="object-contain"
                                                  priority={index === 0}
                                             />
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
