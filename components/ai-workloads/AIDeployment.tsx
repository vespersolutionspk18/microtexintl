"use client";
import { deploymentCards } from "./aiWorkloadsData";
import BlurReveal from "@/components/BlurReveal";
import { useInView } from "@/hooks/useInView";
import styles from "./AIDeployment.module.css";

export default function AIDeployment() {
  const [cardsRef, cardsInView] = useInView({ threshold: 0 });

  return (
    <section className={styles.section}>
      <BlurReveal
        tag="h2"
        lines={["Deployment"]}
        className={styles.title}
      />
      <div className={styles.cards}>
        <div className="grid-container">
          <div
            ref={cardsRef as React.RefObject<HTMLDivElement>}
            className={styles.cardsInner}
          >
            {deploymentCards.map((card, i) => (
              <div
                key={i}
                className={`${styles.card} ${cardsInView ? styles.cardReveal : ""}`}
                style={{ transitionDelay: cardsInView ? `${i * 0.15}s` : undefined }}
              >
                <div className={styles.cardImageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.alt} loading="lazy" />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{card.stat}</div>
                  <p className={styles.cardCopy}>{card.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
