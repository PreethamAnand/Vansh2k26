import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { EVENTS_DATA, getEventBySlug } from "@/lib/eventData";
import EventRegistrationForm from "@/components/EventRegistrationForm";

type EventRegisterPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ payment?: string }>;
};

export function generateStaticParams() {
    return EVENTS_DATA.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventRegisterPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        return {
            title: "Event Registration Not Found | VANSH 2K26",
            description: "This event registration page does not exist.",
        };
    }

    return {
        title: `${event.title} Registration | VANSH 2K26`,
        description: `Register for ${event.title} at VANSH 2K26.`,
    };
}

export default async function EventRegisterPage({ params, searchParams }: EventRegisterPageProps) {
    const { slug } = await params;
    const { payment } = await searchParams;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const paymentSuccess = payment === "success";
    const paymentFailed = payment === "failed";

    return (
        <main
            className="min-h-screen bg-[#06000D] text-white overflow-x-hidden px-6 md:px-14 lg:px-20 py-16"
            style={{ fontFamily: "'Kanit', sans-serif" }}
        >
            <div className="max-w-3xl mx-auto">
                <Link
                    href={`/event/${event.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-black text-white/40 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={13} />
                    Back to Event
                </Link>

                {(paymentSuccess || paymentFailed) && (
                    <div
                        className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl border font-black uppercase tracking-wider text-xs ${
                            paymentSuccess
                                ? "border-green-500/30 bg-green-500/10 text-green-400"
                                : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                    >
                        {paymentSuccess
                            ? "Payment successful. Your registration is confirmed."
                            : "Payment failed or was cancelled. Please try again."}
                    </div>
                )}

                <div className="flex items-center gap-4 mb-8">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black"
                        style={{ background: `${event.accent}20`, color: event.accent }}
                    >
                        ✦
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] font-black text-white/35">
                            {event.category}
                        </p>
                        <h1 className="font-[950] uppercase italic text-3xl md:text-4xl tracking-tight text-white">
                            {event.title} Registration
                        </h1>
                    </div>
                </div>

                <div
                    className="rounded-[2rem] border border-white/10 bg-black/25 p-6 md:p-8 backdrop-blur-xl w-full"
                    style={{ boxShadow: `0 24px 80px ${event.glow}` }}
                >
                    <EventRegistrationForm event={event} />
                </div>
            </div>
        </main>
    );
}
