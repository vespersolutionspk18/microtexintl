import styles from "./TeamFullBleedImage.module.css";

export default function TeamFullBleedImage() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://a.storyblok.com/f/288034353253643/4033x2400/621f2d1540/team-image.jpg/m/2016x1200/filters:format(jpeg):quality(70)"
          alt="ON Energy team"
        />
      </div>
    </section>
  );
}
