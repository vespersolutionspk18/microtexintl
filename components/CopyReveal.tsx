"use client";
import { useRef, useEffect, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

// Exact from source: CopyReveal (data-v-42b7938e)
// Uses SplitText to split content into lines, then staggers autoAlpha 0→1
// duration 2.5, ease power3.out, stagger 0.15

interface CopyRevealProps {
  children: ReactNode;
  tag?: "p" | "div" | "span";
  className?: string;
  threshold?: number;
}

export default function CopyReveal({
  children,
  tag: Tag = "p",
  className,
  threshold = 0.2,
}: CopyRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [observerRef, inView] = useInView({ threshold, once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !wrapperRef.current) return;
    hasAnimated.current = true;

    const el = wrapperRef.current.firstElementChild as HTMLElement;
    if (!el) return;

    // Dynamic import to avoid SSR issues
    Promise.all([
      import("gsap"),
      import("gsap/SplitText"),
    ]).then(([gsapModule, splitModule]) => {
      const gsap = gsapModule.default || gsapModule.gsap;
      const { SplitText } = splitModule;
      gsap.registerPlugin(SplitText);

      const split = new SplitText(el, { type: "lines" });
      gsap.set(wrapperRef.current, { autoAlpha: 1 });
      gsap.fromTo(
        split.lines,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 2.5,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    });
  }, [inView]);

  return (
    <div
      ref={(el) => {
        wrapperRef.current = el;
        // Also set the observer ref
        if (typeof observerRef === "object" && observerRef !== null) {
          (observerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
      }}
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <Tag className={className}>{children}</Tag>
    </div>
  );
}
