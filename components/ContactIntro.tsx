"use client";

import { useContactPanel } from "./ContactPanelContext";
import styles from "./ContactIntro.module.css";

export default function ContactIntro() {
  const { open } = useContactPanel();

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.copy}>
        Please don&apos;t hesitate to reach out. Your thoughts and inquiries
        are always important to us.{" "}
        <button className={styles.highlight} onClick={open}>
          Get in touch
        </button>
      </p>
    </section>
  );
}
