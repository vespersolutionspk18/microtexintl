"use client";

import { useEffect } from "react";
import { useContactPanel } from "./ContactPanelContext";
import { useLenis } from "./LenisProvider";
import ContactForm from "./ContactForm";
import styles from "./ContactPanel.module.css";

export default function ContactPanel() {
  const { isOpen, close } = useContactPanel();
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        <div className={styles.inner} data-lenis-prevent>
          <ContactForm />
        </div>
      </div>

      <button
        className={styles.closeButton}
        onClick={close}
        aria-label="Close contact panel"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diagonal top-left to bottom-right */}
          <circle cx="2.82843" cy="2.82843" r="1.5" transform="rotate(-45 2.82843 2.82843)" fill="currentColor" />
          <circle cx="5.41421" cy="5.41421" r="1.5" transform="rotate(-45 5.41421 5.41421)" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="10.5858" cy="10.5858" r="1.5" transform="rotate(-45 10.5858 10.5858)" fill="currentColor" />
          <circle cx="13.1716" cy="13.1716" r="1.5" transform="rotate(-45 13.1716 13.1716)" fill="currentColor" />
          {/* Diagonal top-right to bottom-left */}
          <circle cx="13.1716" cy="2.82843" r="1.5" transform="rotate(-45 13.1716 2.82843)" fill="currentColor" />
          <circle cx="10.5858" cy="5.41421" r="1.5" transform="rotate(-45 10.5858 5.41421)" fill="currentColor" />
          <circle cx="5.41421" cy="10.5858" r="1.5" transform="rotate(-45 5.41421 10.5858)" fill="currentColor" />
          <circle cx="2.82843" cy="13.1716" r="1.5" transform="rotate(-45 2.82843 13.1716)" fill="currentColor" />
        </svg>
      </button>

      <div className={styles.bg} onClick={close} />
    </div>
  );
}
