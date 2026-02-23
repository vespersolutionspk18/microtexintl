"use client";
import IntroLabel from "@/components/IntroLabel";
import BlurReveal from "@/components/BlurReveal";
import CopyReveal from "@/components/CopyReveal";
import styles from "./AIExpertiseIntro.module.css";

export default function AIExpertiseIntro() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.content}>
          <IntroLabel text="Our Expertise" className={styles.introLabel} />
          <BlurReveal
            tag="h3"
            lines={["Actively Deploying at Gigawatt Scale"]}
            className={styles.subtitle}
          />
          <CopyReveal className={styles.copy} threshold={0.2}>
            Tested, certified, and deployed across leading hyperscale data centers, AI UPS™ delivers verified reliability and scalability at multi-gigawatt capacity.
          </CopyReveal>
        </div>
      </div>
    </section>
  );
}
