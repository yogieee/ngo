import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CtaSection() {
  return (
    <section className="bg-saffron py-20 sm:py-32 relative rounded-t-4xl shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <ScrollReveal>
          <p className="font-accent text-label text-earth/50 uppercase">
            Make a difference
          </p>
          <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
            Join us in serving humanity
          </h2>
          <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
            Every act of kindness makes a difference. Volunteer, donate, or
            simply spread the word.
          </p>
          <div className="mt-10">
            <MagneticButton variant="dark" href="/donate">
              Donate Now
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
