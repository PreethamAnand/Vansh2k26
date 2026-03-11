"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ScrollingBackgroundProps {
  imageUrl: string;
  direction?: "left" | "right" | "diagonal"; // Added some spicy options
  speed?: number; // Duration in seconds
  backgroundSize?: string;
}

export const ScrollingBackground = ({
  imageUrl,
  direction = "diagonal",
  speed = 60,
  backgroundSize = "auto",
}: ScrollingBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgSize, setBgSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setBgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!containerRef.current || !bgSize) return;

    let xEnd = 0;
    let yEnd = 0;

    if (direction === "diagonal") {
      xEnd = bgSize.w;
      yEnd = bgSize.h;
    } else if (direction === "left") {
      xEnd = bgSize.w;
    } else if (direction === "right") {
      xEnd = -bgSize.w;
    }

    const ctx = gsap.context(() => {
      // If backgroundSize is '80px', we should move by 80px to ensure a seamless loop
      const tileSize = parseInt(backgroundSize) || (bgSize?.w || 100);

      let xMove = 0;
      let yMove = 0;

      if (direction === "diagonal") {
        xMove = tileSize;
        yMove = tileSize;
      } else if (direction === "left") {
        xMove = tileSize;
      } else if (direction === "right") {
        xMove = -tileSize;
      }

      gsap.to(containerRef.current, {
        backgroundPosition: `${xMove}px ${yMove}px`,
        ease: "none",
        repeat: -1,
        duration: speed,
        overwrite: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bgSize, direction, speed]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: backgroundSize,
        opacity: 0.15,
      }}
    />
  );
};