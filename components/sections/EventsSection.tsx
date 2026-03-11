"use client";

import { useRef } from "react";
import Image from "next/image";

type EventCard = {
  title: string;
  image: string;
};

type EventCategory = {
  key: string;
  title: string;
  glow: string;
  events: EventCard[];
};

const EVENT_GROUPS: EventCategory[] = [
  {
    key: "robotics",
    title: "Robotics",
    glow: "from-cyan-300/80 to-sky-400/80",
    events: [
      { title: "Armageddon", image: "/moments/moment-1.png" },
      { title: "Super Strikers", image: "/moments/moment-2.png" },
      { title: "Crawl-O-Tron", image: "/moments/moment-3.png" },
      { title: "ZenGrip", image: "/moments/moment-4.png" },
      { title: "Pulse Rider", image: "/moments/moment-5.png" }
    ]
  },
  {
    key: "code-combat",
    title: "Code Combat",
    glow: "from-emerald-300/80 to-cyan-300/80",
    events: [
      { title: "Inferno Coding Challenge", image: "/moments/moment-2.png" },
      { title: "Codefy Arena", image: "/moments/moment-5.png" },
      { title: "Neon Debug", image: "/moments/moment-1.png" },
      { title: "ByteByte", image: "/moments/moment-3.png" }
    ]
  },
  {
    key: "hack-hustle",
    title: "Hack Hustle",
    glow: "from-rose-300/80 to-pink-400/80",
    events: [
      { title: "AI Edge Agent", image: "/moments/moment-4.png" },
      { title: "Spectral Merge", image: "/moments/moment-3.png" },
      { title: "Claw & Shield", image: "/moments/moment-1.png" },
      { title: "ByteByte", image: "/moments/moment-2.png" },
      { title: "RLDX", image: "/moments/moment-5.png" }
    ]
  }
];

const EventsSection = () => {
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollRow = (key: string, direction: "left" | "right") => {
    const row = rowRefs.current[key];
    if (!row) {
      return;
    }

    row.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth"
    });
  };

  return (
    <section id="events" aria-label="Events Catalog" className="relative overflow-hidden bg-[#04030a] py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(123,35,255,0.2),transparent_38%),radial-gradient(circle_at_78%_18%,rgba(22,188,255,0.16),transparent_36%)]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-center font-kanit text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
          Events
        </h2>

        <div className="mt-12 space-y-10">
          {EVENT_GROUPS.map((group) => (
            <div key={group.key}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${group.glow}`} />
                  <h3 className="font-kanit text-xl font-bold uppercase tracking-wide text-zinc-100 sm:text-2xl">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-white/20" />
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => scrollRow(group.key, "left")}
                    aria-label={`Scroll ${group.title} left`}
                    className="grid h-8 w-8 place-items-center rounded-sm border border-white/20 bg-white/5 text-zinc-200 hover:bg-white/12"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRow(group.key, "right")}
                    aria-label={`Scroll ${group.title} right`}
                    className="grid h-8 w-8 place-items-center rounded-sm border border-white/20 bg-white/5 text-zinc-200 hover:bg-white/12"
                  >
                    +
                  </button>
                </div>
              </div>

              <div
                ref={(node) => {
                  rowRefs.current[group.key] = node;
                }}
                className="custom-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
              >
                {group.events.map((event) => (
                  <article
                    key={event.title}
                    className="group relative w-[160px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-[#121029] to-[#07060f] sm:w-[180px]"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/85" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-center font-kanit text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-100">
                        {event.title}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
