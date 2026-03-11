"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import styles from "./Masonry.module.css";

type MasonryItem = {
  id: string;
  img: string;
  url?: string;
  height: number;
  alt?: string;
};

type MasonryProps = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
};

type LayoutItem = MasonryItem & {
  x: number;
  y: number;
  w: number;
  h: number;
};

const COLUMN_QUERIES = ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)", "(min-width: 400px)"];
const COLUMN_VALUES = [5, 4, 3, 2];

function useMedia(queries: string[], values: number[], defaultValue: number) {
  const getValue = () => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const matchIndex = queries.findIndex((query) => window.matchMedia(query).matches);
    return values[matchIndex] ?? defaultValue;
  };

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQueries = queries.map((query) => window.matchMedia(query));
    const handler = () => setValue(getValue());

    handler();
    mediaQueries.forEach((mediaQuery) => mediaQuery.addEventListener("change", handler));

    return () => {
      mediaQueries.forEach((mediaQuery) => mediaQuery.removeEventListener("change", handler));
    };
  }, [defaultValue, queries, values]);

  return value;
}

function useMeasure() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return [ref, size] as const;
}

async function preloadImages(urls: string[]) {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.src = src;
          image.onload = () => resolve();
          image.onerror = () => resolve();
        }),
    ),
  );
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    let cancelled = false;

    preloadImages(items.map((item) => item.img)).then(() => {
      if (!cancelled) {
        setImagesReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  const { grid, gridHeight } = useMemo(() => {
    if (!width) {
      return { grid: [] as LayoutItem[], gridHeight: 0 };
    }

    const columnHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const nextGrid = items.map((item) => {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const x = columnWidth * columnIndex;
      const height = item.height / 2;
      const y = columnHeights[columnIndex];

      columnHeights[columnIndex] += height;

      return { ...item, x, y, w: columnWidth, h: height };
    });

    return {
      grid: nextGrid,
      gridHeight: Math.max(...columnHeights, 0),
    };
  }, [columns, items, width]);

  const getInitialPosition = (item: LayoutItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) {
      return { x: item.x, y: item.y };
    }

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions: MasonryProps["animateFrom"][] = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)] ?? "bottom";
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    if (!imagesReady || !containerRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const animationProps = {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        };

        if (!hasMounted.current) {
          const initialPosition = getInitialPosition(item);

          gsap.fromTo(
            selector,
            {
              opacity: 0,
              x: initialPosition.x,
              y: initialPosition.y,
              width: item.w,
              height: item.h,
              ...(blurToFocus ? { filter: "blur(10px)" } : {}),
            },
            {
              opacity: 1,
              ...animationProps,
              ...(blurToFocus ? { filter: "blur(0px)" } : {}),
              duration: 0.8,
              ease: "power3.out",
              delay: index * stagger,
            },
          );
        } else {
          gsap.to(selector, {
            ...animationProps,
            duration,
            ease,
            overwrite: "auto",
          });
        }
      });
    }, containerRef);

    hasMounted.current = true;
    return () => context.revert();
  }, [animateFrom, blurToFocus, containerRef, duration, ease, grid, imagesReady, stagger]);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.style.height = gridHeight ? `${gridHeight}px` : "";
  }, [gridHeight, containerRef]);

  const handleMouseEnter = (element: HTMLDivElement, item: LayoutItem) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector<HTMLElement>(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (element: HTMLDivElement, item: LayoutItem) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector<HTMLElement>(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className={styles.list}>
      {grid.map((item) => (
        <a
          key={item.id}
          data-key={item.id}
          className={styles.itemWrapper}
          href={item.url}
          target={item.url ? "_blank" : undefined}
          rel={item.url ? "noreferrer" : undefined}
          onMouseEnter={(event) => handleMouseEnter(event.currentTarget, item)}
          onMouseLeave={(event) => handleMouseLeave(event.currentTarget, item)}
        >
          <div className={styles.itemImage}>
            <Image
              src={item.img}
              alt={item.alt ?? "Gallery image"}
              fill
              sizes="(min-width: 1500px) 20vw, (min-width: 1000px) 25vw, (min-width: 600px) 33vw, 50vw"
              className={styles.itemPhoto}
            />
            {colorShiftOnHover ? <div className={styles.colorOverlay} /> : null}
          </div>
        </a>
      ))}
    </div>
  );
}