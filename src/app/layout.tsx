import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

import { inter, poppins } from "./fonts";

export const metadata: Metadata = {
    title: "ORMIK EXPLORE 2025 | STTNF",
    description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
    icons: { icon: "/assets/logo-ormik.svg" },
    metadataBase: new URL("https://ormik.nurulfikri.ac.id"),
    openGraph: {
        title: "ORMIK EXPLORE 2025 | STTNF",
        description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
        url: "https://ormik.nurulfikri.ac.id",
        siteName: "ORMIK EXPLORE 2025 | STTNF",
        images: [{ url: "/assets/background/bg-horizontal.png", width: 1440, height: 797 }],
        locale: "id_ID",
        type: "website",
    },
    alternates: { canonical: "https://ormik.nurulfikri.ac.id" },
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
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}
