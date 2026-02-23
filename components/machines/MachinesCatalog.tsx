"use client";

import Link from "next/link";
import { machines } from "./machineData";
import { useInView } from "@/hooks/useInView";
import styles from "./MachinesCatalog.module.css";

export default function MachinesCatalog() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.catalog}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="grid-container"
      >
        <div className={styles.head}>
          <span className={styles.label}>Catalog</span>
          <h2 className={styles.title}>
            <span>Explore our</span>
            <span>machine range.</span>
          </h2>
        </div>

        <div className={styles.cards}>
          {machines.map((machine, i) => (
            <Link
              key={machine.id}
              href={`/machines/${machine.slug}`}
              className={`${styles.card} ${inView ? styles.cardReveal : ""}`}
              style={{
                transitionDelay: inView ? `${i * 0.12}s` : undefined,
              }}
            >
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={machine.cardImage} alt={machine.name} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardModel}>{machine.model}</span>
                  <span className={styles.cardCategory}>{machine.category}</span>
                </div>
                <h3 className={styles.cardName}>{machine.name}</h3>
                <p className={styles.cardTagline}>{machine.tagline}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardOutput}>{machine.output}</span>
                  <div className={styles.arrowButton} aria-hidden="true">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10h12m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
