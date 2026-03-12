"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParticleDensity = "sparse" | "medium" | "dense";

interface Particle {
  x: number;
  y: number;
  speed: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface ThemeConfig {
  hueStart: number;
  hueRange: number;
  saturation: number;
  lightness: number;
  bg: string;
  trailAlpha: number;
}

interface FlowFieldProps {
  className?: string;
  children?: ReactNode;
  density?: ParticleDensity;
}

const PARTICLE_COUNTS: Record<ParticleDensity, number> = {
  sparse: 600,
  medium: 1200,
  dense: 2000,
};

const AURORA_THEME: ThemeConfig = {
  hueStart: 185,
  hueRange: 140,
  saturation: 90,
  lightness: 64,
  bg: "3, 3, 6",
  trailAlpha: 0.045,
};

function fieldAngle(x: number, y: number, t: number): number {
  const s = 0.0025;
  return (
    Math.sin(x * s + t * 0.0007) * Math.PI +
    Math.cos(y * s + t * 0.0005) * Math.PI +
    Math.sin((x + y) * s * 0.6 + t * 0.0009) * Math.PI * 0.6 +
    Math.cos((x - y) * s * 0.4 + t * 0.0006) * Math.PI * 0.4
  );
}

export default function FlowField({
  className,
  children,
  density = "medium",
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = AURORA_THEME;
    const count = PARTICLE_COUNTS[density];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = 0;
    let time = 0;
    let particles: Particle[] = [];

    const spawnParticle = (): Particle => {
      const maxLife = 200 + Math.floor(Math.random() * 300);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1.1 + Math.random() * 1.8,
        hue: cfg.hueStart + Math.random() * cfg.hueRange,
        life: Math.floor(Math.random() * maxLife),
        maxLife,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio ?? 1;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.fillStyle = `rgb(${cfg.bg})`;
      ctx.fillRect(0, 0, width, height);

      particles = Array.from({ length: Math.floor(count * 1.2) }, spawnParticle);
    };

    const render = () => {
      time += 1;

      ctx.fillStyle = `rgba(${cfg.bg}, ${cfg.trailAlpha})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, time);

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life += 1;

        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
          p.hue = cfg.hueStart + Math.random() * cfg.hueRange;
          continue;
        }

        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;

        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        const progress = p.life / p.maxLife;
        const fadeIn = Math.min(progress * 8, 1);
        const fadeOut = Math.min((1 - progress) * 6, 1);
        const alpha = fadeIn * fadeOut * 0.98;
        const hueMod = (p.hue + (angle / (Math.PI * 2)) * 70 + 360) % 360;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.55, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hueMod}, ${cfg.saturation}%, ${cfg.lightness}%, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[rgb(5,5,8)]",
        className
      )}
    >
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        ref={canvasRef}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_50%,transparent_24%,rgba(3,3,6,0.6)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(3,3,6,0.65)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(3,3,6,0.65)] to-transparent"
      />

      {children}
    </div>
  );
}
