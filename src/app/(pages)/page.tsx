import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import CampusExplore from '@/components/sections/CampusExplore';
import DownloadSection from '@/components/sections/DownloadSection';
import CoreTeamSection from '@/components/sections/CoreTeamSection';
import AssetLoader from '@/components/ui/AssetLoader';
import Image from 'next/image';

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <AssetLoader>
            <main className="min-h-screen">
                <Hero />

                <div className="relative">
                    <div className="absolute inset-0 z-[background]">
                        <Image
                            src="/assets/background/bg-vertical.png"
                            alt=""
                            fill
                            className="object-cover object-top"
                            priority
                        />
                        <Image
                            src="/assets/background/bg-road-vertical.svg"
                            alt=""
                            fill
                            className="object-cover object-top opacity-5"
                            priority
                        />
                    </div>
                    <AboutSection />
                    <CoreTeamSection />
                    <CampusExplore />
                    <DownloadSection />
                </div>
            </main>
        </AssetLoader>
    );
};

