"use client";
import { useRef, useEffect } from "react";
import { CURVE_SEGMENTS, buildCurvePoints, THEME_BG } from "./chartCurveData";
import styles from "./AIInfoCard.module.css";

// Exact from source: VoltageInstabilityChart (data-v-680783a3)
export default function VoltageInstabilityChart({ theme = "black" }: { theme?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let w = 0, h = 0, leftBound = 0, rightBound = 0;
    const scrollSpeed = 0.005;
    let scrollOffset = 0;
    const waveSpeed = 1e-4;
    let scaledPoints: { x: number; y: number }[] = [];

    const setup = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      w = rect.width;
      h = rect.height;
      leftBound = w * 0.33;
      rightBound = w * 0.67;
      buildScaled();
    };

    const buildScaled = () => {
      const raw = buildCurvePoints(CURVE_SEGMENTS);
      const pad = 8;
      scaledPoints = raw.map((p) => ({
        x: (p.x / 282) * w,
        y: (p.y / 102) * (h - pad * 2) + pad,
      }));
    };

    // Exact from source: addWave function (x)
    const addWave = (px: number, base: number): number => {
      const freq = px * 0.05;
      const amp = h * 0.008;
      const s1 = Math.sin(freq + scrollOffset * 2) * amp;
      const s2 = Math.sin(freq * 1.4 - scrollOffset * 1.8) * amp * 0.5;
      const s3 = Math.sin(freq * 2.1 + scrollOffset * 2.3) * amp * 0.3;
      return base + s1 + s2 + s3;
    };

    // Exact from source: getCenterValue function (T)
    const getCenterValue = (px: number, baseY: number): number => {
      const progress = (px - leftBound) / (rightBound - leftBound);
      const peakPos = 0.4;
      const amplitude = h * 0.22;
      const parabola = amplitude * Math.pow(2 * (progress - peakPos), 2);
      const base = baseY + amplitude - parabola;
      const asymmetry = Math.max(0, Math.sin((progress - 0.5) * Math.PI * 1.5)) * h * 0.05;
      const sinEnv = Math.sin(progress * Math.PI);
      const freq = px * 0.05;
      const harmonics = [
        Math.sin(freq + scrollOffset * 2) * h * 0.01 * sinEnv,
        Math.sin(freq * 1.5 - scrollOffset * 1.8) * h * 0.008 * sinEnv,
        Math.sin(freq * 2.3 + scrollOffset * 2.1) * h * 0.007 * sinEnv,
        Math.sin(freq * 0.7 - scrollOffset * 2.3) * h * 0.009 * sinEnv,
        Math.sin(freq * 3.1 + scrollOffset * 1.9) * h * 0.007 * sinEnv,
        Math.sin(freq * 1.9 - scrollOffset * 2.2) * h * 0.006 * sinEnv,
        Math.sin(freq * 2.7 + scrollOffset * 1.7) * h * 0.005 * sinEnv,
        Math.sin(freq * 1.3 - scrollOffset * 2) * h * 0.004 * sinEnv,
        Math.sin(freq * 3.5 + scrollOffset * 1.85) * h * 0.008 * sinEnv,
        Math.sin(freq * 2.1 - scrollOffset * 2.15) * h * 0.005 * sinEnv,
      ];
      return base + asymmetry + harmonics.reduce((a, b) => a + b, 0);
    };

    // Exact from source: getBlendedValue function (y)
    const getBlendedValue = (px: number): number => {
      const topBase = (scaledPoints[0]?.y ?? h / 2) - h * 0.1;
      const bottomBase = h * 0.1;
      const blendWidth = (rightBound - leftBound) * 0.2;
      const blendLeftStart = leftBound - blendWidth;
      const blendLeftEnd = leftBound + blendWidth;
      const blendRightStart = rightBound - blendWidth;
      const blendRightEnd = rightBound + blendWidth;

      if (px < blendLeftStart) return topBase;
      if (px >= blendLeftStart && px < blendLeftEnd) {
        const t = (px - blendLeftStart) / (blendLeftEnd - blendLeftStart);
        const smooth = t * t * (3 - 2 * t);
        return topBase + (getCenterValue(px, topBase) - topBase) * smooth;
      }
      if (px >= blendLeftEnd && px < blendRightStart) return getCenterValue(px, topBase);
      if (px >= blendRightStart && px < blendRightEnd) {
        const t = (px - blendRightStart) / (blendRightEnd - blendRightStart);
        const smooth = t * t * (3 - 2 * t);
        const centerVal = getCenterValue(px, topBase);
        const rightProgress = (px - rightBound) / (w - rightBound);
        const rightBase = topBase - h * 0.2;
        const rightTarget = rightBase + (bottomBase - rightBase) * rightProgress;
        return centerVal + (rightTarget - centerVal) * smooth;
      }
      const rightProgress = (px - rightBound) / (w - rightBound);
      const rightBase = topBase - h * 0.2;
      return rightBase + (bottomBase - rightBase) * rightProgress;
    };

    // Exact from source: getValue (b)
    const getValue = (px: number): number => {
      if (scaledPoints.length === 0) return h / 2;
      return addWave(px, getBlendedValue(px));
    };

    let flowPos = 0;

    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = THEME_BG.get(theme) ?? "#000";
      ctx.fillRect(0, 0, w, h);

      // Dashed vertical lines at bounds
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(leftBound, 0); ctx.lineTo(leftBound, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rightBound, 0); ctx.lineTo(rightBound, h); ctx.stroke();
      ctx.setLineDash([]);

      // Fill gradient under curve
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = getValue(x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
      fillGrad.addColorStop(0, "rgba(255, 107, 107, 0.6)");
      fillGrad.addColorStop(1, "rgba(255, 107, 107, 0)");
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Base line stroke
      ctx.strokeStyle = "#f14d3d";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = getValue(x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Flowing highlight stroke
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = getValue(x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const flowGrad = ctx.createLinearGradient(0, 0, w, 0);
      const bandWidth = 0.15;
      const totalWidth = 1 + 2 * bandWidth;
      const pos = (flowPos % (w * totalWidth)) / (w * totalWidth) * totalWidth - bandWidth;
      const stops: { pos: number; color: string }[] = [
        { pos: 0, color: "rgba(241, 77, 61, 0)" },
      ];
      if (pos - bandWidth > 0 && pos - bandWidth < 1) stops.push({ pos: pos - bandWidth, color: "rgba(241, 77, 61, 0)" });
      if (pos - bandWidth / 2 > 0 && pos - bandWidth / 2 < 1) stops.push({ pos: Math.max(0, Math.min(1, pos - bandWidth / 2)), color: "rgba(255, 153, 153, 0.45)" });
      if (pos >= 0 && pos <= 1) stops.push({ pos, color: "rgba(255, 180, 180, 0.9)" });
      if (pos + bandWidth / 2 > 0 && pos + bandWidth / 2 < 1) stops.push({ pos: Math.max(0, Math.min(1, pos + bandWidth / 2)), color: "rgba(255, 153, 153, 0.45)" });
      if (pos + bandWidth > 0 && pos + bandWidth < 1) stops.push({ pos: pos + bandWidth, color: "rgba(241, 77, 61, 0)" });
      stops.push({ pos: 1, color: "rgba(241, 77, 61, 0)" });
      stops.forEach((s) => flowGrad.addColorStop(s.pos, s.color));
      ctx.strokeStyle = flowGrad;
      ctx.stroke();

      // Dots at bounds
      [{ x: leftBound, y: getValue(leftBound) }, { x: rightBound, y: getValue(rightBound) }].forEach((pt) => {
        ctx!.beginPath();
        ctx!.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "#eee";
        ctx!.fill();
      });

      flowPos += scrollSpeed * w;
      scrollOffset += waveSpeed * w;
    };

    setup();
    const animate = () => { draw(); rafRef.current = requestAnimationFrame(animate); };
    rafRef.current = requestAnimationFrame(animate);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return (
    <div className={styles.chart}>
      <div className={styles.canvasChartHead}>
        <div className={styles.canvasChartTitle}>Voltage Instability</div>
      </div>
      <div ref={wrapperRef} className={styles.voltageChartWrapper}>
        <canvas ref={canvasRef} className={styles.canvasChartCanvas} />
      </div>
      <div className={styles.canvasChartListWrapper}>
        <div className={styles.canvasChartListTitle}>Outage Status</div>
        <ul className={styles.canvasChartList}>
          <li className={`${styles.canvasChartListItem} ${styles.canvasChartListItemBad}`}>
            <div className={styles.canvasChartListItemTitle}>Downtown</div>
            <div className={styles.canvasChartListItemStatus}>Offline</div>
          </li>
          <li className={`${styles.canvasChartListItem} ${styles.canvasChartListItemBad}`}>
            <div className={styles.canvasChartListItemTitle}>Midtown</div>
            <div className={styles.canvasChartListItemStatus}>Offline</div>
          </li>
          <li className={`${styles.canvasChartListItem} ${styles.canvasChartListItemBad}`}>
            <div className={styles.canvasChartListItemTitle}>Uptown</div>
            <div className={styles.canvasChartListItemStatus}>Offline</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
