"use client";
import { useRef, useEffect, useCallback } from "react";

// Exact from source: image sequence config for ai-workloads
const CDN_BASE = "https://www.on.energy";

export function getImagePaths(slug: string, device: "desktop" | "mobile" = "desktop") {
  const ext = "webp";
  const counts: Record<string, number> = {
    "ai-workloads": 200,
    "grid-volatility": 200,
    hardware: 240,
    "power-quality": 200,
    software: 201,
    technology: 351,
  };
  const count = counts[slug] ?? 0;
  return Array.from({ length: count }, (_, i) =>
    `${CDN_BASE}/img/${slug}/${device}/${slug}_${String(i).padStart(3, "0")}.${ext}`
  );
}

// Exact from source: drawImageToCanvas (we function)
export function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
) {
  const scaleX = canvasWidth / img.naturalWidth;
  const scaleY = canvasHeight / img.naturalHeight;
  const scale = Math.max(scaleX, scaleY); // "cover" mode
  const offsetX = (canvasWidth - img.naturalWidth * scale) / 2;
  const offsetY = (canvasHeight - img.naturalHeight * scale) / 2;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    img,
    0, 0, img.naturalWidth, img.naturalHeight,
    offsetX, offsetY,
    img.naturalWidth * scale, img.naturalHeight * scale,
  );
}

// Hook: load and manage image sequence
export function useImageSequence(slug: string) {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef(0);

  const load = useCallback(() => {
    const device = typeof window !== "undefined" && window.innerWidth < 834 ? "mobile" : "desktop";
    const paths = getImagePaths(slug, device);
    imagesRef.current = new Array(paths.length).fill(null);

    paths.forEach((url, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCountRef.current++;
      };
    });
  }, [slug]);

  return { imagesRef, loadedCountRef, load };
}
