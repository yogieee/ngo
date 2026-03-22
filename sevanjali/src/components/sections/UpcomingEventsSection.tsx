"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/actions/events";

export function UpcomingEventsSection({ events }: { events: Event[] }) {
  return (
    <section className="bg-lightbg py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="text-saffron mb-4">
            Upcoming Events
          </SectionLabel>
          <h2
            data-cursor-grow
            className="font-display text-section font-bold italic text-earth leading-[1.05] mb-16"
          >
            What&apos;s Coming Up
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.slice(0, 4).map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 100}>
              <div className="glass-light rounded-xl p-5 sm:p-8 group hover:bg-white/60 transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-saffron/10 text-saffron px-3 py-1 rounded-full font-body text-xs font-medium">
                    {event.type}
                  </span>
                </div>
                <h3 className="font-display text-[24px] font-bold text-earth mb-3">
                  {event.title}
                </h3>
                <p className="font-body text-sm text-earth/60 leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-earth/50">
                    <Calendar size={14} />
                    <span className="font-body text-xs">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-earth/50">
                    <MapPin size={14} />
                    <span className="font-body text-xs">{event.location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-block font-body text-sm font-medium text-saffron hover:text-saffron/80 transition-colors"
          >
            View All Events &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
