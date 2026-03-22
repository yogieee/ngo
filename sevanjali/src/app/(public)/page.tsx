import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactStrip } from "@/components/sections/ImpactStrip";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { AboutSection } from "@/components/sections/AboutSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { GaneshotsavaSection } from "@/components/sections/GaneshotsavaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { VolunteerSection } from "@/components/sections/VolunteerSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { EventTicker } from "@/components/ui/EventTicker";
import { getActiveActivities } from "@/lib/actions/activities";
import { getUpcomingEvents } from "@/lib/actions/events";

export default async function HomePage() {
  const [activities, upcomingEvents] = await Promise.all([
    getActiveActivities(),
    getUpcomingEvents(),
  ]);

  return (
    <main>
      {/* Hero stays sticky — everything below scrolls over it */}
      <HeroSection />

      {/* Content layers — higher z-index so they scroll over the hero */}
      <div className="relative" style={{ zIndex: 2 }}>
        <ImpactStrip />
        {upcomingEvents.length > 0 && <EventTicker events={upcomingEvents} />}
        <DiagonalDivider color="#F3F0E4" />
        <AboutSection />
        <DiagonalDivider flip color="#1A2118" />
        <ActivitiesSection activities={activities} />
        <DiagonalDivider color="#F3F0E4" />
        <TestimonialsSection />
        <FounderSection />
        <GaneshotsavaSection />
        {upcomingEvents.length > 0 && (
          <UpcomingEventsSection events={upcomingEvents} />
        )}
        <GallerySection />
      </div>

      {/* Volunteer stays sticky — CTA scrolls over it */}
      <div className="relative" style={{ zIndex: 3 }}>
        <div className="sticky top-0">
          <VolunteerSection />
        </div>
      </div>

      <div className="relative" style={{ zIndex: 4 }}>
        <CtaSection />
      </div>
    </main>
  );
}
