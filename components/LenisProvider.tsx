"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";

// Exact from source: Lenis plugin — duration 0.8, quartic ease-out, feeds ScrollTrigger.update
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - (1 - t) ** 4,
    });
    lenisRef.current = instance;
    setLenis(instance);

    // Exact from source: smoothScroll.on("scroll", ScrollTrigger.update)
    import("gsap").then((gsapModule) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        const gsap = gsapModule.default || gsapModule.gsap;
        gsap.registerPlugin(ScrollTrigger);

        // Exact from source: lagSmoothing(0)
        gsap.ticker.lagSmoothing(0);

        instance.on("scroll", ScrollTrigger.update);
      });
    });

    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
