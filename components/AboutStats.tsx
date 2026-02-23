import styles from "./AboutStats.module.css";

export default function AboutStats() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.cards}>
          {/* Card 1: Machines Delivered */}
          <div className={styles.statCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>500</p>
              <svg
                className={styles.numberPlus}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>Machines</span>
                <span>Delivered</span>
              </h3>
              <p className={styles.cardCopy}>
                Wrappers, case packers, and complete packaging lines shipped
                worldwide.
              </p>
            </div>
          </div>

          {/* Card 2: Spare Part SKUs */}
          <div className={styles.statCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>
                10k
              </p>
              <svg
                className={styles.numberPlus}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>Spare Part</span>
                <span>SKUs in Stock</span>
              </h3>
              <p className={styles.cardCopy}>
                Compatible parts for Maker, Hauni, Molins, GD, and Sasib
                systems.
              </p>
            </div>
          </div>

          {/* Card 3: Countries Served */}
          <div className={styles.statCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>
                40
              </p>
              <svg
                className={styles.numberPlus}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>Countries</span>
                <span>Served</span>
              </h3>
              <p className={styles.cardCopy}>
                Clients across the Middle East, Africa, Asia, and beyond trust
                our solutions.
              </p>
            </div>
          </div>

          {/* Card 4: One-Stop-Shop */}
          <div className={styles.statCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>1</p>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>One-Stop-Shop</span>
                <span>for Packaging</span>
              </h3>
              <p className={styles.cardCopy}>
                Machines, spare parts, installation, upgradation, and ongoing
                support — all under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
