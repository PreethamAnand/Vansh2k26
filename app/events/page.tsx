import Link from "next/link";
import { ArrowUpRight, Sparkles, CalendarClock, MapPin } from "lucide-react";
import { EVENTS_DATA } from "@/lib/eventData";

export default function EventsPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#080211] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-[130px]" />
                <div className="absolute bottom-[-140px] right-[-80px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[140px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(120,119,198,0.16),transparent_32%)]" />
            </div>

            <section className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-20 pt-28 sm:px-8 lg:px-12">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/70">
                            <Sparkles size={12} className="text-cyan-300" />
                            Premium Event Dashboards
                        </p>
                        <h1 className="max-w-4xl font-kanit text-4xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                            Explore All 8
                            <span className="ml-3 bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                                Event Platforms
                            </span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.12em] text-white/45 sm:text-base">
                            Dedicated sleek pages for every event, crafted with premium visual identity and focused details.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4 text-right backdrop-blur-lg">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Live Routes</p>
                        <p className="text-3xl font-black italic text-white">{EVENTS_DATA.length}</p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {EVENTS_DATA.map((event, index) => (
                        <article
                            key={event.slug}
                            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30"
                            style={{ boxShadow: `0 20px 60px ${event.glow}` }}
                        >
                            <div
                                className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
                                style={{ background: event.accent }}
                            />
                            <div className="relative z-10">
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/60">
                                        Event {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em]"
                                        style={{ background: `${event.accent}1a`, color: event.accent }}
                                    >
                                        {event.category}
                                    </span>
                                </div>

                                <h2 className="mb-2 font-kanit text-3xl font-black uppercase italic leading-tight text-white transition-colors group-hover:text-cyan-100">
                                    {event.title}
                                </h2>
                                <p className="mb-6 text-sm text-white/55">{event.subtitle}</p>

                                <div className="mb-6 space-y-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                                    <div className="flex items-center gap-2.5">
                                        <CalendarClock size={14} style={{ color: event.accent }} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <MapPin size={14} style={{ color: event.accent }} />
                                        <span>{event.venue}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/event/${event.slug}`}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-cyan-300/70 hover:bg-cyan-300/15"
                                >
                                    Open Dashboard
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
