"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
    MapPin,
    Users,
    Ticket,
    Trophy,
    Check,
    ArrowLeft,
    Phone,
    ChevronRight,
    Star,
    Zap,
} from "lucide-react";
import type { EventData } from "@/lib/eventData";
import DotGrid from "@/components/DotGrid";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
    }),
};

const prizeStyles: Record<number, { ring: string; badge: string; num: string }> = {
    0: { ring: "border-amber-400/60", badge: "bg-amber-400/15 text-amber-300", num: "text-amber-400" },
    1: { ring: "border-slate-300/50", badge: "bg-slate-300/10 text-slate-300", num: "text-slate-300" },
    2: { ring: "border-orange-700/60", badge: "bg-orange-900/20 text-orange-400", num: "text-orange-500" },
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
            <div className="fixed inset-0 pointer-events-none z-0">
                <DotGrid
                    dotSize={4}
                    gap={26}
                    baseColor="#4f7876"
                    activeColor={event.accent}
                    proximity={270}
                    shockRadius={140}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                    style={{}}
                />
            </div>

            <div
                className="relative z-10 min-h-[88vh] flex items-end pb-16 pt-28 px-6 md:px-14 lg:px-20"
                style={{ background: event.gradient }}
            >
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="absolute top-24 left-6 md:left-14 lg:left-20"
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
                                href="/register"
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

                        {event.rules.length > 5 ? (
                            <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                                Scroll for the full rulebook below
                            </p>
                        ) : null}
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

            <section className="relative z-10 px-6 md:px-14 lg:px-20 py-20">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <p
                            className="text-[10px] uppercase tracking-[0.3em] font-black mb-3"
                            style={{ color: event.accent }}
                        >
                            About the Event
                        </p>
                        <h2 className="font-black uppercase italic text-4xl md:text-5xl leading-tight text-white/90">
                            What to<br />
                            <span style={{ color: event.accent }}>Expect</span>
                        </h2>
                        <div
                            className="mt-5 h-1 w-20 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${event.accent}, transparent)` }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                    >
                        <p className="text-white/75 text-base leading-relaxed mb-5 font-semibold">
                            {event.description}
                        </p>
                        <p className="text-white/55 text-sm leading-relaxed font-semibold">
                            {event.longDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-7">
                            {event.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                                    style={{
                                        color: event.accent,
                                        borderColor: `${event.accent}40`,
                                        background: `${event.accent}0d`,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative z-10 px-6 md:px-14 lg:px-20 pb-20">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy size={18} style={{ color: event.accent }} />
                            <h3 className="font-black uppercase italic text-2xl tracking-tight">
                                Prize Pool
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {event.prizes.map((prize, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.07 }}
                                    className={`relative rounded-2xl border ${prizeStyles[i]?.ring ?? "border-white/10"} bg-white/[0.035] backdrop-blur p-5 flex items-center gap-5 overflow-hidden`}
                                >
                                    <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 font-black italic text-7xl opacity-[0.07] select-none pointer-events-none ${prizeStyles[i]?.num ?? ""}`}
                                    >
                                        {i + 1}
                                    </span>

                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest flex-shrink-0 ${prizeStyles[i]?.badge ?? "bg-white/10 text-white/50"}`}
                                    >
                                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🏆"}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/35 mb-0.5">
                                            {prize.label}
                                        </p>
                                        <p className="font-black italic text-xl leading-tight text-white">
                                            {prize.position}
                                        </p>
                                    </div>

                                    <p
                                        className="font-black italic text-2xl flex-shrink-0"
                                        style={{ color: i === 0 ? "#F59E0B" : i === 1 ? "#CBD5E1" : "#EA7C3A" }}
                                    >
                                        {prize.amount}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.25 }}
                            className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                        >
                            <p className="text-[9px] uppercase tracking-[0.25em] font-black text-white/30 mb-2">
                                Event Coordinator
                            </p>
                            <p className="font-black text-white mb-1">{event.coordinator}</p>
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="inline-flex items-center gap-2 text-xs font-black tracking-widest transition-colors"
                                style={{ color: event.accent }}
                            >
                                <Phone size={12} />
                                {event.coordinatorPhone}
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="relative z-10 px-6 md:px-14 lg:px-20 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-md p-8 md:p-12"
                >
                    <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
                        <div className="flex items-center gap-3">
                            <Check size={18} style={{ color: event.accent }} />
                            <h3 className="font-black uppercase italic text-2xl md:text-3xl tracking-tight">
                                Eligibility Criteria
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] uppercase tracking-[0.25em] font-black text-white/30 mb-1">
                                Coordinator
                            </p>
                            <p className="font-black text-white text-sm mb-1">{event.coordinator}</p>
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="inline-flex items-center justify-end gap-1.5 text-xs font-black tracking-widest transition-colors"
                                style={{ color: event.accent }}
                            >
                                <Phone size={11} />
                                {event.coordinatorPhone}
                            </a>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {event.eligibility.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="flex items-start gap-3"
                            >
                                <div
                                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${event.accent}25`, border: `1.5px solid ${event.accent}60` }}
                                >
                                    <Check size={11} style={{ color: event.accent }} />
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed font-normal">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="relative z-10 px-6 md:px-14 lg:px-20 pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden border border-white/8 p-12 md:p-16 text-center"
                    style={{
                        background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${event.accent}18 0%, transparent 70%), #0d0019`,
                    }}
                >
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${event.accent}, transparent)` }}
                    />

                    <p
                        className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 opacity-60"
                        style={{ color: event.accent }}
                    >
                        VANSH 2K26
                    </p>
                    <h2 className="font-black uppercase italic text-4xl md:text-6xl leading-tight mb-4">
                        Ready to{" "}
                        <span style={{ color: event.accent }}>Compete?</span>
                    </h2>
                    <p className="text-white/40 text-sm max-w-lg mx-auto mb-10 font-normal leading-relaxed">
                        Secure your spot in {event.title} before registrations close. Entry fee:{" "}
                        <strong className="text-white/70">{event.registrationFee}</strong>. Venue:{" "}
                        <strong className="text-white/70">{event.venue}</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm text-[#06000D] transition-all hover:scale-[1.04] active:scale-[0.97] shadow-2xl"
                            style={{
                                background: event.accent,
                                boxShadow: `0 12px 40px ${event.glow}`,
                            }}
                        >
                            Register for {event.title}
                            <ChevronRight size={16} />
                        </Link>
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-white/12 bg-white/5 hover:bg-white/10 transition-all"
                        >
                            <ArrowLeft size={14} />
                            Browse All Events
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
