import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sevanjali Prathishtana. Call +91 94485 02319, email sevanjali.farangipete@gmail.com, or visit us at Farangipete, Bantwal Taluk, Karnataka.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sevanjali Prathishtana",
    description:
      "Reach out to volunteer, donate, or learn more about our community service in Farangipete, Karnataka.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
