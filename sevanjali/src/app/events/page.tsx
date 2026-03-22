"use client";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteData } from "@/lib/data";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    title: "Free Medical Camp",
    date: "1st & 3rd Sunday of Every Month",
    location: "Farangipete Community Hall",
    description:
      "Regular bi-monthly free medical camp featuring general health check-ups, specialist consultations, and free medicine distribution for the community.",
    type: "Healthcare",
  },
  {
    title: "Blood Donation Drive",
    date: "To be announced",
    location: "Farangipete",
    description:
      "Upcoming blood donation drive in collaboration with local hospitals. Help save lives by donating blood.",
    type: "Healthcare",
  },
  {
    title: "Educational Felicitation",
    date: "To be announced",
    location: "Farangipete Community Hall",
    description:
      "Annual felicitation ceremony recognising academic achievements of scholarship recipients and honour students.",
    type: "Education",
  },
  {
    title: "Community Outreach Programme",
    date: "To be announced",
    location: "Various locations, Bantwal Taluk",
    description:
      "Ration distribution and welfare assistance for underprivileged families across the taluk.",
    type: "Community",
  },
];

export default function EventsPage() {
  const { ganeshotsava } = siteData;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-turmeric/5 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">Events & Celebrations</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Our</span>{" "}
              <span className="font-bold">Events</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              From our celebrated annual Ganeshotsava to regular medical camps
              and community outreach, our events bring people together in service
              and celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Ganeshotsava Feature */}
      <section className="bg-earth pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 lg:p-12 overflow-hidden relative">
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1">
                  <span className="bg-turmeric/20 text-turmeric px-3 py-1 rounded-full font-body text-xs font-medium backdrop-blur-md">
                    Annual Celebration
                  </span>
                  <h2 data-cursor-grow className="font-display text-[clamp(48px,8vw,80px)] font-light italic text-cream leading-none mt-4">
                    Ganeshotsava
                  </h2>
                  <p className="font-body text-base font-light text-ash max-w-[520px] leading-relaxed mt-6">
                    {ganeshotsava.description}
                  </p>

                  <div className="flex flex-wrap gap-6 mt-8">
                    {ganeshotsava.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-xl font-light text-turmeric">
                          {stat.value}
                        </p>
                        <p className="font-accent text-label text-ash uppercase mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 flex-wrap mt-8">
                    {ganeshotsava.otherEvents.map((event) => (
                      <span
                        key={event}
                        className="bg-cream/5 border border-cream/10 text-cream px-3 py-1.5 rounded-full font-body text-xs backdrop-blur-md"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-[400px] shrink-0 grid grid-cols-2 gap-3">
                  {ganeshotsava.images.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-xl"
                    >
                      <Image
                        src={`https://www.sevanjaliprathishtana.com${src}`}
                        alt={`Ganeshotsava ${i + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-4">
              Upcoming Events
            </SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-earth leading-[1.05] mb-16">
              What&apos;s Coming Up
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.title} delay={i * 100}>
                <div className="glass-light rounded-xl p-8 group hover:bg-white/60 transition-all duration-300 h-full">
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
                      <span className="font-body text-xs">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past Event Gallery */}
      <section className="bg-earth py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="mb-4">Past Events</SectionLabel>
            <h2 data-cursor-grow className="font-display text-section italic text-cream mb-12">
              Event Highlights
            </h2>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {ganeshotsava.images.map((src, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl glass">
                  <Image
                    src={`https://www.sevanjaliprathishtana.com${src}`}
                    alt={`Event highlight ${i + 1}`}
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

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Get involved
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Join us at our next event
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Volunteer, participate, or support our events. Every helping hand
              makes a difference.
            </p>
            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <MagneticButton variant="dark" href="/contact">
                Contact Us
              </MagneticButton>
              <MagneticButton variant="dark" href="/donate">
                <span className="flex items-center gap-2">
                  Donate <ArrowRight size={16} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
