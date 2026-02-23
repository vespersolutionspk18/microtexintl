import styles from "./TeamPerks.module.css";

export default function TeamPerks() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <h2 className={styles.title}>Working at ON.energy</h2>
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://a.storyblok.com/f/288034353253643/1993x2500/6bf76cba5f/working-at-on-energy.jpg/m/534x670/filters:format(jpeg):quality(70)"
              alt="Working at ON Energy"
            />
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.intro}>
            We move fast, debate hard, and learn from each other. If you want
            predictable, this isn&apos;t it. If you want impact, welcome.
          </p>
          <div className={styles.copy}>
            <h3><span>Do work that matters</span></h3>
            <p>
              <span>
                At ON, we&apos;re focused on building the backbone of the new
                energy landscape with grid-safe, reliable systems that support
                the end user and the grid. The next standard for resilience will
                come from those who connect to the grid fast and connect
                responsibly. Our teams build and run systems that keep hospitals
                online, data flowing, and cities powered.
              </span>
            </p>
            <h3><span>Operate in autonomous teams</span></h3>
            <p>
              <span>
                We trust our team. Autonomy isn&apos;t freedom from
                responsibility; it&apos;s the ability to act fast and get it
                right. We hire for judgment, expect ownership, and measure
                success in resiliency and uptime.
              </span>
            </p>
            <h3><span>Grow professionally</span></h3>
            <p>
              Curiosity fuels progress. You&apos;ll be surrounded by a community
              that helps one another and works in cross-functional teams,
              composed of the brightest minds in technology, product engineering,
              finance, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
