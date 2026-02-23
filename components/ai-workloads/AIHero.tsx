"use client";
import { useRef, useEffect, useState } from "react";
import BlurReveal from "@/components/BlurReveal";
import styles from "./AIHero.module.css";
import { useImageSequence, drawImageToCanvas } from "./useImageSequence";

// Exact from source: ExpertiseHero (data-v-b5d02125)
export default function AIHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef(0);
  const { imagesRef, load } = useImageSequence("ai-workloads");

  // Enter animation state
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Trigger text reveals after mount
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Exact from source: hero copy SplitText animation
  // y:40→0 + autoAlpha 0→1, delay 0.15, stagger 0.08, power3.out
  useEffect(() => {
    if (!entered || !copyRef.current) return;

    Promise.all([
      import("gsap"),
      import("gsap/SplitText"),
    ]).then(([gsapModule, splitModule]) => {
      const gsap = gsapModule.default || gsapModule.gsap;
      const { SplitText } = splitModule;
      gsap.registerPlugin(SplitText);

      const el = copyRef.current;
      if (!el) return;

      const split = new SplitText(el, { type: "lines" });
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(split.lines,
        { y: 40 },
        { delay: 0.15, duration: 1, y: 0, ease: "power3.out", stagger: 0.08 }
      );
      gsap.fromTo(split.lines,
        { autoAlpha: 0 },
        { autoAlpha: 1, delay: 0.15, duration: 1.1, ease: "power3.out", stagger: 0.08 }
      );
    });
  }, [entered]);

  useEffect(() => {
    load();

    const canvas = canvasRef.current;
    const sequenceEl = sequenceRef.current;
    if (!canvas || !sequenceEl) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let cw = 0, ch = 0;
    let progress = 0;
    let lastRenderedFrame = -1;
    const totalFrames = 200;
    const firstFrame = 0;

    // Exact from source: canvas setup with { alpha: false, desynchronized: true }
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cw = w * dpr;
      ch = h * dpr;
      ctx = canvas.getContext("2d", { alpha: false, desynchronized: true } as CanvasRenderingContext2DSettings);
    };

    setupCanvas();

    // Exact from source: enter animation — progress 0→1 over 3s, ease: sine.out
    const enterStartTime = performance.now();
    const enterDuration = 3000; // 3 seconds

    // sine.out easing: sin(t * π/2)
    const sineOut = (t: number) => Math.sin((t * Math.PI) / 2);

    // Exact from source: scroll parallax (onRaf callback)
    // translateY up to 300px, bg opacity 0→1 mapped from scrollProgress [0.4, 1]
    let lastTranslateY = -999;
    let lastOpacity = -1;

    // Exact from source: fade in sequence wrapper — autoAlpha 0→1, duration 5, ease sine.inOut
    if (sequenceEl) {
      sequenceEl.style.opacity = "0";
      const fadeStartTime = performance.now();
      const fadeDuration = 5000; // 5 seconds
      // sine.inOut: sin((t * PI - PI/2) + 1) / 2
      const sineInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

      const fadeSequence = () => {
        const fadeElapsed = performance.now() - fadeStartTime;
        const fadeT = Math.min(1, fadeElapsed / fadeDuration);
        sequenceEl.style.opacity = `${sineInOut(fadeT)}`;
        if (fadeT < 1) requestAnimationFrame(fadeSequence);
      };
      requestAnimationFrame(fadeSequence);
    }

    const animate = () => {
      if (!ctx) { rafRef.current = requestAnimationFrame(animate); return; }

      // Enter animation
      const elapsed = performance.now() - enterStartTime;
      const enterT = Math.min(1, elapsed / enterDuration);
      progress = sineOut(enterT);

      // Map progress to frame
      const frameOffset = Math.ceil((totalFrames - firstFrame - 1) * progress);
      const currentFrame = frameOffset + firstFrame;

      // Only redraw if frame changed
      if (currentFrame !== lastRenderedFrame) {
        const img = imagesRef.current[currentFrame];
        if (img?.complete && img.naturalWidth > 0) {
          drawImageToCanvas(ctx, img, cw, ch);
          lastRenderedFrame = currentFrame;
        }
      }

      // Scroll parallax
      if (heroRef.current && sequenceEl && bgRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollP = Math.max(0, Math.min(1, -rect.top / vh));

        const maxTranslateY = 300;
        const translateY = Math.round(Math.max(0, Math.min(maxTranslateY, scrollP * maxTranslateY)));
        const opacity = Math.round(Math.max(0, Math.min(1, (scrollP - 0.4) / 0.6)) * 100) / 100;

        if (Math.abs(translateY - lastTranslateY) >= 1) {
          sequenceEl.style.transform = `translateY(${translateY}px)`;
          lastTranslateY = translateY;
        }
        if (Math.abs(opacity - lastOpacity) >= 0.01) {
          bgRef.current.style.opacity = `${opacity}`;
          lastOpacity = opacity;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      setupCanvas();
      lastRenderedFrame = -1; // Force redraw
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [load, imagesRef]);

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={`grid-container ${styles.container}`}>
        <div className={styles.titleWrapper}>
          <div className={`${styles.label} ${entered ? styles.labelVisible : ""}`}>AI UPS™</div>
          <BlurReveal
            tag="h1"
            lines={["The AI Power", "Quality Problem"]}
            className={styles.title}
            manual
            triggered={entered}
          />
        </div>
        <p ref={copyRef} className={styles.copy} style={{ opacity: 0, visibility: "hidden" }}>
          <span>AI workloads have outgrown </span>
          traditional power design. AI UPS™ delivers perfect power quality inside the data hall while stabilizing the grid outside, proven at gigawatt scale with hyperscalers and utilities.
        </p>
      </div>
      <div className={styles.sequenceWrapper}>
        <div ref={sequenceRef} className={styles.sequence}>
          <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
        </div>
      </div>
      <div ref={bgRef} className={styles.bg} />
    </header>
  );
}
