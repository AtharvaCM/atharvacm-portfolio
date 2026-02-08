"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!aura || !ring || !dot || typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !finePointer) {
      return;
    }

    const root = document.documentElement;
    root.dataset.customCursor = "true";

    const interactiveSelector = [
      "a",
      "button",
      "[role='button']",
      "input",
      "textarea",
      "select",
      "summary",
      "[data-cursor='hover']"
    ].join(",");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let auraX = targetX;
    let auraY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let dotX = targetX;
    let dotY = targetY;
    let isHoveringInteractive = false;
    let isPressing = false;
    let frame = 0;

    const setHoverState = (enabled: boolean) => {
      isHoveringInteractive = enabled;
      ring.classList.toggle("is-hover", enabled);
      dot.classList.toggle("is-hover", enabled);
    };

    const setPressState = (enabled: boolean) => {
      isPressing = enabled;
      ring.classList.toggle("is-press", enabled);
      dot.classList.toggle("is-press", enabled);
    };

    const syncInteractiveState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        if (isHoveringInteractive) {
          setHoverState(false);
        }
        return;
      }

      const nextHover = Boolean(target.closest(interactiveSelector));
      if (nextHover !== isHoveringInteractive) {
        setHoverState(nextHover);
      }
    };

    const render = () => {
      auraX += (targetX - auraX) * 0.16;
      auraY += (targetY - auraY) * 0.16;
      ringX += (targetX - ringX) * 0.24;
      ringY += (targetY - ringY) * 0.24;
      dotX += (targetX - dotX) * 0.42;
      dotY += (targetY - dotY) * 0.42;

      const ringScale = isPressing ? 0.9 : isHoveringInteractive ? 1.1 : 1;
      const dotScale = isPressing ? 0.82 : isHoveringInteractive ? 0.72 : 1;

      aura.style.transform = `translate3d(${auraX - 180}px, ${auraY - 180}px, 0)`;
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${ringScale})`;
      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0) scale(${dotScale})`;
      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      aura.classList.add("is-active");
      ring.classList.add("is-active");
      dot.classList.add("is-active");
      syncInteractiveState(event.target);
    };

    const onPointerDown = (event: PointerEvent) => {
      syncInteractiveState(event.target);
      setPressState(true);
    };

    const onPointerUp = () => {
      setPressState(false);
    };

    const onPointerOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        aura.classList.remove("is-active");
        ring.classList.remove("is-active");
        dot.classList.remove("is-active");
        setPressState(false);
      }
    };

    const onWindowBlur = () => {
      aura.classList.remove("is-active");
      ring.classList.remove("is-active");
      dot.classList.remove("is-active");
      setPressState(false);
    };

    aura.style.transform = `translate3d(${auraX - 180}px, ${auraY - 180}px, 0)`;
    ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
    dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
    frame = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("mouseout", onPointerOut);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("mouseout", onPointerOut);
      window.removeEventListener("blur", onWindowBlur);

      delete root.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div aria-hidden className="cursor-aura" ref={auraRef} />
      <div aria-hidden className="cursor-ring" ref={ringRef} />
      <div aria-hidden className="cursor-dot" ref={dotRef} />
    </>
  );
}
