# CLAUDE.md — Sevanjali Prathishtana Website Redesign

> **Project**: Sevanjali Prathishtana NGO Website  
> **Stack**: Next.js 14 (App Router) + Tailwind CSS v3 + TypeScript  
> **Goal**: Awwwards-quality redesign with storytelling editorial aesthetic, need to focus on content hierarchy and visual storytelling

---

## Project Overview

Sevanjali Prathishtana is a 30+ year old NGO from Farangipete, Karnataka, India. They run free medical camps (twice monthly), educational scholarships, blood donation drives, patient assistance, and host the annual Ganeshotsava community festival. The redesign must feel world-class and editorial while remaining warm, human, and rooted in South Indian cultural identity.

---

## Tech Stack & Setup

```bash
npx create-next-app@latest sevanjali --typescript --tailwind --app --src-dir
cd sevanjali
npm install framer-motion @radix-ui/react-dialog lucide-react clsx tailwind-merge
```

### `tailwind.config.ts`

Extend Tailwind with the full custom design system:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        earth: "#1C1208",
        saffron: "#E8640C",
        turmeric: "#D4A017",
        cream: "#F5EDD8",
        terracotta: "#B5452A",
        moss: "#3B4A2F",
        ash: "#8A7F72",
        lightbg: "#FAF6EE",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      fontSize: {
        hero: [
          "clamp(64px, 10vw, 140px)",
          { lineHeight: "0.95", letterSpacing: "-2px" },
        ],
        section: ["clamp(40px, 6vw, 72px)", { lineHeight: "1.05" }],
        stat: ["clamp(56px, 7vw, 80px)", { lineHeight: "1" }],
        label: ["11px", { lineHeight: "1", letterSpacing: "4px" }],
      },
      clipPath: {
        "diagonal-down": "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        "diagonal-up": "polygon(0 10%, 100% 0, 100% 100%, 0 100%)",
      },
      animation: {
        "word-up": "wordUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "count-up": "countUp 1.5s ease-out forwards",
        "fade-slide": "fadeSlide 0.6s ease-out forwards",
      },
      keyframes: {
        wordUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeSlide: {
          "0%": { transform: "translateY(32px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Design System

### Aesthetic Direction: "Sacred Earth"

**Concept**: Organic Luxury Editorial. Blending the warmth of a Harvey Nichols editorial with the cultural richness of a South Indian art direction. Think slow-scrolling NGO storytelling like Patagonia's environmental campaigns crossed with a texture-rich editorial feel.

**NOT**: Generic charity template, corporate blue/white, rounded card grids, emoji icons.  
**YES**: Full-bleed sections, asymmetric layouts, bold Cormorant typography, saffron as a sacred accent.

---

### Colour Palette

| Token        | Hex       | Usage                                     |
| ------------ | --------- | ----------------------------------------- |
| `earth`      | `#1C1208` | Primary dark background                   |
| `saffron`    | `#E8640C` | Primary accent — CTAs, labels, highlights |
| `turmeric`   | `#D4A017` | Secondary accent — stat numbers, borders  |
| `cream`      | `#F5EDD8` | Primary text on dark backgrounds          |
| `terracotta` | `#B5452A` | Hover states, badge backgrounds           |
| `moss`       | `#3B4A2F` | Founder section background                |
| `ash`        | `#8A7F72` | Muted/secondary text                      |
| `lightbg`    | `#FAF6EE` | Light section backgrounds (not white)     |

**Section rhythm**: Alternate `earth` (dark) ↔ `lightbg` (light) sections. Never pure `#000` or `#fff`.

---

### Typography

#### Font Setup — `src/app/layout.tsx`

```tsx
import { Cormorant_Garamond, DM_Sans, Cinzel } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
});
```

Apply variables to `<html>` tag:

```tsx
<html className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable}`}>
```

#### Type Scale

| Role           | Font               | Size / Weight         | Class pattern                                                                |
| -------------- | ------------------ | --------------------- | ---------------------------------------------------------------------------- |
| Hero H1        | Cormorant Garamond | clamp 64–140px / 300  | `font-display text-hero font-light`                                          |
| Section H2     | Cormorant Garamond | clamp 40–72px / 700   | `font-display text-section font-bold italic`                                 |
| Stat numbers   | Cormorant Garamond | clamp 56–80px / 300   | `font-display text-stat font-light`                                          |
| Section labels | Cinzel             | 11px / 600 / ls 4px   | `font-accent text-label font-semibold uppercase tracking-[4px] text-saffron` |
| Body           | DM Sans            | 16–18px / 300         | `font-body text-base font-light leading-relaxed`                             |
| Nav links      | DM Sans            | 13px / 500 / ls 1.5px | `font-body text-[13px] font-medium uppercase tracking-[1.5px]`               |

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Font setup, metadata, global wrapper
│   ├── page.tsx            # Home — composes all sections
│   ├── founder/page.tsx    # Founder detail page
│   ├── gallery/page.tsx    # Gallery page
│   ├── contact/page.tsx    # Contact page
│   └── donate/page.tsx     # Donate page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky transparent → earth nav
│   │   └── Footer.tsx      # Dark footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ImpactStrip.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ActivitiesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FounderSection.tsx
│   │   ├── GaneshotsavaSection.tsx
│   │   └── CtaSection.tsx
│   └── ui/
│       ├── SectionLabel.tsx    # Reusable Cinzel label
│       ├── StatCounter.tsx     # Animated count-up number
│       ├── DiagonalDivider.tsx # SVG clip-path section transition
│       ├── AnimatedWord.tsx    # Staggered word reveal
│       └── MagneticButton.tsx  # Mouse-tracking CTA button
├── hooks/
│   ├── useInView.ts        # IntersectionObserver hook
│   └── useMouseMagnetic.ts # Magnetic button hook
└── lib/
    └── data.ts             # All site content as typed constants
```

---

## Component Specifications

### `Navbar.tsx`

- **Default state**: `bg-transparent`, text `cream`, logo white
- **Scrolled state**: `bg-earth border-b border-ash/20`, transition `duration-300`
- **Logo**: `"SP"` monogram in `font-accent` + `"Sevanjali Prathishtana"` in `font-body` below
- **Nav links**: `font-body text-[13px] uppercase tracking-[1.5px]` — Home, About, Activities, Events, Founder, Gallery, Contact
- **CTA**: `"Donate Now"` pill — `bg-saffron text-earth px-6 py-2 rounded-sm font-body font-medium`
- Use `useEffect` + `useState` on `window.scrollY` to toggle classes

```tsx
// Detect scroll
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 40);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

### `HeroSection.tsx`

**Layout**: Full viewport height (`min-h-screen`), dark `bg-earth`, full-bleed background image with layered overlays.

**Layers** (bottom to top):

1. Next.js `<Image>` fill, `object-cover`, `priority`
2. Gradient overlay: `bg-gradient-to-r from-earth via-earth/70 to-transparent`
3. SVG noise texture at 4% opacity (inline SVG `<feTurbulence>` filter)
4. Content

**Content structure**:

```tsx
// Section label
<SectionLabel>Est. 1993 — Farangipete, Karnataka</SectionLabel>

// H1 — three staggered lines
<h1>
  <AnimatedWord delay={0}   italic light>Serving</AnimatedWord>
  <AnimatedWord delay={80}  bold>Humanity</AnimatedWord>
  <AnimatedWord delay={160} italic light>with Compassion</AnimatedWord>
</h1>

// Subtext
<p className="font-body text-lg text-ash max-w-[520px] font-light leading-relaxed">
  A community-driven NGO serving Farangipete through healthcare, education, and social welfare since 1993.
</p>

// Stat pills (inline row)
<div className="flex gap-3 flex-wrap">
  {['30+ Years', '344+ Camps', 'Thousands Helped'].map(s => (
    <span className="bg-saffron/10 text-saffron border border-saffron/20 px-4 py-1.5 rounded-full font-body text-sm">
      {s}
    </span>
  ))}
</div>

// CTAs
<MagneticButton variant="outline">Our Story</MagneticButton>
<MagneticButton variant="filled">Donate Now</MagneticButton>
```

**Scroll indicator**: Animated vertical line with pulsing dot using `animate-bounce`.

---

### `ImpactStrip.tsx`

Full-width strip. `bg-gradient-to-r from-earth to-terracotta/80`. 4-column grid on desktop, 2×2 on mobile.

```tsx
const stats = [
  { number: 30, suffix: "+", label: "Years of Service" },
  { number: 344, suffix: "+", label: "Medical Camps" },
  { number: 10, suffix: "K+", label: "Lives Impacted" },
  { number: 50, suffix: "+", label: "Social Initiatives" },
];
```

Each stat uses `<StatCounter>` — counts from 0 on `inView`. Thin `border-r border-cream/10` dividers. Number in `font-display text-stat text-cream`, label in `font-accent text-label text-ash`.

---

### `AboutSection.tsx`

**Background**: `bg-lightbg`

**Layout**: 2-column CSS grid on desktop — `grid grid-cols-1 lg:grid-cols-2 gap-16 items-start`

**Left col**:

- Pull-quote in `font-display text-section font-bold italic text-earth leading-[1.05]`:
  > "Three decades of selfless service, compassion, and community building"
- Body paragraphs in `font-body text-base font-light text-earth/80 leading-relaxed`

**Right col**:

- `<Image>` that bleeds left past its column boundary using negative margin: `lg:-ml-16`
- Floating badge overlaid on image bottom-left: round `bg-terracotta` circle with `"Est. 1993"` in `font-accent text-cream`
- Below image: founding facts as tag pills — `bg-earth/5 border border-earth/10 text-earth px-3 py-1 rounded-full font-body text-sm`

---

### `ActivitiesSection.tsx`

**Background**: `bg-earth`

**Header**: `SectionLabel` + H2 in `font-display italic text-cream`

**Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10` (gap creates visible grid lines)

Each card — `group` with Tailwind group-hover:

```tsx
<div
  className="
  group relative p-8 bg-earth cursor-pointer
  transition-colors duration-300
  hover:bg-saffron
"
>
  {/* Card number */}
  <span className="font-display text-sm text-ash group-hover:text-earth/40 transition-colors">
    {String(index + 1).padStart(2, "0")}
  </span>

  {/* SVG decorative line icon (NOT emoji) */}
  <ActivityIcon className="w-8 h-8 text-saffron group-hover:text-earth transition-colors mt-4" />

  {/* Title */}
  <h3 className="font-display text-[28px] font-bold text-cream group-hover:text-earth mt-3 transition-colors">
    {activity.title}
  </h3>

  {/* Description */}
  <p className="font-body text-sm text-ash group-hover:text-earth/70 mt-2 leading-relaxed transition-colors">
    {activity.description}
  </p>

  {/* Arrow link */}
  <span className="flex items-center gap-2 text-saffron group-hover:text-earth mt-6 font-body text-sm font-medium transition-all group-hover:gap-4">
    Learn more <ArrowRight size={16} />
  </span>
</div>
```

Activities data (`lib/data.ts`):

```ts
export const activities = [
  {
    title: "Free Medical Camps",
    description:
      "Quality healthcare twice monthly for underprivileged families in Farangipete.",
  },
  {
    title: "Educational Scholarships",
    description:
      "Merit and need-based support for engineering and higher education students.",
  },
  {
    title: "Blood Donation Camps",
    description:
      "Regular drives replenishing blood banks across Dakshina Kannada.",
  },
  {
    title: "Patient Assistance",
    description:
      "Financial and emotional support for hospitalised patients who cannot afford care.",
  },
  {
    title: "Free Health Cards",
    description:
      "Green Cards giving underprivileged families access at partner hospitals.",
  },
  {
    title: "Eye, Dental & Surgical",
    description:
      "Free specialist care for those who cannot afford eye, dental, or surgical treatment.",
  },
];
```

---

### `TestimonialsSection.tsx`

**Background**: `bg-lightbg`

**Header**: `SectionLabel "STUDENT STORIES"` + H2 italic `font-display`

**Layout**: Horizontal scroll carousel with CSS scroll-snap

```tsx
<div
  className="
  flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
  scrollbar-none pb-8
  cursor-grab active:cursor-grabbing
"
>
  {testimonials.map((t) => (
    <div
      className="
      snap-start shrink-0 w-[min(560px,85vw)]
      bg-white border-l-4 border-saffron
      p-10 relative
    "
    >
      {/* Opening quote mark */}
      <span className="font-display text-[120px] leading-none text-saffron/20 absolute top-4 left-6 select-none">
        "
      </span>
      <p className="font-body text-base font-light leading-relaxed text-earth/80 relative z-10 mt-8">
        {t.quote}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center font-display text-lg text-saffron">
          {t.name[0]}
        </div>
        <div>
          <p className="font-body font-medium text-earth text-sm">{t.name}</p>
          <p className="font-body text-xs text-ash">{t.role}</p>
        </div>
      </div>
    </div>
  ))}
</div>
```

Add JS drag-to-scroll on the container ref.

---

### `FounderSection.tsx`

**Layout**: 50/50 split — `grid grid-cols-1 lg:grid-cols-2`

**Left**: Full-height Next.js `<Image>` of founder, `object-cover object-top`, no border-radius, bleeds to viewport left edge using negative margin or `overflow-hidden` on parent.

**Right**: `bg-moss` dark panel, padded `px-12 py-16 lg:py-24`

```tsx
// Right panel content
<SectionLabel className="text-saffron">Leadership</SectionLabel>

<blockquote className="font-display text-section font-light italic text-cream leading-[1.1] mt-6">
  "Service to humanity is service to God."
</blockquote>
<cite className="font-body text-sm text-ash mt-3 block not-italic">
  — Sri Krishna Kumar Punja
</cite>

<p className="font-body text-base font-light text-cream/70 leading-relaxed mt-8">
  {founderBio}
</p>

{/* Stat grid */}
<div className="grid grid-cols-2 gap-6 mt-10 border-t border-cream/10 pt-8">
  {founderStats.map(s => (
    <div>
      <p className="font-display text-[40px] font-light text-turmeric">{s.value}</p>
      <p className="font-accent text-label text-ash uppercase">{s.label}</p>
    </div>
  ))}
</div>
```

---

### `GaneshotsavaSection.tsx`

**Background**: `bg-earth` with faint SVG mandala pattern at 5% opacity (use inline SVG as `background-image` via CSS)

**Header**:

```tsx
<SectionLabel>Annual Celebration</SectionLabel>
<h2 className="font-display text-[clamp(64px,12vw,120px)] font-light italic text-cream leading-none">
  Ganeshotsava
</h2>
```

**Festival stats row**: 4 inline stats — Frequency / Location / Attendance / Since — separated by `border-r border-cream/10`

**Photo grid**: `columns-1 sm:columns-2 lg:columns-3 gap-3` (CSS masonry). Each image wrapped in:

```tsx
<div className="overflow-hidden mb-3 break-inside-avoid">
  <Image
    className="w-full object-cover transition-transform duration-500 hover:scale-105"
    ...
  />
</div>
```

**Event tags row** (below grid): Pill tags for other events — `bg-cream/5 border border-cream/10 text-cream px-4 py-2 rounded-full font-body text-sm`

---

### `CtaSection.tsx`

**Background**: `bg-saffron` full-bleed

**Content**: Centered, generous vertical padding `py-32`

```tsx
<p className="font-accent text-label text-earth/50 uppercase">Make a difference</p>
<h2 className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto text-center leading-[1.05]">
  Join us in serving humanity
</h2>
<p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto text-center font-light">
  Every act of kindness makes a difference. Volunteer, donate, or simply spread the word.
</p>
<MagneticButton variant="dark" className="mt-10">
  Donate Now
</MagneticButton>
```

---

### `SectionLabel.tsx`

```tsx
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-accent text-label font-semibold uppercase tracking-[4px] text-saffron",
        className,
      )}
    >
      {children}
    </p>
  );
}
```

---

### `StatCounter.tsx`

```tsx
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
```

---

### `AnimatedWord.tsx`

```tsx
"use client";
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
  return (
    <span className="block overflow-hidden">
      <span
        className={cn(
          "block translate-y-full opacity-0 animate-word-up",
          italic && "italic",
          bold ? "font-bold" : "font-light",
        )}
        style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
      >
        {children}
      </span>
    </span>
  );
}
```

---

### `MagneticButton.tsx`

```tsx
"use client";
import { useRef } from "react";

export function MagneticButton({
  children,
  variant = "filled",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

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
    "relative px-8 py-3.5 font-body font-medium text-sm tracking-wide transition-transform duration-200 ease-out rounded-sm";
  const variants = {
    filled: "bg-saffron text-earth hover:bg-terracotta",
    outline: "border border-cream text-cream hover:bg-cream/10",
    dark: "bg-earth text-cream border border-earth hover:bg-earth/80",
  };

  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
```

---

### `useInView.ts`

```ts
import { useEffect, useState, RefObject } from "react";

export function useInView(
  ref: RefObject<Element>,
  options: IntersectionObserverInit & { once?: boolean } = {},
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
  }, [ref, once]);

  return inView;
}
```

---

## Section Scroll-Entrance Animation

Wrap every section's content in a `ScrollReveal` component:

```tsx
"use client";
export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1, once: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

---

## Diagonal Section Dividers

Between alternating dark/light sections, use SVG clip-path to cut diagonally instead of flat lines:

```tsx
// DiagonalDivider.tsx
export function DiagonalDivider({ flip = false, color = "#FAF6EE" }) {
  return (
    <div className="relative h-16 -mt-1 overflow-hidden">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon
          points={flip ? "0,64 1440,0 1440,64" : "0,0 1440,64 0,64"}
          fill={color}
        />
      </svg>
    </div>
  );
}
```

---

## Content Data — `lib/data.ts`

```ts
export const siteData = {
  org: {
    name: "Sevanjali Prathishtana",
    monogram: "SP",
    tagline: "Serving Humanity Since 1993",
    founded: 1993,
    location: "Farangipete, Bantwal Taluk, Dakshina Kannada",
    phone: "+91 94485 02319",
    email: "sevanjali.farangipete@gmail.com",
    whatsapp: "https://wa.me/919448502319",
  },
  stats: [
    { value: 30, suffix: "+", label: "Years of Service" },
    { value: 344, suffix: "+", label: "Medical Camps" },
    { value: 10000, suffix: "+", label: "Lives Impacted" },
    { value: 50, suffix: "+", label: "Social Initiatives" },
  ],
  founder: {
    name: "Sri Krishna Kumar Punja",
    title: "KK Punja — Management Trustee",
    quote:
      "Service to humanity is service to God. Every person we help, every life we touch, is a step towards building the kind of community we all want to live in.",
    bio: "Sri Krishna Kumar Punja, Management Trustee of Sevanjali Prathishtana, has been the driving force behind the organisation's work for more than three decades. Under his visionary leadership, Sevanjali has grown from a small community initiative into a respected institution touching thousands of lives through healthcare, education, and cultural programmes.",
    stats: [
      { value: "30+", label: "Years Leading" },
      { value: "344+", label: "Camps Organised" },
      { value: "10K+", label: "Lives Impacted" },
      { value: "1993", label: "Founded the Trust" },
    ],
  },
  testimonials: [
    {
      name: "Divya Shanker",
      role: "Graduated Engineer",
      quote:
        "I want to thank Sevanjali Trust and its trustee Mr. Krishna Kumar Poonja for supporting me financially to complete my education. Because of his help I am able to fulfill my dream.",
    },
    {
      name: "Harinakshi Shetty",
      role: "Engineer",
      quote:
        "I never dreamt of becoming an engineer because I belong to a middle class family. After I completed SSLC I was confused whether I should continue my education. At that same time Sevanjali stepped in.",
    },
    {
      name: "Pavithra Lakshmi",
      role: "Engineering Student",
      quote:
        "Sevanjali is a support to continue my studies. After my PUC I had a financial problem to continue. K.K. Poonja has been my inspiration and strength throughout.",
    },
  ],
};
```

---

## Images

Use the original hosted images from the live site. Reference them in Next.js `<Image>` with `unoptimized` or add the hostname to `next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.sevanjaliprathishtana.com" },
      { protocol: "https", hostname: "images.unsplash.com" }, // fallback placeholders
    ],
  },
};
```

**Original image paths** (already hosted):

```
Hero:       /images/hero/hero-banner.jpg
About:      /images/gallery/medical-3.jpg
Founder:    /images/founder.png
Festival:   /images/events/ganesh-idol.jpg
            /images/events/ganesh-bhajan.jpg
            /images/events/ganesh-gathering.jpg
            /images/events/ganesh-puja.jpg
            /images/events/community-prayer.jpg
            /images/events/ganesh-prep1.jpg
            /images/events/ganesh-prep2.jpg
            /images/events/ganesh-aerial-night.jpg
            /images/events/ganesh-vintage1.jpg
            /images/events/ganesh-vintage2.jpg
            /images/events/sevanjali-building.jpg
