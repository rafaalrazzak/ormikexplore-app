import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

import { inter, poppins } from "./fonts";

export const metadata: Metadata = {
    title: "ORMIK EXPLORE 2025 | STTNF",
    description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
    icons: { icon: "/icons/logo.png", apple: "/icons/logo.png" },
    metadataBase: new URL("https://ormik.nurulfikri.ac.id"),
    openGraph: {
        title: "ORMIK EXPLORE 2025 | STTNF",
        description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
        url: "https://ormik.nurulfikri.ac.id",
        siteName: "ORMIK EXPLORE 2025 | STTNF",
        images: [{ url: "/icons/logo.png", width: 1200, height: 630 }],
        locale: "id_ID",
        type: "website",
    },
    alternates: { canonical: "https://ormik.nurulfikri.ac.id" },
    twitter: {
        card: "summary_large_image",
        title: "ORMIK EXPLORE 2025 | STTNF",
        description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
        creator: "@ormiksttnf",
        images: ["/icons/logo.png"],
    },
    keywords: [
        "ormik",
        "ormik explore",
        "ormik explore 2025",
        "ormik sttnf",
        "sttnf",
        "sttnf ormik",
        "ormik nurulfikri",
        "nurulfikri ormik",
        "ormik explore nurulfikri",
        "ormik explore sttnf"
    ]
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
