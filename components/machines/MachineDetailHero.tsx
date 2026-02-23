"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import type { Machine } from "./machineData";
import styles from "./MachineDetailHero.module.css";

export default function MachineDetailHero({ machine }: { machine: Machine }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onRaf = useCallback((progress: number) => {
    if (!entered.current && titleRef.current) {
      entered.current = true;
      const el = titleRef.current;
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "expo.out" }
      );
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, ease: "expo.out", delay: 0.3 }
        );
      }
    }
    const img = imageRef.current;
    if (img) {
      const y = Math.round(progress * 40);
      img.style.transform = `translateY(${y}px)`;
    }
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className="grid-container">
        <div className={styles.content}>
          <span className={styles.label}>{machine.model}</span>
          <h1 ref={titleRef} className={styles.title}>
            {machine.name}
          </h1>
          <p className={styles.tagline}>{machine.tagline}</p>
          <div className={styles.highlights}>
            {machine.highlights.map((h) => (
              <div key={h.label} className={styles.highlight}>
                <span className={styles.highlightValue}>{h.value}</span>
                <span className={styles.highlightLabel}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div ref={imageRef} className={styles.machineImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={machine.productImage} alt={machine.name} />
        </div>
      </div>
    </section>
  );
}
