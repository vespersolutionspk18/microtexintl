import Link from "next/link";
import type { Machine } from "./machines/machineData";
import styles from "./MachineCard.module.css";

export default function MachineCard({ machine }: { machine: Machine }) {
  const displaySpecs = machine.specs.slice(0, 5);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={machine.cardImage} alt={machine.name} />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{machine.category}</span>
        <h3 className={styles.name}>{machine.name}</h3>
        <div className={styles.specs}>
          {displaySpecs.map((spec) => (
            <div key={spec.label} className={styles.specRow}>
              <span className={styles.specLabel}>{spec.label}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </div>
        <Link href={`/machines/${machine.slug}`} className={styles.button}>
          <div className={styles.buttonFill} />
          <span className={styles.buttonLabel}>View machine</span>
        </Link>
      </div>
    </div>
  );
}
