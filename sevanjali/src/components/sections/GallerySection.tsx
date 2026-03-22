"use client";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const galleryImages = [
  { src: "/images/gallery/medical-3.jpg", alt: "Free medical camp in progress" },
  { src: "/images/events/ganesh-idol.jpg", alt: "Ganeshotsava idol decoration" },
  { src: "/images/events/ganesh-bhajan.jpg", alt: "Bhajan programme" },
  { src: "/images/gallery/medical-3.jpg", alt: "Healthcare outreach" },
  { src: "/images/events/ganesh-gathering.jpg", alt: "Community gathering" },
  { src: "/images/events/community-prayer.jpg", alt: "Community prayer" },
  { src: "/images/events/ganesh-puja.jpg", alt: "Puja ceremony" },
  { src: "/images/events/ganesh-aerial-night.jpg", alt: "Night celebration aerial view" },
  { src: "/images/events/ganesh-prep1.jpg", alt: "Festival preparation" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-earth py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="mb-4">Our Gallery</SectionLabel>
          <h2 data-cursor-grow className="font-display text-section italic text-cream mb-12">
            Moments of Impact
          </h2>
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl glass">
                <Image
                  src={`https://www.sevanjaliprathishtana.com${img.src}`}
                  alt={img.alt}
                  width={600}
                  height={400 + (i % 3) * 100}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
