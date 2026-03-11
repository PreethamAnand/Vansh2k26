"use client";

import { useState, useEffect } from "react";

interface HeroTimerProps {
    targetDate: string;
}

const HeroTimer = ({ targetDate }: HeroTimerProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const calculateTimeLeft = () => {
            // Assume start time is 09:00 AM on the target date
            const difference = +new Date(`${targetDate}T09:00:00`) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isMounted) return null;

    const TimeBlock = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px]">
            <div
                className="w-full py-3 sm:py-4 flex items-center justify-center mb-2 rounded-xl border border-white/10"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    boxShadow: "0 4px 24px rgba(98,0,155,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
            >
                <span className="text-3xl sm:text-5xl font-black font-kanit tracking-tight leading-none tabular-nums text-[#FFEE00]">
                    {value < 10 ? `0${value}` : value}
                </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40">
                {label}
            </span>
        </div>
    );

    const Separator = () => (
        <div className="flex flex-col items-center justify-start pt-2 sm:pt-3 h-full">
            <span className="text-2xl sm:text-4xl font-black text-white/20 animate-pulse">:</span>
        </div>
    );

    return (
        <div className="relative inline-block group hover:-translate-y-1 transition-transform duration-300">
            {/* Glow shadow */}
            <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                style={{ background: "radial-gradient(ellipse at center, #62009B 0%, transparent 70%)" }}
            />

            {/* Main Card */}
            <div
                className="relative border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center backdrop-blur-xl"
                style={{
                    background: "linear-gradient(135deg, rgba(98,0,155,0.35) 0%, rgba(11,1,20,0.9) 100%)",
                    boxShadow: "0 8px 40px rgba(98,0,155,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                }}
            >
                {/* top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#FFEE00]/50 to-transparent" />

                <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                    <TimeBlock value={timeLeft.days} label="Days" />
                    <Separator />
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <Separator />
                    <TimeBlock value={timeLeft.minutes} label="Mins" />
                    <Separator />
                    <TimeBlock value={timeLeft.seconds} label="Secs" />
                </div>
            </div>
        </div>
    );
};

export default HeroTimer;
