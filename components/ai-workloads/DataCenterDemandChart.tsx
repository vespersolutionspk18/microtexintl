"use client";
import { useRef, useEffect } from "react";
import { THEME_BG } from "./chartCurveData";
import styles from "./AIInfoCard.module.css";

// Exact from source: DataCenterDemandChart (data-v-bfa52a43)
export default function DataCenterDemandChart({
  optimized = false,
  showWatts = false,
  theme = "black",
}: {
  optimized?: boolean;
  showWatts?: boolean;
  theme?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let w = 0, h = 0;
    let subOffset = 0;
    let patternIdx = 0;
    const baseSpeed = 0.5;
    let flowPos = 0;
    const flowSpeed = 0.003;
    let wheelImpulse = 0;
    const wheelSensitivity = 0.002;
    const damping = 0.95;

    // Exact from source: color palette (A function)
    const getColors = () => optimized ? {
      line: "#FFF313",
      gradientTop: "rgba(255, 243, 19, 0.25)",
      gradientBottom: "rgba(255, 243, 19, 0)",
      flowBright: "rgba(255, 248, 220, 0.9)",
      flowMedium: "rgba(255, 250, 200, 0.45)",
    } : {
      line: "#f14d3d",
      gradientTop: "rgba(241, 77, 61, 0.4)",
      gradientBottom: "rgba(241, 77, 61, 0)",
      flowBright: "rgba(255, 153, 153, 1)",
      flowMedium: "rgba(255, 153, 153, 0.3)",
    };

    // Exact from source: procedural demand generator (C function)
    const generatePattern = (seed: number) => {
      const pts: { x: number; y: number }[] = [];
      const rand = (i: number) => {
        const n = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
        return n - Math.floor(n);
      };
      pts.push({ x: 0, y: 0.08 + rand(0) * 0.04 });
      pts.push({ x: 0.1, y: 0.08 + rand(1) * 0.1 });
      pts.push({ x: 0.18, y: 0.08 + rand(2) * 0.08 });
      pts.push({ x: 0.25, y: 0.08 + rand(8) * 0.05 });
      const peak = 0.4 + rand(3) * 0.55;
      pts.push({ x: 0.3, y: 0.08 + rand(9) * 0.05 });
      pts.push({ x: 0.35, y: peak });
      pts.push({ x: 0.4, y: 0.08 + rand(10) * 0.05 });
      pts.push({ x: 0.5, y: 0.08 + rand(4) * 0.12 });
      pts.push({ x: 0.62, y: 0.08 + rand(5) * 0.1 });
      pts.push({ x: 0.75, y: 0.08 + rand(6) * 0.13 });
      pts.push({ x: 0.88, y: 0.08 + rand(7) * 0.09 });
      pts.push({ x: 1, y: 0.08 + rand(11) * 0.04 });
      return pts;
    };

    // Exact from source: LRU cache (class y, maxSize 100)
    const cache = new Map<number, { x: number; y: number }[]>();
    const accessOrder = new Map<number, number>();
    let accessCounter = 0;
    const maxCacheSize = 100;

    const cacheGet = (key: number) => {
      if (cache.has(key)) {
        accessOrder.set(key, ++accessCounter);
        return cache.get(key)!;
      }
      return undefined;
    };

    const cacheSet = (key: number, val: { x: number; y: number }[]) => {
      cache.set(key, val);
      accessOrder.set(key, ++accessCounter);
      if (cache.size > maxCacheSize) {
        let lruKey: number | undefined;
        let lruVal = Number.POSITIVE_INFINITY;
        for (const [k, v] of accessOrder.entries()) {
          if (v < lruVal) { lruVal = v; lruKey = k; }
        }
        if (lruKey !== undefined) {
          cache.delete(lruKey);
          accessOrder.delete(lruKey);
        }
      }
    };

    // Exact from source: getValue (b function)
    const getValue = (pos: number): number => {
      const frac = pos % 1;
      const seg = Math.floor(pos);
      let pattern = cacheGet(seg);
      if (!pattern) {
        pattern = generatePattern(seg);
        cacheSet(seg, pattern);
      }
      let p0 = pattern[0], p1 = pattern[1];
      for (let i = 0; i < pattern.length - 1; i++) {
        if (frac >= pattern[i].x && frac <= pattern[i + 1].x) {
          p0 = pattern[i];
          p1 = pattern[i + 1];
          break;
        }
      }
      const t = (frac - p0.x) / (p1.x - p0.x);
      return p0.y + (p1.y - p0.y) * t;
    };

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
    };

    // Exact from source: draw function (L)
    const draw = (): number => {
      if (!ctx) return 0;
      ctx.clearRect(0, 0, w, h);
      const colors = getColors();
      const segW = w / 4.5;
      const segCount = Math.ceil(w / segW) + 2;
      const patIdx = patternIdx;
      const alpha = optimized ? 0.2 : 1;
      const minY = 0.08;
      const rangeY = 0.95 - minY;
      const topOff = optimized ? h * 0.15 : 0;
      const toPixelY = (v: number) => (v - minY) / rangeY * h + topOff;

      // Fill under curve (non-optimized only)
      if (!optimized) {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, colors.gradientTop);
        grad.addColorStop(1, colors.gradientBottom);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let s = 0; s < segCount; s++) {
          const xOff = s * segW - subOffset;
          for (let px = 0; px <= segW; px += 1) {
            const t = px / segW;
            const pos = patIdx + s + t;
            const y = toPixelY(getValue(pos));
            const x = xOff + px;
            s === 0 && px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Line stroke
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let s = 0; s < segCount; s++) {
        const xOff = s * segW - subOffset;
        for (let px = 0; px <= segW; px += 1) {
          const t = px / segW;
          const pos = patIdx + s + t;
          const y = toPixelY(getValue(pos));
          const x = xOff + px;
          s === 0 && px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Flowing highlight
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let s = 0; s < segCount; s++) {
        const xOff = s * segW - subOffset;
        for (let px = 0; px <= segW; px += 1) {
          const t = px / segW;
          const pos = patIdx + s + t;
          const y = toPixelY(getValue(pos));
          const x = xOff + px;
          s === 0 && px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      }
      const flowGrad = ctx.createLinearGradient(0, 0, w, 0);
      const flowNorm = flowPos % w / w;
      const bandW = 0.1;
      const colorBase = optimized ? "255, 243, 19" : "241, 77, 61";
      const stops: { pos: number; color: string }[] = [];
      stops.push({ pos: 0, color: `rgba(${colorBase}, 0)` });
      const fadeStart = Math.max(0, flowNorm - bandW);
      if (fadeStart > 0) stops.push({ pos: fadeStart, color: `rgba(${colorBase}, 0)` });
      stops.push({ pos: Math.max(0, flowNorm - bandW / 2), color: colors.flowMedium });
      stops.push({ pos: flowNorm, color: colors.flowBright });
      stops.push({ pos: Math.min(1, flowNorm + bandW / 2), color: colors.flowMedium });
      const fadeEnd = Math.min(1, flowNorm + bandW);
      if (fadeEnd < 1) stops.push({ pos: fadeEnd, color: `rgba(${colorBase}, 0)` });
      stops.push({ pos: 1, color: `rgba(${colorBase}, 0)` });
      stops.forEach(s => flowGrad.addColorStop(s.pos, s.color));
      ctx.strokeStyle = flowGrad;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Exact from source: optimized threshold line with triangle pattern
      if (optimized) {
        const threshY = (0.4 - minY) / rangeY * h - h * 0.05;
        const triH = h * 0.07;
        const triW = h * 0.11;
        const drawThreshold = () => {
          ctx!.moveTo(0, threshY);
          for (let q = 0; q < segCount; q++) {
            const tx = q * segW - subOffset + segW * 0.35;
            if (tx > -triW && tx < w + triW) {
              ctx!.lineTo(tx - triW / 2, threshY);
              ctx!.lineTo(tx, threshY + triH);
              ctx!.lineTo(tx + triW / 2, threshY);
            }
          }
          ctx!.lineTo(w, threshY);
        };
        // Fill under threshold
        const threshGrad = ctx.createLinearGradient(0, threshY, 0, h);
        threshGrad.addColorStop(0, "rgba(255, 243, 19, 0.25)");
        threshGrad.addColorStop(0.15, "rgba(255, 243, 19, 0.15)");
        threshGrad.addColorStop(0.5, "rgba(255, 243, 19, 0.05)");
        threshGrad.addColorStop(1, "rgba(255, 243, 19, 0)");
        ctx.beginPath();
        drawThreshold();
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = threshGrad;
        ctx.fill();
        // Stroke threshold
        ctx.beginPath();
        drawThreshold();
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Flowing highlight on threshold
        ctx.beginPath();
        drawThreshold();
        const threshFlowGrad = ctx.createLinearGradient(0, 0, w, 0);
        const threshStops: { pos: number; color: string }[] = [];
        threshStops.push({ pos: 0, color: "rgba(255, 243, 19, 0)" });
        if (fadeStart > 0) threshStops.push({ pos: fadeStart, color: "rgba(255, 243, 19, 0)" });
        threshStops.push({ pos: Math.max(0, flowNorm - bandW / 2), color: colors.flowMedium });
        threshStops.push({ pos: flowNorm, color: colors.flowBright });
        threshStops.push({ pos: Math.min(1, flowNorm + bandW / 2), color: colors.flowMedium });
        if (fadeEnd < 1) threshStops.push({ pos: fadeEnd, color: "rgba(255, 243, 19, 0)" });
        threshStops.push({ pos: 1, color: "rgba(255, 243, 19, 0)" });
        threshStops.forEach(s => threshFlowGrad.addColorStop(s.pos, s.color));
        ctx.strokeStyle = threshFlowGrad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      return segW;
    };

    // Exact from source: wheel handler (Q function)
    const onWheel = (e: WheelEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        wheelImpulse += Math.abs(e.deltaY) * wheelSensitivity;
      }
    };

    // Exact from source: animation frame (v function)
    const animate = () => {
      const segW = draw();
      const speed = baseSpeed + wheelImpulse;
      subOffset += speed;
      if (segW && subOffset >= segW) {
        subOffset -= segW;
        patternIdx++;
      }
      wheelImpulse *= damping;
      flowPos += flowSpeed * w;
      rafRef.current = requestAnimationFrame(animate);
    };

    setup();
    window.addEventListener("wheel", onWheel);
    rafRef.current = requestAnimationFrame(animate);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
    };
  }, [optimized, theme]);

  return (
    <div className={`${styles.chart} ${theme === "yellow" ? styles.chartYellow : ""}`}>
      <div className={styles.demandChartHead}>
        <div className={styles.demandChartTitle}>Data Center Demand</div>
        {showWatts && <div>198W</div>}
      </div>
      <div ref={wrapperRef} className={styles.demandChartWrapper}>
        <canvas ref={canvasRef} className={styles.canvasChartCanvas} />
      </div>
    </div>
  );
}
