"use client";

import { useInView } from "@/hooks/useInView";
import type { Machine } from "./machineData";
import styles from "./MachineFeatures.module.css";

export default function MachineFeatures({ machine }: { machine: Machine }) {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Capabilities</span>
          <h2 className={styles.title}>
            <span>Key features</span>
          </h2>
          <div className={styles.applications}>
            {machine.applications.map((app) => (
              <span key={app} className={styles.tag}>
                {app}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.features}
        >
          {machine.features.map((feature, i) => (
            <div
              key={feature.title}
              className={`${styles.featureCard} ${inView ? styles.featureReveal : ""}`}
              style={{
                transitionDelay: inView ? `${i * 0.08}s` : undefined,
              }}
            >
              <div className={styles.featureIndex}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
