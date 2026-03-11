import * as React from "react";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type ShimmerButtonProps = React.HTMLAttributes<HTMLDivElement>;

export function ShimmerButton({ className, children, ...props }: ShimmerButtonProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full border border-white/25 bg-white/[0.08] p-[1px] shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-y-[-30%] left-[-35%] w-[45%] rotate-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[240%]" />
      </div>
      <div className="relative inline-flex min-w-[9rem] items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] px-5 py-2 text-white transition-all duration-300 group-hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
        {children}
      </div>
    </div>
  );
}