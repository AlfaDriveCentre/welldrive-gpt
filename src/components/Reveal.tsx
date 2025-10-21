
import React, { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * SSR-safe Reveal:
 * - Server-side (no window): render content visible so static HTML is populated.
 * - Client-side: apply a soft fade/translate animation.
 */
export default function Reveal({ className, children }: Props) {
  if (typeof window === "undefined") {
    return <div className={className}>{children}</div>;
  }

  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: React.CSSProperties = shown
    ? { opacity: 1, transform: "none", transition: "opacity 600ms ease, transform 600ms ease" }
    : { opacity: 0, transform: "translateY(12px)", transition: "opacity 600ms ease, transform 600ms ease" };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
