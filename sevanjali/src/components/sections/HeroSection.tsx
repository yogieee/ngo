"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedWord } from "@/components/ui/AnimatedWord";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RotatingQuotes } from "@/components/ui/RotatingQuotes";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves at 50% of scroll speed
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades + shifts up as user scrolls away
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Scale down slightly for depth
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={sectionRef} className="relative h-screen" style={{ zIndex: 1 }}>
      {/* Sticky wrapper — hero stays pinned while next section scrolls over */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <section className="relative h-full bg-earth flex items-center overflow-hidden">
          {/* Parallax Background Image */}
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
          >
            <Image
              src="https://www.sevanjaliprathishtana.com/images/hero/hero-banner.jpg"
              alt="Sevanjali community service"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-earth via-earth/90 to-earth/40" />

          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay" />

          {/* Content with scroll-linked fade */}
          <motion.div
            className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 sm:pt-32 pb-10 sm:pb-20 w-full"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <div className="max-w-[720px]">
              <SectionLabel className="mb-8">
                Est. 1993 — Farangipete, Karnataka
              </SectionLabel>

              <h1
                data-cursor-grow
                className="font-display text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] leading-[0.95] tracking-[-2px]"
                style={{ fontSize: "clamp(40px, 10vw, 100px)" }}
              >
                <AnimatedWord delay={0} italic>
                  Serving
                </AnimatedWord>
                <AnimatedWord delay={80} bold>
                  Humanity
                </AnimatedWord>
                <AnimatedWord delay={160} italic>
                  with Compassion
                </AnimatedWord>
              </h1>

              <p className="font-body text-base sm:text-lg text-cream/70 max-w-[520px] font-light leading-relaxed mt-6 sm:mt-8">
                A community-driven NGO serving Farangipete through healthcare,
                education, and social welfare since 1993.
              </p>

              {/* Rotating Inspirational Quotes */}
              <RotatingQuotes />

              {/* Stat Pills */}
              <div className="flex gap-2 sm:gap-3 flex-wrap mt-6 sm:mt-8">
                {["30+ Years", "344+ Camps", "Thousands Helped"].map((s) => (
                  <span
                    key={s}
                    className="bg-saffron/10 text-saffron border border-saffron/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-body text-xs sm:text-sm backdrop-blur-md"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-10 flex-wrap">
                <MagneticButton variant="outline" href="#about">
                  Our Story
                </MagneticButton>
                <MagneticButton variant="filled" href="/donate">
                  Donate Now
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            style={{ opacity: contentOpacity }}
          >
            <span className="font-body text-[10px] uppercase tracking-[2px] text-ash/60">
              Scroll
            </span>
            <div className="w-px h-12 bg-linear-to-b from-saffron to-transparent relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
