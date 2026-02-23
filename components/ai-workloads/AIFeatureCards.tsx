"use client";
import { featureCards } from "./aiWorkloadsData";
import AIFeatureCard from "./AIFeatureCard";
import { useInView } from "@/hooks/useInView";
import styles from "./AIFeatureCards.module.css";

// Exact from source: SlideUpReveal with stagger for feature cards
export default function AIFeatureCards() {
  const [ref, inView] = useInView({ threshold: 0 });

  return (
    <section className={styles.section}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`grid-container ${styles.container}`}
      >
        {featureCards.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${inView ? styles.cardReveal : ""}`}
            style={{ transitionDelay: inView ? `${i * 0.15}s` : undefined }}
          >
            <AIFeatureCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
}
