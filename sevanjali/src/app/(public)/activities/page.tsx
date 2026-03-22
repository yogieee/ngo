import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getActiveActivities } from "@/lib/actions/activities";
import { iconMap } from "@/lib/icon-map";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Activities",
  description:
    "Explore the healthcare, education, and social welfare activities of Sevanjali Prathishtana — free medical camps, scholarships, blood donation drives in Farangipete since 1993.",
  alternates: {
    canonical: "/activities",
  },
  openGraph: {
    title: "Activities — Sevanjali Prathishtana",
    description:
      "Free medical camps, educational scholarships, blood donation drives, and community welfare programmes in Farangipete, Karnataka.",
  },
};

export default async function ActivitiesPage() {
  const activities = await getActiveActivities();

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-saffron/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">What We Do</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Our</span>{" "}
              <span className="font-bold">Activities</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              From free medical camps to educational scholarships, our
              activities are designed to create lasting impact in the
              communities we serve.
            </p>

            <div className="flex gap-3 flex-wrap mt-8">
              {["Healthcare", "Education", "Community Welfare"].map((s) => (
                <span
                  key={s}
                  className="bg-saffron/10 text-saffron border border-saffron/20 px-4 py-1.5 rounded-full font-body text-sm backdrop-blur-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Grid */}
      <section className="bg-earth pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, index) => {
              const Icon = iconMap[activity.icon_name] || iconMap.Heart;
              return (
                <ScrollReveal key={activity.id} delay={index * 80}>
                  <Link
                    href={`/activities/${activity.slug}`}
                    className="block glass rounded-xl p-8 group hover:bg-saffron/10 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-saffron mb-4" />
                    <h3 className="font-display text-xl font-bold text-cream">
                      {activity.title}
                    </h3>
                    <p className="font-body text-sm text-ash mt-2 leading-relaxed">
                      {activity.description}
                    </p>
                    <span className="flex items-center gap-2 text-saffron mt-4 font-body text-sm font-medium transition-all group-hover:gap-4">
                      Learn more <ArrowRight size={16} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Activities */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-4">
              In Detail
            </SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-earth leading-[1.05] mb-16">
              How We Make a Difference
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {activities.map((activity, i) => {
              const Icon = iconMap[activity.icon_name] || iconMap.Heart;
              return (
                <ScrollReveal key={activity.id} delay={i * 100}>
                  <div className="glass-light rounded-xl p-5 sm:p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-saffron/10 rounded-xl flex items-center justify-center">
                            <Icon className="w-7 h-7 text-saffron" />
                          </div>
                          <h3 className="font-display text-xl sm:text-[28px] font-bold text-earth">
                            {activity.title}
                          </h3>
                        </div>
                        <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                          {activity.detail_description || activity.description}
                        </p>
                      </div>

                      {activity.stats && activity.stats.length > 0 && (
                        <div className="lg:w-64 shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4">
                          {activity.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-earth/5 rounded-lg p-3 flex-1"
                            >
                              <p className="font-display text-lg font-bold text-saffron">
                                {stat.value}
                              </p>
                              <p className="font-body text-xs text-earth/60 mt-0.5">
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Be a part of the change
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Support our activities
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Your donations directly fund these programmes. Every contribution
              helps us reach more people in need.
            </p>
            <div className="mt-10">
              <MagneticButton variant="dark" href="/donate">
                <span className="flex items-center gap-2">
                  Donate Now <ArrowRight size={16} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
