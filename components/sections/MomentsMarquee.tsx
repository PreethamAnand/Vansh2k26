import Masonry from "./Masonry";
import { FloatingPathsLayer } from "@/components/ui/background-paths";
import Galaxy from "@/components/Galaxy";

const GALLERY_HEIGHTS = [520, 360, 610, 430, 570, 390, 480, 640];

const items = Array.from({ length: 24 }, (_, index) => {
  const imageNumber = String(index + 1).padStart(3, "0");
  const imagePath = `/gallery/${imageNumber}.jpeg`;

  return {
    id: `moment-${imageNumber}`,
    img: imagePath,
    url: imagePath,
    height: GALLERY_HEIGHTS[index % GALLERY_HEIGHTS.length] ?? 480,
    alt: `Hackathon gallery image ${index + 1}`,
  };
});

export default function MomentsMarquee() {
  return (
    <section className="moments-section relative" aria-label="Gallery">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.7}
          glowIntensity={0.2}
          saturation={0.5}
          hueShift={260}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.7}
          speed={1.9}
        />
      </div>
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
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
