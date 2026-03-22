"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
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
  );
}
