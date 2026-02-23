import styles from "./NewsHero.module.css";

export default function NewsHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>News</h1>
      </div>
    </div>
  );
}
