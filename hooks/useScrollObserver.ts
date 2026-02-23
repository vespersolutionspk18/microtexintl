"use client";

import { useEffect, useRef } from "react";

function clamp(min: number, max: number, value: number): number {
  return Math.max(min, Math.min(max, value));
}

function mapRange(
  inRange: [number, number],
  outRange: [number, number],
  value: number
): number {
  return (
    outRange[0] +
    ((value - inRange[0]) * (outRange[1] - outRange[0])) /
      (inRange[1] - inRange[0])
  );
}

export default function useScrollObserver(
  ref: React.RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void
) {
  const rafIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef(false);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      if (!isIntersectingRef.current) return;
      const { height, top } = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = clamp(
        0,
        1,
        mapRange([wh, -height], [0, 1], top)
      );
      onProgressRef.current(progress);
      rafIdRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true;
            rafIdRef.current = requestAnimationFrame(tick);
          } else {
            isIntersectingRef.current = false;
            if (rafIdRef.current !== null) {
              cancelAnimationFrame(rafIdRef.current);
              rafIdRef.current = null;
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [ref]);
}
