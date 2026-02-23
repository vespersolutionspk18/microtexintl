import type { Machine } from "./machineData";
import styles from "./MachineDescription.module.css";

export default function MachineDescription({ machine }: { machine: Machine }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className="grid-container">
          <div className={styles.content}>
            <p className={styles.copy}>{machine.description}</p>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Category</span>
              <span className={styles.statValue}>{machine.category}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Output</span>
              <span className={styles.statValue}>{machine.output}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Model</span>
              <span className={styles.statValue}>{machine.model}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bg} />
    </section>
  );
}
