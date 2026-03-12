"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { ShimmerButton } from "@/registry/magicui/shimmer-button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
];

export default function GlassNavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "border-b border-white/10 bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "bg-black/30 backdrop-blur-md"
        }
      `}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/vansh_logo.PNG"
            alt="VANSH 2K26"
            width={56}
            height={56}
            className="h-12 w-auto object-contain"
            priority
          />
          <Image
            src="/vignan-logo.png"
            alt="Vignan's Institute of Information Technology"
            width={120}
            height={40}
            className="h-9 w-auto object-contain brightness-0 invert hidden sm:block"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  font-kanit text-sm font-semibold uppercase tracking-wider transition-all duration-200
                  ${isActive ? "text-white" : "text-white/55 hover:text-white"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Portal Button */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-flex active:scale-95 transition-transform duration-200"
          >
            <ShimmerButton className="shadow-2xl">
              <span className="text-center font-kanit text-sm leading-none font-medium uppercase tracking-tight whitespace-pre-wrap text-white lg:text-base dark:from-white dark:to-slate-900/10">
                Login
              </span>
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center md:hidden text-white/80 hover:text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          overflow-hidden transition-all duration-300 md:hidden
          border-t border-white/10 bg-black/70 backdrop-blur-xl
          ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 font-kanit text-sm font-semibold uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex justify-center"
          >
            <ShimmerButton className="w-full shadow-2xl">
              <span className="text-center font-kanit text-sm leading-none font-medium uppercase tracking-tight whitespace-pre-wrap text-white dark:from-white dark:to-slate-900/10">
                Login
              </span>
            </ShimmerButton>
          </Link>
        </nav>
      </div>
    </header>
  );
}
