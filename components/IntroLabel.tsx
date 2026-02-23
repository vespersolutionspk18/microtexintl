"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./IntroLabel.module.css";
import { useInView } from "@/hooks/useInView";

// Exact from source: Label (data-v-3a1b0992) — per-letter scramble animation
const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const CHAR_DELAY = 70;
const SCRAMBLE_DURATION = 50;
const ANIM_DURATION = 2000;

interface IntroLabelProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function IntroLabel({ text, className, delay = 0 }: IntroLabelProps) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const original = text.split("");
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const result = original.map((char, i) => {
        if (char === " ") return "\u00A0";
        const charStart = i * CHAR_DELAY;
        const charEnd = charStart + SCRAMBLE_DURATION;
        if (elapsed >= charEnd) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });
      setDisplayText(result.join(""));
      if (elapsed < ANIM_DURATION) {
        requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
      }
    };

    if (delay > 0) {
      setTimeout(() => requestAnimationFrame(tick), delay);
    } else {
      requestAnimationFrame(tick);
    }
  }, [text, delay]);

  useEffect(() => {
    if (inView) scramble();
  }, [inView, scramble]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${styles.introLabel} ${className || ""}`}>
      <h2 className={styles.label}>
        {displayText.split("").map((char, i) => (
          <span key={i}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </h2>
    </div>
  );
}
