"use client";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Heart, Users, Calendar, HandHelping } from "lucide-react";

const opportunities = [
  {
    icon: Heart,
    title: "Medical Camps",
    description:
      "Assist our doctors and staff during free medical camps held twice every month.",
  },
  {
    icon: Users,
    title: "Education Support",
    description:
      "Mentor students, teach classes, or help distribute scholarships to deserving youth.",
  },
  {
    icon: Calendar,
    title: "Event Organisation",
    description:
      "Help plan and execute community events including our annual Ganeshotsava festival.",
  },
  {
    icon: HandHelping,
    title: "Community Outreach",
    description:
      "Join blood donation drives, patient assistance programmes, and awareness campaigns.",
  },
];

export function VolunteerSection() {
  return (
    <section className="bg-earth py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto">
            <SectionLabel className="text-saffron mb-6">
              Volunteer
            </SectionLabel>
            <h2
              data-cursor-grow
              className="font-display text-section font-bold italic text-cream leading-[1.05]"
            >
              Lend your hands to those who need them most
            </h2>
            <p className="font-body text-base font-light text-cream/70 mt-6 leading-relaxed">
              Whether you can spare a few hours or commit regularly, your time
              and skills can transform lives in our community.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {opportunities.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="bg-cream/5 border border-cream/10 rounded-sm p-5 sm:p-8 hover:bg-cream/10 transition-colors h-full">
                <item.icon className="w-8 h-8 text-saffron mb-5" />
                <h3 className="font-display text-lg font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="font-body text-sm font-light text-cream/60 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="text-center mt-14">
            <MagneticButton variant="filled" href="/contact">
              Become a Volunteer
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
