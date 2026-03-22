"use client";
import { useRef, useState, useCallback } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteData } from "@/lib/data";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <section className="bg-lightbg py-24 lg:py-32 relative rounded-t-3xl -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="mb-4">Student Stories</SectionLabel>
          <h2 data-cursor-grow className="font-display text-section italic text-earth mb-12">
            Voices of Gratitude
          </h2>
        </ScrollReveal>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-8 cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {siteData.testimonials.map((t) => (
            <div
              key={t.name}
              className="snap-start shrink-0 w-[min(560px,85vw)] glass-light rounded-xl border-l-4 border-saffron p-10 relative shadow-lg shadow-earth/5"
            >
              <span className="font-display text-[120px] leading-none text-saffron/20 absolute top-4 left-6 select-none">
                &ldquo;
              </span>
              <p className="font-body text-base font-light leading-relaxed text-earth/80 relative z-10 mt-8">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center font-display text-lg text-saffron">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-body font-medium text-earth text-sm">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-ash">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
