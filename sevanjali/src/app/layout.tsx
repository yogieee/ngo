import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Cinzel } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
});

const SITE_URL = "https://www.sevanjaliprathishtana.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sevanjali Prathishtana — Serving Humanity Since 1993",
    template: "%s | Sevanjali Prathishtana",
  },
  description:
    "Sevanjali Prathishtana is a community-driven NGO from Farangipete, Karnataka, serving through healthcare, education, and social welfare since 1993. 344+ free medical camps, 10,000+ lives impacted.",
  keywords: [
    "Sevanjali Prathishtana",
    "NGO Karnataka",
    "Farangipete NGO",
    "free medical camps Karnataka",
    "Dakshina Kannada NGO",
    "Bantwal charity",
    "healthcare NGO India",
    "education scholarships Karnataka",
    "blood donation Mangalore",
    "community welfare Karnataka",
    "Krishna Kumar Punja",
    "Ganeshotsava Farangipete",
  ],
  authors: [{ name: "Sevanjali Prathishtana" }],
  creator: "Sevanjali Prathishtana",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sevanjali Prathishtana",
    title: "Sevanjali Prathishtana — Serving Humanity Since 1993",
    description:
      "Community-driven NGO from Farangipete, Karnataka. 344+ free medical camps, educational scholarships, and social welfare since 1993.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sevanjali Prathishtana — Serving Humanity Since 1993",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sevanjali Prathishtana — Serving Humanity Since 1993",
    description:
      "Community-driven NGO from Farangipete, Karnataka. 344+ free medical camps, educational scholarships, and social welfare since 1993.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
