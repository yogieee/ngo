"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function AnimatedWord({
  children,
  delay = 0,
  italic = false,
  bold = false,
}: {
  children: React.ReactNode;
  delay?: number;
  italic?: boolean;
  bold?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className="block overflow-hidden">
      <span
        className={cn(
          "block transition-all duration-700 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0",
          italic && "italic",
          bold ? "font-bold" : "font-light"
        )}
      >
        {children}
      </span>
    </span>
  );
}
