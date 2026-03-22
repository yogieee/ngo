"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { siteData } from "@/lib/data";

export function GaneshotsavaSection() {
  const { ganeshotsava } = siteData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const patternY = useParallax(sectionRef, -50);

  return (
    <section
      ref={sectionRef}
      id="ganeshotsava"
      className="bg-earth py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Parallax mandala pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: patternY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23F5EDD8' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23F5EDD8' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23F5EDD8' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='20' fill='none' stroke='%23F5EDD8' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="mb-4">Annual Celebration</SectionLabel>
          <h2
            data-cursor-grow
            className="font-display text-[clamp(64px,12vw,120px)] font-light italic text-cream leading-none"
          >
            Ganeshotsava
          </h2>
          <p className="font-body text-base font-light text-ash max-w-[600px] leading-relaxed mt-6">
            {ganeshotsava.description}
          </p>
        </ScrollReveal>

        {/* Festival Stats Row */}
        <div className="flex flex-wrap gap-0 mt-12 mb-12">
          {ganeshotsava.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-4 ${
                i < ganeshotsava.stats.length - 1
                  ? "border-r border-cream/10"
                  : ""
              }`}
            >
              <p className="font-display text-2xl font-light text-turmeric">
                {stat.value}
              </p>
              <p className="font-accent text-label text-ash uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Photo Carousel — Infinite scroll */}
        <div className="relative overflow-hidden group">
          <div
            className="flex gap-4 animate-carousel hover:[animation-play-state:paused]"
            style={{
              width: "max-content",
            }}
          >
            {[...ganeshotsava.images, ...ganeshotsava.images].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-[300px] sm:w-[350px] lg:w-[420px] overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://www.sevanjaliprathishtana.com${src}`}
                  alt={`Ganeshotsava celebration ${(i % ganeshotsava.images.length) + 1}`}
                  width={420}
                  height={280}
                  className="w-full h-[220px] sm:h-[260px] lg:h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-earth to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-earth to-transparent pointer-events-none z-10" />
        </div>

        {/* Event Tags Row */}
        <div className="flex gap-3 flex-wrap mt-12">
          {ganeshotsava.otherEvents.map((event) => (
            <span
              key={event}
              className="bg-cream/5 border border-cream/10 text-cream px-4 py-2 rounded-full font-body text-sm backdrop-blur-md"
            >
              {event}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
