"use client";
import { useRef, useState, useEffect } from "react";

export function useInView(
  options?: IntersectionObserverInit & { once?: boolean },
) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { once = true, ...obsOptions } = options || {};
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, obsOptions);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView] as const;
}
