import Link from "next/link";
import IntroLabel from "@/components/IntroLabel";
import BlurReveal from "@/components/BlurReveal";
import styles from "./AboutGlobalReach.module.css";

export default function AboutGlobalReach() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.content}>
          <IntroLabel text="Global Reach" />
          <BlurReveal
            lines={["Serving Manufacturers", "Around the World"]}
            tag="h3"
            className={styles.title}
          />
          <p className={styles.bodyCopy}>
            From the Middle East to Africa and Asia, Microtex delivers packaging
            solutions wherever production demands excellence.
          </p>

          <ul className={styles.locations}>
            <li className={styles.locationItem}>
              <span className={styles.locationName}>Middle East</span>
              <span className={styles.locationDesc}>
                Headquarters and manufacturing in SAIF Zone, Sharjah, UAE
              </span>
            </li>
            <li className={styles.locationItem}>
              <span className={styles.locationName}>Africa</span>
              <span className={styles.locationDesc}>
                Active clients and machine installations across emerging markets
              </span>
            </li>
            <li className={styles.locationItem}>
              <span className={styles.locationName}>Asia</span>
              <span className={styles.locationDesc}>
                Distribution partnerships and spare parts supply across the
                continent
              </span>
            </li>
          </ul>

          <div className={styles.buttonWrapper}>
            <Link href="/contact" className={styles.baseButton}>
              <span className={styles.buttonBg} />
              <span className={styles.fillEffect} />
              <span className={styles.buttonLabel}>Get in touch</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bgImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1920&q=80&auto=format&fit=crop"
          alt="Microtex global operations"
        />
      </div>
    </section>
  );
}
