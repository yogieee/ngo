"use client";
import { useEffect, useState, type RefObject } from "react";

export function useInView(
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const [inView, setInView] = useState(false);
  const { once = false, ...observerOptions } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, observerOptions);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);

  return inView;
}
