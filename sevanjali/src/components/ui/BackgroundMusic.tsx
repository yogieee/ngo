"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("music_clicked") === "1";
    }
    return false;
  });

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  // Auto-play on first click/tap/keydown (trusted gestures only — scroll won't work)
  useEffect(() => {
    if (hasInteracted) return;

    function handleInteraction() {
      setHasInteracted(true);
      sessionStorage.setItem("music_clicked", "1");
      play();
    }

    const events = ["click", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, handleInteraction, { once: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleInteraction));
    };
  }, [hasInteracted, play]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/world1.mp3" loop preload="auto" />

      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        className="w-9 h-9 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
      >
        {playing ? (
          <div className="flex items-end gap-[2.5px] h-3.5">
            <span className="w-[2.5px] bg-saffron rounded-full animate-bar1" />
            <span className="w-[2.5px] bg-saffron rounded-full animate-bar2" />
            <span className="w-[2.5px] bg-saffron rounded-full animate-bar3" />
            <span className="w-[2.5px] bg-saffron rounded-full animate-bar4" />
          </div>
        ) : (
          <div className="flex items-end gap-[2.5px] h-3.5">
            <span className="w-[2.5px] h-[2.5px] bg-saffron/50 rounded-full" />
            <span className="w-[2.5px] h-[2.5px] bg-saffron/50 rounded-full" />
            <span className="w-[2.5px] h-[2.5px] bg-saffron/50 rounded-full" />
            <span className="w-[2.5px] h-[2.5px] bg-saffron/50 rounded-full" />
          </div>
        )}
      </button>
    </>
  );
}
