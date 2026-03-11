"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHorizontalScroll } from "./useHorizontalScroll";
import { ScrollingBackground } from "./ScrollingBackground";

//image imports
import bg from "./assets/bg.png";
import whyParticipate from "./assets/why-paricipate.svg";
// import vh2 from "@/public/vh_2.0.png"; // Removed hackathon branding
import collab from "./assets/collab.png";
import shards from "./assets/stats-bottom.svg"
import mentorship from "./assets/mentorship.png";

import alert from "./assets/Alert.svg";
import scrollDown from "./assets/scroll-down.svg";
import crack from "./assets/crack.svg"
import brokenNormal from "./assets/brokenNormal.svg"

export default function WhyParticipate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll({
    containerRef,
    sliderRef,
    cardCount: 2,
  });

  return (
    <div className="w-full min-h-fit z-10 gap-0 flex-col justify-start flex -mt-12 sm:-mt-16" ref={containerRef}>
      <div
        className="relative w-full flex flex-row items-center justify-center shrink-0 -mb-12 max-sm:-mb-10 gap-2 pt-6 pb-2"
        style={{
          background: "#13001F",
        }}
      >
        <Image
          src={whyParticipate}
          alt="Why Participate?"
          className="relative inline-block w-[55%] z-10 max-sm:w-[75%]"
        />
        <div className="relative hidden sm:flex items-center justify-center z-20 w-[25%] aspect-video bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md rotate-3 shadow-2xl">
          <span className="font-kanit font-black text-[#FFEE00] italic text-2xl uppercase tracking-tighter">V-CHAKRA</span>
        </div>
      </div>
      {/*Scroll ref*/}
      <section
        className="relative min-h-[350px] w-full h-[55vh] overflow-hidden border-t-white border-t-8 border-b-white border-b-8 p-0 max-sm:h-[380px]"
        style={{
          background: "linear-gradient(180deg, #8A00DA 0%, #BA45E8 100%)",
        }}

      >
        <div className="sm:hidden absolute top-4 right-5 z-20 flex items-center justify-center bg-white/5 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-md rotate-3 animate-pulse-subtle">
           <span className="font-kanit font-black text-[#FFEE00] italic text-xs uppercase tracking-tighter">V-CHAKRA</span>
        </div>

        {/* Animated texture*/}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Background Texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "url('/bg%20texture%20prizes.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <Image
            src={shards}
            alt=""
            className="absolute -top-32 left-0 w-full opacity-15 rotate-12 scale-125"
          />
          <Image
            src={shards}
            alt=""
            className="absolute -bottom-32 right-0 w-full opacity-15 -rotate-12 scale-125"
          />

          <ScrollingBackground
            imageUrl="/HbSmallLogo.svg"
            speed={12}
            direction="diagonal"
            backgroundSize="80px"
          />
        </div>

        <div
          ref={sliderRef}
          className="relative z-10 h-full flex flex-row items-center pl-[25vw] pr-[25vw] max-sm:pl-[5vw] max-sm:pr-[5vw]"
        >
          <div className="relative w-[45vw] h-full shrink-0 flex flex-col items-center justify-center p-4 z-20 max-sm:w-[85vw]">
            <Image src={collab} alt="collaborate" className="inline-block scale-90 max-sm:scale-100" />
          </div>

          <div className="relative w-[45vw] h-full shrink-0 flex flex-col items-center justify-center p-4 max-sm:w-[85vw]">
            <Image src={mentorship} alt="mentorship" className="inline-block scale-90 max-sm:scale-100" />
          </div>

        </div>
        <Image
          src={scrollDown}
          alt="scroll down"
          className="absolute left-1/2 z-30 bottom-5 w-[38px] h-[42px] animate-bounce"
        />
      </section>
    </div>
  );

}