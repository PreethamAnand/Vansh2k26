"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    shockRadius?: number;
    shockStrength?: number;
    resistance?: number;
    returnDuration?: number;
}

export default function DotGrid({
    dotSize = 4,
    gap = 26,
    baseColor = "#4f7876",
    activeColor = "#00ff00",
    proximity = 270,
    shockRadius = 140,
    shockStrength = 5,
    resistance = 750,
    returnDuration = 1.5,
}: DotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cellSize = gap + dotSize;
        const cols = Math.ceil(canvas.width / cellSize) + 1;
        const rows = Math.ceil(canvas.height / cellSize) + 1;

        interface Dot {
            x: number;
            y: number;
            vx: number;
            vy: number;
            originalX: number;
            originalY: number;
            isActive: boolean;
        }

        const dots: Dot[] = [];

        // Initialize dots
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellSize + dotSize / 2;
                const y = row * cellSize + dotSize / 2;
                dots.push({
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    originalX: x,
                    originalY: y,
                    isActive: false,
                });
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.fillStyle = "#06000D";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mouse = mousePos.current;

            dots.forEach((dot) => {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < proximity) {
                    dot.isActive = true;
                    const angle = Math.atan2(dy, dx);
                    const force = (1 - distance / proximity) * shockStrength;
                    dot.vx -= Math.cos(angle) * force;
                    dot.vy -= Math.sin(angle) * force;
                } else {
                    dot.isActive = false;
                }

                // Apply resistance/friction
                dot.vx *= 0.94;
                dot.vy *= 0.94;

                // Return to original position
                const returnX = dot.originalX - dot.x;
                const returnY = dot.originalY - dot.y;
                const returnDist = Math.sqrt(returnX * returnX + returnY * returnY);

                if (returnDist > 0.1) {
                    const returnForce = returnDist / returnDuration;
                    dot.vx += (returnX / returnDist) * returnForce * 0.015;
                    dot.vy += (returnY / returnDist) * returnForce * 0.015;
                }

                dot.x += dot.vx;
                dot.y += dot.vy;

                // Draw dot
                const distToMouse = Math.sqrt(
                    (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
                );
                const intensity = Math.max(
                    0,
                    1 - distToMouse / proximity
                );

                if (intensity > 0) {
                    ctx.fillStyle = activeColor + Math.floor(intensity * 255).toString(16).padStart(2, "0");
                } else {
                    ctx.fillStyle = baseColor;
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dotSize, gap, baseColor, activeColor, proximity, shockStrength, resistance, returnDuration]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, opacity: 0.7 }}
        />
    );
}
