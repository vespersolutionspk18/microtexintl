"use client";
import BlurReveal from "@/components/BlurReveal";
import { useInView } from "@/hooks/useInView";
import styles from "./AICopy.module.css";

export default function AICopy() {
  const [copyRef, copyInView] = useInView({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.copy}>
          <BlurReveal
            tag="h3"
            lines={["Trusted by Hyperscalers."]}
          />
          <p
            ref={copyRef as React.RefObject<HTMLParagraphElement>}
            className={copyInView ? styles.copyVisible : ""}
          >
            <span>AI UPS™ is deployed by the world&apos;s leading AI and cloud operators to endure uninterrupted compute and perfect power quality. By integrating directly with grid infrastructure, it keeps data flowing, cooling online, and uptime absolute, even under extreme volatility.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
