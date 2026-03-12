import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventDashboardClient from "./EventDashboardClient";
import { EVENTS_DATA, getEventBySlug } from "@/lib/eventData";

type EventPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return EVENTS_DATA.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        return {
            title: "Event Not Found | VANSH 2K26",
            description: "This event page does not exist.",
        };
    }

    return {
        title: `${event.title} Dashboard | VANSH 2K26`,
        description: event.description,
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    return <EventDashboardClient event={event} />;
}
