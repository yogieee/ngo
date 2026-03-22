"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function shouldShowLoading() {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem("sevanjali-loaded");
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(shouldShowLoading);

  useEffect(() => {
    if (!isLoading) return;

    sessionStorage.setItem("sevanjali-loaded", "true");
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-earth flex items-center justify-center"
          style={{ zIndex: 9999 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo / Name */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-cream italic font-bold"
                style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                Sevanjali
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="font-accent text-label text-saffron uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Serving Humanity Since 1993
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-px bg-cream/10 rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-saffron rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
