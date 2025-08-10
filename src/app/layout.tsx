import type { Metadata } from "next";
import "./globals.css";

import { inter, poppins } from "./fonts";

export const metadata: Metadata = {
    title: "ORMIK EXPLORE 2025 | STTNF",
    description: "Explore. Evolve. Engage. - Orientasi Mahasiswa Baru STT-NF 2025",
    icons: { icon: "/assets/logo-ormik.svg" },
    metadataBase: new URL("https://ormikexplore.nurulfikri.ac.id"),
    openGraph: {
        title: "ORMIK EXPLORE 2025",
        description: "Explore. Evolve. Engage. - Orientasi Mahasiswa Baru STT-NF 2025",
        url: "https://ormikexplore.nurulfikri.ac.id",
        siteName: "ORMIK EXPLORE 2025",
        images: [{ url: "/assets/background/hero.png", width: 1440, height: 797 }],
        locale: "id_ID",
        type: "website",
    },
    alternates: { canonical: "https://ormikexplore.nurulfikri.ac.id" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body
                className={`${inter.variable} ${poppins.variable} font-sans leading-normal m-0 antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
