import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Cinzel } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
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

export const metadata: Metadata = {
  title: "Sevanjali Prathishtana — Serving Humanity Since 1993",
  description:
    "Sevanjali Prathishtana is a community-driven NGO from Farangipete, Karnataka, serving through healthcare, education, and social welfare since 1993.",
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
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
