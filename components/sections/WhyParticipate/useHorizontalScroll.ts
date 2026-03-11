import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollConfig {
  containerRef: RefObject<HTMLDivElement | null>;
  sliderRef: RefObject<HTMLDivElement | null>;
  cardCount: number;
}

export const useHorizontalScroll = ({
  containerRef,
  sliderRef,
  cardCount,
}: ScrollConfig) => {
  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      const totalSections = cardCount - 1;

      const getScrollAmount = () => {
        let sliderWidth = sliderRef.current!.scrollWidth;
        let containerWidth = containerRef.current!.offsetWidth;
        // Calculate the scroll amount to move the slider fully into view,
        // accounting for any potential padding/gaps that might be present
        // in the slider's children or container.
        // The goal is to scroll until the last item is visible at the end of the container.
        return -(sliderWidth - containerWidth);
      };

      const tween = gsap.to(sliderRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => "+=" + (sliderRef.current!.scrollWidth - containerRef.current!.offsetWidth),
          scrub: 0.2,
          snap: {
            snapTo: 1 / totalSections,
            duration: 0.2,
            delay: 0,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      // Force a refresh once everything is calculated
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, sliderRef, cardCount]);
};