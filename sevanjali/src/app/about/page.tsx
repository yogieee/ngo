import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteData } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us — Sevanjali Prathishtana",
  description:
    "Learn about Sevanjali Prathishtana's three decades of selfless service in healthcare, education, and community welfare in Farangipete, Karnataka.",
};

const milestones = [
  { year: "1993", title: "Foundation", description: "Sevanjali Prathishtana was established by Sri Krishna Kumar Punja and a group of dedicated volunteers with a mission to serve the needy." },
  { year: "1995", title: "First Medical Camp", description: "Launched the first free medical camp in Farangipete, providing healthcare access to underprivileged families in the region." },
  { year: "2000", title: "Education Initiative", description: "Started educational scholarship programmes for deserving students from economically weaker sections of society." },
  { year: "2005", title: "Blood Donation Drives", description: "Organised the first large-scale blood donation drive, replenishing blood banks across Dakshina Kannada district." },
  { year: "2010", title: "Health Card Programme", description: "Introduced the Green Card initiative, giving underprivileged families access to healthcare at partner hospitals." },
  { year: "2015", title: "Expanded Services", description: "Expanded to include free eye, dental, and surgical treatments for those who cannot afford specialist care." },
  { year: "2020", title: "Pandemic Response", description: "Provided food, rations, and medical supplies to families affected during the pandemic, reaching hundreds of households." },
  { year: "2023", title: "30 Years of Service", description: "Celebrated three decades of continuous community service with over 344 medical camps and thousands of lives impacted." },
];

const values = [
  { title: "Compassion", description: "We believe every person deserves dignity, care, and the chance to live a healthy, fulfilling life regardless of their economic background." },
  { title: "Community", description: "Our strength lies in the community we serve and the volunteers who give their time, energy, and heart to the mission." },
  { title: "Transparency", description: "Every donation is accounted for and every rupee is directed towards the programmes that need it most." },
  { title: "Inclusivity", description: "We serve all people irrespective of caste, creed, or religion — uniting communities through shared purpose." },
];

export default function AboutPage() {
  const { founder } = siteData;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-moss/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">About Sevanjali</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Three Decades</span> of{" "}
              <span className="font-bold">Selfless Service</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              Since 1993, Sevanjali Prathishtana has been a beacon of hope for
              the communities of Farangipete, Bantwal Taluk, providing
              healthcare, education, and social welfare to those who need it
              most.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="glass-light rounded-xl p-8 lg:p-12">
                <h2 data-cursor-grow className="font-display text-4xl font-bold italic text-earth mb-6">
                  Our Mission
                </h2>
                <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                  To uplift the underprivileged communities of Farangipete and
                  surrounding areas through accessible healthcare, quality
                  education support, and meaningful social welfare programmes.
                  We strive to create a society where no one is denied basic
                  necessities due to financial constraints.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="glass-light rounded-xl p-8 lg:p-12">
                <h2 data-cursor-grow className="font-display text-4xl font-bold italic text-earth mb-6">
                  Our Vision
                </h2>
                <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                  A compassionate community where every individual has access
                  to healthcare, education, and opportunities for growth. We
                  envision a Farangipete where neighbours look out for one
                  another, where cultural traditions unite rather than divide,
                  and where no family suffers alone.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-earth py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="mb-4">What Guides Us</SectionLabel>
            <h2 data-cursor-grow className="font-display text-section italic text-cream mb-12">
              Our Core Values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100}>
                <div className="glass rounded-xl p-5 sm:p-8 lg:p-10">
                  <span className="font-display text-sm text-ash">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl sm:text-[28px] font-bold text-cream mt-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-ash mt-2 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-4">Our Journey</SectionLabel>
            <h2 data-cursor-grow className="font-display text-section font-bold italic text-earth leading-[1.05] mb-16">
              Milestones Along the Way
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-saffron/20 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <ScrollReveal key={milestone.year} delay={i * 80}>
                  <div
                    className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 ${
                      i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-saffron rounded-full -translate-x-1/2 mt-2 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-12 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                        i % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <span className="font-display text-2xl font-light text-saffron">
                        {milestone.year}
                      </span>
                      <h3 className="font-display text-xl font-bold text-earth mt-1">
                        {milestone.title}
                      </h3>
                      <p className="font-body text-sm text-earth/70 mt-2 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-moss py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="https://www.sevanjaliprathishtana.com/images/founder.png"
                  alt={founder.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <SectionLabel className="text-saffron mb-6">
                Our Founder
              </SectionLabel>
              <blockquote className="font-display text-[clamp(32px,4vw,48px)] font-light italic text-cream leading-[1.1]">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
              <cite className="font-body text-sm text-ash mt-4 block not-italic">
                &mdash; {founder.name}
              </cite>
              <p className="font-body text-base font-light text-cream/70 leading-relaxed mt-8">
                {founder.bio}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10 border-t border-cream/10 pt-8">
                {founder.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-[24px] sm:text-[36px] font-light text-turmeric">
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

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Support our mission
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Help us continue serving humanity
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Your generosity makes our work possible. Every contribution
              directly funds healthcare, education, and community welfare.
            </p>
            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <MagneticButton variant="dark" href="/donate">
                <span className="flex items-center gap-2">
                  Donate Now <ArrowRight size={16} />
                </span>
              </MagneticButton>
              <MagneticButton variant="dark" href="/contact">
                Get in Touch
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
