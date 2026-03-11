import Masonry from "./Masonry";
import { FloatingPathsLayer } from "@/components/ui/background-paths";

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
    <section className="moments-section relative" aria-label="Gallery of past memories">
      <FloatingPathsLayer className="opacity-85" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="moments-title text-slate-900 dark:text-white">Gallery of Past Memories</h2>
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