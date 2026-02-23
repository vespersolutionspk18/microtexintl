import styles from "./FeatureCards.module.css";

export default function FeatureCards() {
  return (
    <section className={styles.homeFeatureCards}>
      <div className="grid-container">
        <div className={styles.cards}>
          {/* Card 1: 20+ Years */}
          <div className={styles.featureCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>20</p>
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
                <span>20+ Years of</span>
                <span>Engineering Excellence</span>
              </h3>
              <p className={styles.cardCopy}>
                Decades of experience designing and manufacturing packaging
                machinery for global markets.
              </p>
            </div>
          </div>

          {/* Card 2: 99.5% */}
          <div className={styles.featureCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>
                99<span>.5 %</span>
              </p>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>99.5% Machine Uptime.</span>
              </h3>
              <p className={styles.cardCopy}>
                Industry-leading reliability for continuous production
                environments.
              </p>
            </div>
          </div>

          {/* Card 3: 50+ Countries */}
          <div className={styles.featureCard}>
            <div className={styles.numberWrapper}>
              <p className={styles.number}>50</p>
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
                <span>50+ Countries</span>
                <span>Served</span>
              </h3>
              <p className={styles.cardCopy}>
                Global reach with local expertise, delivering solutions
                worldwide.
              </p>
            </div>
          </div>

          {/* Card 4: 100+ Clients */}
          <div className={styles.featureCard}>
            <svg
              className={styles.mapIcon}
              viewBox="0 0 200 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M90 10 L110 15 L120 30 L130 25 L140 35 L145 55 L155 60 L160 50 L170 55 L165 70 L155 80 L150 95 L140 100 L135 115 L125 120 L130 135 L120 140 L115 155 L105 160 L100 175 L90 180 L85 195 L75 200 L70 215 L60 225 L55 240 L45 250 L40 265 L45 280 L55 290 L60 305 L70 315 L80 325 L85 340 L90 355 L85 370 L75 380 L65 385 L55 380 L50 365 L45 350 L40 335 L35 320 L30 305 L25 290 L20 275 L25 260 L30 245 L35 230 L40 215 L45 200 L50 185 L55 170 L60 155 L55 140 L50 125 L55 110 L60 95 L65 80 L70 65 L75 50 L80 35 L85 20 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <span>100+ Satisfied Clients</span>
                <span>Worldwide.</span>
              </h3>
              <p className={styles.cardCopy}>
                Trusted by leading manufacturers across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
