"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "./Hero.module.css";

function clamp(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}

function mapRange(
  inRange: [number, number],
  outRange: [number, number],
  value: number
) {
  return (
    outRange[0] +
    ((value - inRange[0]) * (outRange[1] - outRange[0])) /
      (inRange[1] - inRange[0])
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prevY = useRef(-999);
  const prevOpacity = useRef(-1);
  const entered = useRef(false);

  const onRaf = useCallback((progress: number) => {
    // Entrance animation - trigger once when section first appears
    if (!entered.current && videoRef.current) {
      entered.current = true;
      gsap.fromTo(
        videoRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 2, ease: "sine.in" }
      );
    }

    const wrapper = videoWrapperRef.current;
    const bg = bgRef.current;
    if (!wrapper || !bg) return;

    const maxY = 300;
    const y = Math.round(clamp(0, maxY, mapRange([0.5, 1], [0, maxY], progress)));
    const opacity =
      Math.round(clamp(0, 1, mapRange([0.5, 1], [0, 1], progress)) * 100) / 100;

    if (Math.abs(y - prevY.current) < 1 && Math.abs(opacity - prevOpacity.current) < 0.01)
      return;

    prevY.current = y;
    prevOpacity.current = opacity;

    wrapper.style.transform = `translateY(${y}px)`;
    bg.style.opacity = `${opacity}`;
  }, []);

  useScrollObserver(sectionRef, onRaf);

  return (
    <header ref={sectionRef} className={styles.homeHero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Precision Packaging</span>
          <span>Machinery Solutions.</span>
        </h1>

        <p className={styles.copy}>
          <span>Microtex International designs, manufactures</span>
          <span>and services packaging machinery for</span>
          <span>the world&apos;s leading producers.</span>
        </p>

        <div ref={videoWrapperRef} className={styles.videoWrapper}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://a.storyblok.com/f/288034353253643/1920x1440/073f7c873e/home-hero-poster.png"
            src="https://a.storyblok.com/f/288034353253643/x/4772c775e3/home-hero.mp4"
          />
        </div>
        <div ref={bgRef} className={styles.bg} />
      </div>

      <Link href="/machines" className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.label}>Discover Our Machines</span>
          <p className={styles.cardCopy}>
            Custom-designed packaging solutions built for highest quality
            output and reliability.
          </p>
        </div>
        <div className={styles.cardImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://a.storyblok.com/f/288034353253643/700x700/8b471550e5/home-hero-link.jpg/m/220x220/filters:format(jpeg):quality(70)"
            alt="Packaging machinery"
          />
        </div>
      </Link>
    </header>
  );
}
