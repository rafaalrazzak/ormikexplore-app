import type { Metadata } from "next";
import "./globals.css";
import { inter, poppins } from "./fonts";
import { fetchMaintenanceConfig } from "@/utils/maintenance";
import FontPreloader from "@/components/ui/FontPreloader";

async function getMaintenanceMeta() {
    try {
        const config = await fetchMaintenanceConfig();

        if (config.isEnabled) {
            return {
                title: "Maintenance - ORMIK EXPLORE 2025",
                description: config.message || "Website sedang dalam proses maintenance. Kami akan segera kembali!",
            };
        }
        return null;
    } catch (error) {
        console.warn("generateMetadata fail", error);
        return {
            title: "ORMIK Explore 2025",
            description: "Website sedang dalam proses maintenance. Kami akan segera kembali!",
        };
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const maintenance = await getMaintenanceMeta();
    const base: Metadata = {
        title: "ORMIK EXPLORE 2025 | STTNF",
        description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
        icons: {
            icon: [
                { url: "/icon/favicon.ico", sizes: "any" },
                { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            ],
            apple: [
                { url: "/icon/favicon-180x180.png", sizes: "180x180", type: "image/png" },
            ],
            other: [
                { rel: "android-chrome", url: "/icon/favicon-192x192.png", sizes: "192x192" },
                { rel: "android-chrome", url: "/icon/favicon-512x512.png", sizes: "512x512" },
            ]
        },
        manifest: "/manifest.json",
        metadataBase: new URL("https://ormik.nurulfikri.ac.id"),
        openGraph: {
            title: "ORMIK EXPLORE 2025 | STTNF",
            description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
            url: "https://ormik.nurulfikri.ac.id",
            siteName: "ORMIK EXPLORE 2025 | STTNF",
            images: [{ url: "/icons/android-chrome-512x512.png", width: 512, height: 512 }],
            locale: "id_ID",
            type: "website",
        },
        alternates: { canonical: "https://ormik.nurulfikri.ac.id" },
        twitter: {
            card: "summary_large_image",
            title: "ORMIK EXPLORE 2025 | STTNF",
            description: "ORMIK EXPLORE 2025 memiliki visi menjadi titik mulai eksplorasi mahasiswa baru STT-NF dalam membangun semangat akademik, budaya positif, dan kesiapan diri di era modern.",
            creator: "@ormiksttnf",
            images: ["/icons/android-chrome-512x512.png"],
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
}

export const dynamic = "force-dynamic";

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
                <FontPreloader />
                {children}
            </body>
        </html>
    );
}
