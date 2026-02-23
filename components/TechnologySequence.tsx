"use client";

import Link from "next/link";
import MachineCard from "./MachineCard";
import { machines } from "./machineData";
import { useInView } from "@/hooks/useInView";
import styles from "./TechnologySequence.module.css";

export default function TechnologySequence() {
  const [cardsRef, cardsInView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            <span>Custom machinery</span>
            <span>built to perform</span>
          </h2>
          <Link href="/machines" className={styles.baseButton}>
            <span className={styles.buttonBg} />
            <span className={styles.fillEffect} />
            <span className={styles.buttonLabel}>Our machines</span>
          </Link>
          <p className={styles.copy}>
            <span className={styles.highlight}>Our engineering</span> stack
            unites precision mechanics, advanced automation and proprietary
            control systems. Together, they power every custom packaging
            solution we deliver.
          </p>
        </div>

        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className={styles.cardsWrapper}
        >
          {machines.map((machine, i) => (
            <div
              key={machine.id}
              className={`${styles.cardSlot} ${cardsInView ? styles.cardReveal : ""}`}
              style={{
                transitionDelay: cardsInView ? `${i * 0.12}s` : undefined,
              }}
            >
              <MachineCard machine={machine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
