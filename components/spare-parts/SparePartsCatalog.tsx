"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { categories } from "./sparePartsData";
import styles from "./SparePartsCatalog.module.css";

export default function SparePartsCatalog() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Browse categories</span>
          <h2 className={styles.heading}>Highest quality for the best price</h2>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.grid}
        >
          {categories.map((cat, i) => {
            const count =
              cat.parts.length > 0
                ? `${cat.parts.length} parts`
                : cat.specifications
                  ? `${cat.specifications.length} spec tables`
                  : "";
            return (
              <Link
                key={cat.id}
                href={`/spare-parts/${cat.slug}`}
                className={`${styles.card} ${inView ? styles.cardReveal : ""}`}
                style={{
                  transitionDelay: inView ? `${i * 0.1}s` : undefined,
                }}
              >
                <div className={styles.cardImageWrapper}>
                  <div className={styles.cardImageInner}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.cardImage} alt={cat.name} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{cat.shortName}</span>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                  {count && (
                    <span className={styles.cardCount}>{count}</span>
                  )}
                </div>
                <div className={styles.cardArrow}>
                  <span>View parts</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
