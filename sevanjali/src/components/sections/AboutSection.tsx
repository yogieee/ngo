"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useParallax } from "@/hooks/useParallax";

const facts = [
  "Founded 1993",
  "Farangipete, Karnataka",
  "Bantwal Taluk",
  "Dakshina Kannada",
];

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageY = useParallax(imageRef, -60);

  return (
    <section id="about" className="bg-lightbg py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Col */}
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-6">
              About Us
            </SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-earth leading-[1.05]">
              Three decades of selfless service, compassion, and community
              building
            </h2>
            <div className="mt-8 space-y-5">
              <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                Sevanjali Prathishtana was established in 1993 by Sri Krishna
                Kumar Punja and a group of dedicated volunteers with a single
                mission: to serve the needy. Located in Farangipete, Bantwal
                Taluk, Dakshina Kannada, the organisation has grown into a
                respected institution touching thousands of lives.
              </p>
              <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                From conducting free medical camps twice every month to providing
                educational scholarships for deserving students, Sevanjali&apos;s
                work spans healthcare, education, blood donation drives, patient
                assistance, and community cultural events including the
                celebrated annual Ganeshotsava festival.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Col — Parallax Image */}
          <ScrollReveal delay={200}>
            <div ref={imageRef} className="relative lg:-ml-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                  <Image
                    src="https://www.sevanjaliprathishtana.com/images/gallery/medical-3.jpg"
                    alt="Sevanjali medical camp"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110"
                  />
                </motion.div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28 bg-terracotta rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="font-accent text-xs text-cream/80 uppercase tracking-[2px]">
                    Est.
                  </p>
                  <p className="font-display text-lg sm:text-2xl font-light text-cream">
                    1993
                  </p>
                </div>
              </div>
            </div>
            {/* Tag Pills */}
            <div className="flex gap-2 flex-wrap mt-10">
              {facts.map((fact) => (
                <span
                  key={fact}
                  className="bg-earth/5 border border-earth/10 text-earth px-3 py-1 rounded-full font-body text-sm backdrop-blur-md"
                >
                  {fact}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
