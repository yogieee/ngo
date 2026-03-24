"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-earth/60 backdrop-blur-xl border-b border-cream/10 shadow-lg shadow-earth/20"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-accent text-3xl font-semibold text-saffron tracking-wide">
            SP
          </span>
          <span className="hidden sm:block font-body text-xs text-cream/70 uppercase tracking-[1.5px] leading-tight">
            Sevanjali
            <br />
            Prathishtana
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[13px] font-medium uppercase tracking-[1.5px] text-cream/80 hover:text-saffron transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Music + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="bg-saffron text-earth px-6 py-2 rounded-sm font-body font-medium text-sm hover:bg-terracotta transition-colors"
          >
            Donate Now
          </Link>
          <BackgroundMusic />
          <button
            className="lg:hidden text-cream"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-earth/70 backdrop-blur-xl border-t border-cream/10">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm uppercase tracking-[1.5px] text-cream/80 hover:text-saffron transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
