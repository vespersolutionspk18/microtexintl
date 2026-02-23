import styles from "./TeamHero.module.css";

export default function TeamHero() {
  return (
    <header className={styles.teamHero}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>The Team</h1>
      </div>
      <div>
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://a.storyblok.com/f/288034353253643/2500x1500/085aaa7192/team-hero.jpg/m/1668x1000/filters:format(jpeg):quality(70)"
            alt="ON Energy team"
          />
        </div>
      </div>
    </header>
  );
}
