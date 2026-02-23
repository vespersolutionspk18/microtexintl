"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import type { Service } from "./serviceData";
import styles from "./ServiceImage.module.css";

export default function ServiceImage({ service }: { service: Service }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);

  const onRaf = useCallback((progress: number) => {
    if (!entered.current && imageRef.current) {
      entered.current = true;
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }
      );
    }
    const img = imageRef.current;
    if (img) {
      const y = Math.round(progress * 30);
      img.style.transform = `translateY(${y}px)`;
    }
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={imageRef} className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={service.image} alt={service.name} />
      </div>
    </section>
  );
}
