"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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

export default function Masonry({
  items,
  // duration and ease props are now handled via CSS classes if needed, 
  // but we'll default to the CSS transitions in the module.
  stagger = 0.05,
  scaleOnHover = true,
  hoverScale = 0.95,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const [containerRef, { width }] = useMeasure();

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

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.style.height = gridHeight ? `${gridHeight}px` : "";
  }, [gridHeight, containerRef]);

  return (
    <div ref={containerRef} className={styles.list}>
      {grid.map((item, index) => (
        <a
          key={item.id}
          className={styles.itemWrapper}
          href={item.url}
          target={item.url ? "_blank" : undefined}
          rel={item.url ? "noreferrer" : undefined}
          style={{
            transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
            width: item.w,
            height: item.h,
          } as React.CSSProperties}
        >
          <div 
            className={`${styles.itemImage} ${styles.itemEntrance}`}
            style={{
              animationDelay: `${index * stagger}s`,
            }}
          >
            <Image
              src={item.img}
              alt={item.alt ?? "Gallery image"}
              fill
              sizes="(min-width: 1500px) 20vw, (min-width: 1000px) 25vw, (min-width: 600px) 33vw, 50vw"
              className={styles.itemPhoto}
              style={{
                transition: "transform 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                if (scaleOnHover) e.currentTarget.style.transform = `scale(${hoverScale})`;
              }}
              onMouseLeave={(e) => {
                if (scaleOnHover) e.currentTarget.style.transform = `scale(1)`;
              }}
            />
            {colorShiftOnHover ? <div className={styles.colorOverlay} /> : null}
          </div>
        </a>
      ))}
    </div>
  );
}
