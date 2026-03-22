"use client";
import { useState, useEffect, useRef } from "react";

const quotes = [
  "\u201CThe best way to find yourself is to lose yourself in the service of others.\u201D \u2014 Mahatma Gandhi",
  "\u201CNo one has ever become poor by giving.\u201D \u2014 Anne Frank",
  "\u201CKindness is the language which the deaf can hear and the blind can see.\u201D \u2014 Mark Twain",
  "\u201CWe make a living by what we get, but we make a life by what we give.\u201D \u2014 Winston Churchill",
  "\u201CPeace begins with a smile.\u201D \u2014 Mother Teresa",
  "\u201CIn a gentle way, you can shake the world.\u201D \u2014 Mahatma Gandhi",
  "\u201CThe purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.\u201D \u2014 Ralph Waldo Emerson",
  "\u201CWhere there is charity and wisdom, there is neither fear nor ignorance.\u201D \u2014 Francis of Assisi",
  "\u201CInjustice anywhere is a threat to justice everywhere.\u201D \u2014 Martin Luther King Jr.",
  "\u201CHope is being able to see that there is light despite all of the darkness.\u201D \u2014 Desmond Tutu",
  "\u201CThe simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.\u201D \u2014 Mahatma Gandhi",
  "\u201CAlone we can do so little; together we can do so much.\u201D \u2014 Helen Keller",
  "\u201CCarry out a random act of kindness, with no expectation of reward.\u201D \u2014 Princess Diana",
  "\u201CNot all of us can do great things. But we can do small things with great love.\u201D \u2014 Mother Teresa",
  "\u201CBe the change that you wish to see in the world.\u201D \u2014 Mahatma Gandhi",
];

export function RotatingQuotes() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length)
  );
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);

      // After fade out completes, swap quote and fade in
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => {
          let next: number;
          do {
            next = Math.floor(Math.random() * quotes.length);
          } while (next === prev && quotes.length > 1);
          return next;
        });
        setVisible(true);
      }, 800);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <p
      className="font-body text-sm text-cream/50 max-w-[520px] italic font-light leading-relaxed mt-4 min-h-[3em] transition-all duration-700 ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {quotes[index]}
    </p>
  );
}
