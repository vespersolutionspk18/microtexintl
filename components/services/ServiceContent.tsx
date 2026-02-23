"use client";

import { useInView } from "@/hooks/useInView";
import type { Service } from "./serviceData";
import styles from "./ServiceContent.module.css";

export default function ServiceContent({ service }: { service: Service }) {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.intro}>
          <p className={styles.copy}>{service.description}</p>
          {service.equipmentList && (
            <div className={styles.equipmentWrapper}>
              <span className={styles.equipmentLabel}>Compatible equipment</span>
              <ul className={styles.equipmentList}>
                {service.equipmentList.map((item) => (
                  <li key={item} className={styles.equipmentItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.head}>
          <span className={styles.label}>Expertise</span>
          <h2 className={styles.title}>
            <span>What we</span>
            <span>deliver.</span>
          </h2>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.features}
        >
          {service.sections.map((section, i) => (
            <div
              key={section.title}
              className={`${styles.featureCard} ${inView ? styles.featureReveal : ""}`}
              style={{
                transitionDelay: inView ? `${i * 0.08}s` : undefined,
              }}
            >
              <div className={styles.featureIndex}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={styles.featureTitle}>{section.title}</h3>
              <p className={styles.featureDescription}>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
