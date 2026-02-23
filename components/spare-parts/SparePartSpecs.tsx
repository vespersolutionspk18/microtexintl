"use client";

import { useInView } from "@/hooks/useInView";
import type { SparePartCategory } from "./sparePartsData";
import styles from "./SparePartSpecs.module.css";

function SpecBlock({
  spec,
  index,
}: {
  spec: NonNullable<SparePartCategory["specifications"]>[number];
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className={styles.specBlock}>
      <div className={styles.specHead}>
        <span className={styles.specLabel}>
          Specification {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className={styles.specTitle}>{spec.title}</h2>
        <p className={styles.specDescription}>{spec.description}</p>
        {spec.features && (
          <div className={styles.features}>
            {spec.features.map((f) => (
              <span key={f} className={styles.featureTag}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={styles.tableWrapper}
      >
        <table
          className={`${styles.table} ${inView ? styles.tableReveal : ""}`}
        >
          <thead>
            <tr>
              {spec.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  transitionDelay: inView ? `${ri * 0.06}s` : undefined,
                }}
              >
                {row.cells.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SparePartSpecs({
  category,
}: {
  category: SparePartCategory;
}) {
  if (!category.specifications || category.specifications.length === 0)
    return null;

  return (
    <section className={styles.section}>
      <div className="grid-container">
        {category.specifications.map((spec, i) => (
          <SpecBlock key={spec.title} spec={spec} index={i} />
        ))}
      </div>
    </section>
  );
}
