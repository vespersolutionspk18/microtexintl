import Link from "next/link";
import styles from "./ExpertisesOverview.module.css";

const services = [
  {
    href: "/services/upgradation",
    image:
      "https://a.storyblok.com/f/288034353253643/4320x2430/a4add9cd4b/ai-workloads-hero.jpg/m/500x282/filters:format(jpeg):quality(70)",
    name: "Upgradation & Installation",
    copy: "Expert equipment modernization and professional installation services",
  },
  {
    href: "/services/conversion-kits",
    image:
      "https://a.storyblok.com/f/288034353253643/4320x2430/44c6e495c8/power-quality-hero.jpg/m/500x282/filters:format(jpeg):quality(70)",
    name: "Format & Conversion Kits",
    copy: "Adapt your existing machinery for new production requirements",
  },
  {
    href: "/services/rebuilding",
    image:
      "https://a.storyblok.com/f/288034353253643/4320x2430/1c8efb7dd7/grid-volatility-hero.jpg/m/500x282/filters:format(jpeg):quality(70)",
    name: "Support & Rebuilding",
    copy: "Bring your existing machines back to peak performance",
  },
];

export default function ExpertisesOverview() {
  return (
    <section className={styles.expertisesOverview}>
      <div className="grid-container">
        <div className={styles.head}>
          <h2 className={styles.label}>Our services</h2>
          <h3 className={styles.title}>
            <span>Complex Challenges. </span>
            <span>Reliable Solutions.</span>
          </h3>
        </div>

        <div className={styles.copyWrapper}>
          <p className={styles.copy}>
            We engineer custom solutions designed for the most demanding
            packaging environments. Our expertise spans three critical service
            areas.
          </p>
        </div>

        <div className={styles.cards}>
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={styles.link}
            >
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.name} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.name}>{service.name}</div>
                <div className={styles.cardCopy}>{service.copy}</div>
              </div>
              <div className={styles.arrowButton} aria-hidden="true">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.95587" cy="9.96109" r="1" transform="rotate(45 9.95587 9.96109)" fill="currentColor" />
                  <circle cx="14.0262" cy="14.2111" r="1" transform="rotate(45 14.0262 14.2111)" fill="currentColor" />
                  <circle cx="9.95587" cy="18.4494" r="1" transform="rotate(45 9.95587 18.4494)" fill="currentColor" />
                  <circle cx="14.0252" cy="9.96109" r="1" transform="rotate(45 14.0252 9.96109)" fill="currentColor" />
                  <circle cx="18.4412" cy="9.96109" r="1" transform="rotate(45 18.4412 9.96109)" fill="currentColor" />
                  <circle cx="9.90509" cy="9.90219" r="1" transform="rotate(-135 9.90509 9.90219)" fill="currentColor" />
                  <circle cx="14.0262" cy="5.67172" r="1" transform="rotate(-135 14.0262 5.67172)" fill="currentColor" />
                  <circle cx="9.90509" cy="1.41391" r="1" transform="rotate(-135 9.90509 1.41391)" fill="currentColor" />
                  <circle cx="5.66192" cy="9.90219" r="1" transform="rotate(-135 5.66192 9.90219)" fill="currentColor" />
                  <circle cx="1.41974" cy="9.90219" r="1" transform="rotate(-135 1.41974 9.90219)" fill="currentColor" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
