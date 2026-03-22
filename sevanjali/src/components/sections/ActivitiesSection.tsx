"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { siteData } from "@/lib/data";
import {
  Heart,
  GraduationCap,
  Droplets,
  HandHeart,
  CreditCard,
  Eye,
} from "lucide-react";
import { ArrowRight } from "lucide-react";

const icons = [Heart, GraduationCap, Droplets, HandHeart, CreditCard, Eye];

export function ActivitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgY = useParallax(sectionRef, -40);

  return (
    <section
      ref={sectionRef}
      id="activities"
      className="bg-earth py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle parallax background shift */}
      <motion.div
        className="absolute inset-0 bg-earth"
        style={{ y: bgY }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="mb-4">What We Do</SectionLabel>
          <h2
            data-cursor-grow
            className="font-display text-section italic text-cream mb-12"
          >
            Our Activities
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteData.activities.map((activity, index) => {
            const Icon = icons[index];
            return (
              <div
                key={activity.title}
                className="group relative p-5 sm:p-8 glass rounded-xl cursor-pointer transition-all duration-300 hover:bg-saffron hover:border-saffron/30"
              >
                <span className="font-display text-sm text-ash group-hover:text-earth/40 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Icon className="w-8 h-8 text-saffron group-hover:text-earth transition-colors mt-4" />

                <h3 className="font-display text-xl sm:text-[28px] font-bold text-cream group-hover:text-earth mt-3 transition-colors">
                  {activity.title}
                </h3>

                <p className="font-body text-sm text-ash group-hover:text-earth/70 mt-2 leading-relaxed transition-colors">
                  {activity.description}
                </p>

                <span className="flex items-center gap-2 text-saffron group-hover:text-earth mt-6 font-body text-sm font-medium transition-all group-hover:gap-4">
                  Learn more <ArrowRight size={16} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
