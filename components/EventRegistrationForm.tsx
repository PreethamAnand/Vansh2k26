"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Users,
    Send,
    CheckCircle2,
    Plus,
    Trash2,
    CreditCard,
    Phone,
    Mail,
    Building2,
    GraduationCap,
    BookOpen,
    ShieldCheck,
} from "lucide-react";
import type { EventData } from "@/lib/eventData";

interface MemberData {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    department: string;
}

function parseTeamSize(teamSize: string): { isSolo: boolean; min: number; max: number } {
    const lower = teamSize.toLowerCase();
    if (lower.includes("solo")) return { isSolo: true, min: 1, max: 1 };

    // "4 Members / Squad" → exact
    const exactMatch = teamSize.match(/^(\d+)\s*members/i);
    if (exactMatch) {
        const n = parseInt(exactMatch[1]);
        return { isSolo: false, min: n, max: n };
    }

    // "5–15 Members" or "3–8 Members" or "1–5 Members"
    const rangeMatch = teamSize.match(/(\d+)[–\-](\d+)/);
    if (rangeMatch) {
        return { isSolo: false, min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
    }

    return { isSolo: true, min: 1, max: 1 };
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function EventRegistrationForm({ event }: { event: EventData }) {
    const { isSolo, min, max } = parseTeamSize(event.teamSize);

    const emptyMember = (): MemberData => ({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        department: "",
    });

    const [teamName, setTeamName] = useState("");
    const [members, setMembers] = useState<MemberData[]>([emptyMember()]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Load Cashfree SDK on mount
    useEffect(() => {
        if (document.querySelector('script[data-cashfree]')) return;
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        script.setAttribute("data-cashfree", "1");
        document.body.appendChild(script);
    }, []);

    const updateMember = (idx: number, field: keyof MemberData, value: string) => {
        setMembers((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: value };
            return next;
        });
    };

    const addMember = () => {
        if (members.length < max) setMembers((prev) => [...prev, emptyMember()]);
    };

    const removeMember = (idx: number) => {
        if (members.length > 1) setMembers((prev) => prev.filter((_, i) => i !== idx));
    };

    const validate = (): string | null => {
        if (!isSolo && !teamName.trim()) return "Please enter a team / band name.";
        for (let i = 0; i < members.length; i++) {
            const m = members[i];
            const label = isSolo ? "Your" : i === 0 ? "Leader's" : `Member ${i + 1}'s`;
            if (!m.fullName.trim()) return `${label} full name is required.`;
            if (!m.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email))
                return `${label} email is invalid.`;
            if (!m.phone.trim() || !/^\d{10}$/.test(m.phone.replace(/\s/g, "")))
                return `${label} phone must be a 10-digit number.`;
            if (!m.college.trim()) return `${label} college / university is required.`;
            if (!m.year) return `${label} year is required.`;
            if (!m.department.trim()) return `${label} department is required.`;
        }
        if (!isSolo && members.length < min)
            return `Minimum ${min} members required for this event.`;
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        const err = validate();
        if (err) { setErrorMsg(err); return; }

        setIsLoading(true);
        try {
            // Step 1: Save registration + create Cashfree order
            const res = await fetch("/api/payment/create-event-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventSlug: event.slug,
                    eventName: event.title,
                    teamName: isSolo ? members[0].fullName : teamName,
                    registrationFee: event.registrationFee,
                    members,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Failed to create payment order.");

            // Step 2: Initiate Cashfree checkout
            const cashfreeJS = (window as any).Cashfree;
            if (!cashfreeJS) throw new Error("Payment SDK not loaded. Please refresh and try again.");

            const cashfreeMode = process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION" ? "production" : "sandbox";
            const cashfree = cashfreeJS({ mode: cashfreeMode });
            await cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self",
            });
            // Cashfree will redirect away — no need to setIsLoading(false)
        } catch (err: any) {
            setErrorMsg(err.message || "Payment initiation failed. Please try again.");
            setIsLoading(false);
        }
    };

    // ── Shared input style ──────────────────────────────────────────
    const inputClass =
        "w-full bg-white/[0.05] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm font-medium placeholder-white/25 focus:outline-none transition-colors";
    const inputStyle = (focused?: boolean) => ({
        borderColor: focused ? event.accent : undefined,
        boxShadow: focused ? `0 0 0 2px ${event.accent}22` : undefined,
    });

    // ── Success screen ─────────────────────────────────────────────
    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center justify-center gap-6 py-20 text-center"
            >
                <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ background: `${event.accent}22`, border: `2px solid ${event.accent}55` }}
                >
                    <CheckCircle2 size={38} style={{ color: event.accent }} />
                </div>
                <div>
                    <h3
                        className="font-[950] italic uppercase text-4xl md:text-5xl tracking-tight mb-2"
                        style={{ color: event.accent }}
                    >
                        You&apos;re In!
                    </h3>
                    <p className="text-white/55 font-bold uppercase tracking-widest text-sm">
                        Registration submitted for{" "}
                        <span className="text-white">{event.title}</span>
                    </p>
                    <p className="text-white/35 text-xs mt-3 max-w-sm mx-auto leading-relaxed">
                        Your registration is pending payment verification. Our team will confirm
                        your slot within 24 hours. Keep your Transaction ID safe.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">

                {/* Team Name (group events only) */}
                {!isSolo && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: EASE }}
                    >
                        <label className="block text-[10px] uppercase tracking-[0.28em] font-black text-white/40 mb-2">
                            Team / Band Name <span style={{ color: event.accent }}>*</span>
                        </label>
                        <div className="relative">
                            <Users
                                size={15}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                            />
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder={`e.g. "The Vanguards"`}
                                className={`${inputClass} pl-10`}
                                onFocus={(e) => {
                                    e.target.style.borderColor = event.accent;
                                    e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "";
                                    e.target.style.boxShadow = "";
                                }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Members */}
                {members.map((member, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, delay: idx * 0.05, ease: EASE }}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-4"
                    >
                        {/* Member header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                                    style={{ background: `${event.accent}20`, color: event.accent }}
                                >
                                    {isSolo ? <User size={14} /> : String(idx + 1).padStart(2, "0")}
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.28em] font-black text-white/50">
                                    {isSolo ? "Your Details" : idx === 0 ? "Team Leader" : `Member ${idx + 1}`}
                                </p>
                            </div>
                            {!isSolo && idx > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeMember(idx)}
                                    title="Remove member"
                                    className="text-white/25 hover:text-red-400 transition-colors p-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>

                        {/* Row 1: Full Name + Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                    Full Name <span style={{ color: event.accent }}>*</span>
                                </label>
                                <div className="relative">
                                    <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                    <input
                                        type="text"
                                        value={member.fullName}
                                        onChange={(e) => updateMember(idx, "fullName", e.target.value)}
                                        placeholder="Full name"
                                        className={`${inputClass} pl-9`}
                                        onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                    Phone <span style={{ color: event.accent }}>*</span>
                                </label>
                                <div className="relative">
                                    <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                    <input
                                        type="tel"
                                        value={member.phone}
                                        onChange={(e) => updateMember(idx, "phone", e.target.value)}
                                        placeholder="10-digit mobile"
                                        className={`${inputClass} pl-9`}
                                        onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Email */}
                        <div>
                            <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                Email <span style={{ color: event.accent }}>*</span>
                            </label>
                            <div className="relative">
                                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => updateMember(idx, "email", e.target.value)}
                                    placeholder="your@email.com"
                                    className={`${inputClass} pl-9`}
                                    onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                    onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                />
                            </div>
                        </div>

                        {/* Row 3: College + Year + Dept */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                    College / University <span style={{ color: event.accent }}>*</span>
                                </label>
                                <div className="relative">
                                    <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                    <input
                                        type="text"
                                        value={member.college}
                                        onChange={(e) => updateMember(idx, "college", e.target.value)}
                                        placeholder="Institution name"
                                        className={`${inputClass} pl-9`}
                                        onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                    Year <span style={{ color: event.accent }}>*</span>
                                </label>
                                <div className="relative">
                                    <GraduationCap size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                                    <select
                                        value={member.year}
                                        onChange={(e) => updateMember(idx, "year", e.target.value)}
                                        aria-label="Select year"
                                        className={`${inputClass} pl-9 appearance-none cursor-pointer`}
                                        style={{ backgroundColor: "transparent" }}
                                        onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                    >
                                        <option value="" disabled className="bg-[#0d0d1a]">Select year</option>
                                        {YEARS.map((y) => (
                                            <option key={y} value={y} className="bg-[#0d0d1a]">{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-white/35 mb-1.5">
                                    Department <span style={{ color: event.accent }}>*</span>
                                </label>
                                <div className="relative">
                                    <BookOpen size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                    <input
                                        type="text"
                                        value={member.department}
                                        onChange={(e) => updateMember(idx, "department", e.target.value)}
                                        placeholder="e.g. CSE, ECE"
                                        className={`${inputClass} pl-9`}
                                        onFocus={(e) => { e.target.style.borderColor = event.accent; e.target.style.boxShadow = `0 0 0 2px ${event.accent}22`; }}
                                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Add Member Button (team events) */}
                {!isSolo && members.length < max && (
                    <motion.button
                        type="button"
                        onClick={addMember}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-white/20 text-white/40 hover:text-white/70 hover:border-white/40 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <Plus size={14} />
                        Add Member ({members.length}/{max})
                    </motion.button>
                )}

                {/* Payment Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-3"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: `${event.accent}20`, color: event.accent }}
                        >
                            <CreditCard size={14} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.28em] font-black text-white/40">
                                Secure Payment
                            </p>
                            <p className="text-white font-black text-sm">
                                Registration Fee:{" "}
                                <span style={{ color: event.accent }}>{event.registrationFee}</span>
                            </p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 text-white/30 text-[10px] font-black uppercase tracking-wider">
                            <ShieldCheck size={13} />
                            Cashfree Secured
                        </div>
                    </div>
                    <p className="text-white/35 text-xs leading-relaxed">
                        You will be redirected to a secure Cashfree payment page to complete
                        your registration. Supports UPI, Cards, Net Banking &amp; Wallets.
                    </p>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                    {errorMsg && (
                        <motion.p
                            key="err"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-xs font-bold uppercase tracking-wider text-center"
                        >
                            ⚠ {errorMsg}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm text-[#06000D] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                        background: isLoading
                            ? `${event.accent}80`
                            : `linear-gradient(135deg, ${event.accent} 0%, ${event.accent}cc 100%)`,
                        boxShadow: `0 8px 32px ${event.glow}`,
                    }}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Redirecting to Payment...
                        </>
                    ) : (
                        <>
                            <CreditCard size={15} />
                            Register &amp; Pay {event.registrationFee}
                        </>
                    )}
                </motion.button>

            </div>
        </form>
    );
}
