"use client";

import { useRef, useEffect, useCallback } from "react";
import styles from "./ImageSequence.module.css";

interface ImageSequenceProps {
  frameCount: number;
  getFrameUrl: (index: number) => string;
  progress: number; // 0-1
  className?: string;
}

export default function ImageSequence({
  frameCount,
  getFrameUrl,
  progress,
  className,
}: ImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);

  useEffect(() => {
    const frames: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    const loaded: boolean[] = new Array(frameCount).fill(false);
    framesRef.current = frames;
    loadedRef.current = loaded;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        frames[i] = img;
        loaded[i] = true;
      };
      img.src = getFrameUrl(i);
    }
  }, [frameCount, getFrameUrl]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.min(
      Math.floor(progress * (framesRef.current.length - 1)),
      framesRef.current.length - 1
    );
    const img = framesRef.current[frameIndex];
    if (!img) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, [progress]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${styles.imageSequence} ${className || ""}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
