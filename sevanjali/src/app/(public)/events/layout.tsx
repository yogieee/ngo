import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Celebrations",
  description:
    "Upcoming events, free medical camps, Ganeshotsava celebrations, blood donation drives, and community programmes by Sevanjali Prathishtana in Farangipete.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events — Sevanjali Prathishtana",
    description:
      "Annual Ganeshotsava, bi-monthly medical camps, blood donation drives, and community outreach events in Farangipete, Karnataka.",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
