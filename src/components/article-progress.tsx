"use client";

import { useEffect, useRef } from "react";

export function ArticleProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, scrollTop / max) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${value})`;
      }
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[70] h-1 bg-transparent">
      <div
        className="h-full origin-left bg-accent"
        ref={progressRef}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
