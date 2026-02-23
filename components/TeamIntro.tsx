import styles from "./TeamIntro.module.css";

export default function TeamIntro() {
  return (
    <section className={styles.teamIntro}>
      <p className={styles.copy}>
        <span>We&apos;re builders</span>&mdash;shaping what comes next in energy
        and AI infrastructure. Ambition and innovation are at our core.
        ON&apos;s team spans continents and disciplines, united by a shared
        passion for solving the toughest power problems in the world so that we
        can make energy resilient, clean, abundant and affordable.
      </p>
    </section>
  );
}
