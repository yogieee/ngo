"use client";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteData } from "@/lib/data";

const galleryCategories = [
  {
    title: "Medical Camps",
    images: [
      { src: "/images/gallery/medical-3.jpg", alt: "Medical camp consultation" },
      { src: "/images/gallery/medical-3.jpg", alt: "Free health check-up" },
      { src: "/images/gallery/medical-3.jpg", alt: "Medicine distribution" },
    ],
  },
  {
    title: "Ganeshotsava Celebrations",
    images: siteData.ganeshotsava.images.map((src, i) => ({
      src,
      alt: `Ganeshotsava celebration ${i + 1}`,
    })),
  },
  {
    title: "Community Events",
    images: [
      { src: "/images/events/community-prayer.jpg", alt: "Community prayer gathering" },
      { src: "/images/events/ganesh-gathering.jpg", alt: "Community gathering" },
      { src: "/images/events/ganesh-bhajan.jpg", alt: "Bhajan programme" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">Photo Gallery</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Moments</span> of{" "}
              <span className="font-bold">Impact</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              A visual journey through three decades of community service,
              celebrations, and the lives we have touched together.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      {galleryCategories.map((category, catIndex) => (
        <section
          key={category.title}
          className={`py-24 lg:py-32 ${
            catIndex % 2 === 0 ? "bg-lightbg" : "bg-earth"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <SectionLabel
                className={catIndex % 2 === 0 ? "text-saffron mb-4" : "mb-4"}
              >
                {category.title}
              </SectionLabel>
              <h2
                data-cursor-grow
                className={`font-display text-section italic mb-12 ${
                  catIndex % 2 === 0 ? "text-earth" : "text-cream"
                }`}
              >
                {category.title}
              </h2>
            </ScrollReveal>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {category.images.map((img, i) => (
                <ScrollReveal key={`${category.title}-${i}`} delay={i * 80}>
                  <div
                    className={`mb-4 break-inside-avoid overflow-hidden rounded-xl ${
                      catIndex % 2 === 0 ? "glass-light" : "glass"
                    }`}
                  >
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
      ))}

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Be part of the story
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Help us create more moments of impact
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Every photograph tells a story of hope, healing, and community.
              Your support helps us write more of these stories.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
