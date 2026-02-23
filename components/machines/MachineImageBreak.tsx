"use client";

import { useRef, useCallback } from "react";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "./MachineImageBreak.module.css";

interface MachineImageBreakProps {
  src: string;
  alt: string;
  theme?: "dark" | "light";
  fullWidth?: boolean;
}

export default function MachineImageBreak({
  src,
  alt,
  theme = "dark",
  fullWidth = false,
}: MachineImageBreakProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onRaf = useCallback((progress: number) => {
    const img = imgRef.current;
    if (!img) return;
    const y = (progress - 0.5) * 15;
    img.style.transform = `translateY(${y}%)`;
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {fullWidth ? (
        <div className={styles.wrapperFull}>
          <div className={styles.imageOuter}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={src} alt={alt} />
          </div>
        </div>
      ) : (
        <div className="grid-container">
          <div className={styles.wrapper}>
            <div className={styles.imageOuter}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={src} alt={alt} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
