"use client";

import { useRef } from "react";
import Link from "next/link";
import useVideoDisplacement from "@/hooks/useVideoDisplacement";
import styles from "./PerformanceSection.module.css";

export default function PerformanceSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { handleMouseMove, handleMouseLeave } = useVideoDisplacement(
    videoRef,
    canvasRef,
    { radius: 0.25, strength: 0.015, smoothing: 0.1 }
  );

  return (
    <section
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid-container">
        <div className={styles.content}>
          <h2 className={styles.label}>Our Track Record</h2>
          <h3 className={styles.title}>Proven Performance Worldwide</h3>
          <p className={styles.bodyCopy}>
            Built for environments where production uptime is non-negotiable,
            our machinery delivers measurable reliability.
          </p>
          <div className={styles.buttonWrapper}>
            <Link href="/about" className={styles.baseButton}>
              <span className={styles.buttonBg} />
              <span className={styles.fillEffect} />
              <span className={styles.buttonLabel}>Learn more</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.sourceVideo}
          autoPlay
          loop
          muted
          playsInline
          src="/video/trail.mp4"
        />
        <canvas ref={canvasRef} className={styles.displacementCanvas} />
      </div>
    </section>
  );
}
