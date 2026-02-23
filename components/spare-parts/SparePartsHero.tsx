"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { categories, sparePartsIntro } from "./sparePartsData";
import styles from "./SparePartsHero.module.css";

export default function SparePartsHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const spans = titleRef.current.querySelectorAll("span");
    gsap.fromTo(
      spans,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.12 }
    );
  }, []);

  return (
    <section className={styles.hero}>
      <div className="grid-container">
        <div className={styles.content}>
          <span className={styles.label}>Parts catalogue</span>
          <h1 ref={titleRef} className={styles.title}>
            <span>Spare Parts</span>
          </h1>
          <p className={styles.copy}>{sparePartsIntro}</p>
        </div>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>
            {String(categories.length).padStart(2, "0")}
          </span>
          <span className={styles.countLabel}>Categories</span>
        </div>
      </div>
    </section>
  );
}
