import type { Service } from "./serviceData";
import styles from "./ServiceDescription.module.css";

export default function ServiceDescription({ service }: { service: Service }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className="grid-container">
          <div className={styles.content}>
            <p className={styles.copy}>{service.longDescription}</p>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Service</span>
              <span className={styles.statValue}>{service.category}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Coverage</span>
              <span className={styles.statValue}>Worldwide</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Support</span>
              <span className={styles.statValue}>24/7</span>
            </div>
            {service.equipmentList && (
              <div className={styles.stat}>
                <span className={styles.statLabel}>Compatible equipment</span>
                <div className={styles.tags}>
                  {service.equipmentList.map((item) => (
                    <span key={item} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bg} />
    </section>
  );
}
