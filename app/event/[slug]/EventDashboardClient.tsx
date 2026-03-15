"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
    MapPin,
    Users,
    Ticket,
    ArrowLeft,
    Phone,
    ChevronRight,
    Star,
    Zap,
} from "lucide-react";
import type { EventData } from "@/lib/eventData";


const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
    }),
};

export default function EventDashboardClient({ event }: { event: EventData }) {
    return (
        <main
            className="min-h-screen bg-[#06000D] text-white overflow-x-hidden"
            style={{ fontFamily: "'Kanit', sans-serif" }}
        >
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute -top-32 left-1/4 w-[640px] h-[640px] rounded-full blur-[120px] opacity-40"
                    style={{ background: event.glow.replace("0.22", "0.35") }}
                />
                <div
                    className="absolute top-1/2 -right-40 w-[480px] h-[480px] rounded-full blur-[140px] opacity-20"
                    style={{ background: event.glow }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[160px] opacity-15"
                    style={{ background: event.glow }}
                />
            </div>


            <div
                className="relative z-10 min-h-[88vh] flex items-end pb-16 pt-20 px-6 md:px-14 lg:px-20"
                style={{ background: event.gradient }}
            >
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="absolute top-16 left-6 md:left-14 lg:left-20"
                >
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-black text-white/40 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={13} />
                        All Events
                    </Link>
                </motion.div>

                <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:gap-14">
                    <div className="min-w-0">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={1}
                            className="mb-5"
                        >
                            <span
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border"
                                style={{
                                    color: event.accent,
                                    borderColor: `${event.accent}55`,
                                    background: `${event.accent}12`,
                                }}
                            >
                                <Zap size={11} />
                                {event.category}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={2}
                            className="font-[950] uppercase italic tracking-[-0.06em] leading-[0.84] mb-4"
                            style={{
                                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                                WebkitTextStroke: "1px transparent",
                            }}
                        >
                            <span
                                style={{
                                    background: `linear-gradient(135deg, #ffffff 40%, ${event.accent} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {event.title}
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={3}
                            className="text-white/55 font-extrabold uppercase italic tracking-widest text-lg md:text-xl max-w-xl mb-10"
                        >
                            {event.subtitle}
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={4}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href={`/event/${event.slug}/register`}
                                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm text-[#06000D] shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97]"
                                style={{
                                    background: `linear-gradient(135deg, ${event.accent} 0%, #ffffff88 200%)`,
                                    backgroundColor: event.accent,
                                    boxShadow: `0 8px 32px ${event.glow}`,
                                }}
                            >
                                Register Now
                                <ChevronRight size={16} />
                            </Link>
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 transition-all"
                            >
                                <Phone size={14} style={{ color: event.accent }} />
                                Contact Coordinator
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={5}
                        className="rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:mb-4"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-8 h-8 rounded-2xl flex items-center justify-center"
                                style={{ background: `${event.accent}20` }}
                            >
                                <span className="text-sm font-black" style={{ color: event.accent }}>
                                    !
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.32em] font-black text-white/35">
                                    Event Snapshot
                                </p>
                                <h3 className="font-[950] uppercase italic text-2xl tracking-tight text-white">
                                    Rules & Format
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            {event.rules.slice(0, 5).map((rule, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3"
                                >
                                    <span
                                        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl text-[10px] font-black"
                                        style={{ background: `${event.accent}18`, color: event.accent }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-sm font-medium leading-relaxed text-white/72">{rule}</p>
                                </div>
                            ))}
                        </div>

                        
                    </motion.div>
                </div>

                <div
                    className="absolute right-0 bottom-0 select-none pointer-events-none font-black italic uppercase leading-none"
                    style={{
                        fontSize: "clamp(8rem, 20vw, 20rem)",
                        opacity: 0.03,
                        color: event.accent,
                        lineHeight: 0.9,
                    }}
                >
                    VANSH
                </div>
            </div>

            <section className="relative z-10 px-6 md:px-14 lg:px-20 -mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                >
                    {[
                        { icon: <MapPin size={16} />, label: "Venue", value: event.venue },
                        { icon: <Users size={16} />, label: "Team Size", value: event.teamSize },
                        { icon: <Ticket size={16} />, label: "Entry Fee", value: event.registrationFee },
                        { icon: <Star size={16} />, label: "Event", value: event.date },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-md px-5 py-4 flex items-center gap-3"
                        >
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${event.accent}18`, color: event.accent }}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-0.5">
                                    {item.label}
                                </p>
                                <p className="text-sm font-black text-white leading-tight">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

        </main>
    );
}
