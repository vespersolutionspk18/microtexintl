"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Machine } from "./machineData";
import styles from "./MachineShowcase.module.css";

export default function MachineShowcase({ machine }: { machine: Machine }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className={styles.showcase}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`${styles.imageContainer} ${inView ? styles.revealed : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={machine.showcaseImage}
          alt={`${machine.name} showcase`}
          className={styles.image}
        />
      </div>
    </section>
  );
}
