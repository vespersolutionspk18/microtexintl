// Exact from source: shared bezier curve segments used by VoltageInstabilityChart and PeakDemandChart
export type CurveSegment =
  | { type: "C"; start: { x: number; y: number }; cp1: { x: number; y: number }; cp2: { x: number; y: number }; end: { x: number; y: number } }
  | { type: "L"; start: { x: number; y: number }; end: { x: number; y: number } };

export const CURVE_SEGMENTS: CurveSegment[] = [
  { type: "C", start: { x: 0, y: 77.0366 }, cp1: { x: 0, y: 77.0366 }, cp2: { x: 15.5979, y: 98.9555 }, end: { x: 34.1693, y: 100.918 } },
  { type: "C", start: { x: 34.1693, y: 100.918 }, cp1: { x: 52.7406, y: 102.881 }, cp2: { x: 66.5, y: 85.0059 }, end: { x: 66.5, y: 85.0059 } },
  { type: "L", start: { x: 66.5, y: 85.0059 }, end: { x: 77.9967, y: 66.2381 } },
  { type: "C", start: { x: 77.9967, y: 66.2381 }, cp1: { x: 77.9967, y: 66.2381 }, cp2: { x: 84.6815, y: 58.7708 }, end: { x: 89.5106, y: 54.6533 } },
  { type: "C", start: { x: 89.5106, y: 54.6533 }, cp1: { x: 94.3397, y: 50.5358 }, cp2: { x: 110.683, y: 47.9167 }, end: { x: 113.656, y: 47.9167 } },
  { type: "C", start: { x: 113.656, y: 47.9167 }, cp1: { x: 116.63, y: 47.9167 }, cp2: { x: 122.942, y: 51.1859 }, end: { x: 128.882, y: 49.8795 } },
  { type: "C", start: { x: 128.882, y: 49.8795 }, cp1: { x: 134.821, y: 48.573 }, cp2: { x: 138.392, y: 48.7525 }, end: { x: 143.27, y: 47.347 } },
  { type: "C", start: { x: 143.27, y: 47.347 }, cp1: { x: 148.149, y: 45.9415 }, cp2: { x: 150.806, y: 44.5359 }, end: { x: 154.081, y: 41.8054 } },
  { type: "C", start: { x: 154.081, y: 41.8054 }, cp1: { x: 157.357, y: 39.0748 }, cp2: { x: 162.06, y: 37.5083 }, end: { x: 165.427, y: 36.4185 } },
  { type: "C", start: { x: 165.427, y: 36.4185 }, cp1: { x: 168.794, y: 35.3288 }, cp2: { x: 179.429, y: 32.3567 }, end: { x: 185.017, y: 27.9048 } },
  { type: "C", start: { x: 185.017, y: 27.9048 }, cp1: { x: 190.606, y: 23.4529 }, cp2: { x: 204.165, y: 13.6142 }, end: { x: 204.165, y: 13.6142 } },
  { type: "C", start: { x: 204.165, y: 13.6142 }, cp1: { x: 204.165, y: 13.6142 }, cp2: { x: 206.822, y: 11.5833 }, end: { x: 207.975, y: 9.47808 } },
  { type: "C", start: { x: 207.975, y: 9.47808 }, cp1: { x: 209.128, y: 7.37288 }, cp2: { x: 213.556, y: 0.5 }, end: { x: 218.61, y: 0.5 } },
  { type: "C", start: { x: 218.61, y: 0.5 }, cp1: { x: 223.664, y: 0.5 }, cp2: { x: 232.085, y: 7.60816 }, end: { x: 233.948, y: 9.24279 } },
  { type: "C", start: { x: 233.948, y: 9.24279 }, cp1: { x: 235.811, y: 10.8774 }, cp2: { x: 244.759, y: 18.611 }, end: { x: 247.599, y: 22.9824 } },
  { type: "C", start: { x: 247.599, y: 22.9824 }, cp1: { x: 250.439, y: 27.3538 }, cp2: { x: 265.052, y: 54.6471 }, end: { x: 265.052, y: 54.6471 } },
  { type: "L", start: { x: 265.052, y: 54.6471 }, end: { x: 281.993, y: 88.6276 } },
];

// Exact from source: convert segments to point array
export function buildCurvePoints(segments: CurveSegment[]): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  segments.forEach((seg) => {
    if (seg.type === "L") {
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        points.push({
          x: seg.start.x + (seg.end.x - seg.start.x) * t,
          y: seg.start.y + (seg.end.y - seg.start.y) * t,
        });
      }
    } else if (seg.type === "C") {
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const u = 1 - t;
        points.push({
          x: u * u * u * seg.start.x + 3 * u * u * t * seg.cp1.x + 3 * u * t * t * seg.cp2.x + t * t * t * seg.end.x,
          y: u * u * u * seg.start.y + 3 * u * u * t * seg.cp1.y + 3 * u * t * t * seg.cp2.y + t * t * t * seg.end.y,
        });
      }
    }
  });
  return points;
}

// Exact from source: theme-to-background-color map
export const THEME_BG = new Map([
  ["black", "#000"],
  ["dark-grey", "#202020"],
  ["charcoal", "#323232"],
  ["yellow", "#fff313"],
]);
