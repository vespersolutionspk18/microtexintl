"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "./MachinesHero.module.css";

export default function MachinesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onRaf = useCallback((progress: number) => {
    if (!entered.current && titleRef.current) {
      entered.current = true;
      const lines = titleRef.current.querySelectorAll("span");
      gsap.fromTo(
        lines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out" }
      );
    }
    const bg = bgRef.current;
    if (!bg) return;
    const opacity = Math.min(1, Math.max(0, (progress - 0.5) * 2));
    bg.style.opacity = `${Math.round(opacity * 100) / 100}`;
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className="grid-container">
        <div className={styles.content}>
          <span className={styles.label}>Machines</span>
          <h1 ref={titleRef} className={styles.title}>
            <span>Precision-built</span>
            <span>packaging machinery.</span>
          </h1>
          <p className={styles.copy}>
            Custom-designed, manufactured and assembled to deliver unmatched
            performance, reliability and ROI across your production line.
          </p>
        </div>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>04</span>
          <span className={styles.countLabel}>Machine models</span>
        </div>
      </div>
      <div ref={bgRef} className={styles.bg} />
    </section>
  );
}
