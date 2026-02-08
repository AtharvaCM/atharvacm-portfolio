"use client";

import { useEffect, useState } from "react";

export function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      setProgress(value);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[70] h-1 bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}
