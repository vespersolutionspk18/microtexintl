"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import { useContactPanel } from "@/components/ContactPanelContext";
import styles from "./ServiceCTA.module.css";

export default function ServiceCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const entered = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { open } = useContactPanel();

  const onRaf = useCallback(() => {
    if (!entered.current && headingRef.current) {
      entered.current = true;
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
      );
    }
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="grid-container">
        <div className={styles.content}>
          <span className={styles.label}>Get started</span>
          <h2 ref={headingRef} className={styles.title}>
            <span>Ready to optimise</span>
            <span>your production?</span>
          </h2>
          <p className={styles.copy}>
            Our team of experienced engineers is ready to discuss your
            requirements and deliver a tailored solution.
          </p>
          <button className={styles.button} onClick={open}>
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
