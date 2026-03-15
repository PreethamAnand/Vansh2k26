"use client";

import { useEffect, useState } from "react";
import Masonry from "./Masonry";
import { FloatingPathsLayer } from "@/components/ui/background-paths";

const GALLERY_HEIGHTS = [520, 360, 610, 430, 570, 390, 480, 640];

const allItems = Array.from({ length: 24 }, (_, index) => {
  const imageNumber = String(index + 1).padStart(3, "0");
  const imagePath = `/gallery/${imageNumber}.webp`;

  return {
    id: `moment-${imageNumber}`,
    img: imagePath,
    url: imagePath,
    height: GALLERY_HEIGHTS[index % GALLERY_HEIGHTS.length] ?? 480,
    alt: `Hackathon gallery image ${index + 1}`,
  };
});

export default function MomentsMarquee() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Render all 24 images on mobile now that Next.js native lazy loading handles it
  const items = allItems;

  return (
    <section className="moments-section relative" aria-label="Gallery">
      <FloatingPathsLayer className="relative z-10 opacity-85" />
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="moments-title text-white">Gallery</h2>
        <div className="pb-2">
          <Masonry
            items={items}
            ease="power4.out"
            duration={1.9}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={!isMobile}
            hoverScale={0.95}
            blurToFocus={!isMobile}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
