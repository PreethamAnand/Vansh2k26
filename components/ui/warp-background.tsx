"use client";

import React from "react";
import { motion } from "framer-motion";

interface WarpBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	perspective?: number;
	beamsPerSide?: number;
	beamSize?: number;
	beamDelayMax?: number;
	beamDelayMin?: number;
	beamDuration?: number;
	gridColor?: string;
}

type BeamConfig = {
	x: number;
	delay: number;
	hue: number;
	aspectRatio: number;
};

const join = (...classes: Array<string | undefined>) =>
	classes.filter(Boolean).join(" ");

const createBeams = (
	beamsPerSide: number,
	beamSize: number,
	beamDelayMax: number,
	beamDelayMin: number,
): BeamConfig[] => {
	const beams: BeamConfig[] = [];
	const cellsPerSide = Math.max(1, Math.floor(100 / beamSize));
	const step = cellsPerSide / Math.max(1, beamsPerSide);

	for (let i = 0; i < beamsPerSide; i++) {
		const x = Math.floor(i * step) * beamSize;
		const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
		const hue = Math.floor(Math.random() * 360);
		const aspectRatio = Math.floor(Math.random() * 10) + 1;
		beams.push({ x, delay, hue, aspectRatio });
	}

	return beams;
};

const Beam = ({
	x,
	width,
	delay,
	duration,
	hue,
	aspectRatio,
}: {
	x: number;
	width: number;
	delay: number;
	duration: number;
	hue: number;
	aspectRatio: number;
}) => (
	<motion.div
		style={{
			left: `${x}%`,
			width: `${width}%`,
			aspectRatio: `1 / ${aspectRatio}`,
			background: `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
		}}
		className="absolute top-0"
		initial={{ y: "100cqmax", x: "-50%" }}
		animate={{ y: "-100%", x: "-50%" }}
		transition={{
			duration,
			delay,
			repeat: Number.POSITIVE_INFINITY,
			ease: "linear",
		}}
	/>
);

export function WarpBackground({
	children,
	perspective = 100,
	className,
	beamsPerSide = 3,
	beamSize = 5,
	beamDelayMax = 3,
	beamDelayMin = 0,
	beamDuration = 3,
	gridColor = "rgba(255,255,255,0.2)",
	...props
}: WarpBackgroundProps) {
	const [mounted, setMounted] = React.useState(false);
	const [topBeams, setTopBeams] = React.useState<BeamConfig[]>([]);
	const [rightBeams, setRightBeams] = React.useState<BeamConfig[]>([]);
	const [bottomBeams, setBottomBeams] = React.useState<BeamConfig[]>([]);
	const [leftBeams, setLeftBeams] = React.useState<BeamConfig[]>([]);

	React.useEffect(() => {
		setTopBeams(createBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin));
		setRightBeams(createBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin));
		setBottomBeams(createBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin));
		setLeftBeams(createBeams(beamsPerSide, beamSize, beamDelayMax, beamDelayMin));
		setMounted(true);
	}, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

	return (
		<div
			className={join("relative overflow-hidden rounded border p-20", className)}
			{...props}
		>
			<div className="pointer-events-none absolute inset-0 overflow-hidden [clip-path:inset(0)] [perspective:100px] [transform-style:preserve-3d]">
				{/* Top beams */}
				<div className="absolute left-0 top-0 z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] bg-[linear-gradient(rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_-0.5px_/5%_5%,linear-gradient(90deg,rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_50%_/5%_5%] [transform:rotateX(-90deg)] [transform-style:preserve-3d]">
					{mounted && topBeams.map((beam, index) => (
						<Beam
							key={`top-${index}`}
							x={beam.x}
							width={beamSize}
							delay={beam.delay}
							duration={beamDuration}
							hue={beam.hue}
							aspectRatio={beam.aspectRatio}
						/>
					))}
				</div>

				{/* Bottom beams */}
				<div className="absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] bg-[linear-gradient(rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_-0.5px_/5%_5%,linear-gradient(90deg,rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_50%_/5%_5%] [transform:rotateX(-90deg)] [transform-style:preserve-3d]">
					{mounted && bottomBeams.map((beam, index) => (
						<Beam
							key={`bottom-${index}`}
							x={beam.x}
							width={beamSize}
							delay={beam.delay}
							duration={beamDuration}
							hue={beam.hue}
							aspectRatio={beam.aspectRatio}
						/>
					))}
				</div>

				{/* Left beams */}
				<div className="absolute left-0 top-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] bg-[linear-gradient(rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_-0.5px_/5%_5%,linear-gradient(90deg,rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_50%_/5%_5%] [transform:rotate(90deg)_rotateX(-90deg)] [transform-style:preserve-3d]">
					{mounted && leftBeams.map((beam, index) => (
						<Beam
							key={`left-${index}`}
							x={beam.x}
							width={beamSize}
							delay={beam.delay}
							duration={beamDuration}
							hue={beam.hue}
							aspectRatio={beam.aspectRatio}
						/>
					))}
				</div>

				{/* Right beams */}
				<div className="absolute right-0 top-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] bg-[linear-gradient(rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_-0.5px_/5%_5%,linear-gradient(90deg,rgba(255,255,255,0.2)_0_1px,transparent_1px_5%)_50%_50%_/5%_5%] [transform:rotate(-90deg)_rotateX(-90deg)] [transform-style:preserve-3d]">
					{mounted && rightBeams.map((beam, index) => (
						<Beam
							key={`right-${index}`}
							x={beam.x}
							width={beamSize}
							delay={beam.delay}
							duration={beamDuration}
							hue={beam.hue}
							aspectRatio={beam.aspectRatio}
						/>
					))}
				</div>
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	);
}