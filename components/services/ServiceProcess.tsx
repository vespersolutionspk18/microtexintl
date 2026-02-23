"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import type { Service } from "./serviceData";
import styles from "./ServiceProcess.module.css";

export default function ServiceProcess({ service }: { service: Service }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);

  const onRaf = useCallback(() => {
    if (!entered.current && stepsRef.current) {
      entered.current = true;
      const steps = stepsRef.current.querySelectorAll(`.${styles.step}`);
      gsap.fromTo(
        steps,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "expo.out" }
      );
    }
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Methodology</span>
          <h2 className={styles.title}>
            <span>Our proven</span>
            <span>process.</span>
          </h2>
          <p className={styles.subtitle}>
            We provide best possible solutions to give you a competitive edge
            — following a structured methodology refined across hundreds of
            engagements.
          </p>
        </div>

        <div ref={stepsRef} className={styles.steps}>
          {service.process.map((step, i) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepNumber}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
