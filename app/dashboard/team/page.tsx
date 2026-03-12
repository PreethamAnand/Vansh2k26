"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
    MapPin,
    Target,
    QrCode
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHackathon } from "@/context/HackathonContext";

export default function TeamDashboard() {
    const { wifiDetails, isSubmissionLocked, projects, isLoading } = useHackathon();

    const { user } = useAuth();

    // Find the team matching the logged-in user's teamId
    const activeTeam = useMemo(() => {
        if (!user?.teamId) return null;

        // Try precise match first
        let found = projects.find(p => p.teamId === user.teamId);

        // Fallback: Try match by transaction ID or parts of ID if needed
        if (!found) {
            found = projects.find(p => p.id === user.teamId);
        }

        return found || null;
    }, [projects, user]);

    if (isLoading) {
        return (
            <DashboardLayout type="team" title="Logging In...">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    if (!activeTeam) {
        return (
            <DashboardLayout type="team" title="No Team Found">
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <h2 className="text-2xl font-black text-white mb-4 italic uppercase">Identity Error</h2>
                    <p className="text-white/40 max-w-md">We couldn't find a registered team associated with this session. Please ensure you have completed the registration and payment process.</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout type="team" title="Team Command Center">

            {/* --- Top Stats Row --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 mb-3 lg:mb-6 shrink-0">
                {/* Team Identity Card - YELLOW STYLE */}
                <div className="bg-[#FFEE00] border-2 border-black rounded-2xl lg:rounded-[1.8rem] p-3.5 lg:p-4.5 flex items-center justify-between shadow-[4px_4px_0_#9333ea] lg:shadow-[5px_5px_0_#9333ea] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col">
                        <span className="text-[8px] lg:text-[9px] font-black text-black/40 uppercase tracking-[0.2em] leading-none">Registered ID</span>
                        <div className="flex items-center gap-2 mt-0.5 lg:mt-1">
                            <span className="text-[8px] lg:text-[9px] font-black text-[#FFEE00] px-1.5 lg:px-2 py-0.5 border border-black rounded bg-black uppercase tracking-[0.1em] leading-none">
                                {activeTeam.teamId || "ID-PENDING"}
                            </span>
                        </div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-black flex flex-col items-center justify-center border-2 border-black group-hover:rotate-6 transition-transform duration-300 shadow-lg relative overflow-hidden group/btn">
                        <Link href="/dashboard/team/ticket" className="absolute inset-0 flex items-center justify-center bg-[#FFEE00] text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <QrCode size={20} />
                        </Link>
                        <span className="text-lg lg:text-2xl font-black text-[#FFEE00] z-10 group-hover:opacity-0 transition-opacity">
                            {activeTeam.team[0]}
                        </span>
                    </div>
                </div>

                {/* Track Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-3.5 lg:p-6 flex flex-col justify-center relative overflow-hidden hover:bg-white/[0.08] transition-all border-b-purple-500/50">
                    <div className="flex items-center gap-2 mb-1 lg:mb-2">
                        <Target className="text-purple-400 shrink-0" size={14} />
                        <span className="text-[8px] lg:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Competitive Track</span>
                    </div>
                    <div className="text-base lg:text-xl font-black italic uppercase tracking-tight text-white line-clamp-1">
                        {activeTeam.track}
                    </div>
                </div>

                {/* Grid Location - YELLOW STYLE */}
                <div className="bg-[#FFEE00] border-2 border-black rounded-2xl lg:rounded-3xl p-3.5 lg:p-6 flex flex-col justify-center relative shadow-[4px_4px_0_#9333ea] lg:shadow-[6px_6px_0_#9333ea]">
                    <div className="flex items-center gap-2 mb-1 lg:mb-2">
                        <MapPin className="text-black/60 shrink-0" size={14} />
                        <span className="text-[8px] lg:text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Grid Location</span>
                    </div>
                    <div className="text-xl lg:text-3xl font-black italic uppercase tracking-tight text-black flex items-baseline gap-1 lg:gap-2">
                        {activeTeam.room || "TBD"}
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[1.2rem] lg:rounded-[2rem] p-4 lg:p-8 backdrop-blur-md">
                <h2 className="text-sm lg:text-2xl font-black italic uppercase tracking-tighter text-white">Dashboard Ready</h2>
                <p className="text-white/50 text-xs lg:text-sm mt-2">
                    Team and problem-statement sections have been removed. Use the sidebar to continue with submissions and event workflows.
                </p>
            </div>

        </DashboardLayout>
    );
}
