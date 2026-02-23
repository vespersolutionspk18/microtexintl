"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [subject, setSubject] = useState("new-business");

  return (
    <>
      <h2 className={styles.title}>
        Packaging is complex. Reaching us isn&apos;t. Contact the Microtex
        team anytime.
      </h2>

      <div className={styles.head}>
        <div className={styles.headFormFields}>
          <label className={styles.radio}>
            <input
              type="radio"
              name="subject"
              value="new-business"
              checked={subject === "new-business"}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.radioDot} />
            <span className={styles.radioLabel}>New business</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="subject"
              value="press"
              checked={subject === "press"}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.radioDot} />
            <span className={styles.radioLabel}>Spare parts inquiry</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="subject"
              value="other"
              checked={subject === "other"}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.radioDot} />
            <span className={styles.radioLabel}>Service request</span>
          </label>
        </div>

        <Link href="/team#careers" className={styles.headLink}>
          Looking for careers?
        </Link>
      </div>

      <div className={styles.formFieldsWrapper}>
        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>Describe your challenge</h3>
          <div className={styles.formGroupFields}>
            <textarea
              className={`${styles.formField} ${styles.textarea}`}
              placeholder="Your message"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>About the business</h3>
          <div className={styles.formGroupFields}>
            <input
              type="text"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Company name"
            />
            <input
              type="text"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Website"
            />
            <input
              type="text"
              className={styles.formField}
              placeholder="How can we help?"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>About you</h3>
          <div className={styles.formGroupFields}>
            <input
              type="text"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Full name"
            />
            <input
              type="email"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Email"
            />
            <input
              type="tel"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Phone number"
            />
            <input
              type="text"
              className={`${styles.formField} ${styles.half}`}
              placeholder="Title"
            />
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        <span className={styles.buttonBg} />
        <span className={styles.fillEffect} />
        <span className={styles.buttonLabel}>Send</span>
      </button>
    </>
  );
}
