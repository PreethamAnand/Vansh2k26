"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useHackathon } from "@/context/HackathonContext";
import { Crown, Users, ShieldCheck, CalendarRange, ArrowRight } from "lucide-react";

export default function SuperAdminDashboard() {
    const { projects, judges, volunteers } = useHackathon();

    const activeTeams = projects.filter((project) => !project.isEliminated).length;

    return (
        <DashboardLayout type="superadmin" title="Super Admin Control Deck">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Teams" value={projects.length} icon={<Users size={18} />} />
                <StatCard title="Active Teams" value={activeTeams} icon={<ShieldCheck size={18} />} />
                <StatCard title="Judges" value={judges.length} icon={<ShieldCheck size={18} />} />
                <StatCard title="Volunteers" value={volunteers.length} icon={<CalendarRange size={18} />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Link href="/dashboard/admin" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/60 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-black uppercase tracking-wide">Admin Dashboard</h2>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </div>
                    <p className="text-white/60 text-sm">
                        Manage registrations, judges, volunteers, rooms, WiFi and elimination workflow.
                    </p>
                </Link>

                <Link href="/dashboard/event-coordinator" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/60 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-black uppercase tracking-wide">Event Coordinator Hub</h2>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </div>
                    <p className="text-white/60 text-sm">
                        Access 8 dedicated event platforms, each with separate operational status and control cards.
                    </p>
                </Link>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-700/20 to-pink-600/10 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                    <Crown size={18} className="text-yellow-300" />
                    <h3 className="font-black uppercase tracking-wide">Executive Notes</h3>
                </div>
                <p className="text-white/70 text-sm">
                    Use this panel for top-level control. Credentials for role access are currently configured in the login flow and can be moved to secure env-backed auth later.
                </p>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3 text-white/60">
                <span className="text-xs uppercase tracking-widest font-bold">{title}</span>
                {icon}
            </div>
            <div className="text-3xl font-black leading-none">{value}</div>
        </div>
    );
}
