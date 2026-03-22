"use client";

import { useEffect, useRef, useState } from "react";
import type { Event } from "@/lib/actions/events";

export function EventTicker({ events }: { events: Event[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = left-to-right, -1 = right-to-left
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(1);

  // Change direction based on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY > lastScrollY) {
        setDirection(-1); // scrolling down → move right-to-left
      } else if (currentY < lastScrollY) {
        setDirection(1); // scrolling up → move left-to-right
      }
      lastScrollY = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const contentWidth = track.scrollWidth / 2; // we duplicate content

    function animate() {
      posRef.current += speedRef.current * direction;

      // Wrap seamlessly
      if (direction === 1 && posRef.current >= 0) {
        posRef.current = -contentWidth;
      } else if (direction === -1 && posRef.current <= -contentWidth) {
        posRef.current = 0;
      }

      if (track) {
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    // Start position
    if (posRef.current === 0) {
      posRef.current = -contentWidth;
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction]);

  if (events.length === 0) return null;

  const tickerItems = events.map((e) => (
    <span key={e.id} className="flex items-center gap-3 whitespace-nowrap px-8">
      <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />
      <span className="font-body text-sm font-medium text-cream">
        {e.title}
      </span>
      <span className="text-cream/40">—</span>
      <span className="font-body text-sm text-cream/60">{e.date}</span>
      <span className="text-cream/40">·</span>
      <span className="font-body text-sm text-cream/60">{e.location}</span>
    </span>
  ));

  return (
    <div className="bg-earth/95 border-y border-cream/10 py-3 overflow-hidden">
      <div ref={trackRef} className="flex will-change-transform">
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0">{tickerItems}</div>
        <div className="flex shrink-0">{tickerItems}</div>
      </div>
    </div>
  );
}
