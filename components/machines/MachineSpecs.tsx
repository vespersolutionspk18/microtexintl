"use client";

import { useInView } from "@/hooks/useInView";
import type { Machine } from "./machineData";
import styles from "./MachineSpecs.module.css";

export default function MachineSpecs({ machine }: { machine: Machine }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Technical data</span>
          <h2 className={styles.title}>
            <span>Specifications</span>
          </h2>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.specsGrid}
        >
          {machine.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`${styles.specRow} ${inView ? styles.specReveal : ""}`}
              style={{
                transitionDelay: inView ? `${i * 0.06}s` : undefined,
              }}
            >
              <span className={styles.specLabel}>{spec.label}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
