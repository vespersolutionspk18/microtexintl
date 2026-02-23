"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import IntroLabel from "@/components/IntroLabel";
import styles from "./AINextProject.module.css";
import { useImageSequence, drawImageToCanvas } from "./useImageSequence";

// Exact from source: ExpertiseNextProject (data-v-470c1c4c)
export default function AINextProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const { imagesRef, load } = useImageSequence("grid-volatility");

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const wheelAccRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revertRafRef = useRef(0);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  // Canvas rendering
  useEffect(() => {
    load();

    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let cw = 0, ch = 0;
    let lastRenderedFrame = -1;
    const totalFrames = 200;
    const firstFrame = 0;

    const setupCanvas = () => {
      const section = sectionRef.current;
      if (!section) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      cw = rect.width * dpr;
      ch = rect.height * dpr;
      ctx = canvas.getContext("2d", { alpha: false, desynchronized: true } as CanvasRenderingContext2DSettings);
    };

    setupCanvas();

    const animate = () => {
      if (!ctx) { rafRef.current = requestAnimationFrame(animate); return; }
      const p = progressRef.current;
      const frameOffset = Math.ceil((totalFrames - firstFrame - 1) * p);
      const currentFrame = frameOffset + firstFrame;

      if (currentFrame !== lastRenderedFrame) {
        const img = imagesRef.current[currentFrame];
        if (img?.complete && img.naturalWidth > 0) {
          drawImageToCanvas(ctx, img, cw, ch);
          lastRenderedFrame = currentFrame;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    const onResize = () => { setupCanvas(); lastRenderedFrame = -1; };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [load, imagesRef]);

  // Exact from source: wheel-to-navigate
  useEffect(() => {
    const revertProgress = () => {
      const startVal = progressRef.current;
      const startTime = performance.now();
      const duration = 1500;
      const power2Out = (t: number) => 1 - Math.pow(1 - t, 2);

      const tick = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / duration);
        const val = startVal * (1 - power2Out(t));
        progressRef.current = val;
        wheelAccRef.current = val * (window.innerHeight * 2.5);
        setProgress(val);
        if (t < 1) revertRafRef.current = requestAnimationFrame(tick);
      };
      revertRafRef.current = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const vh = window.innerHeight;

      if (scrollY + vh >= docHeight - 1) {
        if (e.deltaY > 0) {
          cancelAnimationFrame(revertRafRef.current);
          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);

          wheelAccRef.current += e.deltaY;
          const maxAcc = vh * 2.5;
          wheelAccRef.current = Math.min(wheelAccRef.current, maxAcc);
          const p = wheelAccRef.current / maxAcc;
          progressRef.current = p;
          setProgress(p);

          if (p >= 1) {
            window.location.href = "/expertises/grid-volatility";
            return;
          }

          wheelTimeoutRef.current = setTimeout(revertProgress, 100);
        }
      } else {
        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        wheelAccRef.current = 0;
        revertProgress();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(revertRafRef.current);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  // Exact from source: clip-path and transform computation
  const clipStyles = useMemo(() => {
    if (typeof window === "undefined") return {};
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return {};

    const sRect = section.getBoundingClientRect();
    const cRect = card.getBoundingClientRect();
    if (sRect.width === 0 || cRect.width === 0) return {};

    const insetTop = cRect.top - sRect.top;
    const insetRight = sRect.width - (cRect.left - sRect.left) - cRect.width;
    const insetBottom = sRect.height - (cRect.top - sRect.top) - cRect.height;
    const insetLeft = cRect.left - sRect.left;

    // Get card border-radius
    const cs = window.getComputedStyle(card);
    const radius = parseFloat(cs.borderRadius) || 0;

    const top = insetTop * (1 - progress);
    const right = insetRight * (1 - progress);
    const bottom = insetBottom * (1 - progress);
    const left = insetLeft * (1 - progress);
    const br = radius * (1 - progress);

    return {
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${br}px)`,
    };
  }, [progress]);

  const transformStyles = useMemo(() => {
    if (typeof window === "undefined") return {};
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return {};

    const sRect = section.getBoundingClientRect();
    const cRect = card.getBoundingClientRect();
    if (sRect.width === 0 || cRect.width === 0) return {};

    const centerX = cRect.left - sRect.left + cRect.width / 2;
    const centerY = cRect.top - sRect.top + cRect.height / 2;
    const sectionCenterX = sRect.width * 0.55;
    const sectionCenterY = sRect.height / 2;

    const translateX = (centerX - sectionCenterX) * (1 - progress);
    const translateY = (centerY - sectionCenterY) * (1 - progress);

    const scaleX = cRect.width / sRect.width;
    const scaleY = cRect.height / sRect.height;
    const baseScale = Math.max(scaleX, scaleY) + 0.1;
    const scale = baseScale + (1 - baseScale) * progress;

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    };
  }, [progress]);

  // Exact from source: visibility thresholds
  const titleHidden = progress >= 0.3;
  const subtitleHidden = progress >= 0.34;
  const cardHidden = progress >= 0.06;
  const progressBarHidden = progress <= 0.05;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.head}>
        <div className={styles.title} style={titleHidden ? { opacity: 0, visibility: "hidden", transition: "opacity 0.3s, visibility 0.3s" } : { transition: "opacity 0.3s, visibility 0.3s" }}>
          <IntroLabel text="Our Expertise" />
        </div>
        <div className={styles.subtitleWrapper} style={subtitleHidden ? { opacity: 0, visibility: "hidden" } : {}}>
          <div className={styles.subtitle}>Next Expertise</div>
        </div>
      </div>
      <div>
        <a
          ref={cardRef}
          href="/expertises/grid-volatility"
          className={styles.card}
          style={cardHidden ? { opacity: 0, visibility: "hidden", transition: "opacity 0.5s, visibility 0.5s" } : { transition: "opacity 0.5s, visibility 0.5s" }}
        >
          <div className={styles.cardTitle}>
            Distributed storage for a more stable grid
          </div>
          <div className={styles.cardButton}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9.95587" cy="9.96109" r="1" transform="rotate(45 9.95587 9.96109)" fill="currentColor" />
              <circle cx="14.0262" cy="14.2111" r="1" transform="rotate(45 14.0262 14.2111)" fill="currentColor" />
              <circle cx="9.95587" cy="18.4494" r="1" transform="rotate(45 9.95587 18.4494)" fill="currentColor" />
              <circle cx="14.0252" cy="9.96109" r="1" transform="rotate(45 14.0252 9.96109)" fill="currentColor" />
              <circle cx="18.4412" cy="9.96109" r="1" transform="rotate(45 18.4412 9.96109)" fill="currentColor" />
              <circle cx="9.90509" cy="9.90219" r="1" transform="rotate(-135 9.90509 9.90219)" fill="currentColor" />
              <circle cx="14.0262" cy="5.67172" r="1" transform="rotate(-135 14.0262 5.67172)" fill="currentColor" />
              <circle cx="9.90509" cy="1.41391" r="1" transform="rotate(-135 9.90509 1.41391)" fill="currentColor" />
              <circle cx="5.66192" cy="9.90219" r="1" transform="rotate(-135 5.66192 9.90219)" fill="currentColor" />
              <circle cx="1.41974" cy="9.90219" r="1" transform="rotate(-135 1.41974 9.90219)" fill="currentColor" />
            </svg>
          </div>
        </a>
      </div>
      {/* Exact from source: progress bar */}
      <div
        className={styles.progressWrapper}
        style={progressBarHidden ? { opacity: 0, visibility: "hidden" } : {}}
      >
        <div className={styles.progressBar} style={{ transform: `scaleX(${progress})` }} />
      </div>
      {/* Exact from source: image container with clip-path morph */}
      <div className={styles.imageContainer} style={clipStyles}>
        <div className={styles.imageWrapper} style={transformStyles}>
          <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
        </div>
      </div>
    </section>
  );
}
