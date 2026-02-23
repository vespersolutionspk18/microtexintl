import styles from "./AboutStory.module.css";

export default function AboutStory() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <h2 className={styles.title}>Our Story</h2>
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80&auto=format&fit=crop"
              alt="Microtex International manufacturing"
            />
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.intro}>
            From a single workshop to a global supplier, Microtex International
            was built to solve the hardest problems in packaging machinery.
          </p>
          <div className={styles.copy}>
            <h3><span>Engineered for production</span></h3>
            <p>
              <span>
                Microtex International was founded on the belief that packaging
                machinery should be both innovative and cost-effective. We design
                and manufacture wrappers, over-wrappers, case packers, and
                conveyor systems built for industrial-level performance and
                durability.
              </span>
            </p>
            <h3><span>Quality without compromise</span></h3>
            <p>
              <span>
                Our team brings decades of experience across secondary processing
                equipment for the tobacco and confectionery industries. Every
                machine — from the HLP250 to the MTI-W200 — is designed for
                harsh, demanding environments.
              </span>
            </p>
            <h3><span>A true one-stop-shop</span></h3>
            <p>
              Today, Microtex International serves clients across 40+ countries
              with machinery, spare parts, installation, upgradation, and
              rebuilding services — delivering the highest quality for the best
              price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
