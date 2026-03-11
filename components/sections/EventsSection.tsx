"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FloatingPathsLayer } from "@/components/ui/background-paths";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  image?: string;
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const FEATURE_DELAY_CLASSES = [
  "delay-[200ms]",
  "delay-[300ms]",
  "delay-[400ms]",
  "delay-[500ms]"
];

function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  image = "/events/singing.png"
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[320px] w-full max-w-[280px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-zinc-50 dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-800/50",
            "shadow-xs dark:shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="relative h-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/85" />
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-lg text-white leading-snug tracking-tighter transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-zinc-200 tracking-tight transition-all delay-[50ms] duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                    "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent"
                  )}
                />
                <ArrowRight className="group-hover/icon:translate-x-0.5 relative z-10 h-4 w-4 text-orange-300 transition-transform duration-300 group-hover/icon:scale-110" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-xs dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-zinc-900 leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] dark:text-white">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-600 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  className={cn(
                    "flex items-center gap-2 text-sm text-zinc-700 transition-all duration-500 dark:text-zinc-300",
                    FEATURE_DELAY_CLASSES[index] ?? "delay-[200ms]",
                    isFlipped
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-[10px] opacity-0"
                  )}
                  key={feature}
                >
                  <ArrowRight className="h-3 w-3 text-orange-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-zinc-200 border-t pt-6 dark:border-zinc-800">
            <div
              className={cn(
                "group/start relative",
                "flex items-center justify-between",
                "-m-3 rounded-xl p-3",
                "transition-all duration-300",
                "bg-gradient-to-r from-zinc-100 via-zinc-100 to-zinc-100",
                "dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800",
                "hover:from-0% hover:from-orange-500/10 hover:via-100% hover:via-orange-500/5 hover:to-100% hover:to-transparent",
                "dark:hover:from-0% dark:hover:from-orange-500/20 dark:hover:via-100% dark:hover:via-orange-500/10 dark:hover:to-100% dark:hover:to-transparent",
                "hover:scale-[1.02] hover:cursor-pointer"
              )}
            >
              <span className="font-medium text-sm text-zinc-900 transition-colors duration-300 group-hover/start:text-orange-600 dark:text-white dark:group-hover/start:text-orange-400">
                Start today
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    "absolute inset-[-6px] rounded-lg transition-all duration-300",
                    "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
                    "scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100"
                  )}
                />
                <ArrowRight className="relative z-10 h-4 w-4 text-orange-500 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const EVENTS: CardFlipProps[] = [
  {
    title: "SINGING",
    subtitle: "Entry Fee: Rs 199",
    description: "Coordinator: K. Sai Lalitya",
    features: ["Phone: 8374749942", "Solo Performance", "Stage Event", "Open Category"],
    image: "/events/singing.png"
  },
  {
    title: "DANCE SOLO",
    subtitle: "Entry Fee: Rs 199",
    description: "Coordinator: K. Sai Lalitya",
    features: ["Phone: 8374749942", "Solo Dance", "Stage Event", "Open Category"],
    image: "/events/Solodance.jpg.jpeg"
  },
  {
    title: "DANCE GROUP",
    subtitle: "Entry Fee: Rs 399",
    description: "Coordinator: J. Bhavani",
    features: ["Phone: 7013159259", "Group Performance", "Stage Event", "Team Dance"],
    image: "/events/GROUP.png"
  },
  {
    title: "BATTLE OF BANDS",
    subtitle: "Entry Fee: Rs 499",
    description: "Coordinator: K. Manjunadha Reddy",
    features: ["Phone: 9177639022", "Band Performance", "Live Music", "Stage Event"],
    image: "/events/BOB.jpg.jpeg"
  },
  {
    title: "PHOTOGRAPHY",
    subtitle: "Entry Fee: Rs 299",
    description: "Coordinator: M. Dheeraj",
    features: ["Phone: 9848981465", "Photo Contest", "Creative Theme", "Open Category"],
    image: "/events/photography.png"
  },
  {
    title: "SHORT FILM",
    subtitle: "Entry Fee: Rs 299",
    description: "Coordinators: B. Iswaryya, Ashmitha",
    features: ["B. Iswaryya: 9110546818", "Ashmitha: 6303566399", "Film Contest", "Open Category"],
    image: "/events/shortfilm.png"
  },
  {
    title: "MUN (MODEL UNITED NATIONS)",
    subtitle: "Team of 2 - Rs 299",
    description: "Model United Nations event",
    features: ["Team Size: 2", "Debate", "Diplomacy", "Committee Sessions"],
    image: "/events/MUN.png"
  },
  {
    title: "GAME ZONE (BGMI & FREE FIRE)",
    subtitle: "Team of 4 - Rs 599",
    description: "Coordinators: Srikanth Reddy, Hasini",
    features: ["Srikanth: 7382020763", "Hasini: 8790755516", "Team Size: 4", "Esports Battle"],
    image: "/events/gamezone.png"
  }
];

const EventsSection = () => {
  return (
    <section
      id="events"
      aria-label="Events"
      className="relative overflow-hidden py-16"
    >
      <FloatingPathsLayer className="opacity-80" />
      <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-center font-kanit text-5xl font-black uppercase tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
          Events
        </h2>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((event) => (
            <CardFlip key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
