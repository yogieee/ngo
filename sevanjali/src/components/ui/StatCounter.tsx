"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

export function StatCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.5, once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
