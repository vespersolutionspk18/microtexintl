"use client";
import { testimonials } from "./aiWorkloadsData";
import { useInView } from "@/hooks/useInView";
import styles from "./AITestimonials.module.css";

// Exact from source: SlideUpReveal for testimonial items
export default function AITestimonials() {
  const [ref, inView] = useInView({ threshold: 0 });

  return (
    <section className={styles.section}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`grid-container ${styles.container}`}
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${inView ? styles.itemReveal : ""}`}
            style={{ transitionDelay: inView ? `${i * 0.15}s` : undefined }}
          >
            <div className={styles.logoWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.logo} alt={item.logoAlt} loading="lazy" />
            </div>
            <p className={styles.copy}>
              {item.quote} – <span>{item.author}</span>{item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
