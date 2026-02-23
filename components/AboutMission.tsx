"use client";

import { useRef, useEffect } from "react";
import IntroLabel from "@/components/IntroLabel";
import CopyReveal from "@/components/CopyReveal";
import styles from "./AboutMission.module.css";

export default function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let lastScaleX = -1;
    let lastBorderRadius = -1;
    let raf = 0;

    const animate = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = rect.height;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionH - vh)));

      const maxScale = 1 - 32 / 1440;
      const borderRadiusMax = (window.innerWidth / 1440) * 24;

      let scaleX = 1;
      let borderRadius = 0;

      if (progress > 0.1 && progress <= 0.45) {
        const t = (progress - 0.1) / 0.35;
        scaleX = 1 - (1 - maxScale) * t;
        borderRadius = borderRadiusMax * t;
      } else if (progress > 0.45 && progress < 0.55) {
        scaleX = maxScale;
        borderRadius = borderRadiusMax;
      } else if (progress >= 0.55 && progress < 0.9) {
        const t = (progress - 0.55) / 0.35;
        scaleX = maxScale + (1 - maxScale) * t;
        borderRadius = borderRadiusMax * (1 - t);
      }

      if (Math.abs(scaleX - lastScaleX) > 0.0001) {
        bg.style.transform = `scaleX(${scaleX})`;
        lastScaleX = scaleX;
      }
      if (Math.abs(borderRadius - lastBorderRadius) > 0.01) {
        bg.style.borderRadius = `${borderRadius}px`;
        lastBorderRadius = borderRadius;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro}>
      <div className={styles.inner}>
        <div className="grid-container">
          <div className={styles.content}>
            <IntroLabel text="Our Mission" className={styles.introLabel} />
            <CopyReveal className={styles.copy} threshold={0.2}>
              <span>We build the machines </span>
              that keep production lines running. Our mission is to deliver superior turnkey packaging solutions — from custom design and manufacturing to installation and ongoing support — for the world&apos;s most demanding industries.
            </CopyReveal>
          </div>
        </div>
        <div ref={bgRef} className={styles.bg} />
      </div>
    </section>
  );
}
