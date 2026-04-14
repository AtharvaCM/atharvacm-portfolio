"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const START_DELAY_MS = 120;
const FINISH_DELAY_MS = 260;
const SAFETY_TIMEOUT_MS = 8000;

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (
    anchor.target ||
    anchor.hasAttribute("download") ||
    anchor.getAttribute("aria-disabled") === "true"
  ) {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  const currentPath = `${window.location.pathname}${window.location.search}`;
  const nextPath = `${url.pathname}${url.search}`;

  return currentPath !== nextPath;
}

export function NavigationProgress() {
  const pathname = usePathname();
  const progressElementRef = useRef<HTMLDivElement | null>(null);
  const progressValueRef = useRef(0);
  const startTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const trickleTimerRef = useRef<number | null>(null);
  const pathnameRef = useRef(pathname);
  const isLoadingRef = useRef(false);
  const hasShownRef = useRef(false);

  const clearTimer = useCallback((timer: number | null) => {
    if (timer) {
      window.clearTimeout(timer);
    }
  }, []);

  const setProgress = useCallback((value: number) => {
    progressValueRef.current = value;

    if (progressElementRef.current) {
      progressElementRef.current.style.transform = `scaleX(${value / 100})`;
    }
  }, []);

  const setVisible = useCallback((visible: boolean) => {
    if (progressElementRef.current) {
      progressElementRef.current.dataset.visible = String(visible);
    }
  }, []);

  const stopTrickle = useCallback(() => {
    if (trickleTimerRef.current) {
      window.clearInterval(trickleTimerRef.current);
      trickleTimerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopTrickle();
    clearTimer(startTimerRef.current);
    clearTimer(finishTimerRef.current);
    clearTimer(safetyTimerRef.current);
    startTimerRef.current = null;
    finishTimerRef.current = null;
    safetyTimerRef.current = null;
    isLoadingRef.current = false;
    hasShownRef.current = false;
    setVisible(false);
    setProgress(0);
  }, [clearTimer, setProgress, setVisible, stopTrickle]);

  const finish = useCallback(() => {
    clearTimer(startTimerRef.current);
    startTimerRef.current = null;

    if (!isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = false;
    stopTrickle();
    clearTimer(safetyTimerRef.current);
    safetyTimerRef.current = null;

    if (!hasShownRef.current) {
      reset();
      return;
    }

    setProgress(100);
    finishTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => {
        setProgress(0);
        hasShownRef.current = false;
      }, 180);
    }, FINISH_DELAY_MS);
  }, [clearTimer, reset, setProgress, setVisible, stopTrickle]);

  const start = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    clearTimer(finishTimerRef.current);
    finishTimerRef.current = null;

    startTimerRef.current = window.setTimeout(() => {
      hasShownRef.current = true;
      setVisible(true);
      setProgress(18);

      trickleTimerRef.current = window.setInterval(() => {
        const current = progressValueRef.current;

        if (current < 88) {
          setProgress(current + Math.max(1, (88 - current) * 0.12));
        }
      }, 360);
    }, START_DELAY_MS);

    safetyTimerRef.current = window.setTimeout(finish, SAFETY_TIMEOUT_MS);
  }, [clearTimer, finish, setProgress, setVisible]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");

      if (anchor instanceof HTMLAnchorElement && isInternalNavigation(anchor)) {
        start();
      }
    }

    window.addEventListener("popstate", start);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("popstate", start);
      document.removeEventListener("click", onDocumentClick);
      reset();
    };
  }, [reset, start]);

  useEffect(() => {
    if (pathnameRef.current === pathname) {
      return;
    }

    pathnameRef.current = pathname;

    const timer = window.setTimeout(finish, 0);

    return () => window.clearTimeout(timer);
  }, [finish, pathname]);

  return (
    <div
      aria-hidden
      className="navigation-progress"
      data-visible="false"
      ref={progressElementRef}
      style={{ transform: "scaleX(0)" }}
    />
  );
}
