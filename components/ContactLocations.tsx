import styles from "./ContactLocations.module.css";

export default function ContactLocations() {
  return (
    <section className={styles.section}>
      {/* UAE */}
      <div className={styles.location}>
        <div className={styles.locationGrid}>
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://a.storyblok.com/f/288034353253643/1066x1338/eeab15c26b/location-usa.jpg/m/500x628/filters:format(jpeg):quality(70)"
              alt="UAE headquarters"
            />
          </div>

          <h2 className={styles.country}>United Arab Emirates</h2>

          <div className={styles.offices}>
            <div className={styles.office}>
              <div className={styles.city}>Sharjah</div>
              <div className={styles.address}>
                <span>Headquarters &amp; Manufacturing</span>
                <span>D2 06, SAIF Zone</span>
                <span>Sharjah, UAE — PO BOX 123447</span>
              </div>
              <a href="tel:+971655820830" className={styles.phone}>
                +971 655 82 083
              </a>
            </div>

            <div className={styles.office}>
              <div className={styles.city}>WhatsApp</div>
              <div className={styles.address}>
                <span>Direct line for inquiries</span>
              </div>
              <a href="tel:+971521361040" className={styles.phone}>
                +971 521 361 040
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
