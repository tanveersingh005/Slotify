"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, delay = 0, duration = 0.5 }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all ease-out"
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? "translateY(0)" : "translateY(20px)",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
