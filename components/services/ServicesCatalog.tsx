"use client";

import Link from "next/link";
import { services } from "./serviceData";
import { useInView } from "@/hooks/useInView";
import styles from "./ServicesCatalog.module.css";

export default function ServicesCatalog() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.catalog}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="grid-container"
      >
        <div className={styles.head}>
          <span className={styles.label}>What we do</span>
          <h2 className={styles.title}>
            <span>Our service</span>
            <span>offerings.</span>
          </h2>
        </div>

        <div className={styles.cards}>
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className={`${styles.card} ${inView ? styles.cardReveal : ""}`}
              style={{
                transitionDelay: inView ? `${i * 0.12}s` : undefined,
              }}
            >
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.name} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.cardCategory}>Service</span>
                </div>
                <h3 className={styles.cardName}>{service.name}</h3>
                <p className={styles.cardTagline}>{service.tagline}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardLearn}>Learn more</span>
                  <div className={styles.arrowButton} aria-hidden="true">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10h12m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
