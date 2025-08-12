import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import CampusExplore from '@/components/sections/CampusExplore';
import DownloadSection from '@/components/sections/DownloadSection';
import CoreTeamSection from '@/components/sections/CoreTeamSection';
import Image from 'next/image';

export default function Home() {
    return (
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
                </div>
                <AboutSection />
                <CoreTeamSection />
                <CampusExplore />
                <DownloadSection />
            </div>
        </main>
    );
};