```

---

## Global CSS — `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-earth text-cream font-body antialiased;
    cursor: none; /* Hide default cursor for custom dot cursor */
  }

  /* Hide scrollbar on carousel */
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@layer utilities {
  /* Noise texture overlay */
  .noise-overlay::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }
}
```

---

## Custom Cursor — Add to `layout.tsx`

```tsx
"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dot}
      className="fixed w-3 h-3 bg-saffron rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-75"
      style={{ position: "fixed" }}
    />
  );
}
```

---

## Do Not

- ❌ Use `Inter`, `Roboto`, `Arial`, or system fonts for display text
- ❌ Use pure `#ffffff` or `#000000` backgrounds
- ❌ Use emoji as icons — use `lucide-react` SVGs or custom SVG inline
- ❌ Use `rounded-xl` or `rounded-2xl` on cards — use `rounded-sm` or no radius
- ❌ Use box-shadows (`shadow-lg`, etc.) — use background transforms for depth
- ❌ Centre-align all text — use left-aligned editorial layouts
- ❌ Use equal-width symmetric grids throughout — vary proportions deliberately
- ❌ Use generic blue/white charity palette

---

## Do

- ✅ Use `clamp()` for all fluid type and spacing values
- ✅ Use `font-display` (Cormorant) for all headings and numbers
- ✅ Use `font-accent` (Cinzel) sparingly — section labels and tags only
- ✅ Use asymmetric layouts with images bleeding past their grid column
- ✅ Stagger animations with `animationDelay` for polished reveals
- ✅ Use the `group` / `group-hover:` pattern for activity card interactions
- ✅ Use diagonal SVG dividers between alternating sections
- ✅ Keep `bg-saffron` reserved for the primary CTA section and key accents only

---

_Last updated: March 2026 — Sevanjali Prathishtana Redesign Brief_
