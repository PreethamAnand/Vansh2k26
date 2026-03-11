"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
    Zap,
    Clock,
    Calendar,
    ArrowLeft,
    Bell,
    Settings,
    ShieldAlert,
    X
} from "lucide-react";
import { useState } from "react";
import { useHackathon } from "@/context/HackathonContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

export default function DeadlineManagement() {
    const { hackathonStartDate, updateHackathonStartDate, isLoading, isRoundLockEnabled, toggleRoundLock, roundConfigs, updateRoundTime } = useHackathon();
    const [localDate, setLocalDate] = useState(hackathonStartDate);
    const [editingRound, setEditingRound] = useState<string | null>(null);

    const handleSyncDate = () => {
        updateHackathonStartDate(localDate);
        toast.success("Global Timeline Synchronized");
    };

    const handleUpdateTime = (id: string, h: number, m: number, offset: number) => {
        updateRoundTime(id, h, m, offset);
    };

    const formatTime = (h: number, m: number) => {
        const hh = h % 12 || 12;
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    if (isLoading) {
        return (
            <DashboardLayout type="admin" title="System Synchronization">
                <div className="h-[80vh] flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout type="admin" title="Mission Control">
            <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
                {/* Header */}
                <div>
                    <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-white/40 hover:text-[#FFEE00] transition-colors font-bold text-xs uppercase tracking-widest mb-4">
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                        Mission <span className="text-[#FFEE00]">Timeline</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Synchronize Start Date */}
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-white/10 text-[#FFEE00]">
                                <Calendar size={28} />
                            </div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Event Kickoff</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Main Event Date</label>
                                <input
                                    type="text"
                                    value={localDate}
                                    onChange={(e) => setLocalDate(e.target.value)}
                                    placeholder="27-28 FEBRUARY 2026"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-lg font-black italic uppercase outline-none focus:border-purple-500 transition-all tracking-widest"
                                />
                            </div>
                            <button
                                onClick={handleSyncDate}
                                className="w-full py-5 rounded-[1.5rem] bg-[#FFEE00] text-black font-black uppercase italic tracking-widest shadow-lg shadow-yellow-500/10 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                BROADCAST START DATE
                            </button>
                        </div>

                        <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-start gap-4">
                            <ShieldAlert className="text-yellow-500 shrink-0" size={24} />
                            <p className="text-[10px] text-yellow-500 font-bold uppercase leading-relaxed tracking-wide">
                                Warning: Updating the start date will affect all countdown timers globally for hackers and judges.
                            </p>
                        </div>
                    </div>

                    {/* Operational Phases */}
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-white/10 text-purple-400">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Round Deadlines</h3>
                        </div>

                        <div className="space-y-4">
                            {roundConfigs.map((round) => (
                                <div key={round.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 group hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-black italic uppercase text-sm tracking-tight">{round.title}</p>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${round.color}`}>
                                                {formatTime(round.hour, round.minute || 0)} (Day {round.dayOffset + 1})
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setEditingRound(editingRound === round.id ? null : round.id)}
                                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
                                        >
                                            {editingRound === round.id ? <X size={14} /> : <Settings size={14} />}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {editingRound === round.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pt-4 border-t border-white/5"
                                            >
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="text-[10px] font-bold text-white/20 uppercase block mb-2">Hour (0-23)</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="23"
                                                            defaultValue={round.hour}
                                                            onBlur={(e) => handleUpdateTime(round.id, parseInt(e.target.value), round.minute || 0, round.dayOffset)}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-bold text-white/20 uppercase block mb-2">Minute</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="59"
                                                            defaultValue={round.minute}
                                                            onBlur={(e) => handleUpdateTime(round.id, round.hour, parseInt(e.target.value), round.dayOffset)}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-bold text-white/20 uppercase block mb-2">Day Offset</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="1"
                                                            defaultValue={round.dayOffset}
                                                            onBlur={(e) => handleUpdateTime(round.id, round.hour, round.minute || 0, parseInt(e.target.value))}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono"
                                                        />
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-[9px] text-white/30 italic">Changes are saved automatically when you click away.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-4 rounded-xl border border-dashed border-white/20 text-white/20 font-bold uppercase tracking-widest text-[10px] hover:border-white/40 hover:text-white/40 transition-all">
                            + Add Operational Phase
                        </button>
                    </div>
                </div>

                {/* System Enforcement Section */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl transition-all ${isRoundLockEnabled ? 'bg-purple-500/10 text-purple-400' : 'bg-red-500/10 text-red-500'}`}>
                                <Zap size={32} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black italic uppercase tracking-tight text-white leading-tight">Round Time-Locking</h4>
                                <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mt-1">
                                    {isRoundLockEnabled
                                        ? "Active: Rounds unlock automatically at specified times"
                                        : "Bypassed: All rounds are currently unlocked for judging"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={toggleRoundLock}
                            className={`px-12 py-5 rounded-2xl font-black uppercase italic tracking-widest text-xs transition-all shadow-xl active:scale-95 ${isRoundLockEnabled
                                ? "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                                : "bg-purple-600 text-white shadow-purple-500/20"
                                }`}
                        >
                            {isRoundLockEnabled ? "DISABLE LOCKING" : "RESTORE AUTOMATION"}
                        </button>
                    </div>
                </div>

                {/* Notifications Panel */}
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center text-white">
                            <Bell size={32} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black italic uppercase tracking-tight text-white">Deadline Alerts</h4>
                            <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mt-1">Automatic SMS & Email dispatch for upcoming rounds</p>
                        </div>
                    </div>
                    <button className="px-10 py-5 rounded-full bg-white text-black font-black uppercase italic tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                        Configure Alerts
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
