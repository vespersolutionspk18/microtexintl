"use client";
import { useRef, useEffect } from "react";
import { CURVE_SEGMENTS, buildCurvePoints, THEME_BG } from "./chartCurveData";
import styles from "./AIInfoCard.module.css";

// Exact from source: PeakDemandChart (data-v-f1961ac4)
export default function PeakDemandChart({
  progress = 0,
  theme = "yellow",
}: {
  progress?: number;
  theme?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const progressRef = useRef(progress);

  // Keep progress ref in sync with prop
  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let w = 0, h = 0;
    let flowPos = 0;
    const flowSpeed = 0.003;
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

    // Exact from source: map progress [0.73, 0.8] → [0, 1], clamped
    // i = computed(() => clamp(0, 1, mapRange([0.73, 0.8], [0, 1], e.progress)))
    const mapProgress = () => {
      const p = progressRef.current;
      return Math.max(0, Math.min(1, (p - 0.73) / (0.8 - 0.73)));
    };

    // Exact from source: getValue (T function)
    // Finds closest point and interpolates between bottom and curve based on progress
    const getValue = (px: number, prog: number): number => {
      if (scaledPoints.length === 0) return h - 8;
      let closest = scaledPoints[0];
      let minDist = Math.abs(scaledPoints[0].x - px);
      for (const pt of scaledPoints) {
        const dist = Math.abs(pt.x - px);
        if (dist < minDist) { minDist = dist; closest = pt; }
      }
      if (!closest) return h - 8;
      const bottom = h - 8;
      const curveY = closest.y;
      return bottom + (curveY - bottom) * prog;
    };

    let prevShowLabel = false;

    // Exact from source: draw function (b)
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = THEME_BG.get(theme) ?? "#000";
      ctx.fillRect(0, 0, w, h);
      if (scaledPoints.length === 0) return;

      const prog = mapProgress();

      // Fill under curve
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = getValue(x, prog);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
      fillGrad.addColorStop(0, "rgba(255, 243, 19, 0.25)");
      fillGrad.addColorStop(0.7, "rgba(255, 243, 19, 0.1)");
      fillGrad.addColorStop(1, "rgba(255, 243, 19, 0)");
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Line stroke
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = getValue(x, prog);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#FFF313";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Flowing highlight (exact from source: lineWidth 3)
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = getValue(x, prog);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const flowGrad = ctx.createLinearGradient(0, 0, w, 0);
      const bandWidth = 0.15;
      const totalWidth = 1 + 2 * bandWidth;
      const pos = (flowPos % (w * totalWidth)) / (w * totalWidth) * totalWidth - bandWidth;
      const stops: { pos: number; color: string }[] = [
        { pos: 0, color: "rgba(255, 243, 19, 0)" },
      ];
      if (pos - bandWidth > 0 && pos - bandWidth < 1) stops.push({ pos: pos - bandWidth, color: "rgba(255, 243, 19, 0)" });
      if (pos - bandWidth / 2 > 0 && pos - bandWidth / 2 < 1) stops.push({ pos: Math.max(0, Math.min(1, pos - bandWidth / 2)), color: "rgba(255, 250, 200, 0.45)" });
      if (pos >= 0 && pos <= 1) stops.push({ pos, color: "rgba(255, 248, 220, 0.9)" });
      if (pos + bandWidth / 2 > 0 && pos + bandWidth / 2 < 1) stops.push({ pos: Math.max(0, Math.min(1, pos + bandWidth / 2)), color: "rgba(255, 250, 200, 0.45)" });
      if (pos + bandWidth > 0 && pos + bandWidth < 1) stops.push({ pos: pos + bandWidth, color: "rgba(255, 243, 19, 0)" });
      stops.push({ pos: 1, color: "rgba(255, 243, 19, 0)" });
      stops.forEach((s) => flowGrad.addColorStop(s.pos, s.color));
      ctx.strokeStyle = flowGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Label visibility (exact from source: show when mapped progress > 0.9)
      const showLabel = prog > 0.9;
      if (showLabel !== prevShowLabel) {
        prevShowLabel = showLabel;
        if (labelRef.current) {
          labelRef.current.style.opacity = showLabel ? "1" : "0";
          labelRef.current.style.visibility = showLabel ? "visible" : "hidden";
        }
        if (lineRef.current) {
          lineRef.current.style.transform = showLabel ? "scaleX(1)" : "scaleX(0)";
        }
      }

      flowPos += flowSpeed * w;
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
    <div className={`${styles.chart} ${theme === "yellow" ? styles.chartYellow : ""}`}>
      <div className={styles.peakChartHead}>
        <div className={styles.canvasChartTitle}>Peak Demand</div>
      </div>
      <div ref={wrapperRef} className={styles.peakChartWrapper}>
        <canvas ref={canvasRef} className={styles.canvasChartCanvas} />
        <div className={styles.peakLabelWrapper}>
          <div ref={labelRef} className={styles.peakLabel}>AI. UPS</div>
          <div ref={lineRef} className={styles.peakLabelLine} />
        </div>
      </div>
      <div className={styles.peakTimeLabels}>
        <div>6am</div>
        <div>12am</div>
        <div>6pm</div>
        <div>12pm</div>
      </div>
    </div>
  );
}
