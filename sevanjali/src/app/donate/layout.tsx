import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Donate to Sevanjali Prathishtana via bank transfer or UPI. Your contribution funds free medical camps, educational scholarships, and community welfare in Karnataka.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Donate to Sevanjali Prathishtana",
    description:
      "Support 344+ free medical camps, educational scholarships, and community welfare. Every contribution makes a difference.",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
