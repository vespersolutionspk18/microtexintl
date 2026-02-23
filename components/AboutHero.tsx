import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <header className={styles.aboutHero}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>About Microtex International</h1>
      </div>
      <div>
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80&auto=format&fit=crop"
            alt="Microtex International facility"
          />
        </div>
      </div>
    </header>
  );
}
