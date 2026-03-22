"use client";
import { StatCounter } from "@/components/ui/StatCounter";
import { siteData } from "@/lib/data";

export function ImpactStrip() {
  return (
    <section
      className="bg-linear-to-r from-earth to-terracotta/80 relative rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.3)]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {siteData.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-4 sm:px-6 py-8 sm:py-10 lg:py-14 text-center ${
              i < siteData.stats.length - 1
                ? "lg:border-r border-cream/10"
                : ""
            } ${i % 2 === 0 && i < siteData.stats.length - 1 ? "border-r sm:border-r" : ""}`}
          >
            <p className="font-display text-stat text-cream">
              <StatCounter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="font-accent text-label text-ash uppercase mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
