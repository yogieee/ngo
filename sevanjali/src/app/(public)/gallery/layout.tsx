import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos from Sevanjali Prathishtana's medical camps, Ganeshotsava celebrations, and community events in Farangipete, Karnataka.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery — Sevanjali Prathishtana",
    description:
      "A visual journey through three decades of community service, celebrations, and impact in Farangipete.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
