"use client";

import { useInView } from "@/hooks/useInView";
import type { SparePartCategory } from "./sparePartsData";
import styles from "./SparePartProducts.module.css";

export default function SparePartProducts({
  category,
}: {
  category: SparePartCategory;
}) {
  const [ref, inView] = useInView({ threshold: 0.02 });

  if (category.parts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <span className={styles.label}>Product catalogue</span>
          <h2 className={styles.heading}>Available parts</h2>
          <p className={styles.count}>
            {category.parts.length} parts available
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.grid}
        >
          {category.parts.map((part, i) => (
            <div
              key={part.name}
              className={`${styles.product} ${inView ? styles.productReveal : ""}`}
              style={{
                transitionDelay: inView
                  ? `${Math.min(i * 0.04, 1)}s`
                  : undefined,
              }}
            >
              <div className={styles.productImageWrapper}>
                <div className={styles.productImageInner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={part.image} alt={part.name} />
                </div>
              </div>
              <span className={styles.productName}>{part.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
