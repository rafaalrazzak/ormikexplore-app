
import type { Metadata } from "next";
import "./globals.css";
import { inter, poppins } from "./fonts";

function getMaintenanceMeta() {
    if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
        return {
            title: "Maintenance - ORMIK EXPLORE 2025",
            description: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE || "Website sedang dalam proses maintenance. Kami akan segera kembali!",
        };
    }
    return null;
}

export const metadata: Metadata = (() => {
    const maintenance = getMaintenanceMeta();
    const base = {
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
    if (maintenance) {
        return {
            ...base,
            title: maintenance.title,
            description: maintenance.description,
            openGraph: {
                ...base.openGraph,
                title: maintenance.title,
                description: maintenance.description,
            },
            twitter: {
                ...base.twitter,
                title: maintenance.title,
                description: maintenance.description,
            },
        };
    }
    return base;
})();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <head>
                <script defer src="https://cloud.umami.is/script.js" data-website-id="b977a5d1-bd2c-4ede-90b7-8ae0d5848754"></script>
            </head>
            <body
                className={`${inter.variable} ${poppins.variable} font-sans leading-normal m-0 antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
