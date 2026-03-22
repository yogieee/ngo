"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a section so it stays sticky while the next section
 * scrolls over it with a dramatic depth effect.
 */
export function StickySection({
  children,
  zIndex = 1,
  className,
}: {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // More aggressive scale-down for visible depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.2]);
  const filter = useTransform(
    scrollYProgress,
    [0.6, 1],
    ["blur(0px)", "blur(4px)"]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    ["0px", "24px"]
  );

  return (
    <div ref={ref} className={className} style={{ zIndex, position: "relative" }}>
      <motion.div
        className="sticky top-0 overflow-hidden"
        style={{ scale, opacity, filter, borderRadius }}
      >
        {children}
      </motion.div>
    </div>
  );
}
