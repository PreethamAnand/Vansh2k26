import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const join = (...classes: Array<string | undefined>) =>
	classes.filter(Boolean).join(" ");

const Card = React.forwardRef<HTMLDivElement, DivProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={join(
				"rounded-2xl border border-white/20 bg-black/45 text-white shadow-[0_24px_60px_-26px_rgba(0,0,0,0.8)] backdrop-blur-md",
				className,
			)}
			{...props}
		/>
	),
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, DivProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={join("p-6", className)} {...props} />
	),
);
CardContent.displayName = "CardContent";

const CardTitle = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={join("text-lg font-semibold leading-tight", className)}
			{...props}
		/>
	),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
	({ className, ...props }, ref) => (
		<p ref={ref} className={join("text-sm leading-relaxed text-white/80", className)} {...props} />
	),
);
CardDescription.displayName = "CardDescription";

export { Card, CardContent, CardDescription, CardTitle };