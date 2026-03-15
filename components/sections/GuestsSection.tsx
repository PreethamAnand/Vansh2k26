"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: "celebrity-1",
    title: "NAG ASHWIN",
  },
  {
    id: "celebrity-2",
    title: "PRADEEP MACHIRAJU",
  },
  {
    id: "celebrity-3",
    title: "RAM MIRYALA",
  },
  {
    id: "celebrity-4",
    title: "PRITHVI SAI",
  },
];

const MOBILE_CARD_STYLES = ["-rotate-2 mt-3", "rotate-2 mt-0", "-rotate-1 mt-4", "rotate-1 mt-1"];

const GuestsSection = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-10">
      <div className="relative z-20 mx-auto mb-4 mt-2 max-w-[1400px]">
        <h2 className="text-left font-kanit text-3xl font-black uppercase italic tracking-[0.2em] text-white drop-shadow-md sm:text-4xl">
          EVENT CELEBRITIES
        </h2>
        <div className="mt-1 h-1 w-20 rounded-full bg-[#D4AF37]/60" />
      </div>

      <div className="relative z-10 mx-auto flex h-[340px] max-w-[1400px] snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 sm:grid sm:h-[60vh] sm:min-h-[400px] sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`group relative h-full w-[72vw] max-w-[280px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-xl border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 ${MOBILE_CARD_STYLES[index % MOBILE_CARD_STYLES.length]} sm:h-full sm:w-full sm:max-w-none sm:shrink sm:snap-none sm:rotate-0 sm:mt-0`}
          >
            <div className="absolute left-1 top-1 z-30 h-6 w-6 opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] sm:left-2 sm:top-2 sm:h-10 sm:w-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  d="M10 50C10 27.9086 27.9086 10 50 10M10 10L30 10M10 10L10 30M20 20C20 14.4772 14.4772 20 10 20M20 20C25.5228 20 20 14.4772 20 10"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="2.5" fill="#D4AF37" />
              </svg>
            </div>
            <div className="absolute right-1 top-1 z-30 h-6 w-6 opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] sm:right-2 sm:top-2 sm:h-10 sm:w-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full rotate-90"
              >
                <path
                  d="M10 50C10 27.9086 27.9086 10 50 10M10 10L30 10M10 10L10 30M20 20C20 14.4772 14.4772 20 10 20M20 20C25.5228 20 20 14.4772 20 10"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="absolute bottom-1 left-1 z-30 h-6 w-6 opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] sm:bottom-2 sm:left-2 sm:h-10 sm:w-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full -rotate-90"
              >
                <path
                  d="M10 50C10 27.9086 27.9086 10 50 10M10 10L30 10M10 10L10 30M20 20C20 14.4772 14.4772 20 10 20M20 20C25.5228 20 20 14.4772 20 10"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="absolute bottom-1 right-1 z-30 h-6 w-6 opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] sm:bottom-2 sm:right-2 sm:h-10 sm:w-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full rotate-180"
              >
                <path
                  d="M10 50C10 27.9086 27.9086 10 50 10M10 10L30 10M10 10L10 30M20 20C20 14.4772 14.4772 20 10 20M20 20C25.5228 20 20 14.4772 20 10"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
              <p className="font-kanit text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 drop-shadow-[0_0_20px_rgba(186,69,232,0.5)] sm:text-sm">
                Revealing Soon
              </p>
              <div className="mt-2 h-[1px] w-10 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent sm:w-16" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GuestsSection;
