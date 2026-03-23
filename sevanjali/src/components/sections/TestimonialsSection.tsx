"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Send } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { submitTestimonial, type Testimonial } from "@/lib/actions/testimonials";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  // Popup state
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = Math.min(560, el.clientWidth * 0.85) + 24; // card width + gap
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoScrolling || testimonials.length <= 1) return;

    autoScrollTimer.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      // If reached the end, scroll back to start
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 4000);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [isAutoScrolling, scroll, testimonials.length]);

  // Pause auto-scroll on user interaction, resume after 8s
  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsAutoScrolling(true), 8000);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitTestimonial(formData);

    setIsSubmitting(false);

    if (result.error) {
      setSubmitError(result.error);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
      }, 2000);
    }
  }

  return (
    <section className="bg-lightbg py-24 lg:py-32 relative rounded-t-3xl -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header row */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel className="mb-4">Student Stories</SectionLabel>
              <h2 data-cursor-grow className="font-display text-section italic text-earth">
                Voices of Gratitude
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Add testimonial button */}
              <button
                onClick={() => { setShowForm(true); setSubmitSuccess(false); setSubmitError(""); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-saffron text-cream rounded-full text-sm font-body font-medium hover:bg-saffron/90 transition-colors shadow-md"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Share Your Story</span>
              </button>

              {/* Arrow controls */}
              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { scroll("left"); pauseAutoScroll(); }}
                    disabled={!canScrollLeft}
                    className="w-10 h-10 rounded-full border border-earth/20 flex items-center justify-center text-earth/60 hover:bg-earth hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-earth/60 transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => { scroll("right"); pauseAutoScroll(); }}
                    disabled={!canScrollRight}
                    className="w-10 h-10 rounded-full border border-earth/20 flex items-center justify-center text-earth/60 hover:bg-earth hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-earth/60 transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial cards */}
        {testimonials.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-8"
            onMouseDown={pauseAutoScroll}
            onTouchStart={pauseAutoScroll}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="snap-start shrink-0 w-[min(560px,85vw)] glass-light rounded-xl border-l-4 border-saffron p-6 sm:p-10 relative shadow-lg shadow-earth/5"
              >
                <span className="font-display text-[80px] sm:text-[120px] leading-none text-saffron/20 absolute top-2 left-4 sm:top-4 sm:left-6 select-none">
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
                    <p className="font-body text-xs text-ash">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-earth/50 text-lg">No stories yet. Be the first to share yours!</p>
          </div>
        )}
      </div>

      {/* Popup Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-earth/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setShowForm(false)}
          />

          {/* Modal */}
          <div className="relative bg-lightbg rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-slide">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-earth/40 hover:text-earth transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-moss/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl italic text-earth mb-2">Thank You!</h3>
                <p className="font-body text-earth/60 text-sm">Your story has been shared successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl italic text-earth mb-1">Share Your Story</h3>
                <p className="font-body text-sm text-earth/50 mb-6">
                  Tell us how Sevanjali has made a difference in your life.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="test-name" className="block font-body text-sm font-medium text-earth/70 mb-1">
                      Your Name
                    </label>
                    <input
                      id="test-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Divya Shanker"
                      className="w-full px-4 py-2.5 bg-white/70 border border-earth/10 rounded-lg font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="test-course" className="block font-body text-sm font-medium text-earth/70 mb-1">
                      Course / Programme
                    </label>
                    <input
                      id="test-course"
                      name="course"
                      type="text"
                      required
                      placeholder="e.g. B.E. Computer Science"
                      className="w-full px-4 py-2.5 bg-white/70 border border-earth/10 rounded-lg font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="test-quote" className="block font-body text-sm font-medium text-earth/70 mb-1">
                      Your Testimonial
                    </label>
                    <textarea
                      id="test-quote"
                      name="quote"
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="How has Sevanjali helped you?"
                      className="w-full px-4 py-2.5 bg-white/70 border border-earth/10 rounded-lg font-body text-sm text-earth placeholder:text-earth/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/40 resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 font-body">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-saffron text-cream rounded-lg font-body font-medium text-sm hover:bg-saffron/90 disabled:opacity-60 transition-colors"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Your Story
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
