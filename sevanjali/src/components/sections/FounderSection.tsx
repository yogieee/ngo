"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { siteData } from "@/lib/data";

export function FounderSection() {
  const { founder } = siteData;
  const imageRef = useRef<HTMLDivElement>(null);
  const imageY = useParallax(imageRef, -80);

  return (
    <section id="founder" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — Parallax Image */}
        <div ref={imageRef} className="relative min-h-[500px] lg:min-h-[700px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src="https://www.sevanjaliprathishtana.com/images/founder.png"
              alt={founder.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top scale-110"
            />
          </motion.div>
        </div>

        {/* Right — Content */}
        <div className="bg-moss px-8 py-16 lg:px-12 lg:py-24 flex flex-col justify-center">
          <ScrollReveal>
            <SectionLabel className="text-saffron">Leadership</SectionLabel>

            <blockquote
              data-cursor-grow
              className="font-display text-section font-light italic text-cream leading-[1.1] mt-6"
            >
              &ldquo;Service to humanity is service to God.&rdquo;
            </blockquote>
            <cite className="font-body text-sm text-ash mt-3 block not-italic">
              &mdash; {founder.name}
            </cite>

            <p className="font-body text-base font-light text-cream/70 leading-relaxed mt-8">
              {founder.bio}
            </p>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10 border-t border-cream/10 pt-8">
              {founder.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-[40px] font-light text-turmeric">
                    {s.value}
                  </p>
                  <p className="font-accent text-label text-ash uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
