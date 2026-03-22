import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteData } from "@/lib/data";
import {
  Heart,
  GraduationCap,
  Droplets,
  HandHeart,
  CreditCard,
  Eye,
  ArrowRight,
  Stethoscope,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Our Activities — Sevanjali Prathishtana",
  description:
    "Explore the healthcare, education, and social welfare activities of Sevanjali Prathishtana serving Farangipete since 1993.",
};

const icons = [Heart, GraduationCap, Droplets, HandHeart, CreditCard, Eye];

const detailedActivities = [
  {
    title: "Free Medical Camps",
    icon: Stethoscope,
    description:
      "Twice every month, Sevanjali organises free medical camps in Farangipete, providing quality healthcare to families who cannot afford regular medical consultations. Our camps include general check-ups, specialist consultations, and distribution of free medicines.",
    stats: [
      { label: "Camps Held", value: "344+" },
      { label: "Frequency", value: "Bi-monthly" },
      { label: "Patients Served", value: "10,000+" },
    ],
  },
  {
    title: "Educational Scholarships",
    icon: BookOpen,
    description:
      "We provide merit-based and need-based scholarships to deserving students from economically weaker sections. Our scholarship programme has helped dozens of students pursue engineering, medical, and other higher education courses they otherwise could not afford.",
    stats: [
      { label: "Students Supported", value: "100+" },
      { label: "Fields Covered", value: "Engineering, Medical & more" },
      { label: "Success Rate", value: "95%" },
    ],
  },
  {
    title: "Blood Donation Drives",
    icon: Droplets,
    description:
      "Regular blood donation camps are organised in collaboration with local hospitals and blood banks. These drives help maintain critical blood supplies across Dakshina Kannada district, saving countless lives in emergency situations.",
    stats: [
      { label: "Drives Organised", value: "50+" },
      { label: "Units Collected", value: "5,000+" },
      { label: "Partner Hospitals", value: "Multiple" },
    ],
  },
  {
    title: "Patient Assistance",
    icon: HandHeart,
    description:
      "For patients who are hospitalised and cannot afford treatment, Sevanjali steps in with financial and emotional support. We work with hospitals to negotiate costs and provide direct financial assistance to ensure no one is denied care due to poverty.",
    stats: [
      { label: "Patients Helped", value: "500+" },
      { label: "Support Type", value: "Financial & Emotional" },
      { label: "Response Time", value: "Immediate" },
    ],
  },
  {
    title: "Free Health Cards",
    icon: CreditCard,
    description:
      "The Green Card programme provides underprivileged families with health cards that grant them access to subsidised or free treatment at partner hospitals. This ensures continuous healthcare access beyond our bi-monthly camp schedule.",
    stats: [
      { label: "Cards Issued", value: "1,000+" },
      { label: "Partner Hospitals", value: "Multiple" },
      { label: "Coverage", value: "Comprehensive" },
    ],
  },
  {
    title: "Eye, Dental & Surgical Treatments",
    icon: Eye,
    description:
      "Specialist camps for eye care, dental treatment, and minor surgical procedures are organised periodically. These camps bring specialist doctors to Farangipete, making expert medical care accessible to rural communities.",
    stats: [
      { label: "Specialist Camps", value: "50+" },
      { label: "Surgeries Funded", value: "200+" },
      { label: "Specialists Involved", value: "Various" },
    ],
  },
];

export default function ActivitiesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
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
            {siteData.activities.map((activity, index) => {
              const Icon = icons[index];
              return (
                <ScrollReveal key={activity.title} delay={index * 80}>
                  <div className="glass rounded-xl p-8 group hover:bg-saffron/10 transition-all duration-300">
                    <Icon className="w-8 h-8 text-saffron mb-4" />
                    <h3 className="font-display text-xl font-bold text-cream">
                      {activity.title}
                    </h3>
                    <p className="font-body text-sm text-ash mt-2 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
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
            {detailedActivities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <ScrollReveal key={activity.title} delay={i * 100}>
                  <div className="glass-light rounded-xl p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-saffron/10 rounded-xl flex items-center justify-center">
                            <Icon className="w-7 h-7 text-saffron" />
                          </div>
                          <h3 className="font-display text-[28px] font-bold text-earth">
                            {activity.title}
                          </h3>
                        </div>
                        <p className="font-body text-base font-light text-earth/80 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>

                      <div className="lg:w-64 shrink-0 flex flex-row lg:flex-col gap-4">
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
