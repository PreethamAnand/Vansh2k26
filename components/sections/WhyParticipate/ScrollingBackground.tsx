"use client";

import { useEffect, useState } from "react";

interface ScrollingBackgroundProps {
  imageUrl: string;
  direction?: "left" | "right" | "diagonal";
  speed?: number; // Duration in seconds
  backgroundSize?: string;
}

export const ScrollingBackground = ({
  imageUrl,
  direction = "diagonal",
  speed = 60,
  backgroundSize = "auto",
}: ScrollingBackgroundProps) => {
  const [bgSize, setBgSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setBgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
  }, [imageUrl]);

  if (!bgSize) return <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: "repeat", backgroundSize }} />;

  const tileSize = parseInt(backgroundSize) || bgSize.w;
  
  let xMove = 0;
  let yMove = 0;
  if (direction === "diagonal") { xMove = tileSize; yMove = tileSize; }
  else if (direction === "left") { xMove = tileSize; }
  else if (direction === "right") { xMove = -tileSize; }

  const animationName = `scroll-${direction}-${tileSize}`;

  return (
    <>
      <style jsx>{`
        @keyframes ${animationName} {
          from { background-position: 0 0; }
          to { background-position: ${xMove}px ${yMove}px; }
        }
        .scrolling-bg {
          animation: ${animationName} ${speed}s linear infinite;
        }
      `}</style>
      <div
        className="absolute inset-0 pointer-events-none scrolling-bg"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: backgroundSize,
          opacity: 0.15,
        }}
      />
    </>
  );
};