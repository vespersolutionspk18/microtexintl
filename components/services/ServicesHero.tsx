"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
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
          <span className={styles.label}>Services</span>
          <h1 ref={titleRef} className={styles.title}>
            <span>Expert support for</span>
            <span>your production line.</span>
          </h1>
          <p className={styles.copy}>
            Upgradation, format conversion, rebuilding and preventative
            maintenance — delivered by experienced field service engineers.
          </p>
        </div>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>03</span>
          <span className={styles.countLabel}>Service areas</span>
        </div>
      </div>
      <div ref={bgRef} className={styles.bg} />
    </section>
  );
}
