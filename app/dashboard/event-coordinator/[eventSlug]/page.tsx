"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useHackathon } from "@/context/HackathonContext";
import { COORDINATOR_EVENTS, getCoordinatorEventBySlug } from "@/lib/eventCoordinatorConfig";
import { ArrowLeft, Users, ShieldCheck, CalendarClock, Building2 } from "lucide-react";

export default function EventCoordinatorEventDashboard() {
    const params = useParams<{ eventSlug: string }>();
    const router = useRouter();
    const { user } = useAuth();
    const eventSlug = params?.eventSlug;

    const eventItem = eventSlug ? getCoordinatorEventBySlug(eventSlug) : undefined;

    useEffect(() => {
        if (
            user?.role === "event-coordinator" &&
            user?.eventSlug &&
            eventSlug &&
            user.eventSlug !== eventSlug
        ) {
            router.replace(`/dashboard/event-coordinator/${user.eventSlug}`);
        }
    }, [user, eventSlug, router]);

    if (
        user?.role === "event-coordinator" &&
        user?.eventSlug &&
        eventSlug &&
        user.eventSlug !== eventSlug
    ) {
        return null;
    }

    if (!eventItem) {
        return (
            <DashboardLayout type="event-coordinator" title="Event Dashboard Not Found">
                <div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                        <h2 className="text-2xl font-black mb-2">Invalid Event Dashboard</h2>
                        <p className="text-white/60 text-sm mb-4">
                            This event dashboard does not exist. Use the coordinator overview to open one of the 8 configured dashboards.
                        </p>
                        <Link
                            href="/dashboard/event-coordinator"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-purple-300 hover:text-purple-200"
                        >
                            <ArrowLeft size={14} />
                            Back to Event Platforms
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const { projects, judges, volunteers } = useHackathon();
    const totalTeams = projects.length;
    const activeTeams = projects.filter((project) => !project.isEliminated).length;

    return (
        <DashboardLayout type="event-coordinator" title={`${eventItem.title} Dashboard`}>
            <div>
                <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                    <Link
                        href="/dashboard/event-coordinator"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/60 hover:text-white"
                    >
                        <ArrowLeft size={14} />
                        Back to All Event Platforms
                    </Link>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-purple-300 font-black">{eventItem.category}</span>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                    <h2 className="text-2xl font-black mb-2 leading-tight">{eventItem.title}</h2>
                    <p className="text-white/60 text-sm">Dedicated platform for this event team. Keep event operations isolated per dashboard.</p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-2">
                            <CalendarClock size={16} className="text-purple-300" />
                            <span>{eventItem.date}</span>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-2">
                            <Building2 size={16} className="text-purple-300" />
                            <span>{eventItem.venue}</span>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-purple-300" />
                            <span>Platform Status: Active</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <EventStat title="Teams" value={totalTeams} icon={<Users size={16} />} />
                    <EventStat title="Active Teams" value={activeTeams} icon={<ShieldCheck size={16} />} />
                    <EventStat title="Ops Staff" value={judges.length + volunteers.length} icon={<Users size={16} />} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <h3 className="font-black uppercase tracking-wide mb-3">Other Event Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                        {COORDINATOR_EVENTS
                            .filter((item) => item.slug !== eventItem.slug)
                            .filter((item) => !user?.eventSlug || item.slug === user.eventSlug)
                            .map((item, index) => (
                            <Link
                                key={item.slug}
                                href={`/dashboard/event-coordinator/${item.slug}`}
                                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/60 text-xs uppercase tracking-widest font-bold text-white/70 hover:text-white"
                            >
                                Event {index + 1}: {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function EventStat({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-white/60 mb-2">
                <span className="text-xs uppercase tracking-widest font-bold">{title}</span>
                {icon}
            </div>
            <p className="text-3xl font-black">{value}</p>
        </div>
    );
}
