"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeInView from "@/components/FadeInView";
import { useHackathon } from "@/context/HackathonContext";

const Timeline = () => {
    const { roundConfigs } = useHackathon();

    const formatTime = (h: number, m: number) => {
        const hh = h % 12 || 12;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const mm = m.toString().padStart(2, '0');
        return `${hh}:${mm} ${ampm}`;
    };

    const scheduleData = {
        day1: [
            { time: "09:30 – 10:30 AM", title: "Inauguration Ceremony", desc: "Grand opening with lighting of the lamp.", color: "#FFEE00" },
            { time: "10:30 AM – 01:30 PM", title: "Technical Paper Presentation", desc: "Students showcase their research and innovation.", color: "#FFEE00" },
            { time: "02:00 – 04:30 PM", title: "Code-A-Thon", desc: "Intense competitive programming challenge.", color: "#3B82F6" },
            { time: "04:30 – 06:30 PM", title: "Literary Quiz & Debates", desc: "Battle of wits and words.", color: "#FFEE00" },
        ],
        day2: [
            { time: "09:00 AM – 01:00 PM", title: "Sports Meet", desc: "Athletics and outdoor games competition.", color: "#FACC15" },
            { time: "01:00 – 03:00 PM", title: "E-Sports Tournament", desc: "Valorant and BGMI showdown.", color: "#F472B6" },
            { time: "03:30 – 06:00 PM", title: "Guest Lecture Series", desc: "Insights from industry experts.", color: "#BA45E8" },
        ],
        day3: [
            { time: "10:00 AM – 02:00 PM", title: "Art & Craft Expo", desc: "Exhibition of creative masterpieces.", color: "#BA45E8" },
            { time: "04:00 – 07:00 PM", title: "Cultural Fusion", desc: "Dance, Music, and Fashion Show.", color: "#A855F7" },
            { time: "07:30 – 09:00 PM", title: "Award Ceremony", desc: "Celebrating the winners of V-Chakra.", color: "#10B981" },
        ],
    };
    return (
        <section id="schedule" className="relative w-full py-24 bg-[#0B0114] overflow-hidden">
            {/* Crazy Background Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large Background Text */}
                <div className="absolute top-20 left-10 text-[20rem] font-kanit font-black text-white/[0.03] select-none leading-none rotate-12">
                    FEST
                </div>
                <div className="absolute bottom-20 right-10 text-[15rem] font-kanit font-black text-white/[0.02] select-none leading-none -rotate-12 translate-y-20">
                    2026
                </div>

                {/* Floating Mesh Gradients */}
                <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-[#62009B] opacity-10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00C8FF] opacity-5 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(98,0,155,0.05)_0%,transparent_70%)]" />

                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeInView>
                    <div className="text-center mb-16 space-y-2">
                        <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-[#FFEE00] font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
                            VIGNAN CHAKRA
                        </div>
                        <h2 className="text-[#FFEE00] font-kanit font-black text-5xl md:text-8xl italic uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,238,0,0.4)] leading-none">
                            FEST <span className="text-white">SCHEDULE</span>
                        </h2>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="h-[2px] w-12 bg-linear-to-r from-transparent to-[#BA45E8]" />
                            <p className="text-white/60 font-kanit text-lg tracking-[0.2em] uppercase">
                                Three Days of Grand Celebration
                            </p>
                            <div className="h-[2px] w-12 bg-linear-to-l from-transparent to-[#BA45E8]" />
                        </div>
                    </div>
                </FadeInView>

                {/* Day 1 Section */}
                <div className="mb-24">
                    <FadeInView>
                        <div className="flex flex-col items-center mb-16">
                            <div className="bg-[#FFEE00] text-[#62009B] font-kanit font-black px-8 py-3 rounded-full text-2xl rotate-[-2deg] shadow-[0_10px_20px_rgba(255,238,0,0.3)]">
                                DAY 1 – TECH & LITERARY
                            </div>
                        </div>
                    </FadeInView>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Central Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-[#FFEE00]/30 via-[#FFEE00]/10 to-transparent hidden md:block border-l border-dashed border-[#FFEE00]/30" />

                        <div className="space-y-8 md:space-y-0">
                            {scheduleData.day1.map((item, idx) => (
                                <TimelineBlock key={idx} {...item} index={idx} side={idx % 2 === 0 ? "left" : "right"} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Day 2 Section */}
                <div>
                    <FadeInView>
                        <div className="flex flex-col items-center mb-16">
                            <div className="bg-[#BA45E8] text-white font-kanit font-black px-8 py-3 rounded-full text-2xl rotate-[2deg] shadow-[0_10px_20px_rgba(186,69,232,0.3)]">
                                DAY 2 – SPORTS & WORKSHOPS
                            </div>
                        </div>
                    </FadeInView>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Central Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-[#BA45E8]/30 via-[#BA45E8]/10 to-transparent hidden md:block border-l border-dashed border-[#BA45E8]/30" />

                        <div className="space-y-8 md:space-y-0">
                            {scheduleData.day2.map((item, idx) => (
                                <TimelineBlock key={idx} {...item} index={idx} side={idx % 2 === 0 ? "left" : "right"} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Day 3 Section */}
                <div className="mt-24">
                    <FadeInView>
                        <div className="flex flex-col items-center mb-16">
                            <div className="bg-[#10B981] text-white font-kanit font-black px-8 py-3 rounded-full text-2xl rotate-[-2deg] shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                                DAY 3 – CULTURAL FINALE
                            </div>
                        </div>
                    </FadeInView>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Central Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-[#10B981]/30 via-[#10B981]/10 to-transparent hidden md:block border-l border-dashed border-[#10B981]/30" />

                        <div className="space-y-8 md:space-y-0">
                            {scheduleData.day3.map((item, idx) => (
                                <TimelineBlock key={idx} {...item} index={idx} side={idx % 2 === 0 ? "left" : "right"} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Shards */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#62009B] opacity-20 blur-[100px] rounded-full" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFEE00] opacity-10 blur-[100px] rounded-full" />
        </section>
    );
};

const TimelineBlock = ({ time, title, desc, color, index, side }: any) => {
    const isLeft = side === "left";

    return (
        <div className="flex flex-col md:flex-row items-center justify-center relative w-full mb-8 md:mb-0">
            {/* Desktop central dot */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-20 hidden md:block">
                <div
                    className="w-3 h-3 rounded-full border-2 bg-[#13001F] transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ borderColor: color }}
                >
                    <div className="absolute inset-0.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                </div>
            </div>

            {/* Left Side Container */}
            <div className="w-full md:w-1/2 flex md:justify-end md:pr-12 order-2 md:order-1">
                {isLeft ? (
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="w-full max-w-sm"
                    >
                        <TimelineCard time={time} title={title} desc={desc} color={color} />
                    </motion.div>
                ) : (
                    <div className="hidden md:block w-full" />
                )}
            </div>

            {/* Right Side Container */}
            <div className="w-full md:w-1/2 flex md:justify-start md:pl-12 order-3 md:order-2">
                {!isLeft ? (
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="w-full max-w-sm"
                    >
                        <TimelineCard time={time} title={title} desc={desc} color={color} />
                    </motion.div>
                ) : (
                    <div className="hidden md:block w-full" />
                )}
            </div>
        </div>
    );
};

const TimelineCard = ({ time, title, desc, color }: any) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 hover:translate-x-2 relative overflow-hidden group/card shadow-xl">
        {/* Time Label */}
        <span
            className="font-kanit font-bold text-xs tracking-widest mb-1 block transition-colors"
            style={{ color }}
        >
            {time}
        </span>

        <h3 className="text-white font-kanit font-black text-lg md:text-xl uppercase italic group-hover/card:text-white transition-colors">
            {title}
        </h3>

        <p className="text-white/50 font-poppins text-xs mt-1 leading-relaxed">
            {desc}
        </p>

        {/* Subtle Glow inside card */}
        <div
            className="absolute -right-4 -bottom-4 w-16 h-16 opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity"
            style={{ backgroundColor: color }}
        />
    </div>
);

export default Timeline;
