"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import type { Machine } from "./machineData";
import styles from "./MachineNextMachine.module.css";

export default function MachineNextMachine({
  nextMachine,
}: {
  nextMachine: Machine;
}) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Next machine</span>
        </div>
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={`/machines/${nextMachine.slug}`}
          className={`${styles.card} ${inView ? styles.revealed : ""}`}
        >
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextMachine.cardImage} alt={nextMachine.name} />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardModel}>{nextMachine.model}</span>
            <h3 className={styles.cardName}>{nextMachine.name}</h3>
            <p className={styles.cardTagline}>{nextMachine.tagline}</p>
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
        </Link>
      </div>
    </section>
  );
}
