"use client";

import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className={styles.inner}>
        <div className="grid-container">
          <div className={styles.content}>
            <p className={styles.copy}>
              Microtex International supplies superior turnkey solutions through
              custom design, manufacturing, installation and support of
              plant-related systems. From high-speed packaging lines to precision
              wrappers and case packers, Microtex delivers custom solutions
              backed by decades of engineering expertise, setting new industry
              benchmarks for reliability and performance.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bg} />
    </section>
  );
}
