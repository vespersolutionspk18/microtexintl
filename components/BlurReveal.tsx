"use client";
import { forwardRef, useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./BlurReveal.module.css";

// Exact from source: BlurReveal (data-v-4f32ea0b)
// SplitText into chars, blur(10px)->blur(0px), stagger 0.03, duration 1.6, ease expo.out

interface BlurRevealProps {
  lines: string[];
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  manual?: boolean;
  triggered?: boolean;
}

export default function BlurReveal({
  lines,
  tag: Tag = "div",
  className,
  delay = 0,
  manual = false,
  triggered = false,
}: BlurRevealProps) {
  const [ref, inView] = useInView({ threshold: 0 });

  const shouldAnimate = manual ? triggered : inView;

  const charSpans = useMemo(() => {
    // Exact from source: split into lines, then chars within each line.
    // Each line's char stagger starts at 0 independently — all lines animate simultaneously.
    return lines.map((line, li) => {
      let lineCharIdx = 0;
      return (
        <span key={li} className={styles.line}>
          {line.split("").map((char, ci) => {
            const isSpace = char === " ";
            const idx = isSpace ? -1 : lineCharIdx++;
            return (
              <span
                key={ci}
                className={styles.char}
                style={
                  !isSpace && shouldAnimate
                    ? { animationDelay: `${idx * 0.03 + delay}s` }
                    : undefined
                }
                data-reveal={shouldAnimate ? "" : undefined}
              >
                {isSpace ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      );
    });
  }, [lines, shouldAnimate, delay]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={manual ? undefined : ref}
      className={`${styles.wrapper} ${className || ""}`}
    >
      {charSpans}
    </Component>
  );
}
