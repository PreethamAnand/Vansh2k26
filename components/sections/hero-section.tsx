"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import LightRays from "@/components/LightRays";

// const SPONSORS = [
//   { src: "/college-logo.png", alt: "Vignan ITS", width: 32 },
//   { src: "/vignanians-logo.png", alt: "Vignanians", width: 32 },
//   { src: "/cloudflare.png", alt: "Cloudflare", width: 32 },
//   { src: "/mongodb.png", alt: "MongoDB", width: 32 },
//   { src: "/thedevarmy.png", alt: "The Dev Army", width: 32 },
// ];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src="/HEROBG.jpg"
          alt="VANSH 2K26"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Progressive dark overlay — edges darker, center visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* ── LightRays WebGL overlay ── */}
      <div className="absolute inset-0 z-[5]">
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#d7a3cc"
          raysSpeed={3}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={2}
          saturation={0.6}
        />
      </div>

      {/* ── Content — vertically centered ── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">

        {/* Translucent glass panel behind text */}
        <div className="mb-0 w-full max-w-3xl rounded-2xl border border-white/10 bg-black/35 px-8 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-12 sm:py-12">

          {/* Headline */}
          <div className="mb-6">
            <h1 className="font-kanit leading-tight text-white">
              <span className="block text-3xl font-semibold text-white/80 sm:text-4xl lg:text-5xl">
                The Ultimate Stage for
              </span>
              <span className="block text-5xl font-black uppercase sm:text-6xl lg:text-8xl">
                Talent &amp; Culture
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="mb-10 max-w-2xl text-sm font-medium leading-relaxed text-white/65 sm:text-base lg:text-lg">
            From electrifying performances to thrilling competitions, VANSH 2K26 is where passion,
            creativity, and celebration come alive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="
                inline-flex items-center rounded-full
                border border-white bg-white px-7 py-2.5
                font-kanit text-sm font-bold uppercase tracking-wider text-black
                transition-all duration-300 hover:bg-white/90
                active:scale-95
              "
            >
              Register Now
            </Link>
            <Link
              href="/#schedule"
              className="
                inline-flex items-center
                font-kanit text-sm font-semibold uppercase tracking-wider text-white/80
                transition-all duration-300 hover:text-white
                active:scale-95
              "
            >
              View Schedule →
            </Link>
          </div>

        </div>


        {/* Sponsor / Partner Logos */}
        {/* <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {SPONSORS.map((s) => (
            <div key={s.alt} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.width}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
              <span className="font-kanit text-sm font-semibold tracking-wide text-white">
                {s.alt}
              </span>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default Hero;
