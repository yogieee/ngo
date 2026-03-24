"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelEl = useRef<HTMLDivElement | null>(null);
  const [showHint, setShowHint] = useState(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!sessionStorage.getItem("music_clicked")) {
      const t = setTimeout(() => setShowHint(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Listen for sessionStorage change (set by BackgroundMusic)
  useEffect(() => {
    if (!showHint) return;

    function handleClick() {
      setShowHint(false);
    }

    // Hide on any click (music will start from BackgroundMusic's listener)
    window.addEventListener("click", handleClick, { once: true });
    return () => window.removeEventListener("click", handleClick);
  }, [showHint]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";

      hasMoved.current = true;

      if (labelEl.current) {
        labelEl.current.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 18}px)`;
        labelEl.current.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor-grow]");
      if (target) {
        cursor.style.width = "120px";
        cursor.style.height = "120px";
        cursor.style.mixBlendMode = "difference";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor-grow]");
      if (target) {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.mixBlendMode = "normal";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: -20,
          left: -20,
          width: 20,
          height: 20,
          backgroundColor: "var(--color-saffron)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease, mix-blend-mode 0.3s ease",
        }}
      />

      {showHint && (
        <div
          ref={labelEl}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0,
            willChange: "transform",
          }}
        >
          <span className="font-body text-[11px] font-medium text-saffron bg-earth/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-saffron/20 whitespace-nowrap shadow-lg">
            Click for sound
          </span>
        </div>
      )}
    </>
  );
}
