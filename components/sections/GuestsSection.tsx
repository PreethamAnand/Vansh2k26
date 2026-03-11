"use client";

import Image from "next/image";
import { useState } from "react";

const PANELS = [
  { id: "guest-1", label: "Chief Guest", name: "Speaker One", image: "/moments/moment-1.png" },
  { id: "guest-2", label: "Guest Of Honour", name: "Speaker Two", image: "/moments/moment-2.png" },
  { id: "guest-3", label: "Keynote Speaker", name: "Speaker Three", image: "/moments/moment-3.png" },
  { id: "guest-4", label: "Industry Expert", name: "Speaker Four", image: "/moments/moment-4.png" },
];

const GuestsSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
      <section id="guests" aria-label="Guest Speakers" className="relative overflow-hidden bg-[#04030a] py-16">
        {/* glow overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(123,35,255,0.18),transparent_40%),radial-gradient(circle_at_90%_40%,rgba(22,188,255,0.13),transparent_38%)]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <h2 className="mb-10 text-center font-kanit text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
            Guests
          </h2>

          {/* Panel strip */}
          <div className="flex h-[520px] w-full gap-2 overflow-hidden rounded-2xl border border-white/10 sm:h-[600px]">
            {PANELS.map((panel) => {
              const isActive = activeId === panel.id;
              return (
                <div
                  key={panel.id}
                  onMouseEnter={() => setActiveId(panel.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out"
                  style={{
                    flex: isActive ? "1.6" : "1",
                    minWidth: 0,
                  }}
                >
                  {/* Background image */}
                  <Image
                    src={panel.image}
                    alt={panel.name}
                    fill
                    sizes="(max-width: 768px) 25vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500" />

                  {/* Vertical label — shown when panel is not active */}
                  <div
                    className="absolute inset-y-0 left-0 flex w-full items-center justify-center transition-opacity duration-300"
                    style={{ opacity: isActive ? 0 : 1 }}
                  >
                    <p
                      className="font-kanit text-sm font-bold uppercase tracking-[0.2em] text-white/80"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                    >
                      {panel.label}
                    </p>
                  </div>

                  {/* Bottom info — shown when panel is active */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-6 transition-all duration-300"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(12px" }}
                  >
                    <span className="mb-1 block font-kanit text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      {panel.label}
                    </span>
                    <h3 className="font-kanit text-2xl font-black uppercase text-white">
                      {panel.name}
                    </h3>
                  </div>

                  {/* Cyan top accent line */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-violet-500 to-transparent transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};

export default GuestsSection;
