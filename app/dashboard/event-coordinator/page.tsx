"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { COORDINATOR_EVENTS } from "@/lib/eventCoordinatorConfig";
import { CalendarRange, ArrowRight } from "lucide-react";

export default function EventCoordinatorDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role === "event-coordinator" && user?.eventSlug) {
            router.replace(`/dashboard/event-coordinator/${user.eventSlug}`);
        }
    }, [user, router]);

    return (
        <DashboardLayout type="event-coordinator" title="Event Coordinator Platforms">
            <div>
                <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-black uppercase tracking-wide mb-2">8 Separate Event Dashboards</h2>
                    <p className="text-white/65 text-sm">
                        Each event below opens an isolated dashboard route so your coordinators can operate event-specific workflows independently.
                    </p>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {COORDINATOR_EVENTS.map((eventItem, index) => (
                    <Link
                        key={eventItem.slug}
                        href={`/dashboard/event-coordinator/${eventItem.slug}`}
                        className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-purple-500/60 hover:bg-white/8 transition-all"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white/45">Event {index + 1}</span>
                            <CalendarRange size={16} className="text-white/55" />
                        </div>
                        <h3 className="font-black text-lg leading-tight mb-1">{eventItem.title}</h3>
                        <p className="text-xs text-white/50 mb-4">{eventItem.category} • {eventItem.date}</p>
                        <div className="text-xs uppercase tracking-widest text-purple-300 font-bold inline-flex items-center gap-1">
                            Open Dashboard
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
            </div>
        </DashboardLayout>
    );
}
