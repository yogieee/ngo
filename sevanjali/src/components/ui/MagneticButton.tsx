"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outline" | "dark";

export function MagneticButton({
  children,
  variant = "filled",
  className,
  href,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const base =
    "relative inline-block px-8 py-3.5 font-body font-medium text-sm tracking-wide transition-transform duration-200 ease-out rounded-sm cursor-pointer";
  const variants: Record<Variant, string> = {
    filled: "bg-saffron text-earth hover:bg-terracotta",
    outline: "border border-cream text-cream hover:bg-cream/10",
    dark: "bg-earth text-cream border border-earth hover:bg-earth/80",
  };

  const props = {
    ref,
    className: cn(base, variants[variant], className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return <a {...props} href={href}>{children}</a>;
  }

  return <button {...props}>{children}</button>;
}
